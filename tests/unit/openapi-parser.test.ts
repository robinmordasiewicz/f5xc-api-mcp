// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Unit Tests for OpenAPI Specification Parser
 *
 * Pre-enriched specs from robinmordasiewicz/f5xc-api-enriched are used via
 * parseDomainSpecFile/parseDomainsDirectory. Legacy parseSpecFile and
 * parseSpecDirectory have been removed.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { mkdirSync, writeFileSync, rmSync, existsSync } from "fs";
import {
  getAllOperations,
  groupOperationsByDomain,
  parseDomainSpecFile,
  parseDomainsDirectory,
  type ParsedSpec,
  type ParsedOperation,
} from "../../src/generator/openapi-parser.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TEST_TEMP_DIR = join(__dirname, "..", "..", "tmp-test-specs");

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

    it("should handle operations with no domain", () => {
      const operations: ParsedOperation[] = [
        createMockOperation("f5xc-api-unknown-test-list", ""),
      ];

      const grouped = groupOperationsByDomain(operations);

      expect(grouped.size).toBe(1);
      expect(grouped.get("")).toHaveLength(1);
    });

    it("should handle large number of operations", () => {
      const operations: ParsedOperation[] = [];
      for (let i = 0; i < 100; i++) {
        const domain = ["waap", "dns", "core"][i % 3];
        operations.push(createMockOperation(`f5xc-api-${domain}-test-${i}`, domain));
      }

      const grouped = groupOperationsByDomain(operations);

      expect(grouped.size).toBe(3);
      expect(grouped.get("waap")!.length).toBeGreaterThan(0);
      expect(grouped.get("dns")!.length).toBeGreaterThan(0);
      expect(grouped.get("core")!.length).toBeGreaterThan(0);
    });
  });

  describe("parseDomainSpecFile", () => {
    beforeEach(() => {
      if (!existsSync(TEST_TEMP_DIR)) {
        mkdirSync(TEST_TEMP_DIR, { recursive: true });
      }
    });

    afterEach(() => {
      if (existsSync(TEST_TEMP_DIR)) {
        rmSync(TEST_TEMP_DIR, { recursive: true, force: true });
      }
    });

    it("should parse valid OpenAPI JSON spec file", () => {
      const specPath = join(TEST_TEMP_DIR, "test_domain.json");
      const validSpec = {
        openapi: "3.0.0",
        info: { title: "Test API", version: "1.0.0" },
        paths: {
          "/api/test": {
            get: {
              operationId: "listTest",
              summary: "List tests",
              responses: { "200": { description: "OK" } },
            },
          },
        },
      };

      writeFileSync(specPath, JSON.stringify(validSpec));

      const result = parseDomainSpecFile(specPath);

      expect(result).not.toBeNull();
      expect(result?.title).toBe("Test API");
      expect(result?.version).toBe("1.0.0");
    });

    it("should return null for non-JSON files", () => {
      const yamlPath = join(TEST_TEMP_DIR, "test.yaml");
      writeFileSync(yamlPath, "openapi: 3.0.0");

      const result = parseDomainSpecFile(yamlPath);

      expect(result).toBeNull();
    });

    it("should return null for invalid JSON", () => {
      const specPath = join(TEST_TEMP_DIR, "invalid.json");
      writeFileSync(specPath, "{ invalid json }");

      const result = parseDomainSpecFile(specPath);

      expect(result).toBeNull();
    });

    it("should return null for non-existent file", () => {
      const result = parseDomainSpecFile("/non/existent/path.json");

      expect(result).toBeNull();
    });

    it("should derive domain from filename", () => {
      const specPath = join(TEST_TEMP_DIR, "http_loadbalancer.json");
      const validSpec = {
        openapi: "3.0.0",
        info: { title: "HTTP LB API", version: "1.0.0" },
        paths: {
          "/api/config/namespaces/{namespace}/http_loadbalancers": {
            get: {
              operationId: "listHttpLoadbalancers",
              summary: "List HTTP Load Balancers",
              responses: { "200": { description: "OK" } },
            },
          },
        },
      };

      writeFileSync(specPath, JSON.stringify(validSpec));

      const result = parseDomainSpecFile(specPath);

      expect(result).not.toBeNull();
      // Operations should be extracted with correct domain
      if (result && result.operations.length > 0) {
        expect(result.operations[0].domain).toBe("http_loadbalancer");
      }
    });

    it("should handle spec with components/schemas", () => {
      const specPath = join(TEST_TEMP_DIR, "with_schemas.json");
      const specWithSchemas = {
        openapi: "3.0.0",
        info: { title: "Schema API", version: "1.0.0" },
        paths: {
          "/api/test": {
            get: {
              operationId: "getTest",
              summary: "Get test",
              responses: { "200": { description: "OK" } },
            },
          },
        },
        components: {
          schemas: {
            TestObject: {
              type: "object",
              properties: { name: { type: "string" } },
            },
          },
        },
      };

      writeFileSync(specPath, JSON.stringify(specWithSchemas));

      const result = parseDomainSpecFile(specPath);

      expect(result).not.toBeNull();
      expect(result?.schemas).toBeDefined();
      expect(result?.schemas.TestObject).toBeDefined();
    });

    it("should return null for spec missing info field", () => {
      const specPath = join(TEST_TEMP_DIR, "incomplete.json");
      const incompleteSpec = {
        openapi: "3.0.0",
        // Missing info field
        paths: {},
      };

      writeFileSync(specPath, JSON.stringify(incompleteSpec));

      const result = parseDomainSpecFile(specPath);

      expect(result).toBeNull();
    });

    it("should use relative path when basePath provided", () => {
      const specPath = join(TEST_TEMP_DIR, "test.json");
      const validSpec = {
        openapi: "3.0.0",
        info: { title: "Test API", version: "1.0.0" },
        paths: {
          "/api/test": {
            get: {
              operationId: "listTest",
              summary: "List tests",
              responses: { "200": { description: "OK" } },
            },
          },
        },
      };

      writeFileSync(specPath, JSON.stringify(validSpec));

      const result = parseDomainSpecFile(specPath, TEST_TEMP_DIR);

      expect(result).not.toBeNull();
      if (result && result.operations.length > 0) {
        expect(result.operations[0].sourceFile).not.toContain(TEST_TEMP_DIR);
      }
    });
  });

  describe("parseDomainsDirectory", () => {
    beforeEach(() => {
      if (!existsSync(TEST_TEMP_DIR)) {
        mkdirSync(TEST_TEMP_DIR, { recursive: true });
      }
    });

    afterEach(() => {
      if (existsSync(TEST_TEMP_DIR)) {
        rmSync(TEST_TEMP_DIR, { recursive: true, force: true });
      }
    });

    it("should parse all JSON files in directory", () => {
      const spec1 = {
        openapi: "3.0.0",
        info: { title: "API 1", version: "1.0.0" },
        paths: {
          "/api/test1": {
            get: {
              operationId: "listTest1",
              summary: "List test1",
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
              operationId: "listTest2",
              summary: "List test2",
              responses: { "200": { description: "OK" } },
            },
          },
        },
      };

      writeFileSync(join(TEST_TEMP_DIR, "domain1.json"), JSON.stringify(spec1));
      writeFileSync(join(TEST_TEMP_DIR, "domain2.json"), JSON.stringify(spec2));

      const specs = parseDomainsDirectory(TEST_TEMP_DIR);

      expect(specs.length).toBe(2);
    });

    it("should return empty array for non-existent directory", () => {
      const specs = parseDomainsDirectory("/non/existent/directory");

      expect(specs).toHaveLength(0);
    });

    it("should skip non-JSON files", () => {
      const validSpec = {
        openapi: "3.0.0",
        info: { title: "API", version: "1.0.0" },
        paths: {
          "/api/test": {
            get: {
              operationId: "listTest",
              summary: "List test",
              responses: { "200": { description: "OK" } },
            },
          },
        },
      };

      writeFileSync(join(TEST_TEMP_DIR, "valid.json"), JSON.stringify(validSpec));
      writeFileSync(join(TEST_TEMP_DIR, "readme.md"), "# README");
      writeFileSync(join(TEST_TEMP_DIR, "config.yaml"), "key: value");

      const specs = parseDomainsDirectory(TEST_TEMP_DIR);

      expect(specs.length).toBe(1);
    });

    it("should skip subdirectories", () => {
      const validSpec = {
        openapi: "3.0.0",
        info: { title: "API", version: "1.0.0" },
        paths: {
          "/api/test": {
            get: {
              operationId: "listTest",
              summary: "List test",
              responses: { "200": { description: "OK" } },
            },
          },
        },
      };

      writeFileSync(join(TEST_TEMP_DIR, "valid.json"), JSON.stringify(validSpec));

      const subDir = join(TEST_TEMP_DIR, "subdir");
      mkdirSync(subDir);
      writeFileSync(join(subDir, "nested.json"), JSON.stringify(validSpec));

      const specs = parseDomainsDirectory(TEST_TEMP_DIR);

      expect(specs.length).toBe(1);
    });

    it("should skip specs with no operations", () => {
      const emptyPathsSpec = {
        openapi: "3.0.0",
        info: { title: "Empty API", version: "1.0.0" },
        paths: {},
      };

      const validSpec = {
        openapi: "3.0.0",
        info: { title: "Valid API", version: "1.0.0" },
        paths: {
          "/api/test": {
            get: {
              operationId: "listTest",
              summary: "List test",
              responses: { "200": { description: "OK" } },
            },
          },
        },
      };

      writeFileSync(join(TEST_TEMP_DIR, "empty.json"), JSON.stringify(emptyPathsSpec));
      writeFileSync(join(TEST_TEMP_DIR, "valid.json"), JSON.stringify(validSpec));

      const specs = parseDomainsDirectory(TEST_TEMP_DIR);

      expect(specs.length).toBe(1);
      expect(specs[0].title).toBe("Valid API");
    });

    it("should sort files alphabetically", () => {
      const createSpec = (title: string) => ({
        openapi: "3.0.0",
        info: { title, version: "1.0.0" },
        paths: {
          "/api/test": {
            get: {
              operationId: `list${title.replace(" ", "")}`,
              summary: `List ${title}`,
              responses: { "200": { description: "OK" } },
            },
          },
        },
      });

      // Create files in non-alphabetical order
      writeFileSync(join(TEST_TEMP_DIR, "zeta.json"), JSON.stringify(createSpec("Zeta API")));
      writeFileSync(join(TEST_TEMP_DIR, "alpha.json"), JSON.stringify(createSpec("Alpha API")));
      writeFileSync(join(TEST_TEMP_DIR, "beta.json"), JSON.stringify(createSpec("Beta API")));

      const specs = parseDomainsDirectory(TEST_TEMP_DIR);

      expect(specs.length).toBe(3);
      expect(specs[0].title).toBe("Alpha API");
      expect(specs[1].title).toBe("Beta API");
      expect(specs[2].title).toBe("Zeta API");
    });

    it("should return empty array for empty directory", () => {
      const specs = parseDomainsDirectory(TEST_TEMP_DIR);

      expect(specs).toHaveLength(0);
    });
  });

  describe("getAllOperations advanced scenarios", () => {
    it("should handle specs with different versions", () => {
      const specs: ParsedSpec[] = [
        {
          filePath: "/spec1.json",
          title: "API v1",
          version: "1.0.0",
          operations: [createMockOperation("f5xc-api-waap-lb-list")],
          schemas: {},
        },
        {
          filePath: "/spec2.json",
          title: "API v2",
          version: "2.0.0",
          operations: [createMockOperation("f5xc-api-waap-lb-create")],
          schemas: {},
        },
      ];

      const operations = getAllOperations(specs);

      expect(operations).toHaveLength(2);
    });

    it("should preserve operation metadata through deduplication", () => {
      const operationWithMetadata = createMockOperation("f5xc-api-waap-lb-list");
      operationWithMetadata.dangerLevel = "high";
      operationWithMetadata.confirmationRequired = true;

      const specs: ParsedSpec[] = [
        {
          filePath: "/spec1.json",
          title: "API 1",
          version: "1.0.0",
          operations: [operationWithMetadata],
          schemas: {},
        },
      ];

      const operations = getAllOperations(specs);

      expect(operations[0].dangerLevel).toBe("high");
      expect(operations[0].confirmationRequired).toBe(true);
    });

    it("should handle operations with same toolName but different content", () => {
      const op1 = createMockOperation("f5xc-api-waap-lb-list");
      op1.summary = "Version 1";

      const op2 = createMockOperation("f5xc-api-waap-lb-list");
      op2.summary = "Version 2";

      const specs: ParsedSpec[] = [
        {
          filePath: "/spec1.json",
          title: "API 1",
          version: "1.0.0",
          operations: [op1],
          schemas: {},
        },
        {
          filePath: "/spec2.json",
          title: "API 2",
          version: "1.0.0",
          operations: [op2],
          schemas: {},
        },
      ];

      const operations = getAllOperations(specs);

      // Should keep first occurrence
      expect(operations).toHaveLength(1);
      expect(operations[0].summary).toBe("Version 1");
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
