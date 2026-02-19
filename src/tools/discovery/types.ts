// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Discovery Module Type Definitions
 *
 * Lightweight types for the dynamic tool discovery system.
 * These types are designed to minimize token usage while
 * preserving essential information for tool discovery.
 */

/**
 * Lightweight tool index entry (~60 tokens vs ~375 for full ParsedOperation)
 * Contains only the minimum information needed for search/discovery.
 * Includes domain metadata from upstream specs for enhanced filtering.
 * Enhanced with v1.0.84+ resource-level metadata.
 */
export interface ToolIndexEntry {
  /** Tool name (e.g., "f5xc-api-waap-http-loadbalancer-create") */
  name: string;
  /** Domain identifier (e.g., "waf", "dns", "network") */
  domain: string;
  /** Resource type (e.g., "http-loadbalancer") */
  resource: string;
  /** Operation type (e.g., "create", "get", "list", "update", "delete") */
  operation: string;
  /** Brief summary for search matching */
  summary: string;
  /** Danger level (Phase A): low, medium, high */
  dangerLevel: "low" | "medium" | "high";
  /** Domain category from upstream specs (e.g., "Security", "Platform") */
  domainCategory: string | null;
  /** UI category from upstream specs (e.g., "API Protection", "Sites") */
  uiCategory: string | null;
  /** Resource icon from upstream specs (v1.0.84+) */
  resourceIcon: string | null;
  /** Resource category from upstream specs (v1.0.84+, e.g., "Load Balancing", "Security") */
  resourceCategory: string | null;
  /** Whether resource supports log collection (v1.0.84+) */
  supportsLogs: boolean;
  /** Whether resource supports metrics collection (v1.0.84+) */
  supportsMetrics: boolean;
  /** Resource tier requirement (v1.0.84+) */
  resourceTier: string | null;
  /** API response time from live discovery in ms (v2.0.5+) */
  discoveryResponseTimeMs?: number;
}

/**
 * Prerequisite hint for create operations (Phase B)
 * Enhanced with v1.0.84+ upstream dependency metadata
 */
export interface PrerequisiteHint {
  /** Required resources before creating this resource */
  resources: string[];
  /** Human-readable hint about prerequisites */
  hint: string;
  /** Resources that MUST exist before creation (v1.0.84+) */
  required?: string[];
  /** Resources that are optional dependencies (v1.0.84+) */
  optional?: string[];
  /** Human-readable relationship hints from upstream (v1.0.84+) */
  relationshipHints?: string[];
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
  /** Prerequisite hints for create operations (Phase B) */
  prerequisites?: PrerequisiteHint;
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
  /** Exclude high-danger operations from results (Phase A) */
  excludeDangerous?: boolean;
  /** Include prerequisite hints for create operations (Phase B) */
  includeDependencies?: boolean;
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
