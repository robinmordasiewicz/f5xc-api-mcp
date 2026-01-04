/**
 * Chat Query Simulation Helpers
 *
 * Provides utilities for simulating user queries and validating
 * that the MCP server responds appropriately to natural language inputs.
 */

import type { SearchResult } from "../../../../src/tools/discovery/types.js";

/**
 * Represents a simulated user query with expected outcomes
 */
export interface ChatQuery {
  /** Natural language description of user intent */
  userIntent: string;
  /** Actual query string for searchTools() */
  searchQuery: string;
  /** Expected tool name pattern (partial match) */
  expectedToolPattern?: string;
  /** Minimum expected relevance score */
  expectedScore?: number;
  /** Strings that must appear in response */
  requiredInResponse?: string[];
}

/**
 * Result of search query validation
 */
export interface SearchValidationResult {
  /** Whether the query produced expected results */
  passed: boolean;
  /** Results returned by search */
  results: SearchResult[];
  /** Score of top result */
  topScore: number;
  /** Failure reasons if any */
  failures: string[];
}

/**
 * Type guard for documentation mode response
 */
export interface DocumentationResponse {
  curlExample: string;
  tool: {
    name: string;
    method: string;
    path: string;
  };
  authMessage: string;
}

/**
 * Type guard to check if result is a documentation response
 */
export function isDocumentationResponse(result: unknown): result is DocumentationResponse {
  return (
    typeof result === "object" &&
    result !== null &&
    "curlExample" in result &&
    "authMessage" in result &&
    "tool" in result
  );
}

/**
 * Type guard for error responses
 */
export interface ErrorResponse {
  error: string;
  success?: boolean;
}

/**
 * Type guard to check if result is an error response
 */
export function isErrorResponse(result: unknown): result is ErrorResponse {
  return typeof result === "object" && result !== null && "error" in result;
}

/**
 * Type guard for dependency report response
 */
export interface DependencyReportResponse {
  resource: string;
  domain: string;
  prerequisites: string[];
  dependents: string[];
  creationSequence: string[];
}

/**
 * Type guard to check if result is a dependency report
 */
export function isDependencyReport(result: unknown): result is DependencyReportResponse {
  return (
    typeof result === "object" &&
    result !== null &&
    "resource" in result &&
    "domain" in result &&
    "prerequisites" in result
  );
}

/**
 * Type guard for best practices response
 */
export interface BestPracticesResponse {
  success: boolean;
  practices?: {
    domain: string;
    displayName: string;
    workflows: unknown[];
    securityNotes: string[];
    performanceTips: string[];
  };
  availableDomains?: string[];
}

/**
 * Type guard to check if result is a best practices response
 */
export function isBestPracticesResponse(result: unknown): result is BestPracticesResponse {
  return (
    typeof result === "object" &&
    result !== null &&
    "success" in result &&
    (("practices" in result && result.practices !== undefined) ||
      ("availableDomains" in result && result.availableDomains !== undefined))
  );
}

/**
 * Validate that a search query produces expected results
 */
export function validateSearchResults(
  query: ChatQuery,
  results: SearchResult[]
): SearchValidationResult {
  const failures: string[] = [];
  const topScore = results.length > 0 ? results[0].score : 0;

  // Check minimum score
  const expectedScore = query.expectedScore ?? 0.5;
  if (topScore < expectedScore) {
    failures.push(`Top score ${topScore.toFixed(2)} below expected ${expectedScore}`);
  }

  // Check expected tool pattern
  if (query.expectedToolPattern && results.length > 0) {
    const topToolName = results[0].tool.name;
    if (!topToolName.includes(query.expectedToolPattern)) {
      failures.push(
        `Top result '${topToolName}' doesn't match expected pattern '${query.expectedToolPattern}'`
      );
    }
  }

  return {
    passed: failures.length === 0,
    results,
    topScore,
    failures,
  };
}

/**
 * Common query patterns for testing
 */
export const COMMON_QUERIES = {
  // Discovery queries
  discovery: {
    serverInfo: "What can I do with F5 XC?",
    listOperations: "List all available operations",
    loadBalancerOptions: "Show me load balancer options",
    dnsTools: "What DNS tools are available?",
  },
  // Creation queries
  creation: {
    createLb: "Create an HTTP load balancer",
    prerequisites: "What do I need before creating a load balancer?",
    deployWaf: "Show me the steps to deploy a WAF",
    setupOriginPool: "How do I set up an origin pool?",
  },
  // Inspection queries
  inspection: {
    listLbs: "List my load balancers",
    getLbDetails: "Get details of load balancer",
    originPoolStatus: "What's the status of my origin pools?",
  },
  // Modification queries
  modification: {
    updateLb: "Update my load balancer config",
    deleteLb: "Delete load balancer",
    changeOriginPool: "Delete origin pool",
  },
  // Best practices queries
  guidance: {
    wafBestPractices: "What are best practices for WAF?",
    commonErrors: "Common mistakes with load balancers?",
    dnsStructure: "How should I structure my DNS zones?",
  },
} as const;

/**
 * Expected search query patterns for natural language queries
 */
export const QUERY_MAPPINGS: Record<string, string> = {
  // Discovery
  "What can I do with F5 XC?": "f5xc operations",
  "List all available operations": "list operations",
  "Show me load balancer options": "http load balancer",
  "What DNS tools are available?": "dns",

  // Creation
  "Create an HTTP load balancer": "create http load balancer",
  "What do I need before creating a load balancer?": "http-loadbalancer",
  "Show me the steps to deploy a WAF": "waf app firewall",
  "How do I set up an origin pool?": "create origin pool",

  // Inspection
  "List my load balancers": "list http load balancer",
  "Get details of load balancer": "get http load balancer",
  "What's the status of my origin pools?": "list origin pool",

  // Modification
  "Update my load balancer config": "update http load balancer",
  "Delete load balancer": "delete http load balancer",
  "Delete origin pool": "delete origin pool",
};
