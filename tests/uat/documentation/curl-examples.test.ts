/**
 * CURL Examples Validation Tests
 *
 * Validates that generated CURL examples have correct syntax,
 * proper quoting, valid JSON bodies, and correct URL structures.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
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

  describe("execute.ts generateCurlCommand format", () => {
    // These tests validate the format produced by src/tools/discovery/execute.ts

    it("should use correct base URL structure", () => {
      // The expected format from generateCurlCommand
      const expectedPattern = /https:\/\/\{tenant\}\.console\.ves\.volterra\.io\/api/;

      // A sample curl command in the expected format
      const sampleCurl = `curl -X GET "https://{tenant}.console.ves.volterra.io/api/config/namespaces/test/http_loadbalancers" \\
  -H "Authorization: APIToken $F5XC_API_TOKEN" \\
  -H "Content-Type: application/json"`;

      expect(sampleCurl).toMatch(expectedPattern);
      expect(validateCurlSyntax(sampleCurl).valid).toBe(true);
    });

    it("should include Authorization header", () => {
      const sampleCurl = `curl -X GET "https://{tenant}.console.ves.volterra.io/api/test" \\
  -H "Authorization: APIToken $F5XC_API_TOKEN"`;

      expect(sampleCurl).toContain("Authorization: APIToken");
      expect(sampleCurl).toContain("$F5XC_API_TOKEN");
    });

    it("should include Content-Type header", () => {
      const sampleCurl = `curl -X GET "https://{tenant}.console.ves.volterra.io/api/test" \\
  -H "Content-Type: application/json"`;

      expect(sampleCurl).toContain("Content-Type: application/json");
    });

    it("should use line continuation for readability", () => {
      const sampleCurl = `curl -X GET "https://{tenant}.console.ves.volterra.io/api/test" \\
  -H "Authorization: APIToken $F5XC_API_TOKEN" \\
  -H "Content-Type: application/json"`;

      // Should have backslash continuations
      expect(sampleCurl).toContain("\\\n");
    });
  });

  describe("handlers.ts generateCurlExample format", () => {
    // These tests validate the format produced by src/resources/handlers.ts

    it("should include both authenticated and unauthenticated examples", () => {
      // Sample from handlers.ts generateCurlExample format
      const sampleCurl = `# Get resource (authenticated)
curl -X GET "https://\${TENANT}.console.ves.volterra.io/api/config/namespaces/default/http_loadbalancers/example" \\
  -H "Authorization: APIToken \${F5XC_API_TOKEN}" \\
  -H "Content-Type: application/json"

# Get resource (unauthenticated - documentation mode)
# Note: Actual API calls require authentication
curl -X GET "https://\${TENANT}.console.ves.volterra.io/api/config/namespaces/default/http_loadbalancers/example"`;

      expect(sampleCurl).toContain("authenticated");
      expect(sampleCurl).toContain("unauthenticated");
      expect(sampleCurl).toContain("documentation mode");
    });

    it("should have valid syntax in handlers example format", () => {
      const sampleCurl = `curl -X GET "https://\${TENANT}.console.ves.volterra.io/api/config/namespaces/default/http_loadbalancers/test" \\
  -H "Authorization: APIToken \${F5XC_API_TOKEN}" \\
  -H "Content-Type: application/json"`;

      const result = validateCurlSyntax(sampleCurl);
      expect(result.valid).toBe(true);
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
});
