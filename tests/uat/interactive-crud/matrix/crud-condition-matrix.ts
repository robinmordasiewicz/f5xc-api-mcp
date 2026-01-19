/**
 * CRUD Condition Matrix
 *
 * Comprehensive success/failure condition definitions for interactive CRUD operations.
 * Used to evaluate responses against expected outcomes based on auth state, operation type,
 * and input validity.
 */

// ============================================================================
// Types
// ============================================================================

/**
 * Authentication state for the operation
 */
export type AuthState = "authenticated" | "documentation" | "unauthenticated";

/**
 * CRUD operation types
 */
export type CrudOperation =
  | "create"
  | "get"
  | "list"
  | "update"
  | "delete"
  | "validate"
  | "search"
  | "describe";

/**
 * Input validation state
 */
export type InputState =
  | "valid"
  | "missing_required"
  | "invalid_type"
  | "oneOf_conflict"
  | "unknown_field"
  | "empty"
  | "malformed";

/**
 * Expected outcome type
 */
export type OutcomeType =
  | "api_response"
  | "validation_result"
  | "documentation"
  | "error"
  | "warning"
  | "search_results";

/**
 * A condition matrix entry defining expected behavior
 */
export interface ConditionEntry {
  /** Unique scenario identifier */
  scenarioId: string;
  /** Human-readable description */
  description: string;
  /** Authentication state requirement */
  authState: AuthState;
  /** CRUD operation being performed */
  operation: CrudOperation;
  /** State of input data */
  inputState: InputState;
  /** Expected HTTP status code (null for non-HTTP responses) */
  expectedStatus: number | null;
  /** Expected outcome type */
  outcomeType: OutcomeType;
  /** Expected response characteristics */
  expectedCharacteristics: ExpectedCharacteristics;
}

/**
 * Expected characteristics of the response
 */
export interface ExpectedCharacteristics {
  /** Whether response should contain data */
  hasData?: boolean;
  /** Whether response should contain error */
  hasError?: boolean;
  /** Whether response should contain warnings */
  hasWarnings?: boolean;
  /** Expected error code pattern */
  errorCodePattern?: string;
  /** Expected error message pattern */
  errorMessagePattern?: string;
  /** Expected warning message pattern */
  warningMessagePattern?: string;
  /** Whether response includes curl example */
  hasCurlExample?: boolean;
  /** Whether response includes CLI example */
  hasCliExample?: boolean;
  /** Minimum number of results (for list/search) */
  minResults?: number;
  /** Whether validation passed */
  validationPassed?: boolean;
}

// ============================================================================
// Condition Matrix Definition
// ============================================================================

/**
 * Comprehensive condition matrix for CRUD operations
 */
export const CRUD_CONDITION_MATRIX: ConditionEntry[] = [
  // -------------------------------------------------------------------------
  // CREATE Operations - Authenticated
  // -------------------------------------------------------------------------
  {
    scenarioId: "create_valid_authenticated",
    description: "Create resource with valid configuration when authenticated",
    authState: "authenticated",
    operation: "create",
    inputState: "valid",
    expectedStatus: 200,
    outcomeType: "api_response",
    expectedCharacteristics: {
      hasData: true,
      hasError: false,
    },
  },
  {
    scenarioId: "create_missing_required_authenticated",
    description: "Create resource missing required fields when authenticated",
    authState: "authenticated",
    operation: "create",
    inputState: "missing_required",
    expectedStatus: 400,
    outcomeType: "error",
    expectedCharacteristics: {
      hasError: true,
      errorCodePattern: "INVALID_ARGUMENT|VALIDATION_ERROR",
      errorMessagePattern: "required|missing",
    },
  },
  {
    scenarioId: "create_oneOf_conflict_authenticated",
    description: "Create resource with conflicting oneOf choices when authenticated",
    authState: "authenticated",
    operation: "create",
    inputState: "oneOf_conflict",
    expectedStatus: 400,
    outcomeType: "error",
    expectedCharacteristics: {
      hasError: true,
      errorMessagePattern: "mutually exclusive|oneOf|only one",
    },
  },
  {
    scenarioId: "create_invalid_type_authenticated",
    description: "Create resource with invalid field types when authenticated",
    authState: "authenticated",
    operation: "create",
    inputState: "invalid_type",
    expectedStatus: 400,
    outcomeType: "error",
    expectedCharacteristics: {
      hasError: true,
      errorMessagePattern: "type|invalid|expected",
    },
  },

  // -------------------------------------------------------------------------
  // GET Operations - Authenticated
  // -------------------------------------------------------------------------
  {
    scenarioId: "get_existing_authenticated",
    description: "Get existing resource when authenticated",
    authState: "authenticated",
    operation: "get",
    inputState: "valid",
    expectedStatus: 200,
    outcomeType: "api_response",
    expectedCharacteristics: {
      hasData: true,
      hasError: false,
    },
  },
  {
    scenarioId: "get_nonexistent_authenticated",
    description: "Get non-existent resource when authenticated",
    authState: "authenticated",
    operation: "get",
    inputState: "valid",
    expectedStatus: 404,
    outcomeType: "error",
    expectedCharacteristics: {
      hasError: true,
      errorCodePattern: "NOT_FOUND",
      errorMessagePattern: "not found|does not exist",
    },
  },

  // -------------------------------------------------------------------------
  // LIST Operations - Authenticated
  // -------------------------------------------------------------------------
  {
    scenarioId: "list_resources_authenticated",
    description: "List resources when authenticated",
    authState: "authenticated",
    operation: "list",
    inputState: "valid",
    expectedStatus: 200,
    outcomeType: "api_response",
    expectedCharacteristics: {
      hasData: true,
      hasError: false,
      minResults: 0,
    },
  },
  {
    scenarioId: "list_empty_namespace_authenticated",
    description: "List resources in empty namespace when authenticated",
    authState: "authenticated",
    operation: "list",
    inputState: "valid",
    expectedStatus: 200,
    outcomeType: "api_response",
    expectedCharacteristics: {
      hasData: true,
      hasError: false,
      minResults: 0,
    },
  },

  // -------------------------------------------------------------------------
  // UPDATE Operations - Authenticated
  // -------------------------------------------------------------------------
  {
    scenarioId: "update_existing_authenticated",
    description: "Update existing resource with valid data when authenticated",
    authState: "authenticated",
    operation: "update",
    inputState: "valid",
    expectedStatus: 200,
    outcomeType: "api_response",
    expectedCharacteristics: {
      hasData: true,
      hasError: false,
    },
  },
  {
    scenarioId: "update_nonexistent_authenticated",
    description: "Update non-existent resource when authenticated",
    authState: "authenticated",
    operation: "update",
    inputState: "valid",
    expectedStatus: 404,
    outcomeType: "error",
    expectedCharacteristics: {
      hasError: true,
      errorCodePattern: "NOT_FOUND",
    },
  },
  {
    scenarioId: "update_oneOf_conflict_authenticated",
    description: "Update resource with conflicting oneOf choices",
    authState: "authenticated",
    operation: "update",
    inputState: "oneOf_conflict",
    expectedStatus: 400,
    outcomeType: "error",
    expectedCharacteristics: {
      hasError: true,
      errorMessagePattern: "mutually exclusive|oneOf|only one",
    },
  },

  // -------------------------------------------------------------------------
  // DELETE Operations - Authenticated
  // -------------------------------------------------------------------------
  {
    scenarioId: "delete_existing_authenticated",
    description: "Delete existing resource when authenticated",
    authState: "authenticated",
    operation: "delete",
    inputState: "valid",
    expectedStatus: 200,
    outcomeType: "api_response",
    expectedCharacteristics: {
      hasData: true,
      hasError: false,
    },
  },
  {
    scenarioId: "delete_nonexistent_authenticated",
    description: "Delete non-existent resource when authenticated",
    authState: "authenticated",
    operation: "delete",
    inputState: "valid",
    expectedStatus: 404,
    outcomeType: "error",
    expectedCharacteristics: {
      hasError: true,
      errorCodePattern: "NOT_FOUND",
    },
  },

  // -------------------------------------------------------------------------
  // Authentication Errors
  // -------------------------------------------------------------------------
  {
    scenarioId: "any_operation_invalid_auth",
    description: "Any operation with invalid authentication",
    authState: "authenticated",
    operation: "create",
    inputState: "valid",
    expectedStatus: 401,
    outcomeType: "error",
    expectedCharacteristics: {
      hasError: true,
      errorCodePattern: "UNAUTHENTICATED|UNAUTHORIZED",
      errorMessagePattern: "authentication|unauthorized|invalid token",
    },
  },
  {
    scenarioId: "any_operation_forbidden",
    description: "Any operation with insufficient permissions",
    authState: "authenticated",
    operation: "create",
    inputState: "valid",
    expectedStatus: 403,
    outcomeType: "error",
    expectedCharacteristics: {
      hasError: true,
      errorCodePattern: "PERMISSION_DENIED|FORBIDDEN",
      errorMessagePattern: "permission|forbidden|access denied",
    },
  },

  // -------------------------------------------------------------------------
  // Documentation Mode Operations
  // -------------------------------------------------------------------------
  {
    scenarioId: "create_documentation_mode",
    description: "Create operation in documentation mode",
    authState: "documentation",
    operation: "create",
    inputState: "valid",
    expectedStatus: null,
    outcomeType: "documentation",
    expectedCharacteristics: {
      hasData: true,
      hasError: false,
      hasCurlExample: true,
      hasCliExample: true,
    },
  },
  {
    scenarioId: "get_documentation_mode",
    description: "Get operation in documentation mode",
    authState: "documentation",
    operation: "get",
    inputState: "valid",
    expectedStatus: null,
    outcomeType: "documentation",
    expectedCharacteristics: {
      hasData: true,
      hasError: false,
      hasCurlExample: true,
    },
  },
  {
    scenarioId: "list_documentation_mode",
    description: "List operation in documentation mode",
    authState: "documentation",
    operation: "list",
    inputState: "valid",
    expectedStatus: null,
    outcomeType: "documentation",
    expectedCharacteristics: {
      hasData: true,
      hasError: false,
      hasCurlExample: true,
    },
  },
  {
    scenarioId: "delete_documentation_mode",
    description: "Delete operation in documentation mode",
    authState: "documentation",
    operation: "delete",
    inputState: "valid",
    expectedStatus: null,
    outcomeType: "documentation",
    expectedCharacteristics: {
      hasData: true,
      hasError: false,
      hasCurlExample: true,
    },
  },

  // -------------------------------------------------------------------------
  // Validation Operations
  // -------------------------------------------------------------------------
  {
    scenarioId: "validate_valid_config",
    description: "Validate valid configuration",
    authState: "documentation",
    operation: "validate",
    inputState: "valid",
    expectedStatus: null,
    outcomeType: "validation_result",
    expectedCharacteristics: {
      hasError: false,
      hasWarnings: false,
      validationPassed: true,
    },
  },
  {
    scenarioId: "validate_missing_required",
    description: "Validate configuration missing required fields",
    authState: "documentation",
    operation: "validate",
    inputState: "missing_required",
    expectedStatus: null,
    outcomeType: "validation_result",
    expectedCharacteristics: {
      hasError: true,
      validationPassed: false,
      errorMessagePattern: "required|missing",
    },
  },
  {
    scenarioId: "validate_oneOf_conflict",
    description: "Validate configuration with oneOf conflict",
    authState: "documentation",
    operation: "validate",
    inputState: "oneOf_conflict",
    expectedStatus: null,
    outcomeType: "validation_result",
    expectedCharacteristics: {
      hasError: false,
      hasWarnings: true,
      validationPassed: false,
      warningMessagePattern: "mutually exclusive|oneOf|only one",
    },
  },
  {
    scenarioId: "validate_invalid_type",
    description: "Validate configuration with invalid field types",
    authState: "documentation",
    operation: "validate",
    inputState: "invalid_type",
    expectedStatus: null,
    outcomeType: "validation_result",
    expectedCharacteristics: {
      hasError: true,
      validationPassed: false,
      errorMessagePattern: "type|invalid|expected",
    },
  },

  // -------------------------------------------------------------------------
  // Search/Discovery Operations
  // -------------------------------------------------------------------------
  {
    scenarioId: "search_tools_valid",
    description: "Search for tools with valid query",
    authState: "documentation",
    operation: "search",
    inputState: "valid",
    expectedStatus: null,
    outcomeType: "search_results",
    expectedCharacteristics: {
      hasData: true,
      hasError: false,
      minResults: 1,
    },
  },
  {
    scenarioId: "search_tools_no_match",
    description: "Search for tools with no matching results",
    authState: "documentation",
    operation: "search",
    inputState: "valid",
    expectedStatus: null,
    outcomeType: "search_results",
    expectedCharacteristics: {
      hasData: true,
      hasError: false,
      minResults: 0,
    },
  },
  {
    scenarioId: "describe_tool_valid",
    description: "Describe existing tool",
    authState: "documentation",
    operation: "describe",
    inputState: "valid",
    expectedStatus: null,
    outcomeType: "api_response",
    expectedCharacteristics: {
      hasData: true,
      hasError: false,
    },
  },
  {
    scenarioId: "describe_tool_nonexistent",
    description: "Describe non-existent tool",
    authState: "documentation",
    operation: "describe",
    inputState: "valid",
    expectedStatus: null,
    outcomeType: "error",
    expectedCharacteristics: {
      hasError: true,
      errorMessagePattern: "not found|unknown tool",
    },
  },
];

// ============================================================================
// Lookup Functions
// ============================================================================

/**
 * Find condition entry by scenario ID
 */
export function findCondition(scenarioId: string): ConditionEntry | undefined {
  return CRUD_CONDITION_MATRIX.find((entry) => entry.scenarioId === scenarioId);
}

/**
 * Find all conditions matching criteria
 */
export function findConditions(criteria: {
  authState?: AuthState;
  operation?: CrudOperation;
  inputState?: InputState;
  outcomeType?: OutcomeType;
}): ConditionEntry[] {
  return CRUD_CONDITION_MATRIX.filter((entry) => {
    if (criteria.authState && entry.authState !== criteria.authState) return false;
    if (criteria.operation && entry.operation !== criteria.operation) return false;
    if (criteria.inputState && entry.inputState !== criteria.inputState) return false;
    if (criteria.outcomeType && entry.outcomeType !== criteria.outcomeType) return false;
    return true;
  });
}

/**
 * Get expected outcome for a specific scenario
 */
export function getExpectedOutcome(
  authState: AuthState,
  operation: CrudOperation,
  inputState: InputState
): ConditionEntry | undefined {
  return CRUD_CONDITION_MATRIX.find(
    (entry) =>
      entry.authState === authState &&
      entry.operation === operation &&
      entry.inputState === inputState
  );
}

// ============================================================================
// Healthcheck-Specific Conditions
// ============================================================================

/**
 * Healthcheck-specific oneOf field groups that are mutually exclusive
 */
export const HEALTHCHECK_ONEOF_GROUPS = {
  /** Host header choice - only one allowed */
  hostHeaderChoice: ["host_header", "use_origin_server_name"],
  /** Health check type choice */
  healthCheckType: ["http_health_check", "tcp_health_check"],
  /** TLS configuration choice */
  tlsChoice: ["use_tls", "no_tls"],
} as const;

/**
 * Required fields for healthcheck creation
 */
export const HEALTHCHECK_REQUIRED_FIELDS = {
  pathParams: ["namespace", "name"],
  body: [], // Most body fields have defaults
} as const;

/**
 * Healthcheck field default values
 */
export const HEALTHCHECK_DEFAULTS = {
  timeout: 3,
  interval: 15,
  unhealthy_threshold: 3,
  healthy_threshold: 1,
  jitter_percent: 25,
} as const;
