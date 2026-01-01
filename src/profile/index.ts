/**
 * Profile Module - XDG-compliant profile management
 *
 * Cross-compatible with f5xc-xcsh CLI.
 * Exports profile types and the ProfileManager singleton.
 */

export type { Profile, ProfileConfig, ProfileResult, ProfileValidationError } from "./types.js";

export { ProfileManager, getProfileManager } from "./manager.js";
