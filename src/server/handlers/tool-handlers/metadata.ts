// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Metadata Tool Handlers
 *
 * Handles registration of server-info and configure-auth tools.
 * These tools provide server metadata and authentication management.
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { AuthMode, type CredentialManager } from "@robinmordasiewicz/f5xc-auth";
import { VERSION } from "../../../index.js";
import {
  DISCOVERY_TOOLS,
  getIndexMetadata,
  getAvailableDomains,
  getConsolidationStats,
} from "../../../tools/discovery/index.js";
import {
  CONFIGURE_AUTH_TOOL,
  configureAuthSchema,
  handleConfigureAuth,
} from "../../../tools/configure-auth.js";
import { createTextResponse } from "../../response-utils.js";

/**
 * Registers the server-info tool that provides server metadata and tool statistics.
 */
export function registerServerInfoTool(
  server: McpServer,
  credentialManager: CredentialManager
): void {
  const authMode = credentialManager.getAuthMode();

  server.tool(
    DISCOVERY_TOOLS.serverInfo.name,
    DISCOVERY_TOOLS.serverInfo.description,
    {},
    async () => {
      const isAuthenticated = authMode !== AuthMode.NONE;
      const tenantUrl = credentialManager.getApiUrl();
      const indexMetadata = getIndexMetadata();
      const domains = getAvailableDomains();

      return createTextResponse({
        server: "f5xc-api-mcp",
        version: VERSION,
        mode: isAuthenticated ? "execution" : "documentation",
        authenticated: isAuthenticated,
        authMethod: authMode,
        tenantUrl: isAuthenticated ? tenantUrl : null,
        capabilities: {
          documentation: true,
          curl_examples: true,
          api_execution: isAuthenticated,
        },
        toolIndex: {
          totalTools: indexMetadata.totalTools,
          domains: indexMetadata.domains,
          availableDomains: domains,
        },
        consolidation: getConsolidationStats(),
        discoveryTools: [
          "f5xc-api-configure-auth",
          "f5xc-api-search-tools",
          "f5xc-api-describe-tool",
          "f5xc-api-get-schema",
          "f5xc-api-suggest-parameters",
          "f5xc-api-execute-tool",
          "f5xc-api-search-resources",
          "f5xc-api-execute-resource",
          "f5xc-api-dependencies",
          "f5xc-api-dependency-stats",
          "f5xc-api-validate-params",
          "f5xc-api-resolve-dependencies",
          "f5xc-api-estimate-cost",
          "f5xc-api-best-practices",
        ],
        message: isAuthenticated
          ? "Authenticated - API execution enabled. Use f5xc-api-search-tools to find available API tools."
          : "Documentation mode. Set F5XC_API_URL and F5XC_API_TOKEN to enable API execution.",
      });
    }
  );
}

/**
 * Registers the configure-auth tool for managing authentication and profiles.
 */
export function registerConfigureAuthTool(
  server: McpServer,
  credentialManager: CredentialManager
): void {
  server.tool(
    CONFIGURE_AUTH_TOOL.name,
    CONFIGURE_AUTH_TOOL.description,
    {
      action: configureAuthSchema.action,
      tenantUrl: configureAuthSchema.tenantUrl,
      apiToken: configureAuthSchema.apiToken,
      profileName: configureAuthSchema.profileName,
    },
    async (args) => {
      const result = await handleConfigureAuth(
        args as {
          action?: "status" | "configure" | "list-profiles" | "set-active";
          tenantUrl?: string;
          apiToken?: string;
          profileName?: string;
        },
        credentialManager
      );

      return createTextResponse(result);
    }
  );
}

/**
 * Registers all metadata tools with the MCP server.
 */
export function registerMetadataTools(
  server: McpServer,
  credentialManager: CredentialManager
): void {
  registerServerInfoTool(server, credentialManager);
  registerConfigureAuthTool(server, credentialManager);
}
