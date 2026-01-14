// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Planning Tool Handlers
 *
 * Handles registration of tools for planning and cost estimation:
 * - resolve-dependencies: Generate creation plans with transitive dependencies
 * - estimate-cost: Estimate token usage and latency for tool calls
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  DISCOVERY_TOOLS,
  resolveDependencies,
  formatCreationPlan,
  estimateToolCost,
  estimateMultipleToolsCost,
  estimateWorkflowCost,
  formatCostEstimate,
  formatWorkflowCostEstimate,
  type CreationPlan,
} from "../../../tools/discovery/index.js";
import { createTextResponse, createErrorResponse } from "../../response-utils.js";

/**
 * Registers the resolve-dependencies tool for generating creation plans.
 */
export function registerResolveDependenciesTool(server: McpServer): void {
  server.tool(
    DISCOVERY_TOOLS.resolveDependencies.name,
    DISCOVERY_TOOLS.resolveDependencies.description,
    {
      resource: z.string().describe("Target resource to create"),
      domain: z.string().describe("Domain containing the resource"),
      existingResources: z
        .array(z.string())
        .optional()
        .describe("Resources that already exist (will be skipped)"),
      includeOptional: z
        .boolean()
        .optional()
        .default(false)
        .describe("Include optional dependencies"),
      maxDepth: z.number().optional().default(10).describe("Maximum dependency traversal depth"),
      expandAlternatives: z
        .boolean()
        .optional()
        .default(false)
        .describe("Include alternative paths for oneOf choices"),
    },
    async (args) => {
      const result = resolveDependencies({
        resource: args.resource,
        domain: args.domain,
        existingResources: args.existingResources,
        includeOptional: args.includeOptional,
        maxDepth: args.maxDepth,
        expandAlternatives: args.expandAlternatives,
      });

      if (!result.success || !result.plan) {
        return createTextResponse({ success: false, error: result.error });
      }

      return createTextResponse({
        success: true,
        plan: result.plan,
        formatted: formatCreationPlan(result.plan),
      });
    }
  );
}

/**
 * Registers the estimate-cost tool for estimating token usage and latency.
 */
export function registerEstimateCostTool(server: McpServer): void {
  server.tool(
    DISCOVERY_TOOLS.estimateCost.name,
    DISCOVERY_TOOLS.estimateCost.description,
    {
      toolName: z.string().optional().describe("Single tool name to estimate"),
      toolNames: z.array(z.string()).optional().describe("Multiple tool names to estimate"),
      plan: z.record(z.string(), z.unknown()).optional().describe("CreationPlan to estimate"),
      detailed: z.boolean().optional().default(true).describe("Include detailed breakdown"),
    },
    async (args) => {
      // Single tool estimation
      if (args.toolName) {
        const estimate = estimateToolCost(args.toolName);
        return createTextResponse({
          type: "single_tool",
          estimate,
          formatted: args.detailed ? formatCostEstimate(estimate) : undefined,
        });
      }

      // Multiple tools estimation
      if (args.toolNames && args.toolNames.length > 0) {
        const estimates = estimateMultipleToolsCost(args.toolNames);
        const totalTokens = estimates.reduce((sum, e) => sum + e.tokens.totalTokens, 0);
        return createTextResponse({
          type: "multiple_tools",
          toolCount: estimates.length,
          totalTokens,
          estimates,
          formatted: args.detailed
            ? estimates.map((e) => formatCostEstimate(e)).join("\n\n---\n\n")
            : undefined,
        });
      }

      // Workflow/plan estimation
      if (args.plan) {
        const estimate = estimateWorkflowCost(args.plan as unknown as CreationPlan);
        return createTextResponse({
          type: "workflow",
          estimate,
          formatted: args.detailed ? formatWorkflowCostEstimate(estimate) : undefined,
        });
      }

      // No valid input provided
      return createErrorResponse(
        "No valid input provided",
        "Provide either 'toolName', 'toolNames', or 'plan' parameter"
      );
    }
  );
}

/**
 * Registers all planning tools with the MCP server.
 */
export function registerPlanningTools(server: McpServer): void {
  registerResolveDependenciesTool(server);
  registerEstimateCostTool(server);
}
