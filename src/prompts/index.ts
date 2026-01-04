/**
 * Prompts Module - Export all prompt utilities
 */

export {
  WORKFLOW_PROMPTS,
  getWorkflowPrompt,
  processPromptTemplate,
  deployHttpLoadBalancerPrompt,
  configureWafPrompt,
  createMultiCloudSitePrompt,
} from "./workflows.js";

export type { WorkflowPrompt, WorkflowArgument } from "./workflows.js";

// Phase B: Error resolution prompts
export {
  ERROR_PROMPTS,
  getErrorPrompt,
  getErrorPromptByName,
  processErrorTemplate,
  error401Prompt,
  error403Prompt,
  error404Prompt,
  error409Prompt,
  error500Prompt,
} from "./error-resolution.js";

export type { ErrorPrompt, ErrorPromptArgument } from "./error-resolution.js";
