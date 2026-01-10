#!/usr/bin/env node
// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * F5 Distributed Cloud API MCP Server
 *
 * Entry point for the MCP server that provides tools for interacting
 * with F5 XC APIs via Model Context Protocol.
 *
 * Supports dual-mode operation:
 * - Documentation mode: No credentials required - provides API documentation
 *   and CURL examples
 * - Execution mode: When F5XC credentials are provided, enables direct API calls
 *
 * Credential Sources (in priority order):
 * 1. Environment Variables (highest priority):
 *    - F5XC_API_URL: Tenant URL (auto-normalized)
 *    - F5XC_API_TOKEN: API token for authentication
 *    - F5XC_P12_BUNDLE: Path to P12 certificate bundle
 *    - F5XC_CERT: Path to certificate file (for mTLS)
 *    - F5XC_KEY: Path to private key file (for mTLS)
 *    - F5XC_NAMESPACE: Default namespace
 *
 * 2. Profile from ~/.config/f5xc/ (XDG Base Directory compliant):
 *    - Uses active profile from ~/.config/f5xc/active_profile
 *    - Individual profiles stored in ~/.config/f5xc/profiles/
 */

import { createServer } from "./server.js";
import { logger } from "./utils/logging.js";
import { VERSION } from "./version.js";

/** Re-export version for external consumers */
export { VERSION } from "./version.js";

/**
 * Main entry point
 */
async function main(): Promise<void> {
  try {
    // Get command-line arguments (skip node executable and script name)
    const args = process.argv.slice(2);

    // Handle version flag
    if (args.includes("--version") || args.includes("-v")) {
      console.log(`f5xc-api-mcp v${VERSION}\n`);
      process.exit(0);
    }

    // Handle help flag
    if (args.includes("--help") || args.includes("-h")) {
      console.log(`F5 Distributed Cloud API MCP Server v${VERSION}

Usage: f5xc-api-mcp [options]

Options:
  -v, --version        Show version number
  -h, --help           Show help

Environment Variables (override profile settings):
  F5XC_API_URL        Tenant URL (e.g., https://tenant.console.ves.volterra.io)
  F5XC_API_TOKEN      API token for authentication
  F5XC_P12_BUNDLE     Path to P12 certificate bundle
  F5XC_CERT           Path to certificate file (for mTLS)
  F5XC_KEY            Path to private key file (for mTLS)
  F5XC_NAMESPACE      Default namespace

Profile Configuration:
  Profiles are stored in ~/.config/f5xc/profiles/
  Active profile is tracked in ~/.config/f5xc/active_profile

The server runs in documentation mode when no credentials are provided,
allowing exploration of the API without authentication.
`);
      process.exit(0);
    }

    // Start MCP server with STDIO transport
    const server = await createServer();
    await server.start();

    // Handle graceful shutdown
    const shutdown = async (signal: string): Promise<void> => {
      logger.info(`Received ${signal}, shutting down gracefully`);
      await server.stop();
      process.exit(0);
    };

    process.on("SIGINT", () => void shutdown("SIGINT"));
    process.on("SIGTERM", () => void shutdown("SIGTERM"));

    // Handle uncaught errors
    process.on("uncaughtException", (error: Error) => {
      logger.error("Uncaught exception", {
        error: error.message,
        stack: error.stack,
      });
      process.exit(1);
    });

    process.on("unhandledRejection", (reason: unknown) => {
      logger.error("Unhandled rejection", {
        reason: reason instanceof Error ? reason.message : String(reason),
      });
      process.exit(1);
    });
  } catch (error) {
    logger.error("Failed to start server", {
      error: error instanceof Error ? error.message : String(error),
    });
    process.exit(1);
  }
}

// Only run main when executed directly, not when imported (e.g., during tests)
const isMainModule =
  import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("f5xc-api-mcp");

if (isMainModule) {
  main().catch((error: unknown) => {
    logger.error("Fatal error", {
      error: error instanceof Error ? error.message : String(error),
    });
    process.exit(1);
  });
}
