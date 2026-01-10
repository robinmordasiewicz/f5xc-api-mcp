// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Inspection Query Tests
 *
 * Tests for Category 3: "List/Show/Get" queries
 * Validates that users can inspect and list existing resources.
 *
 * User Intent Examples:
 * - "List my load balancers"
 * - "Show load balancers in namespace X"
 * - "Get details of load balancer Y"
 * - "What's the status of my origin pools?"
 */

import { describe, it, expect, vi } from "vitest";
import { searchTools } from "../../../src/tools/discovery/search.js";
import { executeTool } from "../../../src/tools/discovery/execute.js";
import { resolveConsolidatedTool, searchConsolidatedResources } from "../../../src/tools/discovery/consolidate.js";
import {
  validateSearchResults,
  isDocumentationResponse,
  type ChatQuery,
} from "./utils/query-helpers.js";

// Mock logger to prevent console output
vi.mock("../../../src/utils/logging.js", () => ({
  logger: {
    error: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
  },
}));

describe("Inspection Queries - User Experience Simulation", () => {
  describe("List Load Balancers: 'List my load balancers'", () => {
    const query: ChatQuery = {
      userIntent: "List my load balancers",
      searchQuery: "list http load balancer",
      expectedToolPattern: "http-loadbalancer-list",
      expectedScore: 0.6,
    };

    it("should find the list tool with high relevance", () => {
      const results = searchTools(query.searchQuery, { limit: 5 });
      const validation = validateSearchResults(query, results);

      expect(validation.passed).toBe(true);
      expect(results[0].tool.operation).toBe("list");
      expect(results[0].tool.resource).toContain("http-loadbalancer");
    });

    it("should execute list tool and return documentation mode response", async () => {
      const results = searchTools(query.searchQuery, { limit: 1 });
      const toolName = results[0].tool.name;

      const response = await executeTool({
        toolName,
        pathParams: { namespace: "default" },
      });

      // In documentation mode (no auth), returns curl example
      expect(isDocumentationResponse(response)).toBe(true);
      if (isDocumentationResponse(response)) {
        expect(response.curlExample).toContain("curl -X GET");
        expect(response.tool.method).toBe("GET");
      }
    });

    it("should resolve consolidated resource to list tool", () => {
      const toolName = resolveConsolidatedTool("f5xc-api-virtual-http-loadbalancer", "list");

      expect(toolName).toBeDefined();
      expect(toolName).toContain("list");
    });
  });

  describe("Namespace-Scoped Query: 'Show load balancers in namespace X'", () => {
    it("should include namespace in path parameters", async () => {
      const results = searchTools("list http load balancer", { limit: 1 });

      const response = await executeTool({
        toolName: results[0].tool.name,
        pathParams: { namespace: "production" },
      });

      expect(isDocumentationResponse(response)).toBe(true);
      if (isDocumentationResponse(response)) {
        // CURL should contain the production namespace
        expect(response.curlExample).toContain("production");
      }
    });

    it("should support different namespace values", async () => {
      const results = searchTools("list origin pool", { limit: 1 });

      const response = await executeTool({
        toolName: results[0].tool.name,
        pathParams: { namespace: "staging" },
      });

      expect(isDocumentationResponse(response)).toBe(true);
      if (isDocumentationResponse(response)) {
        expect(response.curlExample).toContain("staging");
      }
    });
  });

  describe("Get Specific Resource: 'Get details of load balancer Y'", () => {
    const query: ChatQuery = {
      userIntent: "Get details of load balancer Y",
      searchQuery: "get http load balancer",
      expectedToolPattern: "http-loadbalancer-get",
      expectedScore: 0.6,
    };

    it("should find the get tool with high relevance", () => {
      // Use domain filter to focus on virtual domain where http-loadbalancer lives
      const results = searchTools(query.searchQuery, { domains: ["virtual"], limit: 5 });

      // Find the http-loadbalancer-get tool among results
      const httpLbGetTool = results.find(
        (r) => r.tool.resource.includes("http-loadbalancer") && r.tool.operation === "get"
      );
      expect(httpLbGetTool).toBeDefined();
      expect(httpLbGetTool!.score).toBeGreaterThan(0.5);
    });

    it("should execute get tool with resource name", async () => {
      const results = searchTools(query.searchQuery, { limit: 1 });

      const response = await executeTool({
        toolName: results[0].tool.name,
        pathParams: { namespace: "default", name: "my-lb" },
      });

      expect(isDocumentationResponse(response)).toBe(true);
      if (isDocumentationResponse(response)) {
        expect(response.curlExample).toContain("my-lb");
        expect(response.tool.method).toBe("GET");
      }
    });

    it("should resolve consolidated resource to get tool", () => {
      const toolName = resolveConsolidatedTool("f5xc-api-virtual-http-loadbalancer", "get");

      expect(toolName).toBeDefined();
      expect(toolName).toContain("get");
    });
  });

  describe("Origin Pool Status: 'What\\'s the status of my origin pools?'", () => {
    const query: ChatQuery = {
      userIntent: "What's the status of my origin pools?",
      searchQuery: "list origin pool",
      expectedToolPattern: "origin-pool",
      expectedScore: 0.5,
    };

    it("should find origin pool list tool", () => {
      const results = searchTools(query.searchQuery, { limit: 5 });
      const validation = validateSearchResults(query, results);

      expect(validation.passed).toBe(true);
      expect(results[0].tool.operation).toBe("list");
    });

    it("should execute origin pool list", async () => {
      const results = searchTools(query.searchQuery, { limit: 1 });

      const response = await executeTool({
        toolName: results[0].tool.name,
        pathParams: { namespace: "default" },
      });

      expect(isDocumentationResponse(response)).toBe(true);
      if (isDocumentationResponse(response)) {
        expect(response.curlExample).toContain("origin_pools");
      }
    });
  });

  describe("DNS Zone Listing: 'List my DNS zones'", () => {
    it("should find DNS zone list tool", () => {
      const results = searchTools("list dns zone", { limit: 5 });

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].tool.domain).toBe("dns");
      expect(results[0].tool.operation).toBe("list");
    });

    it("should filter to DNS domain only", () => {
      const results = searchTools("list zone", { domains: ["dns"], limit: 5 });

      expect(results.every((r) => r.tool.domain === "dns")).toBe(true);
    });
  });

  describe("WAF Policy Listing: 'Show my WAF policies'", () => {
    it("should find WAF app firewall list tool", () => {
      const results = searchTools("list waf app firewall", { limit: 5 });

      expect(results.length).toBeGreaterThan(0);
      expect(results.some((r) => r.tool.resource.includes("app-firewall"))).toBe(true);
    });

    it("should execute app firewall list", async () => {
      const results = searchTools("list app firewall", { limit: 1 });

      const response = await executeTool({
        toolName: results[0].tool.name,
        pathParams: { namespace: "default" },
      });

      expect(isDocumentationResponse(response)).toBe(true);
    });
  });

  describe("Certificate Listing: 'What certificates do I have?'", () => {
    it("should find certificate list tools", () => {
      const results = searchTools("list certificate", { limit: 5 });

      expect(results.length).toBeGreaterThan(0);
      expect(results.some((r) => r.tool.domain === "certificates")).toBe(true);
    });
  });

  describe("Consolidated Resource Discovery", () => {
    it("should find resources supporting list operation", () => {
      const results = searchConsolidatedResources("http load balancer", { limit: 5 });

      expect(results.length).toBeGreaterThan(0);
      // Find the virtual domain http-loadbalancer which has full CRUD
      const fullCrudResult = results.find(
        (r) => r.resource.resource === "http-loadbalancer" && r.resource.domain === "virtual"
      );
      expect(fullCrudResult).toBeDefined();
      expect(fullCrudResult!.resource.operations).toContain("list");
    });

    it("should show all available operations for a resource", () => {
      // Search for virtual domain origin pool which has full CRUD
      const results = searchConsolidatedResources("origin pool", { limit: 5 });
      const virtualOriginPool = results.find((r) => r.resource.domain === "virtual");

      expect(virtualOriginPool).toBeDefined();
      const ops = virtualOriginPool!.resource.operations;
      expect(ops).toContain("list");
      expect(ops).toContain("get");
    });
  });

  describe("List Operation Identification", () => {
    it("should filter to only list operations", () => {
      const results = searchTools("http load balancer", { operations: ["list"], limit: 5 });

      expect(results.every((r) => r.tool.operation === "list")).toBe(true);
    });

    it("should identify GET method for list operations", async () => {
      const results = searchTools("list origin pool", { limit: 1 });

      const response = await executeTool({
        toolName: results[0].tool.name,
        pathParams: { namespace: "default" },
      });

      expect(isDocumentationResponse(response)).toBe(true);
      if (isDocumentationResponse(response)) {
        expect(response.tool.method).toBe("GET");
      }
    });
  });
});
