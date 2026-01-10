// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Schema Retrieval Module
 *
 * Provides full JSON schemas for F5XC API request bodies to eliminate
 * guessing by AI assistants when constructing API payloads.
 *
 * Enhanced with $ref resolution, minimum configuration extraction,
 * and smart example generation.
 */

import { getToolByName } from "../registry.js";
import {
  getResolvedRequestBodySchema as resolveSchema,
  getMinimumConfigurationFromSchema,
  extractRequiredFields,
  extractMutuallyExclusiveGroups,
  type ResolvedSchema,
  type MinimumConfiguration,
  type MutuallyExclusiveGroup,
} from "./schema-loader.js";

// Re-export types for convenience
export type { ResolvedSchema, MinimumConfiguration, MutuallyExclusiveGroup };

/**
 * Get the raw JSON schema for a tool's request body (may contain $refs)
 *
 * @param toolName - The exact tool name
 * @returns Raw JSON schema or null if not found
 *
 * @example
 * ```typescript
 * const schema = getRequestBodySchema("f5xc-api-virtual-http-loadbalancer-create");
 * if (schema) {
 *   console.log(JSON.stringify(schema, null, 2));
 * }
 * ```
 */
export function getRequestBodySchema(toolName: string): Record<string, unknown> | null {
  const tool = getToolByName(toolName);

  if (!tool || !tool.requestBodySchema) {
    return null;
  }

  return tool.requestBodySchema;
}

/**
 * Get fully resolved request body schema (all $refs expanded)
 *
 * This is the recommended function for AI assistants as it provides
 * the complete schema structure without any unresolved references.
 *
 * @param toolName - The exact tool name
 * @returns Fully resolved schema or null if not found
 *
 * @example
 * ```typescript
 * const schema = getResolvedRequestBodySchema("f5xc-api-virtual-http-loadbalancer-create");
 * if (schema) {
 *   // schema.properties contains all nested structures
 *   console.log(schema.properties);
 * }
 * ```
 */
export function getResolvedRequestBodySchema(toolName: string): ResolvedSchema | null {
  return resolveSchema(toolName);
}

/**
 * Get the full JSON schema for a tool's response
 *
 * @param toolName - The exact tool name
 * @returns Complete JSON schema or null if not found
 */
export function getResponseSchema(toolName: string): Record<string, unknown> | null {
  const tool = getToolByName(toolName);

  if (!tool || !tool.responseSchema) {
    return null;
  }

  return tool.responseSchema;
}

/**
 * Get both request and response schemas for a tool
 *
 * @param toolName - The exact tool name
 * @returns Object with request and response schemas
 */
export function getToolSchemas(toolName: string): {
  requestBody?: Record<string, unknown>;
  response?: Record<string, unknown>;
} {
  const tool = getToolByName(toolName);

  if (!tool) {
    return {};
  }

  return {
    requestBody: tool.requestBodySchema ?? undefined,
    response: tool.responseSchema ?? undefined,
  };
}

/**
 * Get x-f5xc-minimum-configuration from a tool's request body schema
 *
 * This contains rich examples (JSON, YAML, cURL), required fields,
 * and mutually exclusive field groups from the OpenAPI spec.
 *
 * @param toolName - The exact tool name
 * @returns Minimum configuration or null if not found
 */
export function getMinimumConfiguration(toolName: string): MinimumConfiguration | null {
  return getMinimumConfigurationFromSchema(toolName);
}

/**
 * Get all required fields for a tool's request body
 *
 * Combines required fields from:
 * 1. Schema 'required' arrays (recursively)
 * 2. x-f5xc-minimum-configuration.required_fields
 *
 * @param toolName - The exact tool name
 * @returns Array of required field paths (e.g., ["metadata.name", "spec.domains"])
 */
export function getRequiredFields(toolName: string): string[] {
  const requiredSet = new Set<string>();

  // Get from resolved schema
  const schema = resolveSchema(toolName);
  if (schema) {
    for (const field of extractRequiredFields(schema)) {
      requiredSet.add(field);
    }
  }

  // Get from minimum configuration
  const minConfig = getMinimumConfigurationFromSchema(toolName);
  if (minConfig?.required_fields) {
    for (const field of minConfig.required_fields) {
      requiredSet.add(field);
    }
  }

  return Array.from(requiredSet).sort();
}

/**
 * Get mutually exclusive field groups for a tool
 *
 * These indicate fields where only one option should be specified.
 *
 * @param toolName - The exact tool name
 * @returns Array of mutually exclusive groups
 */
export function getMutuallyExclusiveFields(toolName: string): MutuallyExclusiveGroup[] {
  const groups: MutuallyExclusiveGroup[] = [];

  // Get from resolved schema (x-ves-oneof-field-* and oneOf/anyOf)
  const schema = resolveSchema(toolName);
  if (schema) {
    groups.push(...extractMutuallyExclusiveGroups(schema));
  }

  // Get from minimum configuration
  const minConfig = getMinimumConfigurationFromSchema(toolName);
  if (minConfig?.mutually_exclusive_groups) {
    for (const group of minConfig.mutually_exclusive_groups) {
      groups.push({
        fieldPath: group.fields.join(" | "),
        options: group.fields.map((f) => ({ fieldName: f })),
        reason: group.reason,
      });
    }
  }

  return groups;
}

/**
 * Smart defaults for common field patterns
 */
const SMART_DEFAULTS: Record<string, (toolName: string, schema?: ResolvedSchema) => unknown> = {
  name: (toolName) => `my-${extractResourceFromTool(toolName)}`,
  "metadata.name": (toolName) => `my-${extractResourceFromTool(toolName)}`,
  namespace: () => "default",
  "metadata.namespace": () => "default",
  port: () => 80,
  listen_port: () => 80,
  domains: () => ["example.com"],
  hostnames: () => ["example.com"],
  timeout: () => 30,
  connect_timeout: () => 30,
  idle_timeout: () => 60,
  retries: () => 3,
  enabled: () => true,
  active: () => true,
  path: () => "/",
  url_path: () => "/",
  method: () => "GET",
  protocol: () => "HTTP",
};

/**
 * Extract resource type from tool name
 */
function extractResourceFromTool(toolName: string): string {
  // f5xc-api-virtual-http-loadbalancer-create -> http-loadbalancer
  const parts = toolName.replace("f5xc-api-", "").split("-");

  // Remove domain (first part) and operation (last part)
  if (parts.length > 2) {
    parts.shift(); // Remove domain
    parts.pop(); // Remove operation
    return parts.join("-");
  }

  return parts.join("-");
}

/**
 * Generate smart default value for a field
 */
function getSmartDefault(fieldPath: string, schema: ResolvedSchema, toolName: string): unknown {
  // Check for explicit example in schema
  if (schema.example !== undefined) {
    return schema.example;
  }

  if (schema["x-ves-example"] !== undefined) {
    return schema["x-ves-example"];
  }

  // Check smart defaults by field name
  const fieldName = fieldPath.split(".").pop() || fieldPath;
  if (SMART_DEFAULTS[fieldPath]) {
    return SMART_DEFAULTS[fieldPath](toolName, schema);
  }
  if (SMART_DEFAULTS[fieldName]) {
    return SMART_DEFAULTS[fieldName](toolName, schema);
  }

  // Handle enums
  if (schema.enum && Array.isArray(schema.enum) && schema.enum.length > 0) {
    return schema.enum[0];
  }

  // Handle default values
  if (schema.default !== undefined) {
    return schema.default;
  }

  // Type-based defaults
  switch (schema.type) {
    case "string":
      return "example-value";
    case "integer":
    case "number":
      return 1;
    case "boolean":
      return false;
    case "array":
      return [];
    case "object":
      return {};
    default:
      return null;
  }
}

/**
 * Generate example payload from resolved schema with smart defaults
 */
function generateFromResolvedSchema(
  schema: ResolvedSchema,
  toolName: string,
  path: string = ""
): unknown {
  // For objects, build example from properties
  if (schema.type === "object" && schema.properties) {
    const example: Record<string, unknown> = {};

    for (const [key, propSchema] of Object.entries(schema.properties)) {
      const propPath = path ? `${path}.${key}` : key;
      const value = generateFromResolvedSchema(propSchema, toolName, propPath);
      if (value !== null && value !== undefined) {
        example[key] = value;
      }
    }

    return Object.keys(example).length > 0 ? example : null;
  }

  // For arrays, generate one item example
  if (schema.type === "array" && schema.items) {
    const itemExample = generateFromResolvedSchema(schema.items, toolName, `${path}[]`);
    return itemExample !== null ? [itemExample] : [];
  }

  // For primitives, use smart defaults
  return getSmartDefault(path, schema, toolName);
}

/**
 * Extract example values from OpenAPI schema (legacy function)
 *
 * Recursively traverses the schema to find example values for complex objects
 */
function extractExamplesFromSchema(schema: Record<string, unknown>): unknown {
  // If schema has an example, return it
  if ("example" in schema && schema.example !== undefined) {
    return schema.example;
  }

  // If schema has examples array, return first example
  if ("examples" in schema && Array.isArray(schema.examples) && schema.examples.length > 0) {
    return schema.examples[0];
  }

  // Handle $ref - now we can resolve references!
  if ("$ref" in schema) {
    // The caller should use generateSmartExamplePayload instead
    return null;
  }

  // For object schemas, recursively build example from properties
  if (schema.type === "object" && "properties" in schema) {
    const properties = schema.properties as Record<string, Record<string, unknown>>;
    const example: Record<string, unknown> = {};

    for (const [key, propSchema] of Object.entries(properties)) {
      const propExample = extractExamplesFromSchema(propSchema);
      if (propExample !== null) {
        example[key] = propExample;
      }
    }

    return Object.keys(example).length > 0 ? example : null;
  }

  // For array schemas, create example array with one item
  if (schema.type === "array" && "items" in schema) {
    const itemSchema = schema.items as Record<string, unknown>;
    const itemExample = extractExamplesFromSchema(itemSchema);
    if (itemExample !== null) {
      return [itemExample];
    }
  }

  // For primitive types, provide reasonable defaults
  switch (schema.type) {
    case "string":
      return schema.enum && Array.isArray(schema.enum) ? schema.enum[0] : "example-value";
    case "number":
    case "integer":
      return schema.default ?? 1;
    case "boolean":
      return schema.default ?? false;
    default:
      return null;
  }
}

/**
 * Generate example payload from request body schema (legacy function)
 *
 * This helps AI assistants understand the structure of complex nested objects
 * without having to guess the format.
 *
 * @param toolName - The exact tool name
 * @returns Example payload or null if no schema found
 *
 * @deprecated Use generateSmartExamplePayload for better results with $ref resolution
 */
export function generateExamplePayload(toolName: string): unknown {
  const schema = getRequestBodySchema(toolName);

  if (!schema) {
    return null;
  }

  return extractExamplesFromSchema(schema);
}

/**
 * Generate smart example payload with $ref resolution and intelligent defaults
 *
 * This is the recommended function for generating example payloads as it:
 * 1. Resolves all $ref pointers
 * 2. Uses smart defaults based on field names
 * 3. Falls back to x-f5xc-minimum-configuration examples when available
 *
 * @param toolName - The exact tool name
 * @returns Complete example payload or null if no schema found
 */
export function generateSmartExamplePayload(toolName: string): Record<string, unknown> | null {
  // First, try to get example from minimum configuration (most reliable)
  const minConfig = getMinimumConfigurationFromSchema(toolName);
  if (minConfig?.example_json) {
    try {
      return JSON.parse(minConfig.example_json) as Record<string, unknown>;
    } catch {
      // Invalid JSON, continue to schema-based generation
    }
  }

  // Generate from resolved schema with smart defaults
  const schema = resolveSchema(toolName);
  if (!schema) {
    return null;
  }

  const example = generateFromResolvedSchema(schema, toolName);
  return example as Record<string, unknown> | null;
}

/**
 * Get comprehensive schema information for a tool
 *
 * This combines all schema-related data into a single response,
 * ideal for AI assistants that need full context.
 *
 * @param toolName - The exact tool name
 * @returns Comprehensive schema info or null if not found
 */
export function getComprehensiveSchemaInfo(toolName: string): {
  resolvedSchema: ResolvedSchema;
  requiredFields: string[];
  mutuallyExclusiveGroups: MutuallyExclusiveGroup[];
  examplePayload: Record<string, unknown> | null;
  minimumConfiguration: MinimumConfiguration | null;
  curlExample: string | null;
} | null {
  const schema = resolveSchema(toolName);
  if (!schema) {
    return null;
  }

  const minConfig = getMinimumConfigurationFromSchema(toolName);

  return {
    resolvedSchema: schema,
    requiredFields: getRequiredFields(toolName),
    mutuallyExclusiveGroups: getMutuallyExclusiveFields(toolName),
    examplePayload: generateSmartExamplePayload(toolName),
    minimumConfiguration: minConfig,
    curlExample: minConfig?.example_curl || null,
  };
}
