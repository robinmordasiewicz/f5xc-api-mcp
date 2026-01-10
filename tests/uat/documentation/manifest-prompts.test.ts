// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Manifest Prompts Validation Tests
 *
 * Validates that manifest.json prompts have correct structure,
 * valid template syntax, and required arguments.
 */

import { describe, it, expect, beforeAll } from "vitest";
import {
  getManifestJson,
  validateTemplateVariables,
  extractTemplateVariables,
} from "../utils/documentation-helpers.js";

describe("Manifest Prompt Validation", () => {
  let manifest: ReturnType<typeof getManifestJson>;

  beforeAll(() => {
    manifest = getManifestJson();
  });

  describe("prompts array structure", () => {
    it("should have prompts array defined", () => {
      expect(manifest.prompts).toBeDefined();
      expect(Array.isArray(manifest.prompts)).toBe(true);
    });

    it("should have at least one prompt", () => {
      expect(manifest.prompts!.length).toBeGreaterThan(0);
    });
  });

  describe("prompt required fields", () => {
    it("should have name field on all prompts", () => {
      for (const prompt of manifest.prompts ?? []) {
        expect(prompt.name).toBeDefined();
        expect(typeof prompt.name).toBe("string");
        expect(prompt.name.length).toBeGreaterThan(0);
      }
    });

    it("should have description field on all prompts", () => {
      for (const prompt of manifest.prompts ?? []) {
        expect(prompt.description).toBeDefined();
        expect(typeof prompt.description).toBe("string");
        expect(prompt.description.length).toBeGreaterThan(0);
      }
    });

    it("should have arguments array on all prompts", () => {
      for (const prompt of manifest.prompts ?? []) {
        expect(prompt.arguments).toBeDefined();
        expect(Array.isArray(prompt.arguments)).toBe(true);
      }
    });

    it("should have text field on all prompts", () => {
      for (const prompt of manifest.prompts ?? []) {
        expect(prompt.text).toBeDefined();
        expect(typeof prompt.text).toBe("string");
        expect(prompt.text.length).toBeGreaterThan(0);
      }
    });
  });

  describe("template syntax validation", () => {
    it("should have valid ${arguments.X} syntax in text", () => {
      for (const prompt of manifest.prompts ?? []) {
        const invalidVars = validateTemplateVariables(prompt.text);
        expect(invalidVars).toHaveLength(0);
      }
    });

    it("should reference all declared arguments in text", () => {
      for (const prompt of manifest.prompts ?? []) {
        const referencedVars = extractTemplateVariables(prompt.text);

        for (const arg of prompt.arguments) {
          expect(referencedVars).toContain(arg);
        }
      }
    });

    it("should not reference undeclared arguments", () => {
      for (const prompt of manifest.prompts ?? []) {
        const referencedVars = extractTemplateVariables(prompt.text);

        for (const varName of referencedVars) {
          expect(prompt.arguments).toContain(varName);
        }
      }
    });
  });

  describe("deploy-http-loadbalancer prompt", () => {
    it("should exist", () => {
      const prompt = manifest.prompts?.find(
        (p) => p.name === "deploy-http-loadbalancer"
      );
      expect(prompt).toBeDefined();
    });

    it("should require namespace argument", () => {
      const prompt = manifest.prompts?.find(
        (p) => p.name === "deploy-http-loadbalancer"
      );
      expect(prompt?.arguments).toContain("namespace");
    });

    it("should require name argument", () => {
      const prompt = manifest.prompts?.find(
        (p) => p.name === "deploy-http-loadbalancer"
      );
      expect(prompt?.arguments).toContain("name");
    });

    it("should have descriptive text mentioning load balancer", () => {
      const prompt = manifest.prompts?.find(
        (p) => p.name === "deploy-http-loadbalancer"
      );
      expect(prompt?.text.toLowerCase()).toContain("load balancer");
    });
  });

  describe("configure-waf prompt", () => {
    it("should exist", () => {
      const prompt = manifest.prompts?.find(
        (p) => p.name === "configure-waf"
      );
      expect(prompt).toBeDefined();
    });

    it("should require namespace argument", () => {
      const prompt = manifest.prompts?.find(
        (p) => p.name === "configure-waf"
      );
      expect(prompt?.arguments).toContain("namespace");
    });

    it("should have descriptive text mentioning WAF", () => {
      const prompt = manifest.prompts?.find(
        (p) => p.name === "configure-waf"
      );
      expect(prompt?.text.toLowerCase()).toContain("waf");
    });
  });

  describe("create-multicloud-site prompt", () => {
    it("should exist", () => {
      const prompt = manifest.prompts?.find(
        (p) => p.name === "create-multicloud-site"
      );
      expect(prompt).toBeDefined();
    });

    it("should require provider argument", () => {
      const prompt = manifest.prompts?.find(
        (p) => p.name === "create-multicloud-site"
      );
      expect(prompt?.arguments).toContain("provider");
    });

    it("should require region argument", () => {
      const prompt = manifest.prompts?.find(
        (p) => p.name === "create-multicloud-site"
      );
      expect(prompt?.arguments).toContain("region");
    });

    it("should mention cloud providers in text or description", () => {
      const prompt = manifest.prompts?.find(
        (p) => p.name === "create-multicloud-site"
      );
      const combined = `${prompt?.text} ${prompt?.description}`.toLowerCase();
      expect(combined).toMatch(/aws|azure|gcp|cloud/);
    });
  });

  describe("prompt naming conventions", () => {
    it("should use kebab-case for prompt names", () => {
      for (const prompt of manifest.prompts ?? []) {
        expect(prompt.name).toMatch(/^[a-z][a-z0-9-]*$/);
      }
    });

    it("should not have empty or whitespace-only names", () => {
      for (const prompt of manifest.prompts ?? []) {
        expect(prompt.name.trim().length).toBeGreaterThan(0);
      }
    });
  });

  describe("argument naming conventions", () => {
    it("should use valid identifier names for arguments", () => {
      for (const prompt of manifest.prompts ?? []) {
        for (const arg of prompt.arguments) {
          expect(arg).toMatch(/^[a-z][a-zA-Z0-9_]*$/);
        }
      }
    });

    it("should not have empty arguments", () => {
      for (const prompt of manifest.prompts ?? []) {
        for (const arg of prompt.arguments) {
          expect(arg.length).toBeGreaterThan(0);
        }
      }
    });
  });
});
