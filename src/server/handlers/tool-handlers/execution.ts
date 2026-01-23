// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Execution Tool Handlers
 *
 * Handles registration of tools for executing API operations:
 * - execute-tool: Execute a specific tool with parameters
 * - execute-resource: Execute a CRUD operation on a consolidated resource
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CredentialManager } from "@robinmordasiewicz/f5xc-auth";
import { z } from "zod";
import {
  DISCOVERY_TOOLS,
  executeTool,
  resolveConsolidatedTool,
  getConsolidatedResource,
  type CrudOperation,
} from "../../../tools/discovery/index.js";
import { createTextResponse, createErrorResponse } from "../../response-utils.js";

/**
 * Registers the execute-tool tool for executing a specific tool with parameters.
 */
export function registerExecuteToolTool(
  server: McpServer,
  credentialManager: CredentialManager
): void {
  server.tool(
    DISCOVERY_TOOLS.execute.name,
    DISCOVERY_TOOLS.execute.description,
    {
      toolName: z.string().describe("Tool name to execute"),
      pathParams: z
        .record(z.string().regex(/^[a-zA-Z0-9_-]+$/), z.string())
        .optional()
        .describe("Path parameters"),
      queryParams: z
        .record(z.string().regex(/^[a-zA-Z0-9_-]+$/), z.string())
        .optional()
        .describe("Query parameters"),
      body: z
        .record(z.string().regex(/^[a-zA-Z0-9_-]+$/), z.unknown())
        .optional()
        .describe("Request body"),
    },
    async (args) => {
      const result = await executeTool(
        {
          toolName: args.toolName,
          pathParams: args.pathParams,
          queryParams: args.queryParams,
          body: args.body,
        },
        credentialManager
      );

      return createTextResponse(result);
    }
  );
}

/**
 * Registers the execute-resource tool for executing a CRUD operation on a consolidated resource.
 */
export function registerExecuteResourceTool(
  server: McpServer,
  credentialManager: CredentialManager
): void {
  server.tool(
    DISCOVERY_TOOLS.executeResource.name,
    DISCOVERY_TOOLS.executeResource.description,
    {
      resourceName: z.string().describe("Consolidated resource name"),
      operation: z.enum(["create", "get", "list", "update", "delete"]).describe("CRUD operation"),
      pathParams: z
        .record(z.string().regex(/^[a-zA-Z0-9_-]+$/), z.string())
        .optional()
        .describe("Path parameters"),
      queryParams: z
        .record(z.string().regex(/^[a-zA-Z0-9_-]+$/), z.string())
        .optional()
        .describe("Query parameters"),
      body: z
        .record(z.string().regex(/^[a-zA-Z0-9_-]+$/), z.unknown())
        .optional()
        .describe("Request body"),
    },
    async (args) => {
      // Resolve to underlying tool
      const toolName = resolveConsolidatedTool(args.resourceName, args.operation as CrudOperation);

      if (!toolName) {
        const resource = getConsolidatedResource(args.resourceName);
        if (!resource) {
          return createErrorResponse(
            `Resource "${args.resourceName}" not found`,
            "Use f5xc-api-search-resources to find available resources."
          );
        }
        return createTextResponse({
          error: `Operation "${args.operation}" not available for "${args.resourceName}"`,
          availableOperations: resource.operations,
        });
      }

      // Execute the resolved tool
      const result = await executeTool(
        {
          toolName,
          pathParams: args.pathParams,
          queryParams: args.queryParams,
          body: args.body,
        },
        credentialManager
      );

      return createTextResponse({
        resolvedTool: toolName,
        ...result,
      });
    }
  );
}

/**
 * Registers all execution tools with the MCP server.
 */
export function registerExecutionTools(
  server: McpServer,
  credentialManager: CredentialManager
): void {
  registerExecuteToolTool(server, credentialManager);
  registerExecuteResourceTool(server, credentialManager);
}
