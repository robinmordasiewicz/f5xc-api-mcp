/**
 * Configuration types for F5XC API MCP credential management
 * Supports multiple named profiles stored in ~/.f5xc/credentials.json
 */

/**
 * Metadata about a profile
 */
export interface ProfileMetadata {
  /** Optional description of the profile (e.g., "Production", "Staging") */
  description?: string;
  /** ISO timestamp when profile was created */
  createdAt: string;
  /** ISO timestamp when profile was last used */
  lastUsedAt?: string;
  /** ISO timestamp when profile was last modified */
  lastModifiedAt: string;
}

/**
 * Credentials for a single F5XC tenant profile
 */
export interface ProfileCredentials {
  /** F5XC API URL (e.g., https://tenant.volterra.io) */
  apiUrl?: string;
  /** F5XC API Token for TOKEN auth mode */
  apiToken?: string;
  /** Path to P12 certificate file for CERTIFICATE auth mode */
  p12File?: string;
  /** Password for P12 certificate */
  p12Password?: string;
  /** Metadata about this profile */
  metadata?: ProfileMetadata;
}

/**
 * Complete configuration file structure
 * Stored at ~/.f5xc/credentials.json
 */
export interface ConfigFile {
  /** Configuration schema version for migration purposes */
  version: string;
  /** Name of the default profile to use */
  defaultProfile?: string;
  /** Map of profile names to their credentials */
  profiles: Record<string, ProfileCredentials>;
  /** General metadata about the config file */
  metadata?: {
    lastModifiedAt: string;
  };
}

/**
 * Raw credentials as loaded from environment or config
 * Used internally for credential processing
 */
export interface RawCredentials {
  apiUrl?: string;
  token?: string;
  p12File?: string;
  p12Password?: string;
}

/**
 * Configuration schema version
 */
export const CONFIG_SCHEMA_VERSION = "1.0";

/**
 * Default empty configuration
 */
export const DEFAULT_CONFIG: ConfigFile = {
  version: CONFIG_SCHEMA_VERSION,
  profiles: {},
};

/**
 * File system permissions for security
 */
export const CONFIG_DIR_PERMISSIONS = 0o700;    // rwx------ (user only)
export const CONFIG_FILE_PERMISSIONS = 0o600;   // rw------- (user read/write only)

/**
 * Configuration paths
 */
export const getConfigDirPath = (): string => {
  const home = process.env.HOME || process.env.USERPROFILE || "";
  return `${home}/.f5xc`;
};

export const getConfigFilePath = (): string => {
  return `${getConfigDirPath()}/credentials.json`;
};
