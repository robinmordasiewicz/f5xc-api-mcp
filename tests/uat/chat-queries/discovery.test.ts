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

      // User expects to see various capability areas (30+ domains)
      expect(domains.length).toBeGreaterThan(30);

      // Each domain should be a valid string
      domains.forEach((domain) => {
        expect(typeof domain).toBe("string");
        expect(domain.length).toBeGreaterThan(0);
      });
    });

    it("should provide tool counts per domain for capability overview", () => {
      const counts = getToolCountByDomain();

      // User can see how many operations are available per area
      expect(Object.keys(counts).length).toBeGreaterThan(30);

      // Each domain should have at least one tool
      Object.values(counts).forEach((count) => {
        expect(count).toBeGreaterThan(0);
      });
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

  describe("Domain Filtering: 'Can I filter by domain?'", () => {
    it("should filter tools by domain when explicitly specified", () => {
      // Get any available domain dynamically
      const allDomains = getAvailableDomains();
      expect(allDomains.length).toBeGreaterThan(0);

      const testDomain = allDomains[0];

      // Search with domain filter using generic term "list"
      const results = searchTools("list", { domains: [testDomain], limit: 20 });

      // All results should be from the specified domain
      expect(results.length).toBeGreaterThan(0);
      expect(results.every((r) => r.tool.domain === testDomain)).toBe(true);
    });

    it("should find consolidated resources filtered by domain", () => {
      // Test with first available domain
      const allDomains = getAvailableDomains();
      const testDomain = allDomains[0];

      const results = searchConsolidatedResources("resource", { domains: [testDomain], limit: 10 });

      if (results.length > 0) {
        expect(results.every((r) => r.resource.domain === testDomain)).toBe(true);
      }
    });
  });

  describe("Resource Discovery: 'Can I search for specific resources?'", () => {
    it("should find tools by resource name", () => {
      // Get any available resource dynamically using generic search
      const allTools = searchTools("list", { limit: 100 });
      expect(allTools.length).toBeGreaterThan(0);

      const testResource = allTools[0].tool.resource;

      // Search for that specific resource
      const results = searchTools(testResource, { limit: 10 });

      expect(results.length).toBeGreaterThan(0);
      expect(results.some((r) => r.tool.resource === testResource)).toBe(true);
    });

    it("should respect domain filter when searching resources", () => {
      // Get first available domain and its tools
      const allDomains = getAvailableDomains();
      const testDomain = allDomains[0];

      const domainTools = searchTools("create", { domains: [testDomain], limit: 100 });

      if (domainTools.length > 0) {
        const testResource = domainTools[0].tool.resource;

        // Search with domain filter
        const results = searchTools(testResource, { domains: [testDomain], limit: 5 });

        expect(results.length).toBeGreaterThan(0);
        expect(results.every((r) => r.tool.domain === testDomain)).toBe(true);
      }
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
