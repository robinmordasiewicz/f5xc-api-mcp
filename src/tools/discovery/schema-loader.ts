// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Schema Loader Module
 *
 * Provides infrastructure for loading OpenAPI component schemas from spec files
 * and resolving $ref pointers to produce fully resolved schemas.
 *
 * This enables AI assistants to understand the exact structure required for
 * API payloads without guessing.
 */

import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { getToolByName } from "../registry.js";

// Get specs directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SPECS_DIR = join(__dirname, "../../../specs/domains");

/**
 * Minimum configuration from x-f5xc-minimum-configuration extension
 */
export interface MinimumConfiguration {
  description?: string;
  required_fields?: string[];
  mutually_exclusive_groups?: Array<{
    fields: string[];
    reason: string;
  }>;
  example_curl?: string;
  example_yaml?: string;
  example_json?: string;
}

/**
 * Mutually exclusive field group
 */
export interface MutuallyExclusiveGroup {
  fieldPath: string;
  options: Array<{
    fieldName: string;
    description?: string;
  }>;
  reason?: string;
}

/**
 * Resolved schema with all $refs expanded
 */
export interface ResolvedSchema {
  type?: string;
  properties?: Record<string, ResolvedSchema>;
  required?: string[];
  items?: ResolvedSchema;
  oneOf?: ResolvedSchema[];
  anyOf?: ResolvedSchema[];
  allOf?: ResolvedSchema[];
  enum?: unknown[];
  description?: string;
  example?: unknown;
  default?: unknown;
  format?: string;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  "x-f5xc-minimum-configuration"?: MinimumConfiguration;
  "x-displayname"?: string;
  "x-ves-example"?: unknown;
  [key: string]: unknown;
}

/**
 * Cached domain schema data
 */
interface DomainSchemaCache {
  schemas: Record<string, unknown>;
  loadedAt: number;
}

// Module-level cache for domain schemas
const schemaCache = new Map<string, DomainSchemaCache>();

// Maximum depth for $ref resolution to prevent infinite loops
const MAX_RESOLUTION_DEPTH = 10;

/**
 * Map tool domain names to spec file names
 * Some domains have different naming conventions
 */
function getDomainSpecFileName(domain: string): string {
  // Convert domain name to spec file name (e.g., "virtual" -> "virtual.json")
  return `${domain}.json`;
}

/**
 * Load all schemas from a domain's spec file
 *
 * @param domain - Domain name (e.g., "virtual", "dns", "waf")
 * @returns Cached domain schema data or null if not found
 */
export function loadDomainSchemas(domain: string): DomainSchemaCache | null {
  // Check cache first
  const cached = schemaCache.get(domain);
  if (cached) {
    return cached;
  }

  const specFileName = getDomainSpecFileName(domain);
  const specPath = join(SPECS_DIR, specFileName);

  if (!existsSync(specPath)) {
    // Try alternative naming (replace underscores with hyphens)
    const altPath = join(SPECS_DIR, domain.replace(/_/g, "-") + ".json");
    if (!existsSync(altPath)) {
      return null;
    }
  }

  try {
    const specContent = readFileSync(specPath, "utf-8");
    const spec = JSON.parse(specContent);

    const cacheEntry: DomainSchemaCache = {
      schemas: spec.components?.schemas || {},
      loadedAt: Date.now(),
    };

    schemaCache.set(domain, cacheEntry);
    return cacheEntry;
  } catch {
    return null;
  }
}

/**
 * Parse a $ref string to extract the schema name
 *
 * @param ref - Reference string (e.g., "#/components/schemas/http_loadbalancerCreateRequest")
 * @returns Schema name or null if invalid format
 */
export function parseSchemaRef(ref: string): string | null {
  if (!ref || typeof ref !== "string") {
    return null;
  }

  // Handle standard OpenAPI $ref format
  const match = ref.match(/^#\/components\/schemas\/(.+)$/);
  if (match && match[1]) {
    return match[1];
  }

  return null;
}

/**
 * Resolve a $ref pointer to its actual schema
 *
 * @param ref - Reference string
 * @param domain - Domain to look up schemas from
 * @returns Resolved schema or null if not found
 */
export function resolveSchemaRef(ref: string, domain: string): Record<string, unknown> | null {
  const schemaName = parseSchemaRef(ref);
  if (!schemaName) {
    return null;
  }

  const domainCache = loadDomainSchemas(domain);
  if (!domainCache) {
    return null;
  }

  const schema = domainCache.schemas[schemaName];
  if (!schema) {
    // Schema might be in a different domain - try loading from all cached domains
    for (const [, cache] of schemaCache) {
      if (cache.schemas[schemaName]) {
        return cache.schemas[schemaName] as Record<string, unknown>;
      }
    }
    return null;
  }

  return schema as Record<string, unknown>;
}

/**
 * Recursively resolve all $ref pointers in a schema
 *
 * @param schema - Schema object (may contain $refs)
 * @param domain - Primary domain for lookups
 * @param depth - Current recursion depth
 * @param visited - Set of already visited refs to detect cycles
 * @returns Fully resolved schema
 */
export function resolveNestedRefs(
  schema: unknown,
  domain: string,
  depth: number = 0,
  visited: Set<string> = new Set()
): ResolvedSchema {
  // Depth limit check
  if (depth > MAX_RESOLUTION_DEPTH) {
    return schema as ResolvedSchema;
  }

  // Handle null/undefined
  if (!schema || typeof schema !== "object") {
    return schema as ResolvedSchema;
  }

  const obj = schema as Record<string, unknown>;

  // Handle $ref
  if ("$ref" in obj && typeof obj["$ref"] === "string") {
    const ref = obj["$ref"];

    // Cycle detection
    if (visited.has(ref)) {
      return { $ref: ref, _circular: true } as ResolvedSchema;
    }

    visited.add(ref);

    const resolved = resolveSchemaRef(ref, domain);
    if (resolved) {
      // Continue resolving nested refs in the resolved schema
      return resolveNestedRefs(resolved, domain, depth + 1, new Set(visited));
    }

    // Couldn't resolve - return original ref
    return obj as ResolvedSchema;
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map((item) =>
      resolveNestedRefs(item, domain, depth + 1, visited)
    ) as unknown as ResolvedSchema;
  }

  // Handle objects - recursively resolve all properties
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (key === "properties" && typeof value === "object" && value !== null) {
      // Resolve each property schema
      const props: Record<string, unknown> = {};
      for (const [propKey, propValue] of Object.entries(value as Record<string, unknown>)) {
        props[propKey] = resolveNestedRefs(propValue, domain, depth + 1, visited);
      }
      result[key] = props;
    } else if (key === "items" && typeof value === "object") {
      // Resolve array items schema
      result[key] = resolveNestedRefs(value, domain, depth + 1, visited);
    } else if ((key === "oneOf" || key === "anyOf" || key === "allOf") && Array.isArray(value)) {
      // Resolve composition schemas
      result[key] = value.map((item) => resolveNestedRefs(item, domain, depth + 1, visited));
    } else if (key === "additionalProperties" && typeof value === "object" && value !== null) {
      // Resolve additionalProperties schema
      result[key] = resolveNestedRefs(value, domain, depth + 1, visited);
    } else {
      result[key] = value;
    }
  }

  return result as ResolvedSchema;
}

/**
 * Get fully resolved request body schema for a tool
 *
 * @param toolName - Tool name (e.g., "f5xc-api-virtual-http-loadbalancer-create")
 * @returns Fully resolved schema or null if not found
 */
export function getResolvedRequestBodySchema(toolName: string): ResolvedSchema | null {
  const tool = getToolByName(toolName);

  if (!tool || !tool.requestBodySchema) {
    return null;
  }

  const schema = tool.requestBodySchema as Record<string, unknown>;

  // If schema has a $ref, resolve it
  if ("$ref" in schema && typeof schema["$ref"] === "string") {
    const resolved = resolveSchemaRef(schema["$ref"], tool.domain);
    if (resolved) {
      return resolveNestedRefs(resolved, tool.domain);
    }
  }

  // Schema is already inline - just resolve any nested refs
  return resolveNestedRefs(schema, tool.domain);
}

/**
 * Get the x-f5xc-minimum-configuration from a tool's request body schema
 *
 * @param toolName - Tool name
 * @returns Minimum configuration or null if not found
 */
export function getMinimumConfigurationFromSchema(toolName: string): MinimumConfiguration | null {
  const tool = getToolByName(toolName);

  if (!tool || !tool.requestBodySchema) {
    return null;
  }

  const schema = tool.requestBodySchema as Record<string, unknown>;

  // If schema has a $ref, resolve it first
  if ("$ref" in schema && typeof schema["$ref"] === "string") {
    const resolved = resolveSchemaRef(schema["$ref"], tool.domain);
    if (resolved && "x-f5xc-minimum-configuration" in resolved) {
      return resolved["x-f5xc-minimum-configuration"] as MinimumConfiguration;
    }
  }

  // Check inline schema
  if ("x-f5xc-minimum-configuration" in schema) {
    return schema["x-f5xc-minimum-configuration"] as MinimumConfiguration;
  }

  return null;
}

/**
 * Extract required fields from a resolved schema
 *
 * @param schema - Resolved schema
 * @param path - Current path prefix for nested fields
 * @returns Array of required field paths
 */
export function extractRequiredFields(schema: ResolvedSchema, path: string = ""): string[] {
  const required: string[] = [];

  // Add directly required fields
  if (schema.required && Array.isArray(schema.required)) {
    for (const field of schema.required) {
      required.push(path ? `${path}.${field}` : field);
    }
  }

  // Recursively check nested properties
  if (schema.properties) {
    for (const [key, propSchema] of Object.entries(schema.properties)) {
      const propPath = path ? `${path}.${key}` : key;
      required.push(...extractRequiredFields(propSchema, propPath));
    }
  }

  return required;
}

/**
 * Extract oneOf/anyOf groups from a schema
 *
 * @param schema - Resolved schema
 * @param path - Current path prefix
 * @returns Array of mutually exclusive groups
 */
export function extractMutuallyExclusiveGroups(
  schema: ResolvedSchema,
  path: string = ""
): MutuallyExclusiveGroup[] {
  const groups: MutuallyExclusiveGroup[] = [];

  // Check for x-ves-oneof-field annotations
  for (const [key, value] of Object.entries(schema)) {
    if (key.startsWith("x-ves-oneof-field-") && typeof value === "string") {
      try {
        const options = JSON.parse(value) as string[];
        const choiceField = key.replace("x-ves-oneof-field-", "");
        groups.push({
          fieldPath: path ? `${path}.${choiceField}` : choiceField,
          options: options.map((opt) => ({ fieldName: opt })),
          reason: `Choose one of: ${options.join(", ")}`,
        });
      } catch {
        // Invalid JSON, skip
      }
    }
  }

  // Check for standard oneOf/anyOf
  if (schema.oneOf && Array.isArray(schema.oneOf)) {
    groups.push({
      fieldPath: path || "root",
      options: schema.oneOf.map((opt, idx) => ({
        fieldName: typeof opt.title === "string" ? opt.title : `option${idx + 1}`,
        description: typeof opt.description === "string" ? opt.description : undefined,
      })),
      reason: "Choose one of the following options",
    });
  }

  if (schema.anyOf && Array.isArray(schema.anyOf)) {
    groups.push({
      fieldPath: path || "root",
      options: schema.anyOf.map((opt, idx) => ({
        fieldName: typeof opt.title === "string" ? opt.title : `option${idx + 1}`,
        description: typeof opt.description === "string" ? opt.description : undefined,
      })),
      reason: "Choose one or more of the following options",
    });
  }

  // Recursively check properties
  if (schema.properties) {
    for (const [key, propSchema] of Object.entries(schema.properties)) {
      const propPath = path ? `${path}.${key}` : key;
      groups.push(...extractMutuallyExclusiveGroups(propSchema, propPath));
    }
  }

  return groups;
}

/**
 * Clear the schema cache (useful for testing)
 */
export function clearSchemaCache(): void {
  schemaCache.clear();
}

/**
 * Get cache statistics
 */
export function getSchemaCacheStats(): {
  cachedDomains: string[];
  totalSchemas: number;
} {
  const cachedDomains = Array.from(schemaCache.keys());
  let totalSchemas = 0;

  for (const cache of schemaCache.values()) {
    totalSchemas += Object.keys(cache.schemas).length;
  }

  return { cachedDomains, totalSchemas };
}
