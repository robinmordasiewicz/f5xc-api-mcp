// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  validateToolParams,
  formatValidationResult,
  type ValidationResult,
  type ValidateParams,
} from "../../../../src/tools/discovery/validate.js";
import type { ParsedOperation, FieldDefaultMetadata } from "../../../../src/generator/openapi-parser.js";
import type { OneOfGroup } from "../../../../src/generator/dependency-types.js";

// Mock registry
vi.mock("../../../../src/tools/registry.js", () => ({
  getToolByName: vi.fn(),
}));

import { getToolByName } from "../../../../src/tools/registry.js";

describe("Parameter Validation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("validateToolParams", () => {
    describe("basic validation", () => {
      it("should return error for non-existent tool", () => {
        // Arrange
        vi.mocked(getToolByName).mockReturnValue(undefined);

        // Act
        const result = validateToolParams({ toolName: "nonexistent-tool" });

        // Assert
        expect(result.valid).toBe(false);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].path).toBe("toolName");
        expect(result.errors[0].message).toContain("not found");
      });

      it("should validate successfully with minimal parameters", () => {
        // Arrange
        const mockTool: ParsedOperation = {
          toolName: "test-tool",
          domain: "virtual",
          method: "GET",
          path: "/api/v1/resource",
          operation: "get",
          pathParameters: [],
          queryParameters: [],
        } as any;
        vi.mocked(getToolByName).mockReturnValue(mockTool);

        // Act
        const result = validateToolParams({ toolName: "test-tool" });

        // Assert
        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
        expect(result.tool?.name).toBe("test-tool");
      });
    });

    describe("path parameter validation", () => {
      it("should error on missing required path parameter", () => {
        // Arrange
        const mockTool: ParsedOperation = {
          toolName: "test-tool",
          domain: "virtual",
          method: "GET",
          path: "/api/v1/{namespace}/{name}",
          operation: "get",
          pathParameters: [
            { name: "namespace", required: true, description: "Namespace" },
            { name: "name", required: true, description: "Resource name" },
          ],
          queryParameters: [],
        } as any;
        vi.mocked(getToolByName).mockReturnValue(mockTool);

        // Act
        const result = validateToolParams({
          toolName: "test-tool",
          pathParams: { namespace: "default" }, // Missing 'name'
        });

        // Assert
        expect(result.valid).toBe(false);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].path).toBe("pathParams.name");
        expect(result.errors[0].message).toContain("Missing required path parameter");
      });

      it("should error on unknown path parameter", () => {
        // Arrange
        const mockTool: ParsedOperation = {
          toolName: "test-tool",
          domain: "virtual",
          method: "GET",
          path: "/api/v1/{namespace}",
          operation: "get",
          pathParameters: [{ name: "namespace", required: true }],
          queryParameters: [],
        } as any;
        vi.mocked(getToolByName).mockReturnValue(mockTool);

        // Act
        const result = validateToolParams({
          toolName: "test-tool",
          pathParams: { namespace: "default", unknown: "value" },
        });

        // Assert
        expect(result.valid).toBe(false);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].path).toBe("pathParams.unknown");
        expect(result.errors[0].message).toContain("Unknown path parameter");
      });

      it("should pass with all required path parameters", () => {
        // Arrange
        const mockTool: ParsedOperation = {
          toolName: "test-tool",
          domain: "virtual",
          method: "GET",
          path: "/api/v1/{namespace}/{name}",
          operation: "get",
          pathParameters: [
            { name: "namespace", required: true },
            { name: "name", required: true },
          ],
          queryParameters: [],
        } as any;
        vi.mocked(getToolByName).mockReturnValue(mockTool);

        // Act
        const result = validateToolParams({
          toolName: "test-tool",
          pathParams: { namespace: "default", name: "test-resource" },
        });

        // Assert
        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });
    });

    describe("query parameter validation", () => {
      it("should error on missing required query parameter", () => {
        // Arrange
        const mockTool: ParsedOperation = {
          toolName: "test-tool",
          domain: "virtual",
          method: "GET",
          path: "/api/v1/resource",
          operation: "list",
          pathParameters: [],
          queryParameters: [
            { name: "filter", required: true, description: "Filter expression" },
          ],
        } as any;
        vi.mocked(getToolByName).mockReturnValue(mockTool);

        // Act
        const result = validateToolParams({ toolName: "test-tool" });

        // Assert
        expect(result.valid).toBe(false);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].path).toBe("queryParams.filter");
      });

      it("should warn on unknown query parameter", () => {
        // Arrange
        const mockTool: ParsedOperation = {
          toolName: "test-tool",
          domain: "virtual",
          method: "GET",
          path: "/api/v1/resource",
          operation: "list",
          pathParameters: [],
          queryParameters: [{ name: "limit", required: false }],
        } as any;
        vi.mocked(getToolByName).mockReturnValue(mockTool);

        // Act
        const result = validateToolParams({
          toolName: "test-tool",
          queryParams: { limit: "10", unknown: "value" },
        });

        // Assert
        expect(result.valid).toBe(true); // Warnings don't fail validation
        expect(result.warnings).toHaveLength(1);
        expect(result.warnings[0]).toContain("Unknown query parameter");
      });
    });

    describe("body validation", () => {
      it("should error when body required but missing", () => {
        // Arrange
        const mockTool: ParsedOperation = {
          toolName: "test-tool",
          domain: "virtual",
          method: "POST",
          path: "/api/v1/resource",
          operation: "create",
          pathParameters: [],
          queryParameters: [],
          requestBodySchema: { type: "object" },
        } as any;
        vi.mocked(getToolByName).mockReturnValue(mockTool);

        // Act
        const result = validateToolParams({ toolName: "test-tool" });

        // Assert
        expect(result.valid).toBe(false);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].path).toBe("body");
        expect(result.errors[0].message).toContain("required");
      });

      it("should warn when metadata missing for create operation", () => {
        // Arrange
        const mockTool: ParsedOperation = {
          toolName: "test-tool",
          domain: "virtual",
          method: "POST",
          path: "/api/v1/resource",
          operation: "create",
          pathParameters: [],
          queryParameters: [],
          requestBodySchema: { type: "object" },
        } as any;
        vi.mocked(getToolByName).mockReturnValue(mockTool);

        // Act
        const result = validateToolParams({
          toolName: "test-tool",
          body: { spec: {} }, // Missing metadata
        });

        // Assert
        expect(result.warnings.some((w) => w.includes("metadata"))).toBe(true);
      });

      it("should warn when metadata.name missing", () => {
        // Arrange
        const mockTool: ParsedOperation = {
          toolName: "test-tool",
          domain: "virtual",
          method: "POST",
          path: "/api/v1/resource",
          operation: "create",
          pathParameters: [],
          queryParameters: [],
          requestBodySchema: { type: "object" },
        } as any;
        vi.mocked(getToolByName).mockReturnValue(mockTool);

        // Act
        const result = validateToolParams({
          toolName: "test-tool",
          body: { metadata: { namespace: "default" } }, // Missing name
        });

        // Assert
        expect(result.warnings.some((w) => w.includes("metadata.name"))).toBe(true);
      });

      it("should warn when body provided but not expected", () => {
        // Arrange
        const mockTool: ParsedOperation = {
          toolName: "test-tool",
          domain: "virtual",
          method: "GET",
          path: "/api/v1/resource",
          operation: "get",
          pathParameters: [],
          queryParameters: [],
          // No requestBodySchema
        } as any;
        vi.mocked(getToolByName).mockReturnValue(mockTool);

        // Act
        const result = validateToolParams({
          toolName: "test-tool",
          body: { data: "value" },
        });

        // Assert
        expect(result.warnings.some((w) => w.includes("does not accept a request body"))).toBe(
          true
        );
      });
    });

    describe("required fields validation (lines 256-273: server-defaulted)", () => {
      it("should error on missing user-required field", () => {
        // Arrange
        const mockTool: ParsedOperation = {
          toolName: "test-tool",
          domain: "virtual",
          method: "POST",
          path: "/api/v1/resource",
          operation: "create",
          pathParameters: [],
          queryParameters: [],
          requestBodySchema: { type: "object" },
          requiredFields: ["metadata.name"],
          fieldDefaults: [
            {
              fieldPath: "metadata.name",
              requiredForCreate: true,
              isServerDefault: false, // User MUST provide
            },
          ] as FieldDefaultMetadata[],
        } as any;
        vi.mocked(getToolByName).mockReturnValue(mockTool);

        // Act
        const result = validateToolParams({
          toolName: "test-tool",
          body: { spec: {} }, // Missing metadata.name
        });

        // Assert
        expect(result.valid).toBe(false);
        expect(result.errors.some((e) => e.path === "body.metadata.name")).toBe(true);
      });

      it("should warn about server-defaulted field and track applied default", () => {
        // Arrange
        const mockTool: ParsedOperation = {
          toolName: "test-tool",
          domain: "virtual",
          method: "POST",
          path: "/api/v1/resource",
          operation: "create",
          pathParameters: [],
          queryParameters: [],
          requestBodySchema: { type: "object" },
          requiredFields: ["metadata.namespace"],
          fieldDefaults: [
            {
              fieldPath: "metadata.namespace",
              defaultValue: "default",
              isServerDefault: true, // Server will apply default
              requiredForCreate: false,
            },
          ] as FieldDefaultMetadata[],
        } as any;
        vi.mocked(getToolByName).mockReturnValue(mockTool);

        // Act
        const result = validateToolParams({
          toolName: "test-tool",
          body: { metadata: { name: "test" } }, // Missing namespace
        });

        // Assert
        expect(result.valid).toBe(true); // Not an error, just a warning
        expect(result.warnings.some((w) => w.includes('will default to "default"'))).toBe(true);
        expect(result.appliedDefaults).toHaveLength(1);
        expect(result.appliedDefaults?.[0].field).toBe("metadata.namespace");
        expect(result.appliedDefaults?.[0].defaultValue).toBe("default");
      });

      it("should distinguish user-required from server-defaulted fields", () => {
        // Arrange
        const mockTool: ParsedOperation = {
          toolName: "test-tool",
          domain: "virtual",
          method: "POST",
          path: "/api/v1/resource",
          operation: "create",
          pathParameters: [],
          queryParameters: [],
          requestBodySchema: { type: "object" },
          requiredFields: ["metadata.name", "metadata.namespace"],
          fieldDefaults: [
            {
              fieldPath: "metadata.name",
              requiredForCreate: true,
              isServerDefault: false, // User-required
            },
            {
              fieldPath: "metadata.namespace",
              defaultValue: "default",
              requiredForCreate: false,
              isServerDefault: true, // Server-defaulted
            },
          ] as FieldDefaultMetadata[],
        } as any;
        vi.mocked(getToolByName).mockReturnValue(mockTool);

        // Act
        const result = validateToolParams({
          toolName: "test-tool",
          body: { spec: {} }, // Missing both
        });

        // Assert
        expect(result.valid).toBe(false); // Fails due to user-required field
        expect(result.errors.some((e) => e.path === "body.metadata.name")).toBe(true);
        expect(result.warnings.some((w) => w.includes("metadata.namespace"))).toBe(true);
        expect(result.appliedDefaults).toHaveLength(1);
      });

      it("should error on all user-required fields when no body", () => {
        // Arrange
        const mockTool: ParsedOperation = {
          toolName: "test-tool",
          domain: "virtual",
          method: "POST",
          path: "/api/v1/resource",
          operation: "create",
          pathParameters: [],
          queryParameters: [],
          requestBodySchema: { type: "object" },
          requiredFields: ["field1", "field2"],
          fieldDefaults: [
            { fieldPath: "field1", requiredForCreate: true, isServerDefault: false },
            { fieldPath: "field2", requiredForCreate: true, isServerDefault: false },
          ] as FieldDefaultMetadata[],
        } as any;
        vi.mocked(getToolByName).mockReturnValue(mockTool);

        // Act
        const result = validateToolParams({ toolName: "test-tool" });

        // Assert
        expect(result.valid).toBe(false);
        // 3 errors: 1 for missing body + 2 for required fields
        expect(result.errors).toHaveLength(3);
        expect(result.errors.some((e) => e.path === "body")).toBe(true);
        expect(result.errors.some((e) => e.path === "body.field1")).toBe(true);
        expect(result.errors.some((e) => e.path === "body.field2")).toBe(true);
      });
    });

    describe("recommended values tracking (lines 313-326)", () => {
      it("should track recommended values for fields", () => {
        // Arrange
        const mockTool: ParsedOperation = {
          toolName: "test-tool",
          domain: "virtual",
          method: "POST",
          path: "/api/v1/resource",
          operation: "create",
          pathParameters: [],
          queryParameters: [],
          requestBodySchema: { type: "object" },
          requiredFields: ["metadata.name"], // Need at least one required field to trigger validateRequiredFields
          fieldDefaults: [
            {
              fieldPath: "metadata.name",
              requiredForCreate: true,
              isServerDefault: false,
            },
            {
              fieldPath: "spec.timeout",
              recommendedValue: 30,
            },
            {
              fieldPath: "spec.retries",
              recommendedValue: 3,
            },
          ] as FieldDefaultMetadata[],
        } as any;
        vi.mocked(getToolByName).mockReturnValue(mockTool);

        // Act
        const result = validateToolParams({
          toolName: "test-tool",
          body: { metadata: { name: "test" }, spec: { timeout: 60 } },
        });

        // Assert
        expect(result.recommendedValues).toBeDefined();
        expect(result.recommendedValues).toHaveLength(2);
        expect(result.recommendedValues?.[0].field).toBe("spec.timeout");
        expect(result.recommendedValues?.[0].recommendedValue).toBe(30);
        expect(result.recommendedValues?.[0].currentValue).toBe(60);
        expect(result.recommendedValues?.[1].field).toBe("spec.retries");
        expect(result.recommendedValues?.[1].currentValue).toBeUndefined();
      });

      it("should track recommended values even when no current value", () => {
        // Arrange
        const mockTool: ParsedOperation = {
          toolName: "test-tool",
          domain: "virtual",
          method: "POST",
          path: "/api/v1/resource",
          operation: "create",
          pathParameters: [],
          queryParameters: [],
          requestBodySchema: { type: "object" },
          requiredFields: ["metadata.name"], // Need at least one required field
          fieldDefaults: [
            {
              fieldPath: "metadata.name",
              requiredForCreate: true,
              isServerDefault: false,
            },
            {
              fieldPath: "spec.mode",
              recommendedValue: "automatic",
            },
          ] as FieldDefaultMetadata[],
        } as any;
        vi.mocked(getToolByName).mockReturnValue(mockTool);

        // Act
        const result = validateToolParams({
          toolName: "test-tool",
          body: { metadata: { name: "test" }, spec: {} },
        });

        // Assert
        expect(result.recommendedValues).toBeDefined();
        expect(result.recommendedValues).toHaveLength(1);
        expect(result.recommendedValues?.[0].currentValue).toBeUndefined();
      });

      it("should not include recommendedValues when none exist", () => {
        // Arrange
        const mockTool: ParsedOperation = {
          toolName: "test-tool",
          domain: "virtual",
          method: "POST",
          path: "/api/v1/resource",
          operation: "create",
          pathParameters: [],
          queryParameters: [],
          requestBodySchema: { type: "object" },
          requiredFields: [],
          fieldDefaults: [],
        } as any;
        vi.mocked(getToolByName).mockReturnValue(mockTool);

        // Act
        const result = validateToolParams({
          toolName: "test-tool",
          body: { spec: {} },
        });

        // Assert
        expect(result.recommendedValues).toBeUndefined();
      });
    });

    describe("oneOf validation (lines 333-362)", () => {
      it("should warn when multiple mutually exclusive options selected", () => {
        // Arrange
        const mockTool: ParsedOperation = {
          toolName: "test-tool",
          domain: "virtual",
          method: "POST",
          path: "/api/v1/resource",
          operation: "create",
          pathParameters: [],
          queryParameters: [],
          requestBodySchema: { type: "object" },
          oneOfGroups: [
            {
              choiceField: "origin_server",
              options: ["public_ip", "private_ip", "k8s_service"],
            },
          ] as OneOfGroup[],
        } as any;
        vi.mocked(getToolByName).mockReturnValue(mockTool);

        // Act
        const result = validateToolParams({
          toolName: "test-tool",
          body: {
            metadata: { name: "test" }, // Add metadata to avoid extra warnings
            public_ip: { ip: "1.2.3.4" },
            private_ip: { ip: "10.0.0.1" }, // Multiple options!
          },
        });

        // Assert
        expect(result.valid).toBe(true); // Warnings don't fail validation
        expect(result.warnings).toHaveLength(1);
        expect(result.warnings[0]).toContain("Multiple mutually exclusive options");
        expect(result.warnings[0]).toContain("public_ip, private_ip");
      });

      it("should include recommended option in multiple selection warning", () => {
        // Arrange
        const mockTool: ParsedOperation = {
          toolName: "test-tool",
          domain: "virtual",
          method: "POST",
          path: "/api/v1/resource",
          operation: "create",
          pathParameters: [],
          queryParameters: [],
          requestBodySchema: { type: "object" },
          oneOfGroups: [
            {
              choiceField: "origin_server",
              options: ["public_ip", "private_ip"],
              recommendedOption: "public_ip",
            },
          ] as OneOfGroup[],
        } as any;
        vi.mocked(getToolByName).mockReturnValue(mockTool);

        // Act
        const result = validateToolParams({
          toolName: "test-tool",
          body: {
            metadata: { name: "test" },
            public_ip: { ip: "1.2.3.4" },
            private_ip: { ip: "10.0.0.1" },
          },
        });

        // Assert
        expect(result.warnings.length).toBeGreaterThan(0);
        const oneOfWarning = result.warnings.find((w) => w.includes("Multiple mutually exclusive"));
        expect(oneOfWarning).toBeDefined();
        expect(oneOfWarning).toContain("Recommended: public_ip");
      });

      it("should warn when no option selected", () => {
        // Arrange
        const mockTool: ParsedOperation = {
          toolName: "test-tool",
          domain: "virtual",
          method: "POST",
          path: "/api/v1/resource",
          operation: "create",
          pathParameters: [],
          queryParameters: [],
          requestBodySchema: { type: "object" },
          oneOfGroups: [
            {
              choiceField: "backend_type",
              options: ["static_pool", "dynamic_pool"],
            },
          ] as OneOfGroup[],
        } as any;
        vi.mocked(getToolByName).mockReturnValue(mockTool);

        // Act
        const result = validateToolParams({
          toolName: "test-tool",
          body: { metadata: { name: "test" }, spec: {} }, // No backend_type options
        });

        // Assert
        expect(result.valid).toBe(true);
        // No oneOf warning when no recommendedOption and no selection
        const oneOfWarnings = result.warnings.filter((w) =>
          w.includes("No option selected")
        );
        expect(oneOfWarnings).toHaveLength(0);
      });

      it("should suggest recommended option when no option selected", () => {
        // Arrange
        const mockTool: ParsedOperation = {
          toolName: "test-tool",
          domain: "virtual",
          method: "POST",
          path: "/api/v1/resource",
          operation: "create",
          pathParameters: [],
          queryParameters: [],
          requestBodySchema: { type: "object" },
          oneOfGroups: [
            {
              choiceField: "backend_type",
              options: ["static_pool", "dynamic_pool"],
              recommendedOption: "static_pool",
            },
          ] as OneOfGroup[],
        } as any;
        vi.mocked(getToolByName).mockReturnValue(mockTool);

        // Act
        const result = validateToolParams({
          toolName: "test-tool",
          body: { metadata: { name: "test" }, spec: {} },
        });

        // Assert
        const oneOfWarnings = result.warnings.filter((w) => w.includes("No option selected"));
        expect(oneOfWarnings).toHaveLength(1);
        expect(oneOfWarnings[0]).toContain("static_pool");
      });

      it("should not warn when exactly one option selected", () => {
        // Arrange
        const mockTool: ParsedOperation = {
          toolName: "test-tool",
          domain: "virtual",
          method: "POST",
          path: "/api/v1/resource",
          operation: "create",
          pathParameters: [],
          queryParameters: [],
          requestBodySchema: { type: "object" },
          oneOfGroups: [
            {
              choiceField: "origin_server",
              options: ["public_ip", "private_ip"],
            },
          ] as OneOfGroup[],
        } as any;
        vi.mocked(getToolByName).mockReturnValue(mockTool);

        // Act
        const result = validateToolParams({
          toolName: "test-tool",
          body: { metadata: { name: "test" }, public_ip: { ip: "1.2.3.4" } }, // Exactly one option
        });

        // Assert
        expect(result.valid).toBe(true);
        // No oneOf warnings when exactly one option selected
        const oneOfWarnings = result.warnings.filter(
          (w) => w.includes("mutually exclusive") || w.includes("No option selected")
        );
        expect(oneOfWarnings).toHaveLength(0);
      });

      it("should validate nested oneOf fields", () => {
        // Arrange
        const mockTool: ParsedOperation = {
          toolName: "test-tool",
          domain: "virtual",
          method: "POST",
          path: "/api/v1/resource",
          operation: "create",
          pathParameters: [],
          queryParameters: [],
          requestBodySchema: { type: "object" },
          oneOfGroups: [
            {
              choiceField: "pool_type",
              options: ["spec.static", "spec.dynamic"],
              recommendedOption: "spec.static",
            },
          ] as OneOfGroup[],
        } as any;
        vi.mocked(getToolByName).mockReturnValue(mockTool);

        // Act
        const result = validateToolParams({
          toolName: "test-tool",
          body: {
            metadata: { name: "test" },
            spec: {
              static: { servers: [] },
              dynamic: { discovery: {} }, // Multiple nested options
            },
          },
        });

        // Assert
        const oneOfWarnings = result.warnings.filter((w) =>
          w.includes("spec.static, spec.dynamic")
        );
        expect(oneOfWarnings).toHaveLength(1);
      });

      it("should not validate oneOf when no body provided", () => {
        // Arrange
        const mockTool: ParsedOperation = {
          toolName: "test-tool",
          domain: "virtual",
          method: "GET",
          path: "/api/v1/resource",
          operation: "get",
          pathParameters: [],
          queryParameters: [],
          oneOfGroups: [
            {
              choiceField: "type",
              options: ["option1", "option2"],
            },
          ] as OneOfGroup[],
        } as any;
        vi.mocked(getToolByName).mockReturnValue(mockTool);

        // Act
        const result = validateToolParams({ toolName: "test-tool" });

        // Assert
        expect(result.valid).toBe(true);
        expect(result.warnings).toHaveLength(0);
      });
    });
  });

  describe("formatValidationResult", () => {
    it("should format successful validation", () => {
      // Arrange
      const result: ValidationResult = {
        valid: true,
        errors: [],
        warnings: [],
        tool: {
          name: "test-tool",
          method: "GET",
          path: "/api/v1/resource",
          operation: "get",
        },
      };

      // Act
      const formatted = formatValidationResult(result);

      // Assert
      expect(formatted).toContain("✅ Validation passed");
      expect(formatted).toContain("test-tool");
      expect(formatted).toContain("GET /api/v1/resource");
    });

    it("should format validation errors", () => {
      // Arrange
      const result: ValidationResult = {
        valid: false,
        errors: [
          {
            path: "pathParams.namespace",
            message: "Missing required path parameter",
            expected: "string value",
          },
          {
            path: "body.metadata.name",
            message: "Field is required",
            expected: "string",
            actual: "undefined",
          },
        ],
        warnings: [],
      };

      // Act
      const formatted = formatValidationResult(result);

      // Assert
      expect(formatted).toContain("❌ Validation failed");
      expect(formatted).toContain("pathParams.namespace");
      expect(formatted).toContain("body.metadata.name");
      expect(formatted).toContain("Expected: string value");
      expect(formatted).toContain("Actual: undefined");
    });

    it("should format warnings", () => {
      // Arrange
      const result: ValidationResult = {
        valid: true,
        errors: [],
        warnings: [
          "Unknown query parameter: extra",
          "metadata.name is typically required",
        ],
      };

      // Act
      const formatted = formatValidationResult(result);

      // Assert
      expect(formatted).toContain("Warnings:");
      expect(formatted).toContain("⚠️ Unknown query parameter");
      expect(formatted).toContain("⚠️ metadata.name");
    });

    it("should format both errors and warnings", () => {
      // Arrange
      const result: ValidationResult = {
        valid: false,
        errors: [
          {
            path: "body.required_field",
            message: "Missing required field",
          },
        ],
        warnings: ["Field will default to value"],
      };

      // Act
      const formatted = formatValidationResult(result);

      // Assert
      expect(formatted).toContain("❌ Validation failed");
      expect(formatted).toContain("Errors:");
      expect(formatted).toContain("Warnings:");
    });
  });
});
