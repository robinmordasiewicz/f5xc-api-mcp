/**
 * Resource Consolidation Module
 *
 * Provides a resource-centric view of tools by grouping CRUD operations.
 * This reduces cognitive load for LLMs by presenting one tool per resource
 * instead of 5 separate CRUD tools.
 *
 * Example:
 *   Before: f5xc-api-waap-http-loadbalancer-{create,get,list,update,delete}
 *   After:  f5xc-api-waap-http-loadbalancer (with operation parameter)
 */

import type { ToolIndexEntry } from "./types.js";
import { getToolIndex } from "./index-loader.js";

/**
 * CRUD operation types supported by consolidated resources
 */
export type CrudOperation = "create" | "get" | "list" | "update" | "delete";

/**
 * Consolidated resource entry representing a group of CRUD tools
 */
export interface ConsolidatedResource {
  /** Resource identifier (e.g., "f5xc-api-waap-http-loadbalancer") */
  name: string;
  /** Domain category */
  domain: string;
  /** Resource type */
  resource: string;
  /** Available CRUD operations */
  operations: CrudOperation[];
  /** Combined summary */
  summary: string;
  /** Original tool names mapped by operation */
  toolMap: Record<CrudOperation, string>;
  /** Whether this is a full CRUD resource (has all 5 operations) */
  isFullCrud: boolean;
}

/**
 * Consolidated index with resource-centric view
 */
export interface ConsolidatedIndex {
  /** Total consolidated resources */
  totalResources: number;
  /** Full CRUD resources (all 5 operations) */
  fullCrudResources: number;
  /** Partial resources (fewer operations) */
  partialResources: number;
  /** Standalone tools (non-CRUD) */
  standaloneTools: number;
  /** All consolidated resources */
  resources: ConsolidatedResource[];
  /** Standalone tools that don't fit CRUD pattern */
  standalone: ToolIndexEntry[];
}

// Cache for consolidated index
let consolidatedCache: ConsolidatedIndex | null = null;

/**
 * Standard CRUD operations
 */
const CRUD_OPERATIONS: CrudOperation[] = ["create", "get", "list", "update", "delete"];

/**
 * Generate consolidated resource name from tool name
 */
function getResourceKey(tool: ToolIndexEntry): string {
  return `${tool.domain}/${tool.resource}`;
}

/**
 * Generate consolidated tool name from domain and resource
 */
function getConsolidatedName(domain: string, resource: string): string {
  return `f5xc-api-${domain}-${resource}`;
}

/**
 * Build consolidated index from tool index
 */
export function getConsolidatedIndex(): ConsolidatedIndex {
  if (consolidatedCache) {
    return consolidatedCache;
  }

  const toolIndex = getToolIndex();
  const resourceMap = new Map<string, Map<CrudOperation, ToolIndexEntry>>();
  const standalone: ToolIndexEntry[] = [];

  // Group tools by resource
  for (const tool of toolIndex.tools) {
    const op = tool.operation as CrudOperation;

    // Check if this is a standard CRUD operation
    if (CRUD_OPERATIONS.includes(op)) {
      const key = getResourceKey(tool);

      if (!resourceMap.has(key)) {
        resourceMap.set(key, new Map());
      }

      resourceMap.get(key)!.set(op, tool);
    } else {
      // Non-CRUD operation - keep as standalone
      standalone.push(tool);
    }
  }

  // Build consolidated resources
  const resources: ConsolidatedResource[] = [];

  for (const [, opMap] of resourceMap) {
    const operations = Array.from(opMap.keys()).sort() as CrudOperation[];
    const firstTool = opMap.values().next().value!;

    // Build tool map for routing
    const toolMap: Record<CrudOperation, string> = {} as Record<CrudOperation, string>;
    for (const [op, tool] of opMap) {
      toolMap[op] = tool.name;
    }

    // Generate combined summary from resource name
    const summary = `Manage ${firstTool.resource} resources. Operations: ${operations.join(", ")}`;

    resources.push({
      name: getConsolidatedName(firstTool.domain, firstTool.resource),
      domain: firstTool.domain,
      resource: firstTool.resource,
      operations,
      summary,
      toolMap,
      isFullCrud: operations.length >= 4, // At least CRUD (no update sometimes)
    });
  }

  // Sort resources by name
  resources.sort((a, b) => a.name.localeCompare(b.name));

  const fullCrudCount = resources.filter((r) => r.isFullCrud).length;

  consolidatedCache = {
    totalResources: resources.length,
    fullCrudResources: fullCrudCount,
    partialResources: resources.length - fullCrudCount,
    standaloneTools: standalone.length,
    resources,
    standalone,
  };

  return consolidatedCache;
}

/**
 * Clear consolidated index cache
 */
export function clearConsolidatedCache(): void {
  consolidatedCache = null;
}

/**
 * Get consolidated resource by name
 */
export function getConsolidatedResource(name: string): ConsolidatedResource | undefined {
  const index = getConsolidatedIndex();
  return index.resources.find((r) => r.name === name);
}

/**
 * Get consolidated resources by domain
 */
export function getConsolidatedByDomain(domain: string): ConsolidatedResource[] {
  const index = getConsolidatedIndex();
  return index.resources.filter((r) => r.domain.toLowerCase() === domain.toLowerCase());
}

/**
 * Search consolidated resources
 */
export interface ConsolidatedSearchResult {
  resource: ConsolidatedResource;
  score: number;
  matchedTerms: string[];
}

/**
 * Search consolidated resources with natural language query
 */
export function searchConsolidatedResources(
  query: string,
  options: { limit?: number; domains?: string[] } = {}
): ConsolidatedSearchResult[] {
  const { limit = 10, domains } = options;
  const index = getConsolidatedIndex();

  // Tokenize query
  const queryTerms = query
    .toLowerCase()
    .split(/[\s-_]+/)
    .filter((t) => t.length > 1);

  const results: ConsolidatedSearchResult[] = [];

  for (const resource of index.resources) {
    // Apply domain filter
    if (domains && domains.length > 0) {
      if (!domains.some((d) => d.toLowerCase() === resource.domain.toLowerCase())) {
        continue;
      }
    }

    // Score based on term matching
    const searchableText = [
      resource.name,
      resource.domain,
      resource.resource,
      resource.summary,
      ...resource.operations,
    ]
      .join(" ")
      .toLowerCase();

    const matchedTerms: string[] = [];
    let score = 0;

    for (const term of queryTerms) {
      if (searchableText.includes(term)) {
        matchedTerms.push(term);
        // Weight by where the match occurred
        if (resource.resource.toLowerCase().includes(term)) {
          score += 0.4;
        } else if (resource.domain.toLowerCase().includes(term)) {
          score += 0.3;
        } else if (resource.operations.some((op) => op.includes(term))) {
          score += 0.2;
        } else {
          score += 0.1;
        }
      }
    }

    // Normalize score
    if (queryTerms.length > 0) {
      score = score / queryTerms.length;
    }

    if (score > 0) {
      results.push({ resource, score: Math.min(score, 1), matchedTerms });
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  return results.slice(0, limit);
}

/**
 * Resolve a consolidated resource + operation to the underlying tool name
 */
export function resolveConsolidatedTool(
  resourceName: string,
  operation: CrudOperation
): string | null {
  const resource = getConsolidatedResource(resourceName);

  if (!resource) {
    return null;
  }

  return resource.toolMap[operation] ?? null;
}

/**
 * Get consolidation statistics
 */
export function getConsolidationStats(): {
  originalToolCount: number;
  consolidatedCount: number;
  reduction: number;
  reductionPercent: string;
} {
  const index = getConsolidatedIndex();
  const toolIndex = getToolIndex();

  const originalToolCount = toolIndex.tools.length;
  const consolidatedCount = index.totalResources + index.standaloneTools;
  const reduction = originalToolCount - consolidatedCount;
  const reductionPercent = ((reduction / originalToolCount) * 100).toFixed(1);

  return {
    originalToolCount,
    consolidatedCount,
    reduction,
    reductionPercent: `${reductionPercent}%`,
  };
}
