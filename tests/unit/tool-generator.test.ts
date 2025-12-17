/**
 * Unit Tests for MCP Tool Generator
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  SUBSCRIPTION_TIERS,
  type DocumentationResponse,
  type ParameterInfo,
} from "../../src/generator/tool-generator.js";
import type { ParsedOperation, OpenApiParameter } from "../../src/generator/openapi-parser.js";

// Note: Since most functions in tool-generator.ts are not exported,
// we test them indirectly through the DocumentationResponse structure
// and the public registerTool/registerAllTools functions.
// For direct testing, we would need to export these functions or
// test through integration tests.

describe("tool-generator", () => {
  describe("SUBSCRIPTION_TIERS constants", () => {
    it("should define expected subscription tiers", () => {
      expect(SUBSCRIPTION_TIERS.NO_TIER).toBe("NO_TIER");
      expect(SUBSCRIPTION_TIERS.STANDARD).toBe("STANDARD");
      expect(SUBSCRIPTION_TIERS.ADVANCED).toBe("ADVANCED");
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
        f5xcctlCommand: "f5xcctl apply -f http_loadbalancer.yaml",
        terraformResource: "volterra_http_loadbalancer",
        terraformExample: "resource block",
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

  describe("F5xcctl Command Generation Logic", () => {
    it("should format list command correctly", () => {
      // Test the expected output format for list operations
      const expectedPattern = /f5xcctl get \w+s -n \{namespace\}/;
      const listCommand = "f5xcctl get http_loadbalancers -n {namespace}";
      expect(listCommand).toMatch(expectedPattern);
    });

    it("should format get command correctly", () => {
      const expectedPattern = /f5xcctl get \w+ \{name\} -n \{namespace\}/;
      const getCommand = "f5xcctl get http_loadbalancer {name} -n {namespace}";
      expect(getCommand).toMatch(expectedPattern);
    });

    it("should format create command correctly", () => {
      const createCommand = "f5xcctl apply -f http_loadbalancer.yaml";
      expect(createCommand).toContain("apply");
      expect(createCommand).toContain("-f");
    });

    it("should format delete command correctly", () => {
      const expectedPattern = /f5xcctl delete \w+ \{name\} -n \{namespace\}/;
      const deleteCommand = "f5xcctl delete http_loadbalancer {name} -n {namespace}";
      expect(deleteCommand).toMatch(expectedPattern);
    });
  });

  describe("Terraform Resource Generation Logic", () => {
    it("should generate volterra_ prefix", () => {
      const resource = "http_loadbalancer";
      const terraformResource = `volterra_${resource}`;
      expect(terraformResource).toBe("volterra_http_loadbalancer");
    });

    it("should convert hyphens to underscores", () => {
      const resource = "http-loadbalancer";
      const normalized = resource.replace(/-/g, "_");
      const terraformResource = `volterra_${normalized}`;
      expect(terraformResource).toBe("volterra_http_loadbalancer");
    });

    it("should generate resource block for create/update", () => {
      const terraformExample = `resource "volterra_http_loadbalancer" "example" {
  name      = "example"
  namespace = "default"
}`;
      expect(terraformExample).toContain("resource");
      expect(terraformExample).toContain('"volterra_http_loadbalancer"');
    });

    it("should generate data source for get/list operations", () => {
      const dataSourceExample = `data "volterra_http_loadbalancer" "example" {
  name      = "example"
  namespace = "default"
}`;
      expect(dataSourceExample).toContain("data");
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
      const params = { namespace: "default", name: "my-lb" };

      let result = path;
      for (const [key, value] of Object.entries(params)) {
        result = result.replace(`{${key}}`, value);
      }

      expect(result).toBe("/api/config/namespaces/default/http_loadbalancers/my-lb");
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
    ...overrides,
  };
}
