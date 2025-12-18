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
import { CredentialManager, AuthMode } from "./auth/credential-manager.js";
import { HttpClient, createHttpClient } from "./auth/http-client.js";
import { logger } from "./utils/logging.js";
import { VERSION } from "./index.js";
import { WORKFLOW_PROMPTS, processPromptTemplate } from "./prompts/index.js";
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
  type CrudOperation,
} from "./tools/discovery/index.js";

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
 * - Documentation mode: Returns API documentation, schemas, f5xcctl equivalents, Terraform examples
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
                    f5xcctl_equivalents: true,
                    terraform_examples: true,
                    api_execution: isAuthenticated,
                  },
                  toolIndex: {
                    totalTools: indexMetadata.totalTools,
                    domains: indexMetadata.domains,
                    availableDomains: domains,
                  },
                  consolidation: getConsolidationStats(),
                  discoveryTools: [
                    "f5xc-api-search-tools",
                    "f5xc-api-describe-tool",
                    "f5xc-api-execute-tool",
                    "f5xc-api-search-resources",
                    "f5xc-api-execute-resource",
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

    // Search tools - find tools matching natural language queries
    this.server.tool(
      DISCOVERY_TOOLS.search.name,
      DISCOVERY_TOOLS.search.description,
      {
        query: z.string().describe("Natural language search query"),
        limit: z.number().optional().describe("Maximum results (default: 10)"),
        domains: z.array(z.string()).optional().describe("Filter by domains"),
        operations: z.array(z.string()).optional().describe("Filter by operations"),
      },
      async (args) => {
        const results = searchTools(args.query, {
          limit: Math.min(args.limit ?? 10, 50),
          domains: args.domains,
          operations: args.operations,
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
                  hint: "Use f5xc-api-execute-tool to execute this tool.",
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
        pathParams: z.record(z.string()).optional().describe("Path parameters"),
        queryParams: z.record(z.string()).optional().describe("Query parameters"),
        body: z.record(z.unknown()).optional().describe("Request body"),
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
        pathParams: z.record(z.string()).optional().describe("Path parameters"),
        queryParams: z.record(z.string()).optional().describe("Query parameters"),
        body: z.record(z.unknown()).optional().describe("Request body"),
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

    const indexMetadata = getIndexMetadata();
    const consolidationStats = getConsolidationStats();
    logger.info("Tool registration completed (dynamic discovery mode)", {
      authMode,
      authenticated: authMode !== AuthMode.NONE,
      registeredTools: 6,
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
    // Register all workflow prompts
    for (const workflow of WORKFLOW_PROMPTS) {
      // Build Zod schema for arguments
      const argSchema: Record<string, z.ZodTypeAny> = {};
      for (const arg of workflow.arguments) {
        argSchema[arg.name] = arg.required
          ? z.string().describe(arg.description)
          : z.string().optional().describe(arg.description);
      }

      this.server.prompt(
        workflow.name,
        workflow.description,
        argSchema,
        async (args: Record<string, string | undefined>) => {
          // Process template with provided arguments
          const processedArgs: Record<string, string> = {};
          for (const [key, value] of Object.entries(args)) {
            if (value !== undefined) {
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
        }
      );
    }

    logger.info("Prompt registration completed", {
      workflows: WORKFLOW_PROMPTS.length,
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
 */
export function createServer(): F5XCApiServer {
  const credentialManager = new CredentialManager();

  return new F5XCApiServer({
    name: "f5xc-api-mcp",
    version: VERSION,
    credentialManager,
  });
}
