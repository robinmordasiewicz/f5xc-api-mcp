// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Discovery Query Tests
 *
 * Tests for Category 1: "What can I do?" queries
 * Validates that users can discover server capabilities through natural language.
 *
 * User Intent Examples:
 * - "What can I do with F5 XC?"
 * - "List all available operations"
 * - "Show me load balancer options"
 * - "What DNS tools are available?"
 */

import { describe, it, expect, vi } from "vitest";
import { searchTools, getAvailableDomains, getToolCountByDomain } from "../../../src/tools/discovery/search.js";
import { getConsolidatedIndex, searchConsolidatedResources } from "../../../src/tools/discovery/consolidate.js";
import { validateSearchResults, type ChatQuery } from "./utils/query-helpers.js";

// Mock logger to prevent console output
vi.mock("../../../src/utils/logging.js", () => ({
  logger: {
    error: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
  },
}));

describe("Discovery Queries - User Experience Simulation", () => {
  describe("General Discovery: 'What can I do with F5 XC?'", () => {
    it("should return multiple domains when querying general capabilities", () => {
      const domains = getAvailableDomains();

      // User expects to see various capability areas
      expect(domains.length).toBeGreaterThan(5);
      expect(domains).toContain("virtual");
      expect(domains).toContain("dns");
      expect(domains).toContain("waf");
    });

    it("should provide tool counts per domain for capability overview", () => {
      const counts = getToolCountByDomain();

      // User can see how many operations are available per area
      expect(Object.keys(counts).length).toBeGreaterThan(5);
      expect(counts["virtual"]).toBeGreaterThan(0);
      expect(counts["dns"]).toBeGreaterThan(0);
    });

    it("should return consolidated resources for simplified discovery", () => {
      const index = getConsolidatedIndex();

      // User sees consolidated resources (fewer entries to scan)
      expect(index.totalResources).toBeGreaterThan(50);
      expect(index.fullCrudResources).toBeGreaterThan(10);
    });
  });

  describe("Tool Search: 'List all available operations'", () => {
    it("should find tools with general search query", () => {
      const results = searchTools("operations", { limit: 20 });

      // User gets relevant results for generic query
      expect(results.length).toBeGreaterThan(0);
    });

    it("should categorize results by operation type using filter", () => {
      // Use operations filter for precise operation type matching
      const createResults = searchTools("http", { operations: ["create"], limit: 20 });
      const listResults = searchTools("http", { operations: ["list"], limit: 20 });
      const deleteResults = searchTools("http", { operations: ["delete"], limit: 20 });

      // Each operation type returns relevant tools when filtered
      expect(createResults.every((r) => r.tool.operation === "create")).toBe(true);
      expect(listResults.every((r) => r.tool.operation === "list")).toBe(true);
      expect(deleteResults.every((r) => r.tool.operation === "delete")).toBe(true);
    });
  });

  describe("Resource Discovery: 'Show me load balancer options'", () => {
    const query: ChatQuery = {
      userIntent: "Show me load balancer options",
      searchQuery: "http load balancer",
      expectedToolPattern: "http-loadbalancer",
      expectedScore: 0.5,
    };

    it("should find HTTP load balancer tools with high relevance", () => {
      // Use domain filter to focus on virtual domain where http-loadbalancer lives
      const results = searchTools(query.searchQuery, { domains: ["virtual"], limit: 10 });

      // Should find http-loadbalancer tools among results
      const httpLbTools = results.filter((r) => r.tool.resource.includes("http-loadbalancer"));
      expect(httpLbTools.length).toBeGreaterThan(0);
      expect(results[0].score).toBeGreaterThan(0.5);
    });

    it("should return CRUD operations for load balancer resource", () => {
      const results = searchTools("http load balancer", { limit: 20 });
      const operations = new Set(results.map((r) => r.tool.operation));

      // User can discover all available operations
      expect(operations.has("create")).toBe(true);
      expect(operations.has("list")).toBe(true);
      expect(operations.has("get")).toBe(true);
      expect(operations.has("delete")).toBe(true);
    });

    it("should find load balancer via consolidated resource search", () => {
      const results = searchConsolidatedResources("http load balancer", { limit: 5 });

      expect(results.length).toBeGreaterThan(0);
      // Search may return partial matches first; verify at least one has full CRUD
      const fullCrudResult = results.find(
        (r) => r.resource.resource === "http-loadbalancer" && r.resource.domain === "virtual"
      );
      expect(fullCrudResult).toBeDefined();
      expect(fullCrudResult!.resource.operations).toContain("create");
      expect(fullCrudResult!.resource.operations).toContain("list");
    });
  });

  describe("Domain-Specific Discovery: 'What DNS tools are available?'", () => {
    const query: ChatQuery = {
      userIntent: "What DNS tools are available?",
      searchQuery: "dns",
      expectedScore: 0.5,
    };

    it("should find DNS-related tools", () => {
      const results = searchTools(query.searchQuery, { limit: 20 });
      const validation = validateSearchResults(query, results);

      expect(validation.results.length).toBeGreaterThan(0);
      expect(results.every((r) => r.tool.domain === "dns")).toBe(true);
    });

    it("should filter by dns domain explicitly", () => {
      const results = searchTools("zone", { domains: ["dns"], limit: 10 });

      // All results are from DNS domain
      expect(results.every((r) => r.tool.domain === "dns")).toBe(true);
    });

    it("should find consolidated DNS resources", () => {
      const results = searchConsolidatedResources("dns zone", { limit: 5 });

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].resource.domain).toBe("dns");
    });
  });

  describe("WAF Discovery: 'What security features are available?'", () => {
    it("should find WAF-related tools", () => {
      const results = searchTools("waf firewall", { limit: 10 });

      expect(results.length).toBeGreaterThan(0);
      expect(results.some((r) => r.tool.domain === "waf")).toBe(true);
    });

    it("should find app firewall tools", () => {
      const results = searchTools("app firewall", { limit: 10 });

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].tool.resource).toContain("app-firewall");
    });
  });

  describe("Origin Pool Discovery: 'How do I configure backends?'", () => {
    it("should find origin pool tools", () => {
      const results = searchTools("origin pool", { limit: 10 });

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].tool.resource).toContain("origin-pool");
    });

    it("should find origin pool in virtual domain", () => {
      // Origin pools are part of the virtual domain (load balancer configuration)
      const results = searchTools("origin pool", { domains: ["virtual"], limit: 5 });

      expect(results.length).toBeGreaterThan(0);
      expect(results.every((r) => r.tool.domain === "virtual")).toBe(true);
    });
  });

  describe("Certificate Discovery: 'How do I manage certificates?'", () => {
    it("should find certificate management tools", () => {
      const results = searchTools("certificate", { limit: 10 });

      expect(results.length).toBeGreaterThan(0);
      expect(results.some((r) => r.tool.domain === "certificates")).toBe(true);
    });
  });

  describe("Search Quality: Relevance Scoring", () => {
    it("should rank exact matches higher than partial matches", () => {
      const exactResults = searchTools("http-loadbalancer", { limit: 5 });
      const partialResults = searchTools("load balancer", { limit: 5 });

      // Exact match should have high score
      expect(exactResults[0].score).toBeGreaterThanOrEqual(partialResults[0].score);
    });

    it("should boost operation-specific queries", () => {
      const createResults = searchTools("create http load balancer", { limit: 3 });
      const genericResults = searchTools("http load balancer", { limit: 3 });

      // Create-specific query should prioritize create operation
      expect(createResults[0].tool.operation).toBe("create");
    });

    it("should return matched terms for highlighting", () => {
      const results = searchTools("create http load balancer", { limit: 3 });

      expect(results[0].matchedTerms.length).toBeGreaterThan(0);
      expect(results[0].matchedTerms.some((t) => t.includes("create") || t.includes("http") || t.includes("load"))).toBe(true);
    });
  });

  describe("Filtering: Excluding Dangerous/Deprecated Operations", () => {
    it("should be able to exclude dangerous operations", () => {
      const safeResults = searchTools("delete", { excludeDangerous: true, limit: 20 });
      const allResults = searchTools("delete", { limit: 20 });

      // Safe results should have fewer or equal tools
      expect(safeResults.length).toBeLessThanOrEqual(allResults.length);

      // No high-danger tools in safe results
      expect(safeResults.every((r) => r.tool.dangerLevel !== "high")).toBe(true);
    });

    it("should be able to exclude deprecated operations", () => {
      const activeResults = searchTools("http", { excludeDeprecated: true, limit: 20 });

      // No deprecated tools in results
      expect(activeResults.every((r) => !r.tool.isDeprecated)).toBe(true);
    });
  });
});
