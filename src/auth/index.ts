/**
 * Auth Module - Export all authentication utilities
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
