// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

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

export type { ExecuteToolParams, ExecuteToolResult, DocumentationResponse } from "./execute.js";

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

// Schema exports
export {
  getRequestBodySchema,
  getResolvedRequestBodySchema,
  getResponseSchema,
  getToolSchemas,
  getMinimumConfiguration,
  getRequiredFields,
  getMutuallyExclusiveFields,
  generateExamplePayload,
  generateSmartExamplePayload,
  getComprehensiveSchemaInfo,
  type ResolvedSchema,
  type MinimumConfiguration,
  type MutuallyExclusiveGroup,
} from "./schema.js";

// Schema loader exports
export {
  loadDomainSchemas,
  resolveSchemaRef,
  resolveNestedRefs,
  clearSchemaCache,
  getSchemaCacheStats,
} from "./schema-loader.js";

// Suggest parameters exports
export {
  suggestParameters,
  getAvailableExamples,
  hasSuggestedParameters,
  hasCuratedExample,
  getSuggestionSource,
  getSuggestionStats,
  type SuggestionResult,
} from "./suggest-params.js";

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

// Dependency discovery exports
export {
  loadDependencyGraph,
  clearDependencyCache,
  getResourceDependencies,
  getCreationOrder,
  getPrerequisiteResources,
  getDependentResources,
  getOneOfGroups,
  getSubscriptionRequirements,
  getResourcesRequiringSubscription,
  getAvailableAddonServices,
  generateDependencyReport,
  getDependencyStats,
  getResourcesInDomain,
  getAllDependencyDomains,
} from "./dependencies.js";

// Validation exports (Phase B)
export type { ValidationError, ValidationResult, ValidateParams } from "./validate.js";
export { validateToolParams, formatValidationResult } from "./validate.js";

// Resolver exports (Phase C)
export type {
  WorkflowStep,
  AlternativePath,
  CreationPlan,
  ResolveParams,
  ResolveResult,
} from "./resolver.js";
export { resolveDependencies, formatCreationPlan, generateCompactPlan } from "./resolver.js";

// Cost estimator exports (Phase C)
export type {
  LatencyLevel,
  TokenEstimate,
  LatencyEstimate,
  ToolCostEstimate,
  WorkflowCostEstimate,
  EstimateCostParams,
} from "./cost-estimator.js";
export {
  estimateToolTokens,
  estimateToolLatency,
  estimateToolCost,
  estimateMultipleToolsCost,
  estimateWorkflowCost,
  formatCostEstimate,
  formatWorkflowCostEstimate,
} from "./cost-estimator.js";

// Best practices exports (Phase C)
export type {
  CommonError,
  DangerAnalysis,
  RecommendedWorkflow,
  DomainBestPractices,
  BestPracticesQuery,
  BestPracticesResult,
} from "./best-practices.js";
export {
  getDomainBestPractices,
  queryBestPractices,
  getAllDomainsSummary,
  formatBestPractices,
} from "./best-practices.js";

/**
 * MCP Tool Definitions for the discovery meta-tools
 *
 * These are the three tools that get registered with the MCP server
 * instead of the 1,400+ individual API tools.
 */
export const DISCOVERY_TOOLS = {
  search: {
    name: "f5xc-api-search-tools",
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
          description: "Filter by domain(s): waap, dns, core, network, site, security, appstack",
        },
        operations: {
          type: "array",
          items: { type: "string" },
          description: "Filter by operation type(s): create, get, list, update, delete",
        },
        excludeDangerous: {
          type: "boolean",
          description: "Exclude high-danger operations from results",
        },
        excludeDeprecated: {
          type: "boolean",
          description: "Exclude deprecated operations from results",
        },
        includeDependencies: {
          type: "boolean",
          description: "Include prerequisite hints for create operations",
        },
      },
      required: ["query"],
    },
  },

  describe: {
    name: "f5xc-api-describe-tool",
    description:
      "Get detailed information about a specific F5XC API tool including parameters, request body schema, " +
      "and usage examples. Use search_tools first to find the tool name.",
    inputSchema: {
      type: "object" as const,
      properties: {
        toolName: {
          type: "string",
          description: "The exact tool name (e.g., 'f5xc-api-waap-http-loadbalancer-create')",
        },
      },
      required: ["toolName"],
    },
  },

  execute: {
    name: "f5xc-api-execute-tool",
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
          description: "Path parameters (e.g., { namespace: 'default', name: 'example-resource' })",
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
    name: "f5xc-api-search-resources",
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
          description: "Filter by domain(s): waap, dns, core, network, site, security, appstack",
        },
      },
      required: ["query"],
    },
  },

  executeResource: {
    name: "f5xc-api-execute-resource",
    description:
      "Execute a CRUD operation on a consolidated F5XC resource. Specify the resource name and operation. " +
      "Routes to the correct underlying API tool automatically.",
    inputSchema: {
      type: "object" as const,
      properties: {
        resourceName: {
          type: "string",
          description: "The consolidated resource name (e.g., 'f5xc-api-waap-http-loadbalancer')",
        },
        operation: {
          type: "string",
          enum: ["create", "get", "list", "update", "delete"],
          description: "The CRUD operation to perform",
        },
        pathParams: {
          type: "object",
          description: "Path parameters (e.g., { namespace: 'default', name: 'example-resource' })",
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

  dependencies: {
    name: "f5xc-api-dependencies",
    description:
      "Get dependency information for F5XC resources. Returns prerequisites (resources that must exist before creation), " +
      "dependents (resources that would break if deleted), mutually exclusive field options (oneOf groups), " +
      "subscription requirements, and recommended creation order. Essential for understanding resource relationships.",
    inputSchema: {
      type: "object" as const,
      properties: {
        resource: {
          type: "string",
          description: "The resource name (e.g., 'http-loadbalancer', 'origin-pool')",
        },
        domain: {
          type: "string",
          description: "The domain containing the resource (e.g., 'virtual', 'network', 'api')",
        },
        action: {
          type: "string",
          enum: ["prerequisites", "dependents", "oneOf", "subscriptions", "creationOrder", "full"],
          description:
            "Type of information to retrieve: " +
            "'prerequisites' - resources that must exist before creation, " +
            "'dependents' - resources that depend on this one, " +
            "'oneOf' - mutually exclusive field options, " +
            "'subscriptions' - required addon services, " +
            "'creationOrder' - topologically sorted creation sequence, " +
            "'full' - all dependency information (default)",
          default: "full",
        },
      },
      required: ["resource", "domain"],
    },
  },

  dependencyStats: {
    name: "f5xc-api-dependency-stats",
    description:
      "Get statistics about the F5XC resource dependency graph including total resources, " +
      "dependency counts, available addon services, and graph metadata.",
    inputSchema: {
      type: "object" as const,
      properties: {},
    },
  },

  validateParams: {
    name: "f5xc-api-validate-params",
    description:
      "Validate parameters for an F5XC API tool before execution. Checks required fields, " +
      "parameter types, and oneOf constraints. Returns detailed error messages for invalid inputs.",
    inputSchema: {
      type: "object" as const,
      properties: {
        toolName: {
          type: "string",
          description: "The exact tool name to validate parameters for",
        },
        pathParams: {
          type: "object",
          description:
            "Path parameters to validate (e.g., { namespace: 'default', name: 'my-resource' })",
          additionalProperties: { type: "string" },
        },
        queryParams: {
          type: "object",
          description: "Query parameters to validate",
          additionalProperties: { type: "string" },
        },
        body: {
          type: "object",
          description: "Request body to validate",
        },
      },
      required: ["toolName"],
    },
  },

  resolveDependencies: {
    name: "f5xc-api-resolve-dependencies",
    description:
      "Generate a complete creation plan for an F5XC resource with all transitive dependencies. " +
      "Returns step-by-step workflow with tool names, required inputs, and oneOf choices. " +
      "Essential for understanding what resources must be created before the target resource.",
    inputSchema: {
      type: "object" as const,
      properties: {
        resource: {
          type: "string",
          description: "The target resource to create (e.g., 'http-loadbalancer', 'origin-pool')",
        },
        domain: {
          type: "string",
          description: "The domain containing the resource (e.g., 'virtual', 'network')",
        },
        existingResources: {
          type: "array",
          items: { type: "string" },
          description:
            "Resources that already exist (will be skipped). Format: 'domain/resource' " +
            "(e.g., ['network/origin-pool', 'certificates/certificate'])",
        },
        includeOptional: {
          type: "boolean",
          description: "Include optional dependencies in the plan (default: false)",
          default: false,
        },
        maxDepth: {
          type: "number",
          description: "Maximum depth for dependency traversal (default: 10)",
          default: 10,
        },
        expandAlternatives: {
          type: "boolean",
          description: "Include alternative paths for oneOf choices (default: false)",
          default: false,
        },
      },
      required: ["resource", "domain"],
    },
  },

  estimateCost: {
    name: "f5xc-api-estimate-cost",
    description:
      "Estimate token usage and latency for F5XC API tool calls. Provides cost estimates for individual tools, " +
      "multiple tools, or complete creation plan workflows. Useful for planning and optimizing API interactions.",
    inputSchema: {
      type: "object" as const,
      properties: {
        toolName: {
          type: "string",
          description:
            "A single tool name to estimate (e.g., 'f5xc-api-waap-http-loadbalancer-create')",
        },
        toolNames: {
          type: "array",
          items: { type: "string" },
          description: "Multiple tool names to estimate costs for",
        },
        plan: {
          type: "object",
          description:
            "A CreationPlan object from f5xc-api-resolve-dependencies to estimate workflow costs",
        },
        detailed: {
          type: "boolean",
          description: "Include detailed breakdown of token usage and latency (default: true)",
          default: true,
        },
      },
    },
  },

  bestPractices: {
    name: "f5xc-api-best-practices",
    description:
      "Get domain-specific best practices for F5XC API operations. Includes common errors with resolutions, " +
      "recommended workflows, danger level analysis, security notes, and performance tips.",
    inputSchema: {
      type: "object" as const,
      properties: {
        domain: {
          type: "string",
          description:
            "Domain to get best practices for (e.g., 'virtual', 'dns', 'certificates'). " +
            "Omit to list available domains.",
        },
        aspect: {
          type: "string",
          enum: ["errors", "workflows", "danger", "security", "performance", "all"],
          description:
            "Specific aspect to retrieve: 'errors' (common errors), 'workflows' (recommended workflows), " +
            "'danger' (danger level analysis), 'security' (security notes), 'performance' (tips), 'all' (default)",
          default: "all",
        },
        detailed: {
          type: "boolean",
          description: "Include detailed breakdowns (default: true)",
          default: true,
        },
      },
    },
  },

  getSchema: {
    name: "f5xc-api-get-schema",
    description:
      "Get the complete JSON schema for a tool's request body. Returns the full OpenAPI schema definition " +
      "including all nested objects, arrays, enums, and validation rules. Use this to understand the exact " +
      "structure required for complex API payloads.",
    inputSchema: {
      type: "object" as const,
      properties: {
        toolName: {
          type: "string",
          description: "The exact tool name (e.g., 'f5xc-api-virtual-http-loadbalancer-create')",
        },
      },
      required: ["toolName"],
    },
  },

  suggestParameters: {
    name: "f5xc-api-suggest-parameters",
    description:
      "Get pre-built example payloads for common F5XC operations. Returns complete, working examples " +
      "for popular tools like HTTP load balancers, origin pools, and DNS zones. Use this to avoid " +
      "guessing parameter formats and get started quickly.",
    inputSchema: {
      type: "object" as const,
      properties: {
        toolName: {
          type: "string",
          description: "The exact tool name (e.g., 'f5xc-api-virtual-http-loadbalancer-create')",
        },
      },
      required: ["toolName"],
    },
  },
} as const;
