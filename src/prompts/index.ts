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
  generateTerraformPrompt,
} from "./workflows.js";

export type { WorkflowPrompt, WorkflowArgument } from "./workflows.js";
