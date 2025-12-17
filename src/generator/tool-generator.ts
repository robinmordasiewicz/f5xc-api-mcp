/**
 * MCP Tool Generator
 *
 * Generates MCP tool definitions from parsed OpenAPI operations.
 * Handles both documentation mode and execution mode tool behaviors.
 */

import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ParsedOperation, OpenApiParameter } from "./openapi-parser.js";
import { CredentialManager, AuthMode } from "../auth/credential-manager.js";
import { HttpClient } from "../auth/http-client.js";
import { formatErrorForMcp } from "../utils/error-handling.js";
import { logger } from "../utils/logging.js";

/**
 * Tool response for documentation mode
 */
export interface DocumentationResponse {
  mode: "documentation";
  tool: string;
  description: string;
  httpMethod: string;
  apiPath: string;
  parameters: ParameterInfo[];
  requestBody: RequestBodyInfo | null;
  exampleRequest: Record<string, unknown> | null;
  f5xcctlCommand: string;
  terraformResource: string;
  terraformExample: string;
  prerequisites: string[];
  subscriptionTier: string;
}

/**
 * Tool response for execution mode
 */
export interface ExecutionResponse {
  mode: "execution";
  tool: string;
  status: "success" | "error";
  response: unknown;
  resourceUrl: string | null;
  duration: number;
}

/**
 * Parameter information for documentation
 */
export interface ParameterInfo {
  name: string;
  location: "path" | "query" | "body";
  type: string;
  required: boolean;
  description: string;
}

/**
 * Request body information for documentation
 */
export interface RequestBodyInfo {
  required: boolean;
  contentType: string;
  schema: Record<string, unknown>;
}

/**
 * Subscription tier constants
 */
export const SUBSCRIPTION_TIERS = {
  NO_TIER: "NO_TIER",
  STANDARD: "STANDARD",
  ADVANCED: "ADVANCED",
} as const;

/**
 * Map resource types to subscription tiers
 */
const RESOURCE_TIER_MAP: Record<string, string> = {
  // Standard tier resources
  http_loadbalancer: SUBSCRIPTION_TIERS.STANDARD,
  origin_pool: SUBSCRIPTION_TIERS.STANDARD,
  dns_zone: SUBSCRIPTION_TIERS.STANDARD,
  healthcheck: SUBSCRIPTION_TIERS.STANDARD,

  // Advanced tier resources
  app_firewall: SUBSCRIPTION_TIERS.ADVANCED,
  bot_defense: SUBSCRIPTION_TIERS.ADVANCED,
  api_discovery: SUBSCRIPTION_TIERS.ADVANCED,
  malicious_user_detection: SUBSCRIPTION_TIERS.ADVANCED,

  // Core resources (no tier)
  namespace: SUBSCRIPTION_TIERS.NO_TIER,
  certificate: SUBSCRIPTION_TIERS.NO_TIER,
  secret: SUBSCRIPTION_TIERS.NO_TIER,
};

/**
 * Get subscription tier for a resource type
 */
function getSubscriptionTier(resource: string): string {
  const normalizedResource = resource.toLowerCase().replace(/-/g, "_");
  return RESOURCE_TIER_MAP[normalizedResource] ?? SUBSCRIPTION_TIERS.NO_TIER;
}

/**
 * Generate f5xcctl equivalent command
 */
function generateF5xcctlCommand(operation: ParsedOperation): string {
  const resource = operation.resource.replace(/-/g, "_");

  switch (operation.operation) {
    case "list":
      return `f5xcctl get ${resource}s -n {namespace}`;
    case "get":
      return `f5xcctl get ${resource} {name} -n {namespace}`;
    case "create":
      return `f5xcctl apply -f ${resource}.yaml`;
    case "update":
      return `f5xcctl apply -f ${resource}.yaml`;
    case "delete":
      return `f5xcctl delete ${resource} {name} -n {namespace}`;
    default:
      return `f5xcctl ${operation.operation} ${resource}`;
  }
}

/**
 * Generate Terraform resource name
 */
function generateTerraformResource(operation: ParsedOperation): string {
  const resource = operation.resource.replace(/-/g, "_");
  return `volterra_${resource}`;
}

/**
 * Generate Terraform example
 */
function generateTerraformExample(operation: ParsedOperation): string {
  const resource = operation.resource.replace(/-/g, "_");
  const terraformResource = `volterra_${resource}`;

  if (operation.operation !== "create" && operation.operation !== "update") {
    return `# Use data source for ${operation.operation} operations\ndata "${terraformResource}" "example" {\n  name      = "example"\n  namespace = "default"\n}`;
  }

  return `resource "${terraformResource}" "example" {
  name      = "example"
  namespace = "default"

  # Add resource-specific configuration here
  # See F5XC Terraform Provider documentation for details
}`;
}

/**
 * Generate prerequisites based on resource type
 */
function generatePrerequisites(operation: ParsedOperation): string[] {
  const prerequisites: string[] = [];

  // Common prerequisites
  if (operation.path.includes("{namespace}")) {
    prerequisites.push("Namespace must exist");
  }

  // Resource-specific prerequisites
  const resource = operation.resource.toLowerCase();

  if (resource.includes("loadbalancer") || resource.includes("lb")) {
    prerequisites.push("Origin pool required for backend configuration");
    prerequisites.push("DNS zone required for automatic DNS management (optional)");
  }

  if (resource.includes("origin") && resource.includes("pool")) {
    prerequisites.push("Backend servers must be accessible");
    prerequisites.push("Health check configuration recommended");
  }

  if (resource.includes("site")) {
    prerequisites.push("Cloud credentials must be configured");
    prerequisites.push("VPC/VNet must exist in target cloud");
  }

  if (resource.includes("waf") || resource.includes("firewall")) {
    prerequisites.push("WAAP subscription required");
  }

  return prerequisites;
}

/**
 * Convert OpenAPI parameter to Zod schema
 */
function parameterToZodSchema(param: OpenApiParameter): z.ZodTypeAny {
  const schema = param.schema as Record<string, unknown> | undefined;
  const type = schema?.type as string | undefined;

  let zodSchema: z.ZodTypeAny;

  switch (type) {
    case "integer":
      zodSchema = z.number().int();
      break;
    case "number":
      zodSchema = z.number();
      break;
    case "boolean":
      zodSchema = z.boolean();
      break;
    case "array":
      zodSchema = z.array(z.unknown());
      break;
    case "object":
      zodSchema = z.record(z.unknown());
      break;
    default:
      zodSchema = z.string();
  }

  if (!param.required) {
    zodSchema = zodSchema.optional();
  }

  if (param.description) {
    zodSchema = zodSchema.describe(param.description);
  }

  return zodSchema;
}

/**
 * Build Zod schema for tool parameters
 */
function buildToolSchema(operation: ParsedOperation): z.ZodObject<Record<string, z.ZodTypeAny>> {
  const shape: Record<string, z.ZodTypeAny> = {};

  // Add path parameters
  for (const param of operation.pathParameters) {
    shape[param.name] = parameterToZodSchema(param);
  }

  // Add query parameters
  for (const param of operation.queryParameters) {
    shape[param.name] = parameterToZodSchema(param);
  }

  // Add body parameter for create/update operations
  if (
    operation.requestBodySchema &&
    (operation.operation === "create" || operation.operation === "update")
  ) {
    shape["body"] = z.record(z.unknown()).optional().describe("Request body (JSON object)");
  }

  return z.object(shape);
}

/**
 * Build documentation response for a tool
 */
function buildDocumentationResponse(operation: ParsedOperation): DocumentationResponse {
  const parameters: ParameterInfo[] = [];

  // Add path parameters
  for (const param of operation.pathParameters) {
    parameters.push({
      name: param.name,
      location: "path",
      type: ((param.schema as Record<string, unknown>)?.type as string) ?? "string",
      required: param.required ?? true,
      description: param.description ?? "",
    });
  }

  // Add query parameters
  for (const param of operation.queryParameters) {
    parameters.push({
      name: param.name,
      location: "query",
      type: ((param.schema as Record<string, unknown>)?.type as string) ?? "string",
      required: param.required ?? false,
      description: param.description ?? "",
    });
  }

  // Add body info
  let requestBody: RequestBodyInfo | null = null;
  if (operation.requestBodySchema) {
    requestBody = {
      required: operation.requiredParams.includes("body"),
      contentType: "application/json",
      schema: operation.requestBodySchema,
    };

    parameters.push({
      name: "body",
      location: "body",
      type: "object",
      required: operation.requiredParams.includes("body"),
      description: "Request body as JSON object",
    });
  }

  return {
    mode: "documentation",
    tool: operation.toolName,
    description: operation.summary,
    httpMethod: operation.method,
    apiPath: operation.path,
    parameters,
    requestBody,
    exampleRequest: generateExampleRequest(operation),
    f5xcctlCommand: generateF5xcctlCommand(operation),
    terraformResource: generateTerraformResource(operation),
    terraformExample: generateTerraformExample(operation),
    prerequisites: generatePrerequisites(operation),
    subscriptionTier: getSubscriptionTier(operation.resource),
  };
}

/**
 * Generate example request for documentation
 */
function generateExampleRequest(operation: ParsedOperation): Record<string, unknown> | null {
  if (operation.operation !== "create" && operation.operation !== "update") {
    return null;
  }

  // Generate a basic example based on the resource type
  const resource = operation.resource.toLowerCase();

  if (resource.includes("loadbalancer") || resource.includes("lb")) {
    return {
      metadata: {
        name: "example-lb",
        namespace: "default",
      },
      spec: {
        domains: ["app.example.com"],
        default_route_pools: [
          {
            pool: {
              tenant: "your-tenant",
              namespace: "default",
              name: "example-origin-pool",
            },
          },
        ],
      },
    };
  }

  if (resource.includes("origin") && resource.includes("pool")) {
    return {
      metadata: {
        name: "example-origin-pool",
        namespace: "default",
      },
      spec: {
        origin_servers: [
          {
            public_ip: {
              ip: "10.0.0.1",
            },
          },
        ],
        port: 80,
        no_tls: {},
      },
    };
  }

  // Generic example
  return {
    metadata: {
      name: `example-${resource}`,
      namespace: "default",
    },
    spec: {},
  };
}

/**
 * Register a tool on the MCP server
 */
export function registerTool(
  server: McpServer,
  operation: ParsedOperation,
  credentialManager: CredentialManager,
  httpClient: HttpClient | null
): void {
  const schema = buildToolSchema(operation);
  const description = `${operation.summary}\n\nDomain: ${operation.domain}\nResource: ${operation.resource}\nHTTP: ${operation.method} ${operation.path}`;

  server.tool(
    operation.toolName,
    description,
    schema.shape,
    async (params: Record<string, unknown>) => {
      try {
        // Check authentication mode
        if (credentialManager.getAuthMode() === AuthMode.NONE || !httpClient) {
          // Documentation mode - return API documentation
          const docResponse = buildDocumentationResponse(operation);
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(docResponse, null, 2),
              },
            ],
          };
        }

        // Execution mode - make actual API call
        const startTime = Date.now();

        // Build API path with parameters
        let apiPath = operation.path;
        for (const param of operation.pathParameters) {
          const value = params[param.name];
          if (value !== undefined) {
            apiPath = apiPath.replace(`{${param.name}}`, String(value));
          }
        }

        // Build query string
        const queryParams = new URLSearchParams();
        for (const param of operation.queryParameters) {
          const value = params[param.name];
          if (value !== undefined) {
            queryParams.append(param.name, String(value));
          }
        }
        if (queryParams.toString()) {
          apiPath += `?${queryParams.toString()}`;
        }

        // Execute request
        let response;
        const body = params["body"] as Record<string, unknown> | undefined;

        switch (operation.method) {
          case "GET":
            response = await httpClient.get(apiPath);
            break;
          case "POST":
            response = await httpClient.post(apiPath, body);
            break;
          case "PUT":
            response = await httpClient.put(apiPath, body);
            break;
          case "DELETE":
            response = await httpClient.delete(apiPath);
            break;
          default:
            throw new Error(`Unsupported HTTP method: ${operation.method}`);
        }

        const duration = Date.now() - startTime;
        const tenant = credentialManager.getTenant();
        const resourceUrl = tenant ? `https://${tenant}.console.ves.volterra.io${apiPath}` : null;

        const execResponse: ExecutionResponse = {
          mode: "execution",
          tool: operation.toolName,
          status: "success",
          response: response.data,
          resourceUrl,
          duration,
        };

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(execResponse, null, 2),
            },
          ],
        };
      } catch (error) {
        logger.error(`Tool execution failed: ${operation.toolName}`, {
          error: error instanceof Error ? error.message : String(error),
        });
        return formatErrorForMcp(error);
      }
    }
  );

  logger.debug(`Registered tool: ${operation.toolName}`);
}

/**
 * Register all tools from parsed operations
 */
export function registerAllTools(
  server: McpServer,
  operations: ParsedOperation[],
  credentialManager: CredentialManager,
  httpClient: HttpClient | null
): void {
  for (const operation of operations) {
    registerTool(server, operation, credentialManager, httpClient);
  }

  logger.info(`Registered ${operations.length} tools`);
}
