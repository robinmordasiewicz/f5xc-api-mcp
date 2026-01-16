// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * fast-check Arbitraries for Property-Based Testing
 *
 * Provides reusable generators for OpenAPI schemas, operations,
 * and F5XC API structures used in property-based tests.
 */

import * as fc from "fast-check";
import type { OpenApiParameter, ParsedOperation } from "../../src/generator/openapi-parser.js";

/**
 * Generate a valid OpenAPI parameter name (lowercase letters and underscores)
 */
export const arbParameterName = fc
  .array(fc.constantFrom(..."abcdefghijklmnopqrstuvwxyz_"), { minLength: 1, maxLength: 20 })
  .map((chars) => chars.join(""));

/**
 * Generate a valid domain name
 */
export const arbDomainName = fc.constantFrom(
  "waap",
  "dns",
  "network",
  "core",
  "cloud_connect",
  "discovery",
  "secrets",
  "sites",
  "app_firewall",
  "origin_pool"
);

/**
 * Generate a valid resource name (kebab-case)
 */
export const arbResourceName = fc
  .array(fc.constantFrom(..."abcdefghijklmnopqrstuvwxyz-"), { minLength: 3, maxLength: 30 })
  .map((chars) => chars.join(""))
  .filter((s) => !s.startsWith("-") && !s.endsWith("-") && !s.includes("--"));

/**
 * Generate a valid HTTP method
 */
export const arbHttpMethod = fc.constantFrom("GET", "POST", "PUT", "DELETE", "PATCH");

/**
 * Generate a valid operation type
 */
export const arbOperationType = fc.constantFrom("create", "list", "get", "update", "delete");

/**
 * Generate an OpenAPI parameter type
 */
export const arbParameterType = fc.constantFrom("string", "integer", "number", "boolean", "array", "object");

/**
 * Generate a valid API path
 */
export const arbApiPath = fc
  .tuple(
    fc.constantFrom("/api/config", "/api/data", "/api/introspection"),
    fc.boolean(), // has namespace
    arbResourceName,
    fc.boolean() // has name parameter
  )
  .map(([base, hasNamespace, resource, hasName]) => {
    let path = base;
    if (hasNamespace) {
      path += "/namespaces/{namespace}";
    }
    path += `/${resource.replace(/-/g, "_")}s`;
    if (hasName) {
      path += "/{name}";
    }
    return path;
  });

/**
 * Generate a valid OpenAPI parameter schema
 */
export const arbParameterSchema = fc.record({
  type: arbParameterType,
  description: fc.option(fc.lorem({ maxCount: 5 }), { nil: undefined }),
  default: fc.option(fc.oneof(fc.string(), fc.integer(), fc.boolean()), { nil: undefined }),
});

/**
 * Generate a valid OpenAPI parameter
 */
export const arbOpenApiParameter: fc.Arbitrary<OpenApiParameter> = fc.record({
  name: arbParameterName,
  in: fc.constantFrom("path", "query") as fc.Arbitrary<"path" | "query" | "header" | "cookie">,
  required: fc.boolean(),
  description: fc.option(fc.lorem({ maxCount: 5 }), { nil: undefined }),
  schema: fc.option(arbParameterSchema, { nil: undefined }),
  "x-displayname": fc.option(fc.lorem({ maxCount: 3 }), { nil: undefined }),
  "x-ves-example": fc.option(fc.string({ minLength: 1, maxLength: 50 }), { nil: undefined }),
  "x-ves-validation-rules": fc.option(
    fc.record({
      "ves.io.schema.rules.string.max_len": fc.constantFrom("64", "128", "256"),
    }),
    { nil: undefined }
  ),
  "x-ves-required": fc.option(fc.boolean(), { nil: undefined }),
});

/**
 * Generate a request body schema
 */
export const arbRequestBodySchema = fc.option(
  fc.record({
    type: fc.constant("object"),
    properties: fc.record({
      metadata: fc.constant({ type: "object" }),
      spec: fc.constant({ type: "object" }),
    }),
    required: fc.option(fc.constantFrom(["metadata"], ["metadata", "spec"]), { nil: undefined }),
  }),
  { nil: null }
);

/**
 * Generate a danger level
 */
export const arbDangerLevel = fc.option(
  fc.constantFrom("low", "medium", "high") as fc.Arbitrary<"low" | "medium" | "high">,
  { nil: null }
);

/**
 * Generate side effects
 */
export const arbSideEffects = fc.option(
  fc.record({
    creates: fc.option(fc.array(fc.string({ minLength: 1, maxLength: 20 }), { maxLength: 3 }), { nil: undefined }),
    modifies: fc.option(fc.array(fc.string({ minLength: 1, maxLength: 20 }), { maxLength: 3 }), { nil: undefined }),
    deletes: fc.option(fc.array(fc.string({ minLength: 1, maxLength: 20 }), { maxLength: 3 }), { nil: undefined }),
  }),
  { nil: null }
);

/**
 * Generate a minimal valid ParsedOperation
 */
export const arbParsedOperation: fc.Arbitrary<ParsedOperation> = fc
  .tuple(
    arbDomainName,
    arbResourceName,
    arbOperationType,
    arbHttpMethod,
    arbApiPath,
    fc.array(arbOpenApiParameter, { maxLength: 3 }),
    fc.array(arbOpenApiParameter, { maxLength: 3 }),
    arbRequestBodySchema,
    arbDangerLevel,
    arbSideEffects,
    fc.boolean()
  )
  .map(
    ([
      domain,
      resource,
      operation,
      method,
      path,
      pathParameters,
      queryParameters,
      requestBodySchema,
      dangerLevel,
      sideEffects,
      confirmationRequired,
    ]) => ({
      toolName: `f5xc-api-${domain}-${resource}-${operation}`,
      method,
      path,
      operation,
      domain,
      resource,
      summary: `${operation} ${resource}`,
      description: `${operation} ${resource} in ${domain}`,
      pathParameters: pathParameters.map((p) => ({ ...p, in: "path" as const })),
      queryParameters: queryParameters.map((p) => ({ ...p, in: "query" as const })),
      requestBodySchema,
      responseSchema: null,
      requiredParams: pathParameters.filter((p) => p.required).map((p) => p.name),
      operationId: null,
      tags: [domain],
      sourceFile: `${domain}.json`,
      displayName: null,
      dangerLevel,
      sideEffects,
      requiredFields: [],
      confirmationRequired,
      parameterExamples: {},
      validationRules: {},
      operationMetadata: null,
      curlExample: null,
      dependencies: [],
      oneOfGroups: [],
      subscriptionRequirements: [],
    })
  );

/**
 * Generate a valid tool name
 */
export const arbToolName = fc
  .tuple(arbDomainName, arbResourceName, arbOperationType)
  .map(([domain, resource, operation]) => `f5xc-api-${domain}-${resource}-${operation}`);

/**
 * Generate a valid OpenAPI spec structure
 */
export const arbOpenApiSpec = fc.record({
  openapi: fc.constant("3.0.0"),
  info: fc.record({
    title: fc.lorem({ maxCount: 5 }),
    version: fc.constantFrom("1.0.0", "2.0.0", "3.0.0"),
    description: fc.option(fc.lorem({ maxCount: 10 }), { nil: undefined }),
  }),
  paths: fc.dictionary(
    arbApiPath,
    fc.record({
      get: fc.option(
        fc.record({
          operationId: fc.option(fc.string({ minLength: 5, maxLength: 40 }), { nil: undefined }),
          summary: fc.option(fc.lorem({ maxCount: 5 }), { nil: undefined }),
          description: fc.option(fc.lorem({ maxCount: 10 }), { nil: undefined }),
          parameters: fc.option(fc.array(arbOpenApiParameter, { maxLength: 3 }), { nil: undefined }),
          responses: fc.constant({ "200": { description: "OK" } }),
        }),
        { nil: undefined }
      ),
      post: fc.option(
        fc.record({
          operationId: fc.option(fc.string({ minLength: 5, maxLength: 40 }), { nil: undefined }),
          summary: fc.option(fc.lorem({ maxCount: 5 }), { nil: undefined }),
          description: fc.option(fc.lorem({ maxCount: 10 }), { nil: undefined }),
          parameters: fc.option(fc.array(arbOpenApiParameter, { maxLength: 3 }), { nil: undefined }),
          requestBody: fc.option(
            fc.record({
              required: fc.boolean(),
              content: fc.constant({
                "application/json": {
                  schema: { type: "object" },
                },
              }),
            }),
            { nil: undefined }
          ),
          responses: fc.constant({ "201": { description: "Created" } }),
        }),
        { nil: undefined }
      ),
    }),
    { minKeys: 1, maxKeys: 5 }
  ),
});

/**
 * Generate validation rules for testing
 */
export const arbValidationRules = fc.record({
  "ves.io.schema.rules.string.max_len": fc.constantFrom("64", "128", "256", "512"),
  "ves.io.schema.rules.string.min_len": fc.constantFrom("1", "2", "3"),
  "ves.io.schema.rules.message.required": fc.constantFrom("true", "false"),
});

/**
 * Generate parameter values that match validation rules
 */
export function arbValidParameterValue(type: string): fc.Arbitrary<unknown> {
  switch (type) {
    case "string":
      return fc.string({ minLength: 1, maxLength: 100 });
    case "integer":
      return fc.integer({ min: 0, max: 1000 });
    case "number":
      return fc.float({ min: 0, max: 1000, noNaN: true });
    case "boolean":
      return fc.boolean();
    case "array":
      return fc.array(fc.string(), { maxLength: 5 });
    case "object":
      return fc.dictionary(fc.string(), fc.string(), { maxKeys: 5 });
    default:
      return fc.string();
  }
}
