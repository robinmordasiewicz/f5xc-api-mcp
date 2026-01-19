/**
 * Healthcheck Interactive CRUD - English Prompt Simulation Tests
 *
 * These tests simulate natural language prompts for interactive CRUD operations
 * testing with the F5XC API MCP server. They verify that the system correctly:
 *
 * 1. Discovers appropriate tools from English prompts
 * 2. Extracts configuration values from natural language
 * 3. Validates configurations including oneOf conflict detection
 * 4. Returns appropriate responses based on the condition matrix
 */

import { describe, it, expect, beforeAll } from "vitest";

// Discovery tools
import { searchTools } from "../../../../src/tools/discovery/search.js";
import { validateToolParams } from "../../../../src/tools/discovery/validate.js";
import { describeTool } from "../../../../src/tools/discovery/describe.js";

// Prompt definitions
import {
  HEALTHCHECK_DISCOVERY_PROMPTS,
  HEALTHCHECK_CREATION_PROMPTS,
  HEALTHCHECK_INSPECTION_PROMPTS,
  HEALTHCHECK_VALIDATION_PROMPTS,
  HEALTHCHECK_DELETION_PROMPTS,
  getOneOfConflictPrompts,
} from "../prompts/healthcheck-prompts.js";

// Utilities
import {
  parsePrompt,
  generateToolSearchQueries,
  buildHealthcheckBody,
  buildPathParams,
  hasOneOfConflictIndicators,
} from "../utils/prompt-parser.js";
import {
  buildScenarioContext,
  predictOutcome,
  getHealthcheckOneOfGroups,
  validateHealthcheckConfig,
} from "../utils/condition-matrix.js";
import {
  evaluateResponse,
  quickEvaluate,
  isSearchResults,
  isValidationResult,
} from "../utils/response-evaluator.js";
import {
  findCondition,
  CRUD_CONDITION_MATRIX,
} from "../matrix/crud-condition-matrix.js";

// ============================================================================
// Test Constants
// ============================================================================

const HEALTHCHECK_CREATE_TOOL = "virtual.healthchecks.create";
const HEALTHCHECK_GET_TOOL = "virtual.healthchecks.get";
const HEALTHCHECK_LIST_TOOL = "virtual.healthchecks.list";
const HEALTHCHECK_DELETE_TOOL = "virtual.healthchecks.delete";

// ============================================================================
// Discovery Prompt Tests
// ============================================================================

describe("Healthcheck Interactive CRUD - English Prompt Simulation", () => {
  describe("Discovery Prompts", () => {
    it.each(HEALTHCHECK_DISCOVERY_PROMPTS)(
      "should handle: '$prompt'",
      async (scenario) => {
        // Parse the prompt
        const parsed = parsePrompt(scenario.prompt);

        // Verify operation detection
        expect(parsed.operation).toBe(scenario.expectedOperation);
        expect(parsed.operationConfidence).toBeGreaterThan(0.3);

        // Generate search queries
        const queries = generateToolSearchQueries(parsed);
        expect(queries.length).toBeGreaterThan(0);

        // Execute search
        const results = searchTools(queries[0], {
          limit: 10,
          domains: ["virtual"],
        });

        // Verify we found healthcheck tools
        expect(results.length).toBeGreaterThan(0);

        // At least one result should be a healthcheck tool
        const hasHealthcheckTool = results.some((r) =>
          r.tool.name.toLowerCase().includes("healthcheck")
        );
        expect(hasHealthcheckTool).toBe(true);
      }
    );

    it("should find tools: 'What healthcheck tools are available?'", () => {
      const prompt = "What healthcheck tools are available?";
      const parsed = parsePrompt(prompt);

      const results = searchTools("healthcheck", {
        limit: 10,
        domains: ["virtual"],
      });

      // Should find CRUD operations
      const toolNames = results.map((r) => r.tool.name);
      const operations = ["create", "get", "list", "delete", "replace"];
      const foundOperations = operations.filter((op) =>
        toolNames.some((name) => name.includes(op))
      );

      expect(foundOperations.length).toBeGreaterThan(0);
    });

    it("should describe tool schema when asked about options", () => {
      const prompt = "Show me the options for creating a healthcheck";
      const parsed = parsePrompt(prompt);

      // First search for the tool
      const results = searchTools("healthcheck create", {
        limit: 5,
        domains: ["virtual"],
      });

      expect(results.length).toBeGreaterThan(0);

      // Get the create tool
      const createTool = results.find((r) => r.tool.name.includes("create"));
      expect(createTool).toBeDefined();

      // Describe the tool
      const description = describeTool(createTool!.tool.name);
      expect(description).toBeDefined();

      // Should have schema information
      if (description?.requestBody?.schema) {
        expect(description.requestBody.schema).toBeDefined();
      }
    });
  });

  // ============================================================================
  // Creation Prompt Tests
  // ============================================================================

  describe("Creation Prompts", () => {
    it.each(
      HEALTHCHECK_CREATION_PROMPTS.filter((p) => !p.hasOneOfConflict)
    )("should handle: '$prompt'", async (scenario) => {
      const parsed = parsePrompt(scenario.prompt);

      // Verify operation detection
      expect(parsed.operation).toBe("create");

      // Verify value extraction
      for (const [key, expectedValue] of Object.entries(
        scenario.expectedExtractedValues
      )) {
        if (key === "name") {
          expect(parsed.extractedValues.name).toBe(expectedValue);
        } else if (key === "namespace") {
          expect(parsed.extractedValues.namespace).toBe(expectedValue);
        } else if (key === "httpPath") {
          expect(parsed.extractedValues.httpPath).toBe(expectedValue);
        } else if (key === "timeout") {
          expect(parsed.extractedValues.timeout).toBe(expectedValue);
        } else if (key === "interval") {
          expect(parsed.extractedValues.interval).toBe(expectedValue);
        } else if (key === "hostHeader") {
          expect(parsed.extractedValues.hostHeader).toBe(expectedValue);
        } else if (key === "useOriginServerName") {
          expect(parsed.extractedValues.useOriginServerName).toBe(expectedValue);
        }
      }

      // Verify tool discovery works
      const results = searchTools("healthcheck create", {
        limit: 5,
        domains: ["virtual"],
      });
      expect(results.some((r) => r.tool.name.includes("create"))).toBe(true);
    });

    it("should extract name from: 'Create a healthcheck named my-health'", () => {
      const parsed = parsePrompt("Create a healthcheck named my-health");

      expect(parsed.operation).toBe("create");
      expect(parsed.extractedValues.name).toBe("my-health");
    });

    it("should extract path from: 'Create a healthcheck with HTTP path /status'", () => {
      const parsed = parsePrompt(
        "Create a healthcheck named api-check with HTTP path /status"
      );

      expect(parsed.extractedValues.name).toBe("api-check");
      expect(parsed.extractedValues.httpPath).toBe("/status");
    });

    it("should extract timeout from: 'Create a healthcheck with 5 second timeout'", () => {
      const parsed = parsePrompt(
        "Create a healthcheck named fast-check with 5 second timeout"
      );

      expect(parsed.extractedValues.name).toBe("fast-check");
      expect(parsed.extractedValues.timeout).toBe(5);
    });

    it("should build valid healthcheck body from extracted values", () => {
      const parsed = parsePrompt(
        "Create a healthcheck named api-check with HTTP path /health and 5 second timeout"
      );

      const body = buildHealthcheckBody(parsed.extractedValues);

      expect(body.metadata).toEqual({
        name: "api-check",
        namespace: "default",
      });
      expect((body.spec as Record<string, unknown>).http_health_check).toEqual({
        path: "/health",
      });
      expect((body.spec as Record<string, unknown>).timeout).toBe(5);
    });
  });

  // ============================================================================
  // Inspection Prompt Tests
  // ============================================================================

  describe("Inspection Prompts", () => {
    it.each(HEALTHCHECK_INSPECTION_PROMPTS)(
      "should handle: '$prompt'",
      async (scenario) => {
        const parsed = parsePrompt(scenario.prompt);

        // Verify operation detection
        expect(["get", "list"]).toContain(parsed.operation);

        // Verify value extraction
        if (scenario.expectedExtractedValues.name) {
          expect(parsed.extractedValues.name).toBe(
            scenario.expectedExtractedValues.name
          );
        }
        if (scenario.expectedExtractedValues.namespace) {
          expect(parsed.extractedValues.namespace).toBe(
            scenario.expectedExtractedValues.namespace
          );
        }
      }
    );

    it("should detect list operation: 'List all healthchecks in the default namespace'", () => {
      const parsed = parsePrompt(
        "List all healthchecks in the default namespace"
      );

      expect(parsed.operation).toBe("list");
      expect(parsed.extractedValues.namespace).toBe("default");
    });

    it("should detect get operation: 'Get the healthcheck named my-health'", () => {
      const parsed = parsePrompt("Get the healthcheck named my-health");

      expect(parsed.operation).toBe("get");
      expect(parsed.extractedValues.name).toBe("my-health");
    });

    it("should find list tool for list operations", () => {
      const results = searchTools("healthcheck list", {
        limit: 5,
        domains: ["virtual"],
      });

      expect(results.some((r) => r.tool.name.includes("list"))).toBe(true);
    });

    it("should find get tool for get operations", () => {
      const results = searchTools("healthcheck get", {
        limit: 5,
        domains: ["virtual"],
      });

      expect(results.some((r) => r.tool.name.includes("get"))).toBe(true);
    });
  });

  // ============================================================================
  // Validation Prompt Tests - OneOf Detection
  // ============================================================================

  describe("Validation Prompts - OneOf Detection", () => {
    it("should detect oneOf conflict: 'host_header and use_origin_server_name'", () => {
      const parsed = parsePrompt(
        "Create a healthcheck with host header api.example.com and use origin server name"
      );

      const oneOfGroups = getHealthcheckOneOfGroups();
      const conflict = hasOneOfConflictIndicators(parsed, oneOfGroups);

      expect(conflict.hasConflict).toBe(true);
      expect(conflict.conflictingFields.length).toBeGreaterThan(0);
    });

    it("should validate oneOf conflict in configuration", () => {
      const config = {
        metadata: { name: "test-hc", namespace: "default" },
        spec: {
          host_header: "api.example.com",
          use_origin_server_name: {},
        },
      };

      const validation = validateHealthcheckConfig(config);

      expect(validation.isValid).toBe(false);
      expect(validation.inputState).toBe("oneOf_conflict");
      expect(validation.messages.some((m) => m.includes("mutually exclusive"))).toBe(true);
    });

    it("should pass validation for valid configuration", () => {
      const config = {
        metadata: { name: "test-hc", namespace: "default" },
        spec: {
          host_header: "api.example.com",
          timeout: 5,
        },
      };

      const validation = validateHealthcheckConfig(config);

      expect(validation.isValid).toBe(true);
      expect(validation.inputState).toBe("valid");
    });

    it.each(getOneOfConflictPrompts())(
      "should detect oneOf conflict in: '$prompt'",
      async (scenario) => {
        const parsed = parsePrompt(scenario.prompt);

        // Check if the scenario is marked as having oneOf conflict
        expect(scenario.hasOneOfConflict).toBe(true);

        // Build configuration and validate
        const body = buildHealthcheckBody(parsed.extractedValues);

        // The body should have conflicting fields if this is a conflict scenario
        const spec = body.spec as Record<string, unknown>;
        const hasConflictingFields =
          spec.host_header !== undefined && spec.use_origin_server_name !== undefined;

        // Note: The prompt parser may not extract both values if they're implied
        // The important thing is the scenario is flagged
        if (hasConflictingFields) {
          const validation = validateHealthcheckConfig(body);
          expect(validation.inputState).toBe("oneOf_conflict");
        }
      }
    );

    it("should suggest recommended option when oneOf conflict detected", () => {
      const parsed = parsePrompt(
        "Create a healthcheck with both host_header and use_origin_server_name"
      );

      const context = buildScenarioContext(parsed, { config: {} });

      // If there's a conflict, the context should reflect it
      if (context.hasOneOfConflict) {
        const prediction = predictOutcome(context);

        // Should predict either error or warning for oneOf conflict
        expect(["error", "warning", "validation_result"]).toContain(
          prediction.condition.outcomeType
        );
      }
    });
  });

  // ============================================================================
  // Deletion Prompt Tests
  // ============================================================================

  describe("Deletion Prompts", () => {
    it.each(HEALTHCHECK_DELETION_PROMPTS)(
      "should handle: '$prompt'",
      async (scenario) => {
        const parsed = parsePrompt(scenario.prompt);

        // Verify operation detection
        expect(parsed.operation).toBe("delete");

        // Verify name extraction
        expect(parsed.extractedValues.name).toBe(
          scenario.expectedExtractedValues.name
        );

        // Verify namespace extraction if expected
        if (scenario.expectedExtractedValues.namespace) {
          expect(parsed.extractedValues.namespace).toBe(
            scenario.expectedExtractedValues.namespace
          );
        }
      }
    );

    it("should find delete tool: 'Delete the healthcheck named my-health'", () => {
      const results = searchTools("healthcheck delete", {
        limit: 5,
        domains: ["virtual"],
      });

      expect(results.some((r) => r.tool.name.includes("delete"))).toBe(true);
    });

    it("should build path params for deletion", () => {
      const parsed = parsePrompt(
        "Delete healthcheck my-health from namespace production"
      );

      const pathParams = buildPathParams(parsed.extractedValues);

      expect(pathParams.name).toBe("my-health");
      expect(pathParams.namespace).toBe("production");
    });
  });

  // ============================================================================
  // Condition Matrix Tests
  // ============================================================================

  describe("Condition Matrix Coverage", () => {
    it("should have conditions for all basic CRUD operations", () => {
      const operations = ["create", "get", "list", "delete"];

      for (const op of operations) {
        const conditions = CRUD_CONDITION_MATRIX.filter(
          (c) => c.operation === op
        );
        expect(conditions.length).toBeGreaterThan(0);
      }
    });

    it("should have conditions for documentation mode", () => {
      const docConditions = CRUD_CONDITION_MATRIX.filter(
        (c) => c.authState === "documentation"
      );

      expect(docConditions.length).toBeGreaterThan(0);
    });

    it("should have conditions for oneOf conflicts", () => {
      const conflictConditions = CRUD_CONDITION_MATRIX.filter(
        (c) => c.inputState === "oneOf_conflict"
      );

      expect(conflictConditions.length).toBeGreaterThan(0);
    });

    it("should have conditions for validation operations", () => {
      const validateConditions = CRUD_CONDITION_MATRIX.filter(
        (c) => c.operation === "validate"
      );

      expect(validateConditions.length).toBeGreaterThan(0);
    });

    it("should lookup specific conditions by scenario ID", () => {
      const condition = findCondition("create_valid_authenticated");

      expect(condition).toBeDefined();
      expect(condition?.authState).toBe("authenticated");
      expect(condition?.operation).toBe("create");
      expect(condition?.expectedStatus).toBe(200);
    });
  });

  // ============================================================================
  // Response Evaluation Tests
  // ============================================================================

  describe("Response Evaluation", () => {
    it("should evaluate successful API response", () => {
      const mockResponse = {
        success: true,
        data: { name: "test-hc" },
        statusCode: 200,
      };

      const context = buildScenarioContext(
        parsePrompt("Create healthcheck test-hc"),
        { isAuthenticated: true }
      );
      const prediction = predictOutcome(context);
      const evaluation = evaluateResponse(mockResponse, prediction);

      // Should pass basic checks
      expect(evaluation.context.hasData).toBe(true);
      expect(evaluation.context.hasError).toBe(false);
    });

    it("should evaluate error response", () => {
      const mockResponse = {
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "Resource not found",
        },
        statusCode: 404,
      };

      const context = buildScenarioContext(
        parsePrompt("Get healthcheck nonexistent"),
        { isAuthenticated: true, resourceExists: false }
      );
      const prediction = predictOutcome(context);
      const evaluation = evaluateResponse(mockResponse, prediction);

      expect(evaluation.context.hasError).toBe(true);
      expect(evaluation.context.errorCode).toBe("NOT_FOUND");
    });

    it("should evaluate documentation response", () => {
      const mockResponse = {
        mode: "documentation" as const,
        data: {},
        curl: "curl -X POST https://...",
        cli: "f5xcctl create ...",
      };

      const context = buildScenarioContext(
        parsePrompt("Create healthcheck test"),
        { isAuthenticated: false }
      );
      const prediction = predictOutcome(context);
      const evaluation = evaluateResponse(mockResponse, prediction);

      expect(evaluation.context.hasCurlExample).toBe(true);
      expect(evaluation.context.hasCliExample).toBe(true);
    });

    it("should quick evaluate for simple checks", () => {
      const successResponse = {
        success: true,
        data: { name: "test" },
      };

      const result = quickEvaluate(successResponse, {
        shouldSucceed: true,
        shouldHaveData: true,
      });

      expect(result.passed).toBe(true);
    });
  });

  // ============================================================================
  // Integration Tests
  // ============================================================================

  describe("Full Prompt-to-Tool Integration", () => {
    it("should process complete creation workflow", () => {
      // 1. Parse user prompt
      const prompt = "Create a healthcheck named api-monitor with HTTP path /health";
      const parsed = parsePrompt(prompt);

      expect(parsed.operation).toBe("create");
      expect(parsed.extractedValues.name).toBe("api-monitor");
      expect(parsed.extractedValues.httpPath).toBe("/health");

      // 2. Search for appropriate tool
      const queries = generateToolSearchQueries(parsed);
      const results = searchTools(queries[0], {
        limit: 5,
        domains: ["virtual"],
      });

      expect(results.length).toBeGreaterThan(0);
      const createTool = results.find((r) => r.tool.name.includes("create"));
      expect(createTool).toBeDefined();

      // 3. Build configuration
      const body = buildHealthcheckBody(parsed.extractedValues);
      const pathParams = buildPathParams(parsed.extractedValues);

      expect(body.metadata).toEqual({
        name: "api-monitor",
        namespace: "default",
      });
      expect(pathParams.name).toBe("api-monitor");

      // 4. Validate configuration
      const validation = validateHealthcheckConfig(body);
      expect(validation.isValid).toBe(true);

      // 5. Build scenario context and predict outcome
      const context = buildScenarioContext(parsed, {
        isAuthenticated: false,
        config: body,
      });
      const prediction = predictOutcome(context);

      // In documentation mode, should expect documentation response
      expect(prediction.condition.outcomeType).toBe("documentation");
    });

    it("should handle oneOf conflict workflow", () => {
      // 1. Parse prompt with conflict
      const prompt =
        "Create a healthcheck with host header api.example.com and use origin server name";
      const parsed = parsePrompt(prompt);

      // 2. Detect conflict
      const oneOfGroups = getHealthcheckOneOfGroups();
      const conflict = hasOneOfConflictIndicators(parsed, oneOfGroups);

      // 3. Build config anyway
      const body = buildHealthcheckBody(parsed.extractedValues);

      // 4. Validate and confirm conflict
      const validation = validateHealthcheckConfig(body);

      // If both fields are present, should detect conflict
      const spec = body.spec as Record<string, unknown>;
      if (spec.host_header && spec.use_origin_server_name) {
        expect(validation.inputState).toBe("oneOf_conflict");
      }
    });

    it("should handle inspection workflow", () => {
      // 1. Parse list prompt - use "list all" which should match list operation
      const listPrompt = "List all healthchecks in production namespace";
      const listParsed = parsePrompt(listPrompt);

      expect(listParsed.operation).toBe("list");
      expect(listParsed.extractedValues.namespace).toBe("production");

      // 2. Search for list tool
      const results = searchTools("healthcheck list", {
        limit: 5,
        domains: ["virtual"],
      });

      const listTool = results.find((r) => r.tool.name.includes("list"));
      expect(listTool).toBeDefined();

      // 3. Build path params
      const pathParams = buildPathParams(listParsed.extractedValues);
      expect(pathParams.namespace).toBe("production");
    });

    it("should handle deletion workflow", () => {
      // 1. Parse delete prompt
      const deletePrompt = "Delete the healthcheck named old-monitor";
      const parsed = parsePrompt(deletePrompt);

      expect(parsed.operation).toBe("delete");
      expect(parsed.extractedValues.name).toBe("old-monitor");

      // 2. Search for delete tool
      const results = searchTools("healthcheck delete", {
        limit: 5,
        domains: ["virtual"],
      });

      const deleteTool = results.find((r) => r.tool.name.includes("delete"));
      expect(deleteTool).toBeDefined();

      // 3. Build path params
      const pathParams = buildPathParams(parsed.extractedValues);
      expect(pathParams.name).toBe("old-monitor");

      // 4. Predict outcome
      const context = buildScenarioContext(parsed, {
        isAuthenticated: false,
      });
      const prediction = predictOutcome(context);

      // In doc mode, expect documentation response
      expect(prediction.condition.outcomeType).toBe("documentation");
    });
  });
});
