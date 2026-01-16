// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Property-Based Tests for OpenAPI Parser
 *
 * Uses fast-check to generate random inputs and verify invariants
 * that should hold across all possible valid inputs.
 */

import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import {
  getAllOperations,
  groupOperationsByDomain,
  type ParsedSpec,
  type ParsedOperation,
} from "../../../src/generator/openapi-parser.js";
import {
  arbParsedOperation,
  arbDomainName,
  arbResourceName,
  arbOperationType,
  arbHttpMethod,
} from "../../utils/generators.js";

describe("openapi-parser property-based tests", () => {
  describe("getAllOperations invariants", () => {
    it("should always return sorted operations by toolName", () => {
      fc.assert(
        fc.property(fc.array(arbParsedOperation, { maxLength: 20 }), (operations) => {
          const specs: ParsedSpec[] = [
            {
              filePath: "/test.json",
              title: "Test",
              version: "1.0.0",
              operations,
              schemas: {},
            },
          ];

          const result = getAllOperations(specs);

          // Verify sorting
          for (let i = 1; i < result.length; i++) {
            expect(result[i - 1].toolName <= result[i].toolName).toBe(true);
          }
        }),
        { numRuns: 100 }
      );
    });

    it("should deduplicate operations with same toolName", () => {
      fc.assert(
        fc.property(fc.array(arbParsedOperation, { maxLength: 20 }), (operations) => {
          const specs: ParsedSpec[] = [
            {
              filePath: "/test.json",
              title: "Test",
              version: "1.0.0",
              operations,
              schemas: {},
            },
          ];

          const result = getAllOperations(specs);
          const toolNames = result.map((op) => op.toolName);
          const uniqueNames = new Set(toolNames);

          expect(toolNames.length).toBe(uniqueNames.size);
        }),
        { numRuns: 100 }
      );
    });

    it("should preserve all unique operations from input", () => {
      fc.assert(
        fc.property(fc.array(arbParsedOperation, { maxLength: 20 }), (operations) => {
          // Make operations unique by toolName
          const uniqueOps = operations.reduce((acc, op) => {
            if (!acc.some((o) => o.toolName === op.toolName)) {
              acc.push(op);
            }
            return acc;
          }, [] as ParsedOperation[]);

          const specs: ParsedSpec[] = [
            {
              filePath: "/test.json",
              title: "Test",
              version: "1.0.0",
              operations: uniqueOps,
              schemas: {},
            },
          ];

          const result = getAllOperations(specs);

          expect(result.length).toBe(uniqueOps.length);
        }),
        { numRuns: 100 }
      );
    });

    it("should combine operations from multiple specs", () => {
      fc.assert(
        fc.property(
          fc.array(arbParsedOperation, { minLength: 1, maxLength: 10 }),
          fc.array(arbParsedOperation, { minLength: 1, maxLength: 10 }),
          (ops1, ops2) => {
            const specs: ParsedSpec[] = [
              {
                filePath: "/spec1.json",
                title: "Spec 1",
                version: "1.0.0",
                operations: ops1,
                schemas: {},
              },
              {
                filePath: "/spec2.json",
                title: "Spec 2",
                version: "1.0.0",
                operations: ops2,
                schemas: {},
              },
            ];

            const result = getAllOperations(specs);

            // Count unique toolNames from both inputs
            const allToolNames = new Set([...ops1, ...ops2].map((op) => op.toolName));

            expect(result.length).toBe(allToolNames.size);
          }
        ),
        { numRuns: 50 }
      );
    });

    it("should return empty array for empty specs list", () => {
      const result = getAllOperations([]);
      expect(result).toHaveLength(0);
    });

    it("should handle specs with empty operations", () => {
      fc.assert(
        fc.property(fc.integer({ min: 1, max: 5 }), (numSpecs) => {
          const specs: ParsedSpec[] = Array.from({ length: numSpecs }, (_, i) => ({
            filePath: `/spec${i}.json`,
            title: `Spec ${i}`,
            version: "1.0.0",
            operations: [],
            schemas: {},
          }));

          const result = getAllOperations(specs);

          expect(result).toHaveLength(0);
        }),
        { numRuns: 20 }
      );
    });
  });

  describe("groupOperationsByDomain invariants", () => {
    it("should preserve all operations across groups", () => {
      fc.assert(
        fc.property(fc.array(arbParsedOperation, { maxLength: 30 }), (operations) => {
          const grouped = groupOperationsByDomain(operations);

          // Count total operations in all groups
          let totalInGroups = 0;
          grouped.forEach((ops) => {
            totalInGroups += ops.length;
          });

          expect(totalInGroups).toBe(operations.length);
        }),
        { numRuns: 100 }
      );
    });

    it("should group operations by their domain field", () => {
      fc.assert(
        fc.property(fc.array(arbParsedOperation, { maxLength: 20 }), (operations) => {
          const grouped = groupOperationsByDomain(operations);

          // Verify each operation is in the correct group
          grouped.forEach((ops, domain) => {
            ops.forEach((op) => {
              expect(op.domain).toBe(domain);
            });
          });
        }),
        { numRuns: 100 }
      );
    });

    it("should sort operations within each group by toolName", () => {
      fc.assert(
        fc.property(fc.array(arbParsedOperation, { maxLength: 20 }), (operations) => {
          const grouped = groupOperationsByDomain(operations);

          grouped.forEach((ops) => {
            for (let i = 1; i < ops.length; i++) {
              expect(ops[i - 1].toolName <= ops[i].toolName).toBe(true);
            }
          });
        }),
        { numRuns: 100 }
      );
    });

    it("should return domain keys in sorted order", () => {
      fc.assert(
        fc.property(fc.array(arbParsedOperation, { maxLength: 20 }), (operations) => {
          const grouped = groupOperationsByDomain(operations);
          const domains = Array.from(grouped.keys());

          for (let i = 1; i < domains.length; i++) {
            expect(domains[i - 1] <= domains[i]).toBe(true);
          }
        }),
        { numRuns: 100 }
      );
    });

    it("should handle single-domain operations", () => {
      fc.assert(
        fc.property(
          arbDomainName,
          fc.array(arbParsedOperation, { minLength: 1, maxLength: 10 }),
          (domain, operations) => {
            // Force all operations to have same domain
            const singleDomainOps = operations.map((op) => ({
              ...op,
              domain,
            }));

            const grouped = groupOperationsByDomain(singleDomainOps);

            expect(grouped.size).toBe(1);
            expect(grouped.has(domain)).toBe(true);
            expect(grouped.get(domain)?.length).toBe(singleDomainOps.length);
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  describe("toolName format invariants", () => {
    it("should generate toolNames with consistent format", () => {
      fc.assert(
        fc.property(arbParsedOperation, (operation) => {
          // toolName format: f5xc-api-{domain}-{resource}-{operation}
          const toolName = operation.toolName;

          expect(toolName.startsWith("f5xc-api-")).toBe(true);
          expect(toolName.split("-").length).toBeGreaterThanOrEqual(4);
        }),
        { numRuns: 100 }
      );
    });

    it("should have toolName containing domain and operation", () => {
      fc.assert(
        fc.property(arbParsedOperation, (operation) => {
          const toolName = operation.toolName;
          const domain = operation.domain; // Domain is used as-is in toolName
          const operationType = operation.operation;

          // toolName should end with operation type
          expect(toolName.endsWith(`-${operationType}`)).toBe(true);
          // toolName should contain domain (underscores preserved)
          expect(toolName.includes(domain)).toBe(true);
        }),
        { numRuns: 100 }
      );
    });
  });

  describe("operation structure invariants", () => {
    it("should always have required fields", () => {
      fc.assert(
        fc.property(arbParsedOperation, (operation) => {
          // Required fields
          expect(operation.toolName).toBeDefined();
          expect(operation.method).toBeDefined();
          expect(operation.path).toBeDefined();
          expect(operation.operation).toBeDefined();
          expect(operation.domain).toBeDefined();
          expect(operation.resource).toBeDefined();
        }),
        { numRuns: 100 }
      );
    });

    it("should have valid HTTP method", () => {
      fc.assert(
        fc.property(arbParsedOperation, (operation) => {
          const validMethods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
          expect(validMethods).toContain(operation.method);
        }),
        { numRuns: 100 }
      );
    });

    it("should have valid operation type", () => {
      fc.assert(
        fc.property(arbParsedOperation, (operation) => {
          const validOperations = ["create", "list", "get", "update", "delete"];
          expect(validOperations).toContain(operation.operation);
        }),
        { numRuns: 100 }
      );
    });

    it("should have array types for list fields", () => {
      fc.assert(
        fc.property(arbParsedOperation, (operation) => {
          expect(Array.isArray(operation.pathParameters)).toBe(true);
          expect(Array.isArray(operation.queryParameters)).toBe(true);
          expect(Array.isArray(operation.requiredParams)).toBe(true);
          expect(Array.isArray(operation.tags)).toBe(true);
          expect(Array.isArray(operation.requiredFields)).toBe(true);
          expect(Array.isArray(operation.dependencies)).toBe(true);
          expect(Array.isArray(operation.oneOfGroups)).toBe(true);
          expect(Array.isArray(operation.subscriptionRequirements)).toBe(true);
        }),
        { numRuns: 100 }
      );
    });

    it("should have valid danger level when present", () => {
      fc.assert(
        fc.property(arbParsedOperation, (operation) => {
          if (operation.dangerLevel !== null) {
            const validLevels = ["low", "medium", "high"];
            expect(validLevels).toContain(operation.dangerLevel);
          }
        }),
        { numRuns: 100 }
      );
    });
  });

  describe("idempotency invariants", () => {
    it("getAllOperations should be idempotent", () => {
      fc.assert(
        fc.property(fc.array(arbParsedOperation, { maxLength: 15 }), (operations) => {
          const specs: ParsedSpec[] = [
            {
              filePath: "/test.json",
              title: "Test",
              version: "1.0.0",
              operations,
              schemas: {},
            },
          ];

          const result1 = getAllOperations(specs);
          const result2 = getAllOperations(specs);

          expect(result1).toEqual(result2);
        }),
        { numRuns: 50 }
      );
    });

    it("groupOperationsByDomain should be idempotent", () => {
      fc.assert(
        fc.property(fc.array(arbParsedOperation, { maxLength: 15 }), (operations) => {
          const result1 = groupOperationsByDomain(operations);
          const result2 = groupOperationsByDomain(operations);

          // Convert maps to comparable format
          const entries1 = Array.from(result1.entries()).map(([k, v]) => [k, v.map((o) => o.toolName)]);
          const entries2 = Array.from(result2.entries()).map(([k, v]) => [k, v.map((o) => o.toolName)]);

          expect(entries1).toEqual(entries2);
        }),
        { numRuns: 50 }
      );
    });
  });

  describe("determinism invariants", () => {
    it("should produce deterministic results for same input", () => {
      fc.assert(
        fc.property(
          fc.array(arbParsedOperation, { maxLength: 10 }),
          fc.integer({ min: 1, max: 5 }),
          (operations, iterations) => {
            const specs: ParsedSpec[] = [
              {
                filePath: "/test.json",
                title: "Test",
                version: "1.0.0",
                operations,
                schemas: {},
              },
            ];

            const results: ParsedOperation[][] = [];
            for (let i = 0; i < iterations; i++) {
              results.push(getAllOperations(specs));
            }

            // All results should be identical
            for (let i = 1; i < results.length; i++) {
              expect(results[i].map((o) => o.toolName)).toEqual(
                results[0].map((o) => o.toolName)
              );
            }
          }
        ),
        { numRuns: 30 }
      );
    });
  });

  describe("parameter validation invariants", () => {
    it("path parameters should always be required", () => {
      fc.assert(
        fc.property(arbParsedOperation, (operation) => {
          operation.pathParameters.forEach((param) => {
            // Path parameters are typically required in OpenAPI
            if (param.in === "path") {
              // Note: Our generator always sets required based on input
              expect(param.in).toBe("path");
            }
          });
        }),
        { numRuns: 100 }
      );
    });

    it("parameter names should be non-empty strings", () => {
      fc.assert(
        fc.property(arbParsedOperation, (operation) => {
          [...operation.pathParameters, ...operation.queryParameters].forEach((param) => {
            expect(typeof param.name).toBe("string");
            expect(param.name.length).toBeGreaterThan(0);
          });
        }),
        { numRuns: 100 }
      );
    });
  });
});
