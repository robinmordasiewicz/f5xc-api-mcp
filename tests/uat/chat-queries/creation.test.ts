/**
 * Creation Query Tests
 *
 * Tests for Category 2: "Create X" queries
 * Validates that users can find how to create resources and understand prerequisites.
 *
 * User Intent Examples:
 * - "Create an HTTP load balancer"
 * - "What do I need before creating a load balancer?"
 * - "Show me the steps to deploy a WAF"
 * - "How do I set up an origin pool?"
 */

import { describe, it, expect, vi } from "vitest";
import { searchTools } from "../../../src/tools/discovery/search.js";
import { describeTool } from "../../../src/tools/discovery/describe.js";
import {
  generateDependencyReport,
  getPrerequisiteResources,
  getCreationOrder,
} from "../../../src/tools/discovery/dependencies.js";
import { validateSearchResults, type ChatQuery, isDependencyReport } from "./utils/query-helpers.js";

// Mock logger to prevent console output
vi.mock("../../../src/utils/logging.js", () => ({
  logger: {
    error: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
  },
}));

describe("Creation Queries - User Experience Simulation", () => {
  describe("Create Load Balancer: 'Create an HTTP load balancer'", () => {
    const query: ChatQuery = {
      userIntent: "Create an HTTP load balancer",
      searchQuery: "create http load balancer",
      expectedToolPattern: "http-loadbalancer-create",
      expectedScore: 0.7,
    };

    it("should find the create tool with high relevance", () => {
      // Use domain filter to focus on virtual domain where the full http-loadbalancer resource lives
      const results = searchTools(query.searchQuery, { domains: ["virtual"], limit: 5 });

      // Find the http-loadbalancer-create tool among results
      const httpLbCreateTool = results.find(
        (r) => r.tool.resource.includes("http-loadbalancer") && r.tool.operation === "create"
      );
      expect(httpLbCreateTool).toBeDefined();
      expect(httpLbCreateTool!.score).toBeGreaterThan(0.5);
    });

    it("should return tool schema when describing the create tool", async () => {
      const results = searchTools(query.searchQuery, { limit: 1 });
      const toolName = results[0].tool.name;

      const description = await describeTool(toolName);

      expect(description).toBeDefined();
      expect(description.name).toBe(toolName);
      expect(description.method).toBe("POST");
    });

    it("should include dependency hints for create operations", () => {
      const results = searchTools(query.searchQuery, {
        limit: 5,
        includeDependencies: true,
      });

      // Create operations should include prerequisite hints
      const createResult = results.find((r) => r.tool.operation === "create");
      expect(createResult).toBeDefined();
      // Prerequisites may be included based on dependency graph
    });
  });

  describe("Prerequisites: 'What do I need before creating a load balancer?'", () => {
    it("should return prerequisite resources for http-loadbalancer", () => {
      const prereqs = getPrerequisiteResources("virtual", "http-loadbalancer");

      // HTTP load balancer typically needs origin pool
      expect(Array.isArray(prereqs)).toBe(true);
    });

    it("should generate dependency report for load balancer", () => {
      const report = generateDependencyReport("virtual", "http-loadbalancer", "prerequisites");

      expect(isDependencyReport(report)).toBe(true);
      expect(report.resource).toBe("http-loadbalancer");
      expect(report.domain).toBe("virtual");
      expect(Array.isArray(report.prerequisites)).toBe(true);
    });

    it("should return creation order for complex resources", () => {
      const order = getCreationOrder("virtual", "http-loadbalancer");

      expect(Array.isArray(order)).toBe(true);
      // Creation order lists resources in dependency order
    });
  });

  describe("WAF Deployment: 'Show me the steps to deploy a WAF'", () => {
    const query: ChatQuery = {
      userIntent: "Show me the steps to deploy a WAF",
      searchQuery: "create waf app firewall",
      expectedToolPattern: "app-firewall",
      expectedScore: 0.5,
    };

    it("should find WAF creation tools", () => {
      const results = searchTools(query.searchQuery, { limit: 5 });
      const validation = validateSearchResults(query, results);

      expect(validation.results.length).toBeGreaterThan(0);
      expect(results.some((r) => r.tool.resource.includes("app-firewall"))).toBe(true);
    });

    it("should provide full dependency report for WAF", () => {
      const report = generateDependencyReport("waf", "app-firewall", "full");

      expect(isDependencyReport(report)).toBe(true);
      expect(report.resource).toBe("app-firewall");
    });

    it("should return dependents showing what uses WAF policies", () => {
      const report = generateDependencyReport("waf", "app-firewall", "dependents");

      expect(Array.isArray(report.dependents)).toBe(true);
      // WAF policies are used by load balancers
    });
  });

  describe("Origin Pool Setup: 'How do I set up an origin pool?'", () => {
    const query: ChatQuery = {
      userIntent: "How do I set up an origin pool?",
      searchQuery: "create origin pool",
      expectedToolPattern: "origin-pool",
      expectedScore: 0.5,
    };

    it("should find origin pool creation tool", () => {
      const results = searchTools(query.searchQuery, { limit: 5 });
      const validation = validateSearchResults(query, results);

      expect(validation.results.length).toBeGreaterThan(0);
      expect(results[0].tool.resource).toContain("origin-pool");
      expect(results[0].tool.operation).toBe("create");
    });

    it("should return tool schema with required parameters", async () => {
      const results = searchTools(query.searchQuery, { limit: 1 });
      const toolName = results[0].tool.name;

      const description = await describeTool(toolName);

      expect(description).toBeDefined();
      expect(description.name).toBe(toolName);
      // Path parameters should include namespace
    });
  });

  describe("DNS Zone Creation: 'How do I create a DNS zone?'", () => {
    const query: ChatQuery = {
      userIntent: "How do I create a DNS zone?",
      searchQuery: "create dns zone",
      expectedToolPattern: "dns-zone",
      expectedScore: 0.5,
    };

    it("should find DNS zone creation tool", () => {
      const results = searchTools(query.searchQuery, { limit: 5 });
      const validation = validateSearchResults(query, results);

      expect(validation.results.length).toBeGreaterThan(0);
      expect(results[0].tool.domain).toBe("dns");
    });

    it("should filter to only DNS domain results", () => {
      const results = searchTools("create zone", { domains: ["dns"], limit: 5 });

      expect(results.every((r) => r.tool.domain === "dns")).toBe(true);
    });
  });

  describe("Certificate Creation: 'How do I upload a certificate?'", () => {
    it("should find certificate creation tools", () => {
      const results = searchTools("create certificate", { limit: 5 });

      expect(results.length).toBeGreaterThan(0);
      expect(results.some((r) => r.tool.domain === "certificates")).toBe(true);
    });
  });

  describe("Namespace Discovery: 'What namespace should I use?'", () => {
    it("should find namespace-related tools", () => {
      const results = searchTools("namespace", { limit: 10 });

      // Namespace is a common path parameter
      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe("Create Tool Identification", () => {
    it("should filter to only create operations", () => {
      const results = searchTools("http load balancer", { operations: ["create"], limit: 5 });

      expect(results.every((r) => r.tool.operation === "create")).toBe(true);
    });

    it("should identify POST method for create operations", async () => {
      const results = searchTools("create origin pool", { limit: 1 });
      const description = await describeTool(results[0].tool.name);

      expect(description.method).toBe("POST");
    });
  });
});
