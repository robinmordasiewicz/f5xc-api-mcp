// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Guidance Tool Handlers
 *
 * Handles registration of tools for best practices and guidance:
 * - best-practices: Get domain-specific best practices for API operations
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  DISCOVERY_TOOLS,
  queryBestPractices,
  getAllDomainsSummary,
  formatBestPractices,
} from "../../../tools/discovery/index.js";
import { createTextResponse } from "../../response-utils.js";

/**
 * Registers the best-practices tool for getting domain-specific best practices.
 */
export function registerBestPracticesTool(server: McpServer): void {
  server.tool(
    DISCOVERY_TOOLS.bestPractices.name,
    DISCOVERY_TOOLS.bestPractices.description,
    {
      domain: z.string().optional().describe("Domain to get best practices for"),
      aspect: z
        .enum(["errors", "workflows", "danger", "security", "performance", "all"])
        .optional()
        .default("all")
        .describe("Specific aspect to retrieve"),
      detailed: z.boolean().optional().default(true).describe("Include detailed breakdowns"),
    },
    async (args) => {
      // If no domain specified, return domain summary
      if (!args.domain) {
        const summary = getAllDomainsSummary();
        return createTextResponse({
          type: "domain_summary",
          hint: "Specify a domain to get detailed best practices",
          domains: summary,
        });
      }

      // Query best practices for specified domain
      const result = queryBestPractices({
        domain: args.domain,
        aspect: args.aspect,
        detailed: args.detailed,
      });

      if (!result.success) {
        return createTextResponse({ success: false, error: result.error });
      }

      return createTextResponse({
        success: true,
        practices: result.practices,
        formatted:
          args.detailed && result.practices ? formatBestPractices(result.practices) : undefined,
      });
    }
  );
}

/**
 * Registers all guidance tools with the MCP server.
 */
export function registerGuidanceTools(server: McpServer): void {
  registerBestPracticesTool(server);
}
