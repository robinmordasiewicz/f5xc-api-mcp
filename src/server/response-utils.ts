// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Response Utilities
 *
 * Shared utilities for formatting MCP tool and prompt responses.
 * Extracted from server.ts to reduce duplication and improve maintainability.
 */

import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

/**
 * Creates a standardized text response for MCP tools.
 * Wraps data in the expected MCP response format with JSON serialization.
 *
 * @param data - The data to serialize and return
 * @returns MCP-compatible CallToolResult
 */
export function createTextResponse(data: unknown): CallToolResult {
  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}

/**
 * Creates an error response for MCP tools.
 * Includes the error message and an optional hint for resolution.
 *
 * @param error - The error message or Error object
 * @param hint - Optional hint for resolving the error
 * @returns MCP-compatible CallToolResult with isError flag
 */
export function createErrorResponse(error: string | Error, hint?: string): CallToolResult {
  const errorMessage = error instanceof Error ? error.message : error;

  const errorPayload: { error: string; hint?: string } = {
    error: errorMessage,
  };

  if (hint) {
    errorPayload.hint = hint;
  }

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(errorPayload, null, 2),
      },
    ],
    isError: true,
  };
}

/**
 * Extracts string arguments from a record, handling type coercion.
 * Used for processing prompt and tool arguments.
 *
 * @param args - Record of arguments that may contain non-string values
 * @returns Record with all values converted to strings
 */
export function extractStringArguments(
  args: Record<string, unknown> | undefined
): Record<string, string> {
  if (!args) {
    return {};
  }

  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(args)) {
    if (value !== undefined && value !== null) {
      result[key] = String(value);
    }
  }
  return result;
}
