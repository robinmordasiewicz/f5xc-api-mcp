// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Handler Exports
 *
 * Central export point for all MCP handlers.
 */

export { registerPrompts } from "./prompt-handler.js";
export { registerResources, type ResourceRegistrationContext } from "./resource-handler.js";
export {
  registerTools,
  type ToolRegistrationContext,
  registerMetadataTools,
  registerDiscoveryTools,
  registerExecutionTools,
  registerAnalysisTools,
  registerPlanningTools,
  registerGuidanceTools,
} from "./tool-handlers/index.js";
