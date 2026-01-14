// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Discovery Tool Handlers
 *
 * Handles registration of tools for discovering and describing API capabilities:
 * - search-tools: Find tools matching natural language queries
 * - describe-tool: Get full schema for a specific tool
 * - get-schema: Get actionable schema info for request body
 * - suggest-parameters: Get pre-built example payloads
 * - search-resources: Consolidated resource search
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  DISCOVERY_TOOLS,
  searchTools,
  describeTool,
  searchConsolidatedResources,
  getRequestBodySchema,
  getComprehensiveSchemaInfo,
  suggestParameters,
} from "../../../tools/discovery/index.js";
import { createTextResponse, createErrorResponse } from "../../response-utils.js";

/**
 * Registers the search-tools tool for finding tools matching natural language queries.
 */
export function registerSearchToolsTool(server: McpServer): void {
  server.tool(
    DISCOVERY_TOOLS.search.name,
    DISCOVERY_TOOLS.search.description,
    {
      query: z.string().describe("Natural language search query"),
      limit: z.number().optional().describe("Maximum results (default: 10)"),
      domains: z.array(z.string()).optional().describe("Filter by domains"),
      operations: z.array(z.string()).optional().describe("Filter by operations"),
      excludeDangerous: z.boolean().optional().describe("Exclude high-danger operations"),
      excludeDeprecated: z.boolean().optional().describe("Exclude deprecated operations"),
      includeDependencies: z
        .boolean()
        .optional()
        .describe("Include prerequisite hints for create operations"),
    },
    async (args) => {
      const results = searchTools(args.query, {
        limit: Math.min(args.limit ?? 10, 50),
        domains: args.domains,
        operations: args.operations,
        excludeDangerous: args.excludeDangerous,
        excludeDeprecated: args.excludeDeprecated,
        includeDependencies: args.includeDependencies,
      });

      return createTextResponse({
        query: args.query,
        resultCount: results.length,
        results: results.map((r) => ({
          name: r.tool.name,
          domain: r.tool.domain,
          resource: r.tool.resource,
          operation: r.tool.operation,
          summary: r.tool.summary,
          score: Math.round(r.score * 100) / 100,
          dangerLevel: r.tool.dangerLevel,
          isDeprecated: r.tool.isDeprecated,
          ...(r.prerequisites && { prerequisites: r.prerequisites }),
        })),
        hint: "Use f5xc-api-describe-tool to get full schema for a specific tool.",
      });
    }
  );
}

/**
 * Registers the describe-tool tool for getting full schema for a specific tool.
 */
export function registerDescribeToolTool(server: McpServer): void {
  server.tool(
    DISCOVERY_TOOLS.describe.name,
    DISCOVERY_TOOLS.describe.description,
    {
      toolName: z.string().describe("Exact tool name to describe"),
    },
    async (args) => {
      const description = describeTool(args.toolName);

      if (!description) {
        return createErrorResponse(
          `Tool "${args.toolName}" not found`,
          "Use f5xc-api-search-tools to find available tools."
        );
      }

      return createTextResponse({
        tool: description,
        hint: "Use f5xc-api-get-schema to get the full JSON schema, or f5xc-api-execute-tool to execute this tool.",
      });
    }
  );
}

/**
 * Registers the get-schema tool for getting actionable schema info for request body.
 */
export function registerGetSchemaTool(server: McpServer): void {
  server.tool(
    DISCOVERY_TOOLS.getSchema.name,
    DISCOVERY_TOOLS.getSchema.description,
    {
      toolName: z.string().describe("Exact tool name to get schema for"),
    },
    async (args) => {
      // Get comprehensive schema info (resolved with metadata)
      const comprehensiveInfo = getComprehensiveSchemaInfo(args.toolName);

      if (comprehensiveInfo) {
        return createTextResponse({
          toolName: args.toolName,
          examplePayload: comprehensiveInfo.examplePayload,
          requiredFields: comprehensiveInfo.requiredFields,
          mutuallyExclusiveGroups: comprehensiveInfo.mutuallyExclusiveGroups,
          curlExample: comprehensiveInfo.curlExample,
          usage: {
            instruction: "Use examplePayload as the 'body' parameter for f5xc-api-execute-tool",
            steps: [
              "1. Copy examplePayload as your starting point",
              "2. Modify values (name, namespace, domains, etc.) for your use case",
              "3. For mutuallyExclusiveGroups, choose ONE option from each group",
              "4. Ensure all requiredFields are provided",
              "5. Execute with f5xc-api-execute-tool",
            ],
          },
        });
      }

      // Fall back to raw schema if resolution failed
      const rawSchema = getRequestBodySchema(args.toolName);

      if (!rawSchema) {
        return createErrorResponse(
          `No request body schema found for tool "${args.toolName}"`,
          "This tool may not require a request body, or use f5xc-api-describe-tool to check."
        );
      }

      return createTextResponse({
        toolName: args.toolName,
        requestBodySchema: rawSchema,
        note: "Schema contains unresolved $ref pointers. Use f5xc-api-suggest-parameters for working examples.",
        hint: "Use this schema to construct the 'body' parameter for f5xc-api-execute-tool.",
      });
    }
  );
}

/**
 * Registers the suggest-parameters tool for getting pre-built example payloads.
 */
export function registerSuggestParametersTool(server: McpServer): void {
  server.tool(
    DISCOVERY_TOOLS.suggestParameters.name,
    DISCOVERY_TOOLS.suggestParameters.description,
    {
      toolName: z.string().describe("Exact tool name to get examples for"),
    },
    async (args) => {
      const suggestion = suggestParameters(args.toolName);

      if (!suggestion) {
        return createErrorResponse(
          `No pre-built examples available for tool "${args.toolName}"`,
          "Use f5xc-api-get-schema to get the JSON schema, or f5xc-api-describe-tool for parameter descriptions."
        );
      }

      return createTextResponse({
        toolName: args.toolName,
        ...suggestion,
        hint: "Use this payload as the 'body' parameter for f5xc-api-execute-tool.",
      });
    }
  );
}

/**
 * Registers the search-resources tool for consolidated resource search.
 */
export function registerSearchResourcesTool(server: McpServer): void {
  server.tool(
    DISCOVERY_TOOLS.searchResources.name,
    DISCOVERY_TOOLS.searchResources.description,
    {
      query: z.string().describe("Natural language search query"),
      limit: z.number().optional().describe("Maximum results (default: 10)"),
      domains: z.array(z.string()).optional().describe("Filter by domains"),
    },
    async (args) => {
      const results = searchConsolidatedResources(args.query, {
        limit: Math.min(args.limit ?? 10, 50),
        domains: args.domains,
      });

      return createTextResponse({
        query: args.query,
        resultCount: results.length,
        results: results.map((r) => ({
          name: r.resource.name,
          domain: r.resource.domain,
          resource: r.resource.resource,
          operations: r.resource.operations,
          summary: r.resource.summary,
          isFullCrud: r.resource.isFullCrud,
          score: Math.round(r.score * 100) / 100,
        })),
        hint: "Use f5xc-api-execute-resource with resourceName and operation to execute.",
      });
    }
  );
}

/**
 * Registers all discovery tools with the MCP server.
 */
export function registerDiscoveryTools(server: McpServer): void {
  registerSearchToolsTool(server);
  registerDescribeToolTool(server);
  registerGetSchemaTool(server);
  registerSuggestParametersTool(server);
  registerSearchResourcesTool(server);
}
