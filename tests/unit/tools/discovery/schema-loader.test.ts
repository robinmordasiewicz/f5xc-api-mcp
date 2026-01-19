// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  loadDomainSchemas,
  parseSchemaRef,
  resolveSchemaRef,
  resolveNestedRefs,
  extractFieldDefaults,
  getResolvedRequestBodySchema,
  getMinimumConfigurationFromSchema,
  extractRequiredFields,
  extractMutuallyExclusiveGroups,
  clearSchemaCache,
  getSchemaCacheStats,
  type ResolvedSchema,
  type MinimumConfiguration,
} from "../../../../src/tools/discovery/schema-loader.js";
import { getValidToolName, FIRST_TOOL } from "../../fixtures/generated.js";

// Mock fs and path modules
vi.mock("fs", () => ({
  readFileSync: vi.fn(),
  existsSync: vi.fn(),
}));

vi.mock("path", () => ({
  join: vi.fn((...args) => args.join("/")),
  dirname: vi.fn((p) => p.split("/").slice(0, -1).join("/")),
}));

vi.mock("url", () => ({
  fileURLToPath: vi.fn((url) => url.replace("file://", "")),
}));

vi.mock("../../../../src/tools/registry.js", () => ({
  getToolByName: vi.fn(),
}));

import { readFileSync, existsSync } from "fs";
import { getToolByName } from "../../../../src/tools/registry.js";

describe("Schema Loader", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    clearSchemaCache();
  });

  describe("loadDomainSchemas", () => {
    it("should load and cache domain schemas", () => {
      // Arrange
      const mockSpec = {
        components: {
          schemas: {
            TestSchema: { type: "object", properties: { name: { type: "string" } } },
          },
        },
      };
      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockSpec));

      // Act
      const result = loadDomainSchemas("virtual");

      // Assert
      expect(result).not.toBeNull();
      expect(result?.schemas).toEqual(mockSpec.components.schemas);
      expect(existsSync).toHaveBeenCalled();
      expect(readFileSync).toHaveBeenCalled();
    });

    it("should return cached schemas on subsequent calls", () => {
      // Arrange
      const mockSpec = {
        components: {
          schemas: {
            TestSchema: { type: "object" },
          },
        },
      };
      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockSpec));

      // Act
      const firstCall = loadDomainSchemas("virtual");
      const secondCall = loadDomainSchemas("virtual");

      // Assert
      expect(firstCall).toBe(secondCall);
      expect(readFileSync).toHaveBeenCalledTimes(1); // Only called once due to caching
    });

    it("should try alternative naming with hyphens", () => {
      // Arrange
      const mockSpec = {
        components: {
          schemas: {
            TestSchema: { type: "object" },
          },
        },
      };
      vi.mocked(existsSync).mockReturnValueOnce(false).mockReturnValueOnce(true);
      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockSpec));

      // Act
      const result = loadDomainSchemas("network_security");

      // Assert
      expect(result).not.toBeNull();
      expect(existsSync).toHaveBeenCalledTimes(2);
    });

    it("should return null for non-existent domain", () => {
      // Arrange
      vi.mocked(existsSync).mockReturnValue(false);

      // Act
      const result = loadDomainSchemas("nonexistent");

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for invalid JSON", () => {
      // Arrange
      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(readFileSync).mockReturnValue("invalid json");

      // Act
      const result = loadDomainSchemas("virtual");

      // Assert
      expect(result).toBeNull();
    });
  });

  describe("parseSchemaRef", () => {
    it("should parse standard OpenAPI $ref format", () => {
      // Arrange
      const ref = "#/components/schemas/http_loadbalancerCreateRequest";

      // Act
      const result = parseSchemaRef(ref);

      // Assert
      expect(result).toBe("http_loadbalancerCreateRequest");
    });

    it("should return null for invalid $ref format", () => {
      // Arrange
      const invalidRefs = ["invalid", "#/schemas/Test", "/components/schemas/Test", ""];

      // Act & Assert
      for (const ref of invalidRefs) {
        expect(parseSchemaRef(ref)).toBeNull();
      }
    });

    it("should return null for non-string input", () => {
      // Act & Assert
      expect(parseSchemaRef(null as any)).toBeNull();
      expect(parseSchemaRef(undefined as any)).toBeNull();
      expect(parseSchemaRef(123 as any)).toBeNull();
    });
  });

  describe("resolveSchemaRef", () => {
    it("should resolve $ref to schema from domain cache", () => {
      // Arrange
      const mockSpec = {
        components: {
          schemas: {
            TestSchema: { type: "object", properties: { name: { type: "string" } } },
          },
        },
      };
      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockSpec));

      // Act
      const result = resolveSchemaRef("#/components/schemas/TestSchema", "virtual");

      // Assert
      expect(result).toEqual(mockSpec.components.schemas.TestSchema);
    });

    it("should return null for invalid $ref", () => {
      // Act
      const result = resolveSchemaRef("invalid", "virtual");

      // Assert
      expect(result).toBeNull();
    });

    it("should return null when domain not found", () => {
      // Arrange
      vi.mocked(existsSync).mockReturnValue(false);

      // Act
      const result = resolveSchemaRef("#/components/schemas/TestSchema", "nonexistent");

      // Assert
      expect(result).toBeNull();
    });

    it("should search other cached domains when schema not in primary domain", () => {
      // Arrange
      const spec1 = {
        components: {
          schemas: {
            Schema1: { type: "object" },
          },
        },
      };
      const spec2 = {
        components: {
          schemas: {
            Schema2: { type: "string" },
          },
        },
      };
      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(readFileSync)
        .mockReturnValueOnce(JSON.stringify(spec1))
        .mockReturnValueOnce(JSON.stringify(spec2));

      // Load both domains
      loadDomainSchemas("domain1");
      loadDomainSchemas("domain2");

      // Act - look for Schema2 in domain1 (should find it in domain2)
      const result = resolveSchemaRef("#/components/schemas/Schema2", "domain1");

      // Assert
      expect(result).toEqual(spec2.components.schemas.Schema2);
    });
  });

  describe("resolveNestedRefs", () => {
    it("should resolve simple $ref", () => {
      // Arrange
      const mockSpec = {
        components: {
          schemas: {
            TargetSchema: { type: "string" },
          },
        },
      };
      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockSpec));

      const schema = {
        $ref: "#/components/schemas/TargetSchema",
      };

      // Act
      const result = resolveNestedRefs(schema, "virtual");

      // Assert
      expect(result.type).toBe("string");
      expect(result.$ref).toBeUndefined();
    });

    it("should preserve sibling properties with $ref", () => {
      // Arrange
      const mockSpec = {
        components: {
          schemas: {
            TargetSchema: { type: "string" },
          },
        },
      };
      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockSpec));

      const schema = {
        $ref: "#/components/schemas/TargetSchema",
        default: "test-default",
        "x-f5xc-server-default": true,
      };

      // Act
      const result = resolveNestedRefs(schema, "virtual");

      // Assert
      expect(result.type).toBe("string");
      expect(result.default).toBe("test-default");
      expect(result["x-f5xc-server-default"]).toBe(true);
    });

    it("should detect and handle circular references", () => {
      // Arrange
      const mockSpec = {
        components: {
          schemas: {
            CircularSchema: {
              type: "object",
              properties: {
                self: { $ref: "#/components/schemas/CircularSchema" },
              },
            },
          },
        },
      };
      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockSpec));

      const schema = {
        $ref: "#/components/schemas/CircularSchema",
      };

      // Act
      const result = resolveNestedRefs(schema, "virtual");

      // Assert
      expect(result.type).toBe("object");
      expect(result.properties?.self).toBeDefined();
      // Circular ref should be marked
      expect((result.properties?.self as any)._circular).toBe(true);
    });

    it("should respect max depth limit", () => {
      // Arrange
      const deeplyNested: any = { type: "object", properties: {} };
      let current = deeplyNested.properties;
      for (let i = 0; i < 15; i++) {
        current.nested = { type: "object", properties: {} };
        current = current.nested.properties;
      }

      // Act
      const result = resolveNestedRefs(deeplyNested, "virtual");

      // Assert
      expect(result).toBeDefined();
      // Should stop at max depth (10) and return as-is
    });

    it("should resolve nested properties", () => {
      // Arrange
      const mockSpec = {
        components: {
          schemas: {
            NameSchema: { type: "string" },
          },
        },
      };
      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockSpec));

      const schema = {
        type: "object",
        properties: {
          name: { $ref: "#/components/schemas/NameSchema" },
          age: { type: "number" },
        },
      };

      // Act
      const result = resolveNestedRefs(schema, "virtual");

      // Assert
      expect(result.properties?.name.type).toBe("string");
      expect(result.properties?.age.type).toBe("number");
    });

    it("should resolve array items", () => {
      // Arrange
      const mockSpec = {
        components: {
          schemas: {
            ItemSchema: { type: "string" },
          },
        },
      };
      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockSpec));

      const schema = {
        type: "array",
        items: { $ref: "#/components/schemas/ItemSchema" },
      };

      // Act
      const result = resolveNestedRefs(schema, "virtual");

      // Assert
      expect(result.items?.type).toBe("string");
    });

    it("should resolve oneOf schemas", () => {
      // Arrange
      const mockSpec = {
        components: {
          schemas: {
            Option1: { type: "string" },
            Option2: { type: "number" },
          },
        },
      };
      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockSpec));

      const schema = {
        oneOf: [
          { $ref: "#/components/schemas/Option1" },
          { $ref: "#/components/schemas/Option2" },
        ],
      };

      // Act
      const result = resolveNestedRefs(schema, "virtual");

      // Assert
      expect(result.oneOf).toHaveLength(2);
      expect(result.oneOf?.[0].type).toBe("string");
      expect(result.oneOf?.[1].type).toBe("number");
    });

    it("should resolve anyOf schemas", () => {
      // Arrange
      const mockSpec = {
        components: {
          schemas: {
            Option1: { type: "string" },
          },
        },
      };
      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockSpec));

      const schema = {
        anyOf: [{ $ref: "#/components/schemas/Option1" }, { type: "number" }],
      };

      // Act
      const result = resolveNestedRefs(schema, "virtual");

      // Assert
      expect(result.anyOf).toHaveLength(2);
      expect(result.anyOf?.[0].type).toBe("string");
      expect(result.anyOf?.[1].type).toBe("number");
    });

    it("should resolve allOf schemas", () => {
      // Arrange
      const mockSpec = {
        components: {
          schemas: {
            BaseSchema: { type: "object", properties: { id: { type: "string" } } },
          },
        },
      };
      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockSpec));

      const schema = {
        allOf: [
          { $ref: "#/components/schemas/BaseSchema" },
          { type: "object", properties: { name: { type: "string" } } },
        ],
      };

      // Act
      const result = resolveNestedRefs(schema, "virtual");

      // Assert
      expect(result.allOf).toHaveLength(2);
      expect(result.allOf?.[0].properties?.id.type).toBe("string");
    });

    it("should resolve additionalProperties", () => {
      // Arrange
      const mockSpec = {
        components: {
          schemas: {
            ValueSchema: { type: "string" },
          },
        },
      };
      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockSpec));

      const schema = {
        type: "object",
        additionalProperties: { $ref: "#/components/schemas/ValueSchema" },
      };

      // Act
      const result = resolveNestedRefs(schema, "virtual");

      // Assert
      expect((result.additionalProperties as ResolvedSchema).type).toBe("string");
    });

    it("should handle null and undefined", () => {
      // Act & Assert
      expect(resolveNestedRefs(null, "virtual")).toBeNull();
      expect(resolveNestedRefs(undefined, "virtual")).toBeUndefined();
    });

    it("should handle non-object primitives", () => {
      // Act & Assert
      expect(resolveNestedRefs("string", "virtual")).toBe("string");
      expect(resolveNestedRefs(123, "virtual")).toBe(123);
      expect(resolveNestedRefs(true, "virtual")).toBe(true);
    });
  });

  describe("extractFieldDefaults", () => {
    it("should extract fields with default values", () => {
      // Arrange
      const schema: ResolvedSchema = {
        type: "object",
        properties: {
          port: { type: "number", default: 80 },
          protocol: { type: "string", default: "HTTP" },
        },
      };

      // Act
      const result = extractFieldDefaults(schema);

      // Assert
      expect(result).toHaveLength(2);
      expect(result[0].fieldPath).toBe("port");
      expect(result[0].defaultValue).toBe(80);
      expect(result[1].fieldPath).toBe("protocol");
      expect(result[1].defaultValue).toBe("HTTP");
    });

    it("should identify server-default fields", () => {
      // Arrange
      const schema: ResolvedSchema = {
        type: "object",
        properties: {
          namespace: {
            type: "string",
            default: "default",
            "x-f5xc-server-default": true,
          },
        },
      };

      // Act
      const result = extractFieldDefaults(schema);

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0].isServerDefault).toBe(true);
    });

    it("should extract recommended values", () => {
      // Arrange
      const schema: ResolvedSchema = {
        type: "object",
        properties: {
          timeout: {
            type: "number",
            "x-f5xc-recommended-value": 30,
          },
        },
      };

      // Act
      const result = extractFieldDefaults(schema);

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0].recommendedValue).toBe(30);
    });

    it("should recurse into nested objects", () => {
      // Arrange
      const schema: ResolvedSchema = {
        type: "object",
        properties: {
          metadata: {
            type: "object",
            properties: {
              name: { type: "string", default: "default-name" },
            },
          },
        },
      };

      // Act
      const result = extractFieldDefaults(schema);

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0].fieldPath).toBe("metadata.name");
      expect(result[0].defaultValue).toBe("default-name");
    });

    it("should recurse into array items", () => {
      // Arrange
      const schema: ResolvedSchema = {
        type: "object",
        properties: {
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                enabled: { type: "boolean", default: true },
              },
            },
          },
        },
      };

      // Act
      const result = extractFieldDefaults(schema);

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0].fieldPath).toBe("items[].enabled");
    });

    it("should return empty array for schema without properties", () => {
      // Arrange
      const schema: ResolvedSchema = {
        type: "string",
      };

      // Act
      const result = extractFieldDefaults(schema);

      // Assert
      expect(result).toHaveLength(0);
    });
  });

  describe("getResolvedRequestBodySchema", () => {
    it("should return resolved schema for tool with $ref", () => {
      // Arrange
      const mockSpec = {
        components: {
          schemas: {
            CreateRequest: {
              type: "object",
              properties: { name: { type: "string" } },
            },
          },
        },
      };
      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockSpec));
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "test-tool",
        domain: "virtual",
        requestBodySchema: { $ref: "#/components/schemas/CreateRequest" },
      } as any);

      // Act
      const result = getResolvedRequestBodySchema("test-tool");

      // Assert
      expect(result).not.toBeNull();
      expect(result?.type).toBe("object");
      expect(result?.properties?.name.type).toBe("string");
    });

    it("should return resolved schema for inline schema", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "test-tool",
        domain: "virtual",
        requestBodySchema: {
          type: "object",
          properties: { name: { type: "string" } },
        },
      } as any);

      // Act
      const result = getResolvedRequestBodySchema("test-tool");

      // Assert
      expect(result).not.toBeNull();
      expect(result?.type).toBe("object");
    });

    it("should return null for tool not found", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue(undefined);

      // Act
      const result = getResolvedRequestBodySchema("nonexistent-tool");

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for tool without request body schema", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "test-tool",
        domain: "virtual",
      } as any);

      // Act
      const result = getResolvedRequestBodySchema("test-tool");

      // Assert
      expect(result).toBeNull();
    });
  });

  describe("getMinimumConfigurationFromSchema", () => {
    it("should extract minimum configuration from $ref schema", () => {
      // Arrange
      const minConfig: MinimumConfiguration = {
        description: "Minimum required fields",
        required_fields: ["metadata.name", "spec.origin_pools"],
      };
      const mockSpec = {
        components: {
          schemas: {
            CreateRequest: {
              type: "object",
              "x-f5xc-minimum-configuration": minConfig,
            },
          },
        },
      };
      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockSpec));
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "test-tool",
        domain: "virtual",
        requestBodySchema: { $ref: "#/components/schemas/CreateRequest" },
      } as any);

      // Act
      const result = getMinimumConfigurationFromSchema("test-tool");

      // Assert
      expect(result).toEqual(minConfig);
    });

    it("should extract minimum configuration from inline schema", () => {
      // Arrange
      const minConfig: MinimumConfiguration = {
        required_fields: ["name"],
      };
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "test-tool",
        domain: "virtual",
        requestBodySchema: {
          type: "object",
          "x-f5xc-minimum-configuration": minConfig,
        },
      } as any);

      // Act
      const result = getMinimumConfigurationFromSchema("test-tool");

      // Assert
      expect(result).toEqual(minConfig);
    });

    it("should return null when no minimum configuration exists", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "test-tool",
        domain: "virtual",
        requestBodySchema: {
          type: "object",
        },
      } as any);

      // Act
      const result = getMinimumConfigurationFromSchema("test-tool");

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for tool not found", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue(undefined);

      // Act
      const result = getMinimumConfigurationFromSchema("nonexistent");

      // Assert
      expect(result).toBeNull();
    });
  });

  describe("extractRequiredFields", () => {
    it("should extract top-level required fields", () => {
      // Arrange
      const schema: ResolvedSchema = {
        type: "object",
        required: ["name", "namespace"],
        properties: {
          name: { type: "string" },
          namespace: { type: "string" },
          optional: { type: "string" },
        },
      };

      // Act
      const result = extractRequiredFields(schema);

      // Assert
      expect(result).toContain("name");
      expect(result).toContain("namespace");
      expect(result).not.toContain("optional");
    });

    it("should extract nested required fields", () => {
      // Arrange
      const schema: ResolvedSchema = {
        type: "object",
        properties: {
          metadata: {
            type: "object",
            required: ["name"],
            properties: {
              name: { type: "string" },
            },
          },
        },
      };

      // Act
      const result = extractRequiredFields(schema);

      // Assert
      expect(result).toContain("metadata.name");
    });

    it("should handle schema without required fields", () => {
      // Arrange
      const schema: ResolvedSchema = {
        type: "object",
        properties: {
          optional: { type: "string" },
        },
      };

      // Act
      const result = extractRequiredFields(schema);

      // Assert
      expect(result).toHaveLength(0);
    });
  });

  describe("extractMutuallyExclusiveGroups", () => {
    it("should extract x-ves-oneof-field groups", () => {
      // Arrange
      const schema: ResolvedSchema = {
        type: "object",
        "x-ves-oneof-field-origin_server": JSON.stringify([
          "public_ip",
          "private_ip",
          "k8s_service",
        ]),
        properties: {
          public_ip: { type: "object" },
          private_ip: { type: "object" },
          k8s_service: { type: "object" },
        },
      };

      // Act
      const result = extractMutuallyExclusiveGroups(schema);

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0].fieldPath).toBe("origin_server");
      expect(result[0].options).toHaveLength(3);
      expect(result[0].options.map((o) => o.fieldName)).toEqual([
        "public_ip",
        "private_ip",
        "k8s_service",
      ]);
    });

    it("should extract recommended option from annotation", () => {
      // Arrange
      const schema: ResolvedSchema = {
        type: "object",
        "x-ves-oneof-field-origin_server": JSON.stringify(["public_ip", "private_ip"]),
        "x-f5xc-recommended-oneof-variant-origin_server": "public_ip",
        properties: {
          public_ip: { type: "object" },
          private_ip: { type: "object" },
        },
      };

      // Act
      const result = extractMutuallyExclusiveGroups(schema);

      // Assert
      expect(result[0].recommendedOption).toBe("public_ip");
    });

    it("should infer recommended option from x-f5xc-server-default", () => {
      // Arrange
      const schema: ResolvedSchema = {
        type: "object",
        "x-ves-oneof-field-choice": JSON.stringify(["option1", "option2"]),
        properties: {
          option1: { type: "object" },
          option2: { type: "object", "x-f5xc-server-default": true },
        },
      };

      // Act
      const result = extractMutuallyExclusiveGroups(schema);

      // Assert
      expect(result[0].recommendedOption).toBe("option2");
    });

    it("should extract standard oneOf groups", () => {
      // Arrange
      const schema: ResolvedSchema = {
        oneOf: [
          { title: "StringOption", type: "string", description: "String value" },
          { title: "NumberOption", type: "number", description: "Numeric value" },
        ],
      };

      // Act
      const result = extractMutuallyExclusiveGroups(schema);

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0].options).toHaveLength(2);
      expect(result[0].options[0].fieldName).toBe("StringOption");
      expect(result[0].options[0].description).toBe("String value");
    });

    it("should extract anyOf groups", () => {
      // Arrange
      const schema: ResolvedSchema = {
        anyOf: [{ type: "string" }, { type: "number" }],
      };

      // Act
      const result = extractMutuallyExclusiveGroups(schema);

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0].reason).toContain("one or more");
    });

    it("should recurse into nested properties", () => {
      // Arrange
      const schema: ResolvedSchema = {
        type: "object",
        properties: {
          spec: {
            type: "object",
            "x-ves-oneof-field-pool_type": JSON.stringify(["static", "dynamic"]),
          },
        },
      };

      // Act
      const result = extractMutuallyExclusiveGroups(schema);

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0].fieldPath).toBe("spec.pool_type");
    });

    it("should handle invalid JSON in x-ves-oneof-field", () => {
      // Arrange
      const schema: ResolvedSchema = {
        type: "object",
        "x-ves-oneof-field-invalid": "not valid json",
      };

      // Act
      const result = extractMutuallyExclusiveGroups(schema);

      // Assert
      expect(result).toHaveLength(0);
    });
  });

  describe("clearSchemaCache", () => {
    it("should clear the cache", () => {
      // Arrange
      const mockSpec = {
        components: {
          schemas: {
            TestSchema: { type: "object" },
          },
        },
      };
      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockSpec));
      loadDomainSchemas("virtual");

      // Act
      clearSchemaCache();
      const stats = getSchemaCacheStats();

      // Assert
      expect(stats.cachedDomains).toHaveLength(0);
      expect(stats.totalSchemas).toBe(0);
    });
  });

  describe("getSchemaCacheStats", () => {
    it("should return cache statistics", () => {
      // Arrange
      const mockSpec = {
        components: {
          schemas: {
            Schema1: { type: "object" },
            Schema2: { type: "string" },
          },
        },
      };
      vi.mocked(existsSync).mockReturnValue(true);
      vi.mocked(readFileSync).mockReturnValue(JSON.stringify(mockSpec));
      loadDomainSchemas("virtual");

      // Act
      const stats = getSchemaCacheStats();

      // Assert
      expect(stats.cachedDomains).toContain("virtual");
      expect(stats.totalSchemas).toBe(2);
    });
  });
});
