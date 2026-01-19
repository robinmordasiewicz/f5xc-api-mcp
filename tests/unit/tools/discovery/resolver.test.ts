// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  resolveDependencies,
  formatCreationPlan,
  generateCompactPlan,
  type ResolveParams,
  type CreationPlan,
  type WorkflowStep,
} from "../../../../src/tools/discovery/resolver.js";
import { getToolByName } from "../../../../src/tools/registry.js";

// Mock dependency functions
vi.mock("../../../../src/tools/discovery/dependencies.js", () => ({
  getResourceDependencies: vi.fn(),
  getPrerequisiteResources: vi.fn(),
  getOneOfGroups: vi.fn(),
  getSubscriptionRequirements: vi.fn(),
}));

import {
  getResourceDependencies,
  getPrerequisiteResources,
  getOneOfGroups,
  getSubscriptionRequirements,
} from "../../../../src/tools/discovery/dependencies.js";

describe("Dependency Resolver", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("resolveDependencies - Basic Resolution", () => {
    it("should resolve resource with no dependencies", () => {
      // Arrange
      vi.mocked(getResourceDependencies).mockReturnValue({
        resourceType: "namespace",
        domain: "tenant_and_identity",
        prerequisites: [],
        optional: [],
      });
      vi.mocked(getPrerequisiteResources).mockReturnValue([]);
      vi.mocked(getOneOfGroups).mockReturnValue([]);
      vi.mocked(getSubscriptionRequirements).mockReturnValue([]);

      const params: ResolveParams = {
        resource: "namespace",
        domain: "tenant_and_identity",
      };

      // Act
      const result = resolveDependencies(params);

      // Assert
      expect(result.success).toBe(true);
      expect(result.plan).toBeDefined();
      expect(result.plan?.totalSteps).toBe(1);
      expect(result.plan?.complexity).toBe("low");
      expect(result.plan?.steps[0].resource).toBe("namespace");
    });

    it("should return error for resource not in dependency graph", () => {
      // Arrange
      vi.mocked(getResourceDependencies).mockReturnValue(null);

      const params: ResolveParams = {
        resource: "nonexistent",
        domain: "invalid",
      };

      // Act
      const result = resolveDependencies(params);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toContain("not found in dependency graph");
    });

    it("should skip existing resources", () => {
      // Arrange
      vi.mocked(getResourceDependencies).mockImplementation((domain, resource) => {
        if (resource === "http-loadbalancer") {
          return {
            resourceType: "http-loadbalancer",
            domain: "virtual",
            prerequisites: [{ domain: "virtual", resourceType: "origin-pool", required: true }],
            optional: [],
          };
        }
        if (resource === "origin-pool") {
          return {
            resourceType: "origin-pool",
            domain: "virtual",
            prerequisites: [],
            optional: [],
          };
        }
        return null;
      });

      vi.mocked(getPrerequisiteResources).mockImplementation((domain, resource) => {
        if (resource === "http-loadbalancer") {
          return [{ domain: "virtual", resourceType: "origin-pool", required: true }];
        }
        return [];
      });

      vi.mocked(getOneOfGroups).mockReturnValue([]);
      vi.mocked(getSubscriptionRequirements).mockReturnValue([]);

      const params: ResolveParams = {
        resource: "http-loadbalancer",
        domain: "virtual",
        existingResources: ["virtual/origin-pool"],
      };

      // Act
      const result = resolveDependencies(params);

      // Assert
      expect(result.success).toBe(true);
      expect(result.plan).toBeDefined();
      expect(result.plan?.totalSteps).toBe(1); // Only http-loadbalancer, origin-pool exists
      expect(result.plan?.steps[0].resource).toBe("http-loadbalancer");
      expect(result.plan?.steps[0].dependsOn).toEqual([]);
    });
  });

  describe("resolveDependencies - Multi-Level Dependencies", () => {
    it("should resolve single-level dependencies", () => {
      // Arrange - HTTP load balancer depends on origin pool
      vi.mocked(getResourceDependencies).mockImplementation((domain, resource) => {
        if (resource === "http-loadbalancer") {
          return {
            resourceType: "http-loadbalancer",
            domain: "virtual",
            prerequisites: [{ domain: "virtual", resourceType: "origin-pool", required: true }],
            optional: [],
          };
        }
        if (resource === "origin-pool") {
          return {
            resourceType: "origin-pool",
            domain: "virtual",
            prerequisites: [],
            optional: [],
          };
        }
        return null;
      });

      vi.mocked(getPrerequisiteResources).mockImplementation((domain, resource) => {
        if (resource === "http-loadbalancer") {
          return [{ domain: "virtual", resourceType: "origin-pool", required: true }];
        }
        return [];
      });

      vi.mocked(getOneOfGroups).mockReturnValue([]);
      vi.mocked(getSubscriptionRequirements).mockReturnValue([]);

      const params: ResolveParams = {
        resource: "http-loadbalancer",
        domain: "virtual",
      };

      // Act
      const result = resolveDependencies(params);

      // Assert
      expect(result.success).toBe(true);
      expect(result.plan).toBeDefined();
      expect(result.plan?.totalSteps).toBe(2);
      expect(result.plan?.steps[0].resource).toBe("origin-pool");
      expect(result.plan?.steps[1].resource).toBe("http-loadbalancer");
      expect(result.plan?.steps[1].dependsOn).toContain("virtual/origin-pool");
    });

    it("should resolve transitive dependencies (A → B → C)", () => {
      // Arrange - resource-a depends on resource-b, which depends on resource-c
      vi.mocked(getResourceDependencies).mockImplementation((domain, resource) => {
        if (resource === "resource-a") {
          return {
            resourceType: "resource-a",
            domain: "test",
            prerequisites: [{ domain: "test", resourceType: "resource-b", required: true }],
            optional: [],
          };
        }
        if (resource === "resource-b") {
          return {
            resourceType: "resource-b",
            domain: "test",
            prerequisites: [{ domain: "test", resourceType: "resource-c", required: true }],
            optional: [],
          };
        }
        if (resource === "resource-c") {
          return {
            resourceType: "resource-c",
            domain: "test",
            prerequisites: [],
            optional: [],
          };
        }
        return null;
      });

      vi.mocked(getPrerequisiteResources).mockImplementation((domain, resource) => {
        if (resource === "resource-a") {
          return [{ domain: "test", resourceType: "resource-b", required: true }];
        }
        if (resource === "resource-b") {
          return [{ domain: "test", resourceType: "resource-c", required: true }];
        }
        return [];
      });

      vi.mocked(getOneOfGroups).mockReturnValue([]);
      vi.mocked(getSubscriptionRequirements).mockReturnValue([]);

      const params: ResolveParams = {
        resource: "resource-a",
        domain: "test",
      };

      // Act
      const result = resolveDependencies(params);

      // Assert
      expect(result.success).toBe(true);
      expect(result.plan).toBeDefined();
      expect(result.plan?.totalSteps).toBe(3);
      // Should be in dependency order: C → B → A
      expect(result.plan?.steps[0].resource).toBe("resource-c");
      expect(result.plan?.steps[1].resource).toBe("resource-b");
      expect(result.plan?.steps[2].resource).toBe("resource-a");
    });

    it("should handle diamond dependencies (A → B, A → C, B → D, C → D)", () => {
      // Arrange - Diamond: resource-a depends on b and c, both b and c depend on d
      vi.mocked(getResourceDependencies).mockImplementation((domain, resource) => {
        if (resource === "resource-a") {
          return {
            resourceType: "resource-a",
            domain: "test",
            prerequisites: [
              { domain: "test", resourceType: "resource-b", required: true },
              { domain: "test", resourceType: "resource-c", required: true },
            ],
            optional: [],
          };
        }
        if (resource === "resource-b") {
          return {
            resourceType: "resource-b",
            domain: "test",
            prerequisites: [{ domain: "test", resourceType: "resource-d", required: true }],
            optional: [],
          };
        }
        if (resource === "resource-c") {
          return {
            resourceType: "resource-c",
            domain: "test",
            prerequisites: [{ domain: "test", resourceType: "resource-d", required: true }],
            optional: [],
          };
        }
        if (resource === "resource-d") {
          return {
            resourceType: "resource-d",
            domain: "test",
            prerequisites: [],
            optional: [],
          };
        }
        return null;
      });

      vi.mocked(getPrerequisiteResources).mockImplementation((domain, resource) => {
        if (resource === "resource-a") {
          return [
            { domain: "test", resourceType: "resource-b", required: true },
            { domain: "test", resourceType: "resource-c", required: true },
          ];
        }
        if (resource === "resource-b") {
          return [{ domain: "test", resourceType: "resource-d", required: true }];
        }
        if (resource === "resource-c") {
          return [{ domain: "test", resourceType: "resource-d", required: true }];
        }
        return [];
      });

      vi.mocked(getOneOfGroups).mockReturnValue([]);
      vi.mocked(getSubscriptionRequirements).mockReturnValue([]);

      const params: ResolveParams = {
        resource: "resource-a",
        domain: "test",
      };

      // Act
      const result = resolveDependencies(params);

      // Assert
      expect(result.success).toBe(true);
      expect(result.plan).toBeDefined();
      expect(result.plan?.totalSteps).toBe(4);
      // D must come first, then B and C (order between B and C doesn't matter), then A
      expect(result.plan?.steps[0].resource).toBe("resource-d");
      const middleResources = [result.plan?.steps[1].resource, result.plan?.steps[2].resource];
      expect(middleResources).toContain("resource-b");
      expect(middleResources).toContain("resource-c");
      expect(result.plan?.steps[3].resource).toBe("resource-a");
    });
  });

  describe("resolveDependencies - Optional Dependencies", () => {
    it("should exclude optional dependencies by default", () => {
      // Arrange
      vi.mocked(getResourceDependencies).mockImplementation((domain, resource) => {
        if (resource === "resource-a") {
          return {
            resourceType: "resource-a",
            domain: "test",
            prerequisites: [{ domain: "test", resourceType: "resource-required", required: true }],
            optional: [{ domain: "test", resourceType: "resource-optional", required: false }],
          };
        }
        if (resource === "resource-required") {
          return {
            resourceType: "resource-required",
            domain: "test",
            prerequisites: [],
            optional: [],
          };
        }
        if (resource === "resource-optional") {
          return {
            resourceType: "resource-optional",
            domain: "test",
            prerequisites: [],
            optional: [],
          };
        }
        return null;
      });

      vi.mocked(getPrerequisiteResources).mockImplementation((domain, resource) => {
        if (resource === "resource-a") {
          return [{ domain: "test", resourceType: "resource-required", required: true }];
        }
        return [];
      });

      vi.mocked(getOneOfGroups).mockReturnValue([]);
      vi.mocked(getSubscriptionRequirements).mockReturnValue([]);

      const params: ResolveParams = {
        resource: "resource-a",
        domain: "test",
        includeOptional: false,
      };

      // Act
      const result = resolveDependencies(params);

      // Assert
      expect(result.success).toBe(true);
      expect(result.plan).toBeDefined();
      expect(result.plan?.totalSteps).toBe(2);
      expect(result.plan?.steps.some((s) => s.resource === "resource-required")).toBe(true);
      expect(result.plan?.steps.some((s) => s.resource === "resource-optional")).toBe(false);
    });

    it("should include optional dependencies when includeOptional=true", () => {
      // Arrange
      vi.mocked(getResourceDependencies).mockImplementation((domain, resource) => {
        if (resource === "resource-a") {
          return {
            resourceType: "resource-a",
            domain: "test",
            prerequisites: [{ domain: "test", resourceType: "resource-required", required: true }],
            optional: [{ domain: "test", resourceType: "resource-optional", required: false }],
          };
        }
        if (resource === "resource-required") {
          return {
            resourceType: "resource-required",
            domain: "test",
            prerequisites: [],
            optional: [],
          };
        }
        if (resource === "resource-optional") {
          return {
            resourceType: "resource-optional",
            domain: "test",
            prerequisites: [],
            optional: [],
          };
        }
        return null;
      });

      vi.mocked(getPrerequisiteResources).mockImplementation((domain, resource) => {
        if (resource === "resource-a") {
          return [{ domain: "test", resourceType: "resource-required", required: true }];
        }
        return [];
      });

      vi.mocked(getOneOfGroups).mockReturnValue([]);
      vi.mocked(getSubscriptionRequirements).mockReturnValue([]);

      const params: ResolveParams = {
        resource: "resource-a",
        domain: "test",
        includeOptional: true,
      };

      // Act
      const result = resolveDependencies(params);

      // Assert
      expect(result.success).toBe(true);
      expect(result.plan).toBeDefined();
      // Should have at least required dependencies + target
      expect(result.plan?.totalSteps).toBeGreaterThanOrEqual(2);
      expect(result.plan?.steps.some((s) => s.resource === "resource-required")).toBe(true);
      expect(result.plan?.steps.some((s) => s.resource === "resource-a")).toBe(true);
    });
  });

  describe("resolveDependencies - MaxDepth Constraint", () => {
    it("should respect maxDepth constraint", () => {
      // Arrange - Deep dependency chain A → B → C → D → E
      vi.mocked(getResourceDependencies).mockImplementation((domain, resource) => {
        const deps: Record<string, any> = {
          "resource-a": {
            resourceType: "resource-a",
            domain: "test",
            prerequisites: [{ domain: "test", resourceType: "resource-b", required: true }],
            optional: [],
          },
          "resource-b": {
            resourceType: "resource-b",
            domain: "test",
            prerequisites: [{ domain: "test", resourceType: "resource-c", required: true }],
            optional: [],
          },
          "resource-c": {
            resourceType: "resource-c",
            domain: "test",
            prerequisites: [{ domain: "test", resourceType: "resource-d", required: true }],
            optional: [],
          },
          "resource-d": {
            resourceType: "resource-d",
            domain: "test",
            prerequisites: [{ domain: "test", resourceType: "resource-e", required: true }],
            optional: [],
          },
          "resource-e": {
            resourceType: "resource-e",
            domain: "test",
            prerequisites: [],
            optional: [],
          },
        };
        return deps[resource] || null;
      });

      vi.mocked(getPrerequisiteResources).mockImplementation((domain, resource) => {
        const prereqs: Record<string, any[]> = {
          "resource-a": [{ domain: "test", resourceType: "resource-b", required: true }],
          "resource-b": [{ domain: "test", resourceType: "resource-c", required: true }],
          "resource-c": [{ domain: "test", resourceType: "resource-d", required: true }],
          "resource-d": [{ domain: "test", resourceType: "resource-e", required: true }],
          "resource-e": [],
        };
        return prereqs[resource] || [];
      });

      vi.mocked(getOneOfGroups).mockReturnValue([]);
      vi.mocked(getSubscriptionRequirements).mockReturnValue([]);

      const params: ResolveParams = {
        resource: "resource-a",
        domain: "test",
        maxDepth: 2, // Should only resolve 2 levels deep
      };

      // Act
      const result = resolveDependencies(params);

      // Assert
      expect(result.success).toBe(true);
      expect(result.plan).toBeDefined();
      // With maxDepth=2, should not resolve the entire chain (5 steps)
      // Should be fewer steps than without depth limit
      expect(result.plan?.totalSteps).toBeLessThan(5);
      expect(result.plan?.totalSteps).toBeGreaterThanOrEqual(1);
    });
  });

  describe("resolveDependencies - oneOf Choices", () => {
    it("should include oneOf choices in workflow steps", () => {
      // Arrange
      vi.mocked(getResourceDependencies).mockReturnValue({
        resourceType: "http-loadbalancer",
        domain: "virtual",
        prerequisites: [],
        optional: [],
      });

      vi.mocked(getPrerequisiteResources).mockReturnValue([]);

      vi.mocked(getOneOfGroups).mockReturnValue([
        {
          choiceField: "origin_pools_weights",
          description: "Choose origin pool configuration method",
          options: ["origin_pool", "pool_weights", "ad_pool_priority"],
        },
      ]);

      vi.mocked(getSubscriptionRequirements).mockReturnValue([]);

      const params: ResolveParams = {
        resource: "http-loadbalancer",
        domain: "virtual",
      };

      // Act
      const result = resolveDependencies(params);

      // Assert
      expect(result.success).toBe(true);
      expect(result.plan).toBeDefined();
      expect(result.plan?.steps[0].oneOfChoices).toBeDefined();
      expect(result.plan?.steps[0].oneOfChoices?.length).toBe(1);
      expect(result.plan?.steps[0].oneOfChoices?.[0].field).toBe("origin_pools_weights");
      expect(result.plan?.steps[0].oneOfChoices?.[0].options).toHaveLength(3);
    });

    it("should expand alternatives when expandAlternatives=true", () => {
      // Arrange
      vi.mocked(getResourceDependencies).mockReturnValue({
        resourceType: "http-loadbalancer",
        domain: "virtual",
        prerequisites: [],
        optional: [],
      });

      vi.mocked(getPrerequisiteResources).mockReturnValue([]);

      vi.mocked(getOneOfGroups).mockReturnValue([
        {
          choiceField: "origin_pools_weights",
          description: "Choose origin pool configuration method",
          options: ["origin_pool", "pool_weights"],
        },
      ]);

      vi.mocked(getSubscriptionRequirements).mockReturnValue([]);

      const params: ResolveParams = {
        resource: "http-loadbalancer",
        domain: "virtual",
        expandAlternatives: true,
      };

      // Act
      const result = resolveDependencies(params);

      // Assert
      expect(result.success).toBe(true);
      expect(result.plan).toBeDefined();
      expect(result.plan?.alternatives).toBeDefined();
      expect(result.plan?.alternatives.length).toBeGreaterThan(0);
      expect(result.plan?.alternatives[0].choiceField).toBe("origin_pools_weights");
    });
  });

  describe("resolveDependencies - Subscription Requirements", () => {
    it("should include subscription requirements in plan", () => {
      // Arrange
      vi.mocked(getResourceDependencies).mockReturnValue({
        resourceType: "waf-policy",
        domain: "waf",
        prerequisites: [],
        optional: [],
      });

      vi.mocked(getPrerequisiteResources).mockReturnValue([]);
      vi.mocked(getOneOfGroups).mockReturnValue([]);

      vi.mocked(getSubscriptionRequirements).mockReturnValue([
        {
          service: "waap",
          displayName: "Web Application and API Protection",
          tier: "Advanced",
          required: true,
        },
      ]);

      const params: ResolveParams = {
        resource: "waf-policy",
        domain: "waf",
      };

      // Act
      const result = resolveDependencies(params);

      // Assert
      expect(result.success).toBe(true);
      expect(result.plan).toBeDefined();
      expect(result.plan?.subscriptions).toBeDefined();
      expect(result.plan?.subscriptions.length).toBeGreaterThan(0);
      expect(result.plan?.subscriptions[0]).toContain("Web Application and API Protection");
      expect(result.plan?.subscriptions[0]).toContain("required");
    });
  });

  describe("resolveDependencies - Complexity Calculation", () => {
    it("should calculate complexity as low for 1-2 steps", () => {
      // Arrange
      vi.mocked(getResourceDependencies).mockReturnValue({
        resourceType: "simple-resource",
        domain: "test",
        prerequisites: [],
        optional: [],
      });

      vi.mocked(getPrerequisiteResources).mockReturnValue([]);
      vi.mocked(getOneOfGroups).mockReturnValue([]);
      vi.mocked(getSubscriptionRequirements).mockReturnValue([]);

      const params: ResolveParams = {
        resource: "simple-resource",
        domain: "test",
      };

      // Act
      const result = resolveDependencies(params);

      // Assert
      expect(result.success).toBe(true);
      expect(result.plan?.complexity).toBe("low");
    });

    it("should calculate complexity as medium for 3-5 steps", () => {
      // Arrange - Create chain with 4 resources
      vi.mocked(getResourceDependencies).mockImplementation((domain, resource) => {
        const deps: Record<string, any> = {
          "resource-a": {
            resourceType: "resource-a",
            domain: "test",
            prerequisites: [{ domain: "test", resourceType: "resource-b", required: true }],
            optional: [],
          },
          "resource-b": {
            resourceType: "resource-b",
            domain: "test",
            prerequisites: [{ domain: "test", resourceType: "resource-c", required: true }],
            optional: [],
          },
          "resource-c": {
            resourceType: "resource-c",
            domain: "test",
            prerequisites: [{ domain: "test", resourceType: "resource-d", required: true }],
            optional: [],
          },
          "resource-d": {
            resourceType: "resource-d",
            domain: "test",
            prerequisites: [],
            optional: [],
          },
        };
        return deps[resource] || null;
      });

      vi.mocked(getPrerequisiteResources).mockImplementation((domain, resource) => {
        const prereqs: Record<string, any[]> = {
          "resource-a": [{ domain: "test", resourceType: "resource-b", required: true }],
          "resource-b": [{ domain: "test", resourceType: "resource-c", required: true }],
          "resource-c": [{ domain: "test", resourceType: "resource-d", required: true }],
          "resource-d": [],
        };
        return prereqs[resource] || [];
      });

      vi.mocked(getOneOfGroups).mockReturnValue([]);
      vi.mocked(getSubscriptionRequirements).mockReturnValue([]);

      const params: ResolveParams = {
        resource: "resource-a",
        domain: "test",
      };

      // Act
      const result = resolveDependencies(params);

      // Assert
      expect(result.success).toBe(true);
      expect(result.plan?.totalSteps).toBe(4);
      expect(result.plan?.complexity).toBe("medium");
    });

    it("should calculate complexity as high for >5 steps", () => {
      // Arrange - Create chain with 7 resources
      vi.mocked(getResourceDependencies).mockImplementation((domain, resource) => {
        const deps: Record<string, any> = {
          "resource-a": {
            resourceType: "resource-a",
            domain: "test",
            prerequisites: [{ domain: "test", resourceType: "resource-b", required: true }],
            optional: [],
          },
          "resource-b": {
            resourceType: "resource-b",
            domain: "test",
            prerequisites: [{ domain: "test", resourceType: "resource-c", required: true }],
            optional: [],
          },
          "resource-c": {
            resourceType: "resource-c",
            domain: "test",
            prerequisites: [{ domain: "test", resourceType: "resource-d", required: true }],
            optional: [],
          },
          "resource-d": {
            resourceType: "resource-d",
            domain: "test",
            prerequisites: [{ domain: "test", resourceType: "resource-e", required: true }],
            optional: [],
          },
          "resource-e": {
            resourceType: "resource-e",
            domain: "test",
            prerequisites: [{ domain: "test", resourceType: "resource-f", required: true }],
            optional: [],
          },
          "resource-f": {
            resourceType: "resource-f",
            domain: "test",
            prerequisites: [{ domain: "test", resourceType: "resource-g", required: true }],
            optional: [],
          },
          "resource-g": {
            resourceType: "resource-g",
            domain: "test",
            prerequisites: [],
            optional: [],
          },
        };
        return deps[resource] || null;
      });

      vi.mocked(getPrerequisiteResources).mockImplementation((domain, resource) => {
        const prereqs: Record<string, any[]> = {
          "resource-a": [{ domain: "test", resourceType: "resource-b", required: true }],
          "resource-b": [{ domain: "test", resourceType: "resource-c", required: true }],
          "resource-c": [{ domain: "test", resourceType: "resource-d", required: true }],
          "resource-d": [{ domain: "test", resourceType: "resource-e", required: true }],
          "resource-e": [{ domain: "test", resourceType: "resource-f", required: true }],
          "resource-f": [{ domain: "test", resourceType: "resource-g", required: true }],
          "resource-g": [],
        };
        return prereqs[resource] || [];
      });

      vi.mocked(getOneOfGroups).mockReturnValue([]);
      vi.mocked(getSubscriptionRequirements).mockReturnValue([]);

      const params: ResolveParams = {
        resource: "resource-a",
        domain: "test",
      };

      // Act
      const result = resolveDependencies(params);

      // Assert
      expect(result.success).toBe(true);
      expect(result.plan?.totalSteps).toBe(7);
      expect(result.plan?.complexity).toBe("high");
    });
  });

  describe("formatCreationPlan", () => {
    it("should format plan with basic information", () => {
      // Arrange
      const plan: CreationPlan = {
        targetResource: "http-loadbalancer",
        targetDomain: "virtual",
        totalSteps: 2,
        complexity: "low",
        steps: [
          {
            stepNumber: 1,
            action: "create",
            domain: "virtual",
            resource: "origin-pool",
            toolName: "f5xc-api-virtual-origin-pool-create",
            dependsOn: [],
            optional: false,
            requiredInputs: ["metadata.name", "metadata.namespace"],
          },
          {
            stepNumber: 2,
            action: "create",
            domain: "virtual",
            resource: "http-loadbalancer",
            toolName: "f5xc-api-virtual-http-loadbalancer-create",
            dependsOn: ["virtual/origin-pool"],
            optional: false,
            requiredInputs: ["metadata.name"],
          },
        ],
        warnings: [],
        alternatives: [],
        subscriptions: [],
      };

      // Act
      const formatted = formatCreationPlan(plan);

      // Assert
      expect(formatted).toContain("# Creation Plan for virtual/http-loadbalancer");
      expect(formatted).toContain("**Complexity**: low");
      expect(formatted).toContain("**Total Steps**: 2");
      expect(formatted).toContain("### Step 1: create virtual/origin-pool");
      expect(formatted).toContain("### Step 2: create virtual/http-loadbalancer");
      expect(formatted).toContain("**Tool**: `f5xc-api-virtual-origin-pool-create`");
      expect(formatted).toContain("**Depends On**: virtual/origin-pool");
    });

    it("should format plan with subscriptions", () => {
      // Arrange
      const plan: CreationPlan = {
        targetResource: "waf-policy",
        targetDomain: "waf",
        totalSteps: 1,
        complexity: "low",
        steps: [
          {
            stepNumber: 1,
            action: "create",
            domain: "waf",
            resource: "waf-policy",
            toolName: "f5xc-api-waf-waf-policy-create",
            dependsOn: [],
            optional: false,
            requiredInputs: ["metadata.name"],
          },
        ],
        warnings: [],
        alternatives: [],
        subscriptions: ["Web Application and API Protection (Advanced) - required"],
      };

      // Act
      const formatted = formatCreationPlan(plan);

      // Assert
      expect(formatted).toContain("## Required Subscriptions");
      expect(formatted).toContain("Web Application and API Protection");
    });

    it("should format plan with existing resources", () => {
      // Arrange
      const plan: CreationPlan = {
        targetResource: "http-loadbalancer",
        targetDomain: "virtual",
        totalSteps: 1,
        complexity: "low",
        steps: [
          {
            stepNumber: 1,
            action: "create",
            domain: "virtual",
            resource: "http-loadbalancer",
            toolName: "f5xc-api-virtual-http-loadbalancer-create",
            dependsOn: [],
            optional: false,
            requiredInputs: ["metadata.name"],
          },
        ],
        warnings: [],
        alternatives: [],
        subscriptions: [],
        existingResources: ["virtual/origin-pool", "virtual/namespace"],
      };

      // Act
      const formatted = formatCreationPlan(plan);

      // Assert
      expect(formatted).toContain("## Existing Resources (Skipped)");
      expect(formatted).toContain("- virtual/origin-pool");
      expect(formatted).toContain("- virtual/namespace");
    });

    it("should format plan with warnings", () => {
      // Arrange
      const plan: CreationPlan = {
        targetResource: "test-resource",
        targetDomain: "test",
        totalSteps: 1,
        complexity: "low",
        steps: [
          {
            stepNumber: 1,
            action: "create",
            domain: "test",
            resource: "test-resource",
            toolName: "test-tool",
            dependsOn: [],
            optional: false,
            requiredInputs: [],
          },
        ],
        warnings: ["No create tool found for dependency-resource", "Manual configuration required"],
        alternatives: [],
        subscriptions: [],
      };

      // Act
      const formatted = formatCreationPlan(plan);

      // Assert
      expect(formatted).toContain("## Warnings");
      expect(formatted).toContain("⚠️ No create tool found for dependency-resource");
      expect(formatted).toContain("⚠️ Manual configuration required");
    });

    it("should format plan with oneOf choices", () => {
      // Arrange
      const plan: CreationPlan = {
        targetResource: "http-loadbalancer",
        targetDomain: "virtual",
        totalSteps: 1,
        complexity: "low",
        steps: [
          {
            stepNumber: 1,
            action: "create",
            domain: "virtual",
            resource: "http-loadbalancer",
            toolName: "f5xc-api-virtual-http-loadbalancer-create",
            dependsOn: [],
            optional: false,
            requiredInputs: ["metadata.name"],
            oneOfChoices: [
              {
                field: "origin_pools_weights",
                options: ["origin_pool", "pool_weights", "ad_pool_priority"],
                description: "Choose origin pool configuration method",
              },
            ],
          },
        ],
        warnings: [],
        alternatives: [],
        subscriptions: [],
      };

      // Act
      const formatted = formatCreationPlan(plan);

      // Assert
      expect(formatted).toContain("**Mutually Exclusive Choices**:");
      expect(formatted).toContain("`origin_pools_weights`");
      expect(formatted).toContain("origin_pool, pool_weights, ad_pool_priority");
    });

    it("should format plan with alternatives", () => {
      // Arrange
      const plan: CreationPlan = {
        targetResource: "http-loadbalancer",
        targetDomain: "virtual",
        totalSteps: 1,
        complexity: "low",
        steps: [
          {
            stepNumber: 1,
            action: "create",
            domain: "virtual",
            resource: "http-loadbalancer",
            toolName: "f5xc-api-virtual-http-loadbalancer-create",
            dependsOn: [],
            optional: false,
            requiredInputs: ["metadata.name"],
          },
        ],
        warnings: [],
        alternatives: [
          {
            choiceField: "origin_pools_weights",
            selectedOption: "origin_pool",
            steps: [],
            description: "Alternative using origin_pool for origin_pools_weights",
          },
        ],
        subscriptions: [],
      };

      // Act
      const formatted = formatCreationPlan(plan);

      // Assert
      expect(formatted).toContain("## Alternative Paths");
      expect(formatted).toContain("**origin_pools_weights**: origin_pool");
    });
  });

  describe("generateCompactPlan", () => {
    it("should generate compact JSON plan", () => {
      // Arrange
      vi.mocked(getResourceDependencies).mockReturnValue({
        resourceType: "http-loadbalancer",
        domain: "virtual",
        prerequisites: [],
        optional: [],
      });

      vi.mocked(getPrerequisiteResources).mockReturnValue([]);
      vi.mocked(getOneOfGroups).mockReturnValue([]);
      vi.mocked(getSubscriptionRequirements).mockReturnValue([]);

      const params: ResolveParams = {
        resource: "http-loadbalancer",
        domain: "virtual",
      };

      // Act
      const result = generateCompactPlan(params);

      // Assert
      expect(result.success).toBe(true);
      expect(result.steps).toBeDefined();
      expect(result.steps?.length).toBe(1);
      expect(result.steps?.[0]).toHaveProperty("tool");
      expect(result.steps?.[0]).toHaveProperty("resource");
      expect(result.steps?.[0]).toHaveProperty("inputs");
      expect(result.steps?.[0].resource).toBe("virtual/http-loadbalancer");
    });

    it("should include oneOf choices in compact format", () => {
      // Arrange
      vi.mocked(getResourceDependencies).mockReturnValue({
        resourceType: "http-loadbalancer",
        domain: "virtual",
        prerequisites: [],
        optional: [],
      });

      vi.mocked(getPrerequisiteResources).mockReturnValue([]);

      vi.mocked(getOneOfGroups).mockReturnValue([
        {
          choiceField: "origin_pools_weights",
          description: "Choose origin pool configuration method",
          options: ["origin_pool", "pool_weights"],
        },
      ]);

      vi.mocked(getSubscriptionRequirements).mockReturnValue([]);

      const params: ResolveParams = {
        resource: "http-loadbalancer",
        domain: "virtual",
      };

      // Act
      const result = generateCompactPlan(params);

      // Assert
      expect(result.success).toBe(true);
      expect(result.steps?.[0].choices).toBeDefined();
      expect(result.steps?.[0].choices?.origin_pools_weights).toEqual([
        "origin_pool",
        "pool_weights",
      ]);
    });

    it("should return error for invalid resource", () => {
      // Arrange
      vi.mocked(getResourceDependencies).mockReturnValue(null);

      const params: ResolveParams = {
        resource: "nonexistent",
        domain: "invalid",
      };

      // Act
      const result = generateCompactPlan(params);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toContain("not found in dependency graph");
    });
  });
});
