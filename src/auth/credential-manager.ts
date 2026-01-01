/**
 * Credential Manager for F5 Distributed Cloud API
 *
 * Handles authentication configuration and URL normalization.
 * Supports dual-mode operation:
 * - Documentation mode: No credentials required
 * - Execution mode: API token or P12/Certificate authentication
 *
 * Cross-compatible with f5xc-xcsh CLI profiles.
 */

import { readFileSync } from "fs";
import { logger } from "../utils/logging.js";
import { getProfileManager, type Profile } from "../profile/index.js";

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
 * These take priority over profile settings
 */
export const AUTH_ENV_VARS = {
  API_URL: "F5XC_API_URL",
  API_TOKEN: "F5XC_API_TOKEN",
  P12_BUNDLE: "F5XC_P12_BUNDLE",
  CERT: "F5XC_CERT",
  KEY: "F5XC_KEY",
  NAMESPACE: "F5XC_NAMESPACE",
} as const;

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
  /** Certificate content (for mTLS) */
  cert: string | null;
  /** Private key content (for mTLS) */
  key: string | null;
  /** Default namespace */
  namespace: string | null;
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
 * Supports credential loading with priority:
 * 1. Environment variables (highest priority - overrides all)
 * 2. Active profile from ~/.config/xcsh/ (cross-compatible with xcsh CLI)
 * 3. No credentials (documentation mode - lowest priority)
 */
export class CredentialManager {
  private credentials: Credentials;
  private activeProfileName: string | null = null;
  private initialized = false;

  constructor() {
    // Initialize with empty credentials - will be loaded async
    this.credentials = {
      mode: AuthMode.NONE,
      apiUrl: null,
      token: null,
      p12Certificate: null,
      cert: null,
      key: null,
      namespace: null,
    };
  }

  /**
   * Initialize credentials asynchronously
   * Must be called before using credentials
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;
    this.credentials = await this.loadCredentials();
    this.initialized = true;
  }

  /**
   * Load credentials from environment variables
   */
  private loadFromEnvironment(): Partial<Profile> & { hasAuth: boolean } {
    const apiUrl = process.env[AUTH_ENV_VARS.API_URL];
    const apiToken = process.env[AUTH_ENV_VARS.API_TOKEN];
    const p12Bundle = process.env[AUTH_ENV_VARS.P12_BUNDLE];
    const cert = process.env[AUTH_ENV_VARS.CERT];
    const key = process.env[AUTH_ENV_VARS.KEY];
    const defaultNamespace = process.env[AUTH_ENV_VARS.NAMESPACE];

    const hasAuth = !!(apiToken || p12Bundle || (cert && key));

    return {
      name: "__env__",
      apiUrl: apiUrl || "",
      apiToken,
      p12Bundle,
      cert,
      key,
      defaultNamespace,
      hasAuth,
    };
  }

  /**
   * Load credentials from active profile
   */
  private async loadFromProfile(): Promise<Profile | null> {
    try {
      const profileManager = getProfileManager();
      const profile = await profileManager.getActiveProfile();

      if (profile) {
        this.activeProfileName = profile.name;
        return profile;
      }

      return null;
    } catch (error) {
      logger.debug("Failed to load credentials from profile", {
        error: error instanceof Error ? error.message : String(error),
      });
      return null;
    }
  }

  /**
   * Build credentials object from profile data
   */
  private buildCredentials(profile: Profile): Credentials {
    const apiUrl = profile.apiUrl;

    // Determine authentication mode
    let mode = AuthMode.NONE;
    let normalizedUrl: string | null = null;
    let p12Certificate: Buffer | null = null;
    let cert: string | null = null;
    let key: string | null = null;

    if (apiUrl) {
      normalizedUrl = normalizeApiUrl(apiUrl);

      if (profile.p12Bundle) {
        // P12 certificate authentication
        mode = AuthMode.CERTIFICATE;
        try {
          p12Certificate = readFileSync(profile.p12Bundle);
          logger.info("Loaded P12 certificate", { file: profile.p12Bundle });
        } catch (error) {
          logger.error("Failed to load P12 certificate", {
            file: profile.p12Bundle,
            error: error instanceof Error ? error.message : String(error),
          });
          // Fall back to token auth if certificate load fails
          if (profile.apiToken) {
            mode = AuthMode.TOKEN;
            logger.info("Falling back to token authentication");
          } else {
            mode = AuthMode.NONE;
          }
        }
      } else if (profile.cert && profile.key) {
        // Certificate + key authentication
        mode = AuthMode.CERTIFICATE;
        try {
          cert = readFileSync(profile.cert, "utf-8");
          key = readFileSync(profile.key, "utf-8");
          logger.info("Loaded certificate and key", {
            cert: profile.cert,
            key: profile.key,
          });
        } catch (error) {
          logger.error("Failed to load certificate/key", {
            error: error instanceof Error ? error.message : String(error),
          });
          if (profile.apiToken) {
            mode = AuthMode.TOKEN;
            logger.info("Falling back to token authentication");
          } else {
            mode = AuthMode.NONE;
          }
        }
      } else if (profile.apiToken) {
        mode = AuthMode.TOKEN;
      }
    }

    return {
      mode,
      apiUrl: normalizedUrl,
      token: profile.apiToken ?? null,
      p12Certificate,
      cert,
      key,
      namespace: profile.defaultNamespace ?? null,
    };
  }

  /**
   * Load credentials with priority order:
   * 1. Environment variables (highest)
   * 2. Active profile from ~/.config/xcsh/
   * 3. No credentials - documentation mode (lowest)
   */
  private async loadCredentials(): Promise<Credentials> {
    // Step 1: Check environment variables first (highest priority)
    const envCreds = this.loadFromEnvironment();
    if (envCreds.apiUrl && envCreds.hasAuth) {
      const credentials = this.buildCredentials(envCreds as Profile);
      const tenant = credentials.apiUrl ? extractTenantFromUrl(credentials.apiUrl) : null;
      logger.info("Credentials loaded from environment variables", {
        mode: credentials.mode,
        tenant,
      });
      return credentials;
    }

    // Step 2: Try active profile from ~/.config/xcsh/
    const profile = await this.loadFromProfile();
    if (profile) {
      const credentials = this.buildCredentials(profile);

      if (credentials.mode !== AuthMode.NONE) {
        const tenant = credentials.apiUrl ? extractTenantFromUrl(credentials.apiUrl) : null;
        logger.info("Credentials loaded from profile", {
          mode: credentials.mode,
          tenant,
          profile: this.activeProfileName,
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
      cert: null,
      key: null,
      namespace: null,
    };
  }

  /**
   * Get the active profile name (if any)
   * Returns null if credentials are from environment variables or no profile is active
   */
  getActiveProfile(): string | null {
    return this.activeProfileName;
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
   * Get certificate content (for mTLS)
   */
  getCert(): string | null {
    return this.credentials.cert;
  }

  /**
   * Get private key content (for mTLS)
   */
  getKey(): string | null {
    return this.credentials.key;
  }

  /**
   * Get default namespace
   */
  getNamespace(): string | null {
    return this.credentials.namespace;
  }

  /**
   * Get full credentials object
   */
  getCredentials(): Readonly<Credentials> {
    return Object.freeze({ ...this.credentials });
  }

  /**
   * Reload credentials from environment/profile
   * Useful for testing or when credentials change
   */
  async reload(): Promise<void> {
    this.initialized = false;
    this.activeProfileName = null;
    await this.initialize();
  }
}
