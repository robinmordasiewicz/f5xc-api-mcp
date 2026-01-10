// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Cost and Performance Estimation
 *
 * Provides token usage estimates, latency expectations, and
 * workflow cost aggregation for F5XC API operations.
 */

import { getToolByName } from "../registry.js";
import { toolExists, getToolEntry } from "./index-loader.js";
import type { CreationPlan, WorkflowStep } from "./resolver.js";

/**
 * Latency classification from performance_impact
 */
export type LatencyLevel = "low" | "moderate" | "high" | "unknown";

/**
 * Token cost estimate for a single tool
 */
export interface TokenEstimate {
  /** Estimated tokens for tool schema/description */
  schemaTokens: number;
  /** Estimated tokens for typical request body */
  requestTokens: number;
  /** Estimated tokens for typical response */
  responseTokens: number;
  /** Total estimated tokens for one call */
  totalTokens: number;
}

/**
 * Latency estimate for a single tool
 */
export interface LatencyEstimate {
  /** Latency level from performance_impact */
  level: LatencyLevel;
  /** Estimated milliseconds (rough approximation) */
  estimatedMs: number;
  /** Description of latency expectation */
  description: string;
}

/**
 * Complete cost estimate for a single tool
 */
export interface ToolCostEstimate {
  /** Tool name */
  toolName: string;
  /** Token estimates */
  tokens: TokenEstimate;
  /** Latency estimate */
  latency: LatencyEstimate;
  /** Danger level */
  dangerLevel: "low" | "medium" | "high" | "critical";
  /** Whether tool exists */
  exists: boolean;
}

/**
 * Workflow cost aggregation
 */
export interface WorkflowCostEstimate {
  /** Total estimated tokens across all steps */
  totalTokens: number;
  /** Average latency level */
  averageLatency: LatencyLevel;
  /** Total estimated time in milliseconds */
  estimatedTotalMs: number;
  /** Number of steps */
  stepCount: number;
  /** Per-step breakdown */
  steps: Array<{
    stepNumber: number;
    toolName: string;
    tokens: number;
    latencyMs: number;
  }>;
  /** Warnings about estimates */
  warnings: string[];
}

/**
 * Parameters for cost estimation
 */
export interface EstimateCostParams {
  /** Tool name to estimate */
  toolName?: string;
  /** Multiple tools to estimate */
  toolNames?: string[];
  /** Creation plan to estimate */
  plan?: CreationPlan;
  /** Include detailed breakdown */
  detailed?: boolean;
}

/**
 * Default latency level to milliseconds mapping (fallback when no discovery data)
 */
const DEFAULT_LATENCY_MS: Record<LatencyLevel, number> = {
  low: 500,
  moderate: 2000,
  high: 5000,
  unknown: 1500,
};

/**
 * Latency level descriptions
 */
const LATENCY_DESCRIPTIONS: Record<LatencyLevel, string> = {
  low: "Fast operation, typically completes in under 1 second",
  moderate: "Standard operation, may take 1-3 seconds",
  high: "Complex operation, may take 3-10 seconds or involve async processing",
  unknown: "Latency not specified, estimate based on operation type",
};

/**
 * Get milliseconds for latency level, using discovered data when available
 */
function getLatencyMs(toolName: string, level: LatencyLevel): number {
  // Check for discovered response time from live API exploration
  const entry = getToolEntry(toolName);
  if (entry?.discoveryResponseTimeMs) {
    return entry.discoveryResponseTimeMs;
  }
  // Fall back to default estimates
  return DEFAULT_LATENCY_MS[level];
}

/**
 * Estimate token count for a string (rough approximation)
 */
function estimateTokens(text: string): number {
  // Rough approximation: 1 token per 4 characters for English text
  // JSON tends to be more verbose, so use 1 token per 3.5 characters
  return Math.ceil(text.length / 3.5);
}

/**
 * Get latency level from tool metadata
 */
function getLatencyLevel(toolName: string): LatencyLevel {
  const tool = getToolByName(toolName);
  if (!tool) {
    return "unknown";
  }

  // Check operation metadata for performance impact
  const metadata = tool.operationMetadata;
  if (metadata?.performance_impact?.latency) {
    const latency = metadata.performance_impact.latency;
    if (latency === "low" || latency === "moderate" || latency === "high") {
      return latency;
    }
  }

  // Fallback: estimate based on operation type
  switch (tool.operation) {
    case "list":
      return "low";
    case "get":
      return "low";
    case "create":
      return "moderate";
    case "update":
      return "moderate";
    case "delete":
      return "moderate";
    default:
      return "unknown";
  }
}

/**
 * Estimate tokens for a tool call
 */
export function estimateToolTokens(toolName: string): TokenEstimate {
  const tool = getToolByName(toolName);

  if (!tool) {
    // Default estimate for unknown tools
    return {
      schemaTokens: 200,
      requestTokens: 100,
      responseTokens: 300,
      totalTokens: 600,
    };
  }

  // Schema tokens: tool description + parameters
  const descriptionTokens = estimateTokens(tool.description);
  const pathParamTokens = tool.pathParameters.length * 30;
  const queryParamTokens = (tool.queryParameters?.length ?? 0) * 40;
  const schemaTokens = descriptionTokens + pathParamTokens + queryParamTokens;

  // Request tokens: based on operation type
  let requestTokens: number;
  switch (tool.operation) {
    case "create":
      requestTokens = 500; // Create operations typically have larger request bodies
      break;
    case "update":
      requestTokens = 400;
      break;
    case "list":
      requestTokens = 50; // List operations have minimal request
      break;
    case "get":
      requestTokens = 30;
      break;
    case "delete":
      requestTokens = 30;
      break;
    default:
      requestTokens = 200;
  }

  // Response tokens: based on operation type
  let responseTokens: number;
  switch (tool.operation) {
    case "list":
      responseTokens = 1000; // List operations can return many items
      break;
    case "get":
      responseTokens = 500;
      break;
    case "create":
      responseTokens = 400;
      break;
    case "update":
      responseTokens = 400;
      break;
    case "delete":
      responseTokens = 100;
      break;
    default:
      responseTokens = 300;
  }

  return {
    schemaTokens,
    requestTokens,
    responseTokens,
    totalTokens: schemaTokens + requestTokens + responseTokens,
  };
}

/**
 * Estimate latency for a tool call
 */
export function estimateToolLatency(toolName: string): LatencyEstimate {
  const level = getLatencyLevel(toolName);
  return {
    level,
    estimatedMs: getLatencyMs(toolName, level),
    description: LATENCY_DESCRIPTIONS[level],
  };
}

/**
 * Get complete cost estimate for a single tool
 */
export function estimateToolCost(toolName: string): ToolCostEstimate {
  const exists = toolExists(toolName);
  const tool = getToolByName(toolName);

  return {
    toolName,
    tokens: estimateToolTokens(toolName),
    latency: estimateToolLatency(toolName),
    dangerLevel: tool?.dangerLevel ?? "low",
    exists,
  };
}

/**
 * Estimate costs for multiple tools
 */
export function estimateMultipleToolsCost(toolNames: string[]): ToolCostEstimate[] {
  return toolNames.map((name) => estimateToolCost(name));
}

/**
 * Aggregate latency levels into average
 */
function aggregateLatency(levels: LatencyLevel[]): LatencyLevel {
  if (levels.length === 0) {
    return "unknown";
  }

  const levelValues: Record<LatencyLevel, number> = {
    low: 1,
    moderate: 2,
    high: 3,
    unknown: 2,
  };

  const total = levels.reduce((sum, level) => sum + levelValues[level], 0);
  const avg = total / levels.length;

  if (avg < 1.5) return "low";
  if (avg < 2.5) return "moderate";
  return "high";
}

/**
 * Estimate costs for a creation plan workflow
 */
export function estimateWorkflowCost(plan: CreationPlan): WorkflowCostEstimate {
  const warnings: string[] = [];
  const latencyLevels: LatencyLevel[] = [];

  const steps = plan.steps.map((step: WorkflowStep) => {
    const tokens = estimateToolTokens(step.toolName);
    const latency = estimateToolLatency(step.toolName);

    if (!toolExists(step.toolName)) {
      warnings.push(`Tool '${step.toolName}' not found - estimates may be inaccurate`);
    }

    latencyLevels.push(latency.level);

    return {
      stepNumber: step.stepNumber,
      toolName: step.toolName,
      tokens: tokens.totalTokens,
      latencyMs: latency.estimatedMs,
    };
  });

  const totalTokens = steps.reduce((sum, step) => sum + step.tokens, 0);
  const estimatedTotalMs = steps.reduce((sum, step) => sum + step.latencyMs, 0);

  return {
    totalTokens,
    averageLatency: aggregateLatency(latencyLevels),
    estimatedTotalMs,
    stepCount: steps.length,
    steps,
    warnings,
  };
}

/**
 * Format cost estimate for human-readable output
 */
export function formatCostEstimate(estimate: ToolCostEstimate): string {
  const lines: string[] = [];

  lines.push(`# Cost Estimate: ${estimate.toolName}`);
  lines.push("");

  if (!estimate.exists) {
    lines.push("**Warning**: Tool not found - estimates are approximate");
    lines.push("");
  }

  lines.push("## Token Usage");
  lines.push(`- Schema/Description: ~${estimate.tokens.schemaTokens} tokens`);
  lines.push(`- Request Body: ~${estimate.tokens.requestTokens} tokens`);
  lines.push(`- Response: ~${estimate.tokens.responseTokens} tokens`);
  lines.push(`- **Total per call**: ~${estimate.tokens.totalTokens} tokens`);
  lines.push("");

  lines.push("## Latency");
  lines.push(`- Level: ${estimate.latency.level}`);
  lines.push(`- Estimated: ~${estimate.latency.estimatedMs}ms`);
  lines.push(`- ${estimate.latency.description}`);
  lines.push("");

  lines.push("## Risk");
  lines.push(`- Danger Level: ${estimate.dangerLevel}`);

  return lines.join("\n");
}

/**
 * Format workflow cost estimate for human-readable output
 */
export function formatWorkflowCostEstimate(estimate: WorkflowCostEstimate): string {
  const lines: string[] = [];

  lines.push("# Workflow Cost Estimate");
  lines.push("");
  lines.push("## Summary");
  lines.push(`- **Total Steps**: ${estimate.stepCount}`);
  lines.push(`- **Total Tokens**: ~${estimate.totalTokens}`);
  lines.push(`- **Average Latency**: ${estimate.averageLatency}`);
  lines.push(`- **Estimated Total Time**: ~${(estimate.estimatedTotalMs / 1000).toFixed(1)}s`);
  lines.push("");

  if (estimate.warnings.length > 0) {
    lines.push("## Warnings");
    for (const warning of estimate.warnings) {
      lines.push(`- ${warning}`);
    }
    lines.push("");
  }

  lines.push("## Step Breakdown");
  lines.push("");
  lines.push("| Step | Tool | Tokens | Latency |");
  lines.push("|------|------|--------|---------|");
  for (const step of estimate.steps) {
    lines.push(
      `| ${step.stepNumber} | ${step.toolName} | ~${step.tokens} | ~${step.latencyMs}ms |`
    );
  }

  return lines.join("\n");
}
