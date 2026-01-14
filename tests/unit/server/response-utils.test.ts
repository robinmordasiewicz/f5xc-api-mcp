// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Unit Tests for Response Utilities
 *
 * Tests the extracted response formatting utilities used across
 * all tool handlers in the refactored server architecture.
 */

import { describe, it, expect } from "vitest";
import {
  createTextResponse,
  createErrorResponse,
  extractStringArguments,
} from "../../../src/server/response-utils.js";

describe("response-utils", () => {
  describe("createTextResponse", () => {
    it("should create response with JSON-serialized object data", () => {
      const data = { key: "value", nested: { num: 42 } };
      const result = createTextResponse(data);

      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe("text");
      expect(JSON.parse(result.content[0].text)).toEqual(data);
      expect(result.isError).toBeUndefined();
    });

    it("should create response with string data", () => {
      const data = "simple string";
      const result = createTextResponse(data);

      expect(result.content[0].text).toBe('"simple string"');
    });

    it("should create response with array data", () => {
      const data = [1, 2, 3, "four"];
      const result = createTextResponse(data);

      expect(JSON.parse(result.content[0].text)).toEqual(data);
    });

    it("should create response with null data", () => {
      const result = createTextResponse(null);

      expect(result.content[0].text).toBe("null");
    });

    it("should create response with number data", () => {
      const result = createTextResponse(42);

      expect(result.content[0].text).toBe("42");
    });

    it("should create response with boolean data", () => {
      const result = createTextResponse(true);

      expect(result.content[0].text).toBe("true");
    });

    it("should format JSON with 2-space indentation", () => {
      const data = { a: 1 };
      const result = createTextResponse(data);

      expect(result.content[0].text).toBe('{\n  "a": 1\n}');
    });

    it("should handle complex nested structures", () => {
      const data = {
        server: "f5xc-api-mcp",
        capabilities: {
          tools: ["search", "execute"],
          modes: { authenticated: true, documentation: true },
        },
        domains: ["virtual", "dns"],
      };
      const result = createTextResponse(data);

      expect(JSON.parse(result.content[0].text)).toEqual(data);
    });

    it("should handle empty object", () => {
      const result = createTextResponse({});

      expect(result.content[0].text).toBe("{}");
    });

    it("should handle empty array", () => {
      const result = createTextResponse([]);

      expect(result.content[0].text).toBe("[]");
    });
  });

  describe("createErrorResponse", () => {
    it("should create error response from string message", () => {
      const result = createErrorResponse("Something went wrong");

      expect(result.content).toHaveLength(1);
      expect(result.content[0].type).toBe("text");
      expect(result.isError).toBe(true);

      const payload = JSON.parse(result.content[0].text);
      expect(payload.error).toBe("Something went wrong");
      expect(payload.hint).toBeUndefined();
    });

    it("should create error response from Error object", () => {
      const error = new Error("Error object message");
      const result = createErrorResponse(error);

      const payload = JSON.parse(result.content[0].text);
      expect(payload.error).toBe("Error object message");
    });

    it("should include hint when provided", () => {
      const result = createErrorResponse("Auth failed", "Check your API token");

      const payload = JSON.parse(result.content[0].text);
      expect(payload.error).toBe("Auth failed");
      expect(payload.hint).toBe("Check your API token");
    });

    it("should not include hint when not provided", () => {
      const result = createErrorResponse("Simple error");

      const payload = JSON.parse(result.content[0].text);
      expect(payload).not.toHaveProperty("hint");
    });

    it("should handle Error with hint", () => {
      const error = new Error("Database connection failed");
      const result = createErrorResponse(error, "Check database credentials");

      const payload = JSON.parse(result.content[0].text);
      expect(payload.error).toBe("Database connection failed");
      expect(payload.hint).toBe("Check database credentials");
    });

    it("should always set isError flag to true", () => {
      const result1 = createErrorResponse("error");
      const result2 = createErrorResponse(new Error("error"));
      const result3 = createErrorResponse("error", "hint");

      expect(result1.isError).toBe(true);
      expect(result2.isError).toBe(true);
      expect(result3.isError).toBe(true);
    });

    it("should handle empty error message", () => {
      const result = createErrorResponse("");

      const payload = JSON.parse(result.content[0].text);
      expect(payload.error).toBe("");
    });

    it("should handle Error with empty message", () => {
      const error = new Error("");
      const result = createErrorResponse(error);

      const payload = JSON.parse(result.content[0].text);
      expect(payload.error).toBe("");
    });
  });

  describe("extractStringArguments", () => {
    it("should convert all values to strings", () => {
      const args = {
        name: "test",
        count: 42,
        enabled: true,
        ratio: 3.14,
      };
      const result = extractStringArguments(args);

      expect(result).toEqual({
        name: "test",
        count: "42",
        enabled: "true",
        ratio: "3.14",
      });
    });

    it("should return empty object for undefined input", () => {
      const result = extractStringArguments(undefined);

      expect(result).toEqual({});
    });

    it("should skip null values", () => {
      const args = {
        name: "test",
        nullValue: null,
        other: "value",
      };
      const result = extractStringArguments(args);

      expect(result).toEqual({
        name: "test",
        other: "value",
      });
      expect(result).not.toHaveProperty("nullValue");
    });

    it("should skip undefined values", () => {
      const args = {
        name: "test",
        undefinedValue: undefined,
        other: "value",
      };
      const result = extractStringArguments(args);

      expect(result).toEqual({
        name: "test",
        other: "value",
      });
      expect(result).not.toHaveProperty("undefinedValue");
    });

    it("should handle empty object", () => {
      const result = extractStringArguments({});

      expect(result).toEqual({});
    });

    it("should convert objects to string representation", () => {
      const args = {
        obj: { nested: "value" },
      };
      const result = extractStringArguments(args);

      expect(result.obj).toBe("[object Object]");
    });

    it("should convert arrays to string representation", () => {
      const args = {
        arr: [1, 2, 3],
      };
      const result = extractStringArguments(args);

      expect(result.arr).toBe("1,2,3");
    });

    it("should handle zero and empty string", () => {
      const args = {
        zero: 0,
        empty: "",
      };
      const result = extractStringArguments(args);

      expect(result.zero).toBe("0");
      expect(result.empty).toBe("");
    });

    it("should handle boolean false", () => {
      const args = {
        flag: false,
      };
      const result = extractStringArguments(args);

      expect(result.flag).toBe("false");
    });
  });
});
