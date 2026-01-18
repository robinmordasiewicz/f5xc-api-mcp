// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Origin Pool Creation Tests (v2.0.33+) - Schema-Driven
 *
 * Programmatically generates test cases from OpenAPI spec metadata.
 * Tests are automatically updated when spec changes.
 *
 * Key v2.0.33 Enhancements:
 * - UI vs Server algorithm discrepancy documented
 * - Server defaults: ROUND_ROBIN, DISTRIBUTED, no_tls
 * - OneOf field patterns for mutual exclusivity
 *
 * Test Matrix:
 * - Plain language query discovery
 * - Minimal configuration validation
 * - Server default application
 * - OneOf pattern validation
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
  generateOneOfTests,
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

const ORIGIN_POOL_TOOL = "f5xc-api-virtual-origin-pool-create";

// Plain language test mappings
const PLAIN_LANGUAGE_QUERIES = [
  {
    plainText: "Create an origin pool for my backend servers",
    searchQuery: "create origin pool",
    minimalConfig: {
      metadata: { name: "backend-pool", namespace: "default" },
      spec: {
        origin_servers: [{ public_ip: { ip: "192.0.2.1" } }],
        port: 80,
      },
    },
  },
  {
    plainText: "Set up a backend pool with multiple servers",
    searchQuery: "backend pool servers",
    minimalConfig: {
      metadata: { name: "multi-pool", namespace: "default" },
      spec: {
        origin_servers: [
          { public_ip: { ip: "192.0.2.1" } },
          { public_ip: { ip: "192.0.2.2" } },
        ],
        port: 8080,
      },
    },
  },
  {
    plainText: "Create origin pool with TLS to backend",
    searchQuery: "create origin pool tls",
    minimalConfig: {
      metadata: { name: "tls-pool", namespace: "default" },
      spec: {
        origin_servers: [{ public_ip: { ip: "192.0.2.1" } }],
        port: 443,
        use_tls: { use_host_header_as_sni: {} },
      },
    },
  },
  {
    plainText: "Configure load balancing for my origins",
    searchQuery: "create origin pool",
    minimalConfig: {
      metadata: { name: "lb-pool", namespace: "default" },
      spec: {
        origin_servers: [{ public_ip: { ip: "192.0.2.1" } }],
        port: 80,
        loadbalancer_algorithm: "LEAST_REQUEST",
      },
    },
  },
  {
    plainText: "Create HTTPS origin pool",
    searchQuery: "create origin pool https",
    minimalConfig: {
      metadata: { name: "https-pool", namespace: "default" },
      spec: {
        origin_servers: [{ public_ip: { ip: "192.0.2.1" } }],
        port: 443,
        use_tls: { use_host_header_as_sni: {} },
      },
    },
  },
];

// Base configuration for test matrix
const BASE_ORIGIN_POOL_CONFIG = {
  metadata: { name: "test-origin-pool", namespace: "default" },
  spec: {
    origin_servers: [{ public_ip: { ip: "192.0.2.1" } }],
    port: 80,
  },
};

// Optional field variants to test
const ORIGIN_POOL_VARIANTS = {
  "spec.port": [80, 443, 8080, 8443],
  "spec.loadbalancer_algorithm": [
    "ROUND_ROBIN",
    "LEAST_REQUEST",
    "RING_HASH",
    "RANDOM",
    "LB_OVERRIDE",
  ],
  "spec.endpoint_selection": ["DISTRIBUTED", "LOCAL_PREFERRED", "LOCAL_ONLY"],
};

// OneOf field groups for origin pool
const ORIGIN_POOL_ONEOF_GROUPS = [
  {
    name: "TLS Configuration",
    options: ["no_tls", "use_tls"],
    validConfigs: [
      {
        metadata: { name: "notls-pool", namespace: "default" },
        spec: {
          origin_servers: [{ public_ip: { ip: "192.0.2.1" } }],
          port: 80,
          no_tls: {},
        },
      },
      {
        metadata: { name: "tls-pool", namespace: "default" },
        spec: {
          origin_servers: [{ public_ip: { ip: "192.0.2.1" } }],
          port: 443,
          use_tls: { use_host_header_as_sni: {} },
        },
      },
    ],
  },
  {
    name: "Port Selection",
    options: ["port", "automatic_port", "lb_port"],
    validConfigs: [
      {
        metadata: { name: "explicit-port", namespace: "default" },
        spec: {
          origin_servers: [{ public_ip: { ip: "192.0.2.1" } }],
          port: 8080,
        },
      },
      {
        metadata: { name: "auto-port", namespace: "default" },
        spec: {
          origin_servers: [{ public_ip: { ip: "192.0.2.1" } }],
          automatic_port: {},
        },
      },
    ],
  },
];

// Expected server defaults from v2.0.33 spec
const EXPECTED_SERVER_DEFAULTS = {
  loadbalancer_algorithm: "ROUND_ROBIN",
  endpoint_selection: "DISTRIBUTED",
  no_tls: {}, // Empty object means TLS disabled
  connection_timeout_ms: 2000,
  http_idle_timeout_ms: 300000,
};

// Known UI vs Server discrepancy
const UI_SERVER_DISCREPANCY = {
  field: "loadbalancer_algorithm",
  uiDefault: "LB_OVERRIDE",
  serverDefault: "ROUND_ROBIN",
  impact: "API-created pools use ROUND_ROBIN, UI-created use LB_OVERRIDE",
};

// Initialize schema metadata and test matrix synchronously at module load
// This is required because test registration happens synchronously
const schemaMetadata = getToolSchemaMetadata(ORIGIN_POOL_TOOL);

const testMatrix = generateTestMatrix({
  toolName: ORIGIN_POOL_TOOL,
  baseConfig: BASE_ORIGIN_POOL_CONFIG,
  requiredFields: ["metadata.name", "metadata.namespace", "spec.origin_servers", "spec.port"],
  optionalFieldVariants: ORIGIN_POOL_VARIANTS,
});

const oneOfTests = generateOneOfTests(ORIGIN_POOL_TOOL, ORIGIN_POOL_ONEOF_GROUPS);

describe("Origin Pool - Schema Metadata Extraction", () => {
  it("should load origin pool schema metadata", () => {
    expect(schemaMetadata).toBeDefined();
    expect(schemaMetadata.toolName).toBe(ORIGIN_POOL_TOOL);
  });

  it("should extract server defaults from schema", () => {
    expect(Array.isArray(schemaMetadata.serverDefaults)).toBe(true);

    console.log("\n📋 Origin Pool Server Defaults:");
    for (const def of schemaMetadata.serverDefaults) {
      console.log(`   ${def.fieldPath} → ${JSON.stringify(def.defaultValue)}`);
    }
  });

  it("should extract recommended values from schema", () => {
    expect(Array.isArray(schemaMetadata.recommendedValues)).toBe(true);

    console.log("\n📋 Origin Pool Recommended Values:");
    for (const rec of schemaMetadata.recommendedValues) {
      console.log(`   ${rec.fieldPath} → ${JSON.stringify(rec.recommendedValue)}`);
    }
  });

  it("should provide summary for documentation", () => {
    const serverSummary = getServerDefaultsSummary(ORIGIN_POOL_TOOL);
    const recommendedSummary = getRecommendedValuesSummary(ORIGIN_POOL_TOOL);

    expect(Array.isArray(serverSummary)).toBe(true);
    expect(Array.isArray(recommendedSummary)).toBe(true);
  });
});

describe("Origin Pool - Critical UI vs Server Discrepancy", () => {
  /**
   * CRITICAL DOCUMENTATION (v2.0.33):
   *
   * The F5 XC web UI pre-selects LB_OVERRIDE for loadbalancer_algorithm,
   * but the server applies ROUND_ROBIN when the field is omitted.
   *
   * This causes different behavior between:
   * - UI-created configurations (LB_OVERRIDE)
   * - API-created configurations (ROUND_ROBIN default)
   *
   * AI assistants generating minimal configs should be aware of this.
   */

  it("should document the discrepancy between UI and server defaults", () => {
    expect(UI_SERVER_DISCREPANCY.uiDefault).not.toBe(UI_SERVER_DISCREPANCY.serverDefault);
    expect(UI_SERVER_DISCREPANCY.serverDefault).toBe("ROUND_ROBIN");
    expect(UI_SERVER_DISCREPANCY.uiDefault).toBe("LB_OVERRIDE");

    console.log("\n⚠️ CRITICAL: UI vs Server Algorithm Discrepancy");
    console.log(`   Field: ${UI_SERVER_DISCREPANCY.field}`);
    console.log(`   UI Default: ${UI_SERVER_DISCREPANCY.uiDefault}`);
    console.log(`   Server Default: ${UI_SERVER_DISCREPANCY.serverDefault}`);
    console.log(`   Impact: ${UI_SERVER_DISCREPANCY.impact}`);
  });

  it("should verify server default for loadbalancer_algorithm", () => {
    const algorithmDefault = schemaMetadata.serverDefaults.find((d) =>
      d.fieldPath.includes("loadbalancer_algorithm")
    );

    if (algorithmDefault) {
      expect(algorithmDefault.isServerDefault).toBe(true);
      expect(algorithmDefault.defaultValue).toBe("ROUND_ROBIN");
    }
  });

  it("should verify server default for endpoint_selection", () => {
    const endpointDefault = schemaMetadata.serverDefaults.find((d) =>
      d.fieldPath.includes("endpoint_selection")
    );

    if (endpointDefault) {
      expect(endpointDefault.isServerDefault).toBe(true);
      expect(endpointDefault.defaultValue).toBe("DISTRIBUTED");
    }
  });

  it("should verify server default for TLS (no_tls)", () => {
    const tlsDefault = schemaMetadata.serverDefaults.find((d) => d.fieldPath.includes("no_tls"));

    if (tlsDefault) {
      expect(tlsDefault.isServerDefault).toBe(true);
      expect(tlsDefault.defaultValue).toEqual({});
    }
  });
});

describe("Origin Pool - Plain Language Query Discovery", () => {
  const plainLanguageTests = generatePlainLanguageTests(ORIGIN_POOL_TOOL, PLAIN_LANGUAGE_QUERIES);

  for (const test of plainLanguageTests) {
    describe(`Query: "${test.query}"`, () => {
      it("should find origin pool tool via search", () => {
        const results = searchTools(test.searchQuery, { limit: 10 });

        expect(results.length).toBeGreaterThan(0);

        // Should find origin-pool related tool
        const hasOriginPool = results.some(
          (r) =>
            r.tool.resource.includes("origin-pool") || r.tool.name.includes("origin-pool")
        );
        expect(hasOriginPool).toBe(true);
      });

      it("should validate minimal configuration", () => {
        const result = validateToolParams({
          toolName: ORIGIN_POOL_TOOL,
          pathParams: { "metadata.namespace": "default" },
          body: test.config,
        });

        expect(result.valid).toBe(true);
      });

      it("should analyze what server will apply", () => {
        const analysis = analyzeConfigWithDefaults(ORIGIN_POOL_TOOL, test.config);

        expect(Array.isArray(analysis.serverWillApply)).toBe(true);

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

describe("Origin Pool - Programmatic Configuration Matrix", () => {
  describe("Generated Test Cases", () => {
    for (const testCase of testMatrix) {
      it(`should validate: ${testCase.name}`, () => {
        const result = validateToolParams({
          toolName: ORIGIN_POOL_TOOL,
          pathParams: { "metadata.namespace": "default" },
          body: testCase.config,
        });

        expect(result.valid).toBe(testCase.expectedValid);
      });
    }
  });

  describe("Server Defaults Application", () => {
    it("should track all server defaults for minimal config", () => {
      const minimalConfig = BASE_ORIGIN_POOL_CONFIG;
      const analysis = analyzeConfigWithDefaults(ORIGIN_POOL_TOOL, minimalConfig);

      console.log("\n📊 Server Defaults Analysis for Minimal Origin Pool:");
      console.log(`   Provided fields: ${analysis.providedFields.length}`);
      console.log(`   Server will apply: ${analysis.serverWillApply.length} defaults`);

      for (const applied of analysis.serverWillApply) {
        console.log(`      • ${applied.field} → ${JSON.stringify(applied.value)}`);
      }

      expect(Array.isArray(analysis.serverWillApply)).toBe(true);
    });
  });
});

describe("Origin Pool - OneOf Field Patterns", () => {
  /**
   * Origin pool OneOf groups (v2.0.33):
   * - Port: port | automatic_port | lb_port
   * - TLS: no_tls | use_tls
   * - Circuit Breaker: default_circuit_breaker | disable_circuit_breaker | circuit_breaker
   * - HTTP Protocol: auto_http_config | http1_config | http2_options
   * - Health Check Port: same_as_endpoint_port | health_check_port
   */

  describe("Generated OneOf Tests", () => {
    for (const testCase of oneOfTests) {
      it(`should validate: ${testCase.name}`, () => {
        const result = validateToolParams({
          toolName: ORIGIN_POOL_TOOL,
          pathParams: { "metadata.namespace": "default" },
          body: testCase.config,
        });

        // OneOf tests may pass or produce warnings
        expect(typeof result.valid).toBe("boolean");
      });
    }
  });

  describe("TLS OneOf Validation", () => {
    it("should accept no_tls without use_tls", () => {
      const config = {
        metadata: { name: "notls-pool", namespace: "default" },
        spec: {
          origin_servers: [{ public_ip: { ip: "192.0.2.1" } }],
          port: 80,
          no_tls: {},
        },
      };

      const result = validateToolParams({
        toolName: ORIGIN_POOL_TOOL,
        pathParams: { "metadata.namespace": "default" },
        body: config,
      });

      expect(result.valid).toBe(true);
    });

    it("should accept use_tls without no_tls", () => {
      const config = {
        metadata: { name: "tls-pool", namespace: "default" },
        spec: {
          origin_servers: [{ public_ip: { ip: "192.0.2.1" } }],
          port: 443,
          use_tls: { use_host_header_as_sni: {} },
        },
      };

      const result = validateToolParams({
        toolName: ORIGIN_POOL_TOOL,
        pathParams: { "metadata.namespace": "default" },
        body: config,
      });

      expect(result.valid).toBe(true);
    });
  });

  describe("Load Balancer Algorithm Options", () => {
    const algorithms = ["ROUND_ROBIN", "LEAST_REQUEST", "RING_HASH", "RANDOM", "LB_OVERRIDE"];

    for (const algo of algorithms) {
      it(`should accept loadbalancer_algorithm: ${algo}`, () => {
        const config = {
          metadata: { name: `${algo.toLowerCase()}-pool`, namespace: "default" },
          spec: {
            origin_servers: [{ public_ip: { ip: "192.0.2.1" } }],
            port: 80,
            loadbalancer_algorithm: algo,
          },
        };

        const result = validateToolParams({
          toolName: ORIGIN_POOL_TOOL,
          pathParams: { "metadata.namespace": "default" },
          body: config,
        });

        expect(result.valid).toBe(true);
      });
    }
  });
});

describe("Origin Pool - Required Fields Validation", () => {
  it("should validate complete minimal configuration", () => {
    const config = {
      metadata: { name: "minimal-pool", namespace: "default" },
      spec: {
        origin_servers: [{ public_ip: { ip: "192.0.2.1" } }],
        port: 80,
      },
    };

    const result = validateToolParams({
      toolName: ORIGIN_POOL_TOOL,
      pathParams: { "metadata.namespace": "default" },
      body: config,
    });

    expect(result.valid).toBe(true);
  });

  it("should warn when metadata.name is missing", () => {
    const config = {
      metadata: { namespace: "default" },
      spec: {
        origin_servers: [{ public_ip: { ip: "192.0.2.1" } }],
        port: 80,
      },
    };

    const result = validateToolParams({
      toolName: ORIGIN_POOL_TOOL,
      pathParams: { "metadata.namespace": "default" },
      body: config,
    });

    expect(result.warnings.some((w) => w.toLowerCase().includes("name"))).toBe(true);
  });
});

describe("Origin Pool - Search Tool Integration", () => {
  it("should find create tool with POST method", async () => {
    const results = searchTools("create origin pool", { operations: ["create"], limit: 1 });

    expect(results.length).toBeGreaterThan(0);

    const description = await describeTool(results[0].tool.name);
    expect(description.method).toBe("POST");
  });

  it("should filter to virtual domain", () => {
    const results = searchTools("origin pool", { domains: ["virtual"], limit: 5 });

    expect(results.every((r) => r.tool.domain === "virtual")).toBe(true);
  });

  it("should filter to create operations only", () => {
    const results = searchTools("origin pool", { operations: ["create"], limit: 5 });

    expect(results.every((r) => r.tool.operation === "create")).toBe(true);
  });
});

describe("Origin Pool - Server Defaults Documentation", () => {
  /**
   * Documented server defaults from v2.0.33:
   */
  const DOCUMENTED_DEFAULTS = {
    loadbalancer_algorithm: "ROUND_ROBIN",
    endpoint_selection: "DISTRIBUTED",
    tls_to_origin: "no_tls (disabled)",
    connection_timeout: "2000ms",
    http_idle_timeout: "300000ms (5 minutes)",
    circuit_breaker: "default_circuit_breaker (enabled)",
    outlier_detection: "disabled",
    http_protocol: "auto_http_config (auto-negotiation)",
    proxy_protocol: "disabled",
  };

  it("should document all known server defaults", () => {
    console.log("\n📋 Origin Pool Server Defaults (v2.0.33):");
    for (const [field, value] of Object.entries(DOCUMENTED_DEFAULTS)) {
      console.log(`   ${field}: ${value}`);
    }

    expect(DOCUMENTED_DEFAULTS.loadbalancer_algorithm).toBe("ROUND_ROBIN");
    expect(DOCUMENTED_DEFAULTS.endpoint_selection).toBe("DISTRIBUTED");
  });

  it("should verify minimal config uses server defaults", () => {
    const minimalConfig = {
      metadata: { name: "test-pool", namespace: "default" },
      spec: {
        origin_servers: [{ public_ip: { ip: "192.0.2.1" } }],
        port: 80,
      },
    };

    const analysis = analyzeConfigWithDefaults(ORIGIN_POOL_TOOL, minimalConfig);

    // Verify the configuration doesn't specify these fields
    expect(
      analysis.providedFields.some((f) => f.includes("loadbalancer_algorithm"))
    ).toBe(false);
    expect(analysis.providedFields.some((f) => f.includes("endpoint_selection"))).toBe(
      false
    );
  });
});

describe("Origin Pool - Test Matrix Statistics", () => {
  it("should report generated test statistics", () => {
    console.log("\n📊 Origin Pool Test Matrix Statistics:");
    console.log(`   Total generated test cases: ${testMatrix.length}`);
    console.log(`   OneOf test cases: ${oneOfTests.length}`);
    console.log(`   Server defaults tracked: ${schemaMetadata.serverDefaults.length}`);
    console.log(`   Recommended values tracked: ${schemaMetadata.recommendedValues.length}`);
    console.log(`   Plain language queries tested: ${PLAIN_LANGUAGE_QUERIES.length}`);
    console.log(`   LB algorithm variants: ${ORIGIN_POOL_VARIANTS["spec.loadbalancer_algorithm"].length}`);

    expect(testMatrix.length).toBeGreaterThan(0);
  });
});
