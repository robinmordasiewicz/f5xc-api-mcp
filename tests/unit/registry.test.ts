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
      const lbTools = getToolsByDomain("load_balancer");
      expect(Array.isArray(lbTools)).toBe(true);
      expect(lbTools.length).toBeGreaterThan(0);
      expect(lbTools.every((t) => t.domain === "load_balancer")).toBe(true);
    });

    it("should return tools for networking domain", () => {
      const networkingTools = getToolsByDomain("networking");
      expect(networkingTools.length).toBeGreaterThan(0);
      expect(networkingTools.every((t) => t.domain === "networking")).toBe(true);
    });

    it("should return tools for security domain", () => {
      const securityTools = getToolsByDomain("security");
      expect(securityTools.length).toBeGreaterThan(0);
      expect(securityTools.every((t) => t.domain === "security")).toBe(true);
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
      expect(domains).toContain("load_balancer");
      expect(domains).toContain("networking");
      expect(domains).toContain("security");
    });

    it("should return known domains", () => {
      const domains = getAllDomains();
      const expectedDomains = [
        "api_security",
        "infrastructure",
        "load_balancer",
        "networking",
        "observability",
        "security",
        "vpn",
      ];

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
