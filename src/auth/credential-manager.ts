/**
 * Credential Manager for F5 Distributed Cloud API
 *
 * Handles authentication configuration and URL normalization.
 * Supports dual-mode operation:
 * - Documentation mode: No credentials required
 * - Execution mode: API token or P12 certificate authentication
 */

import { readFileSync } from "fs";
import { logger } from "../utils/logging.js";
import { ConfigManager } from "../config/index.js";
import type { ConfigFile } from "../config/index.js";

/**
 * Authentication modes supported by the server
 */
export enum AuthMode {
  /** No authentication - documentation mode only */
  NONE = "none",
  /** API token authentication */
  TOKEN = "token",
  /** P12 certificate authentication (mTLS) */
  CERTIFICATE = "certificate",
}

/**
 * Environment variable names for authentication
 */
export const AUTH_ENV_VARS = {
  API_URL: "F5XC_API_URL",
  API_TOKEN: "F5XC_API_TOKEN",
  P12_FILE: "F5XC_P12_FILE",
  P12_PASSWORD: "F5XC_P12_PASSWORD",
  PROFILE: "F5XC_PROFILE",
} as const;

/**
 * Raw credentials as loaded from environment or config
 * Used internally for credential processing
 */
interface RawCredentials {
  apiUrl?: string;
  token?: string;
  p12File?: string;
  p12Password?: string;
}

/**
 * Credential configuration for API access
 */
export interface Credentials {
  /** Authentication mode */
  mode: AuthMode;
  /** Normalized API URL */
  apiUrl: string | null;
  /** API token (for token auth) */
  token: string | null;
  /** P12 certificate buffer (for cert auth) */
  p12Certificate: Buffer | null;
  /** P12 certificate password */
  p12Password: string | null;
}

/**
 * URL normalization patterns
 */
const URL_PATTERNS = {
  // Match short-form URLs: tenant.volterra.us or tenant.staging.volterra.us
  SHORT_FORM: /^https?:\/\/([^./]+)\.(staging\.)?volterra\.us\/?/i,
  // Match console URLs: tenant.console.ves.volterra.io
  CONSOLE_FORM: /^https?:\/\/([^./]+)\.(staging\.)?console\.ves\.volterra\.io\/?/i,
  // Trailing slashes and /api suffix
  TRAILING_CLEANUP: /\/+$|\/api\/?$/gi,
};

/**
 * Normalize F5XC tenant URL to standard API endpoint format
 *
 * Handles various input formats:
 * - tenant.volterra.us -> tenant.console.ves.volterra.io/api
 * - tenant.staging.volterra.us -> tenant.staging.console.ves.volterra.io/api
 * - tenant.console.ves.volterra.io -> tenant.console.ves.volterra.io/api
 * - Any of the above with trailing slashes or /api suffix
 *
 * @param input - Raw URL from user configuration
 * @returns Normalized API URL
 */
export function normalizeApiUrl(input: string): string {
  // Remove trailing slashes and existing /api suffix
  let url = input.replace(URL_PATTERNS.TRAILING_CLEANUP, "");

  // Handle short-form URLs (tenant.volterra.us)
  const shortFormMatch = url.match(URL_PATTERNS.SHORT_FORM);
  if (shortFormMatch) {
    const tenant = shortFormMatch[1];
    const staging = shortFormMatch[2] ?? "";
    url = `https://${tenant}.${staging}console.ves.volterra.io`;
  }

  // Handle console URLs - ensure https
  const consoleMatch = url.match(URL_PATTERNS.CONSOLE_FORM);
  if (consoleMatch) {
    const tenant = consoleMatch[1];
    const staging = consoleMatch[2] ?? "";
    url = `https://${tenant}.${staging}console.ves.volterra.io`;
  }

  // Ensure /api suffix
  return `${url}/api`;
}

/**
 * Extract tenant name from a normalized URL
 *
 * @param url - Normalized API URL
 * @returns Tenant name or null if not parseable
 */
export function extractTenantFromUrl(url: string): string | null {
  const match = url.match(/https?:\/\/([^./]+)\./);
  return match?.[1] ?? null;
}

/**
 * Credential Manager
 *
 * Manages authentication credentials for F5 Distributed Cloud API.
 * Supports dual-layer credential loading with priority:
 * 1. Environment variables (highest priority - overrides all)
 * 2. Named profiles from ~/.f5xc/credentials.json
 * 3. No credentials (documentation mode - lowest priority)
 */
export class CredentialManager {
  private credentials: Credentials;
  private activeProfile: string | null = null;
  private configManager: ConfigManager;

  constructor(configManager?: ConfigManager) {
    this.configManager = configManager ?? new ConfigManager();
    this.credentials = this.loadCredentials();
  }

  /**
   * Load credentials from environment variables
   */
  private loadFromEnvironment(): RawCredentials {
    return {
      apiUrl: process.env[AUTH_ENV_VARS.API_URL],
      token: process.env[AUTH_ENV_VARS.API_TOKEN],
      p12File: process.env[AUTH_ENV_VARS.P12_FILE],
      p12Password: process.env[AUTH_ENV_VARS.P12_PASSWORD],
    };
  }

  /**
   * Load credentials from configuration file
   */
  private loadFromConfigFile(): RawCredentials | null {
    try {
      const config = this.configManager.readSync();

      if (!config || Object.keys(config.profiles).length === 0) {
        return null;
      }

      const profileName = this.selectProfile(config);
      if (!profileName) {
        return null;
      }

      const profile = config.profiles[profileName];
      if (!profile) {
        return null;
      }

      this.activeProfile = profileName;

      // Touch the profile to update lastUsedAt (async, but don't block)
      this.configManager.touchProfile(profileName).catch(() => {
        // Silently ignore touch errors
      });

      return {
        apiUrl: profile.apiUrl,
        token: profile.apiToken,
        p12File: profile.p12File,
        p12Password: profile.p12Password,
      };
    } catch (error) {
      logger.debug("Failed to load credentials from config file", {
        error: error instanceof Error ? error.message : String(error),
      });
      return null;
    }
  }

  /**
   * Select which profile to use based on environment or config
   */
  private selectProfile(config: ConfigFile): string | null {
    // Check if F5XC_PROFILE is explicitly set
    const envProfile = process.env[AUTH_ENV_VARS.PROFILE];
    if (envProfile && config.profiles[envProfile]) {
      return envProfile;
    }

    // Fall back to default profile if set
    return config.defaultProfile ?? null;
  }

  /**
   * Merge raw credentials from environment and config
   * Environment variables override profile settings
   */
  private mergeCredentials(envCreds: RawCredentials, profileCreds: RawCredentials): RawCredentials {
    return {
      apiUrl: envCreds.apiUrl ?? profileCreds.apiUrl,
      token: envCreds.token ?? profileCreds.token,
      p12File: envCreds.p12File ?? profileCreds.p12File,
      p12Password: envCreds.p12Password ?? profileCreds.p12Password,
    };
  }

  /**
   * Build credentials object from raw credentials
   */
  private buildCredentials(rawCreds: RawCredentials): Credentials {
    const apiUrl = rawCreds.apiUrl;
    const token = rawCreds.token;
    const p12File = rawCreds.p12File;
    const p12Password = rawCreds.p12Password;

    // Determine authentication mode
    let mode = AuthMode.NONE;
    let normalizedUrl: string | null = null;
    let p12Certificate: Buffer | null = null;

    if (apiUrl) {
      normalizedUrl = normalizeApiUrl(apiUrl);

      if (p12File) {
        // Certificate authentication takes precedence
        mode = AuthMode.CERTIFICATE;
        try {
          p12Certificate = readFileSync(p12File);
          logger.info("Loaded P12 certificate", { file: p12File });
        } catch (error) {
          logger.error("Failed to load P12 certificate", {
            file: p12File,
            error: error instanceof Error ? error.message : String(error),
          });
          // Fall back to token auth if certificate load fails
          if (token) {
            mode = AuthMode.TOKEN;
            logger.info("Falling back to token authentication");
          } else {
            mode = AuthMode.NONE;
          }
        }
      } else if (token) {
        mode = AuthMode.TOKEN;
      }
    }

    return {
      mode,
      apiUrl: normalizedUrl,
      token: token ?? null,
      p12Certificate,
      p12Password: p12Password ?? null,
    };
  }

  /**
   * Load credentials with priority order:
   * 1. Environment variables (highest)
   * 2. Profile from config file
   * 3. No credentials - documentation mode (lowest)
   */
  private loadCredentials(): Credentials {
    // Step 1: Try environment variables first (highest priority)
    const envCreds = this.loadFromEnvironment();
    if (envCreds.apiUrl && (envCreds.token || envCreds.p12File)) {
      const credentials = this.buildCredentials(envCreds);
      const tenant = credentials.apiUrl ? extractTenantFromUrl(credentials.apiUrl) : null;
      logger.info("Credentials loaded from environment variables", {
        mode: credentials.mode,
        tenant,
        profile: this.activeProfile,
      });
      return credentials;
    }

    // Step 2: Try config file profile (medium priority)
    const profileCreds = this.loadFromConfigFile();
    if (profileCreds) {
      const merged = this.mergeCredentials(envCreds, profileCreds);
      const credentials = this.buildCredentials(merged);

      if (credentials.mode !== AuthMode.NONE) {
        const tenant = credentials.apiUrl ? extractTenantFromUrl(credentials.apiUrl) : null;
        logger.info("Credentials loaded from config profile", {
          mode: credentials.mode,
          tenant,
          profile: this.activeProfile,
        });
        return credentials;
      }
    }

    // Step 3: No credentials - documentation mode (lowest priority)
    logger.info("No credentials configured - running in documentation mode");
    return {
      mode: AuthMode.NONE,
      apiUrl: null,
      token: null,
      p12Certificate: null,
      p12Password: null,
    };
  }

  /**
   * Get the active profile name (if any)
   * Returns null if credentials are from environment variables or no profile is active
   */
  getActiveProfile(): string | null {
    return this.activeProfile;
  }

  /**
   * Get the current authentication mode
   */
  getAuthMode(): AuthMode {
    return this.credentials.mode;
  }

  /**
   * Check if the server is in authenticated mode
   */
  isAuthenticated(): boolean {
    return this.credentials.mode !== AuthMode.NONE;
  }

  /**
   * Get the normalized API URL
   */
  getApiUrl(): string | null {
    return this.credentials.apiUrl;
  }

  /**
   * Get the tenant name
   */
  getTenant(): string | null {
    return this.credentials.apiUrl ? extractTenantFromUrl(this.credentials.apiUrl) : null;
  }

  /**
   * Get API token (for token authentication)
   */
  getToken(): string | null {
    return this.credentials.token;
  }

  /**
   * Get P12 certificate buffer (for certificate authentication)
   */
  getP12Certificate(): Buffer | null {
    return this.credentials.p12Certificate;
  }

  /**
   * Get P12 certificate password
   */
  getP12Password(): string | null {
    return this.credentials.p12Password;
  }

  /**
   * Get full credentials object
   */
  getCredentials(): Readonly<Credentials> {
    return Object.freeze({ ...this.credentials });
  }

  /**
   * Reload credentials from environment
   * Useful for testing or when credentials change
   */
  reload(): void {
    this.credentials = this.loadCredentials();
  }
}
