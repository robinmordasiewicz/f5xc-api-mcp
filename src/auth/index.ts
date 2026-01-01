/**
 * Auth Module - Export all authentication utilities
 *
 * Cross-compatible with f5xc-xcsh CLI.
 * Profiles are stored in ~/.config/xcsh/ (shared with xcsh CLI).
 */

export {
  AuthMode,
  AUTH_ENV_VARS,
  CredentialManager,
  normalizeApiUrl,
  extractTenantFromUrl,
} from "./credential-manager.js";

export type { Credentials } from "./credential-manager.js";

export { HttpClient, createHttpClient } from "./http-client.js";

export type { HttpClientConfig, ApiResponse } from "./http-client.js";

// Re-export profile module for cross-compatibility with f5xc-xcsh
export { ProfileManager, getProfileManager } from "../profile/index.js";

export type {
  Profile,
  ProfileConfig,
  ProfileResult,
  ProfileValidationError,
} from "../profile/index.js";
