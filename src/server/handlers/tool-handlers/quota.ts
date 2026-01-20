// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Quota Management Tool Handlers
 *
 * MCP tools for checking and managing F5XC quota usage.
 * Provides visibility into resource quota consumption and limits.
 */

import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { quotaService } from "../../../services/quota-service.js";
import { formatQuotaStatus, formatQuotaTable } from "../../../services/quota-formatter.js";
import type { CredentialManager } from "@robinmordasiewicz/f5xc-auth";
import { createHttpClient } from "@robinmordasiewicz/f5xc-auth";
import { logger } from "../../../utils/logging.js";

/**
 * Register quota management tools with the MCP server
 *
 * @param server - MCP server instance
 * @param credentialManager - Credential manager for authentication
 */
export function registerQuotaTools(server: McpServer, credentialManager?: CredentialManager): void {
  /**
   * Tool 1: Get Quota Status
   */
  server.tool(
    "f5xc-api-get-quota-status",
    "Get current quota usage and limits for a namespace and resource type",
    {
      namespace: z
        .string()
        .describe("Namespace to check quota for (e.g., 'default', 'production')"),
      resourceType: z
        .string()
        .optional()
        .describe("Resource type to check (e.g., 'healthcheck', 'http-loadbalancer')"),
    },
    async (args) => {
      const { namespace, resourceType } = args;
      if (!credentialManager) {
        return {
          content: [
            {
              type: "text",
              text: "Quota checking requires authentication. Please configure F5XC credentials using f5xc-api-configure-auth.",
            },
          ],
        };
      }

      try {
        const httpClient = createHttpClient(credentialManager);

        if (resourceType) {
          // Get status for specific resource type
          const status = await quotaService.getQuotaStatus(namespace, resourceType, httpClient);

          return {
            content: [
              {
                type: "text",
                text: formatQuotaStatus(status),
              },
            ],
          };
        } else {
          // List all quotas for namespace
          const allQuotas = await quotaService.getAllNamespaceQuotas(namespace, httpClient);

          return {
            content: [
              {
                type: "text",
                text: formatQuotaTable(allQuotas),
              },
            ],
          };
        }
      } catch (error) {
        logger.error("Failed to get quota status", {
          namespace,
          resourceType,
          error: error instanceof Error ? error.message : String(error),
        });

        return {
          content: [
            {
              type: "text",
              text: `Error fetching quota status: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    }
  );

  /**
   * Tool 2: List All Namespace Quotas
   */
  server.tool(
    "f5xc-api-list-namespace-quotas",
    "List all resource quotas for a namespace with current usage",
    {
      namespace: z.string().describe("Namespace to list quotas for"),
      showOnlyLimited: z
        .boolean()
        .optional()
        .default(false)
        .describe("Only show resources with quota limits (filter out unlimited)"),
    },
    async (args) => {
      const { namespace, showOnlyLimited = false } = args;
      if (!credentialManager) {
        return {
          content: [
            {
              type: "text",
              text: "Quota checking requires authentication. Please configure F5XC credentials using f5xc-api-configure-auth.",
            },
          ],
        };
      }

      try {
        const httpClient = createHttpClient(credentialManager);
        const quotas = await quotaService.getAllNamespaceQuotas(namespace, httpClient);

        // Filter unlimited resources if requested
        const filtered = showOnlyLimited
          ? quotas.filter((q) => q.limits.limit > 0 && q.limits.limit < Infinity)
          : quotas;

        if (filtered.length === 0) {
          return {
            content: [
              {
                type: "text",
                text: showOnlyLimited
                  ? `No limited quota resources found in namespace '${namespace}'.`
                  : `No quota information available for namespace '${namespace}'.`,
              },
            ],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: `Quota Status for Namespace: ${namespace}\n\n${formatQuotaTable(filtered)}`,
            },
          ],
        };
      } catch (error) {
        logger.error("Failed to list namespace quotas", {
          namespace,
          error: error instanceof Error ? error.message : String(error),
        });

        return {
          content: [
            {
              type: "text",
              text: `Error listing namespace quotas: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    }
  );

  /**
   * Tool 3: Clear Quota Cache
   */
  server.tool(
    "f5xc-api-clear-quota-cache",
    "Clear the quota information cache to force fresh queries from the F5XC API",
    {
      namespace: z
        .string()
        .optional()
        .describe("Specific namespace to clear (optional - clears all if omitted)"),
    },
    async (args) => {
      const { namespace } = args;
      try {
        if (namespace) {
          quotaService.clearNamespaceCache(namespace);
          return {
            content: [
              {
                type: "text",
                text: `✅ Cleared quota cache for namespace: ${namespace}`,
              },
            ],
          };
        } else {
          quotaService.clearCache();
          return {
            content: [
              {
                type: "text",
                text: "✅ Cleared all quota cache entries",
              },
            ],
          };
        }
      } catch (error) {
        logger.error("Failed to clear quota cache", {
          namespace,
          error: error instanceof Error ? error.message : String(error),
        });

        return {
          content: [
            {
              type: "text",
              text: `Error clearing quota cache: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    }
  );
}
