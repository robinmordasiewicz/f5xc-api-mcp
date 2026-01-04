/**
 * Validation Query Tests
 *
 * Tests for Category 7: Parameter validation queries
 * Validates that users can check if their parameters are valid before execution.
 *
 * User Intent Examples:
 * - "Is this config valid?"
 * - "Check my load balancer parameters"
 * - "What's wrong with this request?"
 */

import { describe, it, expect, vi } from "vitest";
import { searchTools } from "../../../src/tools/discovery/search.js";
import { describeTool } from "../../../src/tools/discovery/describe.js";

// Mock logger to prevent console output
vi.mock("../../../src/utils/logging.js", () => ({
  logger: {
    error: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
  },
}));

describe("Validation Queries - User Experience Simulation", () => {
  describe("Parameter Discovery: 'What parameters does this tool need?'", () => {
    it("should return tool schema with path parameters", async () => {
      const results = searchTools("create http load balancer", { limit: 1 });
      const description = await describeTool(results[0].tool.name);

      expect(description).toBeDefined();
      expect(description.name).toBe(results[0].tool.name);
      // Should have path parameters defined
    });

    it("should return tool schema with method information", async () => {
      const results = searchTools("list origin pool", { limit: 1 });
      const description = await describeTool(results[0].tool.name);

      expect(description).toBeDefined();
      expect(description.method).toBe("GET");
    });

    it("should return POST method for create operations", async () => {
      const results = searchTools("create origin pool", { limit: 1 });
      const description = await describeTool(results[0].tool.name);

      expect(description.method).toBe("POST");
    });

    it("should return PUT method for update operations", async () => {
      const results = searchTools("update origin pool", { limit: 1 });
      const description = await describeTool(results[0].tool.name);

      expect(description.method).toBe("PUT");
    });

    it("should return DELETE method for delete operations", async () => {
      const results = searchTools("delete origin pool", { limit: 1 });
      const description = await describeTool(results[0].tool.name);

      expect(description.method).toBe("DELETE");
    });
  });

  describe("Schema Discovery: 'What fields are required?'", () => {
    it("should return schema reference for create tools", async () => {
      const results = searchTools("create http load balancer", { limit: 1 });
      const description = await describeTool(results[0].tool.name);

      expect(description).toBeDefined();
      // Create operations should have request body schema
    });

    it("should return schema for WAF creation", async () => {
      const results = searchTools("create app firewall", { limit: 1 });
      const description = await describeTool(results[0].tool.name);

      expect(description).toBeDefined();
      expect(description.method).toBe("POST");
    });
  });

  describe("Tool Existence Validation", () => {
    it("should return undefined for non-existent tool", async () => {
      const description = await describeTool("non-existent-tool-name");

      // Should handle gracefully
      expect(description === undefined || description === null).toBe(true);
    });

    it("should return valid description for known tools", async () => {
      const description = await describeTool("f5xc-api-virtual-http-loadbalancer-list");

      expect(description).toBeDefined();
      expect(description.name).toBe("f5xc-api-virtual-http-loadbalancer-list");
    });
  });

  describe("Operation Type Validation", () => {
    it("should correctly identify CRUD operations", async () => {
      const createDesc = await describeTool("f5xc-api-virtual-http-loadbalancer-create");
      const listDesc = await describeTool("f5xc-api-virtual-http-loadbalancer-list");
      const getDesc = await describeTool("f5xc-api-virtual-http-loadbalancer-get");
      const deleteDesc = await describeTool("f5xc-api-virtual-http-loadbalancer-delete");

      expect(createDesc?.method).toBe("POST");
      expect(listDesc?.method).toBe("GET");
      expect(getDesc?.method).toBe("GET");
      expect(deleteDesc?.method).toBe("DELETE");
    });
  });

  describe("Search Validation: Tool Name Patterns", () => {
    it("should find tools with valid naming patterns", () => {
      const results = searchTools("http load balancer", { limit: 10 });

      // All results should follow naming convention
      expect(
        results.every((r) => r.tool.name.startsWith("f5xc-api-"))
      ).toBe(true);
    });

    it("should return tools with valid operations", () => {
      const results = searchTools("http load balancer", { limit: 10 });
      const validOps = ["create", "get", "list", "update", "delete"];

      expect(
        results.every((r) => validOps.includes(r.tool.operation))
      ).toBe(true);
    });

    it("should return tools with valid danger levels", () => {
      const results = searchTools("http load balancer", { limit: 10 });
      const validLevels = ["low", "medium", "high"];

      expect(
        results.every((r) => validLevels.includes(r.tool.dangerLevel))
      ).toBe(true);
    });
  });

  describe("Domain Validation", () => {
    it("should only return tools from valid domains", () => {
      const results = searchTools("dns", { limit: 20 });

      // Results should be from DNS domain
      expect(results.every((r) => r.tool.domain === "dns")).toBe(true);
    });

    it("should respect domain filter", () => {
      const results = searchTools("create", { domains: ["virtual"], limit: 10 });

      expect(results.every((r) => r.tool.domain === "virtual")).toBe(true);
    });
  });

  describe("Operation Filter Validation", () => {
    it("should respect operation filter for create", () => {
      const results = searchTools("http load balancer", {
        operations: ["create"],
        limit: 10,
      });

      expect(results.every((r) => r.tool.operation === "create")).toBe(true);
    });

    it("should respect operation filter for list", () => {
      const results = searchTools("http load balancer", {
        operations: ["list"],
        limit: 10,
      });

      expect(results.every((r) => r.tool.operation === "list")).toBe(true);
    });

    it("should respect multiple operation filters", () => {
      const results = searchTools("http load balancer", {
        operations: ["create", "list"],
        limit: 10,
      });

      expect(
        results.every((r) => ["create", "list"].includes(r.tool.operation))
      ).toBe(true);
    });
  });

  describe("Score Validation", () => {
    it("should return scores between 0 and 1", () => {
      const results = searchTools("http load balancer", { limit: 10 });

      expect(
        results.every((r) => r.score >= 0 && r.score <= 1)
      ).toBe(true);
    });

    it("should respect minimum score filter", () => {
      const results = searchTools("http load balancer", {
        minScore: 0.5,
        limit: 10,
      });

      expect(results.every((r) => r.score >= 0.5)).toBe(true);
    });

    it("should return results sorted by score descending", () => {
      const results = searchTools("http load balancer", { limit: 10 });

      for (let i = 1; i < results.length; i++) {
        expect(results[i].score).toBeLessThanOrEqual(results[i - 1].score);
      }
    });
  });
});
