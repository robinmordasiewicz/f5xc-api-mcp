/**
 * Prompt Parser
 *
 * Parses English language prompts to extract operation types, resource names,
 * namespaces, and configuration values for CRUD operations.
 */

import {
  type OperationType,
  OPERATION_KEYWORDS,
  RESOURCE_KEYWORDS,
  FIELD_ALIASES,
  VALUE_PATTERNS,
} from "../prompts/common-prompt-patterns.js";

// ============================================================================
// Types
// ============================================================================

/**
 * Result of parsing a natural language prompt
 */
export interface ParsedPrompt {
  /** Original prompt text */
  originalPrompt: string;
  /** Detected operation type */
  operation: OperationType;
  /** Confidence score for operation detection (0-1) */
  operationConfidence: number;
  /** Detected resource type */
  resourceType: string | null;
  /** Generated search query for tool discovery */
  searchQuery: string;
  /** Extracted values from the prompt */
  extractedValues: ExtractedValues;
  /** Keywords matched in the prompt */
  matchedKeywords: string[];
}

/**
 * Values extracted from the prompt
 */
export interface ExtractedValues {
  /** Resource name */
  name?: string;
  /** Namespace */
  namespace?: string;
  /** HTTP path for healthcheck */
  httpPath?: string;
  /** Host header value */
  hostHeader?: string;
  /** Use origin server name flag */
  useOriginServerName?: boolean;
  /** Timeout in seconds */
  timeout?: number;
  /** Interval in seconds */
  interval?: number;
  /** Any other extracted values */
  [key: string]: string | number | boolean | undefined;
}

// ============================================================================
// Parser Implementation
// ============================================================================

/**
 * Parse a natural language prompt into structured data
 */
export function parsePrompt(prompt: string): ParsedPrompt {
  const normalizedPrompt = prompt.toLowerCase().trim();

  // Detect operation
  const { operation, confidence, keywords } = detectOperation(normalizedPrompt);

  // Detect resource type
  const resourceType = detectResourceType(normalizedPrompt);

  // Generate search query
  const searchQuery = generateSearchQuery(operation, resourceType, normalizedPrompt);

  // Extract values
  const extractedValues = extractValues(normalizedPrompt, operation);

  return {
    originalPrompt: prompt,
    operation,
    operationConfidence: confidence,
    resourceType,
    searchQuery,
    extractedValues,
    matchedKeywords: keywords,
  };
}

/**
 * Detect the operation type from a prompt
 */
export function detectOperation(prompt: string): {
  operation: OperationType;
  confidence: number;
  keywords: string[];
} {
  const normalizedPrompt = prompt.toLowerCase();
  let bestMatch: OperationType = "help";
  let bestScore = 0;
  const matchedKeywords: string[] = [];

  for (const [op, keywords] of Object.entries(OPERATION_KEYWORDS)) {
    let score = 0;
    for (const keyword of keywords) {
      if (normalizedPrompt.includes(keyword.toLowerCase())) {
        // Longer keywords get higher scores
        const keywordScore = keyword.length / 10;
        score += 1 + keywordScore;
        matchedKeywords.push(keyword);
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = op as OperationType;
    }
  }

  // Calculate confidence (max 1.0)
  const confidence = Math.min(bestScore / 3, 1);

  return {
    operation: bestMatch,
    confidence,
    keywords: matchedKeywords,
  };
}

/**
 * Detect the resource type from a prompt
 */
export function detectResourceType(prompt: string): string | null {
  const normalizedPrompt = prompt.toLowerCase();

  for (const [resourceType, keywords] of Object.entries(RESOURCE_KEYWORDS)) {
    for (const keyword of keywords) {
      if (normalizedPrompt.includes(keyword.toLowerCase())) {
        return resourceType;
      }
    }
  }

  return null;
}

/**
 * Generate a search query for tool discovery
 */
export function generateSearchQuery(
  operation: OperationType,
  resourceType: string | null,
  prompt: string
): string {
  const parts: string[] = [];

  // Add resource type
  if (resourceType) {
    parts.push(resourceType);
  }

  // Add operation-specific terms
  switch (operation) {
    case "create":
      parts.push("create");
      break;
    case "get":
      parts.push("get");
      break;
    case "list":
      parts.push("list");
      break;
    case "update":
      parts.push("replace", "update");
      break;
    case "delete":
      parts.push("delete");
      break;
    case "validate":
      parts.push("validate", "schema");
      break;
    case "search":
      // For search, use the resource type only
      break;
    case "describe":
      parts.push("describe", "schema");
      break;
    case "help":
      // Keep generic
      break;
  }

  // If no parts, extract key nouns from the prompt
  if (parts.length === 0) {
    const words = prompt.toLowerCase().split(/\s+/);
    const stopWords = new Set([
      "a",
      "an",
      "the",
      "what",
      "how",
      "can",
      "do",
      "i",
      "with",
      "for",
      "is",
      "are",
      "to",
      "from",
      "in",
      "on",
      "at",
    ]);
    for (const word of words) {
      if (!stopWords.has(word) && word.length > 2) {
        parts.push(word);
        if (parts.length >= 3) break;
      }
    }
  }

  return parts.join(" ");
}

/**
 * Extract values from a prompt based on operation type
 */
export function extractValues(
  prompt: string,
  operation: OperationType
): ExtractedValues {
  const values: ExtractedValues = {};

  // Extract name - try multiple patterns in order of specificity
  const namePatterns = [
    // "named X" or "called X"
    VALUE_PATTERNS.namedResource,
    // "healthcheck X" (resource followed by name)
    /(?:healthcheck|health check)\s+([a-z0-9_-]+)(?:\s|$)/i,
    // "for healthcheck X" or "settings for healthcheck X"
    /(?:for|of)\s+(?:healthcheck|health check)\s+([a-z0-9_-]+)/i,
    // "the X healthcheck" (name followed by resource) - require hyphen or underscore to avoid matching "the"
    /(?:the|display\s+the)\s+([a-z0-9]+[-_][a-z0-9_-]*)\s+(?:healthcheck|health check)/i,
    // "the X healthcheck" with simpler name (no hyphen)
    /(?:display\s+the|show\s+the)\s+([a-z0-9_-]+)\s+(?:healthcheck|health check)/i,
  ];

  for (const pattern of namePatterns) {
    const nameMatch = prompt.match(pattern);
    if (nameMatch && !isOperationKeyword(nameMatch[1])) {
      values.name = nameMatch[1];
      break;
    }
  }

  // Extract namespace
  const nsPatterns = [
    // "in the X namespace" or "in X namespace"
    /in\s+(?:the\s+)?["']?([a-z0-9_-]+)["']?\s+namespace/i,
    // "in namespace X"
    /in\s+namespace\s+["']?([a-z0-9_-]+)["']?/i,
    // "namespace X"
    /namespace\s+["']?([a-z0-9_-]+)["']?/i,
    // "from X namespace" or "from namespace X"
    /from\s+(?:the\s+)?["']?([a-z0-9_-]+)["']?\s*(?:namespace)?/i,
    /from\s+namespace\s+["']?([a-z0-9_-]+)["']?/i,
  ];

  for (const pattern of nsPatterns) {
    const nsMatch = prompt.match(pattern);
    if (nsMatch && !isOperationKeyword(nsMatch[1])) {
      values.namespace = nsMatch[1];
      break;
    }
  }

  // Extract HTTP path
  const pathMatch = prompt.match(/(?:http\s+)?path\s+(\/[a-z0-9/_-]*)/i);
  if (pathMatch) {
    values.httpPath = pathMatch[1];
  }

  // Extract host header
  const hostHeaderMatch = prompt.match(
    /(?:host\s+header|custom\s+host|host\s+name)\s+["']?([a-z0-9][-a-z0-9]*(?:\.[a-z0-9][-a-z0-9]*)+)["']?/i
  );
  if (hostHeaderMatch) {
    values.hostHeader = hostHeaderMatch[1];
  }

  // Check for "use origin server name"
  if (
    prompt.includes("use origin server") ||
    prompt.includes("origin server name")
  ) {
    values.useOriginServerName = true;
  }

  // Extract timeout
  const timeoutMatch = prompt.match(/(\d+)\s*(?:second)?\s*timeout/i);
  const timeout2Match = prompt.match(/timeout\s+(?:of\s+)?(\d+)/i);
  if (timeoutMatch) {
    values.timeout = parseInt(timeoutMatch[1], 10);
  } else if (timeout2Match) {
    values.timeout = parseInt(timeout2Match[1], 10);
  }

  // Extract interval
  const intervalMatch = prompt.match(/(\d+)\s*(?:second)?\s*interval/i);
  const interval2Match = prompt.match(/interval\s+(?:of\s+)?(\d+)/i);
  if (intervalMatch) {
    values.interval = parseInt(intervalMatch[1], 10);
  } else if (interval2Match) {
    values.interval = parseInt(interval2Match[1], 10);
  }

  return values;
}

/**
 * Check if a word is an operation keyword (to avoid false positives)
 */
function isOperationKeyword(word: string): boolean {
  const operationWords = new Set([
    "create",
    "get",
    "list",
    "update",
    "delete",
    "remove",
    "show",
    "display",
    "validate",
    "search",
    "find",
    "help",
    "named",
    "called",
    "with",
    "using",
    "from",
    "the",
    "all",
  ]);
  return operationWords.has(word.toLowerCase());
}

// ============================================================================
// Search Query Generation
// ============================================================================

/**
 * Generate search queries for tool discovery based on parsed prompt
 */
export function generateToolSearchQueries(parsed: ParsedPrompt): string[] {
  const queries: string[] = [];

  // Primary query
  queries.push(parsed.searchQuery);

  // If we have a resource type, add CRUD-specific queries
  if (parsed.resourceType) {
    switch (parsed.operation) {
      case "create":
        queries.push(`create ${parsed.resourceType}`);
        queries.push(`${parsed.resourceType} create`);
        break;
      case "get":
        queries.push(`get ${parsed.resourceType}`);
        queries.push(`${parsed.resourceType} get`);
        break;
      case "list":
        queries.push(`list ${parsed.resourceType}`);
        queries.push(`${parsed.resourceType} list`);
        break;
      case "update":
        queries.push(`replace ${parsed.resourceType}`);
        queries.push(`update ${parsed.resourceType}`);
        break;
      case "delete":
        queries.push(`delete ${parsed.resourceType}`);
        queries.push(`${parsed.resourceType} delete`);
        break;
    }
  }

  // Deduplicate
  return [...new Set(queries)];
}

/**
 * Build expected tool name pattern from parsed prompt
 */
export function buildExpectedToolPattern(parsed: ParsedPrompt): string | null {
  if (!parsed.resourceType) return null;

  const resourcePart = parsed.resourceType.replace(/-/g, ".");
  const operationMap: Record<OperationType, string> = {
    create: "create",
    get: "get",
    list: "list",
    update: "replace",
    delete: "delete",
    validate: "",
    search: "",
    describe: "",
    help: "",
  };

  const op = operationMap[parsed.operation];
  if (!op) return resourcePart;

  return `${resourcePart}.*${op}`;
}

// ============================================================================
// Validation Helpers
// ============================================================================

/**
 * Check if prompt contains oneOf conflict indicators
 */
export function hasOneOfConflictIndicators(
  parsed: ParsedPrompt,
  oneOfGroups: Record<string, string[]>
): { hasConflict: boolean; conflictingFields: string[] } {
  const extractedFields = Object.keys(parsed.extractedValues);
  const conflictingFields: string[] = [];

  for (const [groupName, fields] of Object.entries(oneOfGroups)) {
    const matchedFields = fields.filter((field) => {
      // Check if field is in extracted values
      const camelField = toCamelCase(field);
      return (
        extractedFields.includes(field) ||
        extractedFields.includes(camelField) ||
        parsed.extractedValues[camelField] !== undefined
      );
    });

    if (matchedFields.length > 1) {
      conflictingFields.push(...matchedFields);
    }
  }

  return {
    hasConflict: conflictingFields.length > 0,
    conflictingFields: [...new Set(conflictingFields)],
  };
}

/**
 * Convert snake_case to camelCase
 */
function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

// ============================================================================
// Configuration Builders
// ============================================================================

/**
 * Build a healthcheck configuration body from extracted values
 */
export function buildHealthcheckBody(values: ExtractedValues): Record<string, unknown> {
  const body: Record<string, unknown> = {
    metadata: {
      name: values.name || "test-healthcheck",
      namespace: values.namespace || "default",
    },
    spec: {},
  };

  const spec = body.spec as Record<string, unknown>;

  // Add timeout
  if (values.timeout !== undefined) {
    spec.timeout = values.timeout;
  }

  // Add interval
  if (values.interval !== undefined) {
    spec.interval = values.interval;
  }

  // Add HTTP health check if path is specified
  if (values.httpPath) {
    spec.http_health_check = {
      path: values.httpPath,
    };
  }

  // Handle host_header_choice oneOf
  if (values.hostHeader) {
    spec.host_header = values.hostHeader;
  } else if (values.useOriginServerName) {
    spec.use_origin_server_name = {};
  }

  return body;
}

/**
 * Build path parameters from extracted values
 */
export function buildPathParams(
  values: ExtractedValues,
  defaults: { namespace?: string; name?: string } = {}
): Record<string, string> {
  return {
    namespace: values.namespace || defaults.namespace || "default",
    name: values.name || defaults.name || "test-resource",
  };
}
