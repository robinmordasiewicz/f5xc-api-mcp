// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Interactive Dependency Resolver
 *
 * Generates complete creation plans with all transitive dependencies,
 * step-by-step workflows with tool names and required inputs,
 * and handles oneOf groups with alternative paths.
 */

import {
  getResourceDependencies,
  getPrerequisiteResources,
  getOneOfGroups,
  getSubscriptionRequirements,
} from "./dependencies.js";
import { searchTools } from "./search.js";
import { getToolByName } from "../registry.js";
import type { ResourceReference } from "../../generator/dependency-types.js";
import { createResourceKey } from "../../generator/dependency-types.js";

/**
 * A single step in a creation workflow
 */
export interface WorkflowStep {
  /** Step number in the sequence */
  stepNumber: number;
  /** Action description */
  action: "create" | "configure" | "verify";
  /** Resource domain */
  domain: string;
  /** Resource type */
  resource: string;
  /** Full tool name for this step */
  toolName: string;
  /** Resources that must be created before this step */
  dependsOn: string[];
  /** Whether this step is optional */
  optional: boolean;
  /** Required input parameters */
  requiredInputs: string[];
  /** OneOf choices that must be made for this resource */
  oneOfChoices?: Array<{
    field: string;
    options: string[];
    description?: string;
  }>;
  /** Notes or hints for this step */
  notes?: string;
}

/**
 * Alternative path in a creation plan (for oneOf choices)
 */
export interface AlternativePath {
  /** Name of the choice field */
  choiceField: string;
  /** Selected option */
  selectedOption: string;
  /** Steps specific to this alternative */
  steps: WorkflowStep[];
  /** Description of what this alternative provides */
  description?: string;
}

/**
 * Complete creation plan for a resource
 */
export interface CreationPlan {
  /** Target resource to create */
  targetResource: string;
  /** Target domain */
  targetDomain: string;
  /** Total number of steps */
  totalSteps: number;
  /** Ordered workflow steps */
  steps: WorkflowStep[];
  /** Warnings about the plan */
  warnings: string[];
  /** Alternative paths for oneOf choices */
  alternatives: AlternativePath[];
  /** Required subscriptions */
  subscriptions: string[];
  /** Resources that already exist (skip these steps) */
  existingResources?: string[];
  /** Estimated complexity (low, medium, high) */
  complexity: "low" | "medium" | "high";
}

/**
 * Parameters for resolving dependencies
 */
export interface ResolveParams {
  /** Target resource to create */
  resource: string;
  /** Domain containing the resource */
  domain: string;
  /** Resources that already exist (will be skipped) */
  existingResources?: string[];
  /** Whether to include optional dependencies */
  includeOptional?: boolean;
  /** Maximum depth for dependency traversal */
  maxDepth?: number;
  /** Whether to expand oneOf alternatives */
  expandAlternatives?: boolean;
}

/**
 * Result of dependency resolution
 */
export interface ResolveResult {
  success: boolean;
  plan?: CreationPlan;
  error?: string;
}

/**
 * Find the create tool for a resource
 */
function findCreateTool(domain: string, resource: string): string | null {
  // Search for create tool matching this resource
  const results = searchTools(`${resource} create`, {
    domains: [domain],
    operations: ["create"],
    limit: 5,
  });

  if (results.length > 0 && results[0]) {
    return results[0].tool.name;
  }

  // Try alternative naming patterns
  const normalizedResource = resource.replace(/-/g, "_");
  const altResults = searchTools(`${normalizedResource} create`, {
    operations: ["create"],
    limit: 5,
  });

  if (altResults.length > 0 && altResults[0]) {
    return altResults[0].tool.name;
  }

  return null;
}

/**
 * Get required input parameters for a tool
 */
function getRequiredInputs(toolName: string): string[] {
  const tool = getToolByName(toolName);
  if (!tool) {
    return ["namespace", "name"];
  }

  const required: string[] = [];

  // Add path parameters
  for (const param of tool.pathParameters) {
    required.push(param.name);
  }

  // Add required body fields (simplified - just common ones)
  if (tool.requiredParams) {
    required.push(...tool.requiredParams);
  }

  // Always include common required fields
  if (!required.includes("namespace")) {
    required.push("namespace");
  }
  if (!required.includes("name")) {
    required.push("name");
  }

  return [...new Set(required)];
}

/**
 * Resolve all transitive dependencies for a resource
 */
function resolveTransitiveDependencies(
  domain: string,
  resource: string,
  existingResources: Set<string>,
  visited: Set<string>,
  includeOptional: boolean,
  maxDepth: number,
  currentDepth: number = 0
): ResourceReference[] {
  const key = createResourceKey(domain, resource);

  if (visited.has(key) || currentDepth > maxDepth) {
    return [];
  }

  visited.add(key);

  const prereqs = getPrerequisiteResources(domain, resource);
  const allDeps: ResourceReference[] = [];

  for (const prereq of prereqs) {
    // Skip optional if not requested
    if (!prereq.required && !includeOptional) {
      continue;
    }

    // Skip if already exists
    const prereqKey = createResourceKey(prereq.domain, prereq.resourceType);
    if (existingResources.has(prereqKey)) {
      continue;
    }

    // Recursively resolve this dependency's dependencies
    const transitive = resolveTransitiveDependencies(
      prereq.domain,
      prereq.resourceType,
      existingResources,
      visited,
      includeOptional,
      maxDepth,
      currentDepth + 1
    );

    allDeps.push(...transitive);
    allDeps.push(prereq);
  }

  return allDeps;
}

/**
 * Topologically sort dependencies
 */
function topologicalSort(dependencies: ResourceReference[]): ResourceReference[] {
  // Build adjacency list
  const graph = new Map<string, Set<string>>();
  const inDegree = new Map<string, number>();
  const resourceMap = new Map<string, ResourceReference>();

  for (const dep of dependencies) {
    const key = createResourceKey(dep.domain, dep.resourceType);
    resourceMap.set(key, dep);
    if (!graph.has(key)) {
      graph.set(key, new Set());
      inDegree.set(key, 0);
    }
  }

  // Build edges based on dependencies
  for (const dep of dependencies) {
    const key = createResourceKey(dep.domain, dep.resourceType);
    const prereqs = getPrerequisiteResources(dep.domain, dep.resourceType);

    for (const prereq of prereqs) {
      const prereqKey = createResourceKey(prereq.domain, prereq.resourceType);
      if (graph.has(prereqKey)) {
        graph.get(prereqKey)?.add(key);
        inDegree.set(key, (inDegree.get(key) ?? 0) + 1);
      }
    }
  }

  // Kahn's algorithm
  const queue: string[] = [];
  for (const [key, degree] of inDegree) {
    if (degree === 0) {
      queue.push(key);
    }
  }

  const sorted: ResourceReference[] = [];
  while (queue.length > 0) {
    const key = queue.shift()!;
    const resource = resourceMap.get(key);
    if (resource) {
      sorted.push(resource);
    }

    for (const neighbor of graph.get(key) ?? []) {
      const newDegree = (inDegree.get(neighbor) ?? 1) - 1;
      inDegree.set(neighbor, newDegree);
      if (newDegree === 0) {
        queue.push(neighbor);
      }
    }
  }

  return sorted;
}

/**
 * Resolve dependencies and generate a complete creation plan
 */
export function resolveDependencies(params: ResolveParams): ResolveResult {
  const {
    resource,
    domain,
    existingResources = [],
    includeOptional = false,
    maxDepth = 10,
    expandAlternatives = false,
  } = params;

  const existingSet = new Set(existingResources);
  const visited = new Set<string>();
  const warnings: string[] = [];

  // Check if target resource exists in dependency graph
  const deps = getResourceDependencies(domain, resource);
  if (!deps) {
    return {
      success: false,
      error:
        `Resource '${domain}/${resource}' not found in dependency graph. ` +
        `Try searching for available resources with f5xc-api-search-resources.`,
    };
  }

  // Resolve all transitive dependencies
  const allDeps = resolveTransitiveDependencies(
    domain,
    resource,
    existingSet,
    visited,
    includeOptional,
    maxDepth
  );

  // Topologically sort dependencies
  const sortedDeps = topologicalSort(allDeps);

  // Build workflow steps
  const steps: WorkflowStep[] = [];
  let stepNumber = 1;

  for (const dep of sortedDeps) {
    const toolName = findCreateTool(dep.domain, dep.resourceType);

    if (!toolName) {
      warnings.push(
        `No create tool found for ${dep.domain}/${dep.resourceType}. ` +
          `This resource may need to be created manually.`
      );
      continue;
    }

    const prereqs = getPrerequisiteResources(dep.domain, dep.resourceType);
    const dependsOn = prereqs
      .filter((p) => !existingSet.has(createResourceKey(p.domain, p.resourceType)))
      .map((p) => `${p.domain}/${p.resourceType}`);

    const oneOfGroups = getOneOfGroups(dep.domain, dep.resourceType);

    const step: WorkflowStep = {
      stepNumber,
      action: "create",
      domain: dep.domain,
      resource: dep.resourceType,
      toolName,
      dependsOn,
      optional: !dep.required,
      requiredInputs: getRequiredInputs(toolName),
    };

    if (oneOfGroups.length > 0) {
      step.oneOfChoices = oneOfGroups.map((g) => ({
        field: g.choiceField,
        options: g.options,
        description: g.description,
      }));
    }

    steps.push(step);
    stepNumber++;
  }

  // Add final step for target resource
  const targetToolName = findCreateTool(domain, resource);
  if (targetToolName) {
    const targetPrereqs = getPrerequisiteResources(domain, resource);
    const dependsOn = targetPrereqs
      .filter((p) => !existingSet.has(createResourceKey(p.domain, p.resourceType)))
      .map((p) => `${p.domain}/${p.resourceType}`);

    const oneOfGroups = getOneOfGroups(domain, resource);

    const targetStep: WorkflowStep = {
      stepNumber,
      action: "create",
      domain,
      resource,
      toolName: targetToolName,
      dependsOn,
      optional: false,
      requiredInputs: getRequiredInputs(targetToolName),
    };

    if (oneOfGroups.length > 0) {
      targetStep.oneOfChoices = oneOfGroups.map((g) => ({
        field: g.choiceField,
        options: g.options,
        description: g.description,
      }));
    }

    steps.push(targetStep);
  } else {
    warnings.push(`No create tool found for target resource ${domain}/${resource}.`);
  }

  // Collect subscription requirements
  const subscriptions: string[] = [];
  const subs = getSubscriptionRequirements(domain, resource);
  for (const sub of subs) {
    subscriptions.push(`${sub.displayName} (${sub.tier})${sub.required ? " - required" : ""}`);
  }

  // Build alternatives for oneOf choices if requested
  const alternatives: AlternativePath[] = [];
  if (expandAlternatives) {
    const oneOfGroups = getOneOfGroups(domain, resource);
    for (const group of oneOfGroups) {
      for (const option of group.options) {
        alternatives.push({
          choiceField: group.choiceField,
          selectedOption: option,
          steps: [], // Would need more complex logic to fill these
          description: `Alternative using ${option} for ${group.choiceField}`,
        });
      }
    }
  }

  // Determine complexity
  let complexity: "low" | "medium" | "high" = "low";
  if (steps.length > 5) {
    complexity = "high";
  } else if (steps.length > 2) {
    complexity = "medium";
  }

  const plan: CreationPlan = {
    targetResource: resource,
    targetDomain: domain,
    totalSteps: steps.length,
    steps,
    warnings,
    alternatives,
    subscriptions,
    existingResources: existingResources.length > 0 ? existingResources : undefined,
    complexity,
  };

  return {
    success: true,
    plan,
  };
}

/**
 * Format a creation plan for human-readable output
 */
export function formatCreationPlan(plan: CreationPlan): string {
  const lines: string[] = [];

  lines.push(`# Creation Plan for ${plan.targetDomain}/${plan.targetResource}`);
  lines.push("");
  lines.push(`**Complexity**: ${plan.complexity}`);
  lines.push(`**Total Steps**: ${plan.totalSteps}`);
  lines.push("");

  if (plan.subscriptions.length > 0) {
    lines.push("## Required Subscriptions");
    for (const sub of plan.subscriptions) {
      lines.push(`- ${sub}`);
    }
    lines.push("");
  }

  if (plan.existingResources && plan.existingResources.length > 0) {
    lines.push("## Existing Resources (Skipped)");
    for (const res of plan.existingResources) {
      lines.push(`- ${res}`);
    }
    lines.push("");
  }

  lines.push("## Workflow Steps");
  lines.push("");

  for (const step of plan.steps) {
    lines.push(`### Step ${step.stepNumber}: ${step.action} ${step.domain}/${step.resource}`);
    lines.push(`**Tool**: \`${step.toolName}\``);
    lines.push(`**Optional**: ${step.optional ? "Yes" : "No"}`);

    if (step.dependsOn.length > 0) {
      lines.push(`**Depends On**: ${step.dependsOn.join(", ")}`);
    }

    if (step.requiredInputs.length > 0) {
      lines.push(`**Required Inputs**: ${step.requiredInputs.join(", ")}`);
    }

    if (step.oneOfChoices && step.oneOfChoices.length > 0) {
      lines.push("**Mutually Exclusive Choices**:");
      for (const choice of step.oneOfChoices) {
        lines.push(`  - \`${choice.field}\`: Choose one of [${choice.options.join(", ")}]`);
      }
    }

    if (step.notes) {
      lines.push(`**Notes**: ${step.notes}`);
    }

    lines.push("");
  }

  if (plan.warnings.length > 0) {
    lines.push("## Warnings");
    for (const warning of plan.warnings) {
      lines.push(`- ⚠️ ${warning}`);
    }
    lines.push("");
  }

  if (plan.alternatives.length > 0) {
    lines.push("## Alternative Paths");
    for (const alt of plan.alternatives) {
      lines.push(`- **${alt.choiceField}**: ${alt.selectedOption}`);
      if (alt.description) {
        lines.push(`  ${alt.description}`);
      }
    }
    lines.push("");
  }

  return lines.join("\n");
}

/**
 * Generate a compact JSON creation plan for programmatic use
 */
export function generateCompactPlan(params: ResolveParams): {
  success: boolean;
  steps?: Array<{
    tool: string;
    resource: string;
    inputs: string[];
    choices?: Record<string, string[]>;
  }>;
  error?: string;
} {
  const result = resolveDependencies(params);

  if (!result.success || !result.plan) {
    return {
      success: false,
      error: result.error,
    };
  }

  const steps = result.plan.steps.map((step) => {
    const compactStep: {
      tool: string;
      resource: string;
      inputs: string[];
      choices?: Record<string, string[]>;
    } = {
      tool: step.toolName,
      resource: `${step.domain}/${step.resource}`,
      inputs: step.requiredInputs,
    };

    if (step.oneOfChoices && step.oneOfChoices.length > 0) {
      compactStep.choices = {};
      for (const choice of step.oneOfChoices) {
        compactStep.choices[choice.field] = choice.options;
      }
    }

    return compactStep;
  });

  return {
    success: true,
    steps,
  };
}
