/**
 * Discovery Module - Dynamic Tool Discovery for Token Efficiency
 *
 * This module implements the Speakeasy-style dynamic toolset pattern
 * that reduces token consumption by 95%+ through lazy loading.
 *
 * Instead of loading all 1,400+ tools upfront (~535K tokens), this module
 * exposes three meta-tools that load tool schemas on-demand:
 *
 * 1. search_tools - Find tools matching a natural language query
 * 2. describe_tool - Get full schema for a specific tool
 * 3. execute_tool - Execute a discovered tool
 *
 * Token Impact:
 * - Before: 535,000 tokens loaded at server start
 * - After: ~500 tokens (meta-tools) + ~375 tokens per tool used
 */

// Type exports
export type {
  ToolIndexEntry,
  SearchResult,
  SearchOptions,
  ToolIndex,
  ToolIndexMetadata,
} from "./types.js";

export type { ToolDescription, ParameterDescription, CompactToolDescription } from "./describe.js";

export type {
  ExecuteToolParams,
  ExecuteToolResult,
  DocumentationResponse,
} from "./execute.js";

// Index loader exports
export {
  getToolIndex,
  clearIndexCache,
  getIndexMetadata,
  toolExists,
  getToolEntry,
} from "./index-loader.js";

// Search exports
export {
  searchTools,
  getToolsByDomain,
  getToolsByResource,
  getAvailableDomains,
  getToolCountByDomain,
} from "./search.js";

// Describe exports
export {
  describeTool,
  describeTools,
  describeToolSafe,
  describeToolCompact,
  getFullToolSchema,
  getOptimizationStats,
} from "./describe.js";

// Execute exports
export { executeTool, validateExecuteParams } from "./execute.js";

// Consolidation exports
export type { CrudOperation, ConsolidatedResource, ConsolidatedIndex } from "./consolidate.js";
export {
  getConsolidatedIndex,
  clearConsolidatedCache,
  getConsolidatedResource,
  getConsolidatedByDomain,
  searchConsolidatedResources,
  resolveConsolidatedTool,
  getConsolidationStats,
} from "./consolidate.js";

/**
 * MCP Tool Definitions for the discovery meta-tools
 *
 * These are the three tools that get registered with the MCP server
 * instead of the 1,400+ individual API tools.
 */
export const DISCOVERY_TOOLS = {
  search: {
    name: "f5xc-search-tools",
    description:
      "Search for F5XC API tools using natural language. Returns matching tools with relevance scores. " +
      "Use this to find tools for specific operations like 'create load balancer' or 'list DNS zones'.",
    inputSchema: {
      type: "object" as const,
      properties: {
        query: {
          type: "string",
          description:
            "Natural language search query (e.g., 'http load balancer', 'create origin pool', 'delete dns zone')",
        },
        limit: {
          type: "number",
          description: "Maximum number of results to return (default: 10, max: 50)",
          default: 10,
        },
        domains: {
          type: "array",
          items: { type: "string" },
          description:
            "Filter by domain(s): waap, dns, core, network, site, security, appstack",
        },
        operations: {
          type: "array",
          items: { type: "string" },
          description: "Filter by operation type(s): create, get, list, update, delete",
        },
      },
      required: ["query"],
    },
  },

  describe: {
    name: "f5xc-describe-tool",
    description:
      "Get detailed information about a specific F5XC API tool including parameters, request body schema, " +
      "and usage examples. Use search_tools first to find the tool name.",
    inputSchema: {
      type: "object" as const,
      properties: {
        toolName: {
          type: "string",
          description:
            "The exact tool name (e.g., 'f5xc-api-waap-http-loadbalancer-create')",
        },
      },
      required: ["toolName"],
    },
  },

  execute: {
    name: "f5xc-execute-tool",
    description:
      "Execute an F5XC API tool. In authenticated mode, makes the actual API call. " +
      "In documentation mode, returns CLI equivalents and curl examples.",
    inputSchema: {
      type: "object" as const,
      properties: {
        toolName: {
          type: "string",
          description: "The exact tool name to execute",
        },
        pathParams: {
          type: "object",
          description:
            "Path parameters (e.g., { namespace: 'default', name: 'my-resource' })",
          additionalProperties: { type: "string" },
        },
        queryParams: {
          type: "object",
          description: "Query parameters for the request",
          additionalProperties: { type: "string" },
        },
        body: {
          type: "object",
          description: "Request body for POST/PUT/PATCH operations",
        },
      },
      required: ["toolName"],
    },
  },

  serverInfo: {
    name: "f5xc-api-server-info",
    description:
      "Get F5XC API MCP server information including authentication status, available domains, " +
      "and total tool count. Use this to understand server capabilities.",
    inputSchema: {
      type: "object" as const,
      properties: {},
    },
  },

  searchResources: {
    name: "f5xc-search-resources",
    description:
      "Search for F5XC resources (consolidated view). Returns resources with their available CRUD operations. " +
      "More efficient than searching individual tools - one result per resource instead of 5 CRUD tools.",
    inputSchema: {
      type: "object" as const,
      properties: {
        query: {
          type: "string",
          description:
            "Natural language search query (e.g., 'http load balancer', 'origin pool', 'dns zone')",
        },
        limit: {
          type: "number",
          description: "Maximum number of results to return (default: 10)",
          default: 10,
        },
        domains: {
          type: "array",
          items: { type: "string" },
          description:
            "Filter by domain(s): waap, dns, core, network, site, security, appstack",
        },
      },
      required: ["query"],
    },
  },

  executeResource: {
    name: "f5xc-execute-resource",
    description:
      "Execute a CRUD operation on a consolidated F5XC resource. Specify the resource name and operation. " +
      "Routes to the correct underlying API tool automatically.",
    inputSchema: {
      type: "object" as const,
      properties: {
        resourceName: {
          type: "string",
          description:
            "The consolidated resource name (e.g., 'f5xc-api-waap-http-loadbalancer')",
        },
        operation: {
          type: "string",
          enum: ["create", "get", "list", "update", "delete"],
          description: "The CRUD operation to perform",
        },
        pathParams: {
          type: "object",
          description:
            "Path parameters (e.g., { namespace: 'default', name: 'my-resource' })",
          additionalProperties: { type: "string" },
        },
        queryParams: {
          type: "object",
          description: "Query parameters for the request",
          additionalProperties: { type: "string" },
        },
        body: {
          type: "object",
          description: "Request body for create/update operations",
        },
      },
      required: ["resourceName", "operation"],
    },
  },
} as const;
