/**
 * ProfileManager - XDG-compliant profile storage and management
 *
 * Profiles are stored in ~/.config/f5xc/profiles/ (XDG Base Directory compliant)
 */

import { promises as fs } from "fs";
import { join } from "path";
import YAML from "yaml";
import { paths } from "../config/paths.js";
import type { Profile, ProfileConfig, ProfileResult } from "./types.js";

/**
 * Convert snake_case to camelCase
 */
function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Convert object keys from snake_case to camelCase
 */
function convertKeysToCamelCase(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[snakeToCamel(key)] = value;
  }
  return result;
}

/**
 * ProfileManager handles profile CRUD operations with secure file storage
 */
export class ProfileManager {
  private config: ProfileConfig;

  constructor() {
    this.config = {
      configDir: paths.configDir,
      profilesDir: paths.profilesDir,
      activeProfileFile: paths.activeProfile,
    };
  }

  /**
   * Ensure config directories exist
   */
  async ensureDirectories(): Promise<void> {
    await fs.mkdir(this.config.profilesDir, {
      recursive: true,
      mode: 0o700,
    });
  }

  /**
   * Get path to profile JSON file
   */
  private getProfilePath(name: string): string {
    return join(this.config.profilesDir, `${name}.json`);
  }

  /**
   * Validate profile name (alphanumeric, dash, underscore only)
   */
  private isValidName(name: string): boolean {
    return /^[a-zA-Z0-9_-]+$/.test(name) && name.length > 0 && name.length <= 64;
  }

  /**
   * Validate API URL format
   */
  private isValidUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      return parsed.protocol === "https:" || parsed.protocol === "http:";
    } catch {
      return false;
    }
  }

  /**
   * List all saved profiles
   */
  async list(): Promise<Profile[]> {
    await this.ensureDirectories();

    try {
      const files = await fs.readdir(this.config.profilesDir);
      const profileNames = new Set<string>();

      // Collect unique profile names from filenames
      for (const file of files) {
        // Support both .json and .yaml/.yml extensions
        let name: string | null = null;
        if (file.endsWith(".json")) {
          name = file.slice(0, -5);
        } else if (file.endsWith(".yaml")) {
          name = file.slice(0, -5);
        } else if (file.endsWith(".yml")) {
          name = file.slice(0, -4);
        }

        if (name) {
          profileNames.add(name);
        }
      }

      // Load profiles (get() handles file extension priority)
      const profiles: Profile[] = [];
      for (const name of profileNames) {
        const profile = await this.get(name);
        if (profile) {
          profiles.push(profile);
        }
      }

      return profiles.sort((a, b) => a.name.localeCompare(b.name));
    } catch {
      return [];
    }
  }

  /**
   * Get a profile by name
   */
  async get(name: string): Promise<Profile | null> {
    await this.ensureDirectories();

    // Try different file extensions in order of preference
    const extensions = [".json", ".yaml", ".yml"];

    for (const ext of extensions) {
      const path = join(this.config.profilesDir, `${name}${ext}`);
      try {
        const data = await fs.readFile(path, "utf-8");
        let parsed: Record<string, unknown>;

        if (ext === ".json") {
          parsed = JSON.parse(data);
        } else {
          // Parse YAML and convert snake_case to camelCase
          parsed = YAML.parse(data) as Record<string, unknown>;
          parsed = convertKeysToCamelCase(parsed);
        }

        return parsed as unknown as Profile;
      } catch {
        // Try next extension
        continue;
      }
    }

    return null;
  }

  /**
   * Save a profile (create or update)
   */
  async save(profile: Profile): Promise<ProfileResult> {
    await this.ensureDirectories();

    if (!this.isValidName(profile.name)) {
      return {
        success: false,
        message:
          "Invalid profile name. Use alphanumeric characters, dashes, and underscores only (max 64 chars).",
      };
    }

    if (!this.isValidUrl(profile.apiUrl)) {
      return {
        success: false,
        message: "Invalid API URL. Must be a valid HTTP/HTTPS URL.",
      };
    }

    // Require at least one form of authentication
    if (!profile.apiToken && !profile.cert && !profile.p12Bundle) {
      return {
        success: false,
        message:
          "Profile must have at least one authentication method (token, certificate, or P12 bundle).",
      };
    }

    try {
      const path = this.getProfilePath(profile.name);
      const data = JSON.stringify(profile, null, 2);

      // Write with secure permissions (owner read/write only)
      await fs.writeFile(path, data, { mode: 0o600 });

      return {
        success: true,
        message: `Profile '${profile.name}' saved successfully.`,
        profile,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to save profile: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }

  /**
   * Delete a profile by name
   */
  async delete(name: string): Promise<ProfileResult> {
    await this.ensureDirectories();

    // Check if profile exists
    const existing = await this.get(name);
    if (!existing) {
      return {
        success: false,
        message: `Profile '${name}' not found.`,
      };
    }

    // Check if it's the active profile
    const active = await this.getActive();
    if (active === name) {
      return {
        success: false,
        message: `Cannot delete active profile '${name}'. Switch to another profile first.`,
      };
    }

    try {
      const path = this.getProfilePath(name);
      await fs.unlink(path);

      return {
        success: true,
        message: `Profile '${name}' deleted successfully.`,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to delete profile: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }

  /**
   * Get the name of the active profile
   */
  async getActive(): Promise<string | null> {
    try {
      const name = await fs.readFile(this.config.activeProfileFile, "utf-8");
      return name.trim() || null;
    } catch {
      return null;
    }
  }

  /**
   * Clear the active profile (used for force delete)
   */
  async clearActive(): Promise<void> {
    try {
      await fs.unlink(this.config.activeProfileFile);
    } catch {
      // Ignore if file doesn't exist
    }
  }

  /**
   * Set the active profile
   */
  async setActive(name: string): Promise<ProfileResult> {
    await this.ensureDirectories();

    // Verify profile exists
    const profile = await this.get(name);
    if (!profile) {
      return {
        success: false,
        message: `Profile '${name}' not found.`,
      };
    }

    try {
      await fs.writeFile(this.config.activeProfileFile, name, {
        mode: 0o600,
      });

      return {
        success: true,
        message: `Switched to profile '${name}'.`,
        profile,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to set active profile: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }

  /**
   * Get the active profile (full profile data)
   */
  async getActiveProfile(): Promise<Profile | null> {
    const name = await this.getActive();
    if (!name) {
      return null;
    }
    return this.get(name);
  }

  /**
   * Check if a profile exists
   */
  async exists(name: string): Promise<boolean> {
    const profile = await this.get(name);
    return profile !== null;
  }

  /**
   * Mask sensitive fields for display
   */
  maskProfile(profile: Profile): Record<string, string> {
    const masked: Record<string, string> = {
      name: profile.name,
      apiUrl: profile.apiUrl,
    };

    if (profile.apiToken) {
      // Show only last 4 characters
      const len = profile.apiToken.length;
      masked.apiToken = len > 4 ? `****${profile.apiToken.slice(-4)}` : "****";
    }

    if (profile.p12Bundle) {
      masked.p12Bundle = "[configured]";
    }

    if (profile.cert) {
      masked.cert = "[configured]";
    }

    if (profile.key) {
      masked.key = "[configured]";
    }

    if (profile.defaultNamespace) {
      masked.defaultNamespace = profile.defaultNamespace;
    }

    return masked;
  }
}

// Singleton instance
let managerInstance: ProfileManager | null = null;

/**
 * Get the global ProfileManager instance
 */
export function getProfileManager(): ProfileManager {
  if (!managerInstance) {
    managerInstance = new ProfileManager();
  }
  return managerInstance;
}
