#!/usr/bin/env node

/**
 * F5 Distributed Cloud API MCP Server
 *
 * Entry point for the MCP server that provides tools for interacting
 * with F5 XC APIs via Model Context Protocol.
 *
 * Supports dual-mode operation:
 * - Documentation mode: No credentials required - provides API documentation
 *   and Terraform examples
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
 * 2. Profile from ~/.config/xcsh/ (cross-compatible with f5xc-xcsh CLI):
 *    - Uses active profile from ~/.config/xcsh/active_profile
 *    - Individual profiles stored in ~/.config/xcsh/profiles/
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

Transport Options:
  --http, --sse        Start HTTP/SSE server instead of STDIO
  --port <number>      HTTP server port (default: 3000)
  --host <address>     HTTP server bind address (default: 0.0.0.0)

General Options:
  -v, --version        Show version number
  -h, --help           Show help

Environment Variables (override profile settings):
  F5XC_API_URL        Tenant URL (e.g., https://tenant.console.ves.volterra.io)
  F5XC_API_TOKEN      API token for authentication
  F5XC_P12_BUNDLE     Path to P12 certificate bundle
  F5XC_CERT           Path to certificate file (for mTLS)
  F5XC_KEY            Path to private key file (for mTLS)
  F5XC_NAMESPACE      Default namespace

Profile Configuration (cross-compatible with f5xc-xcsh CLI):
  Profiles are stored in ~/.config/xcsh/profiles/
  Active profile is tracked in ~/.config/xcsh/active_profile

Transport Modes:
  STDIO (default)     For Claude Desktop, Claude CLI, VS Code extensions
  HTTP/SSE            For vLLM servers, web-based clients, private LLM utilities

Examples:
  f5xc-api-mcp                           Start in STDIO mode (default)
  f5xc-api-mcp --http                    Start HTTP server on 0.0.0.0:3000
  f5xc-api-mcp --http --port 8080        Start HTTP server on port 8080
  f5xc-api-mcp --http --host 127.0.0.1   Start HTTP server on localhost only

The server runs in documentation mode when no credentials are provided,
allowing exploration of the API without authentication.
`);
      process.exit(0);
    }

    // Parse HTTP mode flags
    const httpMode = args.includes("--http") || args.includes("--sse");
    const portIndex = args.indexOf("--port");
    const portArg = portIndex !== -1 ? args[portIndex + 1] : undefined;
    const port = portArg ? parseInt(portArg, 10) : 3000;
    const hostIndex = args.indexOf("--host");
    const host = hostIndex !== -1 && args[hostIndex + 1] ? args[hostIndex + 1] : "0.0.0.0";

    // Start MCP server
    const server = await createServer();

    if (httpMode) {
      // Start in HTTP/SSE mode for vLLM and other HTTP clients
      await server.startHttp({ port, host });
    } else {
      // Start in STDIO mode (default) for Claude Desktop/CLI
      await server.start();
    }

    // Handle graceful shutdown
    const shutdown = async (signal: string): Promise<void> => {
      logger.info(`Received ${signal}, shutting down gracefully`);
      if (httpMode) {
        await server.stopHttp();
      } else {
        await server.stop();
      }
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
