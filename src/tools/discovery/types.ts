/**
 * Discovery Module Type Definitions
 *
 * Lightweight types for the dynamic tool discovery system.
 * These types are designed to minimize token usage while
 * preserving essential information for tool discovery.
 */

/**
 * Lightweight tool index entry (~50 tokens vs ~375 for full ParsedOperation)
 * Contains only the minimum information needed for search/discovery.
 */
export interface ToolIndexEntry {
  /** Tool name (e.g., "f5xc-api-waap-http-loadbalancer-create") */
  name: string;
  /** Domain category (e.g., "waap", "dns", "core") */
  domain: string;
  /** Resource type (e.g., "http-loadbalancer") */
  resource: string;
  /** Operation type (e.g., "create", "get", "list", "update", "delete") */
  operation: string;
  /** Brief summary for search matching */
  summary: string;
}

/**
 * Search result with relevance scoring
 */
export interface SearchResult {
  /** The matching tool entry */
  tool: ToolIndexEntry;
  /** Relevance score (0-1) */
  score: number;
  /** Matched terms for highlighting */
  matchedTerms: string[];
}

/**
 * Search options for customizing tool discovery
 */
export interface SearchOptions {
  /** Maximum number of results to return (default: 10) */
  limit?: number;
  /** Filter by domain(s) */
  domains?: string[];
  /** Filter by operation type(s) */
  operations?: string[];
  /** Minimum relevance score threshold (default: 0.1) */
  minScore?: number;
}

/**
 * Tool index metadata for the entire index
 */
export interface ToolIndexMetadata {
  /** Total number of tools indexed */
  totalTools: number;
  /** Available domains with tool counts */
  domains: Record<string, number>;
  /** Index generation timestamp */
  generatedAt: string;
  /** Version of the index format */
  version: string;
}

/**
 * Complete tool index structure
 */
export interface ToolIndex {
  /** Index metadata */
  metadata: ToolIndexMetadata;
  /** All tool entries */
  tools: ToolIndexEntry[];
}
