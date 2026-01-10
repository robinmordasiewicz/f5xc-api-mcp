// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * F5 Distributed Cloud API MCP Server
 *
 * This module initializes and configures the MCP server with STDIO transport.
 * Supports dual-mode operation: documentation mode (unauthenticated) and
 * execution mode (authenticated with F5XC credentials).
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import {
  CredentialManager,
  AuthMode,
  HttpClient,
  createHttpClient,
} from "@robinmordasiewicz/f5xc-auth";
import { logger } from "./utils/logging.js";
import { normalizeF5XCUrl } from "./utils/url-utils.js";
import { VERSION } from "./index.js";
import {
  getWorkflowPrompts,
  processPromptTemplate,
  getErrorPrompts,
  processErrorTemplate,
} from "./prompts/index.js";
import { RESOURCE_TYPES, createResourceHandler, ResourceHandler } from "./resources/index.js";
import {
  DISCOVERY_TOOLS,
  searchTools,
  describeTool,
  executeTool,
  getIndexMetadata,
  getAvailableDomains,
  searchConsolidatedResources,
  resolveConsolidatedTool,
  getConsolidatedResource,
  getConsolidationStats,
  generateDependencyReport,
  getDependencyStats,
  validateToolParams,
  formatValidationResult,
  resolveDependencies,
  formatCreationPlan,
  estimateToolCost,
  estimateMultipleToolsCost,
  estimateWorkflowCost,
  formatCostEstimate,
  formatWorkflowCostEstimate,
  queryBestPractices,
  getAllDomainsSummary,
  formatBestPractices,
  getRequestBodySchema,
  getComprehensiveSchemaInfo,
  suggestParameters,
  type CrudOperation,
  type CreationPlan,
} from "./tools/discovery/index.js";
import {
  CONFIGURE_AUTH_TOOL,
  configureAuthSchema,
  handleConfigureAuth,
} from "./tools/configure-auth.js";
import type { DependencyDiscoveryAction } from "./generator/dependency-types.js";

/**
 * Server configuration options
 */
export interface ServerConfig {
  /** Server name for MCP identification */
  name: string;
  /** Server version */
  version: string;
  /** Credential manager for auth handling */
  credentialManager: CredentialManager;
}

/**
 * F5XC API MCP Server
 *
 * Provides tools, resources, and prompts for interacting with F5 Distributed Cloud APIs.
 * Works in two modes:
 * - Documentation mode: Returns API documentation, schemas, and CURL examples
 * - Execution mode: Directly executes API calls when authenticated
 */
export class F5XCApiServer {
  private server: McpServer;
  private credentialManager: CredentialManager;
  private httpClient: HttpClient | null = null;
  private resourceHandler: ResourceHandler;
  private transport: StdioServerTransport | null = null;

  constructor(config: ServerConfig) {
    this.credentialManager = config.credentialManager;

    // Create HTTP client if authenticated
    if (this.credentialManager.getAuthMode() !== AuthMode.NONE) {
      this.httpClient = createHttpClient(this.credentialManager);
    }

    // Create resource handler
    this.resourceHandler = createResourceHandler(this.credentialManager, this.httpClient);

    this.server = new McpServer({
      name: config.name,
      version: config.version,
    });

    this.registerCapabilities();
  }

  /**
   * Register all MCP capabilities (tools, resources, prompts)
   */
  private registerCapabilities(): void {
    this.registerTools();
    this.registerResources();
    this.registerPrompts();
  }

  /**
   * Register MCP tools for F5XC API operations
   *
   * Uses the dynamic discovery pattern for token efficiency:
   * - 3 meta-tools instead of 1,400+ individual tools
   * - Reduces upfront token consumption from ~535K to ~500 tokens
   * - Full tool schemas loaded on-demand via describe_tool
   */
  private registerTools(): void {
    const authMode = this.credentialManager.getAuthMode();

    // Server info tool - provides server metadata and tool statistics
    this.server.tool(
      DISCOVERY_TOOLS.serverInfo.name,
      DISCOVERY_TOOLS.serverInfo.description,
      {},
      async () => {
        const isAuthenticated = authMode !== AuthMode.NONE;
        const tenantUrl = this.credentialManager.getApiUrl();
        const indexMetadata = getIndexMetadata();
        const domains = getAvailableDomains();

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
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
                },
                null,
                2
              ),
            },
          ],
        };
      }
    );

    // Configure auth tool - manage authentication and profiles
    this.server.tool(
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
          this.credentialManager
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    // Search tools - find tools matching natural language queries
    this.server.tool(
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

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  query: args.query,
                  resultCount: results.length,
                  results: results.map((r) => ({
                    name: r.tool.name,
                    domain: r.tool.domain,
                    resource: r.tool.resource,
                    operation: r.tool.operation,
                    summary: r.tool.summary,
                    score: Math.round(r.score * 100) / 100,
                    // Phase A enhancement fields
                    dangerLevel: r.tool.dangerLevel,
                    isDeprecated: r.tool.isDeprecated,
                    // Phase B enhancement: prerequisites for create operations
                    ...(r.prerequisites && { prerequisites: r.prerequisites }),
                  })),
                  hint: "Use f5xc-api-describe-tool to get full schema for a specific tool.",
                },
                null,
                2
              ),
            },
          ],
        };
      }
    );

    // Describe tool - get full schema for a specific tool
    this.server.tool(
      DISCOVERY_TOOLS.describe.name,
      DISCOVERY_TOOLS.describe.description,
      {
        toolName: z.string().describe("Exact tool name to describe"),
      },
      async (args) => {
        const description = describeTool(args.toolName);

        if (!description) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    error: `Tool "${args.toolName}" not found`,
                    hint: "Use f5xc-api-search-tools to find available tools.",
                  },
                  null,
                  2
                ),
              },
            ],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  tool: description,
                  hint: "Use f5xc-api-get-schema to get the full JSON schema, or f5xc-api-execute-tool to execute this tool.",
                },
                null,
                2
              ),
            },
          ],
        };
      }
    );

    // Get schema tool - get actionable schema info for request body
    // Returns concise, actionable information (example payload, required fields, oneOf groups)
    // without the full resolved schema which can be very large
    this.server.tool(
      DISCOVERY_TOOLS.getSchema.name,
      DISCOVERY_TOOLS.getSchema.description,
      {
        toolName: z.string().describe("Exact tool name to get schema for"),
      },
      async (args) => {
        // Get comprehensive schema info (resolved with metadata)
        const comprehensiveInfo = getComprehensiveSchemaInfo(args.toolName);

        if (comprehensiveInfo) {
          // Return actionable info without the full resolved schema (which can be 1M+ chars)
          // The examplePayload provides all the structure needed to construct valid requests
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    toolName: args.toolName,
                    examplePayload: comprehensiveInfo.examplePayload,
                    requiredFields: comprehensiveInfo.requiredFields,
                    mutuallyExclusiveGroups: comprehensiveInfo.mutuallyExclusiveGroups,
                    curlExample: comprehensiveInfo.curlExample,
                    usage: {
                      instruction:
                        "Use examplePayload as the 'body' parameter for f5xc-api-execute-tool",
                      steps: [
                        "1. Copy examplePayload as your starting point",
                        "2. Modify values (name, namespace, domains, etc.) for your use case",
                        "3. For mutuallyExclusiveGroups, choose ONE option from each group",
                        "4. Ensure all requiredFields are provided",
                        "5. Execute with f5xc-api-execute-tool",
                      ],
                    },
                  },
                  null,
                  2
                ),
              },
            ],
          };
        }

        // Fall back to raw schema if resolution failed
        const rawSchema = getRequestBodySchema(args.toolName);

        if (!rawSchema) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    error: `No request body schema found for tool "${args.toolName}"`,
                    hint: "This tool may not require a request body, or use f5xc-api-describe-tool to check.",
                  },
                  null,
                  2
                ),
              },
            ],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  toolName: args.toolName,
                  requestBodySchema: rawSchema,
                  note: "Schema contains unresolved $ref pointers. Use f5xc-api-suggest-parameters for working examples.",
                  hint: "Use this schema to construct the 'body' parameter for f5xc-api-execute-tool.",
                },
                null,
                2
              ),
            },
          ],
        };
      }
    );

    // Suggest parameters tool - get pre-built example payloads
    this.server.tool(
      DISCOVERY_TOOLS.suggestParameters.name,
      DISCOVERY_TOOLS.suggestParameters.description,
      {
        toolName: z.string().describe("Exact tool name to get examples for"),
      },
      async (args) => {
        const suggestion = suggestParameters(args.toolName);

        if (!suggestion) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    error: `No pre-built examples available for tool "${args.toolName}"`,
                    hint: "Use f5xc-api-get-schema to get the JSON schema, or f5xc-api-describe-tool for parameter descriptions.",
                  },
                  null,
                  2
                ),
              },
            ],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  toolName: args.toolName,
                  ...suggestion,
                  hint: "Use this payload as the 'body' parameter for f5xc-api-execute-tool.",
                },
                null,
                2
              ),
            },
          ],
        };
      }
    );

    // Execute tool - execute a specific tool with parameters
    this.server.tool(
      DISCOVERY_TOOLS.execute.name,
      DISCOVERY_TOOLS.execute.description,
      {
        toolName: z.string().describe("Tool name to execute"),
        pathParams: z.record(z.string(), z.string()).optional().describe("Path parameters"),
        queryParams: z.record(z.string(), z.string()).optional().describe("Query parameters"),
        body: z.record(z.string(), z.unknown()).optional().describe("Request body"),
      },
      async (args) => {
        const result = await executeTool(
          {
            toolName: args.toolName,
            pathParams: args.pathParams,
            queryParams: args.queryParams,
            body: args.body,
          },
          this.credentialManager
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }
    );

    // Search resources - consolidated resource search
    this.server.tool(
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

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
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
                },
                null,
                2
              ),
            },
          ],
        };
      }
    );

    // Execute resource - execute a CRUD operation on a consolidated resource
    this.server.tool(
      DISCOVERY_TOOLS.executeResource.name,
      DISCOVERY_TOOLS.executeResource.description,
      {
        resourceName: z.string().describe("Consolidated resource name"),
        operation: z.enum(["create", "get", "list", "update", "delete"]).describe("CRUD operation"),
        pathParams: z.record(z.string(), z.string()).optional().describe("Path parameters"),
        queryParams: z.record(z.string(), z.string()).optional().describe("Query parameters"),
        body: z.record(z.string(), z.unknown()).optional().describe("Request body"),
      },
      async (args) => {
        // Resolve to underlying tool
        const toolName = resolveConsolidatedTool(
          args.resourceName,
          args.operation as CrudOperation
        );

        if (!toolName) {
          const resource = getConsolidatedResource(args.resourceName);
          if (!resource) {
            return {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(
                    {
                      error: `Resource "${args.resourceName}" not found`,
                      hint: "Use f5xc-api-search-resources to find available resources.",
                    },
                    null,
                    2
                  ),
                },
              ],
            };
          }
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    error: `Operation "${args.operation}" not available for "${args.resourceName}"`,
                    availableOperations: resource.operations,
                  },
                  null,
                  2
                ),
              },
            ],
          };
        }

        // Execute the resolved tool
        const result = await executeTool(
          {
            toolName,
            pathParams: args.pathParams,
            queryParams: args.queryParams,
            body: args.body,
          },
          this.credentialManager
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  resolvedTool: toolName,
                  ...result,
                },
                null,
                2
              ),
            },
          ],
        };
      }
    );

    // Dependencies tool - get resource dependency information
    this.server.tool(
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

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(report, null, 2),
            },
          ],
        };
      }
    );

    // Dependency stats tool - get graph statistics
    this.server.tool(
      DISCOVERY_TOOLS.dependencyStats.name,
      DISCOVERY_TOOLS.dependencyStats.description,
      {},
      async () => {
        const stats = getDependencyStats();

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(stats, null, 2),
            },
          ],
        };
      }
    );

    // Phase B: Parameter validation tool
    this.server.tool(
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

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  ...result,
                  formatted: formatValidationResult(result),
                },
                null,
                2
              ),
            },
          ],
        };
      }
    );

    // Phase C: Dependency resolver tool
    this.server.tool(
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
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({ success: false, error: result.error }, null, 2),
              },
            ],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  success: true,
                  plan: result.plan,
                  formatted: formatCreationPlan(result.plan),
                },
                null,
                2
              ),
            },
          ],
        };
      }
    );

    // Phase C: Cost estimation tool
    this.server.tool(
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
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    type: "single_tool",
                    estimate,
                    formatted: args.detailed ? formatCostEstimate(estimate) : undefined,
                  },
                  null,
                  2
                ),
              },
            ],
          };
        }

        // Multiple tools estimation
        if (args.toolNames && args.toolNames.length > 0) {
          const estimates = estimateMultipleToolsCost(args.toolNames);
          const totalTokens = estimates.reduce((sum, e) => sum + e.tokens.totalTokens, 0);
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    type: "multiple_tools",
                    toolCount: estimates.length,
                    totalTokens,
                    estimates,
                    formatted: args.detailed
                      ? estimates.map((e) => formatCostEstimate(e)).join("\n\n---\n\n")
                      : undefined,
                  },
                  null,
                  2
                ),
              },
            ],
          };
        }

        // Workflow/plan estimation
        if (args.plan) {
          const estimate = estimateWorkflowCost(args.plan as unknown as CreationPlan);
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    type: "workflow",
                    estimate,
                    formatted: args.detailed ? formatWorkflowCostEstimate(estimate) : undefined,
                  },
                  null,
                  2
                ),
              },
            ],
          };
        }

        // No valid input provided
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  error: "No valid input provided",
                  hint: "Provide either 'toolName', 'toolNames', or 'plan' parameter",
                },
                null,
                2
              ),
            },
          ],
        };
      }
    );

    // Phase C: Best practices tool
    this.server.tool(
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
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    type: "domain_summary",
                    hint: "Specify a domain to get detailed best practices",
                    domains: summary,
                  },
                  null,
                  2
                ),
              },
            ],
          };
        }

        // Query best practices for specified domain
        const result = queryBestPractices({
          domain: args.domain,
          aspect: args.aspect,
          detailed: args.detailed,
        });

        if (!result.success) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({ success: false, error: result.error }, null, 2),
              },
            ],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  success: true,
                  practices: result.practices,
                  formatted:
                    args.detailed && result.practices
                      ? formatBestPractices(result.practices)
                      : undefined,
                },
                null,
                2
              ),
            },
          ],
        };
      }
    );

    const indexMetadata = getIndexMetadata();
    const consolidationStats = getConsolidationStats();
    logger.info("Tool registration completed (dynamic discovery mode)", {
      authMode,
      authenticated: authMode !== AuthMode.NONE,
      registeredTools: 12,
      indexedTools: indexMetadata.totalTools,
      consolidatedResources: consolidationStats.consolidatedCount,
      consolidationReduction: consolidationStats.reductionPercent,
      domains: Object.keys(indexMetadata.domains),
      tokenSavings: "95%+ (535K → ~500 tokens upfront)",
    });
  }

  /**
   * Register MCP resources for F5XC configuration objects
   */
  private registerResources(): void {
    const tenant = this.credentialManager.getTenant() ?? "{tenant}";

    // Register resource templates for each resource type
    for (const rt of Object.values(RESOURCE_TYPES)) {
      const uriTemplate = rt.namespaceScoped
        ? `f5xc://${tenant}/{namespace}/${rt.type}/{name}`
        : `f5xc://${tenant}/system/${rt.type}/{name}`;

      this.server.resource(uriTemplate, rt.description, async (uri: URL) => {
        try {
          const result = await this.resourceHandler.readResource(uri.href);
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

  /**
   * Register MCP prompts for common workflows
   */
  private registerPrompts(): void {
    // Register all workflow prompts (loaded from upstream)
    const workflowPrompts = getWorkflowPrompts();
    for (const workflow of workflowPrompts) {
      // Build Zod schema for arguments
      const argSchema: Record<string, z.ZodTypeAny> = {};
      for (const arg of workflow.arguments) {
        argSchema[arg.name] = arg.required
          ? z.string().describe(arg.description)
          : z.string().optional().describe(arg.description);
      }

      this.server.prompt(workflow.name, workflow.description, argSchema, async (args) => {
        // Process template with provided arguments
        const processedArgs: Record<string, string> = {};
        for (const [key, value] of Object.entries(args as Record<string, unknown>)) {
          if (typeof value === "string") {
            processedArgs[key] = value;
          }
        }

        // Apply default values for optional args
        for (const arg of workflow.arguments) {
          if (!processedArgs[arg.name] && !arg.required) {
            // Set sensible defaults
            if (arg.name === "backend_port") processedArgs[arg.name] = "80";
            if (arg.name === "enable_waf") processedArgs[arg.name] = "false";
            if (arg.name === "mode") processedArgs[arg.name] = "blocking";
          }
        }

        const processedTemplate = processPromptTemplate(workflow.template, processedArgs);

        return {
          messages: [
            {
              role: "user" as const,
              content: {
                type: "text" as const,
                text: processedTemplate,
              },
            },
          ],
        };
      });
    }

    // Phase B: Register error resolution prompts (loaded from upstream)
    const errorPrompts = getErrorPrompts();
    for (const errorPrompt of errorPrompts) {
      // Build Zod schema for arguments
      const argSchema: Record<string, z.ZodTypeAny> = {};
      for (const arg of errorPrompt.arguments) {
        argSchema[arg.name] = arg.required
          ? z.string().describe(arg.description)
          : z.string().optional().describe(arg.description);
      }

      this.server.prompt(errorPrompt.name, errorPrompt.description, argSchema, async (args) => {
        // Process template with provided arguments
        const processedArgs: Record<string, string> = {};
        for (const [key, value] of Object.entries(args as Record<string, unknown>)) {
          if (typeof value === "string") {
            processedArgs[key] = value;
          }
        }

        const processedTemplate = processErrorTemplate(errorPrompt, processedArgs);

        return {
          messages: [
            {
              role: "user" as const,
              content: {
                type: "text" as const,
                text: processedTemplate,
              },
            },
          ],
        };
      });
    }

    logger.info("Prompt registration completed", {
      workflows: workflowPrompts.length,
      errorPrompts: errorPrompts.length,
    });
  }

  /**
   * Start the MCP server with STDIO transport
   */
  async start(): Promise<void> {
    this.transport = new StdioServerTransport();

    logger.info("Starting F5XC API MCP Server", {
      version: VERSION,
      authMode: this.credentialManager.getAuthMode(),
    });

    await this.server.connect(this.transport);

    logger.info("F5XC API MCP Server started successfully");
  }

  /**
   * Stop the MCP server
   */
  async stop(): Promise<void> {
    if (this.transport) {
      await this.server.close();
      this.transport = null;
      logger.info("F5XC API MCP Server stopped");
    }
  }

  /**
   * Get the underlying MCP server instance
   */
  getMcpServer(): McpServer {
    return this.server;
  }

  /**
   * Get the credential manager
   */
  getCredentialManager(): CredentialManager {
    return this.credentialManager;
  }
}

/**
 * Create and configure the F5XC API MCP Server
 *
 * Credentials are loaded asynchronously from:
 * 1. Environment variables (highest priority)
 * 2. Active profile from ~/.config/f5xc/ (XDG Base Directory compliant)
 * 3. No credentials - documentation mode (lowest priority)
 */
export async function createServer(): Promise<F5XCApiServer> {
  // Normalize F5XC_API_URL environment variable before CredentialManager reads it
  // This handles various URL formats users might provide:
  // - Protocol-less URLs: tenant.console.ves.volterra.io
  // - URLs with /api suffix: https://tenant.console.ves.volterra.io/api
  // - Combinations of the above
  const apiUrl = process.env.F5XC_API_URL;
  if (apiUrl) {
    const normalizedUrl = normalizeF5XCUrl(apiUrl);
    if (normalizedUrl !== apiUrl) {
      logger.info(`Normalizing F5XC_API_URL: ${apiUrl} -> ${normalizedUrl}`);
      process.env.F5XC_API_URL = normalizedUrl;
    }
  }

  const credentialManager = new CredentialManager();
  await credentialManager.initialize();

  return new F5XCApiServer({
    name: "f5xc-api-mcp",
    version: VERSION,
    credentialManager,
  });
}
