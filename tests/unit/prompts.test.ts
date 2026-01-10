// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Unit tests for prompts module
 *
 * Tests for dynamically-loaded workflow prompts from upstream x-f5xc-guided-workflows
 */

import { describe, it, expect, beforeEach } from "vitest";
import {
  getWorkflowPrompts,
  getWorkflowPrompt,
  processPromptTemplate,
  clearWorkflowCache,
} from "../../src/prompts/workflows.js";

describe("Workflow Prompts", () => {
  beforeEach(() => {
    // Clear cache before each test to ensure fresh data
    clearWorkflowCache();
  });

  describe("getWorkflowPrompts()", () => {
    it("should return array of workflow prompts from upstream", () => {
      const prompts = getWorkflowPrompts();
      expect(Array.isArray(prompts)).toBe(true);
      expect(prompts.length).toBeGreaterThan(0);
    });

    it("should include deploy_http_loadbalancer workflow", () => {
      const prompts = getWorkflowPrompts();
      const prompt = prompts.find((p) => p.name === "deploy_http_loadbalancer");
      expect(prompt).toBeDefined();
    });

    it("should include enable_waf_protection workflow", () => {
      const prompts = getWorkflowPrompts();
      const prompt = prompts.find((p) => p.name === "enable_waf_protection");
      expect(prompt).toBeDefined();
    });

    it("should have valid workflow structure for all prompts", () => {
      const prompts = getWorkflowPrompts();
      for (const prompt of prompts) {
        expect(prompt.name).toBeTruthy();
        expect(prompt.description).toBeTruthy();
        expect(prompt.template).toBeTruthy();
        expect(Array.isArray(prompt.arguments)).toBe(true);
      }
    });
  });

  describe("individual workflow prompts", () => {
    it("deploy_http_loadbalancer should have description", () => {
      const prompt = getWorkflowPrompt("deploy_http_loadbalancer");
      expect(prompt).toBeDefined();
      expect(prompt!.description).toBeTruthy();
    });

    it("deploy_http_loadbalancer should have required arguments", () => {
      const prompt = getWorkflowPrompt("deploy_http_loadbalancer");
      expect(prompt).toBeDefined();

      const args = prompt!.arguments;
      const required = args.filter((a) => a.required);

      expect(required.map((a) => a.name)).toContain("namespace");
      expect(required.map((a) => a.name)).toContain("name");
    });

    it("enable_waf_protection should have description", () => {
      const prompt = getWorkflowPrompt("enable_waf_protection");
      expect(prompt).toBeDefined();
      expect(prompt!.description).toBeTruthy();
    });

    it("configure_origin_pool should exist", () => {
      const prompt = getWorkflowPrompt("configure_origin_pool");
      expect(prompt).toBeDefined();
    });

    it("configure_dns_zone should exist", () => {
      const prompt = getWorkflowPrompt("configure_dns_zone");
      expect(prompt).toBeDefined();
    });
  });
});

describe("getWorkflowPrompt", () => {
  beforeEach(() => {
    clearWorkflowCache();
  });

  it("should return prompt by name", () => {
    const prompt = getWorkflowPrompt("deploy_http_loadbalancer");
    expect(prompt).toBeDefined();
    expect(prompt!.name).toBe("deploy_http_loadbalancer");
  });

  it("should return undefined for unknown prompt", () => {
    const prompt = getWorkflowPrompt("nonexistent-prompt");
    expect(prompt).toBeUndefined();
  });

  it("should find upstream workflow prompts", () => {
    // Check for known upstream workflow IDs
    const upstreamWorkflows = [
      "deploy_http_loadbalancer",
      "deploy_https_loadbalancer",
      "enable_waf_protection",
      "configure_origin_pool",
      "configure_dns_zone",
    ];

    for (const name of upstreamWorkflows) {
      const prompt = getWorkflowPrompt(name);
      expect(prompt).toBeDefined();
      expect(prompt!.name).toBe(name);
    }
  });
});

describe("processPromptTemplate", () => {
  describe("simple variable replacement", () => {
    it("should replace single variable", () => {
      const template = "Hello {{name}}!";
      const result = processPromptTemplate(template, { name: "World" });
      expect(result).toBe("Hello World!");
    });

    it("should replace multiple variables", () => {
      const template = "Deploy {{name}} in {{namespace}}";
      const result = processPromptTemplate(template, {
        name: "example-lb",
        namespace: "production",
      });
      expect(result).toBe("Deploy example-lb in production");
    });

    it("should replace multiple occurrences of same variable", () => {
      const template = "{{name}} is deployed as {{name}}-origin-pool";
      const result = processPromptTemplate(template, { name: "example-app" });
      expect(result).toBe("example-app is deployed as example-app-origin-pool");
    });

    it("should replace with empty string if value is undefined", () => {
      const template = "Value: {{value}}";
      const result = processPromptTemplate(template, {});
      expect(result).toBe("Value: {{value}}");
    });
  });

  describe("conditional blocks", () => {
    it("should include content when variable is truthy", () => {
      const template = "Start{{#if enable}} - Enabled{{/if}}End";
      const result = processPromptTemplate(template, { enable: "true" });
      expect(result).toBe("Start - EnabledEnd");
    });

    it("should exclude content when variable is falsy", () => {
      const template = "Start{{#if enable}} - Enabled{{/if}}End";
      const result = processPromptTemplate(template, { enable: "" });
      expect(result).toBe("StartEnd");
    });

    it("should exclude content when variable is missing", () => {
      const template = "Start{{#if enable}} - Enabled{{/if}}End";
      const result = processPromptTemplate(template, {});
      expect(result).toBe("StartEnd");
    });

    it("should exclude content when variable is 'false' string", () => {
      const template = "Start{{#if enable}} - Enabled{{/if}}End";
      const result = processPromptTemplate(template, { enable: "false" });
      expect(result).toBe("StartEnd");
    });

    it("should handle nested variables in conditional", () => {
      const template = "{{#if waf}}WAF: {{waf_name}}{{/if}}";
      const result = processPromptTemplate(template, {
        waf: "enabled",
        waf_name: "example-waf",
      });
      expect(result).toBe("WAF: example-waf");
    });
  });

  describe("equality conditionals", () => {
    it("should include content when equality matches", () => {
      const template = '{{#if (eq cloud "aws")}}AWS Config{{/if}}';
      const result = processPromptTemplate(template, { cloud: "aws" });
      expect(result).toBe("AWS Config");
    });

    it("should exclude content when equality does not match", () => {
      const template = '{{#if (eq cloud "aws")}}AWS Config{{/if}}';
      const result = processPromptTemplate(template, { cloud: "azure" });
      expect(result).toBe("");
    });

    it("should handle multiple equality conditionals", () => {
      const template = `
{{#if (eq cloud "aws")}}AWS{{/if}}
{{#if (eq cloud "azure")}}Azure{{/if}}
{{#if (eq cloud "gcp")}}GCP{{/if}}`;

      const awsResult = processPromptTemplate(template, { cloud: "aws" });
      expect(awsResult).toContain("AWS");
      expect(awsResult).not.toContain("Azure");
      expect(awsResult).not.toContain("GCP");

      const azureResult = processPromptTemplate(template, { cloud: "azure" });
      expect(azureResult).not.toContain("AWS");
      expect(azureResult).toContain("Azure");
      expect(azureResult).not.toContain("GCP");
    });
  });

  describe("complex templates", () => {
    it("should process workflow template with variables", () => {
      const prompt = getWorkflowPrompt("deploy_http_loadbalancer");
      expect(prompt).toBeDefined();

      // Ensure template contains expected structure
      const template = prompt!.template;
      expect(template).toBeTruthy();
      expect(template.length).toBeGreaterThan(100);
    });

    it("should have step-by-step structure in templates", () => {
      const prompt = getWorkflowPrompt("deploy_http_loadbalancer");
      expect(prompt).toBeDefined();

      // Upstream templates should have step markers
      const template = prompt!.template;
      expect(template).toContain("Step");
    });
  });
});
