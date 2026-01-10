// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Prompts Module - Export all prompt utilities
 */

export {
  getWorkflowPrompts,
  getWorkflowPrompt,
  processPromptTemplate,
  clearWorkflowCache,
} from "./workflows.js";

export type { WorkflowPrompt, WorkflowArgument } from "./workflows.js";

// Phase B: Error resolution prompts (now sourced from upstream)
export {
  getErrorPrompts,
  getErrorPrompt,
  getErrorPromptByName,
  processErrorTemplate,
  clearErrorCache,
} from "./error-resolution.js";

export type { ErrorPrompt, ErrorPromptArgument } from "./error-resolution.js";
