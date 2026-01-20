// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Tool Handler Orchestrator
 *
 * Central orchestration for all tool registrations.
 * Combines metadata, discovery, execution, analysis, planning, and guidance tools.
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { AuthMode, type CredentialManager } from "@robinmordasiewicz/f5xc-auth";
import { logger } from "../../../utils/logging.js";
import { getIndexMetadata, getConsolidationStats } from "../../../tools/discovery/index.js";

import { registerMetadataTools } from "./metadata.js";
import { registerDiscoveryTools } from "./discovery.js";
import { registerExecutionTools } from "./execution.js";
import { registerAnalysisTools } from "./analysis.js";
import { registerPlanningTools } from "./planning.js";
import { registerGuidanceTools } from "./guidance.js";
import { registerQuotaTools } from "./quota.js";

/**
 * Context for tool registration containing necessary dependencies.
 */
export interface ToolRegistrationContext {
  credentialManager: CredentialManager;
}

/**
 * Registers all MCP tools for F5XC API operations.
 *
 * Uses the dynamic discovery pattern for token efficiency:
 * - 14 meta-tools instead of 1,400+ individual tools
 * - Reduces upfront token consumption from ~535K to ~500 tokens
 * - Full tool schemas loaded on-demand via describe_tool
 *
 * @param server - The MCP server instance
 * @param context - Context containing credential manager
 */
export function registerTools(server: McpServer, context: ToolRegistrationContext): void {
  const { credentialManager } = context;
  const authMode = credentialManager.getAuthMode();

  // Register all tool categories
  registerMetadataTools(server, credentialManager);
  registerDiscoveryTools(server);
  registerExecutionTools(server, credentialManager);
  registerAnalysisTools(server);
  registerPlanningTools(server);
  registerGuidanceTools(server);
  registerQuotaTools(server, credentialManager);

  // Log registration completion
  const indexMetadata = getIndexMetadata();
  const consolidationStats = getConsolidationStats();
  logger.info("Tool registration completed (dynamic discovery mode)", {
    authMode,
    authenticated: authMode !== AuthMode.NONE,
    registeredTools: 17, // Updated: 14 + 3 quota tools
    indexedTools: indexMetadata.totalTools,
    consolidatedResources: consolidationStats.consolidatedCount,
    consolidationReduction: consolidationStats.reductionPercent,
    domains: Object.keys(indexMetadata.domains),
    tokenSavings: "95%+ (535K → ~500 tokens upfront)",
  });
}

// Re-export individual registration functions for testing and selective use
export { registerMetadataTools } from "./metadata.js";
export { registerDiscoveryTools } from "./discovery.js";
export { registerExecutionTools } from "./execution.js";
export { registerAnalysisTools } from "./analysis.js";
export { registerPlanningTools } from "./planning.js";
export { registerGuidanceTools } from "./guidance.js";
export { registerQuotaTools } from "./quota.js";
