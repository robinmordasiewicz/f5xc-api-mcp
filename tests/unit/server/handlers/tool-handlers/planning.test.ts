// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

import { describe, it, expect, beforeEach, vi } from "vitest";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  registerResolveDependenciesTool,
  registerEstimateCostTool,
  registerPlanningTools,
} from "../../../../../src/server/handlers/tool-handlers/planning.js";

// Mock dependencies
vi.mock("../../../../../src/tools/discovery/index.js", () => ({
  DISCOVERY_TOOLS: {
    resolveDependencies: {
      name: "f5xc-api-resolve-dependencies",
      description: "Generate creation plans",
    },
    estimateCost: {
      name: "f5xc-api-estimate-cost",
      description: "Estimate token usage",
    },
  },
  resolveDependencies: vi.fn(),
  formatCreationPlan: vi.fn(() => "Formatted plan"),
  estimateToolCost: vi.fn(),
  estimateMultipleToolsCost: vi.fn(),
  estimateWorkflowCost: vi.fn(),
  formatCostEstimate: vi.fn(() => "Formatted estimate"),
  formatWorkflowCostEstimate: vi.fn(() => "Formatted workflow"),
}));

vi.mock("../../../../../src/server/response-utils.js", () => ({
  createTextResponse: vi.fn((data) => ({ content: [{ type: "text", text: JSON.stringify(data) }] })),
  createErrorResponse: vi.fn((msg, detail) => ({
    content: [{ type: "text", text: `Error: ${msg} - ${detail}` }],
  })),
}));

import {
  resolveDependencies,
  formatCreationPlan,
  estimateToolCost,
  estimateMultipleToolsCost,
  estimateWorkflowCost,
  formatCostEstimate,
  formatWorkflowCostEstimate,
} from "../../../../../src/tools/discovery/index.js";
import { createTextResponse, createErrorResponse } from "../../../../../src/server/response-utils.js";

describe("Planning Tool Handlers", () => {
  let mockServer: McpServer;
  let toolHandlers: Map<string, (args: any) => Promise<any>>;

  beforeEach(() => {
    vi.clearAllMocks();
    toolHandlers = new Map();

    // Mock McpServer
    mockServer = {
      tool: vi.fn((name, description, schema, handler) => {
        toolHandlers.set(name, handler);
      }),
    } as any;
  });

  describe("registerResolveDependenciesTool", () => {
    it("should register the resolve-dependencies tool", () => {
      // Act
      registerResolveDependenciesTool(mockServer);

      // Assert
      expect(mockServer.tool).toHaveBeenCalledWith(
        "f5xc-api-resolve-dependencies",
        "Generate creation plans",
        expect.any(Object),
        expect.any(Function)
      );
    });

    it("should return success response with formatted plan", async () => {
      // Arrange
      registerResolveDependenciesTool(mockServer);
      const handler = toolHandlers.get("f5xc-api-resolve-dependencies")!;

      vi.mocked(resolveDependencies).mockReturnValue({
        success: true,
        plan: {
          targetResource: "http-loadbalancer",
          targetDomain: "virtual",
          totalSteps: 2,
          steps: [],
          warnings: [],
          alternatives: [],
          subscriptions: [],
          complexity: "low",
        },
      });

      // Act
      await handler({
        resource: "http-loadbalancer",
        domain: "virtual",
      });

      // Assert
      expect(resolveDependencies).toHaveBeenCalledWith({
        resource: "http-loadbalancer",
        domain: "virtual",
        existingResources: undefined,
        includeOptional: undefined,
        maxDepth: undefined,
        expandAlternatives: undefined,
      });
      expect(formatCreationPlan).toHaveBeenCalled();
      expect(createTextResponse).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          plan: expect.any(Object),
          formatted: "Formatted plan",
        })
      );
    });

    it("should return error response when resolution fails", async () => {
      // Arrange
      registerResolveDependenciesTool(mockServer);
      const handler = toolHandlers.get("f5xc-api-resolve-dependencies")!;

      vi.mocked(resolveDependencies).mockReturnValue({
        success: false,
        error: "Resource not found",
      });

      // Act
      await handler({
        resource: "nonexistent",
        domain: "invalid",
      });

      // Assert
      expect(createTextResponse).toHaveBeenCalledWith({
        success: false,
        error: "Resource not found",
      });
    });

    it("should pass optional parameters to resolveDependencies", async () => {
      // Arrange
      registerResolveDependenciesTool(mockServer);
      const handler = toolHandlers.get("f5xc-api-resolve-dependencies")!;

      vi.mocked(resolveDependencies).mockReturnValue({
        success: true,
        plan: {} as any,
      });

      // Act
      await handler({
        resource: "http-loadbalancer",
        domain: "virtual",
        existingResources: ["virtual/origin-pool"],
        includeOptional: true,
        maxDepth: 5,
        expandAlternatives: true,
      });

      // Assert
      expect(resolveDependencies).toHaveBeenCalledWith({
        resource: "http-loadbalancer",
        domain: "virtual",
        existingResources: ["virtual/origin-pool"],
        includeOptional: true,
        maxDepth: 5,
        expandAlternatives: true,
      });
    });
  });

  describe("registerEstimateCostTool", () => {
    it("should register the estimate-cost tool", () => {
      // Act
      registerEstimateCostTool(mockServer);

      // Assert
      expect(mockServer.tool).toHaveBeenCalledWith(
        "f5xc-api-estimate-cost",
        "Estimate token usage",
        expect.any(Object),
        expect.any(Function)
      );
    });

    describe("single tool estimation", () => {
      it("should estimate cost for a single tool", async () => {
        // Arrange
        registerEstimateCostTool(mockServer);
        const handler = toolHandlers.get("f5xc-api-estimate-cost")!;

        const mockEstimate = {
          toolName: "test-tool",
          tokens: { totalTokens: 1000, schemaTokens: 500, requestTokens: 300, responseTokens: 200 },
          latency: { level: "low", ms: 500 },
        };
        vi.mocked(estimateToolCost).mockReturnValue(mockEstimate);

        // Act
        await handler({
          toolName: "test-tool",
          detailed: true,
        });

        // Assert
        expect(estimateToolCost).toHaveBeenCalledWith("test-tool");
        expect(formatCostEstimate).toHaveBeenCalledWith(mockEstimate);
        expect(createTextResponse).toHaveBeenCalledWith({
          type: "single_tool",
          estimate: mockEstimate,
          formatted: "Formatted estimate",
        });
      });

      it("should skip formatting when detailed is false", async () => {
        // Arrange
        registerEstimateCostTool(mockServer);
        const handler = toolHandlers.get("f5xc-api-estimate-cost")!;

        vi.mocked(estimateToolCost).mockReturnValue({} as any);

        // Act
        await handler({
          toolName: "test-tool",
          detailed: false,
        });

        // Assert
        expect(formatCostEstimate).not.toHaveBeenCalled();
        expect(createTextResponse).toHaveBeenCalledWith({
          type: "single_tool",
          estimate: expect.any(Object),
          formatted: undefined,
        });
      });
    });

    describe("multiple tools estimation (lines 101-109)", () => {
      it("should estimate cost for multiple tools", async () => {
        // Arrange
        registerEstimateCostTool(mockServer);
        const handler = toolHandlers.get("f5xc-api-estimate-cost")!;

        const mockEstimates = [
          {
            toolName: "tool1",
            tokens: { totalTokens: 1000, schemaTokens: 500, requestTokens: 300, responseTokens: 200 },
            latency: { level: "low", ms: 500 },
          },
          {
            toolName: "tool2",
            tokens: { totalTokens: 1500, schemaTokens: 700, requestTokens: 500, responseTokens: 300 },
            latency: { level: "moderate", ms: 2000 },
          },
        ];
        vi.mocked(estimateMultipleToolsCost).mockReturnValue(mockEstimates as any);
        vi.mocked(formatCostEstimate)
          .mockReturnValueOnce("Formatted tool1")
          .mockReturnValueOnce("Formatted tool2");

        // Act
        await handler({
          toolNames: ["tool1", "tool2"],
          detailed: true,
        });

        // Assert
        expect(estimateMultipleToolsCost).toHaveBeenCalledWith(["tool1", "tool2"]);
        expect(createTextResponse).toHaveBeenCalledWith({
          type: "multiple_tools",
          toolCount: 2,
          totalTokens: 2500, // 1000 + 1500
          estimates: mockEstimates,
          formatted: "Formatted tool1\n\n---\n\nFormatted tool2",
        });
      });

      it("should calculate total tokens correctly for multiple tools", async () => {
        // Arrange
        registerEstimateCostTool(mockServer);
        const handler = toolHandlers.get("f5xc-api-estimate-cost")!;

        const mockEstimates = [
          {
            toolName: "tool1",
            tokens: { totalTokens: 500, schemaTokens: 0, requestTokens: 0, responseTokens: 0 },
          },
          {
            toolName: "tool2",
            tokens: { totalTokens: 750, schemaTokens: 0, requestTokens: 0, responseTokens: 0 },
          },
          {
            toolName: "tool3",
            tokens: { totalTokens: 250, schemaTokens: 0, requestTokens: 0, responseTokens: 0 },
          },
        ];
        vi.mocked(estimateMultipleToolsCost).mockReturnValue(mockEstimates as any);

        // Act
        await handler({
          toolNames: ["tool1", "tool2", "tool3"],
          detailed: false,
        });

        // Assert
        expect(createTextResponse).toHaveBeenCalledWith(
          expect.objectContaining({
            totalTokens: 1500, // 500 + 750 + 250
            toolCount: 3,
          })
        );
      });

      it("should not format when detailed is false for multiple tools", async () => {
        // Arrange
        registerEstimateCostTool(mockServer);
        const handler = toolHandlers.get("f5xc-api-estimate-cost")!;

        vi.mocked(estimateMultipleToolsCost).mockReturnValue([
          { toolName: "tool1", tokens: { totalTokens: 1000 } } as any,
        ]);

        // Act
        await handler({
          toolNames: ["tool1"],
          detailed: false,
        });

        // Assert
        expect(formatCostEstimate).not.toHaveBeenCalled();
        expect(createTextResponse).toHaveBeenCalledWith(
          expect.objectContaining({
            formatted: undefined,
          })
        );
      });
    });

    describe("workflow estimation (lines 116-117)", () => {
      it("should estimate cost for a creation plan workflow", async () => {
        // Arrange
        registerEstimateCostTool(mockServer);
        const handler = toolHandlers.get("f5xc-api-estimate-cost")!;

        const mockPlan = {
          targetResource: "http-loadbalancer",
          targetDomain: "virtual",
          totalSteps: 3,
          steps: [
            { stepNumber: 1, toolName: "tool1" },
            { stepNumber: 2, toolName: "tool2" },
            { stepNumber: 3, toolName: "tool3" },
          ],
        };

        const mockWorkflowEstimate = {
          totalTokens: 5000,
          totalSteps: 3,
          stepEstimates: [],
        };
        vi.mocked(estimateWorkflowCost).mockReturnValue(mockWorkflowEstimate as any);

        // Act
        await handler({
          plan: mockPlan,
          detailed: true,
        });

        // Assert
        expect(estimateWorkflowCost).toHaveBeenCalledWith(mockPlan);
        expect(formatWorkflowCostEstimate).toHaveBeenCalledWith(mockWorkflowEstimate);
        expect(createTextResponse).toHaveBeenCalledWith({
          type: "workflow",
          estimate: mockWorkflowEstimate,
          formatted: "Formatted workflow",
        });
      });

      it("should not format workflow when detailed is false", async () => {
        // Arrange
        registerEstimateCostTool(mockServer);
        const handler = toolHandlers.get("f5xc-api-estimate-cost")!;

        vi.mocked(estimateWorkflowCost).mockReturnValue({} as any);

        // Act
        await handler({
          plan: { totalSteps: 1, steps: [] },
          detailed: false,
        });

        // Assert
        expect(formatWorkflowCostEstimate).not.toHaveBeenCalled();
        expect(createTextResponse).toHaveBeenCalledWith(
          expect.objectContaining({
            formatted: undefined,
          })
        );
      });
    });

    describe("error handling", () => {
      it("should return error when no valid input provided", async () => {
        // Arrange
        registerEstimateCostTool(mockServer);
        const handler = toolHandlers.get("f5xc-api-estimate-cost")!;

        // Act
        await handler({});

        // Assert
        expect(createErrorResponse).toHaveBeenCalledWith(
          "No valid input provided",
          "Provide either 'toolName', 'toolNames', or 'plan' parameter"
        );
      });

      it("should return error when toolNames is empty", async () => {
        // Arrange
        registerEstimateCostTool(mockServer);
        const handler = toolHandlers.get("f5xc-api-estimate-cost")!;

        // Act
        await handler({
          toolNames: [],
        });

        // Assert
        expect(createErrorResponse).toHaveBeenCalled();
      });
    });
  });

  describe("registerPlanningTools", () => {
    it("should register all planning tools", () => {
      // Act
      registerPlanningTools(mockServer);

      // Assert
      expect(mockServer.tool).toHaveBeenCalledTimes(2);
      expect(mockServer.tool).toHaveBeenCalledWith(
        "f5xc-api-resolve-dependencies",
        expect.any(String),
        expect.any(Object),
        expect.any(Function)
      );
      expect(mockServer.tool).toHaveBeenCalledWith(
        "f5xc-api-estimate-cost",
        expect.any(String),
        expect.any(Object),
        expect.any(Function)
      );
    });
  });
});
