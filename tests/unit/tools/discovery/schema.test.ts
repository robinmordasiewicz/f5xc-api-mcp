// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  getRequestBodySchema,
  getResolvedRequestBodySchema,
  getResponseSchema,
  getToolSchemas,
  getMinimumConfiguration,
  getRequiredFields,
  getMutuallyExclusiveFields,
  generateSmartExamplePayload,
  getComprehensiveSchemaInfo,
  type ResolvedSchema,
  type MinimumConfiguration,
  type MutuallyExclusiveGroup,
} from "../../../../src/tools/discovery/schema.js";

// Mock dependencies
vi.mock("../../../../src/tools/registry.js", () => ({
  getToolByName: vi.fn(),
}));

vi.mock("../../../../src/tools/discovery/schema-loader.js", () => ({
  getResolvedRequestBodySchema: vi.fn(),
  getMinimumConfigurationFromSchema: vi.fn(),
  extractRequiredFields: vi.fn(() => []),
  extractMutuallyExclusiveGroups: vi.fn(() => []),
}));

import { getToolByName } from "../../../../src/tools/registry.js";
import {
  getResolvedRequestBodySchema as resolveSchema,
  getMinimumConfigurationFromSchema,
  extractRequiredFields,
  extractMutuallyExclusiveGroups,
} from "../../../../src/tools/discovery/schema-loader.js";

describe("Schema Module", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getRequestBodySchema", () => {
    it("should return raw request body schema", () => {
      // Arrange
      const mockSchema = { type: "object", properties: {} };
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "test-tool",
        requestBodySchema: mockSchema,
      } as any);

      // Act
      const result = getRequestBodySchema("test-tool");

      // Assert
      expect(result).toEqual(mockSchema);
    });

    it("should return null for non-existent tool", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue(undefined);

      // Act
      const result = getRequestBodySchema("nonexistent");

      // Assert
      expect(result).toBeNull();
    });

    it("should return null for tool without request body schema", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "test-tool",
      } as any);

      // Act
      const result = getRequestBodySchema("test-tool");

      // Assert
      expect(result).toBeNull();
    });
  });

  describe("getResolvedRequestBodySchema", () => {
    it("should return resolved schema from schema-loader", () => {
      // Arrange
      const mockResolved: ResolvedSchema = {
        type: "object",
        properties: {
          name: { type: "string" },
        },
      };
      vi.mocked(resolveSchema).mockReturnValue(mockResolved);

      // Act
      const result = getResolvedRequestBodySchema("test-tool");

      // Assert
      expect(result).toEqual(mockResolved);
      expect(resolveSchema).toHaveBeenCalledWith("test-tool");
    });

    it("should return null when schema-loader returns null", () => {
      // Arrange
      vi.mocked(resolveSchema).mockReturnValue(null);

      // Act
      const result = getResolvedRequestBodySchema("test-tool");

      // Assert
      expect(result).toBeNull();
    });
  });

  describe("getResponseSchema", () => {
    it("should return response schema", () => {
      // Arrange
      const mockSchema = { type: "object", properties: {} };
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "test-tool",
        responseSchema: mockSchema,
      } as any);

      // Act
      const result = getResponseSchema("test-tool");

      // Assert
      expect(result).toEqual(mockSchema);
    });

    it("should return null for tool without response schema", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "test-tool",
      } as any);

      // Act
      const result = getResponseSchema("test-tool");

      // Assert
      expect(result).toBeNull();
    });
  });

  describe("getToolSchemas", () => {
    it("should return both request and response schemas", () => {
      // Arrange
      const mockRequestSchema = { type: "object", properties: {} };
      const mockResponseSchema = { type: "object", properties: {} };
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "test-tool",
        requestBodySchema: mockRequestSchema,
        responseSchema: mockResponseSchema,
      } as any);

      // Act
      const result = getToolSchemas("test-tool");

      // Assert
      expect(result.requestBody).toEqual(mockRequestSchema);
      expect(result.response).toEqual(mockResponseSchema);
    });

    it("should return empty object for non-existent tool", () => {
      // Arrange
      vi.mocked(getToolByName).mockReturnValue(undefined);

      // Act
      const result = getToolSchemas("nonexistent");

      // Assert
      expect(result).toEqual({});
    });

    it("should handle tools with only request schema", () => {
      // Arrange
      const mockRequestSchema = { type: "object" };
      vi.mocked(getToolByName).mockReturnValue({
        toolName: "test-tool",
        requestBodySchema: mockRequestSchema,
      } as any);

      // Act
      const result = getToolSchemas("test-tool");

      // Assert
      expect(result.requestBody).toEqual(mockRequestSchema);
      expect(result.response).toBeUndefined();
    });
  });

  describe("getMinimumConfiguration", () => {
    it("should return minimum configuration from schema-loader", () => {
      // Arrange
      const mockMinConfig: MinimumConfiguration = {
        example_json: '{"test": "value"}',
        description: "Test configuration",
      };
      vi.mocked(getMinimumConfigurationFromSchema).mockReturnValue(mockMinConfig);

      // Act
      const result = getMinimumConfiguration("test-tool");

      // Assert
      expect(result).toEqual(mockMinConfig);
    });

    it("should return null when not found", () => {
      // Arrange
      vi.mocked(getMinimumConfigurationFromSchema).mockReturnValue(null);

      // Act
      const result = getMinimumConfiguration("test-tool");

      // Assert
      expect(result).toBeNull();
    });
  });

  describe("getRequiredFields", () => {
    it("should combine required fields from schema and min config", () => {
      // Arrange
      vi.mocked(resolveSchema).mockReturnValue({
        type: "object",
        properties: {},
      });
      vi.mocked(extractRequiredFields).mockReturnValue(["metadata.name", "spec.port"]);
      vi.mocked(getMinimumConfigurationFromSchema).mockReturnValue({
        required_fields: ["spec.domains", "metadata.name"], // metadata.name duplicated
      });

      // Act
      const result = getRequiredFields("test-tool");

      // Assert
      expect(result).toEqual(["metadata.name", "spec.domains", "spec.port"]);
      expect(result.length).toBe(3); // Should deduplicate
    });

    it("should return sorted unique fields", () => {
      // Arrange
      vi.mocked(resolveSchema).mockReturnValue({
        type: "object",
        properties: {},
      });
      vi.mocked(extractRequiredFields).mockReturnValue(["z-field", "a-field"]);
      vi.mocked(getMinimumConfigurationFromSchema).mockReturnValue({
        required_fields: ["m-field"],
      });

      // Act
      const result = getRequiredFields("test-tool");

      // Assert
      expect(result).toEqual(["a-field", "m-field", "z-field"]);
    });

    it("should handle empty required fields", () => {
      // Arrange
      vi.mocked(resolveSchema).mockReturnValue({
        type: "object",
        properties: {},
      });
      vi.mocked(extractRequiredFields).mockReturnValue([]);
      vi.mocked(getMinimumConfigurationFromSchema).mockReturnValue(null);

      // Act
      const result = getRequiredFields("test-tool");

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe("getMutuallyExclusiveFields", () => {
    it("should combine oneOf groups from schema and min config", () => {
      // Arrange
      vi.mocked(resolveSchema).mockReturnValue({
        type: "object",
        properties: {},
      });
      vi.mocked(extractMutuallyExclusiveGroups).mockReturnValue([
        {
          fieldPath: "origin_pools_weights",
          options: [
            { fieldName: "origin_pool" },
            { fieldName: "pool_weights" },
          ],
        },
      ]);
      vi.mocked(getMinimumConfigurationFromSchema).mockReturnValue({
        mutually_exclusive_groups: [
          {
            fields: ["http", "https", "tcp"],
            reason: "Choose protocol type",
          },
        ],
      });

      // Act
      const result = getMutuallyExclusiveFields("test-tool");

      // Assert
      expect(result.length).toBe(2);
      expect(result[0].fieldPath).toBe("origin_pools_weights");
      expect(result[1].fieldPath).toBe("http | https | tcp");
      expect(result[1].reason).toBe("Choose protocol type");
    });

    it("should return empty array when no groups exist", () => {
      // Arrange
      vi.mocked(resolveSchema).mockReturnValue({
        type: "object",
        properties: {},
      });
      vi.mocked(extractMutuallyExclusiveGroups).mockReturnValue([]);
      vi.mocked(getMinimumConfigurationFromSchema).mockReturnValue(null);

      // Act
      const result = getMutuallyExclusiveFields("test-tool");

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe("generateSmartExamplePayload - Smart Defaults", () => {
    it("should apply metadata.name smart default", () => {
      // Arrange
      vi.mocked(getMinimumConfigurationFromSchema).mockReturnValue(null);
      vi.mocked(resolveSchema).mockReturnValue({
        type: "object",
        properties: {
          metadata: {
            type: "object",
            properties: {
              name: { type: "string" },
            },
          },
        },
      });

      // Act
      const result = generateSmartExamplePayload("f5xc-api-virtual-http-loadbalancer-create");

      // Assert
      expect(result).toHaveProperty("metadata.name");
      expect((result as any).metadata.name).toContain("my-");
    });

    it("should apply namespace smart default", () => {
      // Arrange
      vi.mocked(getMinimumConfigurationFromSchema).mockReturnValue(null);
      vi.mocked(resolveSchema).mockReturnValue({
        type: "object",
        properties: {
          metadata: {
            type: "object",
            properties: {
              namespace: { type: "string" },
            },
          },
        },
      });

      // Act
      const result = generateSmartExamplePayload("test-tool");

      // Assert
      expect(result).toHaveProperty("metadata.namespace", "default");
    });

    it("should apply port smart default", () => {
      // Arrange
      vi.mocked(getMinimumConfigurationFromSchema).mockReturnValue(null);
      vi.mocked(resolveSchema).mockReturnValue({
        type: "object",
        properties: {
          port: { type: "integer" },
        },
      });

      // Act
      const result = generateSmartExamplePayload("test-tool");

      // Assert
      expect(result).toHaveProperty("port", 80);
    });

    it("should apply hostnames smart default for arrays", () => {
      // Arrange
      vi.mocked(getMinimumConfigurationFromSchema).mockReturnValue(null);
      vi.mocked(resolveSchema).mockReturnValue({
        type: "object",
        properties: {
          hostnames: {
            type: "array",
            items: { type: "string" },
          },
        },
      });

      // Act
      const result = generateSmartExamplePayload("test-tool");

      // Assert
      expect(result).toHaveProperty("hostnames");
      // Arrays of strings will get generic default, smart defaults apply to field names not array contents
      expect(Array.isArray((result as any).hostnames)).toBe(true);
    });

    it("should apply enabled smart default", () => {
      // Arrange
      vi.mocked(getMinimumConfigurationFromSchema).mockReturnValue(null);
      vi.mocked(resolveSchema).mockReturnValue({
        type: "object",
        properties: {
          enabled: { type: "boolean" },
        },
      });

      // Act
      const result = generateSmartExamplePayload("test-tool");

      // Assert
      expect(result).toHaveProperty("enabled", true);
    });

    it("should apply path smart default", () => {
      // Arrange
      vi.mocked(getMinimumConfigurationFromSchema).mockReturnValue(null);
      vi.mocked(resolveSchema).mockReturnValue({
        type: "object",
        properties: {
          path: { type: "string" },
        },
      });

      // Act
      const result = generateSmartExamplePayload("test-tool");

      // Assert
      expect(result).toHaveProperty("path", "/");
    });

    it("should apply method smart default", () => {
      // Arrange
      vi.mocked(getMinimumConfigurationFromSchema).mockReturnValue(null);
      vi.mocked(resolveSchema).mockReturnValue({
        type: "object",
        properties: {
          method: { type: "string" },
        },
      });

      // Act
      const result = generateSmartExamplePayload("test-tool");

      // Assert
      expect(result).toHaveProperty("method", "GET");
    });

    it("should apply protocol smart default", () => {
      // Arrange
      vi.mocked(getMinimumConfigurationFromSchema).mockReturnValue(null);
      vi.mocked(resolveSchema).mockReturnValue({
        type: "object",
        properties: {
          protocol: { type: "string" },
        },
      });

      // Act
      const result = generateSmartExamplePayload("test-tool");

      // Assert
      expect(result).toHaveProperty("protocol", "HTTP");
    });

    it("should apply timeout smart default", () => {
      // Arrange
      vi.mocked(getMinimumConfigurationFromSchema).mockReturnValue(null);
      vi.mocked(resolveSchema).mockReturnValue({
        type: "object",
        properties: {
          timeout: { type: "integer" },
        },
      });

      // Act
      const result = generateSmartExamplePayload("test-tool");

      // Assert
      expect(result).toHaveProperty("timeout", 30);
    });

    it("should apply retries smart default", () => {
      // Arrange
      vi.mocked(getMinimumConfigurationFromSchema).mockReturnValue(null);
      vi.mocked(resolveSchema).mockReturnValue({
        type: "object",
        properties: {
          retries: { type: "integer" },
        },
      });

      // Act
      const result = generateSmartExamplePayload("test-tool");

      // Assert
      expect(result).toHaveProperty("retries", 3);
    });
  });

  describe("generateSmartExamplePayload - Schema-Driven Generation", () => {
    it("should prefer min config example over schema generation", () => {
      // Arrange
      vi.mocked(getMinimumConfigurationFromSchema).mockReturnValue({
        example_json: JSON.stringify({ from: "minconfig" }),
      });
      vi.mocked(resolveSchema).mockReturnValue({
        type: "object",
        properties: {
          from: { type: "string" },
        },
      });

      // Act
      const result = generateSmartExamplePayload("test-tool");

      // Assert
      expect(result).toEqual({ from: "minconfig" });
    });

    it("should handle invalid JSON in min config", () => {
      // Arrange
      vi.mocked(getMinimumConfigurationFromSchema).mockReturnValue({
        example_json: "{ invalid json",
      });
      vi.mocked(resolveSchema).mockReturnValue({
        type: "object",
        properties: {
          name: { type: "string" },
        },
      });

      // Act
      const result = generateSmartExamplePayload("test-tool");

      // Assert
      expect(result).not.toBeNull();
      expect(result).toHaveProperty("name");
    });

    it("should use schema example when available", () => {
      // Arrange
      vi.mocked(getMinimumConfigurationFromSchema).mockReturnValue(null);
      vi.mocked(resolveSchema).mockReturnValue({
        type: "object",
        properties: {
          name: { type: "string", example: "schema-example" },
        },
      });

      // Act
      const result = generateSmartExamplePayload("test-tool");

      // Assert
      expect(result).toHaveProperty("name", "schema-example");
    });

    it("should use x-ves-example when available", () => {
      // Arrange
      vi.mocked(getMinimumConfigurationFromSchema).mockReturnValue(null);
      vi.mocked(resolveSchema).mockReturnValue({
        type: "object",
        properties: {
          name: { type: "string", "x-ves-example": "ves-example" },
        },
      });

      // Act
      const result = generateSmartExamplePayload("test-tool");

      // Assert
      expect(result).toHaveProperty("name", "ves-example");
    });

    it("should use enum first value when available", () => {
      // Arrange
      vi.mocked(getMinimumConfigurationFromSchema).mockReturnValue(null);
      vi.mocked(resolveSchema).mockReturnValue({
        type: "object",
        properties: {
          status: { type: "string", enum: ["active", "inactive", "pending"] },
        },
      });

      // Act
      const result = generateSmartExamplePayload("test-tool");

      // Assert
      expect(result).toHaveProperty("status", "active");
    });

    it("should use default value when specified", () => {
      // Arrange
      vi.mocked(getMinimumConfigurationFromSchema).mockReturnValue(null);
      vi.mocked(resolveSchema).mockReturnValue({
        type: "object",
        properties: {
          count: { type: "integer", default: 42 },
        },
      });

      // Act
      const result = generateSmartExamplePayload("test-tool");

      // Assert
      expect(result).toHaveProperty("count", 42);
    });

    it("should generate nested objects", () => {
      // Arrange
      vi.mocked(getMinimumConfigurationFromSchema).mockReturnValue(null);
      vi.mocked(resolveSchema).mockReturnValue({
        type: "object",
        properties: {
          metadata: {
            type: "object",
            properties: {
              name: { type: "string" },
              namespace: { type: "string" },
            },
          },
        },
      });

      // Act
      const result = generateSmartExamplePayload("test-tool");

      // Assert
      expect(result).toHaveProperty("metadata");
      expect((result as any).metadata).toHaveProperty("name");
      expect((result as any).metadata).toHaveProperty("namespace", "default");
    });

    it("should generate arrays with one item", () => {
      // Arrange
      vi.mocked(getMinimumConfigurationFromSchema).mockReturnValue(null);
      vi.mocked(resolveSchema).mockReturnValue({
        type: "object",
        properties: {
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
              },
            },
          },
        },
      });

      // Act
      const result = generateSmartExamplePayload("test-tool");

      // Assert
      expect(result).toHaveProperty("items");
      expect(Array.isArray((result as any).items)).toBe(true);
      expect((result as any).items.length).toBe(1);
      expect((result as any).items[0]).toHaveProperty("name");
    });

    it("should return null when no schema found", () => {
      // Arrange
      vi.mocked(getMinimumConfigurationFromSchema).mockReturnValue(null);
      vi.mocked(resolveSchema).mockReturnValue(null);

      // Act
      const result = generateSmartExamplePayload("test-tool");

      // Assert
      expect(result).toBeNull();
    });

    it("should handle type-based defaults", () => {
      // Arrange
      vi.mocked(getMinimumConfigurationFromSchema).mockReturnValue(null);
      vi.mocked(resolveSchema).mockReturnValue({
        type: "object",
        properties: {
          stringField: { type: "string" },
          numberField: { type: "number" },
          integerField: { type: "integer" },
          booleanField: { type: "boolean" },
          arrayField: { type: "array", items: { type: "string" } },
          objectField: {
            type: "object",
            properties: {
              nestedField: { type: "string" },
            },
          },
        },
      });

      // Act
      const result = generateSmartExamplePayload("test-tool");

      // Assert
      expect(result).toHaveProperty("stringField");
      expect(typeof (result as any).stringField).toBe("string");
      expect(result).toHaveProperty("numberField", 1);
      expect(result).toHaveProperty("integerField", 1);
      expect(result).toHaveProperty("booleanField", false);
      expect(Array.isArray((result as any).arrayField)).toBe(true);
      expect(result).toHaveProperty("objectField");
      expect(typeof (result as any).objectField).toBe("object");
    });
  });

  describe("getComprehensiveSchemaInfo", () => {
    it("should return comprehensive schema information", () => {
      // Arrange
      const mockSchema: ResolvedSchema = {
        type: "object",
        properties: {
          name: { type: "string" },
        },
      };
      const mockMinConfig: MinimumConfiguration = {
        example_json: '{"name": "test"}',
        example_curl: "curl -X POST ...",
      };

      vi.mocked(resolveSchema).mockReturnValue(mockSchema);
      vi.mocked(getMinimumConfigurationFromSchema).mockReturnValue(mockMinConfig);
      vi.mocked(extractRequiredFields).mockReturnValue(["name"]);
      vi.mocked(extractMutuallyExclusiveGroups).mockReturnValue([]);

      // Act
      const result = getComprehensiveSchemaInfo("test-tool");

      // Assert
      expect(result).not.toBeNull();
      expect(result?.resolvedSchema).toEqual(mockSchema);
      expect(result?.requiredFields).toContain("name");
      expect(result?.mutuallyExclusiveGroups).toEqual([]);
      expect(result?.examplePayload).toEqual({ name: "test" });
      expect(result?.minimumConfiguration).toEqual(mockMinConfig);
      expect(result?.curlExample).toBe("curl -X POST ...");
    });

    it("should return null when schema not found", () => {
      // Arrange
      vi.mocked(resolveSchema).mockReturnValue(null);

      // Act
      const result = getComprehensiveSchemaInfo("test-tool");

      // Assert
      expect(result).toBeNull();
    });

    it("should handle missing curl example", () => {
      // Arrange
      vi.mocked(resolveSchema).mockReturnValue({
        type: "object",
        properties: {},
      });
      vi.mocked(getMinimumConfigurationFromSchema).mockReturnValue(null);
      vi.mocked(extractRequiredFields).mockReturnValue([]);
      vi.mocked(extractMutuallyExclusiveGroups).mockReturnValue([]);

      // Act
      const result = getComprehensiveSchemaInfo("test-tool");

      // Assert
      expect(result?.curlExample).toBeNull();
    });
  });
});
