/**
 * Profile Module - XDG-compliant profile management
 *
 * Exports profile types and the ProfileManager singleton.
 */

export type { Profile, ProfileConfig, ProfileResult, ProfileValidationError } from "./types.js";

export { ProfileManager, getProfileManager } from "./manager.js";
