/**
 * Unit Tests for Error Handling Utilities
 */

import { describe, it, expect } from "vitest";
import {
  F5XCError,
  AuthenticationError,
  F5XCApiError,
  ConfigurationError,
  ValidationError,
  ToolExecutionError,
  SpecificationError,
  ErrorCategory,
  categorizeError,
  formatErrorForMcp,
  withErrorHandling,
} from "../../src/utils/error-handling.js";

describe("error-handling", () => {
  describe("F5XCError", () => {
    it("should create an error with message, code, and context", () => {
      const error = new F5XCError("Test error", "TEST_CODE", { key: "value" });
      expect(error.message).toBe("Test error");
      expect(error.code).toBe("TEST_CODE");
      expect(error.context).toEqual({ key: "value" });
      expect(error.name).toBe("F5XCError");
    });

    it("should create an error without context", () => {
      const error = new F5XCError("Test error", "TEST_CODE");
      expect(error.context).toBeUndefined();
    });

    it("should have proper stack trace", () => {
      const error = new F5XCError("Test error", "TEST_CODE");
      expect(error.stack).toBeDefined();
    });

    it("should convert to JSON correctly", () => {
      const error = new F5XCError("Test error", "TEST_CODE", { key: "value" });
      const json = error.toJSON();
      expect(json).toEqual({
        name: "F5XCError",
        message: "Test error",
        code: "TEST_CODE",
        context: { key: "value" },
      });
    });

    it("should extend Error", () => {
      const error = new F5XCError("Test error", "TEST_CODE");
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe("AuthenticationError", () => {
    it("should create an auth error with correct properties", () => {
      const error = new AuthenticationError("Invalid token");
      expect(error.message).toBe("Invalid token");
      expect(error.code).toBe("AUTH_ERROR");
      expect(error.name).toBe("AuthenticationError");
    });

    it("should support context", () => {
      const error = new AuthenticationError("Token expired", { tokenId: "abc123" });
      expect(error.context).toEqual({ tokenId: "abc123" });
    });

    it("should extend F5XCError", () => {
      const error = new AuthenticationError("Test");
      expect(error).toBeInstanceOf(F5XCError);
    });
  });

  describe("F5XCApiError", () => {
    it("should create an API error with status and response", () => {
      const error = new F5XCApiError("API failed", 500, { error: "Internal error" });
      expect(error.message).toBe("API failed");
      expect(error.status).toBe(500);
      expect(error.response).toEqual({ error: "Internal error" });
      expect(error.code).toBe("API_ERROR");
      expect(error.name).toBe("F5XCApiError");
    });

    it("should create API error without status", () => {
      const error = new F5XCApiError("Network error");
      expect(error.status).toBeUndefined();
      expect(error.response).toBeUndefined();
    });

    it("should convert to JSON with status and response", () => {
      const error = new F5XCApiError("API failed", 404, { msg: "Not found" }, { endpoint: "/api" });
      const json = error.toJSON();
      expect(json).toEqual({
        name: "F5XCApiError",
        message: "API failed",
        code: "API_ERROR",
        context: { endpoint: "/api" },
        status: 404,
        response: { msg: "Not found" },
      });
    });
  });

  describe("ConfigurationError", () => {
    it("should create a config error with correct properties", () => {
      const error = new ConfigurationError("Missing config");
      expect(error.message).toBe("Missing config");
      expect(error.code).toBe("CONFIG_ERROR");
      expect(error.name).toBe("ConfigurationError");
    });

    it("should support context", () => {
      const error = new ConfigurationError("Missing key", { key: "API_TOKEN" });
      expect(error.context).toEqual({ key: "API_TOKEN" });
    });
  });

  describe("ValidationError", () => {
    it("should create a validation error with field errors", () => {
      const errors = [
        { field: "name", message: "Name is required" },
        { field: "email", message: "Invalid email" },
      ];
      const error = new ValidationError("Validation failed", errors);
      expect(error.message).toBe("Validation failed");
      expect(error.errors).toEqual(errors);
      expect(error.code).toBe("VALIDATION_ERROR");
      expect(error.name).toBe("ValidationError");
    });

    it("should convert to JSON with errors array", () => {
      const errors = [{ field: "test", message: "Test error" }];
      const error = new ValidationError("Validation failed", errors, { form: "login" });
      const json = error.toJSON();
      expect(json).toEqual({
        name: "ValidationError",
        message: "Validation failed",
        code: "VALIDATION_ERROR",
        context: { form: "login" },
        errors: [{ field: "test", message: "Test error" }],
      });
    });
  });

  describe("ToolExecutionError", () => {
    it("should create a tool error with tool name", () => {
      const error = new ToolExecutionError("f5xc-api-test", "Tool failed");
      expect(error.message).toBe("Tool failed");
      expect(error.toolName).toBe("f5xc-api-test");
      expect(error.code).toBe("TOOL_ERROR");
      expect(error.name).toBe("ToolExecutionError");
    });

    it("should convert to JSON with tool name", () => {
      const error = new ToolExecutionError("f5xc-api-test", "Failed", { reason: "timeout" });
      const json = error.toJSON();
      expect(json).toEqual({
        name: "ToolExecutionError",
        message: "Failed",
        code: "TOOL_ERROR",
        context: { reason: "timeout" },
        toolName: "f5xc-api-test",
      });
    });
  });

  describe("SpecificationError", () => {
    it("should create a spec error with correct properties", () => {
      const error = new SpecificationError("Invalid spec");
      expect(error.message).toBe("Invalid spec");
      expect(error.code).toBe("SPEC_ERROR");
      expect(error.name).toBe("SpecificationError");
    });

    it("should support context", () => {
      const error = new SpecificationError("Parse error", { file: "spec.yaml" });
      expect(error.context).toEqual({ file: "spec.yaml" });
    });
  });

  describe("ErrorCategory", () => {
    it("should have expected values", () => {
      expect(ErrorCategory.VALIDATION).toBe("validation");
      expect(ErrorCategory.AUTHENTICATION).toBe("authentication");
      expect(ErrorCategory.SERVER).toBe("server");
      expect(ErrorCategory.NETWORK).toBe("network");
      expect(ErrorCategory.CONFIGURATION).toBe("configuration");
      expect(ErrorCategory.UNKNOWN).toBe("unknown");
    });
  });

  describe("categorizeError", () => {
    it("should categorize ValidationError as VALIDATION", () => {
      const error = new ValidationError("Test", []);
      expect(categorizeError(error)).toBe(ErrorCategory.VALIDATION);
    });

    it("should categorize AuthenticationError as AUTHENTICATION", () => {
      const error = new AuthenticationError("Test");
      expect(categorizeError(error)).toBe(ErrorCategory.AUTHENTICATION);
    });

    it("should categorize ConfigurationError as CONFIGURATION", () => {
      const error = new ConfigurationError("Test");
      expect(categorizeError(error)).toBe(ErrorCategory.CONFIGURATION);
    });

    it("should categorize F5XCApiError with 401 as AUTHENTICATION", () => {
      const error = new F5XCApiError("Unauthorized", 401);
      expect(categorizeError(error)).toBe(ErrorCategory.AUTHENTICATION);
    });

    it("should categorize F5XCApiError with 403 as AUTHENTICATION", () => {
      const error = new F5XCApiError("Forbidden", 403);
      expect(categorizeError(error)).toBe(ErrorCategory.AUTHENTICATION);
    });

    it("should categorize F5XCApiError with 400-499 as VALIDATION", () => {
      const error = new F5XCApiError("Bad request", 400);
      expect(categorizeError(error)).toBe(ErrorCategory.VALIDATION);

      const error404 = new F5XCApiError("Not found", 404);
      expect(categorizeError(error404)).toBe(ErrorCategory.VALIDATION);
    });

    it("should categorize F5XCApiError with 500+ as SERVER", () => {
      const error = new F5XCApiError("Server error", 500);
      expect(categorizeError(error)).toBe(ErrorCategory.SERVER);

      const error502 = new F5XCApiError("Bad gateway", 502);
      expect(categorizeError(error502)).toBe(ErrorCategory.SERVER);
    });

    it("should categorize F5XCApiError without status as SERVER", () => {
      const error = new F5XCApiError("Unknown API error");
      expect(categorizeError(error)).toBe(ErrorCategory.SERVER);
    });

    it("should categorize network errors as NETWORK", () => {
      const networkError = new Error("network timeout occurred");
      expect(categorizeError(networkError)).toBe(ErrorCategory.NETWORK);

      const timeoutError = new Error("Request timeout");
      expect(categorizeError(timeoutError)).toBe(ErrorCategory.NETWORK);

      const connRefusedError = new Error("ECONNREFUSED");
      expect(categorizeError(connRefusedError)).toBe(ErrorCategory.NETWORK);

      const notFoundError = new Error("ENOTFOUND");
      expect(categorizeError(notFoundError)).toBe(ErrorCategory.NETWORK);
    });

    it("should categorize unknown errors as UNKNOWN", () => {
      const genericError = new Error("Something went wrong");
      expect(categorizeError(genericError)).toBe(ErrorCategory.UNKNOWN);

      const stringError = "string error";
      expect(categorizeError(stringError)).toBe(ErrorCategory.UNKNOWN);

      const nullError = null;
      expect(categorizeError(nullError)).toBe(ErrorCategory.UNKNOWN);
    });
  });

  describe("formatErrorForMcp", () => {
    it("should format F5XCError correctly", () => {
      const error = new F5XCError("Test error", "TEST_CODE", { key: "value" });
      const result = formatErrorForMcp(error);

      expect(result.isError).toBe(true);
      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe("text");

      const parsed = JSON.parse(result.content[0].text);
      expect(parsed.error.code).toBe("TEST_CODE");
      expect(parsed.error.message).toBe("Test error");
      expect(parsed.error.details).toEqual({ key: "value" });
    });

    it("should format regular Error correctly", () => {
      const error = new Error("Regular error");
      const result = formatErrorForMcp(error);

      const parsed = JSON.parse(result.content[0].text);
      expect(parsed.error.code).toBe("UNKNOWN_ERROR");
      expect(parsed.error.message).toBe("Regular error");
    });

    it("should format string error correctly", () => {
      const result = formatErrorForMcp("String error");

      const parsed = JSON.parse(result.content[0].text);
      expect(parsed.error.code).toBe("UNKNOWN_ERROR");
      expect(parsed.error.message).toBe("String error");
    });

    it("should include category in response", () => {
      const error = new AuthenticationError("Auth failed");
      const result = formatErrorForMcp(error);

      const parsed = JSON.parse(result.content[0].text);
      expect(parsed.error.category).toBe(ErrorCategory.AUTHENTICATION);
    });

    it("should format error without context", () => {
      const error = new F5XCError("No context", "NO_CTX");
      const result = formatErrorForMcp(error);

      const parsed = JSON.parse(result.content[0].text);
      expect(parsed.error.details).toBeUndefined();
    });
  });

  describe("withErrorHandling", () => {
    it("should pass through successful results", async () => {
      const fn = async (x: number) => x * 2;
      const wrapped = withErrorHandling(fn);
      const result = await wrapped(5);
      expect(result).toBe(10);
    });

    it("should re-throw F5XCError unchanged", async () => {
      const originalError = new F5XCError("Original", "ORIG");
      const fn = async () => {
        throw originalError;
      };
      const wrapped = withErrorHandling(fn);

      await expect(wrapped()).rejects.toBe(originalError);
    });

    it("should wrap regular Error in F5XCError", async () => {
      const fn = async () => {
        throw new Error("Regular error");
      };
      const wrapped = withErrorHandling(fn);

      try {
        await wrapped();
        expect.fail("Should have thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(F5XCError);
        expect((error as F5XCError).message).toBe("Regular error");
        expect((error as F5XCError).code).toBe("UNKNOWN_ERROR");
        expect((error as F5XCError).context).toHaveProperty("originalError");
      }
    });

    it("should wrap non-Error values in F5XCError", async () => {
      const fn = async () => {
        throw "string error";
      };
      const wrapped = withErrorHandling(fn);

      try {
        await wrapped();
        expect.fail("Should have thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(F5XCError);
        expect((error as F5XCError).message).toBe("string error");
        expect((error as F5XCError).code).toBe("UNKNOWN_ERROR");
      }
    });

    it("should preserve function arguments", async () => {
      const fn = async (a: string, b: number) => `${a}-${b}`;
      const wrapped = withErrorHandling(fn);
      const result = await wrapped("test", 42);
      expect(result).toBe("test-42");
    });
  });
});
