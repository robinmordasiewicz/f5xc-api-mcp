// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Tool Search Implementation
 *
 * Provides natural language search across the tool index.
 * Uses lightweight text matching for efficient discovery.
 */

import type { ToolIndexEntry, SearchResult, SearchOptions } from "./types.js";
import { getToolIndex } from "./index-loader.js";
import { getPrerequisiteResources } from "./dependencies.js";
import { getResourceMetadata } from "../../generator/domain-metadata.js";

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
 * Calculate relevance score between query and tool
 */
function calculateScore(
  query: string,
  tool: ToolIndexEntry
): { score: number; matchedTerms: string[] } {
  const queryTerms = tokenize(query);
  const matchedTerms: string[] = [];

  if (queryTerms.length === 0) {
    return { score: 0, matchedTerms };
  }

  // Build searchable text from tool
  const toolText = [tool.name, tool.domain, tool.resource, tool.operation, tool.summary].join(" ");

  const normalizedToolText = normalizeText(toolText);
  const toolTerms = new Set(tokenize(toolText));

  let matchCount = 0;

  for (const queryTerm of queryTerms) {
    // Exact term match
    if (toolTerms.has(queryTerm)) {
      matchCount += 1;
      matchedTerms.push(queryTerm);
      continue;
    }

    // Partial match (query term contained in tool text)
    if (normalizedToolText.includes(queryTerm)) {
      matchCount += 0.7;
      matchedTerms.push(queryTerm);
      continue;
    }

    // Check if any tool term starts with query term (prefix match)
    for (const toolTerm of toolTerms) {
      if (toolTerm.startsWith(queryTerm)) {
        matchCount += 0.5;
        matchedTerms.push(queryTerm);
        break;
      }
    }
  }

  // Boost scores for specific matches
  let score = matchCount / queryTerms.length;

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
  return { score: Math.min(score, 1), matchedTerms: [...new Set(matchedTerms)] };
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
    excludeDeprecated,
    includeDependencies,
  } = options;

  const index = getToolIndex();
  let tools = index.tools;

  // Apply domain filter
  if (domains && domains.length > 0) {
    const domainSet = new Set(domains.map((d) => d.toLowerCase()));
    tools = tools.filter((t) => domainSet.has(t.domain.toLowerCase()));
  }

  // Apply operation filter
  if (operations && operations.length > 0) {
    const opSet = new Set(operations.map((o) => o.toLowerCase()));
    tools = tools.filter((t) => opSet.has(t.operation.toLowerCase()));
  }

  // Phase A: Apply danger level filter
  if (excludeDangerous) {
    tools = tools.filter((t) => t.dangerLevel !== "high");
  }

  // Phase A: Apply deprecation filter
  if (excludeDeprecated) {
    tools = tools.filter((t) => !t.isDeprecated);
  }

  // Score and rank tools
  const results: SearchResult[] = [];

  for (const tool of tools) {
    const { score, matchedTerms } = calculateScore(query, tool);

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
 * Get tools by exact domain
 */
export function getToolsByDomain(domain: string): ToolIndexEntry[] {
  const index = getToolIndex();
  return index.tools.filter((t) => t.domain.toLowerCase() === domain.toLowerCase());
}

/**
 * Get tools by resource name
 */
export function getToolsByResource(resource: string): ToolIndexEntry[] {
  const index = getToolIndex();
  const normalizedResource = normalizeText(resource);
  return index.tools.filter((t) => normalizeText(t.resource).includes(normalizedResource));
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
