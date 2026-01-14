// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Prompt Handler
 *
 * Handles registration of MCP prompts including workflow prompts
 * and error resolution prompts. Extracted from server.ts.
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  getWorkflowPrompts,
  processPromptTemplate,
  getErrorPrompts,
  processErrorTemplate,
} from "../../prompts/index.js";
import { logger } from "../../utils/logging.js";

/**
 * Builds a Zod schema from prompt argument definitions.
 *
 * @param args - Array of argument definitions
 * @returns Record of Zod schemas for each argument
 */
function buildArgumentSchema(
  args: Array<{ name: string; description: string; required: boolean }>
): Record<string, z.ZodTypeAny> {
  const schema: Record<string, z.ZodTypeAny> = {};
  for (const arg of args) {
    schema[arg.name] = arg.required
      ? z.string().describe(arg.description)
      : z.string().optional().describe(arg.description);
  }
  return schema;
}

/**
 * Extracts string arguments from a record, handling type coercion.
 *
 * @param args - Record of arguments that may contain non-string values
 * @returns Record with only string values
 */
function extractStringArgs(args: Record<string, unknown>): Record<string, string> {
  const processedArgs: Record<string, string> = {};
  for (const [key, value] of Object.entries(args)) {
    if (typeof value === "string") {
      processedArgs[key] = value;
    }
  }
  return processedArgs;
}

/**
 * Applies default values for optional workflow arguments.
 *
 * @param processedArgs - Already processed arguments
 * @param workflowArgs - Workflow argument definitions
 */
function applyDefaultValues(
  processedArgs: Record<string, string>,
  workflowArgs: Array<{ name: string; required: boolean }>
): void {
  for (const arg of workflowArgs) {
    if (!processedArgs[arg.name] && !arg.required) {
      // Set sensible defaults
      if (arg.name === "backend_port") processedArgs[arg.name] = "80";
      if (arg.name === "enable_waf") processedArgs[arg.name] = "false";
      if (arg.name === "mode") processedArgs[arg.name] = "blocking";
    }
  }
}

/**
 * Registers all workflow prompts with the MCP server.
 *
 * @param server - The MCP server instance
 */
function registerWorkflowPrompts(server: McpServer): number {
  const workflowPrompts = getWorkflowPrompts();

  for (const workflow of workflowPrompts) {
    const argSchema = buildArgumentSchema(workflow.arguments);

    server.prompt(workflow.name, workflow.description, argSchema, async (args) => {
      const processedArgs = extractStringArgs(args as Record<string, unknown>);
      applyDefaultValues(processedArgs, workflow.arguments);

      const processedTemplate = processPromptTemplate(workflow.template, processedArgs);

      return {
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: processedTemplate,
            },
          },
        ],
      };
    });
  }

  return workflowPrompts.length;
}

/**
 * Registers all error resolution prompts with the MCP server.
 *
 * @param server - The MCP server instance
 */
function registerErrorPrompts(server: McpServer): number {
  const errorPrompts = getErrorPrompts();

  for (const errorPrompt of errorPrompts) {
    const argSchema = buildArgumentSchema(errorPrompt.arguments);

    server.prompt(errorPrompt.name, errorPrompt.description, argSchema, async (args) => {
      const processedArgs = extractStringArgs(args as Record<string, unknown>);
      const processedTemplate = processErrorTemplate(errorPrompt, processedArgs);

      return {
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: processedTemplate,
            },
          },
        ],
      };
    });
  }

  return errorPrompts.length;
}

/**
 * Registers all prompts with the MCP server.
 * This includes workflow prompts and error resolution prompts.
 *
 * @param server - The MCP server instance
 */
export function registerPrompts(server: McpServer): void {
  const workflowCount = registerWorkflowPrompts(server);
  const errorCount = registerErrorPrompts(server);

  logger.info("Prompt registration completed", {
    workflows: workflowCount,
    errorPrompts: errorCount,
  });
}
