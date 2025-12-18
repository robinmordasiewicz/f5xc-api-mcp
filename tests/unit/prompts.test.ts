/**
 * Unit tests for prompts module
 */

import { describe, it, expect } from "vitest";
import {
  WORKFLOW_PROMPTS,
  getWorkflowPrompt,
  processPromptTemplate,
  deployHttpLoadBalancerPrompt,
  configureWafPrompt,
  createMultiCloudSitePrompt,
  generateTerraformPrompt,
} from "../../src/prompts/workflows.js";

describe("Workflow Prompts", () => {
  describe("WORKFLOW_PROMPTS array", () => {
    it("should contain all defined prompts", () => {
      expect(WORKFLOW_PROMPTS).toHaveLength(4);
    });

    it("should include deploy-http-loadbalancer prompt", () => {
      const prompt = WORKFLOW_PROMPTS.find((p) => p.name === "deploy-http-loadbalancer");
      expect(prompt).toBeDefined();
    });

    it("should include configure-waf prompt", () => {
      const prompt = WORKFLOW_PROMPTS.find((p) => p.name === "configure-waf");
      expect(prompt).toBeDefined();
    });

    it("should include create-multicloud-site prompt", () => {
      const prompt = WORKFLOW_PROMPTS.find((p) => p.name === "create-multicloud-site");
      expect(prompt).toBeDefined();
    });

    it("should include generate-terraform prompt", () => {
      const prompt = WORKFLOW_PROMPTS.find((p) => p.name === "generate-terraform");
      expect(prompt).toBeDefined();
    });
  });

  describe("deployHttpLoadBalancerPrompt", () => {
    it("should have correct name", () => {
      expect(deployHttpLoadBalancerPrompt.name).toBe("deploy-http-loadbalancer");
    });

    it("should have description", () => {
      expect(deployHttpLoadBalancerPrompt.description).toBeTruthy();
      expect(deployHttpLoadBalancerPrompt.description).toContain("HTTP Load Balancer");
    });

    it("should have required arguments", () => {
      const args = deployHttpLoadBalancerPrompt.arguments;
      const required = args.filter((a) => a.required);

      expect(required.map((a) => a.name)).toContain("namespace");
      expect(required.map((a) => a.name)).toContain("name");
      expect(required.map((a) => a.name)).toContain("domain");
      expect(required.map((a) => a.name)).toContain("backend_ip");
    });

    it("should have optional arguments", () => {
      const args = deployHttpLoadBalancerPrompt.arguments;
      const optional = args.filter((a) => !a.required);

      expect(optional.map((a) => a.name)).toContain("backend_port");
      expect(optional.map((a) => a.name)).toContain("enable_waf");
    });

    it("should have template with f5xcctl commands", () => {
      expect(deployHttpLoadBalancerPrompt.template).toContain("f5xcctl");
    });

    it("should have template with Terraform examples", () => {
      expect(deployHttpLoadBalancerPrompt.template).toContain("Terraform:");
      expect(deployHttpLoadBalancerPrompt.template).toContain("volterra_");
    });
  });

  describe("configureWafPrompt", () => {
    it("should have correct name", () => {
      expect(configureWafPrompt.name).toBe("configure-waf");
    });

    it("should have required arguments", () => {
      const required = configureWafPrompt.arguments.filter((a) => a.required);
      expect(required.map((a) => a.name)).toContain("namespace");
      expect(required.map((a) => a.name)).toContain("name");
      expect(required.map((a) => a.name)).toContain("loadbalancer");
    });

    it("should reference app_firewall resource", () => {
      expect(configureWafPrompt.template).toContain("app_firewall");
    });
  });

  describe("createMultiCloudSitePrompt", () => {
    it("should have correct name", () => {
      expect(createMultiCloudSitePrompt.name).toBe("create-multicloud-site");
    });

    it("should have cloud argument", () => {
      const cloudArg = createMultiCloudSitePrompt.arguments.find((a) => a.name === "cloud");
      expect(cloudArg).toBeDefined();
      expect(cloudArg!.required).toBe(true);
    });

    it("should have templates for all cloud providers", () => {
      const template = createMultiCloudSitePrompt.template;
      expect(template).toContain("aws_vpc_site");
      expect(template).toContain("azure_vnet_site");
      expect(template).toContain("gcp_vpc_site");
    });
  });

  describe("generateTerraformPrompt", () => {
    it("should have correct name", () => {
      expect(generateTerraformPrompt.name).toBe("generate-terraform");
    });

    it("should have namespace as required", () => {
      const nsArg = generateTerraformPrompt.arguments.find((a) => a.name === "namespace");
      expect(nsArg).toBeDefined();
      expect(nsArg!.required).toBe(true);
    });

    it("should have optional resource_type and name", () => {
      const args = generateTerraformPrompt.arguments;
      expect(args.find((a) => a.name === "resource_type")?.required).toBe(false);
      expect(args.find((a) => a.name === "name")?.required).toBe(false);
    });
  });
});

describe("getWorkflowPrompt", () => {
  it("should return prompt by name", () => {
    const prompt = getWorkflowPrompt("deploy-http-loadbalancer");
    expect(prompt).toBeDefined();
    expect(prompt!.name).toBe("deploy-http-loadbalancer");
  });

  it("should return undefined for unknown prompt", () => {
    const prompt = getWorkflowPrompt("nonexistent-prompt");
    expect(prompt).toBeUndefined();
  });

  it("should find all defined prompts", () => {
    const names = [
      "deploy-http-loadbalancer",
      "configure-waf",
      "create-multicloud-site",
      "generate-terraform",
    ];

    for (const name of names) {
      expect(getWorkflowPrompt(name)).toBeDefined();
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
    it("should process HTTP load balancer template", () => {
      const result = processPromptTemplate(deployHttpLoadBalancerPrompt.template, {
        namespace: "production",
        name: "example-app",
        domain: "app.example.com",
        backend_ip: "10.0.0.1",
        backend_port: "8080",
        enable_waf: "true",
      });

      expect(result).toContain("production");
      expect(result).toContain("example-app");
      expect(result).toContain("app.example.com");
      expect(result).toContain("10.0.0.1");
      expect(result).toContain("8080");
      expect(result).toContain("app_firewall");
    });

    it("should process multicloud site template for AWS", () => {
      const result = processPromptTemplate(createMultiCloudSitePrompt.template, {
        namespace: "infra",
        name: "us-site",
        cloud: "aws",
        region: "us-east-1",
        vpc_id: "vpc-123456",
      });

      expect(result).toContain("us-site");
      expect(result).toContain("aws_vpc_site");
      expect(result).toContain("us-east-1");
      expect(result).toContain("vpc-123456");
    });
  });
});
