/**
 * XDG Base Directory compliant paths for F5 XC configuration
 * See: https://specifications.freedesktop.org/basedir/latest/
 *
 * This is the single source of truth for all application paths.
 * All modules should import from here instead of constructing paths directly.
 *
 * Cross-compatible with f5xc-xcsh CLI - both tools share the same config directory.
 */

import { homedir } from "os";
import { join } from "path";

/**
 * Shared application name with f5xc-xcsh CLI for cross-compatibility
 * Both tools will read/write profiles from the same directory
 */
const APP_NAME = "xcsh";

/**
 * Get XDG-compliant config directory
 * Config files: settings, profiles, preferences
 * Default: ~/.config/xcsh
 */
export function getConfigDir(): string {
  const xdgConfig = process.env.XDG_CONFIG_HOME;
  if (xdgConfig) {
    return join(xdgConfig, APP_NAME);
  }
  return join(homedir(), ".config", APP_NAME);
}

/**
 * Get XDG-compliant state directory
 * State files: history, logs, undo history, session state
 * Default: ~/.local/state/xcsh
 */
export function getStateDir(): string {
  const xdgState = process.env.XDG_STATE_HOME;
  if (xdgState) {
    return join(xdgState, APP_NAME);
  }
  return join(homedir(), ".local", "state", APP_NAME);
}

/**
 * Centralized path definitions
 * Use these getters for all file path access throughout the application
 */
export const paths = {
  // Config files (XDG_CONFIG_HOME)
  get configDir() {
    return getConfigDir();
  },
  get profilesDir() {
    return join(getConfigDir(), "profiles");
  },
  get activeProfile() {
    return join(getConfigDir(), "active_profile");
  },
  get settings() {
    return join(getConfigDir(), "config.yaml");
  },

  // State files (XDG_STATE_HOME)
  get stateDir() {
    return getStateDir();
  },
  get history() {
    return join(getStateDir(), "history");
  },
};
