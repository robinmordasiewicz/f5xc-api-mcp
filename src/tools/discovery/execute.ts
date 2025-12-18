/**
 * Tool Execution Dispatcher
 *
 * Routes tool execution requests to the appropriate handler.
 * This provides a unified interface for executing any discovered tool.
 */

import type { ParsedOperation } from "../../generator/openapi-parser.js";
import { getToolByName } from "../registry.js";
import { toolExists } from "./index-loader.js";
import { CredentialManager, AuthMode } from "../../auth/credential-manager.js";
import { createHttpClient } from "../../auth/http-client.js";
import { logger } from "../../utils/logging.js";

/**
 * Tool execution parameters
 */
export interface ExecuteToolParams {
  /** The tool name to execute */
  toolName: string;
  /** Path parameters (e.g., { namespace: "default", name: "my-lb" }) */
  pathParams?: Record<string, string>;
  /** Query parameters */
  queryParams?: Record<string, string | string[]>;
  /** Request body (for POST/PUT/PATCH) */
  body?: Record<string, unknown>;
}

/**
 * Tool execution result
 */
export interface ExecuteToolResult {
  /** Whether execution was successful */
  success: boolean;
  /** Response data (if successful) */
  data?: unknown;
  /** Error message (if failed) */
  error?: string;
  /** HTTP status code (if API call was made) */
  statusCode?: number;
  /** Tool metadata */
  toolInfo: {
    name: string;
    method: string;
    path: string;
    operation: string;
  };
}

/**
 * Documentation-mode response when not authenticated
 */
export interface DocumentationResponse {
  /** The tool that was requested */
  tool: {
    name: string;
    summary: string;
    method: string;
    path: string;
    domain: string;
    resource: string;
    operation: string;
  };
  /** f5xcctl CLI equivalent command */
  f5xcctlCommand: string;
  /** Terraform resource example (if applicable) */
  terraformExample?: string;
  /** curl command example */
  curlExample: string;
  /** Message about authentication */
  authMessage: string;
}

/**
 * Build path with parameters substituted
 */
function buildPath(pathTemplate: string, pathParams: Record<string, string>): string {
  let path = pathTemplate;

  for (const [key, value] of Object.entries(pathParams)) {
    // Handle both {param} and {metadata.param} style placeholders
    path = path.replace(`{${key}}`, encodeURIComponent(value));
  }

  // Check for any remaining unsubstituted parameters
  const remaining = path.match(/\{[^}]+\}/g);
  if (remaining) {
    throw new Error(`Missing path parameters: ${remaining.join(", ")}`);
  }

  return path;
}

/**
 * Build query string from parameters
 */
function buildQueryString(queryParams: Record<string, string | string[]>): string {
  const parts: string[] = [];

  for (const [key, value] of Object.entries(queryParams)) {
    if (Array.isArray(value)) {
      for (const v of value) {
        parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(v)}`);
      }
    } else {
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  }

  return parts.length > 0 ? `?${parts.join("&")}` : "";
}

/**
 * Generate f5xcctl equivalent command
 */
function generateF5xcctlCommand(tool: ParsedOperation, params: ExecuteToolParams): string {
  const { operation, resource } = tool;
  const pathParams = params.pathParams ?? {};

  // Build resource identifier
  const namespace = pathParams.namespace ?? pathParams["metadata.namespace"] ?? "{namespace}";
  const name = pathParams.name ?? pathParams["metadata.name"] ?? "{name}";

  // Map operation to f5xcctl verb
  const verbMap: Record<string, string> = {
    create: "create",
    get: "get",
    list: "list",
    update: "replace",
    delete: "delete",
  };
  const verb = verbMap[operation] ?? operation;

  // Build command
  const resourceType = resource.replace(/-/g, "_");

  if (operation === "list") {
    return `f5xcctl ${verb} ${resourceType} --namespace ${namespace}`;
  } else if (operation === "create") {
    return `f5xcctl ${verb} ${resourceType} --namespace ${namespace} -f config.yaml`;
  } else {
    return `f5xcctl ${verb} ${resourceType} ${name} --namespace ${namespace}`;
  }
}

/**
 * Generate curl command example
 */
function generateCurlCommand(
  tool: ParsedOperation,
  params: ExecuteToolParams,
  apiUrl: string
): string {
  const path = buildPath(tool.path, params.pathParams ?? {});
  const queryString = buildQueryString(params.queryParams ?? {});
  const fullUrl = `${apiUrl}${path}${queryString}`;

  let cmd = `curl -X ${tool.method} "${fullUrl}"`;
  cmd += ' \\\n  -H "Authorization: APIToken $F5XC_API_TOKEN"';
  cmd += ' \\\n  -H "Content-Type: application/json"';

  if (params.body && ["POST", "PUT", "PATCH"].includes(tool.method)) {
    cmd += ` \\\n  -d '${JSON.stringify(params.body, null, 2)}'`;
  }

  return cmd;
}

/**
 * Generate documentation response for unauthenticated mode
 */
function generateDocumentationResponse(
  tool: ParsedOperation,
  params: ExecuteToolParams
): DocumentationResponse {
  const apiUrl = "https://{tenant}.console.ves.volterra.io/api";

  return {
    tool: {
      name: tool.toolName,
      summary: tool.summary,
      method: tool.method,
      path: tool.path,
      domain: tool.domain,
      resource: tool.resource,
      operation: tool.operation,
    },
    f5xcctlCommand: generateF5xcctlCommand(tool, params),
    curlExample: generateCurlCommand(tool, params, apiUrl),
    authMessage:
      "API execution disabled. Set F5XC_API_URL and F5XC_API_TOKEN to enable execution.",
  };
}

/**
 * Execute a tool by name with the given parameters
 *
 * In authenticated mode: Makes the actual API call
 * In documentation mode: Returns CLI equivalents and examples
 *
 * @param params - Execution parameters
 * @param credentialManager - Optional credential manager for auth
 * @returns Execution result or documentation
 *
 * @example
 * ```typescript
 * // Execute in authenticated mode
 * const result = await executeTool({
 *   toolName: "f5xc-api-waap-http-loadbalancer-list",
 *   pathParams: { namespace: "default" }
 * }, credentialManager);
 *
 * // Execute in documentation mode (no credentials)
 * const docs = await executeTool({
 *   toolName: "f5xc-api-waap-http-loadbalancer-create",
 *   pathParams: { "metadata.namespace": "default" },
 *   body: { metadata: { name: "my-lb" }, spec: { ... } }
 * });
 * ```
 */
export async function executeTool(
  params: ExecuteToolParams,
  credentialManager?: CredentialManager
): Promise<ExecuteToolResult | DocumentationResponse> {
  const { toolName, pathParams = {}, queryParams = {}, body } = params;

  // Validate tool exists
  if (!toolExists(toolName)) {
    return {
      success: false,
      error: `Tool "${toolName}" not found. Use search_tools to find available tools.`,
      toolInfo: {
        name: toolName,
        method: "UNKNOWN",
        path: "UNKNOWN",
        operation: "UNKNOWN",
      },
    };
  }

  // Get full tool definition
  const tool = getToolByName(toolName);
  if (!tool) {
    return {
      success: false,
      error: `Failed to load tool "${toolName}".`,
      toolInfo: {
        name: toolName,
        method: "UNKNOWN",
        path: "UNKNOWN",
        operation: "UNKNOWN",
      },
    };
  }

  const toolInfo = {
    name: tool.toolName,
    method: tool.method,
    path: tool.path,
    operation: tool.operation,
  };

  // Check authentication
  const creds = credentialManager ?? new CredentialManager();
  const authMode = creds.getAuthMode();

  if (authMode === AuthMode.NONE) {
    // Return documentation response
    return generateDocumentationResponse(tool, params);
  }

  // Authenticated mode - execute API call
  try {
    const httpClient = createHttpClient(creds);
    const path = buildPath(tool.path, pathParams);
    const queryString = buildQueryString(queryParams);
    const fullPath = `${path}${queryString}`;

    logger.debug(`Executing tool: ${toolName}`, { method: tool.method, path: fullPath });

    let response: { data: unknown; status: number };

    switch (tool.method.toUpperCase()) {
      case "GET":
        response = await httpClient.get(fullPath);
        break;
      case "POST":
        response = await httpClient.post(fullPath, body);
        break;
      case "PUT":
        response = await httpClient.put(fullPath, body);
        break;
      case "DELETE":
        response = await httpClient.delete(fullPath);
        break;
      default:
        return {
          success: false,
          error: `Unsupported HTTP method: ${tool.method}`,
          toolInfo,
        };
    }

    return {
      success: true,
      data: response.data,
      statusCode: response.status,
      toolInfo,
    };
  } catch (error) {
    logger.error(`Tool execution failed: ${toolName}`, {
      error: error instanceof Error ? error.message : String(error),
    });

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      toolInfo,
    };
  }
}

/**
 * Validate execution parameters before running
 */
export function validateExecuteParams(
  toolName: string,
  params: ExecuteToolParams
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check tool exists
  const tool = getToolByName(toolName);
  if (!tool) {
    return { valid: false, errors: [`Tool "${toolName}" not found`] };
  }

  // Check required path parameters
  for (const param of tool.pathParameters) {
    if (param.required) {
      const value =
        params.pathParams?.[param.name] ?? params.pathParams?.[param.name.replace("metadata.", "")];
      if (!value) {
        errors.push(`Missing required path parameter: ${param.name}`);
      }
    }
  }

  // Check if body is required
  if (tool.requestBodySchema && !params.body) {
    if (["POST", "PUT", "PATCH"].includes(tool.method)) {
      errors.push("Request body is required for this operation");
    }
  }

  return { valid: errors.length === 0, errors };
}
