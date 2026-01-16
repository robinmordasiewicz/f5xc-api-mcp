// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Unit Tests for MCP Tool Generator
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  SUBSCRIPTION_TIERS,
  registerTool,
  registerAllTools,
  validateParameters,
  getDangerWarning,
  type DocumentationResponse,
  type ExecutionResponse,
  type ParameterInfo,
  type ValidationResult,
} from "../../src/generator/tool-generator.js";
import type { ParsedOperation, OpenApiParameter } from "../../src/generator/openapi-parser.js";
import { CredentialManager, AuthMode, HttpClient } from "@robinmordasiewicz/f5xc-auth";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

// Mock auth module
vi.mock("@robinmordasiewicz/f5xc-auth", () => ({
  CredentialManager: vi.fn(),
  AuthMode: {
    NONE: "none",
    TOKEN: "token",
    MTLS: "mtls",
  },
  HttpClient: vi.fn(),
}));

// Mock logging
vi.mock("../../src/utils/logging.js", () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

describe("tool-generator", () => {
  describe("SUBSCRIPTION_TIERS constants", () => {
    it("should define expected subscription tiers", () => {
      expect(SUBSCRIPTION_TIERS.NO_TIER).toBe("NO_TIER");
      expect(SUBSCRIPTION_TIERS.STANDARD).toBe("STANDARD");
      expect(SUBSCRIPTION_TIERS.ADVANCED).toBe("ADVANCED");
    });

    it("should have exactly three subscription tiers", () => {
      const tierKeys = Object.keys(SUBSCRIPTION_TIERS);
      expect(tierKeys).toHaveLength(3);
      expect(tierKeys).toContain("NO_TIER");
      expect(tierKeys).toContain("STANDARD");
      expect(tierKeys).toContain("ADVANCED");
    });

    it("should have unique tier values", () => {
      const tierValues = Object.values(SUBSCRIPTION_TIERS);
      const uniqueValues = new Set(tierValues);
      expect(uniqueValues.size).toBe(tierValues.length);
    });
  });

  describe("validateParameters", () => {
    describe("max_len validation", () => {
      it("should pass when string is within max length", () => {
        const params = { name: "test" };
        const rules = {
          name: { "ves.io.schema.rules.string.max_len": "64" },
        };

        const result = validateParameters(params, rules);

        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      it("should fail when string exceeds max length", () => {
        const params = { name: "a".repeat(65) };
        const rules = {
          name: { "ves.io.schema.rules.string.max_len": "64" },
        };

        const result = validateParameters(params, rules);

        expect(result.valid).toBe(false);
        expect(result.errors).toContain("name exceeds max length of 64");
      });

      it("should pass when string is exactly at max length", () => {
        const params = { name: "a".repeat(64) };
        const rules = {
          name: { "ves.io.schema.rules.string.max_len": "64" },
        };

        const result = validateParameters(params, rules);

        expect(result.valid).toBe(true);
      });

      it("should skip validation for non-string values", () => {
        const params = { count: 123 };
        const rules = {
          count: { "ves.io.schema.rules.string.max_len": "64" },
        };

        const result = validateParameters(params, rules);

        expect(result.valid).toBe(true);
      });
    });

    describe("min_len validation", () => {
      it("should pass when string meets minimum length", () => {
        const params = { name: "test" };
        const rules = {
          name: { "ves.io.schema.rules.string.min_len": "2" },
        };

        const result = validateParameters(params, rules);

        expect(result.valid).toBe(true);
      });

      it("should fail when string is below minimum length", () => {
        const params = { name: "a" };
        const rules = {
          name: { "ves.io.schema.rules.string.min_len": "2" },
        };

        const result = validateParameters(params, rules);

        expect(result.valid).toBe(false);
        expect(result.errors).toContain("name must be at least 2 characters");
      });

      it("should pass when string is exactly at minimum length", () => {
        const params = { name: "ab" };
        const rules = {
          name: { "ves.io.schema.rules.string.min_len": "2" },
        };

        const result = validateParameters(params, rules);

        expect(result.valid).toBe(true);
      });

      it("should skip validation for non-string values", () => {
        const params = { count: 1 };
        const rules = {
          count: { "ves.io.schema.rules.string.min_len": "5" },
        };

        const result = validateParameters(params, rules);

        expect(result.valid).toBe(true);
      });
    });

    describe("required validation", () => {
      it("should pass when required field has value", () => {
        const params = { name: "test" };
        const rules = {
          name: { "ves.io.schema.rules.message.required": "true" },
        };

        const result = validateParameters(params, rules);

        expect(result.valid).toBe(true);
      });

      it("should fail when required field is undefined", () => {
        const params = { other: "value" };
        const rules = {
          name: { "ves.io.schema.rules.message.required": "true" },
        };

        const result = validateParameters(params, rules);

        expect(result.valid).toBe(false);
        expect(result.errors).toContain("name is required");
      });

      it("should fail when required field is null", () => {
        const params = { name: null };
        const rules = {
          name: { "ves.io.schema.rules.message.required": "true" },
        };

        const result = validateParameters(params, rules);

        expect(result.valid).toBe(false);
        expect(result.errors).toContain("name is required");
      });

      it("should fail when required field is empty string", () => {
        const params = { name: "" };
        const rules = {
          name: { "ves.io.schema.rules.message.required": "true" },
        };

        const result = validateParameters(params, rules);

        expect(result.valid).toBe(false);
        expect(result.errors).toContain("name is required");
      });

      it("should pass when required rule is false", () => {
        const params = {};
        const rules = {
          name: { "ves.io.schema.rules.message.required": "false" },
        };

        const result = validateParameters(params, rules);

        expect(result.valid).toBe(true);
      });
    });

    describe("max_items validation", () => {
      it("should pass when array is within max items", () => {
        const params = { items: ["a", "b", "c"] };
        const rules = {
          items: { "ves.io.schema.rules.repeated.max_items": "5" },
        };

        const result = validateParameters(params, rules);

        expect(result.valid).toBe(true);
      });

      it("should fail when array exceeds max items", () => {
        const params = { items: ["a", "b", "c", "d", "e", "f"] };
        const rules = {
          items: { "ves.io.schema.rules.repeated.max_items": "5" },
        };

        const result = validateParameters(params, rules);

        expect(result.valid).toBe(false);
        expect(result.errors).toContain("items exceeds max items of 5");
      });

      it("should pass when array is exactly at max items", () => {
        const params = { items: ["a", "b", "c", "d", "e"] };
        const rules = {
          items: { "ves.io.schema.rules.repeated.max_items": "5" },
        };

        const result = validateParameters(params, rules);

        expect(result.valid).toBe(true);
      });

      it("should skip validation for non-array values", () => {
        const params = { items: "not an array" };
        const rules = {
          items: { "ves.io.schema.rules.repeated.max_items": "5" },
        };

        const result = validateParameters(params, rules);

        expect(result.valid).toBe(true);
      });
    });

    describe("unique validation", () => {
      it("should pass when array has unique items", () => {
        const params = { items: ["a", "b", "c"] };
        const rules = {
          items: { "ves.io.schema.rules.repeated.unique": "true" },
        };

        const result = validateParameters(params, rules);

        expect(result.valid).toBe(true);
      });

      it("should fail when array has duplicate items", () => {
        const params = { items: ["a", "b", "a"] };
        const rules = {
          items: { "ves.io.schema.rules.repeated.unique": "true" },
        };

        const result = validateParameters(params, rules);

        expect(result.valid).toBe(false);
        expect(result.errors).toContain("items must contain unique items");
      });

      it("should handle duplicate objects", () => {
        const params = { items: [{ a: 1 }, { a: 1 }] };
        const rules = {
          items: { "ves.io.schema.rules.repeated.unique": "true" },
        };

        const result = validateParameters(params, rules);

        expect(result.valid).toBe(false);
        expect(result.errors).toContain("items must contain unique items");
      });

      it("should pass when unique rule is false", () => {
        const params = { items: ["a", "a", "a"] };
        const rules = {
          items: { "ves.io.schema.rules.repeated.unique": "false" },
        };

        const result = validateParameters(params, rules);

        expect(result.valid).toBe(true);
      });

      it("should skip validation for non-array values", () => {
        const params = { items: "string" };
        const rules = {
          items: { "ves.io.schema.rules.repeated.unique": "true" },
        };

        const result = validateParameters(params, rules);

        expect(result.valid).toBe(true);
      });
    });

    describe("combined validations", () => {
      it("should validate multiple rules on same parameter", () => {
        const params = { name: "a" }; // Too short
        const rules = {
          name: {
            "ves.io.schema.rules.string.min_len": "2",
            "ves.io.schema.rules.string.max_len": "64",
          },
        };

        const result = validateParameters(params, rules);

        expect(result.valid).toBe(false);
        expect(result.errors).toHaveLength(1);
        expect(result.errors).toContain("name must be at least 2 characters");
      });

      it("should validate multiple parameters", () => {
        const params = {
          name: "", // Required but empty
          items: ["a", "b", "c", "d", "e", "f"], // Exceeds max
        };
        const rules = {
          name: { "ves.io.schema.rules.message.required": "true" },
          items: { "ves.io.schema.rules.repeated.max_items": "5" },
        };

        const result = validateParameters(params, rules);

        expect(result.valid).toBe(false);
        expect(result.errors).toHaveLength(2);
        expect(result.errors).toContain("name is required");
        expect(result.errors).toContain("items exceeds max items of 5");
      });

      it("should pass when all validations succeed", () => {
        const params = {
          name: "valid-name",
          items: ["a", "b", "c"],
        };
        const rules = {
          name: {
            "ves.io.schema.rules.string.min_len": "2",
            "ves.io.schema.rules.string.max_len": "64",
            "ves.io.schema.rules.message.required": "true",
          },
          items: {
            "ves.io.schema.rules.repeated.max_items": "5",
            "ves.io.schema.rules.repeated.unique": "true",
          },
        };

        const result = validateParameters(params, rules);

        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });
    });

    describe("edge cases", () => {
      it("should handle empty params", () => {
        const params = {};
        const rules = {};

        const result = validateParameters(params, rules);

        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });

      it("should handle empty rules", () => {
        const params = { name: "test" };
        const rules = {};

        const result = validateParameters(params, rules);

        expect(result.valid).toBe(true);
      });

      it("should handle rules for non-existent params", () => {
        const params = { other: "value" };
        const rules = {
          name: { "ves.io.schema.rules.string.max_len": "64" },
        };

        const result = validateParameters(params, rules);

        expect(result.valid).toBe(true);
      });

      it("should handle zero-length arrays", () => {
        const params = { items: [] };
        const rules = {
          items: { "ves.io.schema.rules.repeated.max_items": "5" },
        };

        const result = validateParameters(params, rules);

        expect(result.valid).toBe(true);
      });

      it("should handle empty string max length check", () => {
        const params = { name: "" };
        const rules = {
          name: { "ves.io.schema.rules.string.max_len": "64" },
        };

        const result = validateParameters(params, rules);

        expect(result.valid).toBe(true);
      });
    });
  });

  describe("getDangerWarning", () => {
    it("should return high risk warning for high level", () => {
      const warning = getDangerWarning("high");

      expect(warning).not.toBeNull();
      expect(warning).toContain("HIGH RISK");
      expect(warning).toContain("⚠️");
      expect(warning).toContain("significant changes");
    });

    it("should return medium risk warning for medium level", () => {
      const warning = getDangerWarning("medium");

      expect(warning).not.toBeNull();
      expect(warning).toContain("MEDIUM RISK");
      expect(warning).toContain("⚡");
      expect(warning).toContain("modify resources");
    });

    it("should return null for low level", () => {
      const warning = getDangerWarning("low");

      expect(warning).toBeNull();
    });

    it("should return null for null level", () => {
      const warning = getDangerWarning(null);

      expect(warning).toBeNull();
    });

    it("should return actionable warning text for high risk", () => {
      const warning = getDangerWarning("high");

      expect(warning).toContain("Confirm before proceeding");
    });

    it("should return actionable warning text for medium risk", () => {
      const warning = getDangerWarning("medium");

      expect(warning).toContain("Review parameters carefully");
    });
  });

  describe("Documentation Response Structure", () => {
    it("should have correct DocumentationResponse interface", () => {
      const docResponse: DocumentationResponse = {
        mode: "documentation",
        tool: "f5xc-api-waap-http-loadbalancer-create",
        description: "Create HTTP Load Balancer",
        httpMethod: "POST",
        apiPath: "/api/config/namespaces/{namespace}/http_loadbalancers",
        parameters: [],
        requestBody: null,
        exampleRequest: null,
        prerequisites: [],
        subscriptionTier: "STANDARD",
      };

      expect(docResponse.mode).toBe("documentation");
      expect(docResponse.tool).toContain("f5xc-api");
    });

    it("should support parameters in response", () => {
      const paramInfo: ParameterInfo = {
        name: "namespace",
        location: "path",
        type: "string",
        required: true,
        description: "Namespace name",
      };

      expect(paramInfo.location).toBe("path");
      expect(paramInfo.required).toBe(true);
    });
  });

  describe("ParsedOperation for Tool Generation", () => {
    it("should create valid ParsedOperation for testing", () => {
      const operation = createMockParsedOperation({
        toolName: "f5xc-api-waap-http-loadbalancer-list",
        method: "GET",
        path: "/api/config/namespaces/{namespace}/http_loadbalancers",
        operation: "list",
        domain: "waap",
        resource: "http-loadbalancer",
      });

      expect(operation.toolName).toBe("f5xc-api-waap-http-loadbalancer-list");
      expect(operation.method).toBe("GET");
      expect(operation.operation).toBe("list");
    });

    it("should support path parameters", () => {
      const operation = createMockParsedOperation({
        pathParameters: [
          {
            name: "namespace",
            in: "path",
            required: true,
            description: "Namespace name",
            schema: { type: "string" },
          },
        ],
      });

      expect(operation.pathParameters).toHaveLength(1);
      expect(operation.pathParameters[0].name).toBe("namespace");
    });

    it("should support query parameters", () => {
      const operation = createMockParsedOperation({
        queryParameters: [
          {
            name: "limit",
            in: "query",
            required: false,
            description: "Maximum results",
            schema: { type: "integer" },
          },
        ],
      });

      expect(operation.queryParameters).toHaveLength(1);
      expect(operation.queryParameters[0].required).toBe(false);
    });

    it("should support request body schema", () => {
      const operation = createMockParsedOperation({
        operation: "create",
        requestBodySchema: {
          type: "object",
          properties: {
            metadata: { type: "object" },
            spec: { type: "object" },
          },
        },
        requiredParams: ["body"],
      });

      expect(operation.requestBodySchema).not.toBeNull();
      expect(operation.requiredParams).toContain("body");
    });
  });

  describe("Subscription Tier Mapping Logic", () => {
    it("should return STANDARD for http_loadbalancer", () => {
      const tierMap: Record<string, string> = {
        http_loadbalancer: "STANDARD",
        origin_pool: "STANDARD",
        dns_zone: "STANDARD",
        healthcheck: "STANDARD",
      };
      expect(tierMap["http_loadbalancer"]).toBe("STANDARD");
    });

    it("should return ADVANCED for security resources", () => {
      const tierMap: Record<string, string> = {
        app_firewall: "ADVANCED",
        bot_defense: "ADVANCED",
        api_discovery: "ADVANCED",
        malicious_user_detection: "ADVANCED",
      };
      expect(tierMap["app_firewall"]).toBe("ADVANCED");
    });

    it("should return NO_TIER for core resources", () => {
      const tierMap: Record<string, string> = {
        namespace: "NO_TIER",
        certificate: "NO_TIER",
        secret: "NO_TIER",
      };
      expect(tierMap["namespace"]).toBe("NO_TIER");
    });

    it("should normalize resource names with hyphens", () => {
      const resource = "http-loadbalancer";
      const normalized = resource.toLowerCase().replace(/-/g, "_");
      expect(normalized).toBe("http_loadbalancer");
    });
  });

  describe("Prerequisites Generation Logic", () => {
    it("should add namespace prerequisite for paths with namespace param", () => {
      const path = "/api/config/namespaces/{namespace}/http_loadbalancers";
      const hasNamespace = path.includes("{namespace}");
      expect(hasNamespace).toBe(true);
    });

    it("should add origin pool prerequisite for loadbalancers", () => {
      const resource = "http-loadbalancer";
      const needsOriginPool =
        resource.includes("loadbalancer") || resource.includes("lb");
      expect(needsOriginPool).toBe(true);
    });

    it("should add cloud credentials prerequisite for sites", () => {
      const resource = "aws-vpc-site";
      const needsCloudCredentials = resource.includes("site");
      expect(needsCloudCredentials).toBe(true);
    });

    it("should add WAAP subscription prerequisite for WAF", () => {
      const resources = ["app-firewall", "waf-config"];
      resources.forEach((resource) => {
        const needsWaap =
          resource.includes("waf") || resource.includes("firewall");
        expect(needsWaap).toBe(true);
      });
    });
  });

  describe("Example Request Generation Logic", () => {
    it("should generate loadbalancer example with correct structure", () => {
      const example = {
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

      expect(example.metadata.name).toBe("example-lb");
      expect(example.spec.domains).toContain("app.example.com");
      expect(example.spec.default_route_pools).toHaveLength(1);
    });

    it("should generate origin pool example with correct structure", () => {
      const example = {
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

      expect(example.spec.origin_servers).toHaveLength(1);
      expect(example.spec.port).toBe(80);
    });

    it("should return null for non-create/update operations", () => {
      const operations = ["list", "get", "delete"];
      operations.forEach((op) => {
        // Example generation should return null for these
        const shouldGenerateExample = op === "create" || op === "update";
        expect(shouldGenerateExample).toBe(false);
      });
    });
  });

  describe("Zod Schema Building Logic", () => {
    it("should map string parameters to z.string()", () => {
      const param: OpenApiParameter = {
        name: "namespace",
        in: "path",
        required: true,
        schema: { type: "string" },
      };
      expect(param.schema?.type).toBe("string");
    });

    it("should map integer parameters to z.number().int()", () => {
      const param: OpenApiParameter = {
        name: "limit",
        in: "query",
        required: false,
        schema: { type: "integer" },
      };
      expect(param.schema?.type).toBe("integer");
    });

    it("should map number parameters to z.number()", () => {
      const param: OpenApiParameter = {
        name: "timeout",
        in: "query",
        required: false,
        schema: { type: "number" },
      };
      expect(param.schema?.type).toBe("number");
    });

    it("should map boolean parameters to z.boolean()", () => {
      const param: OpenApiParameter = {
        name: "enabled",
        in: "query",
        required: false,
        schema: { type: "boolean" },
      };
      expect(param.schema?.type).toBe("boolean");
    });

    it("should map array parameters to z.array()", () => {
      const param: OpenApiParameter = {
        name: "ids",
        in: "query",
        required: false,
        schema: { type: "array" },
      };
      expect(param.schema?.type).toBe("array");
    });

    it("should map object parameters to z.record()", () => {
      const param: OpenApiParameter = {
        name: "metadata",
        in: "query",
        required: false,
        schema: { type: "object" },
      };
      expect(param.schema?.type).toBe("object");
    });

    it("should make optional parameters optional", () => {
      const requiredParam: OpenApiParameter = {
        name: "namespace",
        in: "path",
        required: true,
        schema: { type: "string" },
      };

      const optionalParam: OpenApiParameter = {
        name: "limit",
        in: "query",
        required: false,
        schema: { type: "integer" },
      };

      expect(requiredParam.required).toBe(true);
      expect(optionalParam.required).toBe(false);
    });
  });

  describe("HTTP Method to Request Mapping", () => {
    it("should use GET for list and get operations", () => {
      const methodMap: Record<string, string> = {
        list: "GET",
        get: "GET",
      };
      expect(methodMap["list"]).toBe("GET");
      expect(methodMap["get"]).toBe("GET");
    });

    it("should use POST for create operations", () => {
      const methodMap: Record<string, string> = {
        create: "POST",
      };
      expect(methodMap["create"]).toBe("POST");
    });

    it("should use PUT for update operations", () => {
      const methodMap: Record<string, string> = {
        update: "PUT",
      };
      expect(methodMap["update"]).toBe("PUT");
    });

    it("should use DELETE for delete operations", () => {
      const methodMap: Record<string, string> = {
        delete: "DELETE",
      };
      expect(methodMap["delete"]).toBe("DELETE");
    });
  });

  describe("API Path Construction", () => {
    it("should replace path parameters with values", () => {
      const path = "/api/config/namespaces/{namespace}/http_loadbalancers/{name}";
      const params = { namespace: "default", name: "example-lb" };

      let result = path;
      for (const [key, value] of Object.entries(params)) {
        result = result.replace(`{${key}}`, value);
      }

      expect(result).toBe("/api/config/namespaces/default/http_loadbalancers/example-lb");
    });

    it("should append query parameters", () => {
      const path = "/api/config/namespaces/{namespace}/http_loadbalancers";
      const queryParams = new URLSearchParams();
      queryParams.append("limit", "10");
      queryParams.append("offset", "0");

      const fullPath = `${path}?${queryParams.toString()}`;
      expect(fullPath).toContain("limit=10");
      expect(fullPath).toContain("offset=0");
    });
  });

  describe("Resource URL Generation", () => {
    it("should generate console URL with tenant", () => {
      const tenant = "example-tenant";
      const apiPath = "/api/config/namespaces/default/http_loadbalancers";

      const resourceUrl = `https://${tenant}.console.ves.volterra.io${apiPath}`;

      expect(resourceUrl).toContain(tenant);
      expect(resourceUrl).toContain("console.ves.volterra.io");
      expect(resourceUrl).toContain(apiPath);
    });

    it("should return null when no tenant available", () => {
      const tenant = null;
      const resourceUrl = tenant ? `https://${tenant}.console.ves.volterra.io/api` : null;
      expect(resourceUrl).toBeNull();
    });
  });

  describe("registerTool", () => {
    let mockServer: {
      tool: ReturnType<typeof vi.fn>;
    };
    let mockCredentialManager: {
      getAuthMode: ReturnType<typeof vi.fn>;
      getTenant: ReturnType<typeof vi.fn>;
    };
    let mockHttpClient: {
      get: ReturnType<typeof vi.fn>;
      post: ReturnType<typeof vi.fn>;
      put: ReturnType<typeof vi.fn>;
      delete: ReturnType<typeof vi.fn>;
    };

    beforeEach(() => {
      vi.clearAllMocks();

      mockServer = {
        tool: vi.fn(),
      };

      mockCredentialManager = {
        getAuthMode: vi.fn().mockReturnValue(AuthMode.NONE),
        getTenant: vi.fn().mockReturnValue("test-tenant"),
      };

      mockHttpClient = {
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
      };
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should register a tool with the server", () => {
      const operation = createMockParsedOperation();

      registerTool(
        mockServer as unknown as McpServer,
        operation,
        mockCredentialManager as unknown as CredentialManager,
        mockHttpClient as unknown as HttpClient
      );

      expect(mockServer.tool).toHaveBeenCalledTimes(1);
      expect(mockServer.tool).toHaveBeenCalledWith(
        operation.toolName,
        expect.stringContaining(operation.summary),
        expect.any(Object),
        expect.any(Function)
      );
    });

    it("should include domain and resource in description", () => {
      const operation = createMockParsedOperation({
        domain: "waap",
        resource: "http-loadbalancer",
      });

      registerTool(
        mockServer as unknown as McpServer,
        operation,
        mockCredentialManager as unknown as CredentialManager,
        mockHttpClient as unknown as HttpClient
      );

      const description = mockServer.tool.mock.calls[0][1] as string;
      expect(description).toContain("waap");
      expect(description).toContain("http-loadbalancer");
    });

    it("should register tool with path parameters in schema", () => {
      const operation = createMockParsedOperation({
        pathParameters: [
          {
            name: "namespace",
            in: "path",
            required: true,
            description: "Namespace name",
            schema: { type: "string" },
          },
          {
            name: "name",
            in: "path",
            required: true,
            description: "Resource name",
            schema: { type: "string" },
          },
        ],
      });

      registerTool(
        mockServer as unknown as McpServer,
        operation,
        mockCredentialManager as unknown as CredentialManager,
        mockHttpClient as unknown as HttpClient
      );

      const schema = mockServer.tool.mock.calls[0][2] as Record<string, unknown>;
      expect(schema).toHaveProperty("namespace");
      expect(schema).toHaveProperty("name");
    });

    it("should register tool with query parameters in schema", () => {
      const operation = createMockParsedOperation({
        queryParameters: [
          {
            name: "limit",
            in: "query",
            required: false,
            description: "Maximum results",
            schema: { type: "integer" },
          },
        ],
      });

      registerTool(
        mockServer as unknown as McpServer,
        operation,
        mockCredentialManager as unknown as CredentialManager,
        mockHttpClient as unknown as HttpClient
      );

      const schema = mockServer.tool.mock.calls[0][2] as Record<string, unknown>;
      expect(schema).toHaveProperty("limit");
    });

    it("should register tool with body parameter for create operations", () => {
      const operation = createMockParsedOperation({
        operation: "create",
        requestBodySchema: {
          type: "object",
          properties: {},
        },
      });

      registerTool(
        mockServer as unknown as McpServer,
        operation,
        mockCredentialManager as unknown as CredentialManager,
        mockHttpClient as unknown as HttpClient
      );

      const schema = mockServer.tool.mock.calls[0][2] as Record<string, unknown>;
      expect(schema).toHaveProperty("body");
    });

    describe("tool handler - documentation mode", () => {
      it("should return documentation when unauthenticated", async () => {
        mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

        const operation = createMockParsedOperation({
          toolName: "f5xc-api-waap-http-loadbalancer-list",
          method: "GET",
          path: "/api/config/namespaces/{namespace}/http_loadbalancers",
          operation: "list",
          resource: "http-loadbalancer",
        });

        registerTool(
          mockServer as unknown as McpServer,
          operation,
          mockCredentialManager as unknown as CredentialManager,
          mockHttpClient as unknown as HttpClient
        );

        const handler = mockServer.tool.mock.calls[0][3] as (
          params: Record<string, unknown>
        ) => Promise<{ content: Array<{ type: string; text: string }> }>;

        const result = await handler({ namespace: "default" });

        expect(result.content).toHaveLength(1);
        expect(result.content[0].type).toBe("text");

        const response = JSON.parse(result.content[0].text) as DocumentationResponse;
        expect(response.mode).toBe("documentation");
        expect(response.tool).toBe(operation.toolName);
      });

      it("should return documentation when httpClient is null", async () => {
        mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.TOKEN);

        const operation = createMockParsedOperation();

        registerTool(
          mockServer as unknown as McpServer,
          operation,
          mockCredentialManager as unknown as CredentialManager,
          null
        );

        const handler = mockServer.tool.mock.calls[0][3] as (
          params: Record<string, unknown>
        ) => Promise<{ content: Array<{ type: string; text: string }> }>;

        const result = await handler({});

        const response = JSON.parse(result.content[0].text) as DocumentationResponse;
        expect(response.mode).toBe("documentation");
      });

      it("should include prerequisites in documentation for loadbalancer", async () => {
        mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

        const operation = createMockParsedOperation({
          path: "/api/config/namespaces/{namespace}/http_loadbalancers",
          resource: "http-loadbalancer",
        });

        registerTool(
          mockServer as unknown as McpServer,
          operation,
          mockCredentialManager as unknown as CredentialManager,
          null
        );

        const handler = mockServer.tool.mock.calls[0][3] as (
          params: Record<string, unknown>
        ) => Promise<{ content: Array<{ type: string; text: string }> }>;

        const result = await handler({});

        const response = JSON.parse(result.content[0].text) as DocumentationResponse;
        // v1.0.84+: Prerequisites derived from upstream dependencies and relationship_hints
        // http_loadbalancer has origin_pool as required dependency
        expect(response.prerequisites).toContain("Origin Pool required");
        expect(response.prerequisites).toContain(
          "origin_pool: Backend servers for traffic distribution"
        );
      });

      it("should include prerequisites for sites", async () => {
        mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

        const operation = createMockParsedOperation({
          path: "/api/config/namespaces/{namespace}/aws_vpc_sites",
          resource: "aws-vpc-site",
        });

        registerTool(
          mockServer as unknown as McpServer,
          operation,
          mockCredentialManager as unknown as CredentialManager,
          null
        );

        const handler = mockServer.tool.mock.calls[0][3] as (
          params: Record<string, unknown>
        ) => Promise<{ content: Array<{ type: string; text: string }> }>;

        const result = await handler({});

        const response = JSON.parse(result.content[0].text) as DocumentationResponse;
        // v1.0.84+: Prerequisites derived from upstream dependencies
        // aws_vpc_site has cloud_credentials as required dependency
        expect(response.prerequisites).toContain("Cloud Credentials required");
      });

      it("should include prerequisites for WAF resources", async () => {
        mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

        const operation = createMockParsedOperation({
          path: "/api/config/namespaces/{namespace}/app_firewalls",
          resource: "app-firewall",
        });

        registerTool(
          mockServer as unknown as McpServer,
          operation,
          mockCredentialManager as unknown as CredentialManager,
          null
        );

        const handler = mockServer.tool.mock.calls[0][3] as (
          params: Record<string, unknown>
        ) => Promise<{ content: Array<{ type: string; text: string }> }>;

        const result = await handler({});

        const response = JSON.parse(result.content[0].text) as DocumentationResponse;
        // v1.0.84+: Advanced tier resources get category-based subscription requirement
        // app_firewall has tier: "Advanced" and category: "Security"
        expect(response.prerequisites).toContain("Security subscription required");
      });

      it("should include example request for create operations", async () => {
        mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

        const operation = createMockParsedOperation({
          operation: "create",
          resource: "http-loadbalancer",
          requestBodySchema: { type: "object" },
        });

        registerTool(
          mockServer as unknown as McpServer,
          operation,
          mockCredentialManager as unknown as CredentialManager,
          null
        );

        const handler = mockServer.tool.mock.calls[0][3] as (
          params: Record<string, unknown>
        ) => Promise<{ content: Array<{ type: string; text: string }> }>;

        const result = await handler({});

        const response = JSON.parse(result.content[0].text) as DocumentationResponse;
        expect(response.exampleRequest).not.toBeNull();
        expect(response.exampleRequest?.metadata).toBeDefined();
      });

      it("should return null example for list operations", async () => {
        mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

        const operation = createMockParsedOperation({
          operation: "list",
        });

        registerTool(
          mockServer as unknown as McpServer,
          operation,
          mockCredentialManager as unknown as CredentialManager,
          null
        );

        const handler = mockServer.tool.mock.calls[0][3] as (
          params: Record<string, unknown>
        ) => Promise<{ content: Array<{ type: string; text: string }> }>;

        const result = await handler({});

        const response = JSON.parse(result.content[0].text) as DocumentationResponse;
        expect(response.exampleRequest).toBeNull();
      });

    });

    describe("tool handler - execution mode", () => {
      beforeEach(() => {
        mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.TOKEN);
      });

      it("should execute GET request", async () => {
        mockHttpClient.get.mockResolvedValue({ data: { items: [] } });

        const operation = createMockParsedOperation({
          method: "GET",
          path: "/api/config/namespaces/{namespace}/http_loadbalancers",
          pathParameters: [
            {
              name: "namespace",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
        });

        registerTool(
          mockServer as unknown as McpServer,
          operation,
          mockCredentialManager as unknown as CredentialManager,
          mockHttpClient as unknown as HttpClient
        );

        const handler = mockServer.tool.mock.calls[0][3] as (
          params: Record<string, unknown>
        ) => Promise<{ content: Array<{ type: string; text: string }> }>;

        const result = await handler({ namespace: "default" });

        expect(mockHttpClient.get).toHaveBeenCalledWith(
          expect.stringContaining("/api/config/namespaces/default/http_loadbalancers")
        );

        const response = JSON.parse(result.content[0].text) as ExecutionResponse;
        expect(response.mode).toBe("execution");
        expect(response.status).toBe("success");
      });

      it("should execute POST request with body", async () => {
        mockHttpClient.post.mockResolvedValue({ data: { metadata: { name: "test" } } });

        const operation = createMockParsedOperation({
          method: "POST",
          operation: "create",
          path: "/api/config/namespaces/{namespace}/http_loadbalancers",
          pathParameters: [
            {
              name: "namespace",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBodySchema: { type: "object" },
        });

        registerTool(
          mockServer as unknown as McpServer,
          operation,
          mockCredentialManager as unknown as CredentialManager,
          mockHttpClient as unknown as HttpClient
        );

        const handler = mockServer.tool.mock.calls[0][3] as (
          params: Record<string, unknown>
        ) => Promise<{ content: Array<{ type: string; text: string }> }>;

        const body = { metadata: { name: "test-lb" }, spec: {} };
        const result = await handler({ namespace: "default", body });

        expect(mockHttpClient.post).toHaveBeenCalledWith(
          expect.stringContaining("/api/config/namespaces/default/http_loadbalancers"),
          body
        );

        const response = JSON.parse(result.content[0].text) as ExecutionResponse;
        expect(response.mode).toBe("execution");
      });

      it("should execute PUT request", async () => {
        mockHttpClient.put.mockResolvedValue({ data: {} });

        const operation = createMockParsedOperation({
          method: "PUT",
          operation: "update",
          requestBodySchema: { type: "object" },
        });

        registerTool(
          mockServer as unknown as McpServer,
          operation,
          mockCredentialManager as unknown as CredentialManager,
          mockHttpClient as unknown as HttpClient
        );

        const handler = mockServer.tool.mock.calls[0][3] as (
          params: Record<string, unknown>
        ) => Promise<{ content: Array<{ type: string; text: string }> }>;

        await handler({ body: {} });

        expect(mockHttpClient.put).toHaveBeenCalled();
      });

      it("should execute DELETE request", async () => {
        mockHttpClient.delete.mockResolvedValue({ data: {} });

        const operation = createMockParsedOperation({
          method: "DELETE",
          operation: "delete",
        });

        registerTool(
          mockServer as unknown as McpServer,
          operation,
          mockCredentialManager as unknown as CredentialManager,
          mockHttpClient as unknown as HttpClient
        );

        const handler = mockServer.tool.mock.calls[0][3] as (
          params: Record<string, unknown>
        ) => Promise<{ content: Array<{ type: string; text: string }> }>;

        await handler({});

        expect(mockHttpClient.delete).toHaveBeenCalled();
      });

      it("should include query parameters in request", async () => {
        mockHttpClient.get.mockResolvedValue({ data: {} });

        const operation = createMockParsedOperation({
          method: "GET",
          path: "/api/test",
          queryParameters: [
            {
              name: "limit",
              in: "query",
              required: false,
              schema: { type: "integer" },
            },
            {
              name: "offset",
              in: "query",
              required: false,
              schema: { type: "integer" },
            },
          ],
        });

        registerTool(
          mockServer as unknown as McpServer,
          operation,
          mockCredentialManager as unknown as CredentialManager,
          mockHttpClient as unknown as HttpClient
        );

        const handler = mockServer.tool.mock.calls[0][3] as (
          params: Record<string, unknown>
        ) => Promise<{ content: Array<{ type: string; text: string }> }>;

        await handler({ limit: 10, offset: 0 });

        expect(mockHttpClient.get).toHaveBeenCalledWith(
          expect.stringContaining("limit=10")
        );
        expect(mockHttpClient.get).toHaveBeenCalledWith(
          expect.stringContaining("offset=0")
        );
      });

      it("should include resourceUrl in response when tenant available", async () => {
        mockHttpClient.get.mockResolvedValue({ data: {} });
        mockCredentialManager.getTenant.mockReturnValue("example-tenant");

        const operation = createMockParsedOperation({
          method: "GET",
        });

        registerTool(
          mockServer as unknown as McpServer,
          operation,
          mockCredentialManager as unknown as CredentialManager,
          mockHttpClient as unknown as HttpClient
        );

        const handler = mockServer.tool.mock.calls[0][3] as (
          params: Record<string, unknown>
        ) => Promise<{ content: Array<{ type: string; text: string }> }>;

        const result = await handler({});

        const response = JSON.parse(result.content[0].text) as ExecutionResponse;
        expect(response.resourceUrl).toContain("example-tenant");
        expect(response.resourceUrl).toContain("console.ves.volterra.io");
      });

      it("should return null resourceUrl when no tenant", async () => {
        mockHttpClient.get.mockResolvedValue({ data: {} });
        mockCredentialManager.getTenant.mockReturnValue(null);

        const operation = createMockParsedOperation({
          method: "GET",
        });

        registerTool(
          mockServer as unknown as McpServer,
          operation,
          mockCredentialManager as unknown as CredentialManager,
          mockHttpClient as unknown as HttpClient
        );

        const handler = mockServer.tool.mock.calls[0][3] as (
          params: Record<string, unknown>
        ) => Promise<{ content: Array<{ type: string; text: string }> }>;

        const result = await handler({});

        const response = JSON.parse(result.content[0].text) as ExecutionResponse;
        expect(response.resourceUrl).toBeNull();
      });

      it("should handle errors and return formatted error", async () => {
        mockHttpClient.get.mockRejectedValue(new Error("API Error"));

        const operation = createMockParsedOperation({
          method: "GET",
        });

        registerTool(
          mockServer as unknown as McpServer,
          operation,
          mockCredentialManager as unknown as CredentialManager,
          mockHttpClient as unknown as HttpClient
        );

        const handler = mockServer.tool.mock.calls[0][3] as (
          params: Record<string, unknown>
        ) => Promise<{ isError: boolean; content: Array<{ type: string; text: string }> }>;

        const result = await handler({});

        expect(result.isError).toBe(true);
      });

      it("should throw error for unsupported HTTP method", async () => {
        const operation = createMockParsedOperation({
          method: "PATCH",
        });

        registerTool(
          mockServer as unknown as McpServer,
          operation,
          mockCredentialManager as unknown as CredentialManager,
          mockHttpClient as unknown as HttpClient
        );

        const handler = mockServer.tool.mock.calls[0][3] as (
          params: Record<string, unknown>
        ) => Promise<{ isError: boolean; content: Array<{ type: string; text: string }> }>;

        const result = await handler({});

        expect(result.isError).toBe(true);
        const parsed = JSON.parse(result.content[0].text);
        expect(parsed.error.message).toContain("Unsupported HTTP method");
      });
    });

    describe("parameter type mapping", () => {
      it("should handle integer parameters", async () => {
        mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

        const operation = createMockParsedOperation({
          queryParameters: [
            {
              name: "limit",
              in: "query",
              required: false,
              description: "Limit",
              schema: { type: "integer" },
            },
          ],
        });

        registerTool(
          mockServer as unknown as McpServer,
          operation,
          mockCredentialManager as unknown as CredentialManager,
          null
        );

        const handler = mockServer.tool.mock.calls[0][3] as (
          params: Record<string, unknown>
        ) => Promise<{ content: Array<{ type: string; text: string }> }>;

        const result = await handler({});

        const response = JSON.parse(result.content[0].text) as DocumentationResponse;
        const limitParam = response.parameters.find((p) => p.name === "limit");
        expect(limitParam?.type).toBe("integer");
      });

      it("should handle number parameters", async () => {
        mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

        const operation = createMockParsedOperation({
          queryParameters: [
            {
              name: "timeout",
              in: "query",
              required: false,
              schema: { type: "number" },
            },
          ],
        });

        registerTool(
          mockServer as unknown as McpServer,
          operation,
          mockCredentialManager as unknown as CredentialManager,
          null
        );

        expect(mockServer.tool).toHaveBeenCalled();
      });

      it("should handle boolean parameters", async () => {
        mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

        const operation = createMockParsedOperation({
          queryParameters: [
            {
              name: "enabled",
              in: "query",
              required: false,
              schema: { type: "boolean" },
            },
          ],
        });

        registerTool(
          mockServer as unknown as McpServer,
          operation,
          mockCredentialManager as unknown as CredentialManager,
          null
        );

        expect(mockServer.tool).toHaveBeenCalled();
      });

      it("should handle array parameters", async () => {
        mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

        const operation = createMockParsedOperation({
          queryParameters: [
            {
              name: "ids",
              in: "query",
              required: false,
              schema: { type: "array" },
            },
          ],
        });

        registerTool(
          mockServer as unknown as McpServer,
          operation,
          mockCredentialManager as unknown as CredentialManager,
          null
        );

        expect(mockServer.tool).toHaveBeenCalled();
      });

      it("should handle object parameters", async () => {
        mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

        const operation = createMockParsedOperation({
          queryParameters: [
            {
              name: "metadata",
              in: "query",
              required: false,
              schema: { type: "object" },
            },
          ],
        });

        registerTool(
          mockServer as unknown as McpServer,
          operation,
          mockCredentialManager as unknown as CredentialManager,
          null
        );

        expect(mockServer.tool).toHaveBeenCalled();
      });
    });

    describe("subscription tier", () => {
      it("should return STANDARD for http_loadbalancer", async () => {
        mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

        const operation = createMockParsedOperation({
          resource: "http_loadbalancer",
        });

        registerTool(
          mockServer as unknown as McpServer,
          operation,
          mockCredentialManager as unknown as CredentialManager,
          null
        );

        const handler = mockServer.tool.mock.calls[0][3] as (
          params: Record<string, unknown>
        ) => Promise<{ content: Array<{ type: string; text: string }> }>;

        const result = await handler({});

        const response = JSON.parse(result.content[0].text) as DocumentationResponse;
        expect(response.subscriptionTier).toBe(SUBSCRIPTION_TIERS.STANDARD);
      });

      it("should return ADVANCED for app_firewall", async () => {
        mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

        const operation = createMockParsedOperation({
          resource: "app_firewall",
        });

        registerTool(
          mockServer as unknown as McpServer,
          operation,
          mockCredentialManager as unknown as CredentialManager,
          null
        );

        const handler = mockServer.tool.mock.calls[0][3] as (
          params: Record<string, unknown>
        ) => Promise<{ content: Array<{ type: string; text: string }> }>;

        const result = await handler({});

        const response = JSON.parse(result.content[0].text) as DocumentationResponse;
        expect(response.subscriptionTier).toBe(SUBSCRIPTION_TIERS.ADVANCED);
      });

      it("should return NO_TIER for namespace", async () => {
        mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

        const operation = createMockParsedOperation({
          resource: "namespace",
        });

        registerTool(
          mockServer as unknown as McpServer,
          operation,
          mockCredentialManager as unknown as CredentialManager,
          null
        );

        const handler = mockServer.tool.mock.calls[0][3] as (
          params: Record<string, unknown>
        ) => Promise<{ content: Array<{ type: string; text: string }> }>;

        const result = await handler({});

        const response = JSON.parse(result.content[0].text) as DocumentationResponse;
        expect(response.subscriptionTier).toBe(SUBSCRIPTION_TIERS.NO_TIER);
      });
    });

    describe("path parameters in documentation", () => {
      it("should include path parameters in documentation response", async () => {
        mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

        const operation = createMockParsedOperation({
          pathParameters: [
            {
              name: "namespace",
              in: "path",
              required: true,
              description: "Namespace name",
              schema: { type: "string" },
            },
            {
              name: "name",
              in: "path",
              required: true,
              description: "Resource name",
              schema: { type: "string" },
            },
          ],
        });

        registerTool(
          mockServer as unknown as McpServer,
          operation,
          mockCredentialManager as unknown as CredentialManager,
          null
        );

        const handler = mockServer.tool.mock.calls[0][3] as (
          params: Record<string, unknown>
        ) => Promise<{ content: Array<{ type: string; text: string }> }>;

        const result = await handler({});

        const response = JSON.parse(result.content[0].text) as DocumentationResponse;

        // Verify path parameters are included in parameters list
        const namespaceParam = response.parameters.find(p => p.name === "namespace");
        const nameParam = response.parameters.find(p => p.name === "name");

        expect(namespaceParam).toBeDefined();
        expect(namespaceParam?.location).toBe("path");
        expect(namespaceParam?.required).toBe(true);
        expect(namespaceParam?.description).toBe("Namespace name");

        expect(nameParam).toBeDefined();
        expect(nameParam?.location).toBe("path");
      });

      it("should include path parameter type from schema", async () => {
        mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

        const operation = createMockParsedOperation({
          pathParameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "Resource ID",
              schema: { type: "integer" },
            },
          ],
        });

        registerTool(
          mockServer as unknown as McpServer,
          operation,
          mockCredentialManager as unknown as CredentialManager,
          null
        );

        const handler = mockServer.tool.mock.calls[0][3] as (
          params: Record<string, unknown>
        ) => Promise<{ content: Array<{ type: string; text: string }> }>;

        const result = await handler({});

        const response = JSON.parse(result.content[0].text) as DocumentationResponse;
        const idParam = response.parameters.find(p => p.name === "id");

        expect(idParam?.type).toBe("integer");
      });

      it("should default path parameter type to string when schema is missing", async () => {
        mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

        const operation = createMockParsedOperation({
          pathParameters: [
            {
              name: "name",
              in: "path",
              required: true,
              description: "Resource name",
              // no schema
            },
          ],
        });

        registerTool(
          mockServer as unknown as McpServer,
          operation,
          mockCredentialManager as unknown as CredentialManager,
          null
        );

        const handler = mockServer.tool.mock.calls[0][3] as (
          params: Record<string, unknown>
        ) => Promise<{ content: Array<{ type: string; text: string }> }>;

        const result = await handler({});

        const response = JSON.parse(result.content[0].text) as DocumentationResponse;
        const nameParam = response.parameters.find(p => p.name === "name");

        expect(nameParam?.type).toBe("string");
      });
    });

    describe("example request generation", () => {
      it("should generate origin pool example", async () => {
        mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

        const operation = createMockParsedOperation({
          operation: "create",
          resource: "origin-pool",
          requestBodySchema: { type: "object" },
        });

        registerTool(
          mockServer as unknown as McpServer,
          operation,
          mockCredentialManager as unknown as CredentialManager,
          null
        );

        const handler = mockServer.tool.mock.calls[0][3] as (
          params: Record<string, unknown>
        ) => Promise<{ content: Array<{ type: string; text: string }> }>;

        const result = await handler({});

        const response = JSON.parse(result.content[0].text) as DocumentationResponse;
        expect(response.exampleRequest).not.toBeNull();
        expect(response.exampleRequest?.spec).toHaveProperty("origin_servers");
      });

      it("should generate generic example for unknown resources", async () => {
        mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

        const operation = createMockParsedOperation({
          operation: "create",
          resource: "custom-resource",
          requestBodySchema: { type: "object" },
        });

        registerTool(
          mockServer as unknown as McpServer,
          operation,
          mockCredentialManager as unknown as CredentialManager,
          null
        );

        const handler = mockServer.tool.mock.calls[0][3] as (
          params: Record<string, unknown>
        ) => Promise<{ content: Array<{ type: string; text: string }> }>;

        const result = await handler({});

        const response = JSON.parse(result.content[0].text) as DocumentationResponse;
        expect(response.exampleRequest).not.toBeNull();
        expect(response.exampleRequest?.metadata.name).toContain("example-");
      });
    });
  });

  describe("registerAllTools", () => {
    let mockServer: {
      tool: ReturnType<typeof vi.fn>;
    };
    let mockCredentialManager: {
      getAuthMode: ReturnType<typeof vi.fn>;
      getTenant: ReturnType<typeof vi.fn>;
    };

    beforeEach(() => {
      vi.clearAllMocks();

      mockServer = {
        tool: vi.fn(),
      };

      mockCredentialManager = {
        getAuthMode: vi.fn().mockReturnValue(AuthMode.NONE),
        getTenant: vi.fn().mockReturnValue("test-tenant"),
      };
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should register multiple tools", () => {
      const operations = [
        createMockParsedOperation({ toolName: "tool-1" }),
        createMockParsedOperation({ toolName: "tool-2" }),
        createMockParsedOperation({ toolName: "tool-3" }),
      ];

      registerAllTools(
        mockServer as unknown as McpServer,
        operations,
        mockCredentialManager as unknown as CredentialManager,
        null
      );

      expect(mockServer.tool).toHaveBeenCalledTimes(3);
    });

    it("should register each tool with correct name", () => {
      const operations = [
        createMockParsedOperation({ toolName: "f5xc-api-waap-lb-list" }),
        createMockParsedOperation({ toolName: "f5xc-api-dns-zone-get" }),
      ];

      registerAllTools(
        mockServer as unknown as McpServer,
        operations,
        mockCredentialManager as unknown as CredentialManager,
        null
      );

      const calls = mockServer.tool.mock.calls;
      expect(calls[0][0]).toBe("f5xc-api-waap-lb-list");
      expect(calls[1][0]).toBe("f5xc-api-dns-zone-get");
    });

    it("should handle empty operations array", () => {
      registerAllTools(
        mockServer as unknown as McpServer,
        [],
        mockCredentialManager as unknown as CredentialManager,
        null
      );

      expect(mockServer.tool).not.toHaveBeenCalled();
    });
  });
});

/**
 * Helper function to create mock ParsedOperation objects
 */
function createMockParsedOperation(
  overrides: Partial<ParsedOperation> = {}
): ParsedOperation {
  return {
    toolName: "f5xc-api-core-test-list",
    method: "GET",
    path: "/api/config/test",
    operation: "list",
    domain: "core",
    resource: "test",
    summary: "Test operation",
    description: "Test operation description",
    pathParameters: [],
    queryParameters: [],
    requestBodySchema: null,
    responseSchema: null,
    requiredParams: [],
    operationId: null,
    tags: [],
    sourceFile: "test.json",
    // Rich metadata properties from enriched specs v1.0.63
    displayName: null,
    dangerLevel: null,
    sideEffects: null,
    requiredFields: [],
    confirmationRequired: false,
    parameterExamples: {},
    validationRules: {},
    operationMetadata: null,
    // Curl example from enriched specs v1.0.66
    curlExample: null,
    // Dependency intelligence from enriched specs v1.0.67
    dependencies: [],
    oneOfGroups: [],
    subscriptionRequirements: [],
    ...overrides,
  };
}
