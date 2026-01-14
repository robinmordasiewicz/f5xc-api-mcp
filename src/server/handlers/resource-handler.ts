// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Resource Handler
 *
 * Handles registration of MCP resources for F5 XC resource types.
 * Extracted from server.ts.
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CredentialManager } from "@robinmordasiewicz/f5xc-auth";
import { RESOURCE_TYPES, type ResourceHandler } from "../../resources/index.js";
import { logger } from "../../utils/logging.js";

/**
 * Context needed for resource registration.
 */
export interface ResourceRegistrationContext {
  /** Credential manager for tenant information */
  credentialManager: CredentialManager;
  /** Resource handler for reading resources */
  resourceHandler: ResourceHandler;
}

/**
 * Registers all MCP resources with the server.
 * Creates URI templates for each resource type based on the tenant.
 *
 * @param server - The MCP server instance
 * @param context - Context containing credential manager and resource handler
 */
export function registerResources(server: McpServer, context: ResourceRegistrationContext): void {
  const tenant = context.credentialManager.getTenant() ?? "{tenant}";

  // Register resource templates for each resource type
  for (const rt of Object.values(RESOURCE_TYPES)) {
    const uriTemplate = rt.namespaceScoped
      ? `f5xc://${tenant}/{namespace}/${rt.type}/{name}`
      : `f5xc://${tenant}/system/${rt.type}/{name}`;

    server.resource(uriTemplate, rt.description, async (uri: URL) => {
      try {
        const result = await context.resourceHandler.readResource(uri.href);
        return {
          contents: [
            {
              uri: result.uri,
              mimeType: result.mimeType,
              text: result.content,
            },
          ],
        };
      } catch (error) {
        logger.error(`Failed to read resource: ${uri.href}`, {
          error: error instanceof Error ? error.message : String(error),
        });
        throw error;
      }
    });
  }

  logger.info("Resource registration completed", {
    resourceTypes: Object.keys(RESOURCE_TYPES).length,
  });
}
