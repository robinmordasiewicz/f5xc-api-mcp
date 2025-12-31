#!/usr/bin/env node
/**
 * Version Generator for F5 XC API MCP Server
 *
 * Generates version strings in format:
 * - CI/Release: v{upstream_version}-{YYMMDDHHMM}
 * - Local/Beta: v{upstream_version}-{YYMMDDHHMM}-BETA
 *
 * The upstream version comes from specs/index.json (synced from f5xc-api-enriched)
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");

/**
 * Read the upstream API version from specs/index.json
 */
function getUpstreamVersion() {
  const specIndexPath = join(rootDir, "specs", "index.json");

  if (!existsSync(specIndexPath)) {
    console.error("Error: specs/index.json not found. Run 'npm run sync-specs' first.");
    process.exit(1);
  }

  try {
    const specIndex = JSON.parse(readFileSync(specIndexPath, "utf-8"));
    const version = specIndex.version;

    if (!version) {
      console.error("Error: No version field found in specs/index.json");
      process.exit(1);
    }

    return version;
  } catch (error) {
    console.error("Error reading specs/index.json:", error.message);
    process.exit(1);
  }
}

/**
 * Generate timestamp in YYMMDDHHMM format
 */
function generateTimestamp() {
  const now = new Date();
  const yy = String(now.getUTCFullYear()).slice(-2);
  const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(now.getUTCDate()).padStart(2, "0");
  const hh = String(now.getUTCHours()).padStart(2, "0");
  const min = String(now.getUTCMinutes()).padStart(2, "0");

  return `${yy}${mm}${dd}${hh}${min}`;
}

/**
 * Generate the full version string
 */
function generateVersion(options = {}) {
  const { beta = false, includeV = true } = options;

  const upstreamVersion = getUpstreamVersion();
  const timestamp = generateTimestamp();

  let version = `${upstreamVersion}-${timestamp}`;

  if (beta) {
    version += "-BETA";
  }

  if (includeV) {
    version = `v${version}`;
  }

  return version;
}

/**
 * Update package.json version field
 */
function updatePackageVersion(version) {
  const packagePath = join(rootDir, "package.json");
  const pkg = JSON.parse(readFileSync(packagePath, "utf-8"));

  // Remove 'v' prefix for npm version (npm doesn't use v prefix)
  const npmVersion = version.startsWith("v") ? version.slice(1) : version;

  pkg.version = npmVersion;
  writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + "\n");

  return npmVersion;
}

/**
 * Main CLI handler
 */
function main() {
  const args = process.argv.slice(2);

  // Handle flags that can appear without a command
  const beta = args.includes("--beta") || args.includes("-b");
  const noV = args.includes("--no-v");

  // Filter out flags to get the command
  const nonFlagArgs = args.filter((a) => !a.startsWith("-"));
  const command = nonFlagArgs[0] || "print";

  switch (command) {
    case "print":
    case "get": {
      const version = generateVersion({ beta, includeV: !noV });
      console.log(version);
      break;
    }

    case "update": {
      const version = generateVersion({ beta, includeV: true });
      const npmVersion = updatePackageVersion(version);
      console.log(`Updated package.json version to: ${npmVersion}`);
      console.log(`Release version: ${version}`);
      break;
    }

    case "upstream": {
      console.log(getUpstreamVersion());
      break;
    }

    case "timestamp": {
      console.log(generateTimestamp());
      break;
    }

    case "help":
    case "--help":
    case "-h": {
      console.log(`
F5 XC API MCP Server Version Generator

Usage: node scripts/version.js [command] [options]

Commands:
  print, get    Print the full version string (default)
  update        Update package.json with the new version
  upstream      Print only the upstream API version
  timestamp     Print only the timestamp component
  help          Show this help message

Options:
  --beta, -b    Add -BETA suffix for local/development builds
  --no-v        Omit the 'v' prefix from version string

Examples:
  node scripts/version.js                    # v1.0.81-2512311430
  node scripts/version.js --beta             # v1.0.81-2512311430-BETA
  node scripts/version.js update             # Update package.json
  node scripts/version.js update --beta      # Update with BETA suffix
  node scripts/version.js upstream           # 1.0.81
`);
      break;
    }

    default:
      console.error(`Unknown command: ${command}`);
      console.error('Run with --help for usage information');
      process.exit(1);
  }
}

main();
