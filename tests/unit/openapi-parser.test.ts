/**
 * Unit Tests for OpenAPI Specification Parser
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { join } from "path";
import { mkdirSync, writeFileSync, rmSync, existsSync } from "fs";
import {
  parseSpecFile,
  parseSpecDirectory,
  getAllOperations,
  groupOperationsByDomain,
  type ParsedSpec,
  type ParsedOperation,
} from "../../src/generator/openapi-parser.js";

// Test fixtures directory
const TEST_FIXTURES_DIR = join(process.cwd(), "tests", "fixtures", "specs");

describe("openapi-parser", () => {
  // Setup and teardown for file-based tests
  beforeEach(() => {
    if (!existsSync(TEST_FIXTURES_DIR)) {
      mkdirSync(TEST_FIXTURES_DIR, { recursive: true });
    }
  });

  afterEach(() => {
    if (existsSync(TEST_FIXTURES_DIR)) {
      rmSync(TEST_FIXTURES_DIR, { recursive: true, force: true });
    }
  });

  describe("parseSpecFile", () => {
    it("should parse a valid JSON OpenAPI spec", () => {
      const specPath = join(TEST_FIXTURES_DIR, "valid-spec.json");
      const spec = {
        openapi: "3.0.0",
        info: {
          title: "Test API",
          version: "1.0.0",
          description: "Test API description",
        },
        paths: {
          "/api/config/namespaces/{namespace}/http_loadbalancers": {
            get: {
              operationId: "listHttpLoadbalancers",
              summary: "List HTTP Load Balancers",
              description: "Get all HTTP load balancers in namespace",
              tags: ["waap"],
              parameters: [
                {
                  name: "namespace",
                  in: "path",
                  required: true,
                  description: "Namespace name",
                  schema: { type: "string" },
                },
              ],
              responses: {
                "200": {
                  description: "Success",
                  content: {
                    "application/json": {
                      schema: { type: "array" },
                    },
                  },
                },
              },
            },
            post: {
              operationId: "createHttpLoadbalancer",
              summary: "Create HTTP Load Balancer",
              tags: ["waap"],
              parameters: [
                {
                  name: "namespace",
                  in: "path",
                  required: true,
                  schema: { type: "string" },
                },
              ],
              requestBody: {
                required: true,
                content: {
                  "application/json": {
                    schema: { type: "object" },
                  },
                },
              },
              responses: {
                "201": {
                  description: "Created",
                },
              },
            },
          },
        },
      };

      writeFileSync(specPath, JSON.stringify(spec, null, 2));

      const result = parseSpecFile(specPath, TEST_FIXTURES_DIR);

      expect(result).not.toBeNull();
      // Note: Title is transformed via transformText(normalizeTitleAcronyms(title))
      // "Test API" stays as "Test API" since it doesn't contain Volterra/VES terms
      expect(result!.title).toBe("Test API");
      expect(result!.version).toBe("1.0.0");
      expect(result!.operations).toHaveLength(2);

      // Check list operation
      const listOp = result!.operations.find((op) => op.operation === "list");
      expect(listOp).toBeDefined();
      expect(listOp!.method).toBe("GET");
      expect(listOp!.domain).toBe("waap");
      expect(listOp!.resource).toBe("http-loadbalancer");

      // Check create operation
      const createOp = result!.operations.find((op) => op.operation === "create");
      expect(createOp).toBeDefined();
      expect(createOp!.method).toBe("POST");
      expect(createOp!.requiredParams).toContain("body");
    });

    it("should parse a valid YAML OpenAPI spec", () => {
      const specPath = join(TEST_FIXTURES_DIR, "valid-spec.yaml");
      const yamlContent = `
openapi: "3.0.0"
info:
  title: "YAML Test API"
  version: "2.0.0"
paths:
  /api/config/dns_zones:
    get:
      operationId: listDnsZones
      summary: List DNS Zones
      tags:
        - dns
      responses:
        "200":
          description: Success
`;

      writeFileSync(specPath, yamlContent);

      const result = parseSpecFile(specPath, TEST_FIXTURES_DIR);

      expect(result).not.toBeNull();
      // Note: Title transformation preserves "YAML Test API" as-is
      expect(result!.title).toBe("YAML Test API");
      expect(result!.version).toBe("2.0.0");
      expect(result!.operations).toHaveLength(1);
      expect(result!.operations[0].domain).toBe("dns");
    });

    it("should return null for invalid spec structure", () => {
      const specPath = join(TEST_FIXTURES_DIR, "invalid-spec.json");
      const invalidSpec = {
        notOpenApi: true,
        random: "data",
      };

      writeFileSync(specPath, JSON.stringify(invalidSpec));

      const result = parseSpecFile(specPath);

      expect(result).toBeNull();
    });

    it("should return null for unsupported file extension", () => {
      const specPath = join(TEST_FIXTURES_DIR, "spec.txt");
      writeFileSync(specPath, "not a spec");

      const result = parseSpecFile(specPath);

      expect(result).toBeNull();
    });

    it("should handle spec with no paths", () => {
      const specPath = join(TEST_FIXTURES_DIR, "no-paths.json");
      const spec = {
        openapi: "3.0.0",
        info: {
          title: "Empty API",
          version: "1.0.0",
        },
      };

      writeFileSync(specPath, JSON.stringify(spec));

      const result = parseSpecFile(specPath, TEST_FIXTURES_DIR);

      expect(result).not.toBeNull();
      expect(result!.operations).toHaveLength(0);
    });

    it("should use relative sourceFile paths when basePath provided", () => {
      const specPath = join(TEST_FIXTURES_DIR, "relative-test.json");
      const spec = {
        openapi: "3.0.0",
        info: {
          title: "Relative Path Test",
          version: "1.0.0",
        },
        paths: {
          "/test": {
            get: {
              operationId: "test",
              summary: "Test",
              responses: { "200": { description: "OK" } },
            },
          },
        },
      };

      writeFileSync(specPath, JSON.stringify(spec));

      const result = parseSpecFile(specPath, TEST_FIXTURES_DIR);

      expect(result).not.toBeNull();
      expect(result!.operations[0].sourceFile).toBe("relative-test.json");
      expect(result!.operations[0].sourceFile).not.toContain("/");
    });

    it("should extract path-level parameters", () => {
      const specPath = join(TEST_FIXTURES_DIR, "path-params.json");
      const spec = {
        openapi: "3.0.0",
        info: {
          title: "Path Params Test",
          version: "1.0.0",
        },
        paths: {
          "/api/config/namespaces/{namespace}/resources": {
            parameters: [
              {
                name: "namespace",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            get: {
              operationId: "listResources",
              summary: "List Resources",
              responses: { "200": { description: "OK" } },
            },
          },
        },
      };

      writeFileSync(specPath, JSON.stringify(spec));

      const result = parseSpecFile(specPath, TEST_FIXTURES_DIR);

      expect(result).not.toBeNull();
      expect(result!.operations[0].pathParameters).toHaveLength(1);
      expect(result!.operations[0].pathParameters[0].name).toBe("namespace");
    });

    it("should combine path-level and operation-level parameters", () => {
      const specPath = join(TEST_FIXTURES_DIR, "combined-params.json");
      const spec = {
        openapi: "3.0.0",
        info: {
          title: "Combined Params Test",
          version: "1.0.0",
        },
        paths: {
          "/api/resources/{id}": {
            parameters: [
              {
                name: "id",
                in: "path",
                required: true,
                schema: { type: "string" },
              },
            ],
            get: {
              operationId: "getResource",
              summary: "Get Resource",
              parameters: [
                {
                  name: "include",
                  in: "query",
                  required: false,
                  schema: { type: "string" },
                },
              ],
              responses: { "200": { description: "OK" } },
            },
          },
        },
      };

      writeFileSync(specPath, JSON.stringify(spec));

      const result = parseSpecFile(specPath, TEST_FIXTURES_DIR);

      expect(result).not.toBeNull();
      expect(result!.operations[0].pathParameters).toHaveLength(1);
      expect(result!.operations[0].queryParameters).toHaveLength(1);
    });

    it("should extract component schemas", () => {
      const specPath = join(TEST_FIXTURES_DIR, "with-schemas.json");
      const spec = {
        openapi: "3.0.0",
        info: {
          title: "Schemas Test",
          version: "1.0.0",
        },
        paths: {},
        components: {
          schemas: {
            HttpLoadBalancer: {
              type: "object",
              properties: {
                name: { type: "string" },
              },
            },
          },
        },
      };

      writeFileSync(specPath, JSON.stringify(spec));

      const result = parseSpecFile(specPath, TEST_FIXTURES_DIR);

      expect(result).not.toBeNull();
      expect(result!.schemas).toBeDefined();
      expect(result!.schemas.HttpLoadBalancer).toBeDefined();
    });
  });

  describe("parseSpecDirectory", () => {
    it("should parse all spec files in directory", () => {
      const spec1 = {
        openapi: "3.0.0",
        info: { title: "API 1", version: "1.0.0" },
        paths: {
          "/api/test1": {
            get: {
              operationId: "test1",
              summary: "Test 1",
              responses: { "200": { description: "OK" } },
            },
          },
        },
      };

      const spec2 = {
        openapi: "3.0.0",
        info: { title: "API 2", version: "1.0.0" },
        paths: {
          "/api/test2": {
            get: {
              operationId: "test2",
              summary: "Test 2",
              responses: { "200": { description: "OK" } },
            },
          },
        },
      };

      writeFileSync(join(TEST_FIXTURES_DIR, "spec1.json"), JSON.stringify(spec1));
      writeFileSync(join(TEST_FIXTURES_DIR, "spec2.json"), JSON.stringify(spec2));

      const results = parseSpecDirectory(TEST_FIXTURES_DIR);

      expect(results).toHaveLength(2);
      // Note: Titles are preserved as-is (no lowercase transformation)
      expect(results.map((r) => r.title).sort()).toEqual(["API 1", "API 2"]);
    });

    it("should scan subdirectories recursively", () => {
      const subDir = join(TEST_FIXTURES_DIR, "subdir");
      mkdirSync(subDir, { recursive: true });

      const spec = {
        openapi: "3.0.0",
        info: { title: "Nested API", version: "1.0.0" },
        paths: {
          "/api/nested": {
            get: {
              operationId: "nested",
              summary: "Nested",
              responses: { "200": { description: "OK" } },
            },
          },
        },
      };

      writeFileSync(join(subDir, "nested.json"), JSON.stringify(spec));

      const results = parseSpecDirectory(TEST_FIXTURES_DIR);

      expect(results).toHaveLength(1);
      expect(results[0].title).toBe("Nested API");
    });

    it("should skip specs with no operations", () => {
      const emptySpec = {
        openapi: "3.0.0",
        info: { title: "Empty", version: "1.0.0" },
        paths: {},
      };

      const validSpec = {
        openapi: "3.0.0",
        info: { title: "Valid", version: "1.0.0" },
        paths: {
          "/api/valid": {
            get: {
              operationId: "valid",
              summary: "Valid",
              responses: { "200": { description: "OK" } },
            },
          },
        },
      };

      writeFileSync(join(TEST_FIXTURES_DIR, "empty.json"), JSON.stringify(emptySpec));
      writeFileSync(join(TEST_FIXTURES_DIR, "valid.json"), JSON.stringify(validSpec));

      const results = parseSpecDirectory(TEST_FIXTURES_DIR);

      expect(results).toHaveLength(1);
      expect(results[0].title).toBe("Valid");
    });

    it("should return empty array for non-existent directory", () => {
      const results = parseSpecDirectory("/non/existent/path");

      expect(results).toHaveLength(0);
    });

    it("should process files in deterministic order", () => {
      // Create files with names that would sort differently by locale
      const specs = ["z-spec.json", "a-spec.json", "m-spec.json"];
      specs.forEach((name, i) => {
        const spec = {
          openapi: "3.0.0",
          // Use simple titles to test ordering
          info: { title: `Spec ${name.charAt(0).toUpperCase()}`, version: "1.0.0" },
          paths: {
            [`/api/${i}`]: {
              get: {
                operationId: `op${i}`,
                summary: `Op ${i}`,
                responses: { "200": { description: "OK" } },
              },
            },
          },
        };
        writeFileSync(join(TEST_FIXTURES_DIR, name), JSON.stringify(spec));
      });

      const results = parseSpecDirectory(TEST_FIXTURES_DIR);

      // Results should be in alphabetical order by filename
      expect(results[0].title).toBe("Spec A");
      expect(results[1].title).toBe("Spec M");
      expect(results[2].title).toBe("Spec Z");
    });
  });

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
  };
}
