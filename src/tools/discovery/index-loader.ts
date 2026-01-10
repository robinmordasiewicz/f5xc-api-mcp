// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Tool Index Loader
 *
 * Loads and caches the lightweight tool index for discovery.
 * Generates the index from existing tool registry on first load.
 * Enriches entries with domain metadata from upstream specs.
 */

import type { ToolIndex, ToolIndexEntry, ToolIndexMetadata } from "./types.js";
import { allTools } from "../registry.js";
import { getDomainMetadata, getResourceMetadata } from "../../generator/domain-metadata.js";

// Cached index for performance
let cachedIndex: ToolIndex | null = null;

/**
 * Generate tool index from the existing tool registry
 * Enriches each entry with domain and resource metadata from upstream specs (v1.0.84+)
 */
function generateIndex(): ToolIndex {
  const tools: ToolIndexEntry[] = allTools.map((tool) => {
    const domainMeta = getDomainMetadata(tool.domain);

    // Get resource-level metadata (v1.0.84+)
    const normalizedResource = tool.resource.replace(/-/g, "_");
    const resourceMeta = getResourceMetadata(normalizedResource);

    return {
      name: tool.toolName,
      domain: tool.domain,
      resource: tool.resource,
      operation: tool.operation,
      summary: tool.summary,
      dangerLevel: tool.dangerLevel ?? "low",
      // Note: isDeprecated not yet extracted from x-ves-deprecated in parser
      isDeprecated: false,
      // Domain metadata from upstream specs
      domainCategory: domainMeta?.domainCategory ?? null,
      uiCategory: domainMeta?.uiCategory ?? null,
      // Resource-level metadata from upstream specs (v1.0.84+)
      resourceIcon: resourceMeta?.icon ?? null,
      resourceCategory: resourceMeta?.category ?? null,
      supportsLogs: resourceMeta?.supportsLogs ?? false,
      supportsMetrics: resourceMeta?.supportsMetrics ?? false,
      resourceTier: resourceMeta?.tier ?? null,
      // Discovery metadata from live API exploration (v2.0.5+)
      discoveryResponseTimeMs: tool.discoveryMetadata?.responseTimeMs,
    };
  });

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
