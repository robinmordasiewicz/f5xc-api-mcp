/**
 * Tool Description Loader
 *
 * Loads full tool schemas on-demand for specific tools.
 * This implements lazy loading to avoid upfront token consumption.
 */

import type { ParsedOperation } from "../../generator/openapi-parser.js";
import { getToolByName } from "../registry.js";
import { toolExists, getToolEntry } from "./index-loader.js";

/**
 * Simplified tool description for MCP response
 * Contains the essential information needed to execute a tool
 */
export interface ToolDescription {
  /** Tool name */
  name: string;
  /** Human-readable summary */
  summary: string;
  /** Detailed description */
  description: string;
  /** HTTP method */
  method: string;
  /** API path template */
  path: string;
  /** Domain category */
  domain: string;
  /** Resource type */
  resource: string;
  /** Operation type */
  operation: string;
  /** Required parameters (path + query + body) */
  requiredParams: string[];
  /** Path parameters with descriptions */
  pathParameters: ParameterDescription[];
  /** Query parameters with descriptions */
  queryParameters: ParameterDescription[];
  /** Whether request body is required */
  hasRequestBody: boolean;
  /** Request body schema reference (if any) */
  requestBodyRef: string | null;
}

/**
 * Simplified parameter description
 */
export interface ParameterDescription {
  name: string;
  description: string;
  required: boolean;
  type: string;
}

/**
 * Extract parameter description from OpenAPI parameter
 */
function extractParameterDescription(param: {
  name: string;
  description?: string;
  required?: boolean;
  schema?: Record<string, unknown>;
}): ParameterDescription {
  return {
    name: param.name,
    description: param.description ?? "",
    required: param.required ?? false,
    type: (param.schema?.type as string) ?? "string",
  };
}

/**
 * Get full tool description by name
 *
 * @param toolName - The exact tool name
 * @returns Full tool description or null if not found
 *
 * @example
 * ```typescript
 * const desc = describeTool("f5xc-api-waap-http-loadbalancer-create");
 * if (desc) {
 *   console.log(desc.requiredParams);
 *   console.log(desc.pathParameters);
 * }
 * ```
 */
export function describeTool(toolName: string): ToolDescription | null {
  const tool = getToolByName(toolName);

  if (!tool) {
    return null;
  }

  // Extract request body schema reference
  let requestBodyRef: string | null = null;
  if (tool.requestBodySchema) {
    const ref = tool.requestBodySchema.$ref;
    if (typeof ref === "string") {
      // Extract just the schema name from the reference
      requestBodyRef = ref.replace("#/components/schemas/", "");
    }
  }

  return {
    name: tool.toolName,
    summary: tool.summary,
    description: tool.description,
    method: tool.method,
    path: tool.path,
    domain: tool.domain,
    resource: tool.resource,
    operation: tool.operation,
    requiredParams: tool.requiredParams,
    pathParameters: tool.pathParameters.map(extractParameterDescription),
    queryParameters: tool.queryParameters.map(extractParameterDescription),
    hasRequestBody: tool.requestBodySchema !== null,
    requestBodyRef,
  };
}

/**
 * Get the full ParsedOperation for a tool (includes raw schemas)
 *
 * Use this when you need the complete tool definition including
 * full request/response schemas. More expensive than describeTool.
 *
 * @param toolName - The exact tool name
 * @returns Full ParsedOperation or null if not found
 */
export function getFullToolSchema(toolName: string): ParsedOperation | null {
  return getToolByName(toolName) ?? null;
}

/**
 * Get multiple tool descriptions at once
 *
 * @param toolNames - Array of tool names
 * @returns Map of tool name to description (excludes not found tools)
 */
export function describeTools(toolNames: string[]): Map<string, ToolDescription> {
  const results = new Map<string, ToolDescription>();

  for (const name of toolNames) {
    const desc = describeTool(name);
    if (desc) {
      results.set(name, desc);
    }
  }

  return results;
}

/**
 * Get tool description with validation
 *
 * @param toolName - The tool name to describe
 * @returns Object with success status and either description or error
 */
export function describeToolSafe(toolName: string): {
  success: boolean;
  description?: ToolDescription;
  error?: string;
} {
  if (!toolExists(toolName)) {
    // Try to find similar tools
    const entry = getToolEntry(toolName);
    if (!entry) {
      return {
        success: false,
        error: `Tool "${toolName}" not found. Use search_tools to find available tools.`,
      };
    }
  }

  const description = describeTool(toolName);
  if (!description) {
    return {
      success: false,
      error: `Failed to load description for tool "${toolName}".`,
    };
  }

  return { success: true, description };
}
