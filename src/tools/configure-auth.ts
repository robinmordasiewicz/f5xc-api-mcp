// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Configure Auth Tool - MCP tool for authentication management
 *
 * Provides actions:
 * - status: Check current authentication state
 * - configure: Save credentials to profile
 * - list-profiles: List available profiles
 * - set-active: Switch active profile
 */

import { z } from "zod";
import {
  getProfileManager,
  type CredentialManager,
  type Profile,
} from "@robinmordasiewicz/f5xc-auth";
import { normalizeF5XCUrl, verifyF5XCEndpoint } from "../utils/url-utils.js";
import { logger } from "../utils/logging.js";

/**
 * Tool name constant
 */
export const CONFIGURE_AUTH_TOOL = {
  name: "f5xc-api-configure-auth",
  description:
    "Configure F5XC API authentication. Check status, save credentials to profile, list profiles, or switch active profile.",
};

/**
 * Input schema for the configure-auth tool
 */
export const configureAuthSchema = {
  action: z
    .enum(["status", "configure", "list-profiles", "set-active"])
    .optional()
    .default("status")
    .describe("Action to perform (default: status)"),
  tenantUrl: z
    .string()
    .optional()
    .describe(
      "F5XC tenant URL. Accepts various formats: https://tenant.console.ves.volterra.io, tenant.console.ves.volterra.io, tenant.staging.volterra.us, or even just the tenant name"
    ),
  apiToken: z.string().optional().describe("API token for authentication"),
  profileName: z
    .string()
    .optional()
    .default("default")
    .describe("Profile name (default: 'default')"),
  skipVerification: z
    .boolean()
    .optional()
    .default(false)
    .describe("Skip URL verification (useful for air-gapped environments)"),
};

/**
 * Response types
 */
interface StatusResponse {
  authenticated: boolean;
  mode: "documentation" | "execution";
  authMethod: string;
  tenantUrl: string | null;
  activeProfile: string | null;
  profiles: string[];
  message: string;
}

interface ConfigureResponse {
  success: boolean;
  profileName: string;
  message: string;
}

interface ListProfilesResponse {
  profiles: Array<{
    name: string;
    isActive: boolean;
    tenantUrl: string;
    authMethod: string;
  }>;
  activeProfile: string | null;
}

interface SetActiveResponse {
  success: boolean;
  profileName: string;
  message: string;
}

type ToolResponse = StatusResponse | ConfigureResponse | ListProfilesResponse | SetActiveResponse;

/**
 * Handle the configure-auth tool invocation
 */
export async function handleConfigureAuth(
  args: {
    action?: "status" | "configure" | "list-profiles" | "set-active";
    tenantUrl?: string;
    apiToken?: string;
    profileName?: string;
    skipVerification?: boolean;
  },
  credentialManager: CredentialManager
): Promise<ToolResponse> {
  const action = args.action ?? "status";
  const profileManager = getProfileManager();

  switch (action) {
    case "status":
      return handleStatus(credentialManager, profileManager);

    case "configure":
      return handleConfigure(args, credentialManager, profileManager);

    case "list-profiles":
      return handleListProfiles(profileManager);

    case "set-active":
      return handleSetActive(args.profileName ?? "default", credentialManager, profileManager);

    default:
      return {
        success: false,
        profileName: "",
        message: `Unknown action: ${action}`,
      };
  }
}

/**
 * Handle status action
 */
async function handleStatus(
  credentialManager: CredentialManager,
  profileManager: ReturnType<typeof getProfileManager>
): Promise<StatusResponse> {
  const isAuthenticated = credentialManager.isAuthenticated();
  const authMode = credentialManager.getAuthMode();
  const tenantUrl = credentialManager.getApiUrl();
  const activeProfile = credentialManager.getActiveProfile();

  // Get list of available profiles
  const profiles = await profileManager.list();
  const profileNames = profiles.map((p) => p.name);

  if (isAuthenticated) {
    return {
      authenticated: true,
      mode: "execution",
      authMethod: authMode,
      tenantUrl,
      activeProfile,
      profiles: profileNames,
      message: activeProfile
        ? `Authenticated via profile '${activeProfile}'. API execution enabled.`
        : "Authenticated via environment variables. API execution enabled.",
    };
  }

  return {
    authenticated: false,
    mode: "documentation",
    authMethod: "none",
    tenantUrl: null,
    activeProfile: null,
    profiles: profileNames,
    message:
      profileNames.length > 0
        ? `No active profile. Available profiles: ${profileNames.join(", ")}. Use action='set-active' to activate one, or action='configure' to create a new profile.`
        : "No credentials configured. Use action='configure' with tenantUrl and apiToken to authenticate.",
  };
}

/**
 * Handle configure action
 */
async function handleConfigure(
  args: {
    tenantUrl?: string;
    apiToken?: string;
    profileName?: string;
    skipVerification?: boolean;
  },
  credentialManager: CredentialManager,
  profileManager: ReturnType<typeof getProfileManager>
): Promise<ConfigureResponse> {
  const { tenantUrl, apiToken, profileName = "default", skipVerification = false } = args;

  // Validate required fields
  if (!tenantUrl) {
    return {
      success: false,
      profileName,
      message: "Missing required parameter: tenantUrl",
    };
  }

  if (!apiToken) {
    return {
      success: false,
      profileName,
      message: "Missing required parameter: apiToken",
    };
  }

  // Normalize URL to consistent format
  const normalizedUrl = normalizeF5XCUrl(tenantUrl);
  logger.info(`Normalizing URL: ${tenantUrl} -> ${normalizedUrl}`);

  // Verify URL is accessible (unless skipped)
  if (!skipVerification) {
    logger.info(`Verifying URL accessibility: ${normalizedUrl}`);
    const verification = await verifyF5XCEndpoint(normalizedUrl);

    if (!verification.valid) {
      let message = `URL verification failed for "${tenantUrl}": ${verification.error}`;
      if (verification.suggestions?.length) {
        message += `\n\nSuggestions:\n${verification.suggestions.map((s) => `  - ${s}`).join("\n")}`;
      }
      message += "\n\nUse skipVerification=true to bypass this check.";
      return {
        success: false,
        profileName,
        message,
      };
    }

    logger.info(`URL verification successful: ${verification.normalizedUrl}`);
  }

  // Create profile object with normalized URL
  const profile: Profile = {
    name: profileName,
    apiUrl: normalizedUrl,
    apiToken,
  };

  // Save the profile
  const result = await profileManager.save(profile);

  if (!result.success) {
    return {
      success: false,
      profileName,
      message: result.message,
    };
  }

  // Set as active profile
  const activeResult = await profileManager.setActive(profileName);

  if (!activeResult.success) {
    return {
      success: false,
      profileName,
      message: `Profile saved but failed to set as active: ${activeResult.message}`,
    };
  }

  // Reload credentials to pick up the new profile
  await credentialManager.reload();

  return {
    success: true,
    profileName,
    message: `Credentials saved to profile '${profileName}' and set as active. URL normalized to: ${normalizedUrl}. API execution is now enabled.`,
  };
}

/**
 * Handle list-profiles action
 */
async function handleListProfiles(
  profileManager: ReturnType<typeof getProfileManager>
): Promise<ListProfilesResponse> {
  const profiles = await profileManager.list();
  const activeProfileName = await profileManager.getActive();

  const profileList = profiles.map((p) => {
    // Determine auth method
    let authMethod = "none";
    if (p.apiToken) authMethod = "token";
    else if (p.p12Bundle) authMethod = "p12";
    else if (p.cert && p.key) authMethod = "certificate";

    return {
      name: p.name,
      isActive: p.name === activeProfileName,
      tenantUrl: p.apiUrl,
      authMethod,
    };
  });

  return {
    profiles: profileList,
    activeProfile: activeProfileName,
  };
}

/**
 * Handle set-active action
 */
async function handleSetActive(
  profileName: string,
  credentialManager: CredentialManager,
  profileManager: ReturnType<typeof getProfileManager>
): Promise<SetActiveResponse> {
  const result = await profileManager.setActive(profileName);

  if (!result.success) {
    return {
      success: false,
      profileName,
      message: result.message,
    };
  }

  // Reload credentials to use the new active profile
  await credentialManager.reload();

  return {
    success: true,
    profileName,
    message: `Switched to profile '${profileName}'. Credentials reloaded.`,
  };
}
