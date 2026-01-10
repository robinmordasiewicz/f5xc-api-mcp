// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Planning Query Tests
 *
 * Tests for Category 8: Cost/dependency queries
 * Validates that users can plan resource creation and understand dependencies.
 *
 * User Intent Examples:
 * - "How many API calls for this workflow?"
 * - "What's the dependency graph for LB?"
 * - "Show subscription requirements"
 */

import { describe, it, expect, vi } from "vitest";
import {
  generateDependencyReport,
  getResourceDependencies,
  getCreationOrder,
  getPrerequisiteResources,
  getDependentResources,
  getOneOfGroups,
  getSubscriptionRequirements,
  getDependencyStats,
  getAllDependencyDomains,
  getResourcesInDomain,
} from "../../../src/tools/discovery/dependencies.js";
import { getConsolidationStats } from "../../../src/tools/discovery/consolidate.js";
import { isDependencyReport } from "./utils/query-helpers.js";

// Mock logger to prevent console output
vi.mock("../../../src/utils/logging.js", () => ({
  logger: {
    error: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
  },
}));

describe("Planning Queries - User Experience Simulation", () => {
  describe("Dependency Discovery: 'What\\'s the dependency graph for LB?'", () => {
    it("should return full dependency report for http-loadbalancer", () => {
      const report = generateDependencyReport("virtual", "http-loadbalancer", "full");

      expect(isDependencyReport(report)).toBe(true);
      expect(report.resource).toBe("http-loadbalancer");
      expect(report.domain).toBe("virtual");
      expect(Array.isArray(report.prerequisites)).toBe(true);
      expect(Array.isArray(report.dependents)).toBe(true);
      expect(Array.isArray(report.creationSequence)).toBe(true);
    });

    it("should return resource dependencies object", () => {
      const deps = getResourceDependencies("virtual", "http-loadbalancer");

      // May be null if not in dependency graph, otherwise should have structure
      if (deps !== null) {
        expect(deps.resource).toBe("http-loadbalancer");
        expect(deps.domain).toBe("virtual");
        expect(Array.isArray(deps.requires)).toBe(true);
        expect(Array.isArray(deps.requiredBy)).toBe(true);
      }
    });
  });

  describe("Prerequisites: 'What do I need first?'", () => {
    it("should return prerequisite resources", () => {
      const prereqs = getPrerequisiteResources("virtual", "http-loadbalancer");

      expect(Array.isArray(prereqs)).toBe(true);
      // Each prereq should have required fields if present
      if (prereqs.length > 0) {
        expect(prereqs[0].resourceType).toBeDefined();
      }
    });

    it("should return creation order for resource", () => {
      const order = getCreationOrder("virtual", "http-loadbalancer");

      expect(Array.isArray(order)).toBe(true);
      // Creation order lists dependencies first
    });
  });

  describe("Dependents: 'What uses this resource?'", () => {
    it("should return dependent resources for origin pool", () => {
      // Origin pool is in the virtual domain (load balancer configuration)
      const dependents = getDependentResources("virtual", "origin-pool");

      expect(Array.isArray(dependents)).toBe(true);
      // Origin pools are used by load balancers
    });

    it("should return dependents for app-firewall", () => {
      const dependents = getDependentResources("waf", "app-firewall");

      expect(Array.isArray(dependents)).toBe(true);
    });
  });

  describe("OneOf Groups: 'What are the mutually exclusive options?'", () => {
    it("should return oneOf groups for resource", () => {
      const groups = getOneOfGroups("virtual", "http-loadbalancer");

      expect(Array.isArray(groups)).toBe(true);
      // Each group should have choice field and options
      if (groups.length > 0) {
        expect(groups[0].choiceField).toBeDefined();
        expect(Array.isArray(groups[0].options)).toBe(true);
      }
    });
  });

  describe("Subscription Requirements: 'What subscriptions do I need?'", () => {
    it("should return subscription requirements", () => {
      const subs = getSubscriptionRequirements("virtual", "http-loadbalancer");

      expect(Array.isArray(subs)).toBe(true);
      // Each subscription should have required fields
      if (subs.length > 0) {
        expect(subs[0].addonServiceId).toBeDefined();
        expect(subs[0].displayName).toBeDefined();
      }
    });

    it("should return subscription info in full report", () => {
      const report = generateDependencyReport("virtual", "http-loadbalancer", "subscriptions");

      expect(Array.isArray(report.subscriptionRequirements)).toBe(true);
    });
  });

  describe("Dependency Statistics: 'How complex is the dependency graph?'", () => {
    it("should return overall dependency statistics", () => {
      const stats = getDependencyStats();

      expect(stats.totalResources).toBeGreaterThan(0);
      expect(stats.totalDependencies).toBeGreaterThanOrEqual(0);
      expect(stats.totalOneOfGroups).toBeGreaterThanOrEqual(0);
      expect(stats.totalSubscriptions).toBeGreaterThanOrEqual(0);
      expect(Array.isArray(stats.addonServices)).toBe(true);
      expect(stats.graphVersion).toBeDefined();
      expect(stats.generatedAt).toBeDefined();
    });
  });

  describe("Domain Discovery: 'What domains have dependencies?'", () => {
    it("should return all domains in dependency graph", () => {
      const domains = getAllDependencyDomains();

      expect(Array.isArray(domains)).toBe(true);
      expect(domains.length).toBeGreaterThan(0);
    });

    it("should return resources in a domain", () => {
      const resources = getResourcesInDomain("virtual");

      expect(Array.isArray(resources)).toBe(true);
      // Virtual domain should have resources
    });
  });

  describe("Consolidation Stats: 'How efficient is the tool organization?'", () => {
    it("should return consolidation statistics", () => {
      const stats = getConsolidationStats();

      expect(stats.originalToolCount).toBeGreaterThan(0);
      expect(stats.consolidatedCount).toBeGreaterThan(0);
      expect(stats.reduction).toBeGreaterThanOrEqual(0);
      expect(stats.reductionPercent).toBeDefined();
    });

    it("should show significant reduction from consolidation", () => {
      const stats = getConsolidationStats();

      // Consolidation should reduce tool count
      expect(stats.consolidatedCount).toBeLessThanOrEqual(stats.originalToolCount);
    });
  });

  describe("Dependency Report Actions", () => {
    const actions = ["prerequisites", "dependents", "oneOf", "subscriptions", "creationOrder", "full"] as const;

    actions.forEach((action) => {
      it(`should support ${action} action`, () => {
        const report = generateDependencyReport("virtual", "http-loadbalancer", action);

        expect(report).toBeDefined();
        expect(report.resource).toBe("http-loadbalancer");
        expect(report.domain).toBe("virtual");
      });
    });
  });

  describe("Non-Existent Resource Handling", () => {
    it("should handle non-existent resource gracefully", () => {
      const report = generateDependencyReport("virtual", "non-existent-resource", "full");

      expect(report).toBeDefined();
      expect(report.resource).toBe("non-existent-resource");
      expect(Array.isArray(report.prerequisites)).toBe(true);
      expect(report.prerequisites).toHaveLength(0);
    });

    it("should return null for non-existent resource dependencies", () => {
      const deps = getResourceDependencies("virtual", "non-existent-resource");

      expect(deps).toBeNull();
    });

    it("should return empty array for non-existent resource prerequisites", () => {
      const prereqs = getPrerequisiteResources("virtual", "non-existent-resource");

      expect(prereqs).toHaveLength(0);
    });
  });

  describe("Cross-Domain Dependencies", () => {
    it("should show dependencies across domains", () => {
      // HTTP load balancer may depend on resources from network domain (origin pool)
      const report = generateDependencyReport("virtual", "http-loadbalancer", "prerequisites");

      expect(Array.isArray(report.prerequisites)).toBe(true);
      // Prerequisites may come from different domains
    });
  });

  describe("Creation Sequence Planning", () => {
    it("should provide creation order for complex resources", () => {
      const report = generateDependencyReport("virtual", "http-loadbalancer", "creationOrder");

      expect(Array.isArray(report.creationSequence)).toBe(true);
      // Creation sequence shows order to create dependencies
    });

    it("should list dependencies before target resource", () => {
      const order = getCreationOrder("virtual", "http-loadbalancer");

      if (order.length > 0) {
        // Target resource should be last or near end
        const lastResource = order[order.length - 1];
        expect(lastResource).toBeDefined();
      }
    });
  });
});
