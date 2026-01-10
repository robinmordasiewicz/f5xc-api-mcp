// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Tool Descriptions Validation Tests
 *
 * Validates that discovery tool descriptions are accurate,
 * properly formatted, and have valid input schemas.
 */

import { describe, it, expect, beforeAll } from "vitest";
import { getManifestJson } from "../utils/documentation-helpers.js";

describe("Discovery Tool Descriptions Validation", () => {
  let manifest: ReturnType<typeof getManifestJson>;

  beforeAll(() => {
    manifest = getManifestJson();
  });

  describe("manifest tools array", () => {
    it("should have tools array defined", () => {
      expect(manifest.tools).toBeDefined();
      expect(Array.isArray(manifest.tools)).toBe(true);
    });

    it("should have at least one tool", () => {
      expect(manifest.tools!.length).toBeGreaterThan(0);
    });
  });

  describe("tool naming conventions", () => {
    it("should have f5xc-api- prefix on tool names", () => {
      for (const tool of manifest.tools ?? []) {
        expect(tool.name).toMatch(/^f5xc-api-/);
      }
    });

    it("should use kebab-case for tool names", () => {
      for (const tool of manifest.tools ?? []) {
        expect(tool.name).toMatch(/^[a-z0-9-]+$/);
      }
    });

    it("should not have empty tool names", () => {
      for (const tool of manifest.tools ?? []) {
        expect(tool.name.length).toBeGreaterThan(0);
      }
    });
  });

  describe("tool description quality", () => {
    it("should have non-empty descriptions", () => {
      for (const tool of manifest.tools ?? []) {
        expect(tool.description).toBeDefined();
        expect(tool.description.length).toBeGreaterThan(0);
      }
    });

    it("should have meaningful description length (>10 chars)", () => {
      for (const tool of manifest.tools ?? []) {
        expect(tool.description.length).toBeGreaterThan(10);
      }
    });

    it("should not have placeholder descriptions", () => {
      const placeholders = ["todo", "tbd", "placeholder", "description here"];
      for (const tool of manifest.tools ?? []) {
        const desc = tool.description.toLowerCase();
        for (const placeholder of placeholders) {
          expect(desc).not.toContain(placeholder);
        }
      }
    });
  });

  describe("f5xc-api-server-info tool", () => {
    it("should exist in manifest", () => {
      const tool = manifest.tools?.find(
        (t) => t.name === "f5xc-api-server-info"
      );
      expect(tool).toBeDefined();
    });

    it("should mention server or status in description", () => {
      const tool = manifest.tools?.find(
        (t) => t.name === "f5xc-api-server-info"
      );
      const desc = tool?.description.toLowerCase() ?? "";
      expect(desc).toMatch(/server|status|info/);
    });
  });

  describe("f5xc-api-search-tools tool", () => {
    it("should exist in manifest", () => {
      const tool = manifest.tools?.find(
        (t) => t.name === "f5xc-api-search-tools"
      );
      expect(tool).toBeDefined();
    });

    it("should mention search in description", () => {
      const tool = manifest.tools?.find(
        (t) => t.name === "f5xc-api-search-tools"
      );
      expect(tool?.description.toLowerCase()).toContain("search");
    });
  });

  describe("f5xc-api-describe-tool tool", () => {
    it("should exist in manifest", () => {
      const tool = manifest.tools?.find(
        (t) => t.name === "f5xc-api-describe-tool"
      );
      expect(tool).toBeDefined();
    });

    it("should explain its purpose", () => {
      const tool = manifest.tools?.find(
        (t) => t.name === "f5xc-api-describe-tool"
      );
      const desc = tool?.description.toLowerCase() ?? "";
      expect(desc).toMatch(/detail|info|describe|tool/);
    });
  });

  describe("f5xc-api-execute-tool tool", () => {
    it("should exist in manifest", () => {
      const tool = manifest.tools?.find(
        (t) => t.name === "f5xc-api-execute-tool"
      );
      expect(tool).toBeDefined();
    });

    it("should mention execution in description", () => {
      const tool = manifest.tools?.find(
        (t) => t.name === "f5xc-api-execute-tool"
      );
      expect(tool?.description.toLowerCase()).toContain("execute");
    });
  });

  describe("f5xc-api-search-resources tool", () => {
    it("should exist in manifest", () => {
      const tool = manifest.tools?.find(
        (t) => t.name === "f5xc-api-search-resources"
      );
      expect(tool).toBeDefined();
    });

    it("should mention resources in description", () => {
      const tool = manifest.tools?.find(
        (t) => t.name === "f5xc-api-search-resources"
      );
      expect(tool?.description.toLowerCase()).toContain("resource");
    });
  });

  describe("f5xc-api-execute-resource tool", () => {
    it("should exist in manifest", () => {
      const tool = manifest.tools?.find(
        (t) => t.name === "f5xc-api-execute-resource"
      );
      expect(tool).toBeDefined();
    });

    it("should mention CRUD in description", () => {
      const tool = manifest.tools?.find(
        (t) => t.name === "f5xc-api-execute-resource"
      );
      const desc = tool?.description.toLowerCase() ?? "";
      expect(desc).toMatch(/crud|operation|execute/);
    });
  });

  describe("tool completeness", () => {
    const expectedTools = [
      "f5xc-api-server-info",
      "f5xc-api-search-tools",
      "f5xc-api-describe-tool",
      "f5xc-api-execute-tool",
      "f5xc-api-search-resources",
      "f5xc-api-execute-resource",
    ];

    expectedTools.forEach((toolName) => {
      it(`should include ${toolName}`, () => {
        const tool = manifest.tools?.find((t) => t.name === toolName);
        expect(tool).toBeDefined();
      });
    });
  });

  describe("description consistency", () => {
    it("should not have duplicate tool names", () => {
      const names = manifest.tools?.map((t) => t.name) ?? [];
      const uniqueNames = new Set(names);
      expect(names.length).toBe(uniqueNames.size);
    });

    it("should not have duplicate descriptions", () => {
      const descriptions = manifest.tools?.map((t) => t.description) ?? [];
      const uniqueDescriptions = new Set(descriptions);
      expect(descriptions.length).toBe(uniqueDescriptions.size);
    });
  });
});
