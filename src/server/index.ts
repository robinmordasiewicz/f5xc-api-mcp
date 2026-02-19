// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Server Module Exports
 *
 * Re-exports for modular access.
 */

// Types
export type { ServerConfig, ToolHandlerContext, RegisterToolsFunction } from "./types.js";

// Response utilities
export {
  createTextResponse,
  createErrorResponse,
  extractStringArguments,
} from "./response-utils.js";

// Handlers
export {
  registerPrompts,
  registerResources,
  registerTools,
  type ResourceRegistrationContext,
  type ToolRegistrationContext,
} from "./handlers/index.js";
