#!/usr/bin/env node

/**
 * F5 Distributed Cloud API MCP Server
 *
 * Entry point for the MCP server that provides tools for interacting
 * with F5 XC APIs via Model Context Protocol.
 *
 * Supports dual-mode operation:
 * - Documentation mode: No credentials required - provides API documentation,
 *   f5xcctl equivalents, and Terraform examples
 * - Execution mode: When F5XC credentials are provided, enables direct API calls
 *
 * Environment Variables:
 * - F5XC_API_URL: Tenant URL (auto-normalized)
 * - F5XC_API_TOKEN: API token for authentication
 * - F5XC_P12_FILE: Path to P12 certificate file (alternative to token)
 * - F5XC_P12_PASSWORD: Password for P12 certificate
 */

import { createServer } from "./server.js";
import { logger } from "./utils/logging.js";

/** Server version - synchronized with package.json */
export const VERSION = "0.1.0";

/**
 * Main entry point
 */
async function main(): Promise<void> {
  try {
    const server = createServer();
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
const isMainModule = import.meta.url === `file://${process.argv[1]}` ||
  process.argv[1]?.endsWith("f5xc-api-mcp");

if (isMainModule) {
  main().catch((error: unknown) => {
    logger.error("Fatal error", {
      error: error instanceof Error ? error.message : String(error),
    });
    process.exit(1);
  });
}
