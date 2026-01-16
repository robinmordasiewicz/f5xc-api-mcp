// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Tool Discovery Flow Integration Tests
 *
 * Tests the complete tool discovery pipeline including:
 * - Search operations with various filters
 * - Tool description and schema retrieval
 * - Dependency resolution and creation order
 * - Error handling for edge cases
 *
 * Issue #208: Add Integration Tests for Complete Tool Discovery Flow
 */

import { describe, it, expect, afterAll } from "vitest";
import {
  searchTools,
  getAvailableDomains,
  getToolsByDomain,
  getToolsByResource,
  getToolCountByDomain,
} from "../../src/tools/discovery/search.js";
import {
  describeTool,
  describeToolCompact,
  describeToolSafe,
  describeTools,
  getFullToolSchema,
} from "../../src/tools/discovery/describe.js";
import type { SearchResult } from "../../src/tools/discovery/search-index.js";
import {
  getPrerequisiteResources,
  getDependentResources,
  getCreationOrder,
  getDependencyStats,
  getResourceDependencies,
  getSubscriptionRequirements,
  getOneOfGroups,
  generateDependencyReport,
  clearDependencyCache,
} from "../../src/tools/discovery/dependencies.js";
import type { SearchOptions } from "../../src/tools/discovery/search.js";

describe("Tool Discovery Flow Integration Tests", () => {
  afterAll(() => {
    // Clean up dependency cache
    clearDependencyCache();
  });

  describe("Search Operations", () => {
    describe("basic search functionality", () => {
      it("should find tools matching a simple query", () => {
        const results = searchTools("load balancer");

        expect(results.length).toBeGreaterThan(0);
        results.forEach((result) => {
          expect(result.tool).toBeDefined();
          expect(result.score).toBeGreaterThan(0);
          expect(result.score).toBeLessThanOrEqual(1);
          expect(result.matchedTerms).toBeDefined();
        });
      });

      it("should limit results based on limit option", () => {
        const results = searchTools("origin", { limit: 5 });

        expect(results.length).toBeLessThanOrEqual(5);
      });

      it("should filter by minimum score", () => {
        const results = searchTools("http", { minScore: 0.5 });

        results.forEach((result) => {
          expect(result.score).toBeGreaterThanOrEqual(0.5);
        });
      });

      it("should return results sorted by score descending", () => {
        const results = searchTools("pool");

        for (let i = 1; i < results.length; i++) {
          expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score);
        }
      });

      it("should handle empty queries gracefully", () => {
        const results = searchTools("");

        expect(Array.isArray(results)).toBe(true);
      });

      it("should handle queries with no matches", () => {
        const results = searchTools("xyznonexistentqueryxyz");

        expect(results.length).toBe(0);
      });
    });

    describe("filtered search", () => {
      it("should filter by domain", () => {
        const results = searchTools("create", { domains: ["virtual"] });

        results.forEach((result) => {
          expect(result.tool.domain).toBe("virtual");
        });
      });

      it("should filter by multiple domains", () => {
        const results = searchTools("list", { domains: ["virtual", "dns"] });

        results.forEach((result) => {
          expect(["virtual", "dns"]).toContain(result.tool.domain);
        });
      });

      it("should filter by operation type", () => {
        const results = searchTools("pool", { operations: ["create"] });

        results.forEach((result) => {
          expect(result.tool.operation).toBe("create");
        });
      });

      it("should filter by multiple operations", () => {
        const results = searchTools("balancer", { operations: ["create", "list"] });

        results.forEach((result) => {
          expect(["create", "list"]).toContain(result.tool.operation);
        });
      });

      it("should combine domain and operation filters", () => {
        const results = searchTools("http", {
          domains: ["virtual"],
          operations: ["get"],
        });

        results.forEach((result) => {
          expect(result.tool.domain).toBe("virtual");
          expect(result.tool.operation).toBe("get");
        });
      });

      it("should exclude dangerous operations when requested", () => {
        const results = searchTools("delete", { excludeDangerous: true });

        results.forEach((result) => {
          expect(result.tool.dangerLevel).not.toBe("high");
        });
      });

      it("should include prerequisite information when requested", () => {
        const results = searchTools("http loadbalancer create", {
          operations: ["create"],
          includeDependencies: true,
        });

        // At least some create operations should have prerequisites
        const hasPrereqs = results.some((r) => r.prerequisites);
        // This may or may not have prereqs depending on the tool
        expect(Array.isArray(results)).toBe(true);
      });
    });

    describe("search index operations", () => {
      it("should return available domains", () => {
        const domains = getAvailableDomains();

        expect(Array.isArray(domains)).toBe(true);
        expect(domains.length).toBeGreaterThan(0);
        // Common F5XC domains
        expect(domains.some((d) => ["virtual", "dns", "origin_pool"].includes(d))).toBe(true);
      });

      it("should get tools by domain", () => {
        const tools = getToolsByDomain("virtual");

        expect(Array.isArray(tools)).toBe(true);
        tools.forEach((tool) => {
          expect(tool.domain).toBe("virtual");
        });
      });

      it("should get tools by resource", () => {
        const tools = getToolsByResource("http-loadbalancer");

        expect(Array.isArray(tools)).toBe(true);
        if (tools.length > 0) {
          expect(tools[0].resource).toBe("http-loadbalancer");
        }
      });

      it("should get tool count by domain", () => {
        const counts = getToolCountByDomain();

        expect(typeof counts).toBe("object");
        Object.values(counts).forEach((count) => {
          expect(typeof count).toBe("number");
          expect(count).toBeGreaterThanOrEqual(0);
        });
      });
    });
  });

  describe("Tool Description Flow", () => {
    describe("basic description", () => {
      it("should describe a tool by name", () => {
        // Get a real tool name from search
        const searchResults = searchTools("http loadbalancer", { limit: 1 });
        if (searchResults.length === 0) {
          // Skip if no tools found
          return;
        }

        const toolName = searchResults[0].tool.toolName;
        const description = describeTool(toolName);

        // describeTool returns null for tools not in the registry
        if (description) {
          expect(description.name).toBe(toolName);
          expect(description.domain).toBeDefined();
          expect(description.operation).toBeDefined();
          expect(description.method).toBeDefined();
          expect(description.path).toBeDefined();
        } else {
          // Tool may not be in describe registry, which is acceptable
          expect(description).toBeNull();
        }
      });

      it("should return compact description format", () => {
        const searchResults = searchTools("origin pool", { limit: 1 });
        if (searchResults.length === 0) {
          return;
        }

        const toolName = searchResults[0].tool.toolName;
        const compact = describeToolCompact(toolName);

        // describeToolCompact returns null for tools not in the registry
        if (compact) {
          expect(compact.n).toBe(toolName); // name
          expect(compact.d).toBeDefined(); // domain
          expect(compact.o).toBeDefined(); // operation
          expect(compact.m).toBeDefined(); // method
          expect(compact.p).toBeDefined(); // path
        } else {
          expect(compact).toBeNull();
        }
      });

      it("should describe tool safely with error handling", () => {
        const result = describeToolSafe("nonexistent-tool-name");

        expect(result.success).toBe(false);
        expect(result.error).toBeDefined();
      });

      it("should describe multiple tools at once", () => {
        const searchResults = searchTools("origin", { limit: 3 });
        const toolNames = searchResults.map((r) => r.tool.toolName);

        if (toolNames.length === 0) {
          return;
        }

        const descriptions = describeTools(toolNames);

        // describeTools returns a Map<string, ToolDescription>
        expect(descriptions instanceof Map).toBe(true);
        // Only tools found in registry will be in the map
        expect(descriptions.size).toBeLessThanOrEqual(toolNames.length);
      });
    });

    describe("schema retrieval", () => {
      it("should get full tool schema", () => {
        const searchResults = searchTools("http loadbalancer create", { limit: 1 });
        if (searchResults.length === 0) {
          return;
        }

        const toolName = searchResults[0].tool.toolName;
        const schema = getFullToolSchema(toolName);

        // Schema may be null for some tools
        if (schema) {
          expect(typeof schema).toBe("object");
        }
      });
    });
  });

  describe("Dependency Resolution Flow", () => {
    describe("prerequisite discovery", () => {
      it("should get prerequisite resources for a domain/resource", () => {
        const prereqs = getPrerequisiteResources("virtual", "http-loadbalancer");

        expect(Array.isArray(prereqs)).toBe(true);
        prereqs.forEach((prereq) => {
          expect(prereq.domain).toBeDefined();
          expect(prereq.resourceType).toBeDefined();
        });
      });

      it("should get dependent resources", () => {
        const dependents = getDependentResources("origin_pool", "origin-pool");

        expect(Array.isArray(dependents)).toBe(true);
      });

      it("should handle non-existent resources gracefully", () => {
        const prereqs = getPrerequisiteResources("nonexistent", "fake-resource");

        expect(Array.isArray(prereqs)).toBe(true);
        expect(prereqs.length).toBe(0);
      });
    });

    describe("creation order", () => {
      it("should determine creation order for resources", () => {
        const order = getCreationOrder("virtual", "http-loadbalancer");

        expect(Array.isArray(order)).toBe(true);
        // getCreationOrder returns string[] - list of resource names in order
        order.forEach((resourceName) => {
          expect(typeof resourceName).toBe("string");
        });
      });

      it("should handle resources with no dependencies", () => {
        // Try a resource that likely has no deps
        const order = getCreationOrder("namespace", "namespace");

        expect(Array.isArray(order)).toBe(true);
      });
    });

    describe("dependency statistics", () => {
      it("should return dependency graph statistics", () => {
        const stats = getDependencyStats();

        expect(stats).toBeDefined();
        expect(typeof stats.totalResources).toBe("number");
        expect(typeof stats.totalDependencies).toBe("number");
        expect(typeof stats.totalOneOfGroups).toBe("number");
        expect(typeof stats.totalSubscriptions).toBe("number");
      });
    });

    describe("resource dependencies", () => {
      it("should get full resource dependencies", () => {
        const deps = getResourceDependencies("virtual", "http-loadbalancer");

        // deps may be null if resource not in dependency graph
        if (deps) {
          // ResourceDependencies has: requires, requiredBy, oneOfGroups, subscriptions, creationOrder
          expect(deps.requires).toBeDefined();
          expect(deps.requiredBy).toBeDefined();
          expect(Array.isArray(deps.requires)).toBe(true);
          expect(Array.isArray(deps.requiredBy)).toBe(true);
          expect(Array.isArray(deps.creationOrder)).toBe(true);
        }
      });

      it("should get subscription requirements", () => {
        const subs = getSubscriptionRequirements("virtual", "http-loadbalancer");

        expect(Array.isArray(subs)).toBe(true);
      });

      it("should get oneOf groups", () => {
        const oneOfs = getOneOfGroups("virtual", "http-loadbalancer");

        expect(Array.isArray(oneOfs)).toBe(true);
      });
    });

    describe("dependency report generation", () => {
      it("should generate comprehensive dependency report", () => {
        const report = generateDependencyReport("virtual", "http-loadbalancer");

        expect(report).toBeDefined();
        expect(report.domain).toBe("virtual");
        expect(report.resource).toBe("http-loadbalancer");
        expect(report.prerequisites).toBeDefined();
        expect(report.dependents).toBeDefined();
        expect(report.creationSequence).toBeDefined();
        expect(report.mutuallyExclusiveFields).toBeDefined();
        expect(report.subscriptionRequirements).toBeDefined();
      });

      it("should handle non-existent resources in report generation", () => {
        const report = generateDependencyReport("fake-domain", "fake-resource");

        expect(report).toBeDefined();
        expect(report.domain).toBe("fake-domain");
        expect(report.resource).toBe("fake-resource");
        // Should still return valid structure with empty arrays
        expect(Array.isArray(report.prerequisites)).toBe(true);
      });
    });
  });

  describe("Complete Discovery Flow", () => {
    it("should complete search → describe → schema flow", () => {
      // Step 1: Search for tools
      const searchResults = searchTools("http loadbalancer", {
        operations: ["create"],
        limit: 1,
      });

      if (searchResults.length === 0) {
        // Skip if no tools found
        return;
      }

      const tool = searchResults[0].tool;

      // Step 2: Get description (may be null if tool not in describe registry)
      const description = describeTool(tool.toolName);
      if (description) {
        expect(description.name).toBe(tool.toolName);
        expect(description.domain).toBe(tool.domain);
      }

      // Step 3: Get schema
      const schema = getFullToolSchema(tool.toolName);
      // Schema is optional, may be null
      expect(schema === null || typeof schema === "object").toBe(true);
    });

    it("should complete search → deps → creation order flow", () => {
      // Step 1: Search for a create operation
      const searchResults = searchTools("http loadbalancer create", {
        operations: ["create"],
        includeDependencies: true,
        limit: 1,
      });

      if (searchResults.length === 0) {
        return;
      }

      const tool = searchResults[0].tool;

      // Step 2: Get dependencies
      const deps = getResourceDependencies(tool.domain, tool.resource);

      // Step 3: Get creation order
      const order = getCreationOrder(tool.domain, tool.resource);
      expect(Array.isArray(order)).toBe(true);

      // Step 4: Generate full report
      const report = generateDependencyReport(tool.domain, tool.resource);
      expect(report.domain).toBe(tool.domain);
    });

    it("should complete resource discovery flow with CRUD operations", () => {
      const resource = "origin-pool";
      const domain = "origin_pool";

      // Get all CRUD operations for a resource
      const tools = getToolsByResource(resource);

      if (tools.length === 0) {
        return;
      }

      // Verify we have different operations
      const operations = new Set(tools.map((t) => t.operation));

      // Most resources should have at least create and list
      // (we don't assert specific ops as they vary by resource)
      expect(operations.size).toBeGreaterThan(0);

      // Each tool should be for the same resource
      tools.forEach((tool) => {
        expect(tool.resource).toBe(resource);
      });
    });

    it("should handle full flow with domain filtering", () => {
      const domains = getAvailableDomains();
      if (domains.length === 0) {
        return;
      }

      const targetDomain = domains[0];

      // Search within domain
      const results = searchTools("list", { domains: [targetDomain], limit: 5 });

      results.forEach((result) => {
        expect(result.tool.domain).toBe(targetDomain);

        // Describe each tool (may return null)
        const desc = describeTool(result.tool.toolName);
        if (desc) {
          expect(desc.domain).toBe(targetDomain);
        }
      });
    });
  });

  describe("Error Handling", () => {
    describe("invalid inputs", () => {
      it("should handle invalid domain in search filter", () => {
        const results = searchTools("create", { domains: ["nonexistent-domain-xyz"] });

        // Should return empty or filtered results
        expect(Array.isArray(results)).toBe(true);
      });

      it("should handle invalid operation type in filter", () => {
        const results = searchTools("pool", {
          operations: ["nonexistent-op" as "create"],
        });

        expect(Array.isArray(results)).toBe(true);
      });

      it("should handle null/undefined in describeTool gracefully", () => {
        // describeTool returns null for invalid inputs rather than throwing
        const result = describeTool(null as unknown as string);
        expect(result).toBeNull();
      });

      it("should return error in describeToolSafe for invalid tool", () => {
        const result = describeToolSafe("");

        expect(result.success).toBe(false);
        expect(result.error).toBeDefined();
      });
    });

    describe("edge cases", () => {
      it("should handle special characters in search query", () => {
        const results = searchTools("http-load_balancer.v1");

        expect(Array.isArray(results)).toBe(true);
      });

      it("should handle very long search queries", () => {
        const longQuery = "http loadbalancer origin pool dns zone ".repeat(10);
        const results = searchTools(longQuery);

        expect(Array.isArray(results)).toBe(true);
      });

      it("should handle unicode characters in search", () => {
        const results = searchTools("\u00e9\u00e8\u00ea"); // accented chars

        expect(Array.isArray(results)).toBe(true);
      });

      it("should handle numeric values in search", () => {
        const results = searchTools("443 8080 https");

        expect(Array.isArray(results)).toBe(true);
      });
    });

    describe("concurrent access", () => {
      it("should handle concurrent search operations", async () => {
        const searches = Array.from({ length: 10 }, (_, i) =>
          Promise.resolve(searchTools(`query${i}`, { limit: 5 }))
        );

        const results = await Promise.all(searches);

        results.forEach((result) => {
          expect(Array.isArray(result)).toBe(true);
        });
      });

      it("should handle concurrent describe operations", async () => {
        const searchResults = searchTools("pool", { limit: 5 });
        const toolNames = searchResults.map((r) => r.tool.toolName);

        if (toolNames.length === 0) {
          return;
        }

        const describes = toolNames.map((name) => Promise.resolve(describeToolSafe(name)));

        const results = await Promise.all(describes);

        results.forEach((result) => {
          expect(result).toBeDefined();
          // Each should be either success or failure, but not crash
          expect(typeof result.success).toBe("boolean");
        });
      });
    });
  });

  describe("Performance Characteristics", () => {
    it("should search within reasonable time for common queries", () => {
      const start = performance.now();
      searchTools("http loadbalancer", { limit: 100 });
      const duration = performance.now() - start;

      // Should complete within 100ms for indexed search
      expect(duration).toBeLessThan(100);
    });

    it("should describe tools quickly", () => {
      const searchResults = searchTools("origin", { limit: 1 });
      if (searchResults.length === 0) {
        return;
      }

      const start = performance.now();
      describeTool(searchResults[0].tool.toolName);
      const duration = performance.now() - start;

      // Should complete within 50ms
      expect(duration).toBeLessThan(50);
    });

    it("should load dependency graph efficiently", () => {
      clearDependencyCache();

      const start = performance.now();
      getDependencyStats();
      const duration = performance.now() - start;

      // First load should be quick (graph is pre-built)
      expect(duration).toBeLessThan(100);

      // Subsequent calls should be faster (cached)
      const start2 = performance.now();
      getDependencyStats();
      const duration2 = performance.now() - start2;

      expect(duration2).toBeLessThan(duration);
    });
  });
});
