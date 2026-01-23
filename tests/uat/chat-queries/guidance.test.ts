// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Guidance Query Tests
 *
 * Tests for Category 6: Best practices queries
 * Validates that users can get domain-specific guidance and recommendations.
 *
 * User Intent Examples:
 * - "What are best practices for WAF?"
 * - "Common mistakes with load balancers?"
 * - "How should I structure my DNS zones?"
 */

import { describe, it, expect, vi } from "vitest";
import {
  queryBestPractices,
  getDomainBestPractices,
  getAllDomainsSummary,
  formatBestPractices,
} from "../../../src/tools/discovery/best-practices.js";
import { isBestPracticesResponse } from "./utils/query-helpers.js";

// Mock logger to prevent console output
vi.mock("../../../src/utils/logging.js", () => ({
  logger: {
    error: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
  },
}));

describe("Guidance Queries - User Experience Simulation", () => {
  describe("Virtual Domain: 'Common mistakes with load balancers?'", () => {
    it("should return virtual domain best practices", () => {
      const result = queryBestPractices({ domain: "virtual" });

      expect(result.success).toBe(true);
      expect(result.practices).toBeDefined();
      expect(result.practices?.domain).toBe("virtual");
    });

    it("should include common errors for virtual domain", () => {
      const practices = getDomainBestPractices("virtual");

      expect(practices).toBeDefined();
      expect(Array.isArray(practices?.commonErrors)).toBe(true);
    });

    it("should include workflows for deploying load balancers", () => {
      const practices = getDomainBestPractices("virtual");

      expect(practices).toBeDefined();
      expect(Array.isArray(practices?.workflows)).toBe(true);
      // Should have at least one workflow
      expect(practices?.workflows.length).toBeGreaterThan(0);
    });

    it("should filter to only error aspect", () => {
      const result = queryBestPractices({ domain: "virtual", aspect: "errors" });

      expect(result.success).toBe(true);
      expect(result.practices).toBeDefined();
      // Errors should be present
      expect(Array.isArray(result.practices?.commonErrors)).toBe(true);
      // Other aspects should be empty when filtered
      expect(result.practices?.workflows).toHaveLength(0);
    });
  });

  describe("DNS Best Practices: 'How should I structure my DNS zones?'", () => {
    it("should return DNS domain best practices", () => {
      const result = queryBestPractices({ domain: "dns" });

      expect(result.success).toBe(true);
      expect(result.practices).toBeDefined();
      expect(result.practices?.domain).toBe("dns");
    });

    it("should provide DNS-specific workflows", () => {
      const practices = getDomainBestPractices("dns");

      expect(practices).toBeDefined();
      expect(Array.isArray(practices?.workflows)).toBe(true);
    });

    it("should include performance tips for DNS", () => {
      const practices = getDomainBestPractices("dns");

      expect(practices).toBeDefined();
      expect(Array.isArray(practices?.performanceTips)).toBe(true);
    });
  });

  describe("Certificate Best Practices", () => {
    it("should return certificate domain best practices", () => {
      const result = queryBestPractices({ domain: "certificates" });

      expect(result.success).toBe(true);
      expect(result.practices).toBeDefined();
      expect(result.practices?.domain).toBe("certificates");
    });

    it("should include security notes for certificates", () => {
      const practices = getDomainBestPractices("certificates");

      expect(practices).toBeDefined();
      expect(Array.isArray(practices?.securityNotes)).toBe(true);
    });
  });

  describe("Domain Discovery: 'What domains are available?'", () => {
    it("should return list of available domains when no domain specified", () => {
      const result = queryBestPractices({});

      expect(result.success).toBe(true);
      expect(result.availableDomains).toBeDefined();
      expect(Array.isArray(result.availableDomains)).toBe(true);
      expect(result.availableDomains!.length).toBeGreaterThan(5);
    });

    it("should provide domain summary with tool counts", () => {
      const summary = getAllDomainsSummary();

      expect(Array.isArray(summary)).toBe(true);
      expect(summary.length).toBeGreaterThan(5);

      // Each domain should have required fields
      expect(summary[0].domain).toBeDefined();
      expect(summary[0].displayName).toBeDefined();
      expect(summary[0].toolCount).toBeGreaterThan(0);
      expect(summary[0].dangerSummary).toBeDefined();
    });
  });

  describe("Aspect Filtering", () => {
    const aspects = ["errors", "workflows", "danger", "security", "performance"] as const;

    aspects.forEach((aspect) => {
      it(`should filter to ${aspect} aspect`, () => {
        const result = queryBestPractices({ domain: "virtual", aspect });

        expect(result.success).toBe(true);
        expect(result.practices).toBeDefined();
      });
    });

    it("should return all aspects when aspect is 'all'", () => {
      const result = queryBestPractices({ domain: "virtual", aspect: "all" });

      expect(result.success).toBe(true);
      expect(result.practices).toBeDefined();
      // All arrays should be present (may or may not be empty)
      expect(Array.isArray(result.practices?.commonErrors)).toBe(true);
      expect(Array.isArray(result.practices?.workflows)).toBe(true);
      expect(Array.isArray(result.practices?.securityNotes)).toBe(true);
      expect(Array.isArray(result.practices?.performanceTips)).toBe(true);
    });
  });

  describe("Error Handling", () => {
    it("should return error for non-existent domain", () => {
      const result = queryBestPractices({ domain: "non-existent-domain" });

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe("Formatting", () => {
    it("should format best practices as readable markdown", () => {
      const practices = getDomainBestPractices("virtual");
      expect(practices).toBeDefined();

      const formatted = formatBestPractices(practices!);

      expect(formatted).toContain("# Best Practices:");
      expect(formatted).toContain("## Operations");
      expect(formatted).toContain("## Danger Analysis");
    });
  });

  describe("Operation Breakdown", () => {
    it("should provide operation counts for domain", () => {
      const practices = getDomainBestPractices("virtual");

      expect(practices).toBeDefined();
      expect(practices?.operations).toBeDefined();
      expect(practices?.operations.create).toBeGreaterThanOrEqual(0);
      expect(practices?.operations.list).toBeGreaterThanOrEqual(0);
      expect(practices?.operations.get).toBeGreaterThanOrEqual(0);
      expect(practices?.operations.update).toBeGreaterThanOrEqual(0);
      expect(practices?.operations.delete).toBeGreaterThanOrEqual(0);
    });
  });

  describe("Danger Analysis Details", () => {
    it("should provide danger level breakdown", () => {
      const practices = getDomainBestPractices("virtual");

      expect(practices?.dangerAnalysis).toBeDefined();
      expect(practices?.dangerAnalysis.low).toBeGreaterThanOrEqual(0);
      expect(practices?.dangerAnalysis.medium).toBeGreaterThanOrEqual(0);
      expect(practices?.dangerAnalysis.high).toBeGreaterThanOrEqual(0);
      expect(practices?.dangerAnalysis.safePercentage).toBeGreaterThanOrEqual(0);
      expect(practices?.dangerAnalysis.safePercentage).toBeLessThanOrEqual(100);
    });

    it("should list high-danger tools for awareness", () => {
      const practices = getDomainBestPractices("virtual");

      expect(practices?.dangerAnalysis.highDangerTools).toBeDefined();
      expect(Array.isArray(practices?.dangerAnalysis.highDangerTools)).toBe(true);
    });
  });
});
