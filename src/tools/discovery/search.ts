// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Tool Search Implementation
 *
 * Provides natural language search across the tool index.
 * Uses inverted index for O(log n) lookups with fuzzy matching support.
 */

import type { ToolIndexEntry, SearchResult, SearchOptions } from "./types.js";
import { getToolIndex } from "./index-loader.js";
import { getPrerequisiteResources } from "./dependencies.js";
import { getResourceMetadata } from "../../generator/domain-metadata.js";
import {
  buildSearchIndex,
  searchIndex as searchInvertedIndex,
  filterByDomain,
  filterByOperation,
  type SearchIndex,
} from "./search-index.js";

// Global search index instance (initialized on first search)
let globalSearchIndex: SearchIndex | null = null;

/**
 * Get or build the search index
 * Lazy-loads and caches the index for performance
 */
function getSearchIndex(): SearchIndex {
  if (!globalSearchIndex) {
    const toolIndex = getToolIndex();
    globalSearchIndex = buildSearchIndex(toolIndex.tools);
  }
  return globalSearchIndex;
}

/**
 * Normalize text for search matching
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[-_]/g, " ")
    .replace(/[^a-z0-9\s]/g, "")
    .trim();
}

/**
 * Tokenize text into searchable terms
 */
function tokenize(text: string): string[] {
  return normalizeText(text)
    .split(/\s+/)
    .filter((term) => term.length > 1);
}

/**
 * Search for tools matching a natural language query
 *
 * @param query - Natural language search query
 * @param options - Search options
 * @returns Ranked list of matching tools
 *
 * @example
 * ```typescript
 * // Find load balancer tools
 * const results = searchTools("http load balancer");
 *
 * // Find create operations in WAAP domain
 * const results = searchTools("create", { domains: ["waap"], operations: ["create"] });
 * ```
 */
export function searchTools(query: string, options: SearchOptions = {}): SearchResult[] {
  const {
    limit = 10,
    domains,
    operations,
    minScore = 0.1,
    excludeDangerous,
    includeDependencies,
  } = options;

  // Get search index for O(log n) lookups
  const searchIdx = getSearchIndex();
  const queryTerms = tokenize(query);

  // Use inverted index for initial search (O(log n) instead of O(n))
  const indexScores = searchInvertedIndex(searchIdx, queryTerms);

  // Apply domain filter using inverted index
  let candidateToolIds: Set<string> | null = null;
  if (domains && domains.length > 0) {
    candidateToolIds = filterByDomain(searchIdx, domains);
  }

  // Apply operation filter using inverted index
  if (operations && operations.length > 0) {
    const opFilteredIds = filterByOperation(searchIdx, operations);
    if (candidateToolIds) {
      // Intersection with domain filter
      candidateToolIds = new Set([...candidateToolIds].filter((id) => opFilteredIds.has(id)));
    } else {
      candidateToolIds = opFilteredIds;
    }
  }

  // Score and rank tools
  const results: SearchResult[] = [];

  for (const [toolId, baseScore] of indexScores) {
    // Apply filter restrictions
    if (candidateToolIds && !candidateToolIds.has(toolId)) {
      continue;
    }

    const tool = searchIdx.toolsById.get(toolId);
    if (!tool) continue;

    // Phase A: Apply danger level filter
    if (excludeDangerous && tool.dangerLevel === "high") {
      continue;
    }

    // Calculate final score with boosts
    let score = baseScore / queryTerms.length; // Normalize by query length
    const matchedTerms = queryTerms;

    // Apply boost factors from original implementation
    // Boost for domain match
    if (normalizeText(tool.domain).includes(normalizeText(query.split(" ")[0] || ""))) {
      score *= 1.2;
    }

    // Boost for operation match
    const operationTerms = ["create", "get", "list", "update", "delete", "patch"];
    for (const opTerm of operationTerms) {
      if (query.toLowerCase().includes(opTerm) && tool.operation === opTerm) {
        score *= 1.3;
        break;
      }
    }

    // Boost for resource match
    if (normalizeText(tool.resource).includes(normalizeText(query))) {
      score *= 1.4;
    }

    // Cap score at 1.0
    score = Math.min(score, 1);

    if (score >= minScore) {
      const result: SearchResult = { tool, score, matchedTerms };

      // Phase B: Add prerequisite hints for create operations
      // Enhanced with v1.0.84+ upstream dependency metadata
      if (includeDependencies && tool.operation === "create") {
        const prereqs = getPrerequisiteResources(tool.domain, tool.resource);
        const resourceNames = prereqs.map((p) => `${p.domain}/${p.resourceType}`);

        // Get rich dependency data from upstream specs (v1.0.84+)
        const normalizedResource = tool.resource.replace(/-/g, "_");
        const resourceMeta = getResourceMetadata(normalizedResource);

        if (prereqs.length > 0 || resourceMeta) {
          result.prerequisites = {
            resources: resourceNames.length > 0 ? resourceNames : [],
            hint:
              prereqs.length > 0
                ? `To create ${tool.resource}, you first need: ${prereqs.map((p) => p.resourceType).join(", ")}`
                : `No strict prerequisites for ${tool.resource}`,
            // v1.0.84+ rich metadata fields
            required: resourceMeta?.dependencies.required ?? [],
            optional: resourceMeta?.dependencies.optional ?? [],
            relationshipHints: resourceMeta?.relationshipHints ?? [],
          };
        }
      }

      results.push(result);
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  // Return top results
  return results.slice(0, limit);
}

/**
 * Get tools by exact domain (O(1) using index)
 */
export function getToolsByDomain(domain: string): ToolIndexEntry[] {
  const searchIdx = getSearchIndex();
  const toolIds = filterByDomain(searchIdx, [domain]);

  const results: ToolIndexEntry[] = [];
  for (const toolId of toolIds) {
    const tool = searchIdx.toolsById.get(toolId);
    if (tool) {
      results.push(tool);
    }
  }

  return results;
}

/**
 * Get tools by resource name (O(log n) using index search)
 */
export function getToolsByResource(resource: string): ToolIndexEntry[] {
  const searchIdx = getSearchIndex();
  const normalizedResource = normalizeText(resource);
  const resourceTerms = tokenize(normalizedResource);

  // Search index for resource terms
  const toolScores = searchInvertedIndex(searchIdx, resourceTerms);

  const results: ToolIndexEntry[] = [];
  for (const toolId of toolScores.keys()) {
    const tool = searchIdx.toolsById.get(toolId);
    if (tool && normalizeText(tool.resource).includes(normalizedResource)) {
      results.push(tool);
    }
  }

  return results;
}

/**
 * Get all available domains
 */
export function getAvailableDomains(): string[] {
  const index = getToolIndex();
  return Object.keys(index.metadata.domains);
}

/**
 * Get tool count by domain
 */
export function getToolCountByDomain(): Record<string, number> {
  const index = getToolIndex();
  return { ...index.metadata.domains };
}
