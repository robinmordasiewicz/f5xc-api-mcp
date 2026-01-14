// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

import { describe, it, expect, beforeEach } from "vitest";
import {
  validateObjectDepth,
  validateRequestBody,
  ValidationError,
  getObjectDepth,
  createValidationConfigFromEnv,
} from "../../../src/utils/validation.js";

describe("Validation Utils", () => {
  describe("validateObjectDepth", () => {
    it("should accept objects within depth limit", () => {
      const obj = {
        level1: {
          level2: {
            level3: {
              value: "test",
            },
          },
        },
      };

      expect(() => validateObjectDepth(obj, 10)).not.toThrow();
    });

    it("should reject objects exceeding depth limit", () => {
      // Create object with 11 levels of nesting (exceeds maxDepth=10)
      const deepObj = {
        l1: {
          l2: {
            l3: { l4: { l5: { l6: { l7: { l8: { l9: { l10: { l11: { value: "too deep" } } } } } } } } },
          },
        },
      };

      expect(() => validateObjectDepth(deepObj, 10)).toThrow(ValidationError);
      expect(() => validateObjectDepth(deepObj, 10)).toThrow(/exceeds maximum depth of 10/);
    });

    it("should handle arrays correctly", () => {
      const obj = {
        items: [
          { nested: { deeply: { value: 1 } } },
          { nested: { deeply: { value: 2 } } },
        ],
      };

      expect(() => validateObjectDepth(obj, 10)).not.toThrow();
    });

    it("should handle nested arrays", () => {
      const obj = {
        matrix: [
          [
            [1, 2, 3],
            [4, 5, 6],
          ],
        ],
      };

      expect(() => validateObjectDepth(obj, 3)).not.toThrow();
      expect(() => validateObjectDepth(obj, 2)).toThrow(ValidationError);
    });

    it("should handle null and undefined", () => {
      expect(() => validateObjectDepth(null, 10)).not.toThrow();
      expect(() => validateObjectDepth(undefined, 10)).not.toThrow();
    });

    it("should handle primitives", () => {
      expect(() => validateObjectDepth("string", 10)).not.toThrow();
      expect(() => validateObjectDepth(123, 10)).not.toThrow();
      expect(() => validateObjectDepth(true, 10)).not.toThrow();
    });

    it("should provide helpful error messages with path", () => {
      const obj = {
        data: {
          nested: {
            very: {
              deep: {
                structure: {
                  goes: {
                    here: {
                      and: {
                        here: {
                          too: {
                            far: {
                              value: "too deep",
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      };

      try {
        validateObjectDepth(obj, 10);
        expect.fail("Should have thrown");
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        if (error instanceof ValidationError) {
          expect(error.path).toBeDefined();
          expect(error.actualDepth).toBeGreaterThan(10);
          expect(error.maxDepth).toBe(10);
        }
      }
    });

    it("should handle empty objects and arrays", () => {
      expect(() => validateObjectDepth({}, 10)).not.toThrow();
      expect(() => validateObjectDepth([], 10)).not.toThrow();
      expect(() => validateObjectDepth({ empty: [] }, 10)).not.toThrow();
    });

    it("should handle mixed nested structures", () => {
      const obj = {
        users: [
          {
            name: "Alice",
            addresses: [
              {
                street: "123 Main St",
                geo: {
                  lat: 40.7128,
                  lng: -74.006,
                },
              },
            ],
          },
        ],
      };

      expect(() => validateObjectDepth(obj, 10)).not.toThrow();
      expect(() => validateObjectDepth(obj, 5)).not.toThrow();
      expect(() => validateObjectDepth(obj, 4)).toThrow(ValidationError);
    });
  });

  describe("validateRequestBody", () => {
    it("should validate depth by default", () => {
      const body = {
        level1: { level2: { level3: { level4: { level5: "value" } } } },
      };

      expect(() => validateRequestBody(body)).not.toThrow();
    });

    it("should use custom max depth", () => {
      const body = {
        a: { b: { c: { d: "value" } } },
      };

      expect(() => validateRequestBody(body, { maxDepth: 5 })).not.toThrow();
      expect(() => validateRequestBody(body, { maxDepth: 2 })).toThrow(ValidationError);
    });

    it("should validate array lengths when configured", () => {
      const body = {
        items: [1, 2, 3, 4, 5],
      };

      expect(() =>
        validateRequestBody(body, {
          maxArrayLength: 10,
        })
      ).not.toThrow();

      expect(() =>
        validateRequestBody(body, {
          maxArrayLength: 3,
        })
      ).toThrow(ValidationError);
    });

    it("should validate string lengths when configured", () => {
      const body = {
        message: "Hello, World!",
      };

      expect(() =>
        validateRequestBody(body, {
          maxStringLength: 20,
        })
      ).not.toThrow();

      expect(() =>
        validateRequestBody(body, {
          maxStringLength: 5,
        })
      ).toThrow(/String length.*exceeds maximum/);
    });

    it("should validate nested arrays and strings", () => {
      const body = {
        data: {
          items: ["short", "longer string", "very long string here"],
        },
      };

      expect(() =>
        validateRequestBody(body, {
          maxArrayLength: 5,
          maxStringLength: 30,
        })
      ).not.toThrow();

      expect(() =>
        validateRequestBody(body, {
          maxStringLength: 10,
        })
      ).toThrow(ValidationError);
    });

    it("should handle complex request bodies", () => {
      const body = {
        metadata: {
          name: "test-resource",
          namespace: "default",
        },
        spec: {
          replicas: 3,
          template: {
            containers: [
              {
                name: "app",
                image: "nginx:latest",
                ports: [{ containerPort: 80 }],
              },
            ],
          },
        },
      };

      expect(() =>
        validateRequestBody(body, {
          maxDepth: 10,
          maxArrayLength: 100,
          maxStringLength: 1000,
        })
      ).not.toThrow();
    });

    it("should allow disabling path tracking for performance", () => {
      const body = { a: { b: { c: { d: { e: "value" } } } } };

      expect(() =>
        validateRequestBody(body, {
          maxDepth: 10,
          trackPath: false,
        })
      ).not.toThrow();
    });
  });

  describe("getObjectDepth", () => {
    it("should return 0 for primitives", () => {
      expect(getObjectDepth("string")).toBe(0);
      expect(getObjectDepth(123)).toBe(0);
      expect(getObjectDepth(true)).toBe(0);
      expect(getObjectDepth(null)).toBe(0);
      expect(getObjectDepth(undefined)).toBe(0);
    });

    it("should return 0 for empty objects and arrays", () => {
      expect(getObjectDepth({})).toBe(0);
      expect(getObjectDepth([])).toBe(0);
    });

    it("should calculate depth correctly for nested objects", () => {
      expect(getObjectDepth({ a: 1 })).toBe(1);
      expect(getObjectDepth({ a: { b: 1 } })).toBe(2);
      expect(getObjectDepth({ a: { b: { c: 1 } } })).toBe(3);
      expect(getObjectDepth({ a: { b: { c: { d: 1 } } } })).toBe(4);
    });

    it("should calculate depth correctly for nested arrays", () => {
      expect(getObjectDepth([1, 2, 3])).toBe(1);
      expect(getObjectDepth([[1, 2], [3, 4]])).toBe(2);
      expect(getObjectDepth([[[1]]])).toBe(3);
    });

    it("should handle mixed nested structures", () => {
      const obj = {
        a: [{ b: { c: [1, 2, 3] } }],
      };

      expect(getObjectDepth(obj)).toBe(5); // obj -> a -> item -> b -> c -> item
    });

    it("should return max depth for objects with multiple branches", () => {
      const obj = {
        shallow: { value: 1 },
        deep: { a: { b: { c: { d: 1 } } } },
      };

      expect(getObjectDepth(obj)).toBe(5); // follows deepest branch
    });

    it("should handle complex real-world structures", () => {
      const k8sPod = {
        apiVersion: "v1",
        kind: "Pod",
        metadata: {
          name: "nginx",
          labels: { app: "nginx" },
        },
        spec: {
          containers: [
            {
              name: "nginx",
              image: "nginx:1.21",
              ports: [{ containerPort: 80 }],
            },
          ],
        },
      };

      const depth = getObjectDepth(k8sPod);
      expect(depth).toBeGreaterThan(0);
      expect(depth).toBeLessThanOrEqual(7);
    });
  });

  describe("createValidationConfigFromEnv", () => {
    beforeEach(() => {
      // Clear environment variables
      delete process.env.F5XC_MAX_DEPTH;
      delete process.env.F5XC_MAX_ARRAY_LENGTH;
      delete process.env.F5XC_MAX_STRING_LENGTH;
    });

    it("should return empty config when no env vars set", () => {
      const config = createValidationConfigFromEnv();
      expect(config).toEqual({});
    });

    it("should read max depth from environment", () => {
      process.env.F5XC_MAX_DEPTH = "20";

      const config = createValidationConfigFromEnv();
      expect(config.maxDepth).toBe(20);
    });

    it("should read all config from environment", () => {
      process.env.F5XC_MAX_DEPTH = "15";
      process.env.F5XC_MAX_ARRAY_LENGTH = "1000";
      process.env.F5XC_MAX_STRING_LENGTH = "10000";

      const config = createValidationConfigFromEnv();
      expect(config.maxDepth).toBe(15);
      expect(config.maxArrayLength).toBe(1000);
      expect(config.maxStringLength).toBe(10000);
    });

    it("should ignore invalid environment values", () => {
      process.env.F5XC_MAX_DEPTH = "invalid";
      process.env.F5XC_MAX_ARRAY_LENGTH = "-100";

      const config = createValidationConfigFromEnv();
      expect(config.maxDepth).toBeUndefined();
      expect(config.maxArrayLength).toBeUndefined();
    });

    it("should handle partial configuration", () => {
      process.env.F5XC_MAX_DEPTH = "12";

      const config = createValidationConfigFromEnv();
      expect(config.maxDepth).toBe(12);
      expect(config.maxArrayLength).toBeUndefined();
      expect(config.maxStringLength).toBeUndefined();
    });
  });

  describe("Edge Cases", () => {
    it("should handle circular reference detection (implementation dependent)", () => {
      const obj: Record<string, unknown> = { a: { b: {} } };
      (obj.a as Record<string, unknown>).b = obj; // Create circular reference

      // Should not infinite loop
      expect(() => getObjectDepth(obj)).not.toThrow();
    });

    it("should handle very wide objects", () => {
      const wideObj: Record<string, number> = {};
      for (let i = 0; i < 1000; i++) {
        wideObj[`key${i}`] = i;
      }

      expect(() => validateObjectDepth(wideObj, 10)).not.toThrow();
    });

    it("should handle objects with many nested levels", () => {
      let deepObj: Record<string, unknown> = { value: "bottom" };
      for (let i = 0; i < 15; i++) {
        deepObj = { level: deepObj };
      }

      expect(() => validateObjectDepth(deepObj, 20)).not.toThrow();
      expect(() => validateObjectDepth(deepObj, 10)).toThrow(ValidationError);
    });

    it("should handle special object types", () => {
      const date = new Date();
      const regex = /test/;

      expect(() => validateObjectDepth({ date, regex }, 10)).not.toThrow();
    });
  });
});
