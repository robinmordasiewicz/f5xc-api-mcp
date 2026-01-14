// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Analysis Tool Handlers
 *
 * Handles registration of tools for analyzing API resources and parameters:
 * - dependencies: Get resource dependency information
 * - dependency-stats: Get graph statistics
 * - validate-params: Validate parameters before execution
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  DISCOVERY_TOOLS,
  generateDependencyReport,
  getDependencyStats,
  validateToolParams,
  formatValidationResult,
} from "../../../tools/discovery/index.js";
import type { DependencyDiscoveryAction } from "../../../generator/dependency-types.js";
import { createTextResponse } from "../../response-utils.js";

/**
 * Registers the dependencies tool for getting resource dependency information.
 */
export function registerDependenciesTool(server: McpServer): void {
  server.tool(
    DISCOVERY_TOOLS.dependencies.name,
    DISCOVERY_TOOLS.dependencies.description,
    {
      resource: z.string().describe("Resource name (e.g., 'http-loadbalancer')"),
      domain: z.string().describe("Domain containing the resource (e.g., 'virtual')"),
      action: z
        .enum(["prerequisites", "dependents", "oneOf", "subscriptions", "creationOrder", "full"])
        .optional()
        .describe("Type of dependency information to retrieve (default: 'full')"),
    },
    async (args) => {
      const action = (args.action ?? "full") as DependencyDiscoveryAction;
      const report = generateDependencyReport(args.domain, args.resource, action);

      return createTextResponse(report);
    }
  );
}

/**
 * Registers the dependency-stats tool for getting graph statistics.
 */
export function registerDependencyStatsTool(server: McpServer): void {
  server.tool(
    DISCOVERY_TOOLS.dependencyStats.name,
    DISCOVERY_TOOLS.dependencyStats.description,
    {},
    async () => {
      const stats = getDependencyStats();
      return createTextResponse(stats);
    }
  );
}

/**
 * Registers the validate-params tool for validating parameters before execution.
 */
export function registerValidateParamsTool(server: McpServer): void {
  server.tool(
    DISCOVERY_TOOLS.validateParams.name,
    DISCOVERY_TOOLS.validateParams.description,
    {
      toolName: z.string().describe("Tool name to validate parameters for"),
      pathParams: z
        .record(z.string(), z.string())
        .optional()
        .describe("Path parameters to validate"),
      queryParams: z
        .record(z.string(), z.string())
        .optional()
        .describe("Query parameters to validate"),
      body: z.record(z.string(), z.unknown()).optional().describe("Request body to validate"),
    },
    async (args) => {
      const result = validateToolParams({
        toolName: args.toolName,
        pathParams: args.pathParams,
        queryParams: args.queryParams,
        body: args.body as Record<string, unknown> | undefined,
      });

      return createTextResponse({
        ...result,
        formatted: formatValidationResult(result),
      });
    }
  );
}

/**
 * Registers all analysis tools with the MCP server.
 */
export function registerAnalysisTools(server: McpServer): void {
  registerDependenciesTool(server);
  registerDependencyStatsTool(server);
  registerValidateParamsTool(server);
}
