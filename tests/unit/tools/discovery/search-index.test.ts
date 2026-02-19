// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

import { describe, it, expect, beforeEach } from "vitest";
import {
  buildSearchIndex,
  searchIndex,
  filterByDomain,
  filterByOperation,
  getIndexStats,
  levenshteinDistance,
  type SearchIndex,
} from "../../../../src/tools/discovery/search-index.js";
import type { ToolIndexEntry } from "../../../../src/tools/discovery/types.js";

describe("Search Index", () => {
  // Sample tool data for testing
  const sampleTools: ToolIndexEntry[] = [
    {
      name: "virtual_http-loadbalancer_create",
      domain: "virtual",
      resource: "http-loadbalancer",
      operation: "create",
      summary: "Create an HTTP load balancer with routing rules",
      dangerLevel: "low",
    },
    {
      name: "virtual_origin-pool_create",
      domain: "virtual",
      resource: "origin-pool",
      operation: "create",
      summary: "Create an origin pool for backend servers",
      dangerLevel: "low",
    },
    {
      name: "virtual_http-loadbalancer_list",
      domain: "virtual",
      resource: "http-loadbalancer",
      operation: "list",
      summary: "List all HTTP load balancers",
      dangerLevel: "low",
    },
    {
      name: "waap_bot-defense_create",
      domain: "waap",
      resource: "bot-defense",
      operation: "create",
      summary: "Create bot defense policy for application protection",
      dangerLevel: "medium",
    },
    {
      name: "waap_waf-policy_update",
      domain: "waap",
      resource: "waf-policy",
      operation: "update",
      summary: "Update WAF policy configuration",
      dangerLevel: "medium",
    },
  ];

  let index: SearchIndex;

  beforeEach(() => {
    index = buildSearchIndex(sampleTools);
  });

  describe("levenshteinDistance", () => {
    it("should calculate distance for identical strings", () => {
      expect(levenshteinDistance("hello", "hello")).toBe(0);
    });

    it("should calculate distance for single character difference", () => {
      expect(levenshteinDistance("hello", "hallo")).toBe(1);
      expect(levenshteinDistance("hello", "hell")).toBe(1);
      expect(levenshteinDistance("hello", "helloo")).toBe(1);
    });

    it("should calculate distance for multiple differences", () => {
      expect(levenshteinDistance("hello", "hxllx")).toBe(2);
      expect(levenshteinDistance("kitten", "sitting")).toBe(3);
    });

    it("should handle empty strings", () => {
      expect(levenshteinDistance("", "")).toBe(0);
      expect(levenshteinDistance("hello", "")).toBe(5);
      expect(levenshteinDistance("", "hello")).toBe(5);
    });
  });

  describe("buildSearchIndex", () => {
    it("should create index with all components", () => {
      expect(index.terms).toBeInstanceOf(Map);
      expect(index.domains).toBeInstanceOf(Map);
      expect(index.operations).toBeInstanceOf(Map);
      expect(index.toolsById).toBeInstanceOf(Map);
      expect(index.buildTime).toBeGreaterThan(0);
    });

    it("should index all tools by ID", () => {
      expect(index.toolsById.size).toBe(5);
      expect(index.toolsById.has("virtual_http-loadbalancer_create")).toBe(true);
      expect(index.toolsById.has("waap_bot-defense_create")).toBe(true);
    });

    it("should index tools by domain", () => {
      expect(index.domains.has("virtual")).toBe(true);
      expect(index.domains.has("waap")).toBe(true);

      const virtualTools = index.domains.get("virtual");
      expect(virtualTools?.size).toBe(3);
      expect(virtualTools?.has("virtual_http-loadbalancer_create")).toBe(true);
    });

    it("should index tools by operation", () => {
      expect(index.operations.has("create")).toBe(true);
      expect(index.operations.has("list")).toBe(true);
      expect(index.operations.has("update")).toBe(true);

      const createTools = index.operations.get("create");
      expect(createTools?.size).toBe(3);
    });

    it("should index searchable terms", () => {
      expect(index.terms.size).toBeGreaterThan(0);

      // Should index "http" from "http-loadbalancer"
      expect(index.terms.has("http")).toBe(true);
      const httpTools = index.terms.get("http");
      expect(httpTools?.has("virtual_http-loadbalancer_create")).toBe(true);

      // Should index "load" and "balancer" from "loadbalancer"
      expect(index.terms.has("loadbalancer")).toBe(true);
    });

    it("should normalize terms consistently", () => {
      // "http-loadbalancer" should be indexed as "http" and "loadbalancer"
      expect(index.terms.has("http")).toBe(true);
      expect(index.terms.has("loadbalancer")).toBe(true);

      // Should not have hyphenated or special characters
      expect(index.terms.has("http-loadbalancer")).toBe(false);
    });

    it("should respect minimum term length", () => {
      const customIndex = buildSearchIndex(sampleTools, { minTermLength: 4 });

      // Terms with length < 4 should not be indexed
      expect(customIndex.terms.has("waf")).toBe(false); // length 3
      expect(customIndex.terms.has("http")).toBe(true); // length 4 should be included
    });
  });

  describe("searchIndex", () => {
    it("should find exact term matches", () => {
      const results = searchIndex(index, ["http"]);

      expect(results.size).toBeGreaterThan(0);
      expect(results.has("virtual_http-loadbalancer_create")).toBe(true);
      expect(results.has("virtual_http-loadbalancer_list")).toBe(true);
    });

    it("should score exact matches higher", () => {
      const results = searchIndex(index, ["http", "loadbalancer"]);

      const httpLbCreateScore = results.get("virtual_http-loadbalancer_create") ?? 0;
      const botDefenseScore = results.get("waap_bot-defense_create") ?? 0;

      expect(httpLbCreateScore).toBeGreaterThan(botDefenseScore);
    });

    it("should find multiple term matches", () => {
      const results = searchIndex(index, ["http", "create"]);

      expect(results.has("virtual_http-loadbalancer_create")).toBe(true);

      const httpLbScore = results.get("virtual_http-loadbalancer_create") ?? 0;
      expect(httpLbScore).toBeGreaterThan(1); // Should have at least 2 points (http + create)
    });

    it("should support fuzzy matching by default", () => {
      // "htp" should match "http" with edit distance 1
      const results = searchIndex(index, ["htp"]);

      expect(results.size).toBeGreaterThan(0);
      expect(results.has("virtual_http-loadbalancer_create")).toBe(true);
    });

    it("should respect max edit distance", () => {
      // "xyz" should not match anything within default distance of 2
      const results = searchIndex(index, ["xyz"]);

      expect(results.size).toBe(0);
    });

    it("should support prefix matching", () => {
      // "load" should match "loadbalancer" as prefix
      const results = searchIndex(index, ["load"]);

      expect(results.size).toBeGreaterThan(0);
      expect(results.has("virtual_http-loadbalancer_create")).toBe(true);
    });

    it("should skip very short terms", () => {
      const results = searchIndex(index, ["a"]);

      // Single character terms should be skipped (below minTermLength=2)
      expect(results.size).toBe(0);
    });

    it("should handle empty query", () => {
      const results = searchIndex(index, []);

      expect(results.size).toBe(0);
    });

    it("should allow disabling fuzzy matching", () => {
      // "htp" should NOT match when fuzzy is disabled
      const results = searchIndex(index, ["htp"], { enableFuzzy: false });

      expect(results.size).toBe(0);
    });

    it("should accumulate scores for multiple matches", () => {
      const results = searchIndex(index, ["http", "http", "http"]);

      const httpLbScore = results.get("virtual_http-loadbalancer_create") ?? 0;

      // Should accumulate score from multiple "http" matches
      expect(httpLbScore).toBeGreaterThan(2);
    });
  });

  describe("filterByDomain", () => {
    it("should filter tools by single domain", () => {
      const virtualTools = filterByDomain(index, ["virtual"]);

      expect(virtualTools.size).toBe(3);
      expect(virtualTools.has("virtual_http-loadbalancer_create")).toBe(true);
      expect(virtualTools.has("virtual_origin-pool_create")).toBe(true);
      expect(virtualTools.has("waap_bot-defense_create")).toBe(false);
    });

    it("should filter tools by multiple domains", () => {
      const tools = filterByDomain(index, ["virtual", "waap"]);

      expect(tools.size).toBe(5); // All sample tools
    });

    it("should handle non-existent domains", () => {
      const tools = filterByDomain(index, ["nonexistent"]);

      expect(tools.size).toBe(0);
    });

    it("should be case insensitive", () => {
      const tools = filterByDomain(index, ["VIRTUAL", "Virtual"]);

      expect(tools.size).toBe(3);
    });

    it("should handle empty domain list", () => {
      const tools = filterByDomain(index, []);

      expect(tools.size).toBe(0);
    });
  });

  describe("filterByOperation", () => {
    it("should filter tools by single operation", () => {
      const createTools = filterByOperation(index, ["create"]);

      expect(createTools.size).toBe(3);
      expect(createTools.has("virtual_http-loadbalancer_create")).toBe(true);
      expect(createTools.has("waap_bot-defense_create")).toBe(true);
      expect(createTools.has("virtual_http-loadbalancer_list")).toBe(false);
    });

    it("should filter tools by multiple operations", () => {
      const tools = filterByOperation(index, ["create", "list"]);

      expect(tools.size).toBe(4); // 3 create + 1 list
    });

    it("should handle non-existent operations", () => {
      const tools = filterByOperation(index, ["delete"]);

      expect(tools.size).toBe(0);
    });

    it("should be case insensitive", () => {
      const tools = filterByOperation(index, ["CREATE"]);

      expect(tools.size).toBe(3);
    });

    it("should handle empty operation list", () => {
      const tools = filterByOperation(index, []);

      expect(tools.size).toBe(0);
    });
  });

  describe("getIndexStats", () => {
    it("should return correct statistics", () => {
      const stats = getIndexStats(index);

      expect(stats.totalTools).toBe(5);
      expect(stats.totalTerms).toBeGreaterThan(0);
      expect(stats.totalDomains).toBe(2); // virtual, waap
      expect(stats.totalOperations).toBe(3); // create, list, update
      expect(stats.avgTermsPerTool).toBeGreaterThan(0);
      expect(stats.buildTime).toBeGreaterThan(0);
      expect(stats.ageMs).toBeGreaterThanOrEqual(0);
    });

    it("should calculate average terms per tool", () => {
      const stats = getIndexStats(index);

      expect(stats.avgTermsPerTool).toBeGreaterThan(1);
      expect(stats.avgTermsPerTool).toBeLessThan(100);
    });

    it("should handle empty index", () => {
      const emptyIndex = buildSearchIndex([]);
      const stats = getIndexStats(emptyIndex);

      expect(stats.totalTools).toBe(0);
      expect(stats.totalTerms).toBe(0);
      expect(stats.totalDomains).toBe(0);
      expect(stats.totalOperations).toBe(0);
      expect(stats.avgTermsPerTool).toBe(0);
    });
  });

  describe("Performance", () => {
    it("should handle large index efficiently", () => {
      // Create a large tool set
      const largeToolSet: ToolIndexEntry[] = [];
      for (let i = 0; i < 1000; i++) {
        largeToolSet.push({
          name: `tool_${i}`,
          domain: `domain_${i % 10}`,
          resource: `resource_${i % 20}`,
          operation: ["create", "list", "update", "delete"][i % 4] as string,
          summary: `Tool ${i} for testing performance`,
          dangerLevel: "low",
            });
      }

      const startBuild = Date.now();
      const largeIndex = buildSearchIndex(largeToolSet);
      const buildTime = Date.now() - startBuild;

      expect(buildTime).toBeLessThan(1000); // Should build in under 1 second

      const startSearch = Date.now();
      const results = searchIndex(largeIndex, ["testing", "performance"]);
      const searchTime = Date.now() - startSearch;

      expect(searchTime).toBeLessThan(50); // Should search in under 50ms
      expect(results.size).toBeGreaterThan(0);
    });

    it("should filter large index efficiently", () => {
      const largeToolSet: ToolIndexEntry[] = [];
      for (let i = 0; i < 1000; i++) {
        largeToolSet.push({
          name: `tool_${i}`,
          domain: `domain_${i % 10}`,
          resource: `resource_${i}`,
          operation: "create",
          summary: "Test tool",
          dangerLevel: "low",
            });
      }

      const largeIndex = buildSearchIndex(largeToolSet);

      const startFilter = Date.now();
      const filtered = filterByDomain(largeIndex, ["domain_0", "domain_1"]);
      const filterTime = Date.now() - startFilter;

      expect(filterTime).toBeLessThan(10); // Should filter in under 10ms
      expect(filtered.size).toBe(200); // 100 per domain
    });
  });

  describe("Integration", () => {
    it("should combine search and filtering", () => {
      // Search for "http" AND filter by "virtual" domain
      const searchResults = searchIndex(index, ["http"]);
      const domainFilter = filterByDomain(index, ["virtual"]);

      // Intersection of search results and domain filter
      const combined = new Set<string>();
      for (const toolId of searchResults.keys()) {
        if (domainFilter.has(toolId)) {
          combined.add(toolId);
        }
      }

      expect(combined.size).toBeGreaterThan(0);
      expect(combined.has("virtual_http-loadbalancer_create")).toBe(true);
      expect(combined.has("waap_bot-defense_create")).toBe(false);
    });

    it("should retrieve full tool data after search", () => {
      const results = searchIndex(index, ["http"]);

      for (const toolId of results.keys()) {
        const tool = index.toolsById.get(toolId);
        expect(tool).toBeDefined();
        expect(tool?.name).toBe(toolId);
      }
    });
  });
});
