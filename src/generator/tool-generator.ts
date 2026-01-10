// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * MCP Tool Generator
 *
 * Generates MCP tool definitions from parsed OpenAPI operations.
 * Handles both documentation mode and execution mode tool behaviors.
 */

import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  ParsedOperation,
  OpenApiParameter,
  SideEffects,
  OperationMetadata,
} from "./openapi-parser.js";
import { CredentialManager, AuthMode, HttpClient } from "@robinmordasiewicz/f5xc-auth";
import { formatErrorForMcp } from "../utils/error-handling.js";
import { logger } from "../utils/logging.js";
import { getDomainMetadata, getResourceMetadata } from "./domain-metadata.js";

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
  prerequisites: string[];
  subscriptionTier: string;
  // Rich metadata from enriched specs v1.0.63
  displayName: string | null;
  dangerLevel: "low" | "medium" | "high" | null;
  dangerWarning: string | null;
  sideEffects: SideEffects | null;
  confirmationRequired: boolean;
  parameterExamples: Record<string, string>;
  validationRules: Record<string, Record<string, string>>;
  requiredFields: string[];
  operationMetadata: OperationMetadata | null;
  // Curl example from enriched specs v1.0.66
  curlExample: string | null;
  // Dependency intelligence from enriched specs v1.0.67
  dependencies: {
    requires: Array<{ resource: string; domain: string; required: boolean }>;
    requiredBy: Array<{ resource: string; domain: string }>;
  } | null;
  oneOfFields: Array<{ field: string; options: string[] }> | null;
  subscriptionRequirements: string[] | null;
  creationOrder: string[] | null;
  // Domain metadata from upstream specs index.json
  domainTitle: string | null;
  domainDescription: string | null;
  domainDescriptionShort: string | null;
  domainCategory: string | null;
  uiCategory: string | null;
  domainUseCases: string[] | null;
  domainComplexity: "simple" | "moderate" | "advanced" | null;
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
  // Rich metadata from enriched specs
  displayName: string | null;
  example: string | null;
  validationRules: Record<string, string> | null;
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
 * Validation result from parameter validation
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validate parameters against x-ves-validation-rules
 */
export function validateParameters(
  params: Record<string, unknown>,
  rules: Record<string, Record<string, string>>
): ValidationResult {
  const errors: string[] = [];

  for (const [paramName, paramRules] of Object.entries(rules)) {
    const value = params[paramName];

    // Check max_len for strings
    if (paramRules["ves.io.schema.rules.string.max_len"]) {
      const maxLen = parseInt(paramRules["ves.io.schema.rules.string.max_len"]);
      if (typeof value === "string" && value.length > maxLen) {
        errors.push(`${paramName} exceeds max length of ${maxLen}`);
      }
    }

    // Check min_len for strings
    if (paramRules["ves.io.schema.rules.string.min_len"]) {
      const minLen = parseInt(paramRules["ves.io.schema.rules.string.min_len"]);
      if (typeof value === "string" && value.length < minLen) {
        errors.push(`${paramName} must be at least ${minLen} characters`);
      }
    }

    // Check required
    if (paramRules["ves.io.schema.rules.message.required"] === "true") {
      if (value === undefined || value === null || value === "") {
        errors.push(`${paramName} is required`);
      }
    }

    // Check max_items for arrays
    if (paramRules["ves.io.schema.rules.repeated.max_items"]) {
      const maxItems = parseInt(paramRules["ves.io.schema.rules.repeated.max_items"]);
      if (Array.isArray(value) && value.length > maxItems) {
        errors.push(`${paramName} exceeds max items of ${maxItems}`);
      }
    }

    // Check unique for arrays
    if (paramRules["ves.io.schema.rules.repeated.unique"] === "true") {
      if (Array.isArray(value)) {
        const uniqueSet = new Set(value.map((v) => JSON.stringify(v)));
        if (uniqueSet.size !== value.length) {
          errors.push(`${paramName} must contain unique items`);
        }
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Generate danger level warning message
 */
export function getDangerWarning(level: "low" | "medium" | "high" | null): string | null {
  switch (level) {
    case "high":
      return "⚠️ HIGH RISK: This operation may cause significant changes. Confirm before proceeding.";
    case "medium":
      return "⚡ MEDIUM RISK: This operation will modify resources. Review parameters carefully.";
    case "low":
      return null;
    default:
      return null;
  }
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
 * Fallback tier map for resources not in upstream specs
 */
const FALLBACK_TIER_MAP: Record<string, string> = {
  // Core resources (no tier) - fallback only
  namespace: SUBSCRIPTION_TIERS.NO_TIER,
  certificate: SUBSCRIPTION_TIERS.NO_TIER,
  secret: SUBSCRIPTION_TIERS.NO_TIER,
};

/**
 * Get subscription tier for a resource type using upstream metadata (v1.0.84+)
 *
 * Priority:
 * 1. Upstream resource metadata tier field
 * 2. Fallback tier map for unmapped resources
 * 3. Default to NO_TIER
 */
function getSubscriptionTier(resource: string): string {
  const normalizedResource = resource.toLowerCase().replace(/-/g, "_");

  // Try upstream resource metadata first (v1.0.84+)
  const resourceMeta = getResourceMetadata(normalizedResource);
  if (resourceMeta) {
    const upstreamTier = resourceMeta.tier.toLowerCase();
    if (upstreamTier === "advanced") {
      return SUBSCRIPTION_TIERS.ADVANCED;
    }
    if (upstreamTier === "standard") {
      return SUBSCRIPTION_TIERS.STANDARD;
    }
    return SUBSCRIPTION_TIERS.NO_TIER;
  }

  // Fallback for resources not in upstream specs
  return FALLBACK_TIER_MAP[normalizedResource] ?? SUBSCRIPTION_TIERS.NO_TIER;
}

/**
 * Generate prerequisites based on resource type using upstream metadata (v1.0.84+)
 *
 * Uses rich resource metadata including:
 * - dependencies.required: Resources that MUST exist before creation
 * - dependencies.optional: Resources that are optional dependencies
 * - relationshipHints: Human-readable relationship descriptions
 */
function generatePrerequisites(operation: ParsedOperation): string[] {
  const prerequisites: string[] = [];

  // Common prerequisites
  if (operation.path.includes("{namespace}")) {
    prerequisites.push("Namespace must exist");
  }

  // Get upstream resource metadata
  const resource = operation.resource.toLowerCase().replace(/-/g, "_");
  const resourceMeta = getResourceMetadata(resource);

  if (resourceMeta) {
    // Add required dependencies from upstream specs
    for (const required of resourceMeta.dependencies.required) {
      prerequisites.push(`${formatResourceName(required)} required`);
    }

    // Add relationship hints (more descriptive than just dependency names)
    for (const hint of resourceMeta.relationshipHints) {
      prerequisites.push(hint);
    }

    // Add tier requirement if Advanced
    if (resourceMeta.tier === "Advanced") {
      prerequisites.push(`${resourceMeta.category} subscription required`);
    }
  } else {
    // Fallback for resources not in upstream specs (pattern-based)
    const resourceName = operation.resource.toLowerCase();

    if (resourceName.includes("loadbalancer") || resourceName.includes("lb")) {
      prerequisites.push("Origin pool required for backend configuration");
    }

    if (resourceName.includes("site")) {
      prerequisites.push("Cloud credentials must be configured");
    }

    if (resourceName.includes("waf") || resourceName.includes("firewall")) {
      prerequisites.push("WAAP subscription required");
    }
  }

  return prerequisites;
}

/**
 * Format resource name for human-readable display
 */
function formatResourceName(name: string): string {
  return name
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
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
      zodSchema = z.record(z.string(), z.unknown());
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
    shape["body"] = z
      .record(z.string(), z.unknown())
      .optional()
      .describe("Request body (JSON object)");
  }

  return z.object(shape);
}

/**
 * Build documentation response for a tool
 * Includes domain metadata from upstream specs for richer context
 */
function buildDocumentationResponse(operation: ParsedOperation): DocumentationResponse {
  const parameters: ParameterInfo[] = [];
  const domainMeta = getDomainMetadata(operation.domain);

  // Add path parameters with rich metadata
  for (const param of operation.pathParameters) {
    parameters.push({
      name: param.name,
      location: "path",
      type: ((param.schema as Record<string, unknown>)?.type as string) ?? "string",
      required: param.required ?? true,
      description: param.description ?? "",
      displayName: param["x-displayname"] ?? null,
      example: operation.parameterExamples[param.name] ?? null,
      validationRules: operation.validationRules[param.name] ?? null,
    });
  }

  // Add query parameters with rich metadata
  for (const param of operation.queryParameters) {
    parameters.push({
      name: param.name,
      location: "query",
      type: ((param.schema as Record<string, unknown>)?.type as string) ?? "string",
      required: param.required ?? false,
      description: param.description ?? "",
      displayName: param["x-displayname"] ?? null,
      example: operation.parameterExamples[param.name] ?? null,
      validationRules: operation.validationRules[param.name] ?? null,
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
      displayName: null,
      example: null,
      validationRules: null,
    });
  }

  // Generate danger warning if applicable
  const dangerWarning = getDangerWarning(operation.dangerLevel);

  // Use prerequisites from operation metadata if available
  const prerequisites =
    operation.operationMetadata?.conditions?.prerequisites ?? generatePrerequisites(operation);

  // Build dependency intelligence from parsed operation
  const dependencies =
    operation.dependencies.length > 0
      ? {
          requires: operation.dependencies.map((dep) => ({
            resource: dep.resourceType,
            domain: dep.domain || "unknown",
            required: dep.required,
          })),
          requiredBy: [], // Populated from dependency graph at runtime
        }
      : null;

  const oneOfFields =
    operation.oneOfGroups.length > 0
      ? operation.oneOfGroups.map((group) => ({
          field: group.choiceField,
          options: group.options,
        }))
      : null;

  const subscriptionRequirements =
    operation.subscriptionRequirements.length > 0
      ? operation.subscriptionRequirements.map(
          (sub) => `${sub.displayName} (${sub.tier})${sub.required ? " - required" : ""}`
        )
      : null;

  return {
    mode: "documentation",
    tool: operation.toolName,
    description: operation.displayName ?? operation.summary,
    httpMethod: operation.method,
    apiPath: operation.path,
    parameters,
    requestBody,
    exampleRequest: generateExampleRequest(operation),
    prerequisites,
    subscriptionTier: getSubscriptionTier(operation.resource),
    // Rich metadata from enriched specs
    displayName: operation.displayName,
    dangerLevel: operation.dangerLevel,
    dangerWarning,
    sideEffects: operation.sideEffects,
    confirmationRequired: operation.confirmationRequired,
    parameterExamples: operation.parameterExamples,
    validationRules: operation.validationRules,
    requiredFields: operation.requiredFields,
    operationMetadata: operation.operationMetadata,
    curlExample: operation.curlExample,
    // Dependency intelligence from enriched specs v1.0.67
    dependencies,
    oneOfFields,
    subscriptionRequirements,
    creationOrder: null, // Populated from dependency graph at runtime
    // Domain metadata from upstream specs index.json
    domainTitle: domainMeta?.title ?? null,
    domainDescription: domainMeta?.descriptionMedium ?? null,
    domainDescriptionShort: domainMeta?.descriptionShort ?? null,
    domainCategory: domainMeta?.domainCategory ?? null,
    uiCategory: domainMeta?.uiCategory ?? null,
    domainUseCases: domainMeta?.useCases ?? null,
    domainComplexity: domainMeta?.complexity ?? null,
  };
}

/**
 * Generate example request for documentation
 * Uses x-ves-example values from enriched specs when available
 */
function generateExampleRequest(operation: ParsedOperation): Record<string, unknown> | null {
  if (operation.operation !== "create" && operation.operation !== "update") {
    return null;
  }

  const resource = operation.resource.toLowerCase();
  const examples = operation.parameterExamples;

  // If we have parameter examples from the spec, use them
  if (Object.keys(examples).length > 0) {
    return {
      metadata: {
        name: examples["name"] ?? examples["metadata.name"] ?? `example-${resource}`,
        namespace: examples["namespace"] ?? examples["metadata.namespace"] ?? "default",
      },
      spec: {},
    };
  }

  // Fallback to resource-specific examples
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
 * Build tool description with rich metadata
 * Uses domain metadata from upstream specs for richer context
 */
function buildToolDescription(operation: ParsedOperation): string {
  const parts: string[] = [];
  const domainMeta = getDomainMetadata(operation.domain);

  // Use displayName if available, otherwise summary
  parts.push(operation.displayName ?? operation.summary);

  // Add danger warning if applicable
  const dangerWarning = getDangerWarning(operation.dangerLevel);
  if (dangerWarning) {
    parts.push("");
    parts.push(dangerWarning);
  }

  // Add confirmation required notice
  if (operation.confirmationRequired) {
    parts.push("🔒 Confirmation required before execution.");
  }

  // Add side effects info
  if (operation.sideEffects) {
    const effects: string[] = [];
    if (operation.sideEffects.creates?.length) {
      effects.push(`Creates: ${operation.sideEffects.creates.join(", ")}`);
    }
    if (operation.sideEffects.modifies?.length) {
      effects.push(`Modifies: ${operation.sideEffects.modifies.join(", ")}`);
    }
    if (operation.sideEffects.deletes?.length) {
      effects.push(`Deletes: ${operation.sideEffects.deletes.join(", ")}`);
    }
    if (effects.length) {
      parts.push("");
      parts.push(`Side Effects: ${effects.join("; ")}`);
    }
  }

  // Add domain metadata from upstream specs
  parts.push("");
  if (domainMeta) {
    parts.push(`Domain: ${domainMeta.title} (${domainMeta.domainCategory})`);
    parts.push(`Tier: ${domainMeta.requiresTier}`);
  } else {
    parts.push(`Domain: ${operation.domain}`);
  }
  parts.push(`Resource: ${operation.resource}`);
  parts.push(`HTTP: ${operation.method} ${operation.path}`);

  return parts.join("\n");
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
  const description = buildToolDescription(operation);

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
