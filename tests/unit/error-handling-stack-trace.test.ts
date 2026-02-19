// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Tests verifying stack traces are never exposed in error responses.
 * Security fix for issue #488.
 */

import { describe, it, expect } from "vitest";
import {
  F5XCError,
  withErrorHandling,
  formatErrorForMcp,
} from "../../src/utils/error-handling.js";

describe("stack trace suppression (#488)", () => {
  describe("withErrorHandling", () => {
    it("should not include stack traces in wrapped error context", async () => {
      const fn = async () => {
        throw new Error("something broke");
      };
      const wrapped = withErrorHandling(fn);

      try {
        await wrapped();
        expect.fail("Should have thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(F5XCError);
        const ctx = (error as F5XCError).context;
        expect(ctx).toBeDefined();
        expect(ctx).not.toHaveProperty("stack");
        expect(ctx).toHaveProperty("originalError");
      }
    });

    it("should not leak stack for TypeError", async () => {
      const fn = async () => {
        throw new TypeError("null is not an object");
      };
      const wrapped = withErrorHandling(fn);

      try {
        await wrapped();
        expect.fail("Should have thrown");
      } catch (error) {
        expect((error as F5XCError).context).not.toHaveProperty("stack");
      }
    });

    it("should not leak stack for RangeError", async () => {
      const fn = async () => {
        throw new RangeError("Maximum call stack size exceeded");
      };
      const wrapped = withErrorHandling(fn);

      try {
        await wrapped();
        expect.fail("Should have thrown");
      } catch (error) {
        expect((error as F5XCError).context).not.toHaveProperty("stack");
      }
    });
  });

  describe("formatErrorForMcp", () => {
    it("should not include stack traces in serialized MCP error output", () => {
      const error = new F5XCError("test error", "TEST", {
        originalError: "Error",
      });
      const result = formatErrorForMcp(error);
      const text = result.content[0].text;

      expect(text).not.toContain("at ");
      expect(text).not.toContain(".ts:");
      expect(text).not.toContain(".js:");

      const parsed = JSON.parse(text);
      expect(parsed.error.details).not.toHaveProperty("stack");
    });

    it("should not include stack traces when wrapping a regular Error", () => {
      const error = new Error("regular error");
      const result = formatErrorForMcp(error);
      const text = result.content[0].text;

      // formatErrorForMcp doesn't pass context for regular Errors
      const parsed = JSON.parse(text);
      expect(parsed.error.details).toBeUndefined();
    });
  });
});
