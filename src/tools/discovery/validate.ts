// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Parameter Validation Module (Phase B)
 *
 * Provides pre-execution validation for F5XC API tool parameters.
 * Validates path, query, and body parameters against tool schemas
 * before making API calls.
 */

import { getToolByName } from "../registry.js";
import type { ParsedOperation } from "../../generator/openapi-parser.js";
import type { OneOfGroup } from "../../generator/dependency-types.js";

/**
 * Validation error detail
 */
export interface ValidationError {
  /** Parameter path (e.g., "pathParams.namespace", "body.metadata.name") */
  path: string;
  /** Error message */
  message: string;
  /** Expected type or value */
  expected?: string;
  /** Actual value received */
  actual?: string;
}

/**
 * Validation result
 */
export interface ValidationResult {
  /** Whether validation passed */
  valid: boolean;
  /** List of validation errors */
  errors: ValidationError[];
  /** List of warnings (non-blocking issues) */
  warnings: string[];
  /** The validated tool (if found) */
  tool?: {
    name: string;
    method: string;
    path: string;
    operation: string;
  };
}

/**
 * Parameters to validate
 */
export interface ValidateParams {
  /** Tool name to validate against */
  toolName: string;
  /** Path parameters */
  pathParams?: Record<string, string>;
  /** Query parameters */
  queryParams?: Record<string, string>;
  /** Request body */
  body?: Record<string, unknown>;
}

/**
 * Validate parameters for a tool before execution
 *
 * @param params - Parameters to validate
 * @returns Validation result with errors and warnings
 */
export function validateToolParams(params: ValidateParams): ValidationResult {
  const { toolName, pathParams = {}, queryParams = {}, body } = params;
  const errors: ValidationError[] = [];
  const warnings: string[] = [];

  // Get tool definition
  const tool = getToolByName(toolName);
  if (!tool) {
    return {
      valid: false,
      errors: [
        {
          path: "toolName",
          message: `Tool "${toolName}" not found`,
          expected: "Valid tool name",
          actual: toolName,
        },
      ],
      warnings: [],
    };
  }

  // Validate path parameters
  validatePathParams(tool, pathParams, errors);

  // Validate query parameters
  validateQueryParams(tool, queryParams, errors, warnings);

  // Validate request body
  if (tool.requestBodySchema) {
    validateBody(tool, body, errors, warnings);
  } else if (body && Object.keys(body).length > 0) {
    warnings.push(`Tool ${toolName} does not accept a request body, but one was provided`);
  }

  // Check required fields from enriched metadata
  if (tool.requiredFields && tool.requiredFields.length > 0) {
    validateRequiredFields(tool.requiredFields, body, errors);
  }

  // Check oneOf constraints
  if (tool.oneOfGroups && tool.oneOfGroups.length > 0) {
    validateOneOfGroups(tool.oneOfGroups, body, warnings);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    tool: {
      name: tool.toolName,
      method: tool.method,
      path: tool.path,
      operation: tool.operation,
    },
  };
}

/**
 * Validate path parameters
 */
function validatePathParams(
  tool: ParsedOperation,
  pathParams: Record<string, string>,
  errors: ValidationError[]
): void {
  // Check for missing required path parameters
  for (const param of tool.pathParameters) {
    if (param.required && !pathParams[param.name]) {
      errors.push({
        path: `pathParams.${param.name}`,
        message: `Missing required path parameter: ${param.name}`,
        expected: param.description || "string value",
      });
    }
  }

  // Check for unknown path parameters
  const knownParams = new Set(tool.pathParameters.map((p) => p.name));
  for (const key of Object.keys(pathParams)) {
    if (!knownParams.has(key)) {
      errors.push({
        path: `pathParams.${key}`,
        message: `Unknown path parameter: ${key}`,
        expected: `One of: ${[...knownParams].join(", ")}`,
        actual: key,
      });
    }
  }
}

/**
 * Validate query parameters
 */
function validateQueryParams(
  tool: ParsedOperation,
  queryParams: Record<string, string>,
  errors: ValidationError[],
  warnings: string[]
): void {
  // Check for missing required query parameters
  for (const param of tool.queryParameters) {
    if (param.required && !queryParams[param.name]) {
      errors.push({
        path: `queryParams.${param.name}`,
        message: `Missing required query parameter: ${param.name}`,
        expected: param.description || "string value",
      });
    }
  }

  // Check for unknown query parameters (warning only)
  const knownParams = new Set(tool.queryParameters.map((p) => p.name));
  for (const key of Object.keys(queryParams)) {
    if (!knownParams.has(key)) {
      warnings.push(`Unknown query parameter: ${key}`);
    }
  }
}

/**
 * Validate request body
 */
function validateBody(
  tool: ParsedOperation,
  body: Record<string, unknown> | undefined,
  errors: ValidationError[],
  warnings: string[]
): void {
  // Check if body is required but missing
  if (tool.method === "POST" || tool.method === "PUT") {
    if (!body || Object.keys(body).length === 0) {
      // For create/update, body is usually required
      if (tool.operation === "create" || tool.operation === "update") {
        errors.push({
          path: "body",
          message: "Request body is required for this operation",
          expected: "Object with required fields",
        });
      }
    }
  }

  // Basic structure validation for F5XC resources
  if (body && tool.operation === "create") {
    // Most F5XC resources require metadata.name and metadata.namespace
    if (!body.metadata || typeof body.metadata !== "object") {
      warnings.push("Body should include a 'metadata' object for F5XC resources");
    } else {
      const metadata = body.metadata as Record<string, unknown>;
      if (!metadata.name) {
        warnings.push("metadata.name is typically required for F5XC resources");
      }
    }
  }
}

/**
 * Validate required fields from x-ves-required-fields
 */
function validateRequiredFields(
  requiredFields: string[],
  body: Record<string, unknown> | undefined,
  errors: ValidationError[]
): void {
  if (!body) {
    for (const field of requiredFields) {
      errors.push({
        path: `body.${field}`,
        message: `Missing required field: ${field}`,
        expected: "Required by F5XC API",
      });
    }
    return;
  }

  for (const field of requiredFields) {
    const value = getNestedValue(body, field);
    if (value === undefined) {
      errors.push({
        path: `body.${field}`,
        message: `Missing required field: ${field}`,
        expected: "Required by F5XC API",
      });
    }
  }
}

/**
 * Validate oneOf constraints (warning for multiple selections)
 */
function validateOneOfGroups(
  oneOfGroups: OneOfGroup[],
  body: Record<string, unknown> | undefined,
  warnings: string[]
): void {
  if (!body) return;

  for (const group of oneOfGroups) {
    const selectedOptions = group.options.filter((option) => {
      const value = getNestedValue(body, option);
      return value !== undefined;
    });

    if (selectedOptions.length > 1) {
      warnings.push(
        `Multiple mutually exclusive options selected for ${group.choiceField}: ${selectedOptions.join(", ")}. Choose only one.`
      );
    }
  }
}

/**
 * Get nested value from object using dot notation
 */
function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = obj;

  for (const part of parts) {
    if (current === null || current === undefined) {
      return undefined;
    }
    if (typeof current !== "object") {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }

  return current;
}

/**
 * Format validation result as user-friendly message
 */
export function formatValidationResult(result: ValidationResult): string {
  const lines: string[] = [];

  if (result.valid) {
    lines.push("✅ Validation passed");
    if (result.tool) {
      lines.push(`   Tool: ${result.tool.name}`);
      lines.push(`   Operation: ${result.tool.method} ${result.tool.path}`);
    }
  } else {
    lines.push("❌ Validation failed");
    lines.push("");
    lines.push("Errors:");
    for (const error of result.errors) {
      lines.push(`  • ${error.path}: ${error.message}`);
      if (error.expected) {
        lines.push(`    Expected: ${error.expected}`);
      }
      if (error.actual) {
        lines.push(`    Actual: ${error.actual}`);
      }
    }
  }

  if (result.warnings.length > 0) {
    lines.push("");
    lines.push("Warnings:");
    for (const warning of result.warnings) {
      lines.push(`  ⚠️ ${warning}`);
    }
  }

  return lines.join("\n");
}
