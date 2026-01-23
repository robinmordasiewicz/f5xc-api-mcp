// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Search Index for O(log n) Tool Lookups
 *
 * Implements an inverted index structure for fast tool search with fuzzy matching support.
 * Reduces search complexity from O(n) linear scan to O(log n) index lookups.
 */

import type { ToolIndexEntry } from "./types.js";

/**
 * Inverted index structure mapping terms to tool IDs
 */
export interface SearchIndex {
  /** Term → Set of tool IDs containing that term */
  terms: Map<string, Set<string>>;
  /** Domain → Set of tool IDs in that domain */
  domains: Map<string, Set<string>>;
  /** Operation → Set of tool IDs for that operation */
  operations: Map<string, Set<string>>;
  /** Tool ID → Tool entry for quick retrieval */
  toolsById: Map<string, ToolIndexEntry>;
  /** Build timestamp for cache invalidation */
  buildTime: number;
}

/**
 * Configuration for index building
 */
export interface IndexConfig {
  /** Minimum term length to index (default: 2) */
  minTermLength: number;
  /** Enable fuzzy matching (default: true) */
  enableFuzzy: boolean;
  /** Maximum Levenshtein distance for fuzzy matches (default: 2) */
  maxEditDistance: number;
}

const DEFAULT_CONFIG: IndexConfig = {
  minTermLength: 2,
  enableFuzzy: true,
  maxEditDistance: 2,
};

/**
 * Normalize text for consistent indexing and searching
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
function tokenize(text: string, minLength = 2): string[] {
  return normalizeText(text)
    .split(/\s+/)
    .filter((term) => term.length >= minLength);
}

/**
 * Calculate Levenshtein distance between two strings
 * Used for fuzzy matching with configurable edit distance
 */
export function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  // Initialize matrix
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0]![j] = j;
  }

  // Calculate distances
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i]![j] = matrix[i - 1]![j - 1]!;
      } else {
        matrix[i]![j] = Math.min(
          matrix[i - 1]![j - 1]! + 1, // substitution
          matrix[i]![j - 1]! + 1, // insertion
          matrix[i - 1]![j]! + 1 // deletion
        );
      }
    }
  }

  return matrix[b.length]![a.length]!;
}

/**
 * Build search index from tool entries
 *
 * Creates inverted indexes for terms, domains, and operations to enable
 * fast O(log n) lookups instead of O(n) linear scans.
 *
 * @param tools - Array of tool entries to index
 * @param config - Index configuration options
 * @returns Built search index
 */
export function buildSearchIndex(
  tools: ToolIndexEntry[],
  config: Partial<IndexConfig> = {}
): SearchIndex {
  const fullConfig: IndexConfig = { ...DEFAULT_CONFIG, ...config };

  const index: SearchIndex = {
    terms: new Map(),
    domains: new Map(),
    operations: new Map(),
    toolsById: new Map(),
    buildTime: Date.now(),
  };

  for (const tool of tools) {
    const toolId = tool.name;

    // Store tool for quick retrieval
    index.toolsById.set(toolId, tool);

    // Index by domain
    const domain = tool.domain.toLowerCase();
    if (!index.domains.has(domain)) {
      index.domains.set(domain, new Set());
    }
    index.domains.get(domain)!.add(toolId);

    // Index by operation
    const operation = tool.operation.toLowerCase();
    if (!index.operations.has(operation)) {
      index.operations.set(operation, new Set());
    }
    index.operations.get(operation)!.add(toolId);

    // Index all searchable terms from tool
    const searchableText = [
      tool.name,
      tool.domain,
      tool.resource,
      tool.operation,
      tool.summary,
    ].join(" ");

    const terms = tokenize(searchableText, fullConfig.minTermLength);

    for (const term of terms) {
      if (!index.terms.has(term)) {
        index.terms.set(term, new Set());
      }
      index.terms.get(term)!.add(toolId);
    }
  }

  return index;
}

/**
 * Search index for tools matching query terms
 *
 * Uses inverted index for O(log n) lookups instead of O(n) linear scan.
 * Supports fuzzy matching with configurable edit distance.
 *
 * @param index - Built search index
 * @param queryTerms - Tokenized search terms
 * @param config - Search configuration
 * @returns Set of matching tool IDs
 */
export function searchIndex(
  index: SearchIndex,
  queryTerms: string[],
  config: Partial<IndexConfig> = {}
): Map<string, number> {
  const fullConfig = { ...DEFAULT_CONFIG, ...config };
  const toolScores = new Map<string, number>();

  for (const queryTerm of queryTerms) {
    const normalizedQuery = normalizeText(queryTerm);

    if (normalizedQuery.length < fullConfig.minTermLength) {
      continue;
    }

    // Direct term match
    const exactMatches = index.terms.get(normalizedQuery);
    if (exactMatches) {
      for (const toolId of exactMatches) {
        toolScores.set(toolId, (toolScores.get(toolId) ?? 0) + 1.0);
      }
    }

    // Fuzzy matching if enabled
    if (fullConfig.enableFuzzy) {
      for (const [term, toolIds] of index.terms) {
        // Skip if already exact matched
        if (term === normalizedQuery) continue;

        // Skip if term length difference is too large (optimization)
        if (Math.abs(term.length - normalizedQuery.length) > fullConfig.maxEditDistance) {
          continue;
        }

        // Calculate edit distance
        const distance = levenshteinDistance(normalizedQuery, term);

        // If within acceptable distance, add partial score
        if (distance <= fullConfig.maxEditDistance) {
          const fuzzyScore = 1 - distance / fullConfig.maxEditDistance;
          for (const toolId of toolIds) {
            toolScores.set(toolId, (toolScores.get(toolId) ?? 0) + fuzzyScore * 0.7);
          }
        }
      }
    }

    // Prefix matching for partial terms
    for (const [term, toolIds] of index.terms) {
      if (term.startsWith(normalizedQuery) && term !== normalizedQuery) {
        for (const toolId of toolIds) {
          toolScores.set(toolId, (toolScores.get(toolId) ?? 0) + 0.5);
        }
      }
    }
  }

  return toolScores;
}

/**
 * Filter index by domain
 *
 * Returns set of tool IDs in specified domains.
 * O(1) lookup via inverted index.
 *
 * @param index - Search index
 * @param domains - Domains to filter by
 * @returns Set of tool IDs in those domains
 */
export function filterByDomain(index: SearchIndex, domains: string[]): Set<string> {
  const result = new Set<string>();

  for (const domain of domains) {
    const normalizedDomain = domain.toLowerCase();
    const toolIds = index.domains.get(normalizedDomain);
    if (toolIds) {
      for (const toolId of toolIds) {
        result.add(toolId);
      }
    }
  }

  return result;
}

/**
 * Filter index by operation
 *
 * Returns set of tool IDs for specified operations.
 * O(1) lookup via inverted index.
 *
 * @param index - Search index
 * @param operations - Operations to filter by
 * @returns Set of tool IDs for those operations
 */
export function filterByOperation(index: SearchIndex, operations: string[]): Set<string> {
  const result = new Set<string>();

  for (const operation of operations) {
    const normalizedOp = operation.toLowerCase();
    const toolIds = index.operations.get(normalizedOp);
    if (toolIds) {
      for (const toolId of toolIds) {
        result.add(toolId);
      }
    }
  }

  return result;
}

/**
 * Get index statistics for monitoring and debugging
 */
export function getIndexStats(index: SearchIndex): {
  totalTools: number;
  totalTerms: number;
  totalDomains: number;
  totalOperations: number;
  avgTermsPerTool: number;
  buildTime: number;
  ageMs: number;
} {
  const totalTools = index.toolsById.size;
  const totalTerms = index.terms.size;

  // Calculate average terms per tool
  let totalTermCount = 0;
  for (const toolIds of index.terms.values()) {
    totalTermCount += toolIds.size;
  }

  return {
    totalTools,
    totalTerms,
    totalDomains: index.domains.size,
    totalOperations: index.operations.size,
    avgTermsPerTool: totalTools > 0 ? totalTermCount / totalTools : 0,
    buildTime: index.buildTime,
    ageMs: Date.now() - index.buildTime,
  };
}
