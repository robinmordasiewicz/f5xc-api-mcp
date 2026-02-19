// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * F5 Distributed Cloud API MCP Server
 *
 * This module initializes and configures the MCP server with STDIO transport.
 * Supports dual-mode operation: documentation mode (unauthenticated) and
 * execution mode (authenticated with F5XC credentials).
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CredentialManager,
  AuthMode,
  HttpClient,
  createHttpClient,
} from "@robinmordasiewicz/f5xc-auth";
import { logger } from "./utils/logging.js";
import { normalizeF5XCUrl } from "./utils/url-utils.js";
import { VERSION } from "./index.js";
import { createResourceHandler, ResourceHandler } from "./resources/index.js";

// Import handlers from the new modular structure
import { registerPrompts } from "./server/handlers/prompt-handler.js";
import { registerResources } from "./server/handlers/resource-handler.js";
import { registerTools } from "./server/handlers/tool-handlers/index.js";

/**
 * Server configuration options
 */
export interface ServerConfig {
  /** Server name for MCP identification */
  name: string;
  /** Server version */
  version: string;
  /** Credential manager for auth handling */
  credentialManager: CredentialManager;
}

/**
 * F5XC API MCP Server
 *
 * Main server class that orchestrates all MCP functionality:
 * - Documentation mode: Returns API documentation, schemas, and CURL examples
 * - Execution mode: Directly executes API calls when authenticated
 */
export class F5XCApiServer {
  private server: McpServer;
  private credentialManager: CredentialManager;
  private httpClient: HttpClient | null = null;
  private resourceHandler: ResourceHandler;
  private transport: StdioServerTransport | null = null;

  constructor(config: ServerConfig) {
    this.credentialManager = config.credentialManager;

    // Create HTTP client if authenticated
    if (this.credentialManager.getAuthMode() !== AuthMode.NONE) {
      this.httpClient = createHttpClient(this.credentialManager);
    }

    // Create resource handler
    this.resourceHandler = createResourceHandler(this.credentialManager, this.httpClient);

    this.server = new McpServer({
      name: config.name,
      version: config.version,
    });

    this.registerCapabilities();
  }

  /**
   * Register all MCP capabilities (tools, resources, prompts)
   */
  private registerCapabilities(): void {
    // Register tools using the modular handler
    registerTools(this.server, {
      credentialManager: this.credentialManager,
    });

    // Register resources using the modular handler
    registerResources(this.server, {
      credentialManager: this.credentialManager,
      resourceHandler: this.resourceHandler,
    });

    // Register prompts using the modular handler
    registerPrompts(this.server);
  }

  /**
   * Start the MCP server with STDIO transport
   */
  async start(): Promise<void> {
    this.transport = new StdioServerTransport();

    logger.info("Starting F5XC API MCP Server", {
      version: VERSION,
      authMode: this.credentialManager.getAuthMode(),
    });

    await this.server.connect(this.transport);

    logger.info("F5XC API MCP Server started successfully");
  }

  /**
   * Stop the MCP server
   */
  async stop(): Promise<void> {
    if (this.transport) {
      await this.server.close();
      this.transport = null;
      logger.info("F5XC API MCP Server stopped");
    }
  }

  /**
   * Get the underlying MCP server instance
   */
  getMcpServer(): McpServer {
    return this.server;
  }

  /**
   * Get the credential manager
   */
  getCredentialManager(): CredentialManager {
    return this.credentialManager;
  }
}

/**
 * Create and configure the F5XC API MCP Server
 *
 * Credentials are loaded asynchronously from:
 * 1. Environment variables (highest priority)
 * 2. Active profile from ~/.config/f5xc/ (XDG Base Directory compliant)
 * 3. No credentials - documentation mode (lowest priority)
 */
export async function createServer(): Promise<F5XCApiServer> {
  // Normalize F5XC_API_URL environment variable before CredentialManager reads it
  // This handles various URL formats users might provide:
  // - Protocol-less URLs: tenant.console.ves.volterra.io
  // - URLs with /api suffix: https://tenant.console.ves.volterra.io/api
  // - Combinations of the above
  const apiUrl = process.env.F5XC_API_URL;
  if (apiUrl) {
    const normalizedUrl = normalizeF5XCUrl(apiUrl);
    if (normalizedUrl !== apiUrl) {
      logger.info(`Normalizing F5XC_API_URL: ${apiUrl} -> ${normalizedUrl}`);
      process.env.F5XC_API_URL = normalizedUrl;
    }
  }

  // Guard: reject F5XC_TLS_INSECURE for production domains
  if (process.env.F5XC_TLS_INSECURE === "true" && apiUrl) {
    const normalizedForCheck = normalizeF5XCUrl(apiUrl);
    try {
      const hostname = new URL(normalizedForCheck).hostname.toLowerCase();
      const isProduction = hostname.endsWith(".console.ves.volterra.io") && !hostname.includes(".staging.");
      if (isProduction) {
        logger.warn(
          "F5XC_TLS_INSECURE=true is not allowed for production domains. Clearing the flag.",
          { hostname }
        );
        delete process.env.F5XC_TLS_INSECURE;
      }
    } catch {
      // URL parse failed — normalizeF5XCUrl already warned
    }
  }

  const credentialManager = new CredentialManager();
  await credentialManager.initialize();

  return new F5XCApiServer({
    name: "f5xc-api-mcp",
    version: VERSION,
    credentialManager,
  });
}
