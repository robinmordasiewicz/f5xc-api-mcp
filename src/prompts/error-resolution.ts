// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Error Resolution Prompts (Phase B)
 *
 * Provides guided diagnosis and resolution workflows for common
 * F5XC API errors. Prompts are now sourced from upstream x-f5xc-error-resolution (v2.0.8+).
 */

import {
  getHttpErrorResolution,
  getAllHttpErrorCodes,
  type HttpErrorResolution,
  type ErrorDiagnosticStep,
} from "../generator/domain-metadata.js";

/**
 * Error resolution prompt definition
 */
export interface ErrorPrompt {
  /** HTTP status code */
  code: number;
  /** Error type name */
  name: string;
  /** Human-readable description */
  description: string;
  /** Prompt arguments */
  arguments: ErrorPromptArgument[];
  /** Prompt template */
  template: string;
}

/**
 * Error prompt argument
 */
export interface ErrorPromptArgument {
  /** Argument name */
  name: string;
  /** Argument description */
  description: string;
  /** Whether argument is required */
  required: boolean;
}

/**
 * Convert upstream HttpErrorResolution to ErrorPrompt format
 */
function convertToErrorPrompt(error: HttpErrorResolution): ErrorPrompt {
  // Build template from upstream data
  const causesList = error.commonCauses.map((cause, i) => `${i + 1}. ${cause}`).join("\n");

  const stepsList = error.diagnosticSteps
    .map((step: ErrorDiagnosticStep) => {
      let content = `### Step ${step.step}: ${step.action}\n`;
      content += `${step.description}\n`;
      if (step.command) {
        content += `\n\`\`\`\n${step.command}\n\`\`\`\n`;
      }
      return content;
    })
    .join("\n");

  const preventionList = error.prevention.map((p) => `- ${p}`).join("\n");

  const relatedList =
    error.relatedErrors.length > 0
      ? `\n## Related Errors\n${error.relatedErrors.map((e) => `- ${e}`).join("\n")}`
      : "";

  const template = `# ${error.code} ${error.name} - Resolution Guide

${error.description}

## Common Causes
${causesList}

## Diagnosis Steps

${stepsList}
## Prevention
${preventionList}
${relatedList}
## Resolution Checklist
- [ ] Review error details and context
- [ ] Follow diagnostic steps systematically
- [ ] Apply appropriate resolution
- [ ] Verify operation succeeds after fix
`;

  // Standard arguments for error prompts
  const args: ErrorPromptArgument[] = [
    {
      name: "operation",
      description: "The API operation that failed",
      required: false,
    },
    {
      name: "error_message",
      description: "The specific error message received",
      required: false,
    },
  ];

  // Add context-specific arguments based on error type
  if (error.code === 403 || error.code === 404) {
    args.push({
      name: "namespace",
      description: "The namespace being accessed",
      required: false,
    });
    args.push({
      name: "resource_type",
      description: "The type of resource being accessed",
      required: false,
    });
  }

  if (error.code === 409) {
    args.push({
      name: "resource_name",
      description: "The name of the conflicting resource",
      required: false,
    });
  }

  return {
    code: error.code,
    name: `resolve-${error.code}-${error.name.toLowerCase().replace(/\s+/g, "-")}`,
    description: `Diagnose and resolve ${error.name} errors (${error.code})`,
    arguments: args,
    template,
  };
}

// Cache for generated error prompts
let cachedErrorPrompts: ErrorPrompt[] | null = null;

/**
 * Load error prompts from upstream data
 */
function loadErrorPrompts(): ErrorPrompt[] {
  if (cachedErrorPrompts) {
    return cachedErrorPrompts;
  }

  const codes = getAllHttpErrorCodes();
  cachedErrorPrompts = codes
    .map((code) => {
      const resolution = getHttpErrorResolution(code);
      return resolution ? convertToErrorPrompt(resolution) : null;
    })
    .filter((p): p is ErrorPrompt => p !== null);

  return cachedErrorPrompts;
}

/**
 * Get all error prompts (dynamically generated from upstream)
 */
export function getErrorPrompts(): ErrorPrompt[] {
  return loadErrorPrompts();
}

/**
 * Get error prompt by HTTP status code
 */
export function getErrorPrompt(code: number): ErrorPrompt | undefined {
  const resolution = getHttpErrorResolution(code);
  if (resolution) {
    return convertToErrorPrompt(resolution);
  }

  // Fall back to searching all prompts
  const prompts = loadErrorPrompts();
  return prompts.find((p) => p.code === code);
}

/**
 * Get error prompt by name
 */
export function getErrorPromptByName(name: string): ErrorPrompt | undefined {
  const prompts = loadErrorPrompts();
  return prompts.find((p) => p.name === name);
}

/**
 * Process error prompt template with arguments
 */
export function processErrorTemplate(prompt: ErrorPrompt, args: Record<string, string>): string {
  let processed = prompt.template;

  for (const [key, value] of Object.entries(args)) {
    const placeholder = new RegExp(`\\{\\{${key}\\}\\}`, "g");
    processed = processed.replace(placeholder, value || `[${key}]`);
  }

  return processed;
}

/**
 * Clear cached error prompts (useful for testing)
 */
export function clearErrorCache(): void {
  cachedErrorPrompts = null;
}
