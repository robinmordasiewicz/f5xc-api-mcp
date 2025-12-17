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
 * Reads configuration from environment variables and provides
 * normalized credentials for API access.
 */
export class CredentialManager {
  private credentials: Credentials;

  constructor() {
    this.credentials = this.loadCredentials();
  }

  /**
   * Load credentials from environment variables
   */
  private loadCredentials(): Credentials {
    const apiUrl = process.env[AUTH_ENV_VARS.API_URL];
    const token = process.env[AUTH_ENV_VARS.API_TOKEN];
    const p12File = process.env[AUTH_ENV_VARS.P12_FILE];
    const p12Password = process.env[AUTH_ENV_VARS.P12_PASSWORD];

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

    const tenant = normalizedUrl ? extractTenantFromUrl(normalizedUrl) : null;

    logger.info("Credentials loaded", {
      mode,
      tenant,
      hasToken: Boolean(token),
      hasP12: Boolean(p12Certificate),
    });

    return {
      mode,
      apiUrl: normalizedUrl,
      token: token ?? null,
      p12Certificate,
      p12Password: p12Password ?? null,
    };
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
