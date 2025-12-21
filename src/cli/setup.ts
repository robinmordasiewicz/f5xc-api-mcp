/**
 * Interactive CLI setup wizard for F5XC API MCP credentials
 *
 * Features:
 * - Auto-detection of existing environment variables
 * - Interactive profile creation with validation
 * - Profile management (list, delete, set default)
 */

import * as readline from "readline";
import { ConfigManager } from "../config/index.js";
import { AUTH_ENV_VARS } from "../auth/credential-manager.js";
import type { ProfileCredentials } from "../config/index.js";
import { logger } from "../utils/logging.js";

/**
 * Detected environment credentials
 */
interface DetectedCredentials {
  hasCredentials: boolean;
  apiUrl?: string;
  apiToken?: string;
  p12File?: string;
  p12Password?: string;
}

/**
 * Detect existing environment variables
 */
function detectEnvironmentCredentials(): DetectedCredentials {
  const apiUrl = process.env[AUTH_ENV_VARS.API_URL];
  const apiToken = process.env[AUTH_ENV_VARS.API_TOKEN];
  const p12File = process.env[AUTH_ENV_VARS.P12_FILE];
  const p12Password = process.env[AUTH_ENV_VARS.P12_PASSWORD];

  return {
    hasCredentials: Boolean(apiUrl && (apiToken || p12File)),
    apiUrl,
    apiToken,
    p12File,
    p12Password,
  };
}

/**
 * Create a readline interface for user input
 */
function createReadlineInterface(): readline.Interface {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

/**
 * Prompt user with a question
 */
async function prompt(rl: readline.Interface, question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

/**
 * Validate profile name format
 */
function validateProfileName(name: string): { valid: boolean; error?: string } {
  if (!name) {
    return { valid: false, error: "Profile name cannot be empty" };
  }

  if (!/^[a-z0-9_-]+$/i.test(name)) {
    return {
      valid: false,
      error: "Profile name must contain only alphanumeric characters, hyphens, and underscores",
    };
  }

  return { valid: true };
}

/**
 * Create a profile from detected environment variables
 */
async function createProfileFromEnv(
  rl: readline.Interface,
  configManager: ConfigManager,
  envCreds: DetectedCredentials,
): Promise<void> {
  console.log();

  // Get profile name
  let profileName = "";
  while (!profileName) {
    const answer = await prompt(rl, "Profile name [production]: ");
    profileName = answer || "production";

    const validation = validateProfileName(profileName);
    if (!validation.valid) {
      console.log(`❌ ${validation.error}`);
      profileName = "";
    }
  }

  // Get optional description
  const description = await prompt(rl, "Description [Environment credentials]: ");

  // Create profile
  const profile: ProfileCredentials = {
    apiUrl: envCreds.apiUrl,
    apiToken: envCreds.apiToken,
    p12File: envCreds.p12File,
    p12Password: envCreds.p12Password,
    metadata: {
      description: description || "Environment credentials",
      createdAt: new Date().toISOString(),
      lastModifiedAt: new Date().toISOString(),
    },
  };

  await configManager.setProfile(profileName, profile);
  console.log(`\n✅ Profile "${profileName}" created from environment variables!\n`);

  // Ask if user wants to set as default
  const setDefault = await prompt(rl, "Set as default profile? (Y/n): ");
  if (setDefault.toLowerCase() !== "n") {
    await configManager.setDefaultProfile(profileName);
    console.log(`✅ "${profileName}" set as default profile\n`);
  }

  console.log("Next steps:");
  console.log("  • Run 'f5xc-api-mcp' to start with this profile");
  console.log("  • Or use 'F5XC_PROFILE=staging f5xc-api-mcp' for other profiles");
  console.log("  • Environment variables still override profile settings\n");
}

/**
 * Create a profile manually
 */
async function addProfile(rl: readline.Interface, configManager: ConfigManager): Promise<void> {
  console.log("\nLet's create a new profile.\n");

  // Get profile name
  let profileName = "";
  while (!profileName) {
    const answer = await prompt(rl, "Profile name: ");
    profileName = answer;

    if (!profileName) {
      console.log("❌ Profile name cannot be empty");
    } else {
      const validation = validateProfileName(profileName);
      if (!validation.valid) {
        console.log(`❌ ${validation.error}`);
        profileName = "";
      }
    }
  }

  // Get description
  const description = await prompt(rl, "Description (optional): ");

  // Get API URL
  let apiUrl = "";
  while (!apiUrl) {
    const answer = await prompt(rl, "F5XC API URL: ");
    apiUrl = answer;

    if (!apiUrl) {
      console.log("❌ API URL cannot be empty");
    } else if (!apiUrl.startsWith("http://") && !apiUrl.startsWith("https://")) {
      console.log("❌ API URL must start with http:// or https://");
      apiUrl = "";
    }
  }

  // Get authentication method
  console.log("\nAuthentication method:");
  console.log("  1) API Token");
  console.log("  2) P12 Certificate");

  let authMethod = "";
  while (authMethod !== "1" && authMethod !== "2") {
    authMethod = await prompt(rl, "Select (1-2) [1]: ");
    authMethod = authMethod || "1";

    if (authMethod !== "1" && authMethod !== "2") {
      console.log("❌ Please select 1 or 2");
      authMethod = "";
    }
  }

  let apiToken: string | undefined;
  let p12File: string | undefined;
  let p12Password: string | undefined;

  if (authMethod === "1") {
    // Token authentication
    apiToken = await prompt(rl, "API Token: ");
    if (!apiToken) {
      console.log("❌ API Token cannot be empty");
      return;
    }
  } else {
    // Certificate authentication
    p12File = await prompt(rl, "Path to P12 certificate file: ");
    if (!p12File) {
      console.log("❌ P12 file path cannot be empty");
      return;
    }

    p12Password = await prompt(rl, "P12 certificate password (optional): ");
  }

  // Create profile
  const profile: ProfileCredentials = {
    apiUrl,
    apiToken,
    p12File,
    p12Password: p12Password || undefined,
    metadata: {
      description: description || undefined,
      createdAt: new Date().toISOString(),
      lastModifiedAt: new Date().toISOString(),
    },
  };

  await configManager.setProfile(profileName, profile);
  console.log(`\n✅ Profile "${profileName}" created successfully!\n`);

  // Ask if user wants to set as default
  const setDefault = await prompt(rl, "Set as default profile? (Y/n): ");
  if (setDefault.toLowerCase() !== "n") {
    await configManager.setDefaultProfile(profileName);
    console.log(`✅ "${profileName}" set as default profile\n`);
  }
}

/**
 * Run the interactive setup wizard
 */
export async function runSetupWizard(): Promise<void> {
  const rl = createReadlineInterface();
  const configManager = new ConfigManager();

  try {
    console.log("\n🔧 F5XC API MCP Server - Credential Setup\n");

    // Check for existing environment variables
    const envCreds = detectEnvironmentCredentials();

    if (envCreds.hasCredentials) {
      console.log("✅ Detected existing environment variables:");
      if (envCreds.apiUrl) {
        console.log(`   F5XC_API_URL: ${envCreds.apiUrl}`);
      }
      if (envCreds.apiToken) {
        console.log(`   F5XC_API_TOKEN: ***${envCreds.apiToken.slice(-4)}`);
      }
      if (envCreds.p12File) {
        console.log(`   F5XC_P12_FILE: ${envCreds.p12File}`);
      }
      console.log();

      const useEnv = await prompt(rl, "Create profile from environment variables? (Y/n): ");

      if (useEnv.toLowerCase() !== "n") {
        await createProfileFromEnv(rl, configManager, envCreds);
        return;
      }
    }

    // Manual profile creation
    await addProfile(rl, configManager);
  } catch (error) {
    logger.error("Setup wizard error", {
      error: error instanceof Error ? error.message : String(error),
    });
    process.exit(1);
  } finally {
    rl.close();
  }
}

/**
 * List all configured profiles
 */
export async function listProfiles(): Promise<void> {
  const configManager = new ConfigManager();

  try {
    const profiles = await configManager.listProfiles();
    const defaultProfile = await configManager.getDefaultProfile();

    if (profiles.length === 0) {
      console.log("No profiles configured. Run 'f5xc-api-mcp --setup' to create one.\n");
      return;
    }

    console.log("Configured profiles:\n");

    for (const profile of profiles) {
      const creds = await configManager.getProfile(profile);
      const isDefault = profile === defaultProfile ? " (default)" : "";
      console.log(`  • ${profile}${isDefault}`);

      if (creds?.metadata?.description) {
        console.log(`    ${creds.metadata.description}`);
      }

      if (creds?.apiUrl) {
        console.log(`    URL: ${creds.apiUrl}`);
      }

      console.log();
    }
  } catch (error) {
    logger.error("Failed to list profiles", {
      error: error instanceof Error ? error.message : String(error),
    });
    process.exit(1);
  }
}

/**
 * Delete a profile
 */
export async function deleteProfile(name: string): Promise<void> {
  const configManager = new ConfigManager();

  try {
    await configManager.deleteProfile(name);
    console.log(`✅ Profile "${name}" deleted.\n`);
  } catch (error) {
    console.log(`❌ ${error instanceof Error ? error.message : String(error)}\n`);
    process.exit(1);
  }
}

/**
 * Set default profile
 */
export async function setDefaultProfile(name: string): Promise<void> {
  const configManager = new ConfigManager();

  try {
    await configManager.setDefaultProfile(name);
    console.log(`✅ Default profile set to "${name}".\n`);
  } catch (error) {
    console.log(`❌ ${error instanceof Error ? error.message : String(error)}\n`);
    process.exit(1);
  }
}

/**
 * Show current configuration
 */
export async function showConfig(): Promise<void> {
  const configManager = new ConfigManager();

  try {
    const config = await configManager.getConfig();

    console.log("\nConfiguration:\n");
    console.log(JSON.stringify(config, null, 2));
    console.log();
  } catch (error) {
    logger.error("Failed to read configuration", {
      error: error instanceof Error ? error.message : String(error),
    });
    process.exit(1);
  }
}

/**
 * Test connection with a specific profile
 */
export async function testProfile(name: string): Promise<void> {
  const configManager = new ConfigManager();

  try {
    const profile = await configManager.getProfile(name);

    if (!profile) {
      console.log(`❌ Profile "${name}" not found.\n`);
      process.exit(1);
    }

    console.log(`\nTesting profile "${name}"...\n`);

    if (!profile.apiUrl) {
      console.log("❌ No API URL configured for this profile.\n");
      process.exit(1);
    }

    if (!profile.apiToken && !profile.p12File) {
      console.log("❌ No authentication configured for this profile.\n");
      process.exit(1);
    }

    // TODO: Implement actual connection test
    console.log("✅ Profile configuration is valid.\n");
    console.log("Note: Full connection testing not yet implemented.\n");
  } catch (error) {
    logger.error("Failed to test profile", {
      error: error instanceof Error ? error.message : String(error),
    });
    process.exit(1);
  }
}
