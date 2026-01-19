/**
 * Healthcheck Prompt Scenarios
 *
 * English language prompts for testing interactive healthcheck CRUD operations.
 * These simulate real user interactions with the opencode CLI.
 */

import type { PromptScenario } from "./common-prompt-patterns.js";

// ============================================================================
// Discovery Prompts
// ============================================================================

/**
 * Prompts for discovering healthcheck tools and capabilities
 */
export const HEALTHCHECK_DISCOVERY_PROMPTS: PromptScenario[] = [
  {
    name: "discover_healthcheck_tools",
    prompt: "What healthcheck tools are available?",
    expectedOperation: "search",
    expectedSearchTerms: ["healthcheck"],
    expectedExtractedValues: {},
    category: "discovery",
  },
  {
    name: "discover_healthcheck_options",
    prompt: "Show me the options for creating a healthcheck",
    expectedOperation: "describe",
    expectedSearchTerms: ["healthcheck", "create"],
    expectedExtractedValues: {},
    category: "discovery",
  },
  {
    name: "discover_healthcheck_capabilities",
    prompt: "What can I do with healthchecks?",
    expectedOperation: "help", // "What can I do" matches help pattern
    expectedSearchTerms: ["healthcheck"],
    expectedExtractedValues: {},
    category: "discovery",
  },
  {
    name: "discover_healthcheck_schema",
    prompt: "What fields are required for a healthcheck?",
    expectedOperation: "describe",
    expectedSearchTerms: ["healthcheck", "schema", "fields"],
    expectedExtractedValues: {},
    category: "discovery",
  },
  {
    name: "discover_healthcheck_example",
    prompt: "Show me an example healthcheck configuration",
    expectedOperation: "describe",
    expectedSearchTerms: ["healthcheck", "example"],
    expectedExtractedValues: {},
    category: "discovery",
  },
];

// ============================================================================
// Creation Prompts
// ============================================================================

/**
 * Prompts for creating healthcheck resources
 */
export const HEALTHCHECK_CREATION_PROMPTS: PromptScenario[] = [
  // Simple creation
  {
    name: "create_simple_healthcheck",
    prompt: "Create a healthcheck named my-health",
    expectedOperation: "create",
    expectedSearchTerms: ["healthcheck", "create"],
    expectedExtractedValues: {
      name: "my-health",
    },
    category: "creation",
  },
  {
    name: "create_healthcheck_with_namespace",
    prompt: "Create a healthcheck named api-health in namespace production",
    expectedOperation: "create",
    expectedSearchTerms: ["healthcheck", "create"],
    expectedExtractedValues: {
      name: "api-health",
      namespace: "production",
    },
    category: "creation",
  },

  // Creation with HTTP path
  {
    name: "create_healthcheck_with_http_path",
    prompt: "Create a healthcheck named my-health with HTTP path /status",
    expectedOperation: "create",
    expectedSearchTerms: ["healthcheck", "create"],
    expectedExtractedValues: {
      name: "my-health",
      httpPath: "/status",
    },
    category: "creation",
  },
  {
    name: "create_healthcheck_with_health_endpoint",
    prompt: "Create a healthcheck called backend-hc using HTTP path /health",
    expectedOperation: "create",
    expectedSearchTerms: ["healthcheck", "create"],
    expectedExtractedValues: {
      name: "backend-hc",
      httpPath: "/health",
    },
    category: "creation",
  },

  // Creation with timeout
  {
    name: "create_healthcheck_with_timeout",
    prompt: "Create a healthcheck with 5 second timeout",
    expectedOperation: "create",
    expectedSearchTerms: ["healthcheck", "create"],
    expectedExtractedValues: {
      timeout: 5,
    },
    category: "creation",
  },
  {
    name: "create_healthcheck_with_timeout_and_name",
    prompt: "Create a healthcheck named fast-check with 2 second timeout",
    expectedOperation: "create",
    expectedSearchTerms: ["healthcheck", "create"],
    expectedExtractedValues: {
      name: "fast-check",
      timeout: 2,
    },
    category: "creation",
  },

  // Creation with host header (OneOf choice)
  {
    name: "create_healthcheck_with_host_header",
    prompt: "Create a healthcheck named api-hc with custom host header api.example.com",
    expectedOperation: "create",
    expectedSearchTerms: ["healthcheck", "create"],
    expectedExtractedValues: {
      name: "api-hc",
      hostHeader: "api.example.com",
    },
    category: "creation",
  },
  {
    name: "create_healthcheck_use_origin_server",
    prompt: "Create a healthcheck using origin server name for host header",
    expectedOperation: "create",
    expectedSearchTerms: ["healthcheck", "create"],
    expectedExtractedValues: {
      useOriginServerName: true,
    },
    category: "creation",
  },

  // Creation with multiple fields
  {
    name: "create_healthcheck_full_config",
    prompt:
      "Create a healthcheck named api-check with HTTP path /health, 5 second timeout, and 30 second interval",
    expectedOperation: "create",
    expectedSearchTerms: ["healthcheck", "create"],
    expectedExtractedValues: {
      name: "api-check",
      httpPath: "/health",
      timeout: 5,
      interval: 30,
    },
    category: "creation",
  },

  // OneOf conflict scenarios
  {
    name: "create_healthcheck_oneof_conflict",
    prompt:
      "Create a healthcheck with host header api.example.com and use origin server name",
    expectedOperation: "create",
    expectedSearchTerms: ["healthcheck", "create"],
    expectedExtractedValues: {
      hostHeader: "api.example.com",
      useOriginServerName: true,
    },
    category: "creation",
    hasOneOfConflict: true,
  },
];

// ============================================================================
// Inspection Prompts
// ============================================================================

/**
 * Prompts for inspecting/viewing healthcheck resources
 */
export const HEALTHCHECK_INSPECTION_PROMPTS: PromptScenario[] = [
  // List operations
  {
    name: "list_all_healthchecks",
    prompt: "List all healthchecks in the default namespace",
    expectedOperation: "list",
    expectedSearchTerms: ["healthcheck", "list"],
    expectedExtractedValues: {
      namespace: "default",
    },
    category: "inspection",
  },
  {
    name: "list_healthchecks_production",
    prompt: "Show me all healthchecks in production namespace",
    expectedOperation: "list", // "show me all" should match list
    expectedSearchTerms: ["healthcheck", "list"],
    expectedExtractedValues: {
      namespace: "production",
    },
    category: "inspection",
  },
  {
    name: "list_healthchecks_simple",
    prompt: "What healthchecks exist?",
    expectedOperation: "list", // "what exist" should match list
    expectedSearchTerms: ["healthcheck", "list"],
    expectedExtractedValues: {},
    category: "inspection",
  },

  // Get specific resource
  {
    name: "get_healthcheck_by_name",
    prompt: "Get the healthcheck named my-health",
    expectedOperation: "get", // Changed from "Show me" to "Get the"
    expectedSearchTerms: ["healthcheck", "get"],
    expectedExtractedValues: {
      name: "my-health",
    },
    category: "inspection",
  },
  {
    name: "get_healthcheck_settings",
    prompt: "What are the settings for healthcheck my-health?",
    expectedOperation: "get", // "settings for" should match get
    expectedSearchTerms: ["healthcheck", "get"],
    expectedExtractedValues: {
      name: "my-health",
    },
    category: "inspection",
  },
  {
    name: "get_healthcheck_in_namespace",
    prompt: "Get healthcheck api-check from production namespace",
    expectedOperation: "get",
    expectedSearchTerms: ["healthcheck", "get"],
    expectedExtractedValues: {
      name: "api-check",
      namespace: "production",
    },
    category: "inspection",
  },
  {
    name: "display_healthcheck_config",
    prompt: "Display healthcheck backend-hc configuration",
    expectedOperation: "get", // "display" should match get
    expectedSearchTerms: ["healthcheck", "get"],
    expectedExtractedValues: {
      name: "backend-hc",
    },
    category: "inspection",
  },
];

// ============================================================================
// Validation Prompts
// ============================================================================

/**
 * Prompts for validating healthcheck configurations
 */
export const HEALTHCHECK_VALIDATION_PROMPTS: PromptScenario[] = [
  {
    name: "validate_before_create",
    prompt: "Validate my healthcheck configuration before creating",
    expectedOperation: "validate",
    expectedSearchTerms: ["healthcheck", "validate"],
    expectedExtractedValues: {},
    category: "validation",
    shouldValidate: true,
  },
  {
    name: "validate_config_valid",
    prompt: "Check if this healthcheck config is valid",
    expectedOperation: "validate",
    expectedSearchTerms: ["healthcheck", "validate"],
    expectedExtractedValues: {},
    category: "validation",
    shouldValidate: true,
  },
  {
    name: "validate_required_fields",
    prompt: "Does this healthcheck have all required fields?",
    expectedOperation: "validate",
    expectedSearchTerms: ["healthcheck", "validate", "required"],
    expectedExtractedValues: {},
    category: "validation",
    shouldValidate: true,
  },
  {
    name: "validate_oneof_conflict",
    prompt:
      "Validate a healthcheck with both host_header and use_origin_server_name",
    expectedOperation: "validate",
    expectedSearchTerms: ["healthcheck", "validate"],
    expectedExtractedValues: {
      hostHeader: true,
      useOriginServerName: true,
    },
    category: "validation",
    shouldValidate: true,
    hasOneOfConflict: true,
  },
  {
    name: "validate_mutually_exclusive",
    prompt: "Are host_header and use_origin_server_name mutually exclusive for healthcheck?",
    expectedOperation: "validate",
    expectedSearchTerms: ["healthcheck", "validate", "mutually exclusive"],
    expectedExtractedValues: {},
    category: "validation",
    shouldValidate: true,
  },
];

// ============================================================================
// Modification Prompts
// ============================================================================

/**
 * Prompts for updating healthcheck resources
 */
export const HEALTHCHECK_MODIFICATION_PROMPTS: PromptScenario[] = [
  {
    name: "update_healthcheck_timeout",
    prompt: "Update healthcheck my-health with timeout 10 seconds",
    expectedOperation: "update",
    expectedSearchTerms: ["healthcheck", "update"],
    expectedExtractedValues: {
      name: "my-health",
      timeout: 10,
    },
    category: "modification",
  },
  {
    name: "update_healthcheck_interval",
    prompt: "Change interval to 60 seconds for healthcheck api-check",
    expectedOperation: "update",
    expectedSearchTerms: ["healthcheck", "update"],
    expectedExtractedValues: {
      name: "api-check",
      interval: 60,
    },
    category: "modification",
  },
  {
    name: "update_healthcheck_path",
    prompt: "Set HTTP path to /ready on healthcheck backend-hc",
    expectedOperation: "update",
    expectedSearchTerms: ["healthcheck", "update"],
    expectedExtractedValues: {
      name: "backend-hc",
      httpPath: "/ready",
    },
    category: "modification",
  },
];

// ============================================================================
// Deletion Prompts
// ============================================================================

/**
 * Prompts for deleting healthcheck resources
 */
export const HEALTHCHECK_DELETION_PROMPTS: PromptScenario[] = [
  {
    name: "delete_healthcheck_simple",
    prompt: "Delete the healthcheck named my-health",
    expectedOperation: "delete",
    expectedSearchTerms: ["healthcheck", "delete"],
    expectedExtractedValues: {
      name: "my-health",
    },
    category: "deletion",
  },
  {
    name: "delete_healthcheck_remove",
    prompt: "Remove healthcheck api-check",
    expectedOperation: "delete",
    expectedSearchTerms: ["healthcheck", "delete"],
    expectedExtractedValues: {
      name: "api-check",
    },
    category: "deletion",
  },
  {
    name: "delete_healthcheck_in_namespace",
    prompt: "Delete healthcheck backend-hc from namespace production",
    expectedOperation: "delete",
    expectedSearchTerms: ["healthcheck", "delete"],
    expectedExtractedValues: {
      name: "backend-hc",
      namespace: "production",
    },
    category: "deletion",
  },
  {
    name: "destroy_healthcheck",
    prompt: "Destroy healthcheck old-check",
    expectedOperation: "delete",
    expectedSearchTerms: ["healthcheck", "delete"],
    expectedExtractedValues: {
      name: "old-check",
    },
    category: "deletion",
  },
];

// ============================================================================
// All Prompts Collection
// ============================================================================

/**
 * All healthcheck prompts organized by category
 */
export const ALL_HEALTHCHECK_PROMPTS = {
  discovery: HEALTHCHECK_DISCOVERY_PROMPTS,
  creation: HEALTHCHECK_CREATION_PROMPTS,
  inspection: HEALTHCHECK_INSPECTION_PROMPTS,
  validation: HEALTHCHECK_VALIDATION_PROMPTS,
  modification: HEALTHCHECK_MODIFICATION_PROMPTS,
  deletion: HEALTHCHECK_DELETION_PROMPTS,
} as const;

/**
 * Flat list of all healthcheck prompts
 */
export const HEALTHCHECK_PROMPTS_FLAT: PromptScenario[] = [
  ...HEALTHCHECK_DISCOVERY_PROMPTS,
  ...HEALTHCHECK_CREATION_PROMPTS,
  ...HEALTHCHECK_INSPECTION_PROMPTS,
  ...HEALTHCHECK_VALIDATION_PROMPTS,
  ...HEALTHCHECK_MODIFICATION_PROMPTS,
  ...HEALTHCHECK_DELETION_PROMPTS,
];

/**
 * Get prompts by category
 */
export function getPromptsByCategory(category: keyof typeof ALL_HEALTHCHECK_PROMPTS): PromptScenario[] {
  return ALL_HEALTHCHECK_PROMPTS[category];
}

/**
 * Get prompts that expect oneOf conflicts
 */
export function getOneOfConflictPrompts(): PromptScenario[] {
  return HEALTHCHECK_PROMPTS_FLAT.filter((p) => p.hasOneOfConflict);
}

/**
 * Get prompts that should trigger validation
 */
export function getValidationPrompts(): PromptScenario[] {
  return HEALTHCHECK_PROMPTS_FLAT.filter((p) => p.shouldValidate);
}
