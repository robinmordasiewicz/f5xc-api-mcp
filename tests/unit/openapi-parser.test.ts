// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Unit Tests for OpenAPI Specification Parser
 *
 * Pre-enriched specs from robinmordasiewicz/f5xc-api-enriched are used via
 * parseDomainSpecFile/parseDomainsDirectory. Legacy parseSpecFile and
 * parseSpecDirectory have been removed.
 */

import { describe, it, expect } from "vitest";
import {
  getAllOperations,
  groupOperationsByDomain,
  type ParsedSpec,
  type ParsedOperation,
} from "../../src/generator/openapi-parser.js";

describe("openapi-parser", () => {
  describe("getAllOperations", () => {
    it("should combine operations from multiple specs", () => {
      const specs: ParsedSpec[] = [
        {
          filePath: "/spec1.json",
          title: "API 1",
          version: "1.0.0",
          operations: [
            createMockOperation("f5xc-api-waap-http-loadbalancer-list"),
            createMockOperation("f5xc-api-waap-http-loadbalancer-create"),
          ],
          schemas: {},
        },
        {
          filePath: "/spec2.json",
          title: "API 2",
          version: "1.0.0",
          operations: [
            createMockOperation("f5xc-api-dns-zone-list"),
            createMockOperation("f5xc-api-dns-zone-create"),
          ],
          schemas: {},
        },
      ];

      const operations = getAllOperations(specs);

      expect(operations).toHaveLength(4);
    });

    it("should deduplicate operations by tool name", () => {
      const specs: ParsedSpec[] = [
        {
          filePath: "/spec1.json",
          title: "API 1",
          version: "1.0.0",
          operations: [createMockOperation("f5xc-api-waap-http-loadbalancer-list")],
          schemas: {},
        },
        {
          filePath: "/spec2.json",
          title: "API 2",
          version: "1.0.0",
          operations: [
            createMockOperation("f5xc-api-waap-http-loadbalancer-list"), // Duplicate
          ],
          schemas: {},
        },
      ];

      const operations = getAllOperations(specs);

      expect(operations).toHaveLength(1);
    });

    it("should sort operations by tool name", () => {
      const specs: ParsedSpec[] = [
        {
          filePath: "/spec.json",
          title: "API",
          version: "1.0.0",
          operations: [
            createMockOperation("f5xc-api-waap-origin-pool-list"),
            createMockOperation("f5xc-api-core-namespace-list"),
            createMockOperation("f5xc-api-dns-zone-list"),
          ],
          schemas: {},
        },
      ];

      const operations = getAllOperations(specs);

      expect(operations[0].toolName).toBe("f5xc-api-core-namespace-list");
      expect(operations[1].toolName).toBe("f5xc-api-dns-zone-list");
      expect(operations[2].toolName).toBe("f5xc-api-waap-origin-pool-list");
    });

    it("should return empty array for empty specs", () => {
      const operations = getAllOperations([]);

      expect(operations).toHaveLength(0);
    });
  });

  describe("groupOperationsByDomain", () => {
    it("should group operations by domain", () => {
      const operations: ParsedOperation[] = [
        createMockOperation("f5xc-api-waap-http-loadbalancer-list", "waap"),
        createMockOperation("f5xc-api-waap-origin-pool-list", "waap"),
        createMockOperation("f5xc-api-dns-zone-list", "dns"),
        createMockOperation("f5xc-api-core-namespace-list", "core"),
      ];

      const grouped = groupOperationsByDomain(operations);

      expect(grouped.size).toBe(3);
      expect(grouped.get("waap")).toHaveLength(2);
      expect(grouped.get("dns")).toHaveLength(1);
      expect(grouped.get("core")).toHaveLength(1);
    });

    it("should sort operations within each domain", () => {
      const operations: ParsedOperation[] = [
        createMockOperation("f5xc-api-waap-origin-pool-list", "waap"),
        createMockOperation("f5xc-api-waap-app-firewall-list", "waap"),
        createMockOperation("f5xc-api-waap-http-loadbalancer-list", "waap"),
      ];

      const grouped = groupOperationsByDomain(operations);
      const waapOps = grouped.get("waap")!;

      expect(waapOps[0].toolName).toBe("f5xc-api-waap-app-firewall-list");
      expect(waapOps[1].toolName).toBe("f5xc-api-waap-http-loadbalancer-list");
      expect(waapOps[2].toolName).toBe("f5xc-api-waap-origin-pool-list");
    });

    it("should return sorted domain keys for deterministic iteration", () => {
      const operations: ParsedOperation[] = [
        createMockOperation("f5xc-api-waap-test", "waap"),
        createMockOperation("f5xc-api-core-test", "core"),
        createMockOperation("f5xc-api-dns-test", "dns"),
      ];

      const grouped = groupOperationsByDomain(operations);
      const domains = Array.from(grouped.keys());

      expect(domains).toEqual(["core", "dns", "waap"]);
    });

    it("should handle empty operations array", () => {
      const grouped = groupOperationsByDomain([]);

      expect(grouped.size).toBe(0);
    });
  });
});

/**
 * Helper function to create mock ParsedOperation objects
 */
function createMockOperation(toolName: string, domain: string = "core"): ParsedOperation {
  return {
    toolName,
    method: "GET",
    path: "/api/test",
    operation: "list",
    domain,
    resource: "test",
    summary: "Test operation",
    description: "Test operation description",
    pathParameters: [],
    queryParameters: [],
    requestBodySchema: null,
    responseSchema: null,
    requiredParams: [],
    operationId: null,
    tags: [],
    sourceFile: "test.json",
    // Rich metadata properties from enriched specs v1.0.63
    displayName: null,
    dangerLevel: null,
    sideEffects: null,
    requiredFields: [],
    confirmationRequired: false,
    parameterExamples: {},
    validationRules: {},
    operationMetadata: null,
    curlExample: null,
    // Dependency intelligence properties v1.0.67
    dependencies: [],
    oneOfGroups: [],
    subscriptionRequirements: [],
  };
}
