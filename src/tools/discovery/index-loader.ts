/**
 * Tool Index Loader
 *
 * Loads and caches the lightweight tool index for discovery.
 * Generates the index from existing tool registry on first load.
 */

import type { ToolIndex, ToolIndexEntry, ToolIndexMetadata } from "./types.js";
import { allTools } from "../registry.js";

// Cached index for performance
let cachedIndex: ToolIndex | null = null;

/**
 * Generate tool index from the existing tool registry
 */
function generateIndex(): ToolIndex {
  const tools: ToolIndexEntry[] = allTools.map((tool) => ({
    name: tool.toolName,
    domain: tool.domain,
    resource: tool.resource,
    operation: tool.operation,
    summary: tool.summary,
  }));

  // Calculate domain counts
  const domains: Record<string, number> = {};
  for (const tool of tools) {
    domains[tool.domain] = (domains[tool.domain] ?? 0) + 1;
  }

  const metadata: ToolIndexMetadata = {
    totalTools: tools.length,
    domains,
    generatedAt: new Date().toISOString(),
    version: "1.0.0",
  };

  return { metadata, tools };
}

/**
 * Get the tool index (generates on first call, cached thereafter)
 */
export function getToolIndex(): ToolIndex {
  if (!cachedIndex) {
    cachedIndex = generateIndex();
  }
  return cachedIndex;
}

/**
 * Clear the cached index (useful for testing or refresh)
 */
export function clearIndexCache(): void {
  cachedIndex = null;
}

/**
 * Get index metadata without loading full index
 */
export function getIndexMetadata(): ToolIndexMetadata {
  return getToolIndex().metadata;
}

/**
 * Check if a tool exists by name
 */
export function toolExists(toolName: string): boolean {
  const index = getToolIndex();
  return index.tools.some((t) => t.name === toolName);
}

/**
 * Get a single tool entry by name
 */
export function getToolEntry(toolName: string): ToolIndexEntry | undefined {
  const index = getToolIndex();
  return index.tools.find((t) => t.name === toolName);
}
