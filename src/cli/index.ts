/**
 * CLI command dispatcher for F5XC API MCP
 */

import {
  runSetupWizard,
  listProfiles,
  deleteProfile,
  setDefaultProfile,
  showConfig,
  testProfile,
} from "./setup.js";

/**
 * Parse command-line arguments and execute appropriate action
 */
export async function handleCliCommand(args: string[]): Promise<void> {
  const command = args[0];

  switch (command) {
    case "--setup":
      await runSetupWizard();
      break;

    case "--list-profiles":
      await listProfiles();
      break;

    case "--show-config":
      await showConfig();
      break;

    case "--delete-profile":
      if (!args[1]) {
        console.log("Error: Profile name required\n");
        console.log("Usage: f5xc-api-mcp --delete-profile <name>\n");
        process.exit(1);
      }
      await deleteProfile(args[1]);
      break;

    case "--set-default":
      if (!args[1]) {
        console.log("Error: Profile name required\n");
        console.log("Usage: f5xc-api-mcp --set-default <name>\n");
        process.exit(1);
      }
      await setDefaultProfile(args[1]);
      break;

    case "--test-profile":
      if (!args[1]) {
        console.log("Error: Profile name required\n");
        console.log("Usage: f5xc-api-mcp --test-profile <name>\n");
        process.exit(1);
      }
      await testProfile(args[1]);
      break;

    case "--help":
    case "-h":
      showHelp();
      break;

    case "--version":
    case "-v":
      showVersion();
      break;

    default:
      if (command?.startsWith("-")) {
        console.log(`Unknown command: ${command}\n`);
        showHelp();
        process.exit(1);
      }
      // No recognized CLI command, return false to indicate should start server
      return undefined;
  }
}

/**
 * Show help information
 */
function showHelp(): void {
  console.log(`
F5XC API MCP Server - Profile-Based Credential Management

USAGE:
  f5xc-api-mcp [COMMAND]

COMMANDS:
  --setup              Interactive setup wizard to create profiles
  --list-profiles      List all configured profiles
  --show-config        Display current configuration
  --delete-profile     Delete a profile by name
  --set-default        Set default profile
  --test-profile       Test connection with a profile
  --help, -h           Show this help message
  --version, -v        Show version information

EXAMPLES:
  # Interactive setup with auto-detection
  f5xc-api-mcp --setup

  # List all profiles
  f5xc-api-mcp --list-profiles

  # Set staging as default
  f5xc-api-mcp --set-default staging

  # Test production profile
  f5xc-api-mcp --test-profile production

ENVIRONMENT VARIABLES:
  F5XC_PROFILE         Select which profile to use
  F5XC_API_URL         Override profile API URL
  F5XC_API_TOKEN       Override profile API token

For more information, visit: https://github.com/robinmordasiewicz/f5xc-api-mcp
`);
}

/**
 * Show version information
 */
export function showVersion(): void {
  // Version will be injected by the caller from package.json
  console.log("f5xc-api-mcp");
}
