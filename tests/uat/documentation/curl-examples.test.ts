// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * CURL Examples Validation Tests
 *
 * Validates that generated CURL examples have correct syntax,
 * proper quoting, valid JSON bodies, and correct URL structures.
 *
 * Tests both:
 * 1. The validateCurlSyntax helper function
 * 2. Real CURL output from executeTool in documentation mode
 */

import { describe, it, expect, vi } from "vitest";
import { validateCurlSyntax } from "../utils/documentation-helpers.js";

// Mock the logger to prevent console output
vi.mock("../../../src/utils/logging.js", () => ({
  logger: {
    error: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
  },
}));

// Import the actual executeTool function to test real CURL generation
import { executeTool } from "../../../src/tools/discovery/execute.js";

// Type guard for documentation response
interface DocumentationResponse {
  curlExample: string;
  tool: {
    name: string;
    method: string;
    path: string;
  };
  authMessage: string;
}

function isDocumentationResponse(result: unknown): result is DocumentationResponse {
  return (
    typeof result === "object" &&
    result !== null &&
    "curlExample" in result &&
    "authMessage" in result
  );
}

describe("CURL Examples Validation", () => {
  describe("validateCurlSyntax helper", () => {
    it("should validate correct GET curl command", () => {
      const curl = `curl -X GET "https://example.console.ves.volterra.io/api/config/namespaces/default/http_loadbalancers"`;
      const result = validateCurlSyntax(curl);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should validate correct POST curl command with body", () => {
      const curl = `curl -X POST "https://example.console.ves.volterra.io/api/config/namespaces/default/http_loadbalancers" \\
  -H "Authorization: APIToken $F5XC_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"metadata":{"name":"test"}}'`;
      const result = validateCurlSyntax(curl);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it("should detect unbalanced single quotes", () => {
      const curl = `curl -X GET "https://example.com" -d '{"test": "value}`;
      const result = validateCurlSyntax(curl);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain("Unbalanced single quotes");
    });

    it("should detect unbalanced double quotes", () => {
      const curl = `curl -X GET "https://example.com`;
      const result = validateCurlSyntax(curl);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain("Unbalanced double quotes");
    });

    it("should detect missing HTTP method", () => {
      const curl = `curl "https://example.com"`;
      const result = validateCurlSyntax(curl);

      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes("HTTP method"))).toBe(true);
    });

    it("should accept commands with template variables", () => {
      const curl = `curl -X GET "https://\${TENANT}.console.ves.volterra.io/api/test"`;
      const result = validateCurlSyntax(curl);

      expect(result.valid).toBe(true);
    });

    it("should accept comment-prefixed examples", () => {
      const curl = `# Get resource
curl -X GET "https://example.com/api/test"`;
      const result = validateCurlSyntax(curl);

      expect(result.valid).toBe(true);
    });
  });

  describe("Real executeTool CURL generation (documentation mode)", () => {
    // Use correct tool names from the registry:
    // - f5xc-api-virtual-http-loadbalancer-* (not waap)
    // - f5xc-api-virtual-origin-pool-*
    // - f5xc-api-waf-app-firewall-*

    it("should generate valid CURL for HTTP load balancer list", async () => {
      const result = await executeTool({
        toolName: "f5xc-api-virtual-http-loadbalancer-list",
        pathParams: { namespace: "default" },
      });

      expect(isDocumentationResponse(result)).toBe(true);
      if (isDocumentationResponse(result)) {
        expect(result.curlExample).toBeDefined();
        expect(result.curlExample).toContain("curl -X GET");
        expect(result.curlExample).toContain("http_loadbalancers");

        const validation = validateCurlSyntax(result.curlExample);
        expect(validation.valid).toBe(true);
      }
    });

    it("should generate valid CURL for origin pool list", async () => {
      const result = await executeTool({
        toolName: "f5xc-api-virtual-origin-pool-list",
        pathParams: { namespace: "default" },
      });

      expect(isDocumentationResponse(result)).toBe(true);
      if (isDocumentationResponse(result)) {
        expect(result.curlExample).toContain("curl -X GET");
        expect(result.curlExample).toContain("origin_pools");

        const validation = validateCurlSyntax(result.curlExample);
        expect(validation.valid).toBe(true);
      }
    });

    it("should include Authorization header in CURL", async () => {
      const result = await executeTool({
        toolName: "f5xc-api-virtual-http-loadbalancer-list",
        pathParams: { namespace: "default" },
      });

      expect(isDocumentationResponse(result)).toBe(true);
      if (isDocumentationResponse(result)) {
        expect(result.curlExample).toContain("Authorization: APIToken");
        expect(result.curlExample).toContain("$F5XC_API_TOKEN");
      }
    });

    it("should include Content-Type header in CURL", async () => {
      const result = await executeTool({
        toolName: "f5xc-api-virtual-http-loadbalancer-list",
        pathParams: { namespace: "default" },
      });

      expect(isDocumentationResponse(result)).toBe(true);
      if (isDocumentationResponse(result)) {
        expect(result.curlExample).toContain("Content-Type: application/json");
      }
    });

    it("should use {tenant} placeholder in URL", async () => {
      const result = await executeTool({
        toolName: "f5xc-api-virtual-http-loadbalancer-list",
        pathParams: { namespace: "default" },
      });

      expect(isDocumentationResponse(result)).toBe(true);
      if (isDocumentationResponse(result)) {
        expect(result.curlExample).toContain("{tenant}");
        expect(result.curlExample).toContain("console.ves.volterra.io");
      }
    });

    it("should substitute path parameters in URL", async () => {
      const result = await executeTool({
        toolName: "f5xc-api-virtual-http-loadbalancer-get",
        pathParams: { namespace: "my-namespace", name: "my-lb" },
      });

      expect(isDocumentationResponse(result)).toBe(true);
      if (isDocumentationResponse(result)) {
        expect(result.curlExample).toContain("my-namespace");
        expect(result.curlExample).toContain("my-lb");
      }
    });

    it("should include request body for POST requests", async () => {
      const result = await executeTool({
        toolName: "f5xc-api-virtual-http-loadbalancer-create",
        pathParams: { "metadata.namespace": "default" },
        body: {
          metadata: { name: "test-lb" },
          spec: { domains: ["example.com"] },
        },
      });

      expect(isDocumentationResponse(result)).toBe(true);
      if (isDocumentationResponse(result)) {
        expect(result.curlExample).toContain("curl -X POST");
        expect(result.curlExample).toContain("-d '");
        expect(result.curlExample).toContain("test-lb");
        expect(result.curlExample).toContain("example.com");

        const validation = validateCurlSyntax(result.curlExample);
        expect(validation.valid).toBe(true);
      }
    });

    it("should return authMessage in documentation mode", async () => {
      const result = await executeTool({
        toolName: "f5xc-api-virtual-http-loadbalancer-list",
        pathParams: { namespace: "default" },
      });

      expect(isDocumentationResponse(result)).toBe(true);
      if (isDocumentationResponse(result)) {
        expect(result.authMessage).toContain("F5XC_API_URL");
        expect(result.authMessage).toContain("F5XC_API_TOKEN");
      }
    });

    it("should return tool metadata", async () => {
      const result = await executeTool({
        toolName: "f5xc-api-virtual-http-loadbalancer-list",
        pathParams: { namespace: "default" },
      });

      expect(isDocumentationResponse(result)).toBe(true);
      if (isDocumentationResponse(result)) {
        expect(result.tool.name).toBe("f5xc-api-virtual-http-loadbalancer-list");
        expect(result.tool.method).toBe("GET");
      }
    });
  });

  describe("HTTP method variations", () => {
    const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"];

    methods.forEach((method) => {
      it(`should accept ${method} method`, () => {
        const curl = `curl -X ${method} "https://example.com/api/test"`;
        const result = validateCurlSyntax(curl);

        expect(result.valid).toBe(true);
      });
    });

    it("should reject invalid HTTP methods", () => {
      const curl = `curl -X INVALID "https://example.com/api/test"`;
      const result = validateCurlSyntax(curl);

      expect(result.valid).toBe(false);
    });
  });

  describe("request body validation", () => {
    it("should validate proper JSON in body", () => {
      const curl = `curl -X POST "https://example.com/api/test" -d '{"name":"test","count":1}'`;
      const result = validateCurlSyntax(curl);

      expect(result.valid).toBe(true);
    });

    it("should validate nested JSON in body", () => {
      const curl = `curl -X POST "https://example.com/api/test" -d '{"metadata":{"name":"test"},"spec":{"port":80}}'`;
      const result = validateCurlSyntax(curl);

      expect(result.valid).toBe(true);
    });

    it("should validate JSON arrays in body", () => {
      const curl = `curl -X POST "https://example.com/api/test" -d '{"items":[1,2,3]}'`;
      const result = validateCurlSyntax(curl);

      expect(result.valid).toBe(true);
    });

    it("should allow template variables in JSON body", () => {
      const curl = `curl -X POST "https://example.com/api/test" -d '{"name":"\${NAME}"}'`;
      const result = validateCurlSyntax(curl);

      // Template variables are allowed
      expect(result.valid).toBe(true);
    });
  });

  describe("URL structure validation", () => {
    it("should accept HTTPS URLs", () => {
      const curl = `curl -X GET "https://example.console.ves.volterra.io/api/test"`;
      const result = validateCurlSyntax(curl);

      expect(result.valid).toBe(true);
    });

    it("should accept URLs with path parameters", () => {
      const curl = `curl -X GET "https://example.com/api/namespaces/default/resources/my-resource"`;
      const result = validateCurlSyntax(curl);

      expect(result.valid).toBe(true);
    });

    it("should accept URLs with query parameters", () => {
      const curl = `curl -X GET "https://example.com/api/test?limit=10&offset=0"`;
      const result = validateCurlSyntax(curl);

      expect(result.valid).toBe(true);
    });
  });

  describe("error handling for invalid tools", () => {
    it("should handle non-existent tool gracefully", async () => {
      const result = await executeTool({
        toolName: "non-existent-tool",
        pathParams: {},
      });

      // Should return an error object, not throw
      expect(result).toBeDefined();
      expect("error" in result || "success" in result).toBe(true);
    });
  });
});
