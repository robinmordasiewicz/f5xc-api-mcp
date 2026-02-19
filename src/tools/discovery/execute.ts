// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Tool Execution Dispatcher
 *
 * Routes tool execution requests to the appropriate handler.
 * This provides a unified interface for executing any discovered tool.
 */

import type { ParsedOperation } from "../../generator/openapi-parser.js";
import { getToolByName } from "../registry.js";
import { toolExists } from "./index-loader.js";
import { CredentialManager, AuthMode, createHttpClient } from "@robinmordasiewicz/f5xc-auth";
import { logger } from "../../utils/logging.js";
import { quotaService } from "../../services/quota-service.js";
import type { QuotaInfo } from "../../types/quota.js";
import { formatQuotaError } from "../../services/quota-formatter.js";
import { validateRequestBody, createValidationConfigFromEnv } from "../../utils/validation.js";
import { createRateLimiterFromEnv } from "../../utils/rate-limiter.js";
import { createHttpCacheFromEnv } from "../../utils/http-cache.js";

/** Module-level rate limiter singleton, configured from environment variables */
const rateLimiter = createRateLimiterFromEnv();

/** Module-level HTTP cache singleton for GET responses */
const httpCache = createHttpCacheFromEnv();

/**
 * Tool execution parameters
 */
export interface ExecuteToolParams {
  /** The tool name to execute */
  toolName: string;
  /** Path parameters (e.g., { namespace: "default", name: "example-lb" }) */
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
  /** Quota information (if quota check was performed) */
  quotaInfo?: QuotaInfo;
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
 * Normalize tool path by removing /api prefix.
 * The baseURL already includes /api, so we strip it from tool paths
 * to avoid double /api in the final URL.
 *
 * This ensures users can enter any URL format and the path will be
 * correctly constructed:
 * - tenant.volterra.us → normalized to tenant.console.ves.volterra.io/api
 * - Tool paths like /api/config/... → stripped to /config/...
 * - Final URL: baseURL + normalizedPath = correct single /api path
 */
function normalizeToolPath(path: string): string {
  if (path.startsWith("/api/")) {
    return path.slice(4); // Remove '/api', keep the leading '/'
  }
  return path;
}

/**
 * Generate curl command example
 */
function generateCurlCommand(
  tool: ParsedOperation,
  params: ExecuteToolParams,
  apiUrl: string
): string {
  const path = buildPath(normalizeToolPath(tool.path), params.pathParams ?? {});
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
    curlExample: generateCurlCommand(tool, params, apiUrl),
    authMessage: "API execution disabled. Set F5XC_API_URL and F5XC_API_TOKEN to enable execution.",
  };
}

/**
 * Extract namespace from parameters
 *
 * @param pathParams - Path parameters
 * @param body - Request body
 * @returns Namespace string or null if not found
 */
function extractNamespace(
  pathParams?: Record<string, string>,
  body?: Record<string, unknown>
): string | null {
  // Extract namespace from path params (e.g., metadata.namespace)
  if (pathParams?.["metadata.namespace"]) {
    return pathParams["metadata.namespace"];
  }
  if (pathParams?.namespace) {
    return pathParams.namespace;
  }

  // Extract from request body metadata
  if (body?.metadata && typeof body.metadata === "object") {
    const metadata = body.metadata as Record<string, unknown>;
    if (metadata.namespace && typeof metadata.namespace === "string") {
      return metadata.namespace;
    }
  }

  return null;
}

/**
 * Execute a tool by name with the given parameters
 *
 * In authenticated mode: Makes the actual API call
 * In documentation mode: Returns API examples and documentation
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
 *   body: { metadata: { name: "example-lb" }, spec: { ... } }
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

    // Check quota for create operations
    if (tool.operation === "create") {
      const namespace = extractNamespace(pathParams, body);

      if (namespace) {
        // Check if quota checking is enabled
        const quotaCheckEnabled = process.env.F5XC_QUOTA_CHECK_ENABLED !== "false";

        if (quotaCheckEnabled) {
          const quotaCheck = await quotaService.checkQuotaAvailability(
            namespace,
            tool.resource,
            httpClient
          );

          if (!quotaCheck.allowed) {
            logger.warn(`Quota limit reached for ${tool.resource}`, {
              toolName,
              namespace,
              quotaInfo: quotaCheck.quotaInfo,
            });

            return {
              success: false,
              error: formatQuotaError(quotaCheck),
              quotaInfo: quotaCheck.quotaInfo,
              toolInfo,
            };
          }

          // Log warning if quota is in yellow zone (80-99%)
          if (quotaCheck.quotaInfo.threshold === "yellow") {
            logger.info(`Quota warning for ${tool.resource}`, {
              toolName,
              namespace,
              quotaInfo: quotaCheck.quotaInfo,
            });
          }
        }
      }
    }

    // Validate request body depth/size to prevent resource exhaustion
    if (body && Object.keys(body).length > 0) {
      const validationConfig = createValidationConfigFromEnv();
      validateRequestBody(body, validationConfig);
    }

    const path = buildPath(normalizeToolPath(tool.path), pathParams);
    const queryString = buildQueryString(queryParams);
    const fullPath = `${path}${queryString}`;

    logger.debug(`Executing tool: ${toolName}`, { method: tool.method, path: fullPath });

    // Check cache for GET requests before making HTTP call
    if (tool.method.toUpperCase() === "GET") {
      const cached = httpCache.get(fullPath);
      if (cached) {
        logger.debug(`Cache hit for: ${fullPath}`);
        return {
          success: true,
          data: cached.data,
          statusCode: cached.status,
          toolInfo,
        };
      }
    }

    // Rate-limit HTTP calls to prevent API abuse
    const response = await rateLimiter.execute(async () => {
      let res: { data: unknown; status: number };

      switch (tool.method.toUpperCase()) {
        case "GET":
          res = await httpClient.get(fullPath);
          break;
        case "POST":
          res = await httpClient.post(fullPath, body);
          break;
        case "PUT":
          res = await httpClient.put(fullPath, body);
          break;
        case "DELETE":
          res = await httpClient.delete(fullPath);
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${tool.method}`);
      }

      return res;
    });

    // Cache successful GET responses
    if (tool.method.toUpperCase() === "GET" && response.status >= 200 && response.status < 300) {
      httpCache.set(fullPath, response);
    }

    // Invalidate cache for mutating operations on the same resource path
    if (["POST", "PUT", "DELETE"].includes(tool.method.toUpperCase())) {
      httpCache.invalidate(fullPath);
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
