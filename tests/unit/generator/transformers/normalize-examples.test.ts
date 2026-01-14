// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

import { describe, it, expect } from "vitest";
import {
  normalizeExamples,
  normalizeParameterExamples,
  hasMyPrefixExamples,
} from "../../../../src/generator/transformers/normalize-examples.js";

describe("normalize-examples", () => {
  describe("normalizeExamples", () => {
    it("should replace my- prefix with example- prefix", () => {
      const input = "my-file, shared/my-file, my-ns/my-file";
      const expected = "example-file, shared/example-file, example-ns/example-file";

      expect(normalizeExamples(input)).toBe(expected);
    });

    it("should normalize namespace and resource names", () => {
      const input = "Use namespace 'my-namespace' with resource 'my-lb'";
      const expected = "Use namespace 'example-namespace' with resource 'example-lb'";

      expect(normalizeExamples(input)).toBe(expected);
    });

    it("should handle multiple my- prefixed words", () => {
      const input = "my-first, my-second, my-third";
      const expected = "example-first, example-second, example-third";

      expect(normalizeExamples(input)).toBe(expected);
    });

    it("should handle empty strings", () => {
      expect(normalizeExamples("")).toBe("");
    });

    it("should handle undefined input", () => {
      expect(normalizeExamples(undefined as unknown as string)).toBe(undefined);
    });

    it("should handle null input", () => {
      expect(normalizeExamples(null as unknown as string)).toBe(null);
    });

    it("should not modify strings without my- prefix", () => {
      const input = "example-file, shared/example-file";
      expect(normalizeExamples(input)).toBe(input);
    });

    it("should preserve text that is not my- prefixed", () => {
      const input = "Use my-namespace but also other-namespace and regular text";
      const expected = "Use example-namespace but also other-namespace and regular text";

      expect(normalizeExamples(input)).toBe(expected);
    });

    it("should handle my- prefix at start of string", () => {
      const input = "my-start of string";
      const expected = "example-start of string";

      expect(normalizeExamples(input)).toBe(expected);
    });

    it("should handle my- prefix at end of string", () => {
      const input = "end of string my-end";
      const expected = "end of string example-end";

      expect(normalizeExamples(input)).toBe(expected);
    });

    it("should handle my- prefix with hyphens in the name", () => {
      const input = "my-multi-word-name";
      const expected = "example-multi-word-name"; // Only first "my-" should be replaced

      // Note: The regex /\bmy-(\w+)/g matches "my-" followed by word characters
      // So "my-multi-word-name" would match "my-multi" only
      expect(normalizeExamples(input)).toBe("example-multi-word-name");
    });

    it("should only match whole word boundaries", () => {
      const input = "dummy-value thisisnoty-test";
      // Should not replace "my-" if it's part of a larger word
      expect(normalizeExamples(input)).toBe(input);
    });

    it("should handle paths with my- prefix", () => {
      const input = "/api/my-resource/my-endpoint";
      const expected = "/api/example-resource/example-endpoint";

      expect(normalizeExamples(input)).toBe(expected);
    });

    it("should handle quoted strings", () => {
      const input = '"my-quoted" and \'my-single\'';
      const expected = '"example-quoted" and \'example-single\'';

      expect(normalizeExamples(input)).toBe(expected);
    });

    it("should handle JSON-like structures", () => {
      const input = '{"name": "my-name", "namespace": "my-namespace"}';
      const expected = '{"name": "example-name", "namespace": "example-namespace"}';

      expect(normalizeExamples(input)).toBe(expected);
    });

    it("should handle multiline text", () => {
      const input = `Line 1 with my-first
Line 2 with my-second
Line 3 with my-third`;
      const expected = `Line 1 with example-first
Line 2 with example-second
Line 3 with example-third`;

      expect(normalizeExamples(input)).toBe(expected);
    });

    it("should handle special characters around my- prefix", () => {
      const input = "(my-paren) [my-bracket] {my-brace} <my-angle>";
      const expected = "(example-paren) [example-bracket] {example-brace} <example-angle>";

      expect(normalizeExamples(input)).toBe(expected);
    });

    it("should handle consecutive my- prefixes", () => {
      const input = "my-first my-second";
      const expected = "example-first example-second";

      expect(normalizeExamples(input)).toBe(expected);
    });

    it("should handle my- prefix with numbers", () => {
      const input = "my-resource1, my-resource2, my-resource3";
      const expected = "example-resource1, example-resource2, example-resource3";

      expect(normalizeExamples(input)).toBe(expected);
    });

    it("should handle my- prefix with underscores", () => {
      const input = "my-resource_name my-other_resource";
      const expected = "example-resource_name example-other_resource";

      expect(normalizeExamples(input)).toBe(expected);
    });

    it("should handle mixed case around my- prefix", () => {
      const input = "My-Resource MY-RESOURCE my-Resource";
      // Regex is case-sensitive by default, so only lowercase "my-" matches
      expect(normalizeExamples(input)).toBe("My-Resource MY-RESOURCE example-Resource");
    });
  });

  describe("normalizeParameterExamples", () => {
    it("should normalize description in parameter object", () => {
      const param = {
        name: "resource",
        description: "Use my-resource and my-namespace",
        type: "string",
      };

      const result = normalizeParameterExamples(param);

      expect(result.description).toBe("Use example-resource and example-namespace");
      expect(result.name).toBe("resource");
      expect(result.type).toBe("string");
    });

    it("should return unchanged param if no description", () => {
      const param = {
        name: "resource",
        type: "string",
      };

      const result = normalizeParameterExamples(param);

      expect(result).toEqual(param);
    });

    it("should return unchanged param if description is empty", () => {
      const param = {
        name: "resource",
        description: "",
        type: "string",
      };

      const result = normalizeParameterExamples(param);

      expect(result).toEqual(param);
    });

    it("should handle undefined description", () => {
      const param = {
        name: "resource",
        description: undefined,
        type: "string",
      };

      const result = normalizeParameterExamples(param);

      expect(result).toEqual(param);
    });

    it("should create new object, not mutate original", () => {
      const param = {
        name: "resource",
        description: "my-resource",
        type: "string",
      };

      const result = normalizeParameterExamples(param);

      expect(result).not.toBe(param);
      expect(param.description).toBe("my-resource"); // Original unchanged
      expect(result.description).toBe("example-resource"); // New object modified
    });

    it("should preserve all other properties", () => {
      const param = {
        name: "resource",
        description: "my-resource",
        type: "string",
        required: true,
        default: "my-default",
        schema: { type: "string" },
      };

      const result = normalizeParameterExamples(param);

      expect(result.name).toBe("resource");
      expect(result.type).toBe("string");
      expect(result.required).toBe(true);
      expect(result.default).toBe("my-default");
      expect(result.schema).toEqual({ type: "string" });
      expect(result.description).toBe("example-resource");
    });

    it("should handle complex objects with nested properties", () => {
      const param = {
        name: "resource",
        description: "my-complex",
        metadata: {
          nested: {
            value: "test",
          },
        },
      };

      const result = normalizeParameterExamples(param);

      expect(result.description).toBe("example-complex");
      expect(result.metadata).toEqual(param.metadata);
    });

    it("should handle description with no my- prefix", () => {
      const param = {
        name: "resource",
        description: "example-resource already normalized",
        type: "string",
      };

      const result = normalizeParameterExamples(param);

      expect(result.description).toBe("example-resource already normalized");
    });
  });

  describe("hasMyPrefixExamples", () => {
    it("should return true for strings with my- prefix", () => {
      expect(hasMyPrefixExamples("my-resource")).toBe(true);
      expect(hasMyPrefixExamples("text with my-resource inside")).toBe(true);
      expect(hasMyPrefixExamples("multiple my-first and my-second")).toBe(true);
    });

    it("should return false for strings without my- prefix", () => {
      expect(hasMyPrefixExamples("example-resource")).toBe(false);
      expect(hasMyPrefixExamples("no prefix here")).toBe(false);
      expect(hasMyPrefixExamples("other-resource")).toBe(false);
    });

    it("should return false for empty strings", () => {
      expect(hasMyPrefixExamples("")).toBe(false);
    });

    it("should handle strings with my but not my- prefix", () => {
      expect(hasMyPrefixExamples("myresource")).toBe(false);
      expect(hasMyPrefixExamples("my resource")).toBe(false);
      expect(hasMyPrefixExamples("dummy-value")).toBe(false);
    });

    it("should be case-sensitive", () => {
      expect(hasMyPrefixExamples("My-Resource")).toBe(false);
      expect(hasMyPrefixExamples("MY-RESOURCE")).toBe(false);
      expect(hasMyPrefixExamples("my-resource")).toBe(true);
    });

    it("should detect my- prefix at start of string", () => {
      expect(hasMyPrefixExamples("my-start")).toBe(true);
    });

    it("should detect my- prefix at end of string", () => {
      expect(hasMyPrefixExamples("end my-end")).toBe(true);
    });

    it("should detect my- prefix in middle of string", () => {
      expect(hasMyPrefixExamples("start my-middle end")).toBe(true);
    });

    it("should detect my- prefix with word boundaries", () => {
      expect(hasMyPrefixExamples("(my-paren)")).toBe(true);
      expect(hasMyPrefixExamples("[my-bracket]")).toBe(true);
      expect(hasMyPrefixExamples("/my-path/")).toBe(true);
    });

    it("should not match partial words", () => {
      expect(hasMyPrefixExamples("dummy-test")).toBe(false);
      expect(hasMyPrefixExamples("anatomy-book")).toBe(false);
    });

    it("should handle multiline strings", () => {
      const multiline = `Line 1
my-resource on line 2
Line 3`;
      expect(hasMyPrefixExamples(multiline)).toBe(true);
    });

    it("should handle JSON strings", () => {
      const json = '{"name": "my-name"}';
      expect(hasMyPrefixExamples(json)).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("should handle very long strings efficiently", () => {
      const longString = "start ".repeat(1000) + "my-resource" + " end".repeat(1000);

      const result = normalizeExamples(longString);
      expect(result).toContain("example-resource");
      expect(hasMyPrefixExamples(longString)).toBe(true);
    });

    it("should handle strings with many my- prefixes", () => {
      const manyPrefixes = Array.from({ length: 100 }, (_, i) => `my-resource${i}`).join(" ");
      const result = normalizeExamples(manyPrefixes);

      expect(result).toContain("example-resource0");
      expect(result).toContain("example-resource99");
      expect(result).not.toContain("my-resource");
    });

    it("should handle special Unicode characters", () => {
      const input = "my-资源 my-リソース my-ресурс";
      // Regex \w doesn't match non-ASCII characters by default in JavaScript
      // So this will only match the hyphen
      expect(normalizeExamples(input)).toBe(input);
    });

    it("should handle regex special characters in text", () => {
      const input = "my-resource.*test my-resource+plus my-resource?question";
      const result = normalizeExamples(input);

      expect(result).toContain("example-resource");
    });
  });
});
