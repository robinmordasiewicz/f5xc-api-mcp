/**
 * Condition Matrix Utilities
 *
 * Helper functions for working with the CRUD condition matrix,
 * including scenario lookup, outcome prediction, and matrix validation.
 */

import {
  type ConditionEntry,
  type AuthState,
  type CrudOperation,
  type InputState,
  type OutcomeType,
  CRUD_CONDITION_MATRIX,
  findCondition,
  findConditions,
  getExpectedOutcome,
  HEALTHCHECK_ONEOF_GROUPS,
  HEALTHCHECK_REQUIRED_FIELDS,
  HEALTHCHECK_DEFAULTS,
} from "../matrix/crud-condition-matrix.js";
import type { ParsedPrompt } from "./prompt-parser.js";

// ============================================================================
// Types
// ============================================================================

/**
 * Scenario context for condition lookup
 */
export interface ScenarioContext {
  /** Authentication state */
  authState: AuthState;
  /** CRUD operation */
  operation: CrudOperation;
  /** Input validity state */
  inputState: InputState;
  /** Resource exists (for get/update/delete) */
  resourceExists?: boolean;
  /** Has oneOf conflict */
  hasOneOfConflict?: boolean;
  /** Missing required fields */
  missingRequired?: string[];
}

/**
 * Predicted outcome based on scenario context
 */
export interface PredictedOutcome {
  /** Expected condition entry */
  condition: ConditionEntry;
  /** Confidence in prediction (0-1) */
  confidence: number;
  /** Rationale for the prediction */
  rationale: string;
}

/**
 * Validation result for input data against condition matrix
 */
export interface InputValidationResult {
  /** Whether input is valid */
  isValid: boolean;
  /** Detected input state */
  inputState: InputState;
  /** Validation messages */
  messages: string[];
  /** Fields with issues */
  problemFields: string[];
}

// ============================================================================
// Scenario Context Building
// ============================================================================

/**
 * Build scenario context from parsed prompt and configuration
 */
export function buildScenarioContext(
  parsed: ParsedPrompt,
  options: {
    isAuthenticated?: boolean;
    resourceExists?: boolean;
    config?: Record<string, unknown>;
  } = {}
): ScenarioContext {
  const { isAuthenticated = false, resourceExists, config } = options;

  // Determine auth state
  const authState: AuthState = isAuthenticated ? "authenticated" : "documentation";

  // Map operation type
  const operation = mapOperationType(parsed.operation);

  // Determine input state
  const inputState = determineInputState(parsed, config);

  // Check for oneOf conflicts
  const hasOneOfConflict = checkOneOfConflict(parsed, config);

  return {
    authState,
    operation,
    inputState,
    resourceExists,
    hasOneOfConflict,
  };
}

/**
 * Map prompt operation type to CRUD operation
 */
function mapOperationType(
  promptOperation: string
): CrudOperation {
  const mapping: Record<string, CrudOperation> = {
    create: "create",
    get: "get",
    list: "list",
    update: "update",
    delete: "delete",
    validate: "validate",
    search: "search",
    describe: "describe",
    help: "search",
  };

  return mapping[promptOperation] || "search";
}

/**
 * Determine the input state based on parsed prompt and config
 */
function determineInputState(
  parsed: ParsedPrompt,
  config?: Record<string, unknown>
): InputState {
  // If no config provided, check parsed values
  if (!config) {
    // Check for oneOf conflicts in parsed values
    if (hasOneOfConflictInValues(parsed.extractedValues)) {
      return "oneOf_conflict";
    }

    // Check for missing required values based on operation
    if (parsed.operation === "create" || parsed.operation === "update") {
      if (!parsed.extractedValues.name) {
        return "missing_required";
      }
    }

    return "valid";
  }

  // Validate config against schema
  const validation = validateHealthcheckConfig(config);
  return validation.inputState;
}

/**
 * Check for oneOf conflicts in extracted values
 */
function hasOneOfConflictInValues(
  values: Record<string, unknown>
): boolean {
  // Check host_header_choice group
  const hasHostHeader = values.hostHeader !== undefined;
  const hasUseOrigin = values.useOriginServerName !== undefined;

  if (hasHostHeader && hasUseOrigin) {
    return true;
  }

  return false;
}

/**
 * Check for oneOf conflicts in config
 */
function checkOneOfConflict(
  parsed: ParsedPrompt,
  config?: Record<string, unknown>
): boolean {
  // Check parsed values
  if (hasOneOfConflictInValues(parsed.extractedValues)) {
    return true;
  }

  // Check config if provided
  if (config) {
    const spec = config.spec as Record<string, unknown> | undefined;
    if (spec) {
      for (const [groupName, fields] of Object.entries(HEALTHCHECK_ONEOF_GROUPS)) {
        const presentFields = fields.filter((field) => spec[field] !== undefined);
        if (presentFields.length > 1) {
          return true;
        }
      }
    }
  }

  return false;
}

// ============================================================================
// Outcome Prediction
// ============================================================================

/**
 * Predict the expected outcome for a scenario
 */
export function predictOutcome(context: ScenarioContext): PredictedOutcome {
  // Handle special cases first

  // Non-existent resource for get/update/delete
  if (
    context.resourceExists === false &&
    ["get", "update", "delete"].includes(context.operation)
  ) {
    const condition = findCondition(`${context.operation}_nonexistent_authenticated`);
    if (condition) {
      return {
        condition,
        confidence: 0.95,
        rationale: `Resource does not exist for ${context.operation} operation`,
      };
    }
  }

  // OneOf conflict
  if (context.hasOneOfConflict) {
    const scenarioId =
      context.operation === "validate"
        ? "validate_oneOf_conflict"
        : `${context.operation}_oneOf_conflict_authenticated`;

    const condition = findCondition(scenarioId);
    if (condition) {
      return {
        condition,
        confidence: 0.9,
        rationale: "OneOf conflict detected in input",
      };
    }
  }

  // Standard lookup
  const condition = getExpectedOutcome(
    context.authState,
    context.operation,
    context.inputState
  );

  if (condition) {
    return {
      condition,
      confidence: 0.85,
      rationale: `Standard ${context.operation} operation in ${context.authState} mode`,
    };
  }

  // Fallback to documentation mode for unmatched scenarios
  const docCondition = findCondition(`${context.operation}_documentation_mode`);
  if (docCondition) {
    return {
      condition: docCondition,
      confidence: 0.6,
      rationale: "Fallback to documentation mode",
    };
  }

  // Ultimate fallback
  return {
    condition: {
      scenarioId: "fallback",
      description: "No matching condition found",
      authState: context.authState,
      operation: context.operation,
      inputState: context.inputState,
      expectedStatus: null,
      outcomeType: "error",
      expectedCharacteristics: {
        hasError: true,
      },
    },
    confidence: 0.3,
    rationale: "No matching condition in matrix",
  };
}

/**
 * Get all applicable conditions for a scenario
 */
export function getApplicableConditions(
  context: Partial<ScenarioContext>
): ConditionEntry[] {
  return findConditions({
    authState: context.authState,
    operation: context.operation,
    inputState: context.inputState,
  });
}

// ============================================================================
// Input Validation
// ============================================================================

/**
 * Validate healthcheck configuration against expected schema
 */
export function validateHealthcheckConfig(
  config: Record<string, unknown>
): InputValidationResult {
  const messages: string[] = [];
  const problemFields: string[] = [];

  // Check metadata
  const metadata = config.metadata as Record<string, unknown> | undefined;
  if (!metadata?.name) {
    messages.push("Missing required field: metadata.name");
    problemFields.push("metadata.name");
  }

  // Check spec
  const spec = config.spec as Record<string, unknown> | undefined;
  if (spec) {
    // Check for oneOf conflicts
    for (const [groupName, fields] of Object.entries(HEALTHCHECK_ONEOF_GROUPS)) {
      const presentFields = fields.filter((field) => spec[field] !== undefined);
      if (presentFields.length > 1) {
        messages.push(
          `OneOf conflict in ${groupName}: ${presentFields.join(", ")} are mutually exclusive`
        );
        problemFields.push(...presentFields);
      }
    }

    // Check for invalid types
    if (spec.timeout !== undefined && typeof spec.timeout !== "number") {
      messages.push("Invalid type for timeout: expected number");
      problemFields.push("timeout");
    }

    if (spec.interval !== undefined && typeof spec.interval !== "number") {
      messages.push("Invalid type for interval: expected number");
      problemFields.push("interval");
    }
  }

  // Determine input state
  let inputState: InputState = "valid";

  if (problemFields.some((f) => HEALTHCHECK_ONEOF_GROUPS.hostHeaderChoice.some((g) => f.includes(g)))) {
    inputState = "oneOf_conflict";
  } else if (problemFields.some((f) => f.includes("required") || f === "metadata.name")) {
    inputState = "missing_required";
  } else if (problemFields.some((f) => messages.some((m) => m.includes("Invalid type")))) {
    inputState = "invalid_type";
  }

  return {
    isValid: messages.length === 0,
    inputState,
    messages,
    problemFields,
  };
}

// ============================================================================
// Matrix Analysis
// ============================================================================

/**
 * Get coverage statistics for the condition matrix
 */
export function getMatrixCoverage(): {
  totalConditions: number;
  byAuthState: Record<AuthState, number>;
  byOperation: Record<CrudOperation, number>;
  byInputState: Record<InputState, number>;
  byOutcomeType: Record<OutcomeType, number>;
} {
  const byAuthState: Record<AuthState, number> = {
    authenticated: 0,
    documentation: 0,
    unauthenticated: 0,
  };

  const byOperation: Record<CrudOperation, number> = {
    create: 0,
    get: 0,
    list: 0,
    update: 0,
    delete: 0,
    validate: 0,
    search: 0,
    describe: 0,
  };

  const byInputState: Record<InputState, number> = {
    valid: 0,
    missing_required: 0,
    invalid_type: 0,
    oneOf_conflict: 0,
    unknown_field: 0,
    empty: 0,
    malformed: 0,
  };

  const byOutcomeType: Record<OutcomeType, number> = {
    api_response: 0,
    validation_result: 0,
    documentation: 0,
    error: 0,
    warning: 0,
    search_results: 0,
  };

  for (const condition of CRUD_CONDITION_MATRIX) {
    byAuthState[condition.authState]++;
    byOperation[condition.operation]++;
    byInputState[condition.inputState]++;
    byOutcomeType[condition.outcomeType]++;
  }

  return {
    totalConditions: CRUD_CONDITION_MATRIX.length,
    byAuthState,
    byOperation,
    byInputState,
    byOutcomeType,
  };
}

/**
 * Find gaps in the condition matrix
 */
export function findMatrixGaps(): {
  missingScenarios: Array<{
    authState: AuthState;
    operation: CrudOperation;
    inputState: InputState;
    description: string;
  }>;
} {
  const missingScenarios: Array<{
    authState: AuthState;
    operation: CrudOperation;
    inputState: InputState;
    description: string;
  }> = [];

  const authStates: AuthState[] = ["authenticated", "documentation"];
  const operations: CrudOperation[] = ["create", "get", "list", "update", "delete"];
  const inputStates: InputState[] = ["valid", "missing_required", "oneOf_conflict"];

  for (const authState of authStates) {
    for (const operation of operations) {
      for (const inputState of inputStates) {
        const existing = getExpectedOutcome(authState, operation, inputState);
        if (!existing) {
          missingScenarios.push({
            authState,
            operation,
            inputState,
            description: `${operation} with ${inputState} input in ${authState} mode`,
          });
        }
      }
    }
  }

  return { missingScenarios };
}

// ============================================================================
// Healthcheck-Specific Helpers
// ============================================================================

/**
 * Get oneOf groups for healthcheck
 */
export function getHealthcheckOneOfGroups(): typeof HEALTHCHECK_ONEOF_GROUPS {
  return HEALTHCHECK_ONEOF_GROUPS;
}

/**
 * Get required fields for healthcheck
 */
export function getHealthcheckRequiredFields(): typeof HEALTHCHECK_REQUIRED_FIELDS {
  return HEALTHCHECK_REQUIRED_FIELDS;
}

/**
 * Get default values for healthcheck
 */
export function getHealthcheckDefaults(): typeof HEALTHCHECK_DEFAULTS {
  return HEALTHCHECK_DEFAULTS;
}

/**
 * Check if fields are in the same oneOf group
 */
export function areFieldsMutuallyExclusive(
  field1: string,
  field2: string
): boolean {
  for (const fields of Object.values(HEALTHCHECK_ONEOF_GROUPS)) {
    if (fields.includes(field1 as typeof fields[number]) &&
        fields.includes(field2 as typeof fields[number])) {
      return true;
    }
  }
  return false;
}
