// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Tests verifying request body validation is wired into tool execution.
 * Security fix for issue #489.
 *
 * These tests verify the validation utility functions directly
 * since executeTool() requires the full tool registry setup.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  validateRequestBody,
  createValidationConfigFromEnv,
  ValidationError,
} from "../../src/utils/validation.js";

describe("request body validation integration (#489)", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    delete process.env.F5XC_MAX_DEPTH;
    delete process.env.F5XC_MAX_ARRAY_LENGTH;
    delete process.env.F5XC_MAX_STRING_LENGTH;
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  describe("validateRequestBody with default config", () => {
    it("should accept a normal F5XC request body", () => {
      const body = {
        metadata: {
          name: "example-lb",
          namespace: "default",
        },
        spec: {
          domains: ["example.com"],
          http: {
            dns_volterra_managed: true,
          },
          default_route_pools: [
            {
              pool: {
                name: "my-pool",
                namespace: "default",
              },
              weight: 1,
            },
          ],
        },
      };

      expect(() => validateRequestBody(body)).not.toThrow();
    });

    it("should reject deeply nested attack payloads", () => {
      // Build an object that exceeds depth 10
      let deep: Record<string, unknown> = { value: "leaf" };
      for (let i = 0; i < 12; i++) {
        deep = { nested: deep };
      }

      expect(() => validateRequestBody(deep)).toThrow(ValidationError);
    });

    it("should accept objects exactly at the depth limit", () => {
      // Build an object exactly at depth 10
      let obj: Record<string, unknown> = { value: "leaf" };
      for (let i = 0; i < 9; i++) {
        obj = { nested: obj };
      }

      expect(() => validateRequestBody(obj)).not.toThrow();
    });
  });

  describe("createValidationConfigFromEnv", () => {
    it("should use defaults when no env vars are set", () => {
      const config = createValidationConfigFromEnv();
      expect(config.maxDepth).toBeUndefined();
      expect(config.maxArrayLength).toBeUndefined();
      expect(config.maxStringLength).toBeUndefined();
    });

    it("should read F5XC_MAX_DEPTH from environment", () => {
      process.env.F5XC_MAX_DEPTH = "5";
      const config = createValidationConfigFromEnv();
      expect(config.maxDepth).toBe(5);
    });

    it("should read F5XC_MAX_ARRAY_LENGTH from environment", () => {
      process.env.F5XC_MAX_ARRAY_LENGTH = "50";
      const config = createValidationConfigFromEnv();
      expect(config.maxArrayLength).toBe(50);
    });

    it("should read F5XC_MAX_STRING_LENGTH from environment", () => {
      process.env.F5XC_MAX_STRING_LENGTH = "10000";
      const config = createValidationConfigFromEnv();
      expect(config.maxStringLength).toBe(10000);
    });

    it("should ignore invalid numeric values", () => {
      process.env.F5XC_MAX_DEPTH = "abc";
      const config = createValidationConfigFromEnv();
      expect(config.maxDepth).toBeUndefined();
    });

    it("should ignore zero or negative values", () => {
      process.env.F5XC_MAX_DEPTH = "0";
      const config = createValidationConfigFromEnv();
      expect(config.maxDepth).toBeUndefined();
    });
  });

  describe("validation with custom config", () => {
    it("should enforce custom max depth", () => {
      process.env.F5XC_MAX_DEPTH = "3";
      const config = createValidationConfigFromEnv();

      const shallow = { a: { b: { c: 1 } } };
      expect(() => validateRequestBody(shallow, config)).not.toThrow();

      let deep: Record<string, unknown> = { value: "leaf" };
      for (let i = 0; i < 5; i++) {
        deep = { nested: deep };
      }
      expect(() => validateRequestBody(deep, config)).toThrow(ValidationError);
    });

    it("should enforce max array length", () => {
      const config = { maxArrayLength: 3 };
      const body = { items: [1, 2, 3, 4, 5] };
      expect(() => validateRequestBody(body, config)).toThrow(ValidationError);
    });

    it("should enforce max string length", () => {
      const config = { maxStringLength: 10 };
      const body = { name: "a".repeat(20) };
      expect(() => validateRequestBody(body, config)).toThrow(ValidationError);
    });
  });
});
