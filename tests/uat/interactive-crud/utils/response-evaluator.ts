/**
 * Response Evaluator
 *
 * Evaluates API responses against expected conditions from the condition matrix.
 * Uses type guards and pattern matching to determine if responses meet expectations.
 */

import type {
  ConditionEntry,
  ExpectedCharacteristics,
  OutcomeType,
} from "../matrix/crud-condition-matrix.js";
import type { PredictedOutcome } from "./condition-matrix.js";

// ============================================================================
// Types
// ============================================================================

/**
 * Result of evaluating a response against expected conditions
 */
export interface EvaluationResult {
  /** Whether the response matches expectations */
  passed: boolean;
  /** Scenario ID that was evaluated */
  scenarioId: string;
  /** Expected outcome type */
  expectedOutcome: OutcomeType;
  /** Actual outcome type detected */
  actualOutcome: OutcomeType;
  /** Individual check results */
  checks: CheckResult[];
  /** Summary of failures */
  failures: string[];
  /** Additional context */
  context: EvaluationContext;
}

/**
 * Result of an individual check
 */
export interface CheckResult {
  /** Check name */
  name: string;
  /** Whether check passed */
  passed: boolean;
  /** Expected value */
  expected: unknown;
  /** Actual value */
  actual: unknown;
  /** Failure message if applicable */
  message?: string;
}

/**
 * Context for evaluation
 */
export interface EvaluationContext {
  /** Response HTTP status code */
  statusCode?: number;
  /** Response has data */
  hasData: boolean;
  /** Response has error */
  hasError: boolean;
  /** Response has warnings */
  hasWarnings: boolean;
  /** Response has curl example */
  hasCurlExample: boolean;
  /** Response has CLI example */
  hasCliExample: boolean;
  /** Number of results (for list/search) */
  resultCount?: number;
  /** Validation result */
  validationPassed?: boolean;
  /** Error code if present */
  errorCode?: string;
  /** Error message if present */
  errorMessage?: string;
  /** Warning messages */
  warnings?: string[];
}

/**
 * Generic API response type
 */
export interface ApiResponse {
  success?: boolean;
  data?: unknown;
  error?: ApiError;
  statusCode?: number;
  // Tool execution results
  mode?: "authenticated" | "documentation";
  curl?: string;
  cli?: string;
  // Validation results
  valid?: boolean;
  errors?: Array<{ message: string; path?: string }>;
  warnings?: Array<{ message: string; path?: string }>;
  appliedDefaults?: unknown[];
}

/**
 * API error type
 */
export interface ApiError {
  code?: string;
  message?: string;
  details?: unknown;
}

/**
 * Search result type
 */
export interface SearchResult {
  toolName: string;
  score: number;
  matchedTerms?: string[];
}

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Check if response is an API response with data
 */
export function isApiResponse(response: unknown): response is ApiResponse {
  if (!response || typeof response !== "object") return false;
  const r = response as Record<string, unknown>;
  return r.success !== undefined || r.data !== undefined || r.statusCode !== undefined;
}

/**
 * Check if response is an error response
 */
export function isErrorResponse(
  response: unknown
): response is { error: ApiError } {
  if (!response || typeof response !== "object") return false;
  const r = response as Record<string, unknown>;
  return r.error !== undefined && typeof r.error === "object";
}

/**
 * Check if response is a documentation response
 */
export function isDocumentationResponse(
  response: unknown
): response is ApiResponse & { mode: "documentation" } {
  if (!isApiResponse(response)) return false;
  return response.mode === "documentation";
}

/**
 * Check if response is a validation result
 */
export function isValidationResult(
  response: unknown
): response is ApiResponse & { valid: boolean } {
  if (!response || typeof response !== "object") return false;
  const r = response as Record<string, unknown>;
  return r.valid !== undefined && typeof r.valid === "boolean";
}

/**
 * Check if response is a search result array
 */
export function isSearchResults(response: unknown): response is SearchResult[] {
  if (!Array.isArray(response)) return false;
  if (response.length === 0) return true;
  const first = response[0];
  return (
    typeof first === "object" &&
    first !== null &&
    "toolName" in first &&
    "score" in first
  );
}

// ============================================================================
// Response Evaluation
// ============================================================================

/**
 * Evaluate a response against a predicted outcome
 */
export function evaluateResponse(
  response: unknown,
  predicted: PredictedOutcome
): EvaluationResult {
  const context = extractContext(response);
  const actualOutcome = detectOutcomeType(response, context);
  const checks: CheckResult[] = [];
  const failures: string[] = [];

  const { condition } = predicted;
  const { expectedCharacteristics } = condition;

  // Check outcome type
  const outcomeCheck = checkOutcomeType(actualOutcome, condition.outcomeType);
  checks.push(outcomeCheck);
  if (!outcomeCheck.passed) {
    failures.push(outcomeCheck.message!);
  }

  // Check status code (if expected)
  if (condition.expectedStatus !== null) {
    const statusCheck = checkStatusCode(context.statusCode, condition.expectedStatus);
    checks.push(statusCheck);
    if (!statusCheck.passed) {
      failures.push(statusCheck.message!);
    }
  }

  // Check expected characteristics
  if (expectedCharacteristics) {
    const charChecks = checkCharacteristics(context, expectedCharacteristics);
    checks.push(...charChecks);
    for (const check of charChecks) {
      if (!check.passed && check.message) {
        failures.push(check.message);
      }
    }
  }

  return {
    passed: failures.length === 0,
    scenarioId: condition.scenarioId,
    expectedOutcome: condition.outcomeType,
    actualOutcome,
    checks,
    failures,
    context,
  };
}

/**
 * Extract evaluation context from response
 */
export function extractContext(response: unknown): EvaluationContext {
  const context: EvaluationContext = {
    hasData: false,
    hasError: false,
    hasWarnings: false,
    hasCurlExample: false,
    hasCliExample: false,
  };

  if (!response || typeof response !== "object") {
    return context;
  }

  const r = response as Record<string, unknown>;

  // Status code
  if (typeof r.statusCode === "number") {
    context.statusCode = r.statusCode;
  }

  // Data presence
  context.hasData =
    r.data !== undefined ||
    r.success === true ||
    (Array.isArray(r) && r.length > 0);

  // Error detection
  if (r.error && typeof r.error === "object") {
    context.hasError = true;
    const err = r.error as Record<string, unknown>;
    context.errorCode = err.code as string | undefined;
    context.errorMessage = err.message as string | undefined;
  } else if (r.success === false) {
    context.hasError = true;
  }

  // Warnings
  if (Array.isArray(r.warnings) && r.warnings.length > 0) {
    context.hasWarnings = true;
    context.warnings = r.warnings.map((w) =>
      typeof w === "string" ? w : (w as { message?: string }).message || String(w)
    );
  }

  // Documentation examples
  context.hasCurlExample = typeof r.curl === "string" && r.curl.length > 0;
  context.hasCliExample = typeof r.cli === "string" && r.cli.length > 0;

  // Result count for arrays
  if (Array.isArray(r.data)) {
    context.resultCount = r.data.length;
  } else if (Array.isArray(r)) {
    context.resultCount = r.length;
  }

  // Validation result
  if (typeof r.valid === "boolean") {
    context.validationPassed = r.valid;
  }

  return context;
}

/**
 * Detect the outcome type from response
 */
export function detectOutcomeType(
  response: unknown,
  context: EvaluationContext
): OutcomeType {
  // Error response
  if (context.hasError) {
    return "error";
  }

  // Documentation response
  if (isDocumentationResponse(response)) {
    return "documentation";
  }

  // Validation result
  if (isValidationResult(response)) {
    return "validation_result";
  }

  // Search results
  if (isSearchResults(response)) {
    return "search_results";
  }

  // Warning (validation with warnings but no errors)
  if (context.hasWarnings && !context.hasError) {
    return "warning";
  }

  // API response with data
  if (context.hasData) {
    return "api_response";
  }

  // Default to error if nothing matches
  return "error";
}

// ============================================================================
// Individual Checks
// ============================================================================

/**
 * Check if outcome type matches expected
 */
function checkOutcomeType(
  actual: OutcomeType,
  expected: OutcomeType
): CheckResult {
  const passed = actual === expected;
  return {
    name: "outcome_type",
    passed,
    expected,
    actual,
    message: passed
      ? undefined
      : `Expected outcome type '${expected}' but got '${actual}'`,
  };
}

/**
 * Check if status code matches expected
 */
function checkStatusCode(
  actual: number | undefined,
  expected: number
): CheckResult {
  const passed = actual === expected;
  return {
    name: "status_code",
    passed,
    expected,
    actual,
    message: passed
      ? undefined
      : `Expected status code ${expected} but got ${actual ?? "undefined"}`,
  };
}

/**
 * Check expected characteristics against context
 */
function checkCharacteristics(
  context: EvaluationContext,
  expected: ExpectedCharacteristics
): CheckResult[] {
  const checks: CheckResult[] = [];

  // Has data
  if (expected.hasData !== undefined) {
    checks.push({
      name: "has_data",
      passed: context.hasData === expected.hasData,
      expected: expected.hasData,
      actual: context.hasData,
      message:
        context.hasData !== expected.hasData
          ? `Expected hasData=${expected.hasData} but got ${context.hasData}`
          : undefined,
    });
  }

  // Has error
  if (expected.hasError !== undefined) {
    checks.push({
      name: "has_error",
      passed: context.hasError === expected.hasError,
      expected: expected.hasError,
      actual: context.hasError,
      message:
        context.hasError !== expected.hasError
          ? `Expected hasError=${expected.hasError} but got ${context.hasError}`
          : undefined,
    });
  }

  // Has warnings
  if (expected.hasWarnings !== undefined) {
    checks.push({
      name: "has_warnings",
      passed: context.hasWarnings === expected.hasWarnings,
      expected: expected.hasWarnings,
      actual: context.hasWarnings,
      message:
        context.hasWarnings !== expected.hasWarnings
          ? `Expected hasWarnings=${expected.hasWarnings} but got ${context.hasWarnings}`
          : undefined,
    });
  }

  // Error code pattern
  if (expected.errorCodePattern && context.errorCode) {
    const pattern = new RegExp(expected.errorCodePattern, "i");
    const passed = pattern.test(context.errorCode);
    checks.push({
      name: "error_code_pattern",
      passed,
      expected: expected.errorCodePattern,
      actual: context.errorCode,
      message: passed
        ? undefined
        : `Error code '${context.errorCode}' does not match pattern '${expected.errorCodePattern}'`,
    });
  }

  // Error message pattern
  if (expected.errorMessagePattern && context.errorMessage) {
    const pattern = new RegExp(expected.errorMessagePattern, "i");
    const passed = pattern.test(context.errorMessage);
    checks.push({
      name: "error_message_pattern",
      passed,
      expected: expected.errorMessagePattern,
      actual: context.errorMessage,
      message: passed
        ? undefined
        : `Error message '${context.errorMessage}' does not match pattern '${expected.errorMessagePattern}'`,
    });
  }

  // Warning message pattern
  if (expected.warningMessagePattern && context.warnings) {
    const pattern = new RegExp(expected.warningMessagePattern, "i");
    const hasMatch = context.warnings.some((w) => pattern.test(w));
    checks.push({
      name: "warning_message_pattern",
      passed: hasMatch,
      expected: expected.warningMessagePattern,
      actual: context.warnings,
      message: hasMatch
        ? undefined
        : `No warning matches pattern '${expected.warningMessagePattern}'`,
    });
  }

  // Has curl example
  if (expected.hasCurlExample !== undefined) {
    checks.push({
      name: "has_curl_example",
      passed: context.hasCurlExample === expected.hasCurlExample,
      expected: expected.hasCurlExample,
      actual: context.hasCurlExample,
      message:
        context.hasCurlExample !== expected.hasCurlExample
          ? `Expected hasCurlExample=${expected.hasCurlExample} but got ${context.hasCurlExample}`
          : undefined,
    });
  }

  // Has CLI example
  if (expected.hasCliExample !== undefined) {
    checks.push({
      name: "has_cli_example",
      passed: context.hasCliExample === expected.hasCliExample,
      expected: expected.hasCliExample,
      actual: context.hasCliExample,
      message:
        context.hasCliExample !== expected.hasCliExample
          ? `Expected hasCliExample=${expected.hasCliExample} but got ${context.hasCliExample}`
          : undefined,
    });
  }

  // Minimum results
  if (expected.minResults !== undefined && context.resultCount !== undefined) {
    const passed = context.resultCount >= expected.minResults;
    checks.push({
      name: "min_results",
      passed,
      expected: expected.minResults,
      actual: context.resultCount,
      message: passed
        ? undefined
        : `Expected at least ${expected.minResults} results but got ${context.resultCount}`,
    });
  }

  // Validation passed
  if (expected.validationPassed !== undefined) {
    const passed = context.validationPassed === expected.validationPassed;
    checks.push({
      name: "validation_passed",
      passed,
      expected: expected.validationPassed,
      actual: context.validationPassed,
      message: passed
        ? undefined
        : `Expected validation ${expected.validationPassed ? "to pass" : "to fail"} but it ${context.validationPassed ? "passed" : "failed"}`,
    });
  }

  return checks;
}

// ============================================================================
// Evaluation Helpers
// ============================================================================

/**
 * Create a simple evaluation for quick checks
 */
export function quickEvaluate(
  response: unknown,
  expectations: {
    shouldSucceed?: boolean;
    expectedStatus?: number;
    shouldHaveData?: boolean;
    shouldHaveError?: boolean;
  }
): { passed: boolean; reason: string } {
  const context = extractContext(response);

  if (expectations.shouldSucceed !== undefined) {
    const hasSuccess = context.hasData && !context.hasError;
    if (hasSuccess !== expectations.shouldSucceed) {
      return {
        passed: false,
        reason: `Expected ${expectations.shouldSucceed ? "success" : "failure"} but got ${hasSuccess ? "success" : "failure"}`,
      };
    }
  }

  if (expectations.expectedStatus !== undefined) {
    if (context.statusCode !== expectations.expectedStatus) {
      return {
        passed: false,
        reason: `Expected status ${expectations.expectedStatus} but got ${context.statusCode}`,
      };
    }
  }

  if (expectations.shouldHaveData !== undefined) {
    if (context.hasData !== expectations.shouldHaveData) {
      return {
        passed: false,
        reason: `Expected hasData=${expectations.shouldHaveData} but got ${context.hasData}`,
      };
    }
  }

  if (expectations.shouldHaveError !== undefined) {
    if (context.hasError !== expectations.shouldHaveError) {
      return {
        passed: false,
        reason: `Expected hasError=${expectations.shouldHaveError} but got ${context.hasError}`,
      };
    }
  }

  return { passed: true, reason: "All expectations met" };
}

/**
 * Format evaluation result for test output
 */
export function formatEvaluationResult(result: EvaluationResult): string {
  const lines: string[] = [];

  lines.push(`Scenario: ${result.scenarioId}`);
  lines.push(`Status: ${result.passed ? "PASSED" : "FAILED"}`);
  lines.push(`Expected outcome: ${result.expectedOutcome}`);
  lines.push(`Actual outcome: ${result.actualOutcome}`);

  if (result.failures.length > 0) {
    lines.push("\nFailures:");
    for (const failure of result.failures) {
      lines.push(`  - ${failure}`);
    }
  }

  lines.push("\nChecks:");
  for (const check of result.checks) {
    const status = check.passed ? "✓" : "✗";
    lines.push(`  ${status} ${check.name}: expected=${JSON.stringify(check.expected)}, actual=${JSON.stringify(check.actual)}`);
  }

  return lines.join("\n");
}
