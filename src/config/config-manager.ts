/**
 * Configuration Manager for F5XC API MCP
 * Handles reading/writing configuration files with proper permissions and atomic operations
 */

import * as fs from "fs/promises";
import * as fsSync from "fs";
import {
  ConfigFile,
  ProfileCredentials,
  DEFAULT_CONFIG,
  CONFIG_DIR_PERMISSIONS,
  CONFIG_FILE_PERMISSIONS,
  getConfigDirPath,
  getConfigFilePath,
} from "./types.js";
import { validateConfigFile, safeValidateConfigFile } from "./schema.js";

/**
 * Manages F5XC API MCP configuration files
 */
export class ConfigManager {
  private configDir: string;
  private configFile: string;

  constructor(configDir?: string, configFile?: string) {
    this.configDir = configDir || getConfigDirPath();
    this.configFile = configFile || getConfigFilePath();
  }

  /**
   * Check if configuration file exists
   */
  async exists(): Promise<boolean> {
    try {
      await fs.access(this.configFile);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Ensure configuration directory exists with proper permissions
   */
  private async ensureConfigDir(): Promise<void> {
    try {
      await fs.mkdir(this.configDir, { recursive: true, mode: CONFIG_DIR_PERMISSIONS });
      // Fix permissions if directory already exists
      await fs.chmod(this.configDir, CONFIG_DIR_PERMISSIONS);
    } catch (error) {
      throw new Error(
        `Failed to create config directory: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  /**
   * Check and fix file permissions
   */
  private async checkAndFixPermissions(
    filePath: string,
    expectedPermissions: number
  ): Promise<void> {
    try {
      const stats = await fs.stat(filePath);
      const currentMode = stats.mode & 0o777;

      if (currentMode !== expectedPermissions) {
        console.warn(
          `Warning: Config file has insecure permissions (${currentMode.toString(8)}). Fixing to ${expectedPermissions.toString(8)}...`
        );
        await fs.chmod(filePath, expectedPermissions);
      }
    } catch (error) {
      const err = error as { code?: string };
      if (err.code !== "ENOENT") {
        throw error;
      }
    }
  }

  /**
   * Read configuration file (async)
   */
  async read(): Promise<ConfigFile> {
    try {
      await this.checkAndFixPermissions(this.configFile, CONFIG_FILE_PERMISSIONS);
      const content = await fs.readFile(this.configFile, "utf-8");
      const data = JSON.parse(content);
      return validateConfigFile(data);
    } catch (error) {
      const err = error as { code?: string };
      if (err.code === "ENOENT") {
        return DEFAULT_CONFIG;
      }
      throw new Error(
        `Failed to read config file: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  /**
   * Read configuration file synchronously (for initialization)
   * Note: This is used during CredentialManager construction
   */
  readSync(): ConfigFile {
    try {
      if (!fsSync.existsSync(this.configFile)) {
        return DEFAULT_CONFIG;
      }

      // Check permissions
      const stats = fsSync.statSync(this.configFile);
      const currentMode = stats.mode & 0o777;
      if (currentMode !== CONFIG_FILE_PERMISSIONS) {
        console.warn(
          `Warning: Config file has insecure permissions (${currentMode.toString(8)}). Run 'f5xc-api-mcp --setup' to fix.`
        );
      }

      const content = fsSync.readFileSync(this.configFile, "utf-8");
      const data = JSON.parse(content);
      const result = safeValidateConfigFile(data);

      if (!result.success) {
        console.warn(`Warning: Invalid config file: ${result.error}`);
        return DEFAULT_CONFIG;
      }

      return result.data!;
    } catch (error) {
      console.warn(
        `Warning: Failed to read config file: ${error instanceof Error ? error.message : "Unknown error"}`
      );
      return DEFAULT_CONFIG;
    }
  }

  /**
   * Write configuration file with atomic operation
   * Uses temp file + rename pattern to ensure consistency
   */
  async write(config: ConfigFile): Promise<void> {
    await this.ensureConfigDir();

    const tempFile = `${this.configFile}.tmp.${Date.now()}`;

    try {
      // Validate before writing
      validateConfigFile(config);

      // Write to temporary file
      const content = JSON.stringify(config, null, 2);
      await fs.writeFile(tempFile, content, { mode: CONFIG_FILE_PERMISSIONS });

      // Atomic rename
      await fs.rename(tempFile, this.configFile);

      // Verify permissions
      await this.checkAndFixPermissions(this.configFile, CONFIG_FILE_PERMISSIONS);
    } catch (error) {
      // Clean up temp file on error
      try {
        await fs.unlink(tempFile);
      } catch {
        // Ignore cleanup errors
      }
      throw new Error(
        `Failed to write config file: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  /**
   * Get list of all profile names
   */
  async listProfiles(): Promise<string[]> {
    const config = await this.read();
    return Object.keys(config.profiles);
  }

  /**
   * Get a specific profile by name
   */
  async getProfile(name: string): Promise<ProfileCredentials | null> {
    const config = await this.read();
    return config.profiles[name] || null;
  }

  /**
   * Create or update a profile
   */
  async setProfile(name: string, credentials: ProfileCredentials): Promise<void> {
    const config = await this.read();

    // Validate profile name
    if (!/^[a-z0-9_-]+$/i.test(name)) {
      throw new Error(
        "Profile name must contain only alphanumeric characters, hyphens, and underscores"
      );
    }

    // Set metadata if not provided
    if (!credentials.metadata) {
      credentials.metadata = {
        createdAt: new Date().toISOString(),
        lastModifiedAt: new Date().toISOString(),
      };
    } else {
      credentials.metadata.lastModifiedAt = new Date().toISOString();
    }

    config.profiles[name] = credentials;
    config.metadata = { lastModifiedAt: new Date().toISOString() };
    await this.write(config);
  }

  /**
   * Delete a profile by name
   */
  async deleteProfile(name: string): Promise<void> {
    const config = await this.read();

    if (!config.profiles[name]) {
      throw new Error(`Profile "${name}" does not exist`);
    }

    delete config.profiles[name];

    // Clear default profile if it was deleted
    if (config.defaultProfile === name) {
      config.defaultProfile = undefined;
    }

    config.metadata = { lastModifiedAt: new Date().toISOString() };
    await this.write(config);
  }

  /**
   * Get the default profile name
   */
  async getDefaultProfile(): Promise<string | null> {
    const config = await this.read();
    return config.defaultProfile || null;
  }

  /**
   * Set the default profile
   */
  async setDefaultProfile(name: string): Promise<void> {
    const config = await this.read();

    if (!config.profiles[name]) {
      throw new Error(`Profile "${name}" does not exist`);
    }

    config.defaultProfile = name;
    config.metadata = { lastModifiedAt: new Date().toISOString() };
    await this.write(config);
  }

  /**
   * Update the lastUsedAt timestamp for a profile
   */
  async touchProfile(name: string): Promise<void> {
    const config = await this.read();
    const profile = config.profiles[name];

    if (!profile) {
      return; // Silently ignore if profile doesn't exist
    }

    if (!profile.metadata) {
      profile.metadata = {
        createdAt: new Date().toISOString(),
        lastModifiedAt: new Date().toISOString(),
        lastUsedAt: new Date().toISOString(),
      };
    } else {
      profile.metadata.lastUsedAt = new Date().toISOString();
    }

    config.metadata = { lastModifiedAt: new Date().toISOString() };
    await this.write(config);
  }

  /**
   * Get the full configuration file
   */
  async getConfig(): Promise<ConfigFile> {
    return this.read();
  }
}
