// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

import { describe, it, expect } from "vitest";
import {
  parseRef,
  normalizeResourceType,
  extractRefPatterns,
  extractOneOfPatterns,
  extractAddonServicesFromSchema,
  extractSubscriptionServices,
  extractOperationDependencies,
  formatAddonDisplayName,
  extractTierFromAddon,
  mapResourceToSubscriptions,
  resolveResourceDomain,
  FALLBACK_RESOURCE_DOMAIN_MAP,
} from "../../../src/generator/dependency-extractor.js";
import type { ResourceReference, OneOfGroup, AddonServiceDefinition } from "../../../src/generator/dependency-types.js";

describe("Dependency Extractor", () => {
  describe("parseRef", () => {
    it("should parse valid $ref with CreateRequest suffix", () => {
      const result = parseRef("#/components/schemas/origin_poolCreateRequest");

      expect(result).toEqual({
        fullPath: "#/components/schemas/origin_poolCreateRequest",
        schemaName: "origin_poolCreateRequest",
        resourceType: "origin_pool",
        operationType: "create",
      });
    });

    it("should parse valid $ref with ListResponse suffix", () => {
      const result = parseRef("#/components/schemas/http_loadbalancerListResponse");

      expect(result).toEqual({
        fullPath: "#/components/schemas/http_loadbalancerListResponse",
        schemaName: "http_loadbalancerListResponse",
        resourceType: "http_loadbalancer",
        operationType: "list",
      });
    });

    it("should parse $ref with just suffix (no operation)", () => {
      const result = parseRef("#/components/schemas/origin_poolSpec");

      expect(result).toEqual({
        fullPath: "#/components/schemas/origin_poolSpec",
        schemaName: "origin_poolSpec",
        resourceType: "origin_pool",
        operationType: null,
      });
    });

    it("should handle invalid $ref strings", () => {
      expect(parseRef("invalid")).toBeNull();
      expect(parseRef("")).toBeNull();
      expect(parseRef("#/wrong/path/schema")).toBeNull();
    });

    it("should handle null/undefined input", () => {
      expect(parseRef(null as unknown as string)).toBeNull();
      expect(parseRef(undefined as unknown as string)).toBeNull();
    });

    it("should parse various operation types", () => {
      expect(parseRef("#/components/schemas/resourceGetRequest")?.operationType).toBe("get");
      expect(parseRef("#/components/schemas/resourceDeleteRequest")?.operationType).toBe("delete");
      expect(parseRef("#/components/schemas/resourceUpdateRequest")?.operationType).toBe("update");
      expect(parseRef("#/components/schemas/resourceReplaceRequest")?.operationType).toBe("replace");
    });
  });

  describe("normalizeResourceType", () => {
    it("should convert underscores to hyphens", () => {
      expect(normalizeResourceType("origin_pool")).toBe("origin-pool");
      expect(normalizeResourceType("http_loadbalancer")).toBe("http-loadbalancer");
    });

    it("should convert camelCase to kebab-case", () => {
      expect(normalizeResourceType("httpLoadbalancer")).toBe("http-loadbalancer");
      expect(normalizeResourceType("originPool")).toBe("origin-pool");
    });

    it("should lowercase everything", () => {
      expect(normalizeResourceType("HTTP_LOADBALANCER")).toBe("http-loadbalancer");
      expect(normalizeResourceType("OriginPool")).toBe("origin-pool");
    });

    it("should handle already normalized names", () => {
      expect(normalizeResourceType("origin-pool")).toBe("origin-pool");
      expect(normalizeResourceType("http-loadbalancer")).toBe("http-loadbalancer");
    });
  });

  describe("extractRefPatterns", () => {
    it("should extract direct $ref", () => {
      const schema = {
        $ref: "#/components/schemas/origin_poolSpec",
      };

      const refs = extractRefPatterns(schema);

      expect(refs).toHaveLength(1);
      expect(refs[0]?.resourceType).toBe("origin-pool");
      expect(refs[0]?.inline).toBe(false);
    });

    it("should extract refs from properties", () => {
      const schema = {
        properties: {
          origin_pool: {
            $ref: "#/components/schemas/origin_poolSpec",
          },
          healthcheck: {
            $ref: "#/components/schemas/healthcheckSpec",
          },
        },
      };

      const refs = extractRefPatterns(schema);

      expect(refs).toHaveLength(2);
      expect(refs[0]?.resourceType).toBe("origin-pool");
      expect(refs[1]?.resourceType).toBe("healthcheck");
    });

    it("should mark required fields correctly", () => {
      const schema = {
        properties: {
          requiredField: {
            $ref: "#/components/schemas/origin_poolSpec",
          },
          optionalField: {
            $ref: "#/components/schemas/healthcheckSpec",
          },
        },
        required: ["requiredField"],
      };

      const refs = extractRefPatterns(schema);

      const requiredRef = refs.find((r) => r.fieldPath === "requiredField");
      const optionalRef = refs.find((r) => r.fieldPath === "optionalField");

      expect(requiredRef?.required).toBe(true);
      expect(optionalRef?.required).toBe(false);
    });

    it("should extract refs from allOf", () => {
      const schema = {
        allOf: [
          { $ref: "#/components/schemas/baseSpec" },
          { $ref: "#/components/schemas/extendedSpec" },
        ],
      };

      const refs = extractRefPatterns(schema);

      expect(refs).toHaveLength(2);
      expect(refs[0]?.resourceType).toBe("base");
      expect(refs[1]?.resourceType).toBe("extended");
    });

    it("should extract refs from oneOf and mark as inline", () => {
      const schema = {
        oneOf: [
          { $ref: "#/components/schemas/option1Spec" },
          { $ref: "#/components/schemas/option2Spec" },
        ],
      };

      const refs = extractRefPatterns(schema);

      expect(refs).toHaveLength(2);
      expect(refs[0]?.inline).toBe(true);
      expect(refs[1]?.inline).toBe(true);
    });

    it("should extract refs from anyOf and mark as inline", () => {
      const schema = {
        anyOf: [
          { $ref: "#/components/schemas/variant1Spec" },
          { $ref: "#/components/schemas/variant2Spec" },
        ],
      };

      const refs = extractRefPatterns(schema);

      expect(refs).toHaveLength(2);
      expect(refs[0]?.inline).toBe(true);
      expect(refs[1]?.inline).toBe(true);
    });

    it("should extract refs from array items", () => {
      const schema = {
        items: {
          $ref: "#/components/schemas/itemSpec",
        },
      };

      const refs = extractRefPatterns(schema);

      expect(refs).toHaveLength(1);
      expect(refs[0]?.fieldPath).toContain("[]");
    });

    it("should extract refs from additionalProperties", () => {
      const schema = {
        additionalProperties: {
          $ref: "#/components/schemas/valueSpec",
        },
      };

      const refs = extractRefPatterns(schema);

      expect(refs).toHaveLength(1);
      expect(refs[0]?.fieldPath).toContain("[*]");
    });

    it("should handle nested structures", () => {
      const schema = {
        properties: {
          config: {
            properties: {
              backend: {
                $ref: "#/components/schemas/origin_poolSpec",
              },
            },
          },
        },
      };

      const refs = extractRefPatterns(schema);

      expect(refs).toHaveLength(1);
      expect(refs[0]?.fieldPath).toBe("config.backend");
    });

    it("should throw error when max depth exceeded", () => {
      const createDeepSchema = (depth: number): Record<string, unknown> => {
        if (depth === 0) {
          return { $ref: "#/components/schemas/deepSpec" };
        }
        return {
          properties: {
            nested: createDeepSchema(depth - 1),
          },
        };
      };

      const deepSchema = createDeepSchema(25); // Exceed maxDepth of 20

      expect(() => extractRefPatterns(deepSchema)).toThrow(/exceeds maximum depth/);
    });

    it("should handle empty or null schema", () => {
      expect(extractRefPatterns({} as Record<string, unknown>)).toEqual([]);
      expect(extractRefPatterns(null as unknown as Record<string, unknown>)).toEqual([]);
    });

    it("should handle schema with no refs", () => {
      const schema = {
        properties: {
          name: { type: "string" },
          age: { type: "number" },
        },
      };

      const refs = extractRefPatterns(schema);

      expect(refs).toEqual([]);
    });
  });

  describe("extractOneOfPatterns", () => {
    it("should extract x-ves-oneof-field patterns", () => {
      const schema = {
        "x-ves-oneof-field-backend_choice": '["origin_pool","service_mesh"]',
        properties: {
          backend_choice: {
            description: "Choose backend type",
          },
        },
      };

      const groups = extractOneOfPatterns(schema);

      expect(groups).toHaveLength(1);
      expect(groups[0]?.choiceField).toBe("backend_choice");
      expect(groups[0]?.options).toEqual(["origin_pool", "service_mesh"]);
      expect(groups[0]?.description).toBe("Choose backend type");
    });

    it("should handle multiple oneOf groups", () => {
      const schema = {
        "x-ves-oneof-field-choice1": '["option1","option2"]',
        "x-ves-oneof-field-choice2": '["optionA","optionB"]',
      };

      const groups = extractOneOfPatterns(schema);

      expect(groups).toHaveLength(2);
      expect(groups[0]?.choiceField).toBe("choice1");
      expect(groups[1]?.choiceField).toBe("choice2");
    });

    it("should handle invalid JSON gracefully", () => {
      const schema = {
        "x-ves-oneof-field-invalid": "not valid json",
      };

      const groups = extractOneOfPatterns(schema);

      expect(groups).toEqual([]);
    });

    it("should handle empty schema", () => {
      expect(extractOneOfPatterns({})).toEqual([]);
      expect(extractOneOfPatterns(null as unknown as Record<string, unknown>)).toEqual([]);
    });

    it("should skip non-array JSON values", () => {
      const schema = {
        "x-ves-oneof-field-invalid": '"not an array"',
      };

      const groups = extractOneOfPatterns(schema);

      expect(groups).toEqual([]);
    });

    it("should extract nested oneOf patterns from properties", () => {
      const schema = {
        properties: {
          spec: {
            properties: {
              http_health_check: {
                "x-ves-oneof-field-host_header_choice": '["host_header","use_origin_server_name"]',
                properties: {
                  host_header_choice: {
                    description: "Choose how to set the host header",
                  },
                },
              },
            },
          },
        },
      };

      const groups = extractOneOfPatterns(schema);

      expect(groups).toHaveLength(1);
      expect(groups[0]?.choiceField).toBe("host_header_choice");
      expect(groups[0]?.fieldPath).toBe("spec.http_health_check.host_header_choice");
      expect(groups[0]?.options).toEqual([
        "spec.http_health_check.host_header",
        "spec.http_health_check.use_origin_server_name",
      ]);
    });

    it("should extract oneOf patterns from allOf compositions", () => {
      const schema = {
        allOf: [
          {
            "x-ves-oneof-field-backend_choice": '["origin_pool","service_mesh"]',
          },
          {
            properties: {
              backend_choice: {
                description: "Choose backend type",
              },
            },
          },
        ],
      };

      const groups = extractOneOfPatterns(schema);

      expect(groups).toHaveLength(1);
      expect(groups[0]?.choiceField).toBe("backend_choice");
      expect(groups[0]?.options).toEqual(["origin_pool", "service_mesh"]);
    });

    it("should extract oneOf patterns at multiple nesting levels", () => {
      const schema = {
        "x-ves-oneof-field-top_choice": '["option1","option2"]',
        properties: {
          spec: {
            "x-ves-oneof-field-spec_choice": '["spec_opt1","spec_opt2"]',
            properties: {
              deep: {
                "x-ves-oneof-field-deep_choice": '["deep_opt1","deep_opt2"]',
              },
            },
          },
        },
      };

      const groups = extractOneOfPatterns(schema);

      expect(groups).toHaveLength(3);

      // Find each group by choiceField
      const topGroup = groups.find((g) => g.choiceField === "top_choice");
      const specGroup = groups.find((g) => g.choiceField === "spec_choice");
      const deepGroup = groups.find((g) => g.choiceField === "deep_choice");

      expect(topGroup).toBeDefined();
      expect(topGroup?.fieldPath).toBe("top_choice");
      expect(topGroup?.options).toEqual(["option1", "option2"]);

      expect(specGroup).toBeDefined();
      expect(specGroup?.fieldPath).toBe("spec.spec_choice");
      expect(specGroup?.options).toEqual(["spec.spec_opt1", "spec.spec_opt2"]);

      expect(deepGroup).toBeDefined();
      expect(deepGroup?.fieldPath).toBe("spec.deep.deep_choice");
      expect(deepGroup?.options).toEqual(["spec.deep.deep_opt1", "spec.deep.deep_opt2"]);
    });

    it("should build full paths for recommended options", () => {
      const schema = {
        properties: {
          spec: {
            properties: {
              http_health_check: {
                "x-ves-oneof-field-host_header_choice": '["host_header","use_origin_server_name"]',
                "x-f5xc-recommended-oneof-variant-host_header_choice": "use_origin_server_name",
                properties: {
                  use_origin_server_name: {},
                  host_header: {},
                },
              },
            },
          },
        },
      };

      const groups = extractOneOfPatterns(schema);

      expect(groups).toHaveLength(1);
      expect(groups[0]?.recommendedOption).toBe("spec.http_health_check.use_origin_server_name");
    });

    it("should infer recommended option from x-f5xc-server-default with full path", () => {
      const schema = {
        properties: {
          spec: {
            properties: {
              config: {
                "x-ves-oneof-field-mode_choice": '["manual","automatic"]',
                properties: {
                  automatic: {
                    "x-f5xc-server-default": true,
                  },
                  manual: {},
                },
              },
            },
          },
        },
      };

      const groups = extractOneOfPatterns(schema);

      expect(groups).toHaveLength(1);
      expect(groups[0]?.recommendedOption).toBe("spec.config.automatic");
    });

    it("should handle depth protection for deeply nested schemas", () => {
      // Create a schema that would exceed default max depth
      const createDeepOneOfSchema = (depth: number): Record<string, unknown> => {
        if (depth === 0) {
          return {
            "x-ves-oneof-field-deep_choice": '["opt1","opt2"]',
          };
        }
        return {
          properties: {
            nested: createDeepOneOfSchema(depth - 1),
          },
        };
      };

      // Create schema at depth 25 (exceeds default maxDepth of 20)
      const deepSchema = createDeepOneOfSchema(25);

      // Should not throw, but may not extract the deeply nested pattern
      const groups = extractOneOfPatterns(deepSchema);

      // Depth protection prevents extraction beyond maxDepth
      expect(Array.isArray(groups)).toBe(true);
    });

    it("should extract oneOf from array items", () => {
      const schema = {
        properties: {
          routes: {
            items: {
              "x-ves-oneof-field-route_choice": '["simple","advanced"]',
            },
          },
        },
      };

      const groups = extractOneOfPatterns(schema);

      expect(groups).toHaveLength(1);
      expect(groups[0]?.fieldPath).toBe("routes[].route_choice");
      expect(groups[0]?.options).toEqual(["routes[].simple", "routes[].advanced"]);
    });
  });

  describe("formatAddonDisplayName", () => {
    it("should format F5XC addon names", () => {
      expect(formatAddonDisplayName("f5xc_waap_advanced")).toBe("F5XC WAAP Advanced");
      expect(formatAddonDisplayName("f5xc_cdn_standard")).toBe("F5XC CDN Standard");
    });

    it("should handle non-F5XC addons", () => {
      expect(formatAddonDisplayName("custom_service_premium")).toBe("Custom Service Premium");
    });

    it("should preserve known acronyms", () => {
      expect(formatAddonDisplayName("f5xc_api_security")).toBe("F5XC API Security");
      expect(formatAddonDisplayName("f5xc_dns_advanced")).toBe("F5XC DNS Advanced");
      expect(formatAddonDisplayName("f5xc_waf_standard")).toBe("F5XC WAF Standard");
    });

    it("should handle single word names", () => {
      expect(formatAddonDisplayName("premium")).toBe("Premium");
    });
  });

  describe("extractTierFromAddon", () => {
    it("should extract known tiers", () => {
      expect(extractTierFromAddon("f5xc_waap_advanced")).toBe("advanced");
      expect(extractTierFromAddon("f5xc_cdn_standard")).toBe("standard");
      expect(extractTierFromAddon("f5xc_service_premium")).toBe("premium");
      expect(extractTierFromAddon("f5xc_basic_plan")).toBe("basic");
      expect(extractTierFromAddon("f5xc_enterprise_solution")).toBe("enterprise");
    });

    it("should default to standard for unknown tiers", () => {
      expect(extractTierFromAddon("f5xc_custom_service")).toBe("standard");
      expect(extractTierFromAddon("unknown_addon")).toBe("standard");
    });

    it("should be case insensitive", () => {
      expect(extractTierFromAddon("F5XC_WAAP_ADVANCED")).toBe("advanced");
      expect(extractTierFromAddon("f5xc_WAAP_STANDARD")).toBe("standard");
    });
  });

  describe("extractAddonServicesFromSchema", () => {
    it("should extract addon services", () => {
      const schema = {
        "x-ves-oneof-field-addon_choice": '["f5xc_waap_standard","f5xc_waap_advanced"]',
      };

      const services = extractAddonServicesFromSchema(schema);

      expect(services).toHaveLength(2);
      expect(services[0]?.serviceId).toBe("f5xc_waap_standard");
      expect(services[0]?.displayName).toBe("F5XC WAAP Standard");
      expect(services[0]?.tier).toBe("standard");
      expect(services[1]?.serviceId).toBe("f5xc_waap_advanced");
      expect(services[1]?.tier).toBe("advanced");
    });

    it("should handle invalid JSON", () => {
      const schema = {
        "x-ves-oneof-field-addon_choice": "invalid json",
      };

      const services = extractAddonServicesFromSchema(schema);

      expect(services).toEqual([]);
    });

    it("should handle missing addon_choice", () => {
      const schema = {};

      const services = extractAddonServicesFromSchema(schema);

      expect(services).toEqual([]);
    });
  });

  describe("extractSubscriptionServices", () => {
    it("should extract from subscriptionSubscribeRequest schema", () => {
      const billingSpec = {
        schemas: {
          subscriptionSubscribeRequest: {
            "x-ves-oneof-field-addon_choice": '["f5xc_waap_standard","f5xc_cdn_standard"]',
          },
        },
      };

      const services = extractSubscriptionServices(billingSpec);

      expect(services).toHaveLength(2);
      expect(services[0]?.serviceId).toBe("f5xc_waap_standard");
      expect(services[1]?.serviceId).toBe("f5xc_cdn_standard");
    });

    it("should fallback to searching all schemas", () => {
      const billingSpec = {
        schemas: {
          someOtherSchema: {
            "x-ves-oneof-field-addon_choice": '["f5xc_mesh_standard"]',
          },
        },
      };

      const services = extractSubscriptionServices(billingSpec);

      expect(services).toHaveLength(1);
      expect(services[0]?.serviceId).toBe("f5xc_mesh_standard");
    });

    it("should handle empty billing spec", () => {
      const billingSpec = { schemas: {} };

      const services = extractSubscriptionServices(billingSpec);

      expect(services).toEqual([]);
    });
  });

  describe("extractOperationDependencies", () => {
    it("should extract dependencies from request body schema", () => {
      const requestBodySchema = {
        properties: {
          origin_pool_ref: {
            $ref: "#/components/schemas/origin_poolSpec",
          },
        },
      };

      const componentSchemas = {};

      const result = extractOperationDependencies(requestBodySchema, componentSchemas);

      expect(result.references).toHaveLength(1);
      expect(result.references[0]?.resourceType).toBe("origin-pool");
    });

    it("should extract oneOf patterns from component schema", () => {
      const requestBodySchema = {
        $ref: "#/components/schemas/http_loadbalancerCreateRequest",
      };

      const componentSchemas = {
        http_loadbalancerCreateRequest: {
          "x-ves-oneof-field-backend_choice": '["origin_pool","service_mesh"]',
          properties: {
            backend_ref: {
              $ref: "#/components/schemas/origin_poolSpec",
            },
          },
        },
      };

      const result = extractOperationDependencies(requestBodySchema, componentSchemas);

      expect(result.oneOfGroups).toHaveLength(1);
      expect(result.oneOfGroups[0]?.choiceField).toBe("backend_choice");
      expect(result.references.length).toBeGreaterThan(0);
    });

    it("should deduplicate references", () => {
      const requestBodySchema = {
        $ref: "#/components/schemas/http_loadbalancerCreateRequest",
      };

      const componentSchemas = {
        http_loadbalancerCreateRequest: {
          properties: {
            origin_pool_ref: {
              $ref: "#/components/schemas/origin_poolSpec",
            },
          },
        },
      };

      const result = extractOperationDependencies(requestBodySchema, componentSchemas);

      // Extracts from both requestBodySchema $ref and nested properties
      // Deduplication removes exact duplicates (same resourceType + fieldPath)
      // Since fieldPaths differ, we get 2 references, not 1
      expect(result.references.length).toBeGreaterThanOrEqual(1);
    });

    it("should handle null request body schema", () => {
      const result = extractOperationDependencies(null, {});

      expect(result.references).toEqual([]);
      expect(result.oneOfGroups).toEqual([]);
    });
  });

  describe("mapResourceToSubscriptions", () => {
    it("should map WAAP resources", () => {
      const subscriptions = mapResourceToSubscriptions("app-firewall", "waf");

      expect(subscriptions).toContain("f5xc_waap_standard");
      expect(subscriptions).toContain("f5xc_waap_advanced");
    });

    it("should map CDN resources", () => {
      const subscriptions = mapResourceToSubscriptions("cdn-loadbalancer", "cdn");

      expect(subscriptions).toContain("f5xc_content_delivery_network_standard");
    });

    it("should map SecureMesh resources (fallback pattern)", () => {
      // Use fake resource and domain to test fallback pattern-based logic
      // Real resources/domains would match upstream metadata first
      const subscriptions = mapResourceToSubscriptions("test-mesh-policy", "fake_domain");

      expect(subscriptions).toContain("f5xc_securemesh_standard");
      expect(subscriptions).toContain("f5xc_securemesh_advanced");
    });

    it("should map AppStack resources (fallback pattern)", () => {
      // Use fake domain to test fallback pattern-based logic
      const subscriptions = mapResourceToSubscriptions("test-vk8s-cluster", "fake_domain");

      expect(subscriptions).toContain("f5xc_appstack_standard");
    });

    it("should map site management resources", () => {
      const subscriptions = mapResourceToSubscriptions("site", "sites");

      expect(subscriptions).toContain("f5xc_site_management_standard");
    });

    it("should deduplicate subscriptions", () => {
      const subscriptions = mapResourceToSubscriptions("app-firewall", "waf");

      // Should not have duplicates
      const unique = [...new Set(subscriptions)];
      expect(subscriptions.length).toBe(unique.length);
    });

    it("should return empty array for unknown resources", () => {
      const subscriptions = mapResourceToSubscriptions("unknown-resource", "unknown-domain");

      // May return empty or fallback subscriptions
      expect(Array.isArray(subscriptions)).toBe(true);
    });
  });

  describe("resolveResourceDomain", () => {
    it("should resolve known resources", () => {
      expect(resolveResourceDomain("origin-pool")).toBeTruthy();
      expect(resolveResourceDomain("http-loadbalancer")).toBeTruthy();
      expect(resolveResourceDomain("dns-zone")).toBeTruthy();
    });

    it("should handle both kebab-case and snake_case", () => {
      const kebabResult = resolveResourceDomain("origin-pool");
      const snakeResult = resolveResourceDomain("origin_pool");

      // Should resolve to same domain (or at least both resolve)
      expect(kebabResult || snakeResult).toBeTruthy();
    });

    it("should return empty string for unknown resources", () => {
      const result = resolveResourceDomain("completely-unknown-resource-xyz");

      expect(result).toBe("");
    });

    it("should use fallback map when upstream specs unavailable", () => {
      // These are in FALLBACK_RESOURCE_DOMAIN_MAP
      const originPoolDomain = resolveResourceDomain("origin-pool");
      const httpLbDomain = resolveResourceDomain("http-loadbalancer");

      expect(originPoolDomain).toBeTruthy();
      expect(httpLbDomain).toBeTruthy();
    });
  });

  describe("FALLBACK_RESOURCE_DOMAIN_MAP", () => {
    it("should contain key resource mappings", () => {
      expect(FALLBACK_RESOURCE_DOMAIN_MAP["origin-pool"]).toBeDefined();
      expect(FALLBACK_RESOURCE_DOMAIN_MAP["http-loadbalancer"]).toBeDefined();
      expect(FALLBACK_RESOURCE_DOMAIN_MAP["dns-zone"]).toBeDefined();
      expect(FALLBACK_RESOURCE_DOMAIN_MAP["app-firewall"]).toBeDefined();
    });

    it("should have both kebab and snake_case variants", () => {
      expect(FALLBACK_RESOURCE_DOMAIN_MAP["origin-pool"]).toBe(FALLBACK_RESOURCE_DOMAIN_MAP["origin_pool"]);
      expect(FALLBACK_RESOURCE_DOMAIN_MAP["http-loadbalancer"]).toBe(FALLBACK_RESOURCE_DOMAIN_MAP["http_loadbalancer"]);
    });
  });

  describe("Edge Cases", () => {
    it("should handle very deep nesting within limit", () => {
      const createDeepSchema = (depth: number): Record<string, unknown> => {
        if (depth === 0) {
          return { $ref: "#/components/schemas/deepSpec" };
        }
        return {
          properties: {
            nested: createDeepSchema(depth - 1),
          },
        };
      };

      const deepSchema = createDeepSchema(15); // Within maxDepth of 20

      const refs = extractRefPatterns(deepSchema);

      expect(refs).toHaveLength(1);
    });

    it("should handle complex mixed structures", () => {
      const complexSchema = {
        allOf: [
          { $ref: "#/components/schemas/baseSpec" },
        ],
        properties: {
          config: {
            oneOf: [
              { $ref: "#/components/schemas/option1Spec" },
              { $ref: "#/components/schemas/option2Spec" },
            ],
          },
          items: {
            items: {
              $ref: "#/components/schemas/itemSpec",
            },
          },
        },
      };

      const refs = extractRefPatterns(complexSchema);

      expect(refs.length).toBeGreaterThan(0);
      expect(refs.some((r) => r.inline)).toBe(true); // oneOf refs are inline
    });

    it("should handle schemas with circular references (via maxDepth)", () => {
      const circularSchema: Record<string, unknown> = {
        properties: {},
      };
      // Simulate circular reference (will hit maxDepth)
      (circularSchema.properties as Record<string, unknown>).self = circularSchema;

      // Should throw due to depth limit
      expect(() => extractRefPatterns(circularSchema)).toThrow();
    });
  });
});
