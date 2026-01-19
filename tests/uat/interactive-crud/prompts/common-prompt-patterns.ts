/**
 * Common Prompt Patterns
 *
 * Reusable templates and patterns for simulating English language prompts
 * in interactive CRUD operations testing.
 */

// ============================================================================
// Types
// ============================================================================

/**
 * Represents a natural language prompt with expected behavior
 */
export interface PromptScenario {
  /** Human-readable scenario name */
  name: string;
  /** Natural language prompt text */
  prompt: string;
  /** Expected operation type to extract */
  expectedOperation: OperationType;
  /** Expected search query to generate */
  expectedSearchTerms: string[];
  /** Expected extracted values (resource names, namespaces, etc.) */
  expectedExtractedValues: Record<string, string | number | boolean>;
  /** Category for grouping related prompts */
  category: PromptCategory;
  /** Whether this prompt should trigger validation */
  shouldValidate?: boolean;
  /** Whether this prompt has oneOf conflicts */
  hasOneOfConflict?: boolean;
}

/**
 * Operation types that can be extracted from prompts
 */
export type OperationType =
  | "search"
  | "describe"
  | "create"
  | "get"
  | "list"
  | "update"
  | "delete"
  | "validate"
  | "help";

/**
 * Categories for organizing prompts
 */
export type PromptCategory =
  | "discovery"
  | "creation"
  | "inspection"
  | "modification"
  | "deletion"
  | "validation"
  | "help";

// ============================================================================
// Prompt Pattern Templates
// ============================================================================

/**
 * Discovery prompt patterns - finding available tools and capabilities
 */
export const DISCOVERY_PATTERNS = {
  /** What tools/operations are available? */
  whatAvailable: [
    "What {resource} tools are available?",
    "Show me the options for {operation} a {resource}",
    "What can I do with {resource}?",
    "How do I {operation} a {resource}?",
    "List available {resource} operations",
  ],
  /** Schema and configuration questions */
  schemaQuestions: [
    "What fields are required for {resource}?",
    "What is the schema for {resource}?",
    "What parameters does {resource} accept?",
    "Show me an example {resource} configuration",
  ],
  /** Dependency questions */
  dependencyQuestions: [
    "What dependencies does {resource} have?",
    "What do I need to create before {resource}?",
    "What resources depend on {resource}?",
  ],
} as const;

/**
 * Creation prompt patterns - creating new resources
 */
export const CREATION_PATTERNS = {
  /** Simple creation with name */
  simpleCreate: [
    "Create a {resource} named {name}",
    "Create {resource} called {name}",
    "Make a new {resource} with name {name}",
  ],
  /** Creation with single field */
  createWithField: [
    "Create a {resource} named {name} with {field} {value}",
    "Create {resource} {name} using {field} {value}",
  ],
  /** Creation with multiple fields */
  createWithMultipleFields: [
    "Create a {resource} named {name} with {field1} {value1} and {field2} {value2}",
    "Create {resource} {name} using {field1} {value1}, {field2} {value2}",
  ],
  /** Creation in specific namespace */
  createInNamespace: [
    "Create a {resource} named {name} in namespace {namespace}",
    "Create {resource} {name} in {namespace} namespace",
  ],
} as const;

/**
 * Inspection prompt patterns - viewing/listing resources
 */
export const INSPECTION_PATTERNS = {
  /** List resources */
  listResources: [
    "List all {resource} in the {namespace} namespace",
    "Show me all {resource}",
    "Get {resource} list",
    "What {resource} exist?",
  ],
  /** Get specific resource */
  getResource: [
    "Show me {resource} named {name}",
    "Get {resource} {name}",
    "What are the settings for {resource} {name}?",
    "Display {resource} {name} configuration",
  ],
  /** Get in namespace */
  getInNamespace: [
    "Show {resource} {name} in namespace {namespace}",
    "Get {resource} {name} from {namespace}",
  ],
} as const;

/**
 * Modification prompt patterns - updating resources
 */
export const MODIFICATION_PATTERNS = {
  /** Simple update */
  simpleUpdate: [
    "Update {resource} {name} with {field} {value}",
    "Change {field} to {value} for {resource} {name}",
    "Set {field} to {value} on {resource} {name}",
  ],
  /** Multiple field update */
  multiFieldUpdate: [
    "Update {resource} {name}: set {field1} to {value1} and {field2} to {value2}",
  ],
} as const;

/**
 * Deletion prompt patterns - removing resources
 */
export const DELETION_PATTERNS = {
  /** Simple deletion */
  simpleDelete: [
    "Delete the {resource} named {name}",
    "Remove {resource} {name}",
    "Delete {resource} {name}",
    "Destroy {resource} {name}",
  ],
  /** Deletion in namespace */
  deleteInNamespace: [
    "Delete {resource} {name} from namespace {namespace}",
    "Remove {resource} {name} in {namespace}",
  ],
} as const;

/**
 * Validation prompt patterns - checking configurations
 */
export const VALIDATION_PATTERNS = {
  /** Pre-creation validation */
  validateBeforeCreate: [
    "Validate my {resource} configuration before creating",
    "Check if this {resource} config is valid",
    "Is this {resource} configuration correct?",
  ],
  /** Schema validation */
  validateSchema: [
    "Does this {resource} have all required fields?",
    "Validate {resource} schema",
  ],
  /** OneOf validation */
  validateOneOf: [
    "Are {field1} and {field2} mutually exclusive for {resource}?",
    "Can I use both {field1} and {field2} in {resource}?",
  ],
} as const;

// ============================================================================
// Pattern Helpers
// ============================================================================

/**
 * Fill template with values
 */
export function fillTemplate(
  template: string,
  values: Record<string, string | number>
): string {
  let result = template;
  for (const [key, value] of Object.entries(values)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, "g"), String(value));
  }
  return result;
}

/**
 * Extract operation keywords from patterns
 * Note: Keywords are ordered by specificity - longer/more specific keywords first
 * to ensure proper matching when keywords overlap.
 */
export const OPERATION_KEYWORDS: Record<OperationType, string[]> = {
  // Search/discovery operations - finding what's available
  search: ["what tools", "tools available", "available", "discover", "search", "find tools"],
  // Describe operations - schema and configuration details
  describe: [
    "show me the options",
    "show me options",
    "show me an example",
    "what fields",
    "fields required",
    "required for",
    "schema for",
    "parameters",
    "example configuration",
    "example config",
    "an example",
    "describe",
    "schema",
  ],
  // Create operations
  create: ["create", "make a new", "make new", "add new", "provision", "make a", "make"],
  // Get single resource operations
  get: [
    "settings for",
    "configuration of",
    "what is the",
    "what are the",
    "show me the",
    "display the",
    "get the",
    "get healthcheck",
    "view the",
    "display",
  ],
  // List multiple resources operations
  list: [
    "list all",
    "show all",
    "show me all",
    "what healthchecks exist",
    "what exist",
    "enumerate",
    "all resources",
    "list",
  ],
  // Update operations
  update: ["update", "change", "modify", "set to", "alter", "edit"],
  // Delete operations
  delete: ["delete", "remove", "destroy", "drop", "eliminate"],
  // Validation operations - explicit validation requests
  validate: ["validate", "is valid", "is correct", "check if valid", "verify"],
  // Help operations
  help: ["how do I", "what can I do", "guide", "documentation", "help"],
};

/**
 * Resource name patterns to extract from prompts
 */
export const RESOURCE_KEYWORDS: Record<string, string[]> = {
  healthcheck: ["healthcheck", "health check", "health-check", "hc"],
  "origin-pool": ["origin pool", "origin-pool", "pool", "backend pool"],
  "http-loadbalancer": [
    "http load balancer",
    "http-loadbalancer",
    "load balancer",
    "lb",
    "http lb",
  ],
  "tcp-loadbalancer": ["tcp load balancer", "tcp-loadbalancer", "tcp lb"],
  namespace: ["namespace", "ns"],
  "dns-zone": ["dns zone", "dns-zone", "zone"],
  "service-policy": ["service policy", "service-policy", "policy"],
  "app-firewall": ["app firewall", "app-firewall", "waf", "firewall"],
};

/**
 * Common field name aliases
 */
export const FIELD_ALIASES: Record<string, string[]> = {
  // Healthcheck fields
  timeout: ["timeout", "timeout value", "request timeout"],
  interval: ["interval", "check interval", "polling interval"],
  http_health_check: ["http health check", "http check", "http path"],
  tcp_health_check: ["tcp health check", "tcp check"],
  host_header: ["host header", "custom host", "host name"],
  use_origin_server_name: ["use origin server", "origin server name", "use origin"],
  unhealthy_threshold: ["unhealthy threshold", "fail count", "failures before unhealthy"],
  healthy_threshold: ["healthy threshold", "success count", "successes before healthy"],

  // Common fields
  name: ["name", "called", "named"],
  namespace: ["namespace", "ns", "in namespace"],
  labels: ["labels", "tags"],
  description: ["description", "desc"],
};

/**
 * Value extraction patterns
 */
export const VALUE_PATTERNS = {
  /** Named resource: "named X" or "called X" */
  namedResource: /(?:named|called)\s+["']?([a-z0-9_-]+)["']?/i,
  /** Namespace: "in namespace X" or "in X namespace" */
  namespace: /(?:in\s+)?(?:namespace\s+)?["']?([a-z0-9_-]+)["']?\s*(?:namespace)?/i,
  /** Numeric value: "X seconds" or "X ms" or just X */
  numericValue: /(\d+)\s*(?:seconds?|ms|milliseconds?)?/i,
  /** Path value: "/path/to/something" */
  pathValue: /(\/[a-z0-9/_-]*)/i,
  /** Hostname: "api.example.com" */
  hostname: /([a-z0-9][-a-z0-9]*(?:\.[a-z0-9][-a-z0-9]*)+)/i,
  /** Boolean value: "true", "false", "yes", "no", "enabled", "disabled" */
  booleanValue: /(true|false|yes|no|enabled?|disabled?)/i,
};
