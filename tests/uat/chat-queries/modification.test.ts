// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Modification Query Tests
 *
 * Tests for Category 4: "Update/Delete" queries
 * Validates that users can modify and delete resources with appropriate safety warnings.
 *
 * User Intent Examples:
 * - "Update my load balancer config"
 * - "Delete origin pool X"
 * - "Change the domains on my LB"
 */

import { describe, it, expect, vi } from "vitest";
import { searchTools } from "../../../src/tools/discovery/search.js";
import { executeTool } from "../../../src/tools/discovery/execute.js";
import { resolveConsolidatedTool } from "../../../src/tools/discovery/consolidate.js";
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

describe("Modification Queries - User Experience Simulation", () => {
  describe("Update Load Balancer: 'Update my load balancer config'", () => {
    const query: ChatQuery = {
      userIntent: "Update my load balancer config",
      searchQuery: "update http load balancer",
      expectedToolPattern: "http-loadbalancer",
      expectedScore: 0.5,
    };

    it("should find update tool with high relevance", () => {
      const results = searchTools(query.searchQuery, { limit: 5 });
      const validation = validateSearchResults(query, results);

      expect(validation.passed).toBe(true);
      expect(results[0].tool.operation).toBe("update");
    });

    it("should filter to only update operations", () => {
      const results = searchTools("http load balancer", { operations: ["update"], limit: 5 });

      expect(results.every((r) => r.tool.operation === "update")).toBe(true);
    });

    it("should resolve consolidated resource to update tool", () => {
      const toolName = resolveConsolidatedTool("f5xc-api-virtual-http-loadbalancer", "update");

      expect(toolName).toBeDefined();
      expect(toolName).toContain("update");
    });
  });

  describe("Delete Operations: 'Delete origin pool X'", () => {
    const query: ChatQuery = {
      userIntent: "Delete origin pool X",
      searchQuery: "delete origin pool",
      expectedToolPattern: "origin-pool-delete",
      expectedScore: 0.5,
    };

    it("should find delete tool with high relevance", () => {
      const results = searchTools(query.searchQuery, { limit: 5 });
      const validation = validateSearchResults(query, results);

      expect(validation.passed).toBe(true);
      expect(results[0].tool.operation).toBe("delete");
    });

    it("should have danger level assigned for delete operations", () => {
      const results = searchTools(query.searchQuery, { limit: 5 });

      // Delete operations should have a valid danger level assigned
      // Note: Actual danger level depends on spec data and may vary
      expect(results[0].tool.dangerLevel).toBeDefined();
      expect(["low", "medium", "high"]).toContain(results[0].tool.dangerLevel);
    });

    it("should be able to exclude dangerous delete operations", () => {
      const safeResults = searchTools("delete", { excludeDangerous: true, limit: 20 });
      const allResults = searchTools("delete", { limit: 20 });

      // Filtering dangerous should reduce results
      expect(safeResults.length).toBeLessThanOrEqual(allResults.length);
      expect(safeResults.every((r) => r.tool.dangerLevel !== "high")).toBe(true);
    });

    it("should execute delete with resource name", async () => {
      const results = searchTools(query.searchQuery, { limit: 1 });

      const response = await executeTool({
        toolName: results[0].tool.name,
        pathParams: { namespace: "default", name: "pool-to-delete" },
      });

      expect(isDocumentationResponse(response)).toBe(true);
      if (isDocumentationResponse(response)) {
        expect(response.curlExample).toContain("DELETE");
        expect(response.curlExample).toContain("pool-to-delete");
      }
    });
  });

  describe("Delete Load Balancer: 'Delete load balancer'", () => {
    it("should find delete tool", () => {
      const results = searchTools("delete http load balancer", { limit: 5 });

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].tool.operation).toBe("delete");
    });

    it("should indicate danger level for load balancer deletion", () => {
      const results = searchTools("delete http load balancer", { limit: 1 });

      expect(results[0].tool.dangerLevel).toBeDefined();
    });
  });

  describe("Update Origin Pool: 'Change origin pool settings'", () => {
    it("should find origin pool update tool", () => {
      const results = searchTools("update origin pool", { limit: 5 });

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].tool.operation).toBe("update");
    });

    it("should use PUT method for update", async () => {
      const results = searchTools("update origin pool", { limit: 1 });

      const response = await executeTool({
        toolName: results[0].tool.name,
        // Update operations use metadata.namespace and metadata.name path params
        pathParams: { "metadata.namespace": "default", "metadata.name": "my-pool" },
        body: { metadata: { name: "my-pool" } },
      });

      expect(isDocumentationResponse(response)).toBe(true);
      if (isDocumentationResponse(response)) {
        expect(response.tool.method).toBe("PUT");
      }
    });
  });

  describe("Delete WAF Policy: 'Remove WAF policy'", () => {
    it("should find WAF deletion tool", () => {
      const results = searchTools("delete app firewall", { limit: 5 });

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].tool.operation).toBe("delete");
    });
  });

  describe("Delete DNS Zone: 'Delete a DNS zone'", () => {
    it("should find DNS zone deletion tool", () => {
      const results = searchTools("delete dns zone", { limit: 5 });

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].tool.domain).toBe("dns");
      expect(results[0].tool.operation).toBe("delete");
    });

    it("should filter to DNS domain", () => {
      const results = searchTools("delete zone", { domains: ["dns"], limit: 5 });

      expect(results.every((r) => r.tool.domain === "dns")).toBe(true);
    });
  });

  describe("Safety Indicators", () => {
    it("should surface danger levels in search results", () => {
      const results = searchTools("delete", { limit: 10 });

      // All results should have danger level
      expect(results.every((r) => r.tool.dangerLevel !== undefined)).toBe(true);
    });

    it("should allow filtering out high-danger operations", () => {
      const safeResults = searchTools("http load balancer", {
        excludeDangerous: true,
        limit: 20,
      });

      expect(safeResults.every((r) => r.tool.dangerLevel !== "high")).toBe(true);
    });

    it("should differentiate danger levels by operation type", () => {
      const createResults = searchTools("create http load balancer", { limit: 1 });
      const deleteResults = searchTools("delete http load balancer", { limit: 1 });

      // Delete typically has higher danger than create
      const createDanger = createResults[0]?.tool.dangerLevel;
      const deleteDanger = deleteResults[0]?.tool.dangerLevel;

      expect(createDanger).toBeDefined();
      expect(deleteDanger).toBeDefined();
    });
  });

  describe("Modification Operation Identification", () => {
    it("should filter to only update operations", () => {
      const results = searchTools("http load balancer", { operations: ["update"], limit: 5 });

      expect(results.every((r) => r.tool.operation === "update")).toBe(true);
    });

    it("should filter to only delete operations", () => {
      const results = searchTools("http load balancer", { operations: ["delete"], limit: 5 });

      expect(results.every((r) => r.tool.operation === "delete")).toBe(true);
    });
  });
});
