/**
 * Auth Module - Export all authentication utilities
 *
 * Profiles are stored in ~/.config/f5xc/ (XDG Base Directory compliant).
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

// Re-export profile module
export { ProfileManager, getProfileManager } from "../profile/index.js";

export type {
  Profile,
  ProfileConfig,
  ProfileResult,
  ProfileValidationError,
} from "../profile/index.js";
