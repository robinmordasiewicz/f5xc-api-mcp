/**
 * Unit Tests for Consolidation Module
 *
 * Tests the resource consolidation system including:
 * - Consolidated index generation
 * - Resource search
 * - Tool resolution
 * - Statistics
 */

import { describe, it, expect, beforeEach } from "vitest";
import {
  getConsolidatedIndex,
  clearConsolidatedCache,
  getConsolidatedResource,
  getConsolidatedByDomain,
  searchConsolidatedResources,
  resolveConsolidatedTool,
  getConsolidationStats,
} from "../../src/tools/discovery/consolidate.js";
import { clearIndexCache } from "../../src/tools/discovery/index-loader.js";

describe("consolidate", () => {
  beforeEach(() => {
    clearConsolidatedCache();
    clearIndexCache();
  });

  describe("getConsolidatedIndex", () => {
    it("should return a valid consolidated index", () => {
      const index = getConsolidatedIndex();

      expect(index).toBeDefined();
      expect(index.totalResources).toBeGreaterThan(0);
      expect(index.resources).toBeDefined();
      expect(Array.isArray(index.resources)).toBe(true);
    });

    it("should cache the index on subsequent calls", () => {
      const index1 = getConsolidatedIndex();
      const index2 = getConsolidatedIndex();

      expect(index1).toBe(index2); // Same reference
    });

    it("should have resources with valid structure", () => {
      const index = getConsolidatedIndex();
      const resource = index.resources[0];

      expect(resource.name).toBeDefined();
      expect(resource.domain).toBeDefined();
      expect(resource.resource).toBeDefined();
      expect(resource.operations).toBeDefined();
      expect(Array.isArray(resource.operations)).toBe(true);
      expect(resource.operations.length).toBeGreaterThan(0);
      expect(resource.summary).toBeDefined();
      expect(resource.toolMap).toBeDefined();
    });

    it("should identify full CRUD resources", () => {
      const index = getConsolidatedIndex();

      expect(index.fullCrudResources).toBeGreaterThan(0);
      expect(index.fullCrudResources).toBeLessThanOrEqual(index.totalResources);

      // Full CRUD resources should have at least 4 operations
      const fullCrudResources = index.resources.filter((r) => r.isFullCrud);
      expect(fullCrudResources.every((r) => r.operations.length >= 4)).toBe(true);
    });

    it("should group CRUD operations correctly", () => {
      const index = getConsolidatedIndex();

      // Find a known CRUD resource
      const httpLb = index.resources.find((r) => r.resource === "http-loadbalancer");

      if (httpLb) {
        expect(httpLb.operations).toContain("create");
        expect(httpLb.operations).toContain("list");
        expect(httpLb.toolMap.create).toBeDefined();
        expect(httpLb.toolMap.list).toBeDefined();
      }
    });
  });

  describe("clearConsolidatedCache", () => {
    it("should clear the cached index", () => {
      const index1 = getConsolidatedIndex();
      clearConsolidatedCache();
      const index2 = getConsolidatedIndex();

      // Different reference after cache clear
      expect(index1).not.toBe(index2);
      // But same content
      expect(index1.totalResources).toBe(index2.totalResources);
    });
  });

  describe("getConsolidatedResource", () => {
    it("should return resource for existing name", () => {
      const index = getConsolidatedIndex();
      const firstResource = index.resources[0];
      const resource = getConsolidatedResource(firstResource.name);

      expect(resource).toBeDefined();
      expect(resource?.name).toBe(firstResource.name);
    });

    it("should return undefined for non-existent resource", () => {
      const resource = getConsolidatedResource("non-existent-resource");

      expect(resource).toBeUndefined();
    });
  });

  describe("getConsolidatedByDomain", () => {
    it("should return resources for existing domain", () => {
      const resources = getConsolidatedByDomain("load_balancer");

      expect(resources.length).toBeGreaterThan(0);
      expect(resources.every((r) => r.domain === "load_balancer")).toBe(true);
    });

    it("should return empty array for non-existent domain", () => {
      const resources = getConsolidatedByDomain("nonexistent");

      expect(resources.length).toBe(0);
    });

    it("should be case-insensitive", () => {
      const resources1 = getConsolidatedByDomain("load_balancer");
      const resources2 = getConsolidatedByDomain("LOAD_BALANCER");

      expect(resources1.length).toBe(resources2.length);
    });
  });

  describe("searchConsolidatedResources", () => {
    it("should find resources matching simple queries", () => {
      const results = searchConsolidatedResources("http load balancer");

      expect(results.length).toBeGreaterThan(0);
      // Should find http-loadbalancer resource
      const topResult = results[0].resource;
      expect(
        topResult.resource.includes("http") ||
          topResult.resource.includes("load") ||
          topResult.summary.toLowerCase().includes("load")
      ).toBe(true);
    });

    it("should find resources by domain", () => {
      const results = searchConsolidatedResources("load_balancer");

      expect(results.length).toBeGreaterThan(0);
      expect(results.some((r) => r.resource.domain === "load_balancer")).toBe(true);
    });

    it("should respect limit option", () => {
      const results = searchConsolidatedResources("load balancer", { limit: 5 });

      expect(results.length).toBeLessThanOrEqual(5);
    });

    it("should filter by domains", () => {
      const results = searchConsolidatedResources("load balancer", { domains: ["load_balancer"] });

      expect(results.every((r) => r.resource.domain === "load_balancer")).toBe(true);
    });

    it("should return empty array for no matches", () => {
      const results = searchConsolidatedResources("xyz123nonexistent");

      expect(results.length).toBe(0);
    });

    it("should return scored results", () => {
      const results = searchConsolidatedResources("http loadbalancer");

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].score).toBeGreaterThan(0);
      expect(results[0].score).toBeLessThanOrEqual(1);
    });

    it("should include matched terms", () => {
      const results = searchConsolidatedResources("http loadbalancer");

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].matchedTerms.length).toBeGreaterThan(0);
    });
  });

  describe("resolveConsolidatedTool", () => {
    it("should resolve to correct underlying tool", () => {
      const index = getConsolidatedIndex();
      const resource = index.resources.find((r) => r.operations.includes("create"));

      if (resource) {
        const toolName = resolveConsolidatedTool(resource.name, "create");

        expect(toolName).toBeDefined();
        expect(toolName).toBe(resource.toolMap.create);
      }
    });

    it("should return null for non-existent resource", () => {
      const toolName = resolveConsolidatedTool("non-existent-resource", "create");

      expect(toolName).toBeNull();
    });

    it("should return null for unavailable operation", () => {
      const index = getConsolidatedIndex();
      // Find a resource that doesn't have all operations
      const partialResource = index.resources.find((r) => !r.operations.includes("update"));

      if (partialResource) {
        const toolName = resolveConsolidatedTool(partialResource.name, "update");

        expect(toolName).toBeNull();
      }
    });
  });

  describe("getConsolidationStats", () => {
    it("should return valid statistics", () => {
      const stats = getConsolidationStats();

      expect(stats.originalToolCount).toBeGreaterThan(0);
      expect(stats.consolidatedCount).toBeGreaterThan(0);
      expect(stats.reduction).toBeGreaterThan(0);
      expect(stats.reductionPercent).toMatch(/^\d+\.\d+%$/);
    });

    it("should show significant reduction", () => {
      const stats = getConsolidationStats();

      // Should reduce by at least 30%
      const reductionNum = parseFloat(stats.reductionPercent);
      expect(reductionNum).toBeGreaterThan(30);
    });

    it("should have consolidated count less than original", () => {
      const stats = getConsolidationStats();

      expect(stats.consolidatedCount).toBeLessThan(stats.originalToolCount);
    });
  });
});

describe("Consolidation Value", () => {
  it("should provide meaningful reduction", () => {
    const stats = getConsolidationStats();

    // Verify the consolidation provides real value
    console.log(`Consolidation stats:
      Original tools: ${stats.originalToolCount}
      Consolidated: ${stats.consolidatedCount}
      Reduction: ${stats.reduction} (${stats.reductionPercent})`);

    // Should reduce by 40%+ as planned
    const reductionNum = parseFloat(stats.reductionPercent);
    expect(reductionNum).toBeGreaterThanOrEqual(40);
  });

  it("should preserve all operations in tool map", () => {
    const index = getConsolidatedIndex();

    for (const resource of index.resources) {
      // Every operation should have a corresponding tool
      for (const op of resource.operations) {
        expect(resource.toolMap[op]).toBeDefined();
        expect(resource.toolMap[op].length).toBeGreaterThan(0);
      }
    }
  });
});
