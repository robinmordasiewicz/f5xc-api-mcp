// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Server Types
 *
 * Shared type definitions for the F5XC API MCP server.
 * Extracted from server.ts to support modular handler architecture.
 */

import type { CredentialManager, HttpClient } from "@robinmordasiewicz/f5xc-auth";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * Configuration options for the F5XC API MCP server.
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
 * Context provided to tool handlers for executing operations.
 */
export interface ToolHandlerContext {
  /** HTTP client for API calls (null in documentation mode) */
  httpClient: HttpClient | null;
  /** Credential manager for authentication status */
  credentialManager: CredentialManager;
}

/**
 * Function signature for registering tools with the MCP server.
 */
export type RegisterToolsFunction = (server: McpServer, context: ToolHandlerContext) => void;

/**
 * Re-export types from dependencies for convenience.
 */
export type { CredentialManager, HttpClient };
