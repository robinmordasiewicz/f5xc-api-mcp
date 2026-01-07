/**
 * XDG Base Directory compliant paths for F5 XC configuration
 * See: https://specifications.freedesktop.org/basedir/latest/
 *
 * This is the single source of truth for all application paths.
 * All modules should import from here instead of constructing paths directly.
 *
 * Default paths:
 * - Config: ~/.config/f5xc/
 * - State: ~/.local/state/f5xc/
 */

import { homedir } from "os";
import { join } from "path";

/**
 * Application name for XDG-compliant directory structure
 */
const APP_NAME = "f5xc";

/**
 * Get XDG-compliant config directory
 * Config files: settings, profiles, preferences
 * Default: ~/.config/f5xc
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
 * Default: ~/.local/state/f5xc
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
  get configDir(): string {
    return getConfigDir();
  },
  get profilesDir(): string {
    return join(getConfigDir(), "profiles");
  },
  get activeProfile(): string {
    return join(getConfigDir(), "active_profile");
  },
  get settings(): string {
    return join(getConfigDir(), "config.yaml");
  },

  // State files (XDG_STATE_HOME)
  get stateDir(): string {
    return getStateDir();
  },
  get history(): string {
    return join(getStateDir(), "history");
  },
};
