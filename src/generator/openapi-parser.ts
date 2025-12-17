/**
 * OpenAPI Specification Parser
 *
 * Parses F5 Distributed Cloud OpenAPI specifications and extracts
 * operation metadata for MCP tool generation.
 */

import { readFileSync, readdirSync, existsSync } from "fs";
import { join, extname } from "path";
import YAML from "yaml";
import { z } from "zod";
import {
  transformText,
  extractDomainFromPath,
  extractResourceFromPath,
  methodToOperation,
  generateToolName,
} from "./naming/index.js";
import { normalizeTitleAcronyms } from "./naming/acronyms.js";
import { logger } from "../utils/logging.js";

/**
 * OpenAPI Schema Types
 */
const OpenApiParameterSchema = z.object({
  name: z.string(),
  in: z.enum(["path", "query", "header", "cookie"]),
  required: z.boolean().optional(),
  description: z.string().optional(),
  schema: z.record(z.unknown()).optional(),
});

const OpenApiRequestBodySchema = z.object({
  required: z.boolean().optional(),
  description: z.string().optional(),
  content: z
    .record(
      z.object({
        schema: z.record(z.unknown()).optional(),
      })
    )
    .optional(),
});

const OpenApiResponseSchema = z.object({
  description: z.string().optional(),
  content: z
    .record(
      z.object({
        schema: z.record(z.unknown()).optional(),
      })
    )
    .optional(),
});

const OpenApiOperationSchema = z.object({
  operationId: z.string().optional(),
  summary: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  parameters: z.array(OpenApiParameterSchema).optional(),
  requestBody: OpenApiRequestBodySchema.optional(),
  responses: z.record(OpenApiResponseSchema).optional(),
  security: z.array(z.record(z.array(z.string()))).optional(),
  "x-ves-proto-rpc": z.string().optional(),
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
  paths: z.record(OpenApiPathItemSchema).optional(),
  components: z
    .object({
      schemas: z.record(z.unknown()).optional(),
      securitySchemes: z.record(z.unknown()).optional(),
    })
    .optional(),
});

export type OpenApiSpec = z.infer<typeof OpenApiSpecSchema>;
export type OpenApiOperation = z.infer<typeof OpenApiOperationSchema>;
export type OpenApiParameter = z.infer<typeof OpenApiParameterSchema>;

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
 * Parse a single OpenAPI specification file
 */
export function parseSpecFile(filePath: string): ParsedSpec | null {
  try {
    const content = readFileSync(filePath, "utf-8");
    const ext = extname(filePath).toLowerCase();

    let rawSpec: unknown;
    if (ext === ".yaml" || ext === ".yml") {
      rawSpec = YAML.parse(content);
    } else if (ext === ".json") {
      rawSpec = JSON.parse(content);
    } else {
      logger.warn(`Unsupported file extension: ${ext}`, { file: filePath });
      return null;
    }

    // Validate spec structure
    const parseResult = OpenApiSpecSchema.safeParse(rawSpec);
    if (!parseResult.success) {
      logger.debug(`Invalid OpenAPI spec: ${filePath}`, {
        errors: parseResult.error.errors,
      });
      return null;
    }

    const spec = parseResult.data;
    const operations = extractOperations(spec, filePath);

    return {
      filePath,
      title: transformText(normalizeTitleAcronyms(spec.info.title)),
      version: spec.info.version,
      operations,
      schemas: (spec.components?.schemas as Record<string, unknown>) ?? {},
    };
  } catch (error) {
    logger.error(`Failed to parse spec file: ${filePath}`, {
      error: error instanceof Error ? error.message : String(error),
    });
    return null;
  }
}

/**
 * Extract operations from parsed spec
 */
function extractOperations(spec: OpenApiSpec, sourceFile: string): ParsedOperation[] {
  const operations: ParsedOperation[] = [];

  if (!spec.paths) {
    return operations;
  }

  const httpMethods = ["get", "post", "put", "delete", "patch"] as const;

  // Sort paths alphabetically for deterministic output (use < > for locale-independent sorting)
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
      const domain = extractDomainFromPath(path);
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

      // Transform text content
      const summary = transformText(
        normalizeTitleAcronyms(operation.summary ?? `${operationType} ${resource}`)
      );
      const description = transformText(operation.description ?? "");

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
      });
    }
  }

  return operations;
}

/**
 * Parse all spec files in a directory
 */
export function parseSpecDirectory(dirPath: string): ParsedSpec[] {
  const specs: ParsedSpec[] = [];

  if (!existsSync(dirPath)) {
    logger.warn(`Spec directory does not exist: ${dirPath}`);
    return specs;
  }

  function scanDir(currentDir: string): void {
    const entries = readdirSync(currentDir, { withFileTypes: true });
    // Sort entries alphabetically for deterministic output across different filesystems (locale-independent)
    entries.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

    for (const entry of entries) {
      const fullPath = join(currentDir, entry.name);

      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (
        entry.name.endsWith(".json") ||
        entry.name.endsWith(".yaml") ||
        entry.name.endsWith(".yml")
      ) {
        const spec = parseSpecFile(fullPath);
        if (spec && spec.operations.length > 0) {
          specs.push(spec);
        }
      }
    }
  }

  scanDir(dirPath);

  logger.info(`Parsed ${specs.length} spec files`, {
    totalOperations: specs.reduce((sum, s) => sum + s.operations.length, 0),
  });

  return specs;
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
