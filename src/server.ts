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
   */
  private registerTools(): void {
    const authMode = this.credentialManager.getAuthMode();

    // Server info tool - always available
    this.server.tool(
      "f5xc-api-server-info",
      "Get F5XC API MCP server information and authentication status",
      {},
      async () => {
        const isAuthenticated = authMode !== AuthMode.NONE;
        const tenantUrl = this.credentialManager.getApiUrl();

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
                  message: isAuthenticated
                    ? "Authenticated - API execution enabled"
                    : "Unauthenticated - Documentation mode only. Set F5XC_API_URL and F5XC_API_TOKEN or F5XC_P12_FILE to enable API execution.",
                },
                null,
                2
              ),
            },
          ],
        };
      }
    );

    // Placeholder for dynamically generated tools from OpenAPI specs
    // These will be added by the tool registry once specs are loaded
    logger.info("Tool registration initialized", {
      authMode,
      authenticated: authMode !== AuthMode.NONE,
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
