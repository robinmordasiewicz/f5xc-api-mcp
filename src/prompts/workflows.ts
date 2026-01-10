// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * MCP Workflow Prompts
 *
 * Provides guided workflows for common F5XC operations.
 * Workflows are now sourced from upstream x-f5xc-guided-workflows (v2.0.8+).
 */

import {
  getGuidedWorkflows,
  getGuidedWorkflowById,
  type GuidedWorkflow,
} from "../generator/domain-metadata.js";

/**
 * Workflow prompt definition
 */
export interface WorkflowPrompt {
  /** Unique prompt identifier */
  name: string;
  /** Human-readable description */
  description: string;
  /** Prompt arguments */
  arguments: WorkflowArgument[];
  /** Prompt template */
  template: string;
}

/**
 * Workflow argument
 */
export interface WorkflowArgument {
  /** Argument name */
  name: string;
  /** Argument description */
  description: string;
  /** Whether argument is required */
  required: boolean;
}

/**
 * Convert upstream GuidedWorkflow to WorkflowPrompt format
 */
function convertToWorkflowPrompt(workflow: GuidedWorkflow): WorkflowPrompt {
  // Generate template from workflow steps
  const steps = workflow.steps
    .map((step) => {
      let content = `### Step ${step.order}: ${step.name}\n\n`;
      content += `${step.description}\n`;

      if (step.resource) {
        content += `\nUse the **f5xc-api-${workflow.domain}-${step.resource}-${step.action}** tool.\n`;
      }

      if (step.tips && step.tips.length > 0) {
        content += `\n**Tips:**\n`;
        for (const tip of step.tips) {
          content += `- ${tip}\n`;
        }
      }

      if (step.verification && step.verification.length > 0) {
        content += `\n**Verification:**\n`;
        for (const v of step.verification) {
          content += `- ${v}\n`;
        }
      }

      return content;
    })
    .join("\n");

  // Build prerequisites section
  let prereqs = "";
  if (workflow.prerequisites && workflow.prerequisites.length > 0) {
    prereqs = `## Prerequisites\n${workflow.prerequisites.map((p) => `- ${p}`).join("\n")}\n\n`;
  }

  // Build full template
  const template = `# ${workflow.name}

${workflow.description}

${prereqs}## Steps

${steps}
## Summary

Workflow complexity: **${workflow.complexity}**
Estimated steps: ${workflow.estimatedSteps}
`;

  // Extract arguments from required fields in steps
  const argumentSet = new Map<string, WorkflowArgument>();
  argumentSet.set("namespace", {
    name: "namespace",
    description: "Namespace for the resources",
    required: true,
  });
  argumentSet.set("name", {
    name: "name",
    description: "Name prefix for resources",
    required: true,
  });

  for (const step of workflow.steps) {
    if (step.requiredFields) {
      for (const field of step.requiredFields) {
        if (!argumentSet.has(field)) {
          argumentSet.set(field, {
            name: field,
            description: `${field.replace(/_/g, " ")} for the operation`,
            required: true,
          });
        }
      }
    }
  }

  return {
    name: workflow.id,
    description: workflow.description,
    arguments: Array.from(argumentSet.values()),
    template,
  };
}

// Cache for generated workflow prompts
let cachedWorkflowPrompts: WorkflowPrompt[] | null = null;

/**
 * Get all workflow prompts from upstream data
 */
function loadWorkflowPrompts(): WorkflowPrompt[] {
  if (cachedWorkflowPrompts) {
    return cachedWorkflowPrompts;
  }

  const upstreamWorkflows = getGuidedWorkflows();
  cachedWorkflowPrompts = upstreamWorkflows.map(convertToWorkflowPrompt);
  return cachedWorkflowPrompts;
}

/**
 * All workflow prompts (dynamically generated from upstream)
 */
export function getWorkflowPrompts(): WorkflowPrompt[] {
  return loadWorkflowPrompts();
}

/**
 * Get workflow prompt by name/ID
 */
export function getWorkflowPrompt(name: string): WorkflowPrompt | undefined {
  // First check upstream by ID
  const upstream = getGuidedWorkflowById(name);
  if (upstream) {
    return convertToWorkflowPrompt(upstream);
  }

  // Fall back to searching all prompts by name
  const prompts = loadWorkflowPrompts();
  return prompts.find((p) => p.name === name);
}

/**
 * Process prompt template with arguments
 */
export function processPromptTemplate(template: string, args: Record<string, string>): string {
  let result = template;

  // Replace simple {{variable}} placeholders
  for (const [key, value] of Object.entries(args)) {
    const pattern = new RegExp(`\\{\\{${key}\\}\\}`, "g");
    result = result.replace(pattern, value ?? "");
  }

  // Handle {{#if variable}} ... {{/if}} blocks
  const ifPattern = /\{\{#if\s+(\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g;
  result = result.replace(ifPattern, (_, varName: string, content: string) => {
    const value = args[varName];
    return value && value !== "false" ? content : "";
  });

  // Handle {{#if (eq var "value")}} ... {{/if}} blocks
  const eqPattern = /\{\{#if\s+\(eq\s+(\w+)\s+"([^"]+)"\)\}\}([\s\S]*?)\{\{\/if\}\}/g;
  result = result.replace(eqPattern, (_, varName: string, expected: string, content: string) => {
    return args[varName] === expected ? content : "";
  });

  return result;
}

/**
 * Clear cached workflow prompts (useful for testing)
 */
export function clearWorkflowCache(): void {
  cachedWorkflowPrompts = null;
}
