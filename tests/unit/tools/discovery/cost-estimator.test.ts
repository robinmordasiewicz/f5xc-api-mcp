// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

import { describe, it, expect, beforeEach } from "vitest";
import {
  estimateToolTokens,
  estimateToolLatency,
  estimateToolCost,
  estimateMultipleToolsCost,
  estimateWorkflowCost,
  formatCostEstimate,
  formatWorkflowCostEstimate,
  type TokenEstimate,
  type LatencyEstimate,
  type ToolCostEstimate,
  type WorkflowCostEstimate,
} from "../../../../src/tools/discovery/cost-estimator.js";
import { clearIndexCache } from "../../../../src/tools/discovery/index-loader.js";
import { clearConsolidatedCache } from "../../../../src/tools/discovery/consolidate.js";
import {
  getValidToolName,
  SAMPLE_TOOLS_BY_OPERATION,
  FIRST_TOOL,
} from "../../../fixtures/generated.js";
import type { CreationPlan } from "../../../../src/tools/discovery/resolver.js";

describe("cost-estimator - Cost and Performance Estimation", () => {
  beforeEach(() => {
    clearIndexCache();
    clearConsolidatedCache();
  });

  describe("estimateToolTokens", () => {
    it("should estimate tokens for a simple GET tool", () => {
      const getTool = SAMPLE_TOOLS_BY_OPERATION.get;
      const result = estimateToolTokens(getTool.toolName);

      expect(result).toHaveProperty("schemaTokens");
      expect(result).toHaveProperty("requestTokens");
      expect(result).toHaveProperty("responseTokens");
      expect(result).toHaveProperty("totalTokens");
      expect(result.totalTokens).toBeGreaterThan(0);
      expect(result.totalTokens).toBe(
        result.schemaTokens + result.requestTokens + result.responseTokens
      );
    });

    it("should estimate tokens for a complex CREATE tool", () => {
      const createTool = SAMPLE_TOOLS_BY_OPERATION.create;
      const result = estimateToolTokens(createTool.toolName);

      expect(result.requestTokens).toBeGreaterThan(100);
      // Create operations should have larger request bodies
      expect(result.requestTokens).toBeGreaterThanOrEqual(500);
    });

    it("should estimate tokens for LIST operation", () => {
      const listTool = SAMPLE_TOOLS_BY_OPERATION.list;
      const result = estimateToolTokens(listTool.toolName);

      // List operations have minimal request
      expect(result.requestTokens).toBeLessThan(100);
      // But large response (can return many items)
      expect(result.responseTokens).toBeGreaterThan(500);
    });

    it("should estimate tokens for UPDATE operation", () => {
      const updateTool = SAMPLE_TOOLS_BY_OPERATION.update;
      const result = estimateToolTokens(updateTool.toolName);

      // Update operations have moderate request size
      expect(result.requestTokens).toBeGreaterThan(100);
      expect(result.requestTokens).toBeLessThan(500);
    });

    it("should estimate tokens for DELETE operation", () => {
      const deleteTool = SAMPLE_TOOLS_BY_OPERATION.delete;
      const result = estimateToolTokens(deleteTool.toolName);

      // Delete operations have minimal request and response
      expect(result.requestTokens).toBeLessThan(100);
      expect(result.responseTokens).toBeLessThan(500);
    });

    it("should return default estimates for non-existent tool", () => {
      const result = estimateToolTokens("non-existent-tool-xyz");

      expect(result.schemaTokens).toBe(200);
      expect(result.requestTokens).toBe(100);
      expect(result.responseTokens).toBe(300);
      expect(result.totalTokens).toBe(600);
    });

    it("should calculate total tokens correctly", () => {
      const toolName = getValidToolName();
      const result = estimateToolTokens(toolName);

      const calculatedTotal =
        result.schemaTokens + result.requestTokens + result.responseTokens;
      expect(result.totalTokens).toBe(calculatedTotal);
    });

    it("should include path parameter tokens in schema", () => {
      // Tools with path parameters should have higher schema tokens
      const getTool = SAMPLE_TOOLS_BY_OPERATION.get;
      const result = estimateToolTokens(getTool.toolName);

      expect(result.schemaTokens).toBeGreaterThan(0);
    });

    it("should handle tools with no query parameters", () => {
      const toolName = getValidToolName();
      const result = estimateToolTokens(toolName);

      // Should not fail and should have reasonable estimates
      expect(result.totalTokens).toBeGreaterThan(0);
      expect(result.schemaTokens).toBeGreaterThan(0);
    });
  });

  describe("estimateToolLatency", () => {
    it("should estimate latency for GET operation", () => {
      const getTool = SAMPLE_TOOLS_BY_OPERATION.get;
      const result = estimateToolLatency(getTool.toolName);

      expect(result).toHaveProperty("level");
      expect(result).toHaveProperty("estimatedMs");
      expect(result).toHaveProperty("description");
      // GET operations are typically low latency
      expect(result.level).toBe("low");
      expect(result.estimatedMs).toBeGreaterThan(0);
    });

    it("should estimate latency for LIST operation", () => {
      const listTool = SAMPLE_TOOLS_BY_OPERATION.list;
      const result = estimateToolLatency(listTool.toolName);

      // List operations are typically low latency
      expect(result.level).toBe("low");
      expect(result.estimatedMs).toBeLessThan(2000);
    });

    it("should estimate latency for CREATE operation", () => {
      const createTool = SAMPLE_TOOLS_BY_OPERATION.create;
      const result = estimateToolLatency(createTool.toolName);

      // Create operations are typically moderate latency
      expect(result.level).toBe("moderate");
      expect(result.estimatedMs).toBeGreaterThan(500);
    });

    it("should estimate latency for UPDATE operation", () => {
      const updateTool = SAMPLE_TOOLS_BY_OPERATION.update;
      const result = estimateToolLatency(updateTool.toolName);

      // Update operations are typically moderate latency
      expect(result.level).toBe("moderate");
    });

    it("should estimate latency for DELETE operation", () => {
      const deleteTool = SAMPLE_TOOLS_BY_OPERATION.delete;
      const result = estimateToolLatency(deleteTool.toolName);

      // Delete operations are typically moderate latency
      expect(result.level).toBe("moderate");
    });

    it("should return unknown latency for non-existent tool", () => {
      const result = estimateToolLatency("non-existent-tool-xyz");

      expect(result.level).toBe("unknown");
      expect(result.estimatedMs).toBeGreaterThan(0);
      expect(result.description).toContain("not specified");
    });

    it("should include latency description", () => {
      const toolName = getValidToolName();
      const result = estimateToolLatency(toolName);

      expect(result.description).toBeTruthy();
      expect(result.description.length).toBeGreaterThan(0);
    });

    it("should map latency levels to reasonable milliseconds", () => {
      const getLow = estimateToolLatency(SAMPLE_TOOLS_BY_OPERATION.get.toolName);
      const createModerate = estimateToolLatency(SAMPLE_TOOLS_BY_OPERATION.create.toolName);

      // Low should be faster than moderate
      expect(getLow.estimatedMs).toBeLessThan(createModerate.estimatedMs);
    });
  });

  describe("estimateToolCost", () => {
    it("should return complete cost estimate for valid tool", () => {
      const toolName = getValidToolName();
      const result = estimateToolCost(toolName);

      expect(result).toHaveProperty("toolName", toolName);
      expect(result).toHaveProperty("tokens");
      expect(result).toHaveProperty("latency");
      expect(result).toHaveProperty("dangerLevel");
      expect(result).toHaveProperty("exists");
      expect(result.exists).toBe(true);
    });

    it("should include token estimates in cost", () => {
      const toolName = getValidToolName();
      const result = estimateToolCost(toolName);

      expect(result.tokens.totalTokens).toBeGreaterThan(0);
      expect(result.tokens.schemaTokens).toBeGreaterThan(0);
      expect(result.tokens.requestTokens).toBeGreaterThan(0);
      expect(result.tokens.responseTokens).toBeGreaterThan(0);
    });

    it("should include latency estimates in cost", () => {
      const toolName = getValidToolName();
      const result = estimateToolCost(toolName);

      expect(result.latency.level).toBeDefined();
      expect(result.latency.estimatedMs).toBeGreaterThan(0);
      expect(result.latency.description).toBeTruthy();
    });

    it("should mark non-existent tool as not existing", () => {
      const result = estimateToolCost("non-existent-tool-xyz");

      expect(result.exists).toBe(false);
      expect(result.toolName).toBe("non-existent-tool-xyz");
    });

    it("should include danger level", () => {
      const toolName = getValidToolName();
      const result = estimateToolCost(toolName);

      expect(result.dangerLevel).toBeDefined();
      expect(["low", "medium", "high", "critical"]).toContain(result.dangerLevel);
    });

    it("should default to low danger level for tools without metadata", () => {
      const result = estimateToolCost("non-existent-tool-xyz");

      expect(result.dangerLevel).toBe("low");
    });

    it("should estimate costs for different operation types consistently", () => {
      const getEstimate = estimateToolCost(SAMPLE_TOOLS_BY_OPERATION.get.toolName);
      const createEstimate = estimateToolCost(SAMPLE_TOOLS_BY_OPERATION.create.toolName);

      // CREATE should have higher token costs
      expect(createEstimate.tokens.totalTokens).toBeGreaterThan(
        getEstimate.tokens.totalTokens
      );
    });
  });

  describe("estimateMultipleToolsCost", () => {
    it("should estimate costs for multiple valid tools", () => {
      const toolNames = [
        SAMPLE_TOOLS_BY_OPERATION.get.toolName,
        SAMPLE_TOOLS_BY_OPERATION.list.toolName,
        SAMPLE_TOOLS_BY_OPERATION.create.toolName,
      ];

      const results = estimateMultipleToolsCost(toolNames);

      expect(results).toHaveLength(3);
      expect(results[0].toolName).toBe(toolNames[0]);
      expect(results[1].toolName).toBe(toolNames[1]);
      expect(results[2].toolName).toBe(toolNames[2]);
    });

    it("should handle mix of valid and invalid tools", () => {
      const toolNames = [
        getValidToolName(),
        "non-existent-tool-1",
        "non-existent-tool-2",
      ];

      const results = estimateMultipleToolsCost(toolNames);

      expect(results).toHaveLength(3);
      expect(results[0].exists).toBe(true);
      expect(results[1].exists).toBe(false);
      expect(results[2].exists).toBe(false);
    });

    it("should return empty array for empty input", () => {
      const results = estimateMultipleToolsCost([]);

      expect(results).toHaveLength(0);
    });

    it("should maintain order of tools", () => {
      const toolNames = [
        SAMPLE_TOOLS_BY_OPERATION.create.toolName,
        SAMPLE_TOOLS_BY_OPERATION.get.toolName,
        SAMPLE_TOOLS_BY_OPERATION.delete.toolName,
      ];

      const results = estimateMultipleToolsCost(toolNames);

      expect(results[0].toolName).toBe(toolNames[0]);
      expect(results[1].toolName).toBe(toolNames[1]);
      expect(results[2].toolName).toBe(toolNames[2]);
    });

    it("should provide complete estimates for each tool", () => {
      const toolNames = [
        SAMPLE_TOOLS_BY_OPERATION.get.toolName,
        SAMPLE_TOOLS_BY_OPERATION.list.toolName,
      ];

      const results = estimateMultipleToolsCost(toolNames);

      for (const result of results) {
        expect(result).toHaveProperty("tokens");
        expect(result).toHaveProperty("latency");
        expect(result).toHaveProperty("dangerLevel");
        expect(result).toHaveProperty("exists");
      }
    });

    it("should calculate individual token costs correctly", () => {
      const toolNames = [getValidToolName()];
      const results = estimateMultipleToolsCost(toolNames);
      const singleEstimate = estimateToolCost(toolNames[0]);

      expect(results[0].tokens.totalTokens).toBe(singleEstimate.tokens.totalTokens);
    });
  });

  describe("estimateWorkflowCost", () => {
    it("should estimate costs for a simple workflow", () => {
      const plan: CreationPlan = {
        targetResource: "test-resource",
        targetDomain: "virtual",
        steps: [
          {
            stepNumber: 1,
            action: "create",
            toolName: SAMPLE_TOOLS_BY_OPERATION.create.toolName,
            resource: "test-resource",
            domain: "virtual",
            prerequisites: [],
            requiredInputs: {},
            mutuallyExclusiveOptions: [],
          },
        ],
        totalSteps: 1,
        resources: ["test-resource"],
      };

      const result = estimateWorkflowCost(plan);

      expect(result).toHaveProperty("totalTokens");
      expect(result).toHaveProperty("averageLatency");
      expect(result).toHaveProperty("estimatedTotalMs");
      expect(result).toHaveProperty("stepCount", 1);
      expect(result).toHaveProperty("steps");
      expect(result).toHaveProperty("warnings");
    });

    it("should aggregate tokens across multiple steps", () => {
      const plan: CreationPlan = {
        targetResource: "test-resource",
        targetDomain: "virtual",
        steps: [
          {
            stepNumber: 1,
            action: "create",
            toolName: SAMPLE_TOOLS_BY_OPERATION.create.toolName,
            resource: "resource-1",
            domain: "virtual",
            prerequisites: [],
            requiredInputs: {},
            mutuallyExclusiveOptions: [],
          },
          {
            stepNumber: 2,
            action: "get",
            toolName: SAMPLE_TOOLS_BY_OPERATION.get.toolName,
            resource: "resource-2",
            domain: "virtual",
            prerequisites: ["resource-1"],
            requiredInputs: {},
            mutuallyExclusiveOptions: [],
          },
        ],
        totalSteps: 2,
        resources: ["resource-1", "resource-2"],
      };

      const result = estimateWorkflowCost(plan);

      expect(result.stepCount).toBe(2);
      expect(result.totalTokens).toBeGreaterThan(0);
      expect(result.steps).toHaveLength(2);
    });

    it("should calculate total latency across steps", () => {
      const plan: CreationPlan = {
        targetResource: "test-resource",
        targetDomain: "virtual",
        steps: [
          {
            stepNumber: 1,
            action: "create",
            toolName: SAMPLE_TOOLS_BY_OPERATION.create.toolName,
            resource: "test-resource",
            domain: "virtual",
            prerequisites: [],
            requiredInputs: {},
            mutuallyExclusiveOptions: [],
          },
        ],
        totalSteps: 1,
        resources: ["test-resource"],
      };

      const result = estimateWorkflowCost(plan);

      expect(result.estimatedTotalMs).toBeGreaterThan(0);
      expect(result.averageLatency).toBeDefined();
    });

    it("should warn about non-existent tools", () => {
      const plan: CreationPlan = {
        targetResource: "test-resource",
        targetDomain: "virtual",
        steps: [
          {
            stepNumber: 1,
            action: "create",
            toolName: "non-existent-tool-xyz",
            resource: "test-resource",
            domain: "virtual",
            prerequisites: [],
            requiredInputs: {},
            mutuallyExclusiveOptions: [],
          },
        ],
        totalSteps: 1,
        resources: ["test-resource"],
      };

      const result = estimateWorkflowCost(plan);

      expect(result.warnings.length).toBeGreaterThan(0);
      expect(result.warnings[0]).toContain("not found");
    });

    it("should handle empty workflow", () => {
      const plan: CreationPlan = {
        targetResource: "test-resource",
        targetDomain: "virtual",
        steps: [],
        totalSteps: 0,
        resources: [],
      };

      const result = estimateWorkflowCost(plan);

      expect(result.stepCount).toBe(0);
      expect(result.totalTokens).toBe(0);
      expect(result.estimatedTotalMs).toBe(0);
      expect(result.steps).toHaveLength(0);
    });

    it("should include step details in breakdown", () => {
      const plan: CreationPlan = {
        targetResource: "test-resource",
        targetDomain: "virtual",
        steps: [
          {
            stepNumber: 1,
            action: "create",
            toolName: SAMPLE_TOOLS_BY_OPERATION.create.toolName,
            resource: "test-resource",
            domain: "virtual",
            prerequisites: [],
            requiredInputs: {},
            mutuallyExclusiveOptions: [],
          },
        ],
        totalSteps: 1,
        resources: ["test-resource"],
      };

      const result = estimateWorkflowCost(plan);

      expect(result.steps[0]).toHaveProperty("stepNumber", 1);
      expect(result.steps[0]).toHaveProperty("toolName");
      expect(result.steps[0]).toHaveProperty("tokens");
      expect(result.steps[0]).toHaveProperty("latencyMs");
    });

    it("should aggregate latency levels correctly", () => {
      const plan: CreationPlan = {
        targetResource: "test-resource",
        targetDomain: "virtual",
        steps: [
          {
            stepNumber: 1,
            action: "get",
            toolName: SAMPLE_TOOLS_BY_OPERATION.get.toolName, // low latency
            resource: "resource-1",
            domain: "virtual",
            prerequisites: [],
            requiredInputs: {},
            mutuallyExclusiveOptions: [],
          },
          {
            stepNumber: 2,
            action: "get",
            toolName: SAMPLE_TOOLS_BY_OPERATION.list.toolName, // low latency
            resource: "resource-2",
            domain: "virtual",
            prerequisites: [],
            requiredInputs: {},
            mutuallyExclusiveOptions: [],
          },
        ],
        totalSteps: 2,
        resources: ["resource-1", "resource-2"],
      };

      const result = estimateWorkflowCost(plan);

      // All low latency operations should result in low average
      expect(result.averageLatency).toBe("low");
    });

    it("should handle mixed latency levels", () => {
      const plan: CreationPlan = {
        targetResource: "test-resource",
        targetDomain: "virtual",
        steps: [
          {
            stepNumber: 1,
            action: "get",
            toolName: SAMPLE_TOOLS_BY_OPERATION.get.toolName, // low latency
            resource: "resource-1",
            domain: "virtual",
            prerequisites: [],
            requiredInputs: {},
            mutuallyExclusiveOptions: [],
          },
          {
            stepNumber: 2,
            action: "create",
            toolName: SAMPLE_TOOLS_BY_OPERATION.create.toolName, // moderate latency
            resource: "resource-2",
            domain: "virtual",
            prerequisites: ["resource-1"],
            requiredInputs: {},
            mutuallyExclusiveOptions: [],
          },
        ],
        totalSteps: 2,
        resources: ["resource-1", "resource-2"],
      };

      const result = estimateWorkflowCost(plan);

      // Mix of low and moderate should be moderate
      expect(["moderate", "low"]).toContain(result.averageLatency);
    });
  });

  describe("formatCostEstimate", () => {
    it("should format cost estimate for valid tool", () => {
      const toolName = getValidToolName();
      const estimate = estimateToolCost(toolName);
      const formatted = formatCostEstimate(estimate);

      expect(formatted).toContain("# Cost Estimate:");
      expect(formatted).toContain(toolName);
      expect(formatted).toContain("## Token Usage");
      expect(formatted).toContain("## Latency");
      expect(formatted).toContain("## Risk");
    });

    it("should include warning for non-existent tool", () => {
      const estimate = estimateToolCost("non-existent-tool-xyz");
      const formatted = formatCostEstimate(estimate);

      expect(formatted).toContain("Warning");
      expect(formatted).toContain("Tool not found");
    });

    it("should format token breakdown", () => {
      const estimate = estimateToolCost(getValidToolName());
      const formatted = formatCostEstimate(estimate);

      expect(formatted).toContain("Schema/Description:");
      expect(formatted).toContain("Request Body:");
      expect(formatted).toContain("Response:");
      expect(formatted).toContain("**Total per call**:");
      expect(formatted).toContain("tokens");
    });

    it("should format latency information", () => {
      const estimate = estimateToolCost(getValidToolName());
      const formatted = formatCostEstimate(estimate);

      expect(formatted).toContain("Level:");
      expect(formatted).toContain("Estimated:");
      expect(formatted).toContain("ms");
    });

    it("should include danger level", () => {
      const estimate = estimateToolCost(getValidToolName());
      const formatted = formatCostEstimate(estimate);

      expect(formatted).toContain("Danger Level:");
      expect(formatted).toMatch(/low|medium|high|critical/);
    });

    it("should use markdown formatting", () => {
      const estimate = estimateToolCost(getValidToolName());
      const formatted = formatCostEstimate(estimate);

      // Should have markdown headers
      expect(formatted).toMatch(/^#\s/m);
      expect(formatted).toMatch(/^##\s/m);
      // Should have markdown bullets
      expect(formatted).toContain("- ");
      // Should have markdown bold
      expect(formatted).toContain("**");
    });
  });

  describe("formatWorkflowCostEstimate", () => {
    it("should format workflow estimate with summary", () => {
      const plan: CreationPlan = {
        targetResource: "test-resource",
        targetDomain: "virtual",
        steps: [
          {
            stepNumber: 1,
            action: "create",
            toolName: SAMPLE_TOOLS_BY_OPERATION.create.toolName,
            resource: "test-resource",
            domain: "virtual",
            prerequisites: [],
            requiredInputs: {},
            mutuallyExclusiveOptions: [],
          },
        ],
        totalSteps: 1,
        resources: ["test-resource"],
      };

      const estimate = estimateWorkflowCost(plan);
      const formatted = formatWorkflowCostEstimate(estimate);

      expect(formatted).toContain("# Workflow Cost Estimate");
      expect(formatted).toContain("## Summary");
      expect(formatted).toContain("**Total Steps**:");
      expect(formatted).toContain("**Total Tokens**:");
      expect(formatted).toContain("**Average Latency**:");
      expect(formatted).toContain("**Estimated Total Time**:");
    });

    it("should include warnings section when present", () => {
      const plan: CreationPlan = {
        targetResource: "test-resource",
        targetDomain: "virtual",
        steps: [
          {
            stepNumber: 1,
            action: "create",
            toolName: "non-existent-tool-xyz",
            resource: "test-resource",
            domain: "virtual",
            prerequisites: [],
            requiredInputs: {},
            mutuallyExclusiveOptions: [],
          },
        ],
        totalSteps: 1,
        resources: ["test-resource"],
      };

      const estimate = estimateWorkflowCost(plan);
      const formatted = formatWorkflowCostEstimate(estimate);

      expect(formatted).toContain("## Warnings");
      expect(formatted).toContain("not found");
    });

    it("should format step breakdown as table", () => {
      const plan: CreationPlan = {
        targetResource: "test-resource",
        targetDomain: "virtual",
        steps: [
          {
            stepNumber: 1,
            action: "create",
            toolName: SAMPLE_TOOLS_BY_OPERATION.create.toolName,
            resource: "test-resource",
            domain: "virtual",
            prerequisites: [],
            requiredInputs: {},
            mutuallyExclusiveOptions: [],
          },
        ],
        totalSteps: 1,
        resources: ["test-resource"],
      };

      const estimate = estimateWorkflowCost(plan);
      const formatted = formatWorkflowCostEstimate(estimate);

      expect(formatted).toContain("## Step Breakdown");
      expect(formatted).toContain("| Step | Tool | Tokens | Latency |");
      expect(formatted).toContain("|------|------|--------|---------|");
    });

    it("should format time in seconds", () => {
      const plan: CreationPlan = {
        targetResource: "test-resource",
        targetDomain: "virtual",
        steps: [
          {
            stepNumber: 1,
            action: "create",
            toolName: SAMPLE_TOOLS_BY_OPERATION.create.toolName,
            resource: "test-resource",
            domain: "virtual",
            prerequisites: [],
            requiredInputs: {},
            mutuallyExclusiveOptions: [],
          },
        ],
        totalSteps: 1,
        resources: ["test-resource"],
      };

      const estimate = estimateWorkflowCost(plan);
      const formatted = formatWorkflowCostEstimate(estimate);

      expect(formatted).toMatch(/~[\d.]+s/); // Should contain time in seconds format
    });

    it("should include all steps in table", () => {
      const plan: CreationPlan = {
        targetResource: "test-resource",
        targetDomain: "virtual",
        steps: [
          {
            stepNumber: 1,
            action: "create",
            toolName: SAMPLE_TOOLS_BY_OPERATION.create.toolName,
            resource: "resource-1",
            domain: "virtual",
            prerequisites: [],
            requiredInputs: {},
            mutuallyExclusiveOptions: [],
          },
          {
            stepNumber: 2,
            action: "get",
            toolName: SAMPLE_TOOLS_BY_OPERATION.get.toolName,
            resource: "resource-2",
            domain: "virtual",
            prerequisites: ["resource-1"],
            requiredInputs: {},
            mutuallyExclusiveOptions: [],
          },
        ],
        totalSteps: 2,
        resources: ["resource-1", "resource-2"],
      };

      const estimate = estimateWorkflowCost(plan);
      const formatted = formatWorkflowCostEstimate(estimate);

      // Should have 2 rows in the table (plus header)
      const tableRows = formatted.split("\n").filter((line) => line.startsWith("| 1") || line.startsWith("| 2"));
      expect(tableRows.length).toBe(2);
    });

    it("should use markdown formatting", () => {
      const plan: CreationPlan = {
        targetResource: "test-resource",
        targetDomain: "virtual",
        steps: [
          {
            stepNumber: 1,
            action: "create",
            toolName: SAMPLE_TOOLS_BY_OPERATION.create.toolName,
            resource: "test-resource",
            domain: "virtual",
            prerequisites: [],
            requiredInputs: {},
            mutuallyExclusiveOptions: [],
          },
        ],
        totalSteps: 1,
        resources: ["test-resource"],
      };

      const estimate = estimateWorkflowCost(plan);
      const formatted = formatWorkflowCostEstimate(estimate);

      // Should have markdown headers
      expect(formatted).toMatch(/^#\s/m);
      expect(formatted).toMatch(/^##\s/m);
      // Should have markdown bold
      expect(formatted).toContain("**");
      // Should have markdown table
      expect(formatted).toContain("|");
    });
  });

  describe("Edge Cases", () => {
    it("should handle tool with no path parameters", () => {
      // This tests the case where pathParameters might be empty
      const toolName = getValidToolName();
      const result = estimateToolTokens(toolName);

      expect(result.totalTokens).toBeGreaterThan(0);
    });

    it("should handle tool with no query parameters", () => {
      const toolName = getValidToolName();
      const result = estimateToolTokens(toolName);

      // Should not throw error, just calculate with 0 query params
      expect(result.schemaTokens).toBeGreaterThan(0);
    });

    it("should handle empty tool name", () => {
      const result = estimateToolCost("");

      expect(result.exists).toBe(false);
      expect(result.toolName).toBe("");
    });

    it("should handle workflow with duplicate tool names", () => {
      const plan: CreationPlan = {
        targetResource: "test-resource",
        targetDomain: "virtual",
        steps: [
          {
            stepNumber: 1,
            action: "create",
            toolName: SAMPLE_TOOLS_BY_OPERATION.create.toolName,
            resource: "resource-1",
            domain: "virtual",
            prerequisites: [],
            requiredInputs: {},
            mutuallyExclusiveOptions: [],
          },
          {
            stepNumber: 2,
            action: "create",
            toolName: SAMPLE_TOOLS_BY_OPERATION.create.toolName,
            resource: "resource-2",
            domain: "virtual",
            prerequisites: ["resource-1"],
            requiredInputs: {},
            mutuallyExclusiveOptions: [],
          },
        ],
        totalSteps: 2,
        resources: ["resource-1", "resource-2"],
      };

      const result = estimateWorkflowCost(plan);

      expect(result.stepCount).toBe(2);
      // Total should be sum of both steps
      expect(result.totalTokens).toBeGreaterThan(0);
    });
  });
});
