/**
 * Unit Tests for Tool Registry
 */

import { describe, it, expect } from "vitest";
import {
  allTools,
  getToolsByDomain,
  getToolByName,
  getAllDomains,
  getToolCountByDomain,
} from "../../src/tools/registry.js";

describe("registry", () => {
  describe("allTools", () => {
    it("should export an array of tools", () => {
      expect(Array.isArray(allTools)).toBe(true);
    });

    it("should contain tools with required properties", () => {
      for (const tool of allTools.slice(0, 10)) {
        expect(tool).toHaveProperty("toolName");
        expect(tool).toHaveProperty("method");
        expect(tool).toHaveProperty("path");
        expect(tool).toHaveProperty("domain");
        expect(tool).toHaveProperty("resource");
        expect(tool).toHaveProperty("operation");
      }
    });

    it("should have multiple tools", () => {
      expect(allTools.length).toBeGreaterThan(100);
    });
  });

  describe("getToolsByDomain", () => {
    it("should return tools for a valid domain", () => {
      const waapTools = getToolsByDomain("waap");
      expect(Array.isArray(waapTools)).toBe(true);
      expect(waapTools.length).toBeGreaterThan(0);
      expect(waapTools.every((t) => t.domain === "waap")).toBe(true);
    });

    it("should return tools for core domain", () => {
      const coreTools = getToolsByDomain("core");
      expect(coreTools.length).toBeGreaterThan(0);
      expect(coreTools.every((t) => t.domain === "core")).toBe(true);
    });

    it("should return tools for dns domain", () => {
      const dnsTools = getToolsByDomain("dns");
      expect(dnsTools.length).toBeGreaterThan(0);
      expect(dnsTools.every((t) => t.domain === "dns")).toBe(true);
    });

    it("should return empty array for non-existent domain", () => {
      const tools = getToolsByDomain("nonexistent");
      expect(tools).toEqual([]);
    });
  });

  describe("getToolByName", () => {
    it("should find a tool by exact name", () => {
      // Get a known tool name from the registry
      const firstTool = allTools[0];
      const found = getToolByName(firstTool.toolName);
      expect(found).toBeDefined();
      expect(found?.toolName).toBe(firstTool.toolName);
    });

    it("should return undefined for non-existent tool", () => {
      const tool = getToolByName("nonexistent-tool-name");
      expect(tool).toBeUndefined();
    });

    it("should return the correct tool with all properties", () => {
      const firstTool = allTools[0];
      const found = getToolByName(firstTool.toolName);
      expect(found).toEqual(firstTool);
    });
  });

  describe("getAllDomains", () => {
    it("should return unique domain names", () => {
      const domains = getAllDomains();
      expect(Array.isArray(domains)).toBe(true);
      expect(domains.length).toBeGreaterThan(0);

      // Check for uniqueness
      const uniqueDomains = [...new Set(domains)];
      expect(domains.length).toBe(uniqueDomains.length);
    });

    it("should include expected domains", () => {
      const domains = getAllDomains();
      expect(domains).toContain("waap");
      expect(domains).toContain("core");
      expect(domains).toContain("dns");
    });

    it("should return known domains", () => {
      const domains = getAllDomains();
      const expectedDomains = ["appstack", "core", "dns", "network", "security", "site", "waap"];

      for (const expected of expectedDomains) {
        expect(domains).toContain(expected);
      }
    });
  });

  describe("getToolCountByDomain", () => {
    it("should return an object with domain counts", () => {
      const counts = getToolCountByDomain();
      expect(typeof counts).toBe("object");
      expect(Object.keys(counts).length).toBeGreaterThan(0);
    });

    it("should have positive counts for each domain", () => {
      const counts = getToolCountByDomain();
      for (const [domain, count] of Object.entries(counts)) {
        expect(typeof domain).toBe("string");
        expect(count).toBeGreaterThan(0);
      }
    });

    it("should sum to total tool count", () => {
      const counts = getToolCountByDomain();
      const totalFromCounts = Object.values(counts).reduce((a, b) => a + b, 0);
      expect(totalFromCounts).toBe(allTools.length);
    });

    it("should match getToolsByDomain counts", () => {
      const counts = getToolCountByDomain();
      for (const [domain, count] of Object.entries(counts)) {
        const domainTools = getToolsByDomain(domain);
        expect(domainTools.length).toBe(count);
      }
    });
  });

  describe("default export", () => {
    it("should be the same as allTools", async () => {
      const defaultExport = (await import("../../src/tools/registry.js")).default;
      expect(defaultExport).toBe(allTools);
    });
  });
});
