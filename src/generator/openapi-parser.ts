// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * OpenAPI Specification Parser
 *
 * Parses F5 Distributed Cloud OpenAPI specifications and extracts
 * operation metadata for MCP tool generation.
 */

import { readFileSync, readdirSync, existsSync } from "fs";
import { join, extname, relative, basename } from "path";
import { z } from "zod";
import { extractResourceFromPath, methodToOperation, generateToolName } from "./naming/index.js";
import { logger } from "../utils/logging.js";
import type { ResourceReference, OneOfGroup, SubscriptionRequirement } from "./dependency-types.js";
import {
  extractOperationDependencies,
  mapResourceToSubscriptions,
  formatAddonDisplayName,
  extractTierFromAddon,
  resolveResourceDomain,
} from "./dependency-extractor.js";

/**
 * OpenAPI Schema Types
 */
const OpenApiParameterSchema = z.object({
  name: z.string(),
  in: z.enum(["path", "query", "header", "cookie"]),
  required: z.boolean().optional(),
  description: z.string().optional(),
  schema: z.record(z.string(), z.unknown()).optional(),
  // Rich metadata fields from enriched specs
  "x-displayname": z.string().optional(),
  "x-ves-example": z.string().optional(),
  "x-ves-validation-rules": z.record(z.string(), z.string()).optional(),
  "x-ves-required": z.boolean().optional(),
});

const OpenApiRequestBodySchema = z.object({
  required: z.boolean().optional(),
  description: z.string().optional(),
  content: z
    .record(
      z.string(),
      z.object({
        schema: z.record(z.string(), z.unknown()).optional(),
      })
    )
    .optional(),
});

const OpenApiResponseSchema = z.object({
  description: z.string().optional(),
  content: z
    .record(
      z.string(),
      z.object({
        schema: z.record(z.string(), z.unknown()).optional(),
      })
    )
    .optional(),
});

/**
 * Side effects schema for operations
 */
const SideEffectsSchema = z.object({
  creates: z.array(z.string()).optional(),
  modifies: z.array(z.string()).optional(),
  deletes: z.array(z.string()).optional(),
});

/**
 * Operation metadata schema from enriched specs
 */
const OperationMetadataSchema = z.object({
  purpose: z.string().optional(),
  required_fields: z.array(z.string()).optional(),
  optional_fields: z.array(z.string()).optional(),
  field_docs: z.record(z.string(), z.unknown()).optional(),
  conditions: z
    .object({
      prerequisites: z.array(z.string()).optional(),
      postconditions: z.array(z.string()).optional(),
    })
    .optional(),
  side_effects: SideEffectsSchema.optional(),
  danger_level: z.enum(["low", "medium", "high"]).optional(),
  confirmation_required: z.boolean().optional(),
  common_errors: z
    .array(
      z.object({
        code: z.number(),
        message: z.string(),
        solution: z.string().optional(),
      })
    )
    .optional(),
  performance_impact: z
    .object({
      latency: z.string().optional(),
      resource_usage: z.string().optional(),
    })
    .optional(),
});

const OpenApiOperationSchema = z.object({
  operationId: z.string().optional(),
  summary: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  parameters: z.array(OpenApiParameterSchema).optional(),
  requestBody: OpenApiRequestBodySchema.optional(),
  responses: z.record(z.string(), OpenApiResponseSchema).optional(),
  security: z.array(z.record(z.string(), z.array(z.string()))).optional(),
  // Existing x-* field
  "x-ves-proto-rpc": z.string().optional(),
  // Rich metadata fields from enriched specs v1.0.63
  "x-ves-danger-level": z.enum(["low", "medium", "high"]).optional(),
  "x-ves-side-effects": SideEffectsSchema.optional(),
  "x-ves-required-fields": z.array(z.string()).optional(),
  "x-ves-confirmation-required": z.boolean().optional(),
  "x-ves-operation-metadata": OperationMetadataSchema.optional(),
  // Discovery metadata from live API exploration (v2.0.5+)
  "x-discovered-response-time-ms": z.number().optional(),
  "x-discovered-sample-size": z.number().optional(),
});

const OpenApiPathItemSchema = z.object({
  get: OpenApiOperationSchema.optional(),
  post: OpenApiOperationSchema.optional(),
  put: OpenApiOperationSchema.optional(),
  delete: OpenApiOperationSchema.optional(),
  patch: OpenApiOperationSchema.optional(),
  parameters: z.array(OpenApiParameterSchema).optional(),
});

const OpenApiSpecSchema = z.object({
  openapi: z.string().optional(),
  swagger: z.string().optional(),
  info: z.object({
    title: z.string(),
    version: z.string(),
    description: z.string().optional(),
  }),
  paths: z.record(z.string(), OpenApiPathItemSchema).optional(),
  components: z
    .object({
      schemas: z.record(z.string(), z.unknown()).optional(),
      securitySchemes: z.record(z.string(), z.unknown()).optional(),
    })
    .optional(),
});

export type OpenApiSpec = z.infer<typeof OpenApiSpecSchema>;
export type OpenApiOperation = z.infer<typeof OpenApiOperationSchema>;
export type OpenApiParameter = z.infer<typeof OpenApiParameterSchema>;

/**
 * Side effects type from enriched specs
 */
export interface SideEffects {
  creates?: string[];
  modifies?: string[];
  deletes?: string[];
}

/**
 * Common error from operation metadata
 */
export interface CommonError {
  code: number;
  message: string;
  solution?: string;
}

/**
 * Performance impact from operation metadata
 */
export interface PerformanceImpact {
  latency?: string;
  resource_usage?: string;
}

/**
 * Discovery metadata from live API exploration (v2.0.5+)
 */
export interface DiscoveryMetadata {
  /** API response time in milliseconds */
  responseTimeMs?: number;
  /** Number of samples collected during discovery */
  sampleSize?: number;
}

/**
 * Operation metadata from enriched specs
 */
export interface OperationMetadata {
  purpose?: string;
  required_fields?: string[];
  optional_fields?: string[];
  field_docs?: Record<string, unknown>;
  conditions?: {
    prerequisites?: string[];
    postconditions?: string[];
  };
  side_effects?: SideEffects;
  danger_level?: "low" | "medium" | "high";
  confirmation_required?: boolean;
  common_errors?: CommonError[];
  performance_impact?: PerformanceImpact;
}

/**
 * Minimum configuration from enriched schema x-ves-minimum-configuration
 * Contains curl, YAML, and JSON examples for API usage
 */
export interface MinimumConfiguration {
  description?: string;
  required_fields?: string[];
  mutually_exclusive_groups?: string[][];
  example_curl?: string;
  example_yaml?: string;
  example_json?: string;
}

/**
 * Parsed operation with metadata for tool generation
 */
export interface ParsedOperation {
  /** Generated tool name */
  toolName: string;
  /** HTTP method */
  method: string;
  /** API path */
  path: string;
  /** Operation type (create, list, get, update, delete) */
  operation: string;
  /** Domain category (waap, dns, network, etc.) */
  domain: string;
  /** Resource type */
  resource: string;
  /** Human-readable summary */
  summary: string;
  /** Detailed description */
  description: string;
  /** Path parameters */
  pathParameters: OpenApiParameter[];
  /** Query parameters */
  queryParameters: OpenApiParameter[];
  /** Request body schema */
  requestBodySchema: Record<string, unknown> | null;
  /** Response schema */
  responseSchema: Record<string, unknown> | null;
  /** Required parameters */
  requiredParams: string[];
  /** Original operation ID */
  operationId: string | null;
  /** Tags for categorization */
  tags: string[];
  /** Source spec file */
  sourceFile: string;

  // Rich metadata from enriched specs v1.0.63
  /** Human-readable display name (x-displayname) */
  displayName: string | null;
  /** Risk level for the operation (x-ves-danger-level) */
  dangerLevel: "low" | "medium" | "high" | null;
  /** Side effects of the operation (x-ves-side-effects) */
  sideEffects: SideEffects | null;
  /** Required fields for the operation (x-ves-required-fields) */
  requiredFields: string[];
  /** Whether confirmation is required (x-ves-confirmation-required) */
  confirmationRequired: boolean;
  /** Example values for parameters from x-ves-example */
  parameterExamples: Record<string, string>;
  /** Validation rules for parameters from x-ves-validation-rules */
  validationRules: Record<string, Record<string, string>>;
  /** Full operation metadata from x-ves-operation-metadata */
  operationMetadata: OperationMetadata | null;
  /** Curl example from schema x-ves-minimum-configuration */
  curlExample: string | null;

  // Dependency intelligence fields (v1.0.67)
  /** Resource dependencies extracted from $ref patterns */
  dependencies: ResourceReference[];
  /** Mutually exclusive field groups from x-ves-oneof-field-* */
  oneOfGroups: OneOfGroup[];
  /** Subscription/addon service requirements */
  subscriptionRequirements: SubscriptionRequirement[];

  // Discovery metadata (v2.0.5+)
  /** API discovery metadata from live exploration */
  discoveryMetadata?: DiscoveryMetadata;
}

/**
 * Parsed specification file
 */
export interface ParsedSpec {
  /** File path */
  filePath: string;
  /** Spec title */
  title: string;
  /** Spec version */
  version: string;
  /** Parsed operations */
  operations: ParsedOperation[];
  /** Component schemas */
  schemas: Record<string, unknown>;
}

/**
 * Extract curl examples from component schemas
 * Returns a map of normalized API path to curl example
 */
function extractCurlExamplesFromSchemas(
  schemas: Record<string, unknown> | undefined
): Map<string, string> {
  const curlExamples = new Map<string, string>();

  if (!schemas) {
    return curlExamples;
  }

  for (const schema of Object.values(schemas)) {
    if (!schema || typeof schema !== "object") {
      continue;
    }

    const schemaObj = schema as Record<string, unknown>;
    const minConfig = schemaObj["x-ves-minimum-configuration"];

    if (!minConfig || typeof minConfig !== "object") {
      continue;
    }

    const config = minConfig as Record<string, unknown>;
    const exampleCurl = config["example_curl"];

    if (typeof exampleCurl !== "string") {
      continue;
    }

    // Extract the API path from the curl command
    // Pattern: $F5XC_API_URL/api/...  or "$F5XC_API_URL/api/..."
    const pathMatch = exampleCurl.match(/\$F5XC_API_URL(\/api\/[^\s"\\]+)/);
    if (!pathMatch || !pathMatch[1]) {
      continue;
    }

    const apiPath = pathMatch[1];

    // Normalize the path by replacing concrete namespace/name values with placeholders
    // /api/config/namespaces/default/app_firewalls -> /api/config/namespaces/{namespace}/app_firewalls
    const normalizedPath = apiPath
      .replace(/\/namespaces\/[^/]+\//, "/namespaces/{namespace}/")
      .replace(/\/system\//, "/{system_namespace}/");

    // Store if not already present (first match wins)
    if (!curlExamples.has(normalizedPath)) {
      curlExamples.set(normalizedPath, exampleCurl);
    }
  }

  return curlExamples;
}

/**
 * Match an operation path to a curl example
 * Handles path template differences like {metadata.namespace} vs {namespace}
 */
function matchCurlExample(operationPath: string, curlExamples: Map<string, string>): string | null {
  // Normalize the operation path similarly
  const normalizedOpPath = operationPath
    .replace(/\{metadata\.namespace\}/g, "{namespace}")
    .replace(/\{metadata\.name\}/g, "{name}")
    .replace(/\{[^}]+\}/g, (match) => {
      // Keep just the last part of dotted names
      const simplified = match.replace(/\{[^.]+\./g, "{");
      return simplified;
    });

  // Try exact match first
  if (curlExamples.has(normalizedOpPath)) {
    return curlExamples.get(normalizedOpPath)!;
  }

  // Try matching the base path (without trailing name/id parameter)
  // e.g., /api/config/namespaces/{namespace}/resources/{name} -> /api/config/namespaces/{namespace}/resources
  const basePathMatch = normalizedOpPath.match(/^(.+?)(?:\/\{[^}]+\})?$/);
  if (basePathMatch && basePathMatch[1]) {
    const basePath = basePathMatch[1];
    if (curlExamples.has(basePath)) {
      return curlExamples.get(basePath)!;
    }
  }

  return null;
}

/**
 * Get all unique operations across all specs
 */
export function getAllOperations(specs: ParsedSpec[]): ParsedOperation[] {
  const operationsMap = new Map<string, ParsedOperation>();

  for (const spec of specs) {
    for (const operation of spec.operations) {
      // Use tool name as unique key to deduplicate
      if (!operationsMap.has(operation.toolName)) {
        operationsMap.set(operation.toolName, operation);
      }
    }
  }

  // Sort by toolName for deterministic output (locale-independent)
  return Array.from(operationsMap.values()).sort((a, b) =>
    a.toolName < b.toolName ? -1 : a.toolName > b.toolName ? 1 : 0
  );
}

/**
 * Group operations by domain
 */
export function groupOperationsByDomain(
  operations: ParsedOperation[]
): Map<string, ParsedOperation[]> {
  const grouped = new Map<string, ParsedOperation[]>();

  for (const operation of operations) {
    const domain = operation.domain;
    if (!grouped.has(domain)) {
      grouped.set(domain, []);
    }
    grouped.get(domain)!.push(operation);
  }

  // Sort operations within each domain by toolName for deterministic output (locale-independent)
  for (const ops of grouped.values()) {
    ops.sort((a, b) => (a.toolName < b.toolName ? -1 : a.toolName > b.toolName ? 1 : 0));
  }

  // Return a new Map with sorted domain keys for deterministic iteration order
  const sortedGrouped = new Map<string, ParsedOperation[]>();
  const sortedDomains = Array.from(grouped.keys()).sort();
  for (const domain of sortedDomains) {
    sortedGrouped.set(domain, grouped.get(domain)!);
  }

  return sortedGrouped;
}

/**
 * Extract operations from an enriched domain spec (pre-normalized upstream)
 * This skips transformation since enriched specs are already normalized
 */
function extractDomainOperations(
  spec: OpenApiSpec,
  domain: string,
  sourceFile: string,
  curlExamples?: Map<string, string>
): ParsedOperation[] {
  const operations: ParsedOperation[] = [];

  if (!spec.paths) {
    return operations;
  }

  // Extract curl examples from schemas if not provided
  const curlMap =
    curlExamples ??
    extractCurlExamplesFromSchemas(spec.components?.schemas as Record<string, unknown>);

  const httpMethods = ["get", "post", "put", "delete", "patch"] as const;

  // Sort paths alphabetically for deterministic output
  const sortedPaths = Object.entries(spec.paths).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));

  for (const [path, pathItem] of sortedPaths) {
    // Check if path has a name parameter (indicates single resource operations)
    const hasNameParam = path.includes("{name}") || path.includes("{id}");

    // Get path-level parameters
    const pathLevelParams = pathItem.parameters ?? [];

    for (const method of httpMethods) {
      const operation = pathItem[method];
      if (!operation) {
        continue;
      }

      // Determine operation type and generate tool name
      const operationType = methodToOperation(method, hasNameParam);
      const resource = extractResourceFromPath(path);
      const toolName = generateToolName(domain, resource, operationType);

      // Combine path and operation parameters
      const allParams = [...pathLevelParams, ...(operation.parameters ?? [])];

      const pathParameters = allParams.filter((p) => p.in === "path");
      const queryParameters = allParams.filter((p) => p.in === "query");

      // Extract request body schema
      let requestBodySchema: Record<string, unknown> | null = null;
      if (operation.requestBody?.content) {
        const jsonContent = operation.requestBody.content["application/json"];
        if (jsonContent?.schema) {
          requestBodySchema = jsonContent.schema as Record<string, unknown>;
        }
      }

      // Extract response schema (from 200 or first success response)
      let responseSchema: Record<string, unknown> | null = null;
      if (operation.responses) {
        const successResponse = operation.responses["200"] ?? operation.responses["201"];
        if (successResponse?.content) {
          const jsonContent = successResponse.content["application/json"];
          if (jsonContent?.schema) {
            responseSchema = jsonContent.schema as Record<string, unknown>;
          }
        }
      }

      // Collect required parameters
      const requiredParams: string[] = [];
      for (const param of allParams) {
        if (param.required) {
          requiredParams.push(param.name);
        }
      }
      if (operation.requestBody?.required) {
        requiredParams.push("body");
      }

      // Use content as-is - enriched specs are already normalized
      const summary = operation.summary ?? `${operationType} ${resource}`;
      const description = operation.description ?? "";

      // Extract rich metadata from x-* fields (v1.0.63 enriched specs)
      const dangerLevel = operation["x-ves-danger-level"] ?? null;
      const sideEffects = operation["x-ves-side-effects"] ?? null;
      const requiredFields = operation["x-ves-required-fields"] ?? [];
      const confirmationRequired = operation["x-ves-confirmation-required"] ?? false;
      const operationMetadata = operation["x-ves-operation-metadata"] ?? null;

      // Extract discovery metadata from live API exploration (v2.0.5+)
      const discoveredResponseTimeMs = operation["x-discovered-response-time-ms"];
      const discoveredSampleSize = operation["x-discovered-sample-size"];
      const discoveryMetadata: DiscoveryMetadata | undefined =
        discoveredResponseTimeMs !== undefined || discoveredSampleSize !== undefined
          ? {
              responseTimeMs: discoveredResponseTimeMs,
              sampleSize: discoveredSampleSize,
            }
          : undefined;

      // Extract parameter-level metadata (examples, validation rules, displaynames)
      const parameterExamples: Record<string, string> = {};
      const validationRules: Record<string, Record<string, string>> = {};
      let displayName: string | null = null;

      for (const param of allParams) {
        // Extract parameter examples
        if (param["x-ves-example"]) {
          parameterExamples[param.name] = param["x-ves-example"];
        }
        // Extract validation rules
        if (param["x-ves-validation-rules"]) {
          validationRules[param.name] = param["x-ves-validation-rules"];
        }
      }

      // Get path-level displayname if available (from pathItem)
      const pathItemAny = pathItem as Record<string, unknown>;
      if (pathItemAny["x-displayname"] && typeof pathItemAny["x-displayname"] === "string") {
        displayName = pathItemAny["x-displayname"];
      }

      // Match curl example for this operation
      const curlExample = matchCurlExample(path, curlMap);

      // Extract dependency intelligence (v1.0.67)
      const componentSchemas = (spec.components?.schemas as Record<string, unknown>) ?? {};
      const extractedDeps = extractOperationDependencies(requestBodySchema, componentSchemas);

      // Resolve domain for each reference
      const dependencies: ResourceReference[] = extractedDeps.references.map((ref) => ({
        ...ref,
        domain: ref.domain || resolveResourceDomain(ref.resourceType),
      }));

      // Get subscription requirements based on resource and domain
      const subscriptionIds = mapResourceToSubscriptions(resource, domain);
      const subscriptionRequirements: SubscriptionRequirement[] = subscriptionIds.map((id) => ({
        addonService: id,
        displayName: formatAddonDisplayName(id),
        tier: extractTierFromAddon(id),
        required: false, // Heuristic mapping, not strictly required
      }));

      operations.push({
        toolName,
        method: method.toUpperCase(),
        path,
        operation: operationType,
        domain,
        resource,
        summary,
        description,
        pathParameters,
        queryParameters,
        requestBodySchema,
        responseSchema,
        requiredParams,
        operationId: operation.operationId ?? null,
        tags: operation.tags ?? [],
        sourceFile,
        // Rich metadata from enriched specs
        displayName,
        dangerLevel,
        sideEffects,
        requiredFields,
        confirmationRequired,
        parameterExamples,
        validationRules,
        operationMetadata,
        curlExample,
        // Dependency intelligence (v1.0.67)
        dependencies,
        oneOfGroups: extractedDeps.oneOfGroups,
        subscriptionRequirements,
        // Discovery metadata (v2.0.5+)
        discoveryMetadata,
      });
    }
  }

  return operations;
}

/**
 * Parse a single enriched domain specification file
 * Domain is derived from the filename (e.g., load_balancer.json → load_balancer)
 *
 * @param filePath - Absolute path to the domain spec file
 * @param basePath - Optional base path for creating relative sourceFile paths
 */
export function parseDomainSpecFile(filePath: string, basePath?: string): ParsedSpec | null {
  try {
    const content = readFileSync(filePath, "utf-8");
    const ext = extname(filePath).toLowerCase();

    if (ext !== ".json") {
      logger.warn(`Domain specs must be JSON: ${ext}`, { file: filePath });
      return null;
    }

    const rawSpec: unknown = JSON.parse(content);

    // Validate spec structure
    const parseResult = OpenApiSpecSchema.safeParse(rawSpec);
    if (!parseResult.success) {
      logger.debug(`Invalid OpenAPI spec: ${filePath}`, {
        errors: parseResult.error.issues,
      });
      return null;
    }

    const spec = parseResult.data;

    // Derive domain from filename (load_balancer.json → load_balancer)
    const filename = basename(filePath, ext);
    const domain = filename.replace(/-/g, "_");

    // Use relative path for sourceFile to ensure deterministic output
    const sourceFile = basePath ? relative(basePath, filePath) : filePath;

    // Extract operations using domain-specific function (no transformations)
    const operations = extractDomainOperations(spec, domain, sourceFile);

    // Title is already normalized in enriched specs
    return {
      filePath,
      title: spec.info.title,
      version: spec.info.version,
      operations,
      schemas: (spec.components?.schemas as Record<string, unknown>) ?? {},
    };
  } catch (error) {
    logger.error(`Failed to parse domain spec file: ${filePath}`, {
      error: error instanceof Error ? error.message : String(error),
    });
    return null;
  }
}

/**
 * Parse all enriched domain specs from a directory
 * This is the primary entry point for the new enriched spec format
 *
 * @param dirPath - Path to the domains directory (specs/domains/)
 */
export function parseDomainsDirectory(dirPath: string): ParsedSpec[] {
  const specs: ParsedSpec[] = [];

  if (!existsSync(dirPath)) {
    logger.warn(`Domains directory does not exist: ${dirPath}`);
    return specs;
  }

  // Use parent of dirPath as base for relative paths (makes paths like "domains/filename.json")
  const basePath = join(dirPath, "..");

  const entries = readdirSync(dirPath, { withFileTypes: true });

  // Sort entries alphabetically for deterministic output
  entries.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

  for (const entry of entries) {
    if (entry.isDirectory()) {
      continue;
    }

    if (!entry.name.endsWith(".json")) {
      continue;
    }

    const fullPath = join(dirPath, entry.name);
    const spec = parseDomainSpecFile(fullPath, basePath);

    if (spec && spec.operations.length > 0) {
      specs.push(spec);
    }
  }

  logger.info(`Parsed ${specs.length} domain spec files`, {
    totalOperations: specs.reduce((sum, s) => sum + s.operations.length, 0),
    domains: specs.map((s) => basename(s.filePath, ".json")),
  });

  return specs;
}
