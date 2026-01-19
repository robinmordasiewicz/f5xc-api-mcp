// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  suggestParameters,
  suggestParametersLegacy,
  getAvailableExamples,
  hasSuggestedParameters,
  hasCuratedExample,
  getSuggestionSource,
  getSuggestionStats,
  type SuggestionResult,
} from "../../../../src/tools/discovery/suggest-params.js";

// Mock dependencies
vi.mock("../../../../src/tools/registry.js", () => ({
  getToolByName: vi.fn(),
}));

vi.mock("../../../../src/tools/discovery/schema.js", () => ({
  getMinimumConfiguration: vi.fn(),
  getRequiredFields: vi.fn(() => []),
  getMutuallyExclusiveFields: vi.fn(() => []),
  generateSmartExamplePayload: vi.fn(),
}));

import { getToolByName } from "../../../../src/tools/registry.js";
import {
  getMinimumConfiguration,
  getRequiredFields,
  getMutuallyExclusiveFields,
  generateSmartExamplePayload,
} from "../../../../src/tools/discovery/schema.js";

describe("Parameter Suggestions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("suggestParameters - 3-Tier Fallback System", () => {
    it("should return null for non-existent tool", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue(undefined);

      // Act
      const result = suggestParameters("nonexistent-tool");

      // Assert
      expect(result).toBeNull();
    });

    it("should use spec example as priority 1 (highest priority)", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "test-tool",
        resource: "test-resource",
        operation: "create",
        requestBodySchema: {},
      } as any);

      vi.mocked(getMinimumConfiguration).mockReturnValue({
        example_json: JSON.stringify({ test: "spec-example" }),
        description: "Spec example description",
        required_fields: ["test"],
      });

      vi.mocked(getRequiredFields).mockReturnValue(["test"]);
      vi.mocked(getMutuallyExclusiveFields).mockReturnValue([]);

      // Act
      const result = suggestParameters("test-tool");

      // Assert
      expect(result).not.toBeNull();
      expect(result?.source).toBe("spec");
      expect(result?.examplePayload).toEqual({ test: "spec-example" });
      expect(result?.description).toContain("Spec example description");
      expect(result?.requiredFields).toEqual(["test"]);
    });

    it("should use curated example as priority 2 when spec unavailable", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "f5xc-api-virtual-http-loadbalancer-create",
        resource: "http-loadbalancer",
        operation: "create",
        requestBodySchema: {},
      } as any);

      vi.mocked(getMinimumConfiguration).mockReturnValue(null);
      vi.mocked(getRequiredFields).mockReturnValue([]);
      vi.mocked(getMutuallyExclusiveFields).mockReturnValue([]);

      // Act
      const result = suggestParameters("f5xc-api-virtual-http-loadbalancer-create");

      // Assert
      expect(result).not.toBeNull();
      expect(result?.source).toBe("curated");
      expect(result?.description).toContain("Curated example");
      expect(result?.examplePayload).toHaveProperty("metadata");
      expect(result?.examplePayload).toHaveProperty("spec");
    });

    it("should use schema-generated example as priority 3 (fallback)", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "test-tool",
        resource: "test-resource",
        operation: "create",
        requestBodySchema: {},
      } as any);

      vi.mocked(getMinimumConfiguration).mockReturnValue(null);
      vi.mocked(getRequiredFields).mockReturnValue([]);
      vi.mocked(getMutuallyExclusiveFields).mockReturnValue([]);
      vi.mocked(generateSmartExamplePayload).mockReturnValue({ generated: "payload" });

      // Act
      const result = suggestParameters("test-tool");

      // Assert
      expect(result).not.toBeNull();
      expect(result?.source).toBe("generated");
      expect(result?.description).toContain("Auto-generated");
      expect(result?.examplePayload).toEqual({ generated: "payload" });
      expect(result?.notes).toContain("This example was auto-generated from the schema");
    });

    it("should handle invalid JSON in spec and fall through to curated", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "f5xc-api-virtual-http-loadbalancer-create",
        resource: "http-loadbalancer",
        operation: "create",
        requestBodySchema: {},
      } as any);

      vi.mocked(getMinimumConfiguration).mockReturnValue({
        example_json: "{ invalid json",
        description: "Should be skipped",
      });

      vi.mocked(getRequiredFields).mockReturnValue([]);
      vi.mocked(getMutuallyExclusiveFields).mockReturnValue([]);

      // Act
      const result = suggestParameters("f5xc-api-virtual-http-loadbalancer-create");

      // Assert
      expect(result).not.toBeNull();
      expect(result?.source).toBe("curated"); // Should fall through to curated
    });

    it("should return null when all three tiers fail", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "test-tool",
        resource: "test-resource",
        operation: "create",
      } as any);

      vi.mocked(getMinimumConfiguration).mockReturnValue(null);
      vi.mocked(generateSmartExamplePayload).mockReturnValue(null);

      // Act
      const result = suggestParameters("test-tool");

      // Assert
      expect(result).toBeNull();
    });
  });

  describe("suggestParameters - Curated Examples", () => {
    beforeEach(() => {
      vi.mocked(getMinimumConfiguration).mockReturnValue(null);
      vi.mocked(getRequiredFields).mockReturnValue([]);
      vi.mocked(getMutuallyExclusiveFields).mockReturnValue([]);
    });

    it("should return HTTP load balancer example", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "f5xc-api-virtual-http-loadbalancer-create",
        resource: "http-loadbalancer",
        operation: "create",
      } as any);

      // Act
      const result = suggestParameters("f5xc-api-virtual-http-loadbalancer-create");

      // Assert
      expect(result).not.toBeNull();
      expect(result?.source).toBe("curated");
      expect(result?.examplePayload).toHaveProperty("metadata.name", "my-http-lb");
      expect(result?.examplePayload).toHaveProperty("spec.domains");
    });

    it("should return origin pool example", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "f5xc-api-virtual-origin-pool-create",
        resource: "origin-pool",
        operation: "create",
      } as any);

      // Act
      const result = suggestParameters("f5xc-api-virtual-origin-pool-create");

      // Assert
      expect(result).not.toBeNull();
      expect(result?.source).toBe("curated");
      expect(result?.examplePayload).toHaveProperty("metadata.name", "my-origin-pool");
      expect(result?.examplePayload).toHaveProperty("spec.origins");
      expect(result?.examplePayload).toHaveProperty("spec.healthcheck");
    });

    it("should return TCP load balancer example", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "f5xc-api-virtual-tcp-loadbalancer-create",
        resource: "tcp-loadbalancer",
        operation: "create",
      } as any);

      // Act
      const result = suggestParameters("f5xc-api-virtual-tcp-loadbalancer-create");

      // Assert
      expect(result).not.toBeNull();
      expect(result?.source).toBe("curated");
      expect(result?.examplePayload).toHaveProperty("metadata.name", "my-tcp-lb");
      expect(result?.examplePayload).toHaveProperty("spec.listen_port", 3306);
    });

    it("should return DNS zone example", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "f5xc-api-dns-zone-create",
        resource: "zone",
        operation: "create",
      } as any);

      // Act
      const result = suggestParameters("f5xc-api-dns-zone-create");

      // Assert
      expect(result).not.toBeNull();
      expect(result?.source).toBe("curated");
      expect(result?.examplePayload).toHaveProperty("metadata.name", "example-com-zone");
      expect(result?.examplePayload).toHaveProperty("spec.zone_name", "example.com");
    });

    it("should return DNS load balancer example", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "f5xc-api-dns-load-balancer-create",
        resource: "load-balancer",
        operation: "create",
      } as any);

      // Act
      const result = suggestParameters("f5xc-api-dns-load-balancer-create");

      // Assert
      expect(result).not.toBeNull();
      expect(result?.source).toBe("curated");
      expect(result?.examplePayload).toHaveProperty("metadata.name", "my-dns-lb");
      expect(result?.examplePayload).toHaveProperty("spec.dns_lb_type");
    });

    it("should return certificate example", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "f5xc-api-certificates-certificate-create",
        resource: "certificate",
        operation: "create",
      } as any);

      // Act
      const result = suggestParameters("f5xc-api-certificates-certificate-create");

      // Assert
      expect(result).not.toBeNull();
      expect(result?.source).toBe("curated");
      expect(result?.examplePayload).toHaveProperty("metadata.name", "my-certificate");
      expect(result?.examplePayload).toHaveProperty("spec.certificate_url");
      expect(result?.examplePayload).toHaveProperty("spec.private_key");
    });

    it("should return namespace example", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "f5xc-api-system-namespace-create",
        resource: "namespace",
        operation: "create",
      } as any);

      // Act
      const result = suggestParameters("f5xc-api-system-namespace-create");

      // Assert
      expect(result).not.toBeNull();
      expect(result?.source).toBe("curated");
      expect(result?.examplePayload).toHaveProperty("metadata.name", "my-namespace");
    });

    it("should return WAF policy example", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "f5xc-api-app-firewall-policy-create",
        resource: "app-firewall-policy",
        operation: "create",
      } as any);

      // Act
      const result = suggestParameters("f5xc-api-app-firewall-policy-create");

      // Assert
      expect(result).not.toBeNull();
      expect(result?.source).toBe("curated");
      expect(result?.examplePayload).toHaveProperty("metadata.name", "my-waf-policy");
      expect(result?.examplePayload).toHaveProperty("spec.blocking", true);
    });

    it("should return service policy example", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "f5xc-api-network-security-service-policy-create",
        resource: "service-policy",
        operation: "create",
      } as any);

      // Act
      const result = suggestParameters("f5xc-api-network-security-service-policy-create");

      // Assert
      expect(result).not.toBeNull();
      expect(result?.source).toBe("curated");
      expect(result?.examplePayload).toHaveProperty("metadata.name", "my-service-policy");
      expect(result?.examplePayload).toHaveProperty("spec.rule_list");
    });

    it("should return network firewall example", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "f5xc-api-network-security-network-firewall-create",
        resource: "network-firewall",
        operation: "create",
      } as any);

      // Act
      const result = suggestParameters("f5xc-api-network-security-network-firewall-create");

      // Assert
      expect(result).not.toBeNull();
      expect(result?.source).toBe("curated");
      expect(result?.examplePayload).toHaveProperty("metadata.name", "my-network-firewall");
      expect(result?.examplePayload).toHaveProperty("spec.active_service_policies");
    });

    it("should return rate limiter example", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "f5xc-api-rate-limiting-rate-limiter-create",
        resource: "rate-limiter",
        operation: "create",
      } as any);

      // Act
      const result = suggestParameters("f5xc-api-rate-limiting-rate-limiter-create");

      // Assert
      expect(result).not.toBeNull();
      expect(result?.source).toBe("curated");
      expect(result?.examplePayload).toHaveProperty("metadata.name", "my-rate-limiter");
      expect(result?.examplePayload).toHaveProperty("spec.limits");
    });
  });

  describe("suggestParameters - Metadata Enrichment", () => {
    beforeEach(() => {
      vi.mocked(getMinimumConfiguration).mockReturnValue(null);
    });

    it("should include required fields in result", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "f5xc-api-virtual-http-loadbalancer-create",
        resource: "http-loadbalancer",
        operation: "create",
      } as any);

      vi.mocked(getRequiredFields).mockReturnValue(["metadata.name", "spec.domains"]);
      vi.mocked(getMutuallyExclusiveFields).mockReturnValue([]);

      // Act
      const result = suggestParameters("f5xc-api-virtual-http-loadbalancer-create");

      // Assert
      expect(result?.requiredFields).toEqual(["metadata.name", "spec.domains"]);
    });

    it("should include mutually exclusive groups in result", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "f5xc-api-virtual-http-loadbalancer-create",
        resource: "http-loadbalancer",
        operation: "create",
      } as any);

      vi.mocked(getRequiredFields).mockReturnValue([]);
      vi.mocked(getMutuallyExclusiveFields).mockReturnValue([
        {
          fieldPath: "origin_pools_weights",
          options: [
            { fieldName: "origin_pool", description: "Single pool" },
            { fieldName: "pool_weights", description: "Weighted pools" },
          ],
          recommendedOption: "origin_pool",
        },
      ]);

      // Act
      const result = suggestParameters("f5xc-api-virtual-http-loadbalancer-create");

      // Assert
      expect(result?.mutuallyExclusiveGroups).toBeDefined();
      expect(result?.mutuallyExclusiveGroups?.length).toBe(1);
      expect(result?.mutuallyExclusiveGroups?.[0].recommendedOption).toBe("origin_pool");
    });

    it("should include notes from curated examples", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "f5xc-api-virtual-http-loadbalancer-create",
        resource: "http-loadbalancer",
        operation: "create",
      } as any);

      vi.mocked(getRequiredFields).mockReturnValue([]);
      vi.mocked(getMutuallyExclusiveFields).mockReturnValue([]);

      // Act
      const result = suggestParameters("f5xc-api-virtual-http-loadbalancer-create");

      // Assert
      expect(result?.notes).toBeDefined();
      expect(result?.notes?.length).toBeGreaterThan(0);
      expect(result?.notes).toContain("This is a complete, working example based on common usage patterns");
    });

    it("should include notes from spec examples", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "test-tool",
        resource: "test-resource",
        operation: "create",
      } as any);

      vi.mocked(getMinimumConfiguration).mockReturnValue({
        example_json: JSON.stringify({ test: "value" }),
        description: "Test description",
        required_fields: ["test"],
      });

      vi.mocked(getRequiredFields).mockReturnValue([]);
      vi.mocked(getMutuallyExclusiveFields).mockReturnValue([]);

      // Act
      const result = suggestParameters("test-tool");

      // Assert
      expect(result?.notes).toBeDefined();
      expect(result?.notes).toContain("Test description");
      expect(result?.notes).toContain("Required fields: test");
    });

    it("should include curl and yaml examples from spec", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "test-tool",
        resource: "test-resource",
        operation: "create",
      } as any);

      vi.mocked(getMinimumConfiguration).mockReturnValue({
        example_json: JSON.stringify({ test: "value" }),
        example_curl: "curl -X POST ...",
        example_yaml: "test: value",
      });

      vi.mocked(getRequiredFields).mockReturnValue([]);
      vi.mocked(getMutuallyExclusiveFields).mockReturnValue([]);

      // Act
      const result = suggestParameters("test-tool");

      // Assert
      expect(result?.curlExample).toBe("curl -X POST ...");
      expect(result?.yamlExample).toBe("test: value");
    });
  });

  describe("suggestParametersLegacy", () => {
    it("should return legacy format", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "f5xc-api-virtual-http-loadbalancer-create",
        resource: "http-loadbalancer",
        operation: "create",
      } as any);

      vi.mocked(getMinimumConfiguration).mockReturnValue(null);
      vi.mocked(getRequiredFields).mockReturnValue([]);
      vi.mocked(getMutuallyExclusiveFields).mockReturnValue([]);

      // Act
      const result = suggestParametersLegacy("f5xc-api-virtual-http-loadbalancer-create");

      // Assert
      expect(result).not.toBeNull();
      expect(result).toHaveProperty("examplePayload");
      expect(result).toHaveProperty("description");
      expect(result).toHaveProperty("notes");
      expect(result).not.toHaveProperty("source"); // Legacy doesn't include source
    });

    it("should return null for non-existent tool", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue(undefined);

      // Act
      const result = suggestParametersLegacy("nonexistent-tool");

      // Assert
      expect(result).toBeNull();
    });
  });

  describe("getAvailableExamples", () => {
    it("should return list of curated example tool names", () => {
      // Act
      const examples = getAvailableExamples();

      // Assert
      expect(examples).toBeInstanceOf(Array);
      expect(examples.length).toBe(11); // 11 curated examples
      expect(examples).toContain("f5xc-api-virtual-http-loadbalancer-create");
      expect(examples).toContain("f5xc-api-virtual-origin-pool-create");
      expect(examples).toContain("f5xc-api-dns-zone-create");
    });
  });

  describe("hasSuggestedParameters", () => {
    it("should return true for curated examples", () => {
      // Act
      const result = hasSuggestedParameters("f5xc-api-virtual-http-loadbalancer-create");

      // Assert
      expect(result).toBe(true);
    });

    it("should return true for tools with request body schema", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "test-tool",
        resource: "test-resource",
        operation: "create",
        requestBodySchema: {},
      } as any);

      // Act
      const result = hasSuggestedParameters("test-tool");

      // Assert
      expect(result).toBe(true);
    });

    it("should return false for tools without suggestions", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "test-tool",
        resource: "test-resource",
        operation: "get",
      } as any);

      // Act
      const result = hasSuggestedParameters("test-tool");

      // Assert
      expect(result).toBe(false);
    });
  });

  describe("hasCuratedExample", () => {
    it("should return true for curated examples", () => {
      // Act
      const result = hasCuratedExample("f5xc-api-virtual-http-loadbalancer-create");

      // Assert
      expect(result).toBe(true);
    });

    it("should return false for non-curated tools", () => {
      // Act
      const result = hasCuratedExample("nonexistent-tool");

      // Assert
      expect(result).toBe(false);
    });
  });

  describe("getSuggestionSource", () => {
    beforeEach(() => {
      vi.mocked(getRequiredFields).mockReturnValue([]);
      vi.mocked(getMutuallyExclusiveFields).mockReturnValue([]);
    });

    it("should return 'spec' for tools with minimum configuration", () => {
      // Arrange
      vi.mocked(getMinimumConfiguration).mockReturnValue({
        example_json: JSON.stringify({ test: "value" }),
      });

      // Act
      const result = getSuggestionSource("test-tool");

      // Assert
      expect(result).toBe("spec");
    });

    it("should return 'curated' for tools with curated examples", () => {
      // Arrange
      vi.mocked(getMinimumConfiguration).mockReturnValue(null);

      // Act
      const result = getSuggestionSource("f5xc-api-virtual-http-loadbalancer-create");

      // Assert
      expect(result).toBe("curated");
    });

    it("should return 'generated' for tools with request body schema", () => {
      // Arrange
      vi.mocked(getMinimumConfiguration).mockReturnValue(null);
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "test-tool",
        resource: "test-resource",
        operation: "create",
        requestBodySchema: {},
      } as any);

      // Act
      const result = getSuggestionSource("test-tool");

      // Assert
      expect(result).toBe("generated");
    });

    it("should return null for tools without suggestions", () => {
      // Arrange
      vi.mocked(getMinimumConfiguration).mockReturnValue(null);
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "test-tool",
        resource: "test-resource",
        operation: "get",
      } as any);

      // Act
      const result = getSuggestionSource("test-tool");

      // Assert
      expect(result).toBeNull();
    });
  });

  describe("getSuggestionStats", () => {
    it("should return statistics about curated examples", () => {
      // Act
      const stats = getSuggestionStats();

      // Assert
      expect(stats).toHaveProperty("curatedCount");
      expect(stats).toHaveProperty("curatedTools");
      expect(stats.curatedCount).toBe(11);
      expect(stats.curatedTools).toBeInstanceOf(Array);
      expect(stats.curatedTools.length).toBe(11);
    });
  });
});
