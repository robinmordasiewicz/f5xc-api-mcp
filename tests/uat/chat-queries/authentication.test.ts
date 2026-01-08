/**
 * Authentication Query Tests
 *
 * Tests for Category 5: Auth-related queries
 * Validates that users can check and configure authentication.
 *
 * User Intent Examples:
 * - "Am I authenticated?"
 * - "How do I connect to my tenant?"
 * - "Switch to production profile"
 */

import { describe, it, expect, vi } from "vitest";
import { executeTool } from "../../../src/tools/discovery/execute.js";
import { isDocumentationResponse, isErrorResponse } from "./utils/query-helpers.js";

// Mock logger to prevent console output
vi.mock("../../../src/utils/logging.js", () => ({
  logger: {
    error: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
  },
}));

describe("Authentication Queries - User Experience Simulation", () => {
  describe("Auth Status: 'Am I authenticated?'", () => {
    it("should indicate unauthenticated state in documentation mode", async () => {
      // Execute any tool - in documentation mode, authMessage should indicate need for auth
      const response = await executeTool({
        toolName: "f5xc-api-virtual-http-loadbalancer-list",
        pathParams: { namespace: "default" },
      });

      expect(isDocumentationResponse(response)).toBe(true);
      if (isDocumentationResponse(response)) {
        // Auth message should explain how to authenticate
        expect(response.authMessage).toBeDefined();
        expect(response.authMessage.length).toBeGreaterThan(0);
        expect(response.authMessage).toContain("F5XC_API");
      }
    });

    it("should mention required environment variables", async () => {
      const response = await executeTool({
        toolName: "f5xc-api-virtual-http-loadbalancer-list",
        pathParams: { namespace: "default" },
      });

      expect(isDocumentationResponse(response)).toBe(true);
      if (isDocumentationResponse(response)) {
        // Should mention F5XC_API_URL and/or F5XC_API_TOKEN
        expect(
          response.authMessage.includes("F5XC_API_URL") ||
            response.authMessage.includes("F5XC_API_TOKEN")
        ).toBe(true);
      }
    });
  });

  describe("Authentication Guidance: 'How do I connect to my tenant?'", () => {
    it("should provide curl example with auth headers", async () => {
      const response = await executeTool({
        toolName: "f5xc-api-virtual-http-loadbalancer-list",
        pathParams: { namespace: "default" },
      });

      expect(isDocumentationResponse(response)).toBe(true);
      if (isDocumentationResponse(response)) {
        // CURL should show Authorization header pattern
        expect(response.curlExample).toContain("Authorization");
        expect(response.curlExample).toContain("APIToken");
      }
    });

    it("should show tenant URL placeholder in curl", async () => {
      const response = await executeTool({
        toolName: "f5xc-api-virtual-http-loadbalancer-list",
        pathParams: { namespace: "default" },
      });

      expect(isDocumentationResponse(response)).toBe(true);
      if (isDocumentationResponse(response)) {
        expect(
          response.curlExample.includes("{tenant}") ||
            response.curlExample.includes("${TENANT}") ||
            /\.console\.ves\.volterra\.io\b/.test(response.curlExample)
        ).toBe(true);
      }
    });
  });

  describe("Error Handling: Invalid Tool Names", () => {
    it("should handle non-existent tools gracefully", async () => {
      const response = await executeTool({
        toolName: "non-existent-tool-name",
        pathParams: {},
      });

      // Should return error, not throw
      expect(response).toBeDefined();
      expect(isErrorResponse(response) || "error" in (response as object)).toBe(true);
    });
  });

  describe("Documentation Mode Indicators", () => {
    it("should clearly indicate documentation mode in response", async () => {
      const response = await executeTool({
        toolName: "f5xc-api-virtual-http-loadbalancer-get",
        pathParams: { namespace: "default", name: "test-lb" },
      });

      expect(isDocumentationResponse(response)).toBe(true);
      if (isDocumentationResponse(response)) {
        // Should have all documentation mode fields
        expect(response.curlExample).toBeDefined();
        expect(response.authMessage).toBeDefined();
        expect(response.tool).toBeDefined();
        expect(response.tool.name).toBeDefined();
        expect(response.tool.method).toBeDefined();
      }
    });

    it("should provide tool metadata in documentation response", async () => {
      const response = await executeTool({
        toolName: "f5xc-api-virtual-http-loadbalancer-list",
        pathParams: { namespace: "default" },
      });

      expect(isDocumentationResponse(response)).toBe(true);
      if (isDocumentationResponse(response)) {
        expect(response.tool.name).toBe("f5xc-api-virtual-http-loadbalancer-list");
        expect(response.tool.method).toBe("GET");
        expect(response.tool.path).toBeDefined();
      }
    });
  });

  describe("Path Parameter Substitution", () => {
    it("should substitute namespace in URL", async () => {
      const response = await executeTool({
        toolName: "f5xc-api-virtual-http-loadbalancer-list",
        pathParams: { namespace: "my-namespace" },
      });

      expect(isDocumentationResponse(response)).toBe(true);
      if (isDocumentationResponse(response)) {
        expect(response.curlExample).toContain("my-namespace");
      }
    });

    it("should substitute resource name in URL", async () => {
      const response = await executeTool({
        toolName: "f5xc-api-virtual-http-loadbalancer-get",
        pathParams: { namespace: "default", name: "specific-lb" },
      });

      expect(isDocumentationResponse(response)).toBe(true);
      if (isDocumentationResponse(response)) {
        expect(response.curlExample).toContain("specific-lb");
      }
    });
  });

  describe("Request Body Handling", () => {
    it("should include request body in POST curl", async () => {
      const response = await executeTool({
        toolName: "f5xc-api-virtual-http-loadbalancer-create",
        pathParams: { "metadata.namespace": "default" },
        body: {
          metadata: { name: "new-lb" },
          spec: { domains: ["example.com"] },
        },
      });

      expect(isDocumentationResponse(response)).toBe(true);
      if (isDocumentationResponse(response)) {
        expect(response.curlExample).toContain("POST");
        expect(response.curlExample).toContain("new-lb");
        expect(response.curlExample).toContain("example.com");
      }
    });
  });
});
