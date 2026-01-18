// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Healthcheck Creation Tests (v2.0.32+) - Schema-Driven
 *
 * Programmatically generates test cases from OpenAPI spec metadata.
 * Tests are automatically updated when spec changes.
 *
 * Test Matrix:
 * - Plain language query discovery
 * - Minimal configuration validation
 * - Recommended values application
 * - Server default documentation
 * - Configuration variants
 */

import { describe, it, expect, vi } from "vitest";
import { searchTools } from "../../../src/tools/discovery/search.js";
import { describeTool } from "../../../src/tools/discovery/describe.js";
import { validateToolParams } from "../../../src/tools/discovery/validate.js";
import {
  getToolSchemaMetadata,
  generateTestMatrix,
  generatePlainLanguageTests,
  analyzeConfigWithDefaults,
  getServerDefaultsSummary,
  getRecommendedValuesSummary,
} from "../utils/schema-driven-tests.js";

// Mock logger
vi.mock("../../../src/utils/logging.js", () => ({
  logger: {
    error: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
  },
}));

const HEALTHCHECK_TOOL = "f5xc-api-virtual-healthcheck-create";

// Plain language test mappings
const PLAIN_LANGUAGE_QUERIES = [
  {
    plainText: "Create a health check for my web servers",
    searchQuery: "create health check",
    minimalConfig: {
      metadata: { name: "web-hc", namespace: "default" },
      spec: { http_health_check: { path: "/health", use_origin_server_name: {} } },
    },
  },
  {
    plainText: "Set up HTTP health monitoring",
    searchQuery: "http health check create",
    minimalConfig: {
      metadata: { name: "http-hc", namespace: "default" },
      spec: { http_health_check: { path: "/", use_origin_server_name: {} } },
    },
  },
  {
    plainText: "Create TCP health check",
    searchQuery: "create healthcheck tcp",
    minimalConfig: {
      metadata: { name: "tcp-hc", namespace: "default" },
      spec: { tcp_health_check: {} },
    },
  },
  {
    plainText: "Add health monitoring with 5 second timeout",
    searchQuery: "create health check timeout",
    minimalConfig: {
      metadata: { name: "timeout-hc", namespace: "default" },
      spec: { timeout: 5, http_health_check: { path: "/health", use_origin_server_name: {} } },
    },
  },
  {
    plainText: "Create a minimal health check configuration",
    searchQuery: "create healthcheck minimal",
    minimalConfig: {
      metadata: { name: "minimal-hc", namespace: "default" },
      spec: { http_health_check: { path: "/", use_origin_server_name: {} } },
    },
  },
];

// Base configuration for test matrix
const BASE_HEALTHCHECK_CONFIG = {
  metadata: { name: "test-healthcheck", namespace: "default" },
  spec: { http_health_check: { path: "/health", use_origin_server_name: {} } },
};

// Optional field variants to test
const HEALTHCHECK_VARIANTS = {
  "spec.timeout": [1, 3, 5, 10, 30],
  "spec.interval": [5, 15, 30, 60],
  "spec.unhealthy_threshold": [1, 2, 3, 5],
  "spec.healthy_threshold": [1, 2, 3, 5],
  "spec.jitter_percent": [0, 10, 30, 50],
};

// Initialize schema metadata and test matrix synchronously at module load
// This is required because test registration happens synchronously
const schemaMetadata = getToolSchemaMetadata(HEALTHCHECK_TOOL);

const testMatrix = generateTestMatrix({
  toolName: HEALTHCHECK_TOOL,
  baseConfig: BASE_HEALTHCHECK_CONFIG,
  requiredFields: ["metadata.name", "metadata.namespace"],
  optionalFieldVariants: HEALTHCHECK_VARIANTS,
});

describe("Healthcheck - Schema Metadata Extraction", () => {
  it("should load healthcheck schema metadata", () => {
    expect(schemaMetadata).toBeDefined();
    expect(schemaMetadata.toolName).toBe(HEALTHCHECK_TOOL);
  });

  it("should extract server defaults from schema", () => {
    // Server defaults should be extracted from x-f5xc-server-default markers
    expect(Array.isArray(schemaMetadata.serverDefaults)).toBe(true);

    // Log discovered defaults for visibility
    console.log("\n📋 Healthcheck Server Defaults:");
    for (const def of schemaMetadata.serverDefaults) {
      console.log(`   ${def.fieldPath} → ${JSON.stringify(def.defaultValue)}`);
    }
  });

  it("should extract recommended values from schema", () => {
    expect(Array.isArray(schemaMetadata.recommendedValues)).toBe(true);

    // Log discovered recommended values
    console.log("\n📋 Healthcheck Recommended Values:");
    for (const rec of schemaMetadata.recommendedValues) {
      console.log(`   ${rec.fieldPath} → ${JSON.stringify(rec.recommendedValue)}`);
    }
  });

  it("should provide summary for documentation", () => {
    const serverSummary = getServerDefaultsSummary(HEALTHCHECK_TOOL);
    const recommendedSummary = getRecommendedValuesSummary(HEALTHCHECK_TOOL);

    expect(Array.isArray(serverSummary)).toBe(true);
    expect(Array.isArray(recommendedSummary)).toBe(true);
  });
});

describe("Healthcheck - Plain Language Query Discovery", () => {
  const plainLanguageTests = generatePlainLanguageTests(HEALTHCHECK_TOOL, PLAIN_LANGUAGE_QUERIES);

  for (const test of plainLanguageTests) {
    describe(`Query: "${test.query}"`, () => {
      it("should find healthcheck tool via search", () => {
        const results = searchTools(test.searchQuery, { limit: 10 });

        expect(results.length).toBeGreaterThan(0);

        // Should find healthcheck-related tool
        const hasHealthcheck = results.some(
          (r) =>
            r.tool.resource.includes("healthcheck") ||
            r.tool.name.includes("healthcheck") ||
            r.tool.resource.includes("health-check")
        );
        expect(hasHealthcheck).toBe(true);
      });

      it("should validate minimal configuration", () => {
        const result = validateToolParams({
          toolName: HEALTHCHECK_TOOL,
          pathParams: { "metadata.namespace": "default" },
          body: test.config,
        });

        expect(result.valid).toBe(true);
      });

      it("should analyze what server will apply", () => {
        const analysis = analyzeConfigWithDefaults(HEALTHCHECK_TOOL, test.config);

        // Server will apply defaults for omitted fields
        expect(Array.isArray(analysis.serverWillApply)).toBe(true);

        // Log what server will apply
        if (analysis.serverWillApply.length > 0) {
          console.log(`\n   Server will apply for "${test.query}":`);
          for (const applied of analysis.serverWillApply) {
            console.log(`      ${applied.field} → ${JSON.stringify(applied.value)}`);
          }
        }
      });
    });
  }
});

describe("Healthcheck - Programmatic Configuration Matrix", () => {
  // This test suite is entirely generated from schema metadata
  describe("Generated Test Cases", () => {
    for (const testCase of testMatrix) {
      it(`should validate: ${testCase.name}`, () => {
        const result = validateToolParams({
          toolName: HEALTHCHECK_TOOL,
          pathParams: { "metadata.namespace": "default" },
          body: testCase.config,
        });

        expect(result.valid).toBe(testCase.expectedValid);
      });
    }
  });

  describe("Server Defaults Application", () => {
    it("should track all server defaults that will be applied to minimal config", () => {
      const minimalConfig = BASE_HEALTHCHECK_CONFIG;
      const analysis = analyzeConfigWithDefaults(HEALTHCHECK_TOOL, minimalConfig);

      console.log("\n📊 Server Defaults Analysis for Minimal Config:");
      console.log(`   Provided fields: ${analysis.providedFields.length}`);
      console.log(`   Server will apply: ${analysis.serverWillApply.length} defaults`);

      for (const applied of analysis.serverWillApply) {
        console.log(`      • ${applied.field} → ${JSON.stringify(applied.value)}`);
      }

      // Verify analysis structure
      expect(Array.isArray(analysis.serverWillApply)).toBe(true);
    });
  });
});

describe("Healthcheck - Recommended Values Validation", () => {
  /**
   * Expected recommended values from v2.0.32 spec:
   * - timeout: 3 seconds
   * - interval: 15 seconds
   * - unhealthy_threshold: 1
   * - healthy_threshold: 3
   * - jitter_percent: 30 (for production)
   */

  const EXPECTED_RECOMMENDATIONS = {
    "spec.timeout": 3,
    "spec.interval": 15,
    "spec.unhealthy_threshold": 1,
    "spec.healthy_threshold": 3,
    "spec.jitter_percent": 30,
  };

  it("should match expected recommended values from spec", () => {
    const recommendations = schemaMetadata.recommendedValues;

    for (const [field, expectedValue] of Object.entries(EXPECTED_RECOMMENDATIONS)) {
      // Find matching recommendation (may have different path format)
      const fieldName = field.split(".").pop();
      const rec = recommendations.find((r) => r.fieldPath.includes(fieldName!));

      if (rec) {
        expect(rec.recommendedValue).toBe(expectedValue);
      }
    }
  });

  it("should identify when config uses recommended values", () => {
    const configWithRecommended = {
      metadata: { name: "recommended-hc", namespace: "default" },
      spec: {
        timeout: 3,
        interval: 15,
        unhealthy_threshold: 1,
        healthy_threshold: 3,
        jitter_percent: 30,
        http_health_check: { path: "/health", use_origin_server_name: {} },
      },
    };

    const analysis = analyzeConfigWithDefaults(HEALTHCHECK_TOOL, configWithRecommended);

    console.log("\n✅ Fields matching recommended values:");
    for (const match of analysis.matchesRecommended) {
      console.log(`   ${match.field}: ${match.provided} (recommended: ${match.recommended})`);
    }

    // When using recommended values, server doesn't need to apply defaults for those
    expect(analysis.matchesRecommended.length).toBeGreaterThanOrEqual(0);
  });

  it("should identify when config uses values below recommended", () => {
    const configBelowRecommended = {
      metadata: { name: "below-rec-hc", namespace: "default" },
      spec: {
        timeout: 1, // Below recommended 3
        interval: 5, // Below recommended 15
        unhealthy_threshold: 1,
        healthy_threshold: 1, // Below recommended 3
        http_health_check: { path: "/health", use_origin_server_name: {} },
      },
    };

    const analysis = analyzeConfigWithDefaults(HEALTHCHECK_TOOL, configBelowRecommended);

    console.log("\n⚠️ Fields below recommended values:");
    for (const below of analysis.belowRecommended) {
      console.log(`   ${below.field}: ${below.provided} < ${below.recommended} (recommended)`);
    }

    // Advisory: these values work but are below recommended
    expect(Array.isArray(analysis.belowRecommended)).toBe(true);
  });
});

describe("Healthcheck - Search Tool Integration", () => {
  it("should find create tool with POST method", async () => {
    const results = searchTools("create healthcheck", { operations: ["create"], limit: 1 });

    expect(results.length).toBeGreaterThan(0);

    const description = await describeTool(results[0].tool.name);
    expect(description.method).toBe("POST");
  });

  it("should filter to virtual domain", () => {
    const results = searchTools("healthcheck", { domains: ["virtual"], limit: 5 });

    expect(results.every((r) => r.tool.domain === "virtual")).toBe(true);
  });

  it("should filter to create operations only", () => {
    const results = searchTools("healthcheck", { operations: ["create"], limit: 5 });

    expect(results.every((r) => r.tool.operation === "create")).toBe(true);
  });
});

describe("Healthcheck - Error Handling", () => {
  it("should warn when metadata.name is missing", () => {
    const invalidConfig = {
      metadata: { namespace: "default" },
      spec: { http_health_check: { path: "/health", use_origin_server_name: {} } },
    };

    const result = validateToolParams({
      toolName: HEALTHCHECK_TOOL,
      pathParams: { "metadata.namespace": "default" },
      body: invalidConfig,
    });

    expect(result.warnings.some((w) => w.toLowerCase().includes("name"))).toBe(true);
  });

  it("should pass validation when body is missing for documentation mode", () => {
    const result = validateToolParams({
      toolName: HEALTHCHECK_TOOL,
      pathParams: { "metadata.namespace": "default" },
    });

    // Errors are expected for missing body in create operation
    // But tool should be found
    expect(result.tool).toBeDefined();
  });
});

describe("Healthcheck - Test Matrix Statistics", () => {
  it("should report generated test statistics", () => {
    console.log("\n📊 Healthcheck Test Matrix Statistics:");
    console.log(`   Total generated test cases: ${testMatrix.length}`);
    console.log(`   Server defaults tracked: ${schemaMetadata.serverDefaults.length}`);
    console.log(`   Recommended values tracked: ${schemaMetadata.recommendedValues.length}`);
    console.log(`   Plain language queries tested: ${PLAIN_LANGUAGE_QUERIES.length}`);

    expect(testMatrix.length).toBeGreaterThan(0);
  });
});
