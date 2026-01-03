/**
 * Profile types for F5 XC authentication and configuration
 *
 * Profiles are stored in ~/.config/f5xc/profiles/ (XDG Base Directory compliant)
 */

/**
 * Profile represents a saved API connection configuration
 */
export interface Profile {
  /** Unique profile name */
  name: string;
  /** F5 XC API URL (e.g., https://tenant.console.ves.volterra.io) */
  apiUrl: string;
  /** API token for authentication */
  apiToken?: string;
  /** P12 bundle for certificate authentication */
  p12Bundle?: string;
  /** Certificate for mTLS authentication */
  cert?: string;
  /** Private key for mTLS authentication */
  key?: string;
  /** Default namespace for API operations */
  defaultNamespace?: string;
  /** Disable TLS certificate verification (staging/development only) */
  tlsInsecure?: boolean;
  /** Path to custom CA bundle for TLS verification */
  caBundle?: string;
}

/**
 * Profile storage configuration
 */
export interface ProfileConfig {
  /** Base directory for profile storage */
  configDir: string;
  /** Directory containing profile JSON files */
  profilesDir: string;
  /** File tracking active profile name */
  activeProfileFile: string;
}

/**
 * Result of profile operations
 */
export interface ProfileResult {
  success: boolean;
  message: string;
  profile?: Profile;
  profiles?: Profile[];
}

/**
 * Profile validation errors
 */
export type ProfileValidationError =
  | "INVALID_NAME"
  | "INVALID_URL"
  | "MISSING_AUTH"
  | "PROFILE_EXISTS"
  | "PROFILE_NOT_FOUND"
  | "CANNOT_DELETE_ACTIVE";
