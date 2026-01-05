/**
 * Prompts Module - Export all prompt utilities
 */

export {
  WORKFLOW_PROMPTS,
  getWorkflowPrompts,
  getWorkflowPrompt,
  processPromptTemplate,
  clearWorkflowCache,
} from "./workflows.js";

export type { WorkflowPrompt, WorkflowArgument } from "./workflows.js";

// Phase B: Error resolution prompts (now sourced from upstream)
export {
  ERROR_PROMPTS,
  getErrorPrompts,
  getErrorPrompt,
  getErrorPromptByName,
  processErrorTemplate,
  clearErrorCache,
} from "./error-resolution.js";

export type { ErrorPrompt, ErrorPromptArgument } from "./error-resolution.js";
