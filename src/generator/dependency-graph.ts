// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Dependency Graph Builder
 *
 * Builds a complete resource dependency graph from parsed operations,
 * computes reverse dependencies, and provides topological sorting
 * for resource creation order.
 */

import type { ParsedOperation } from "./openapi-parser.js";
import type { ParsedSpec } from "./openapi-parser.js";
import type {
  DependencyGraph,
  ResourceDependencies,
  ResourceReference,
  OneOfGroup,
  SubscriptionRequirement,
  SerializedDependencyGraph,
  DependencyGraphOptions,
} from "./dependency-types.js";
import { createResourceKey, parseResourceKey } from "./dependency-types.js";

/**
 * Build a complete dependency graph from parsed specifications
 *
 * @param specs - Array of parsed specification files
 * @param options - Graph generation options
 * @returns Complete dependency graph
 */
export function buildDependencyGraph(
  specs: ParsedSpec[],
  options: Partial<DependencyGraphOptions> = {}
): DependencyGraph {
  const opts: DependencyGraphOptions = {
    detectInlineRefs: true,
    computeCreationOrder: true,
    buildReverseDeps: true,
    maxDepth: 10,
    ...options,
  };

  // Collect all operations from all specs
  const allOperations: ParsedOperation[] = [];
  for (const spec of specs) {
    allOperations.push(...spec.operations);
  }

  // Build resource map: domain/resource -> operations
  const resourceMap = new Map<string, ParsedOperation[]>();
  for (const op of allOperations) {
    const key = createResourceKey(op.domain, op.resource);
    const existing = resourceMap.get(key) || [];
    existing.push(op);
    resourceMap.set(key, existing);
  }

  // Build dependencies map
  const dependencies: Record<string, ResourceDependencies> = {};

  for (const [resourceKey, operations] of resourceMap) {
    const { domain, resource } = parseResourceKey(resourceKey as `${string}/${string}`);

    // Aggregate all dependencies, oneOf groups, and subscriptions from all operations
    const allRefs: ResourceReference[] = [];
    const allOneOfGroups: OneOfGroup[] = [];
    const allSubscriptions: SubscriptionRequirement[] = [];

    for (const op of operations) {
      allRefs.push(...op.dependencies);
      allOneOfGroups.push(...op.oneOfGroups);
      allSubscriptions.push(...op.subscriptionRequirements);
    }

    // Deduplicate references by resourceType
    const uniqueRefs = deduplicateReferences(allRefs);

    // Deduplicate oneOf groups by choiceField
    const uniqueOneOfGroups = deduplicateOneOfGroups(allOneOfGroups);

    // Deduplicate subscriptions by addonService
    const uniqueSubscriptions = deduplicateSubscriptions(allSubscriptions);

    dependencies[resourceKey] = {
      resource,
      domain,
      requires: uniqueRefs,
      requiredBy: [], // Will be computed by buildReverseDependencies
      oneOfGroups: uniqueOneOfGroups,
      subscriptions: uniqueSubscriptions,
      creationOrder: [], // Will be computed by computeCreationOrder
    };
  }

  // Build reverse dependencies
  const reverseDependencies: Record<string, ResourceReference[]> = {};
  if (opts.buildReverseDeps) {
    buildReverseDependencies(dependencies, reverseDependencies);
  }

  // Compute creation order for each resource
  if (opts.computeCreationOrder) {
    for (const resourceKey of Object.keys(dependencies)) {
      const dep = dependencies[resourceKey];
      if (dep) {
        dep.creationOrder = computeCreationOrder(resourceKey, dependencies, opts.maxDepth);
      }
    }
  }

  // Build addon service map
  const addonServiceMap: Record<string, string[]> = {};
  for (const [resourceKey, deps] of Object.entries(dependencies)) {
    for (const sub of deps.subscriptions) {
      const existingList = addonServiceMap[sub.addonService];
      if (!existingList) {
        addonServiceMap[sub.addonService] = [resourceKey];
      } else if (!existingList.includes(resourceKey)) {
        existingList.push(resourceKey);
      }
    }
  }

  return {
    version: "1.0.0",
    generatedAt: opts.generatedAt || new Date().toISOString(),
    totalResources: Object.keys(dependencies).length,
    dependencies,
    addonServiceMap,
    reverseDependencies,
  };
}

/**
 * Deduplicate resource references by resourceType
 */
function deduplicateReferences(refs: ResourceReference[]): ResourceReference[] {
  const seen = new Map<string, ResourceReference>();

  for (const ref of refs) {
    const key = `${ref.domain}/${ref.resourceType}`;
    const existing = seen.get(key);

    if (!existing) {
      seen.set(key, ref);
    } else {
      // Merge: required takes precedence, inline is combined
      seen.set(key, {
        ...existing,
        required: existing.required || ref.required,
        inline: existing.inline || ref.inline,
      });
    }
  }

  return Array.from(seen.values());
}

/**
 * Deduplicate oneOf groups by choiceField
 */
function deduplicateOneOfGroups(groups: OneOfGroup[]): OneOfGroup[] {
  const seen = new Map<string, OneOfGroup>();

  for (const group of groups) {
    if (!seen.has(group.choiceField)) {
      seen.set(group.choiceField, group);
    }
    // If already seen, keep the first occurrence
  }

  return Array.from(seen.values());
}

/**
 * Deduplicate subscriptions by addonService
 */
function deduplicateSubscriptions(subs: SubscriptionRequirement[]): SubscriptionRequirement[] {
  const seen = new Map<string, SubscriptionRequirement>();

  for (const sub of subs) {
    if (!seen.has(sub.addonService)) {
      seen.set(sub.addonService, sub);
    }
  }

  return Array.from(seen.values());
}

/**
 * Build reverse dependency map (requiredBy relationships)
 */
function buildReverseDependencies(
  dependencies: Record<string, ResourceDependencies>,
  reverseDeps: Record<string, ResourceReference[]>
): void {
  for (const deps of Object.values(dependencies)) {
    for (const ref of deps.requires) {
      const refKey = createResourceKey(ref.domain || "unknown", ref.resourceType);

      if (!reverseDeps[refKey]) {
        reverseDeps[refKey] = [];
      }

      // Add reverse reference
      reverseDeps[refKey].push({
        resourceType: deps.resource,
        domain: deps.domain,
        fieldPath: ref.fieldPath,
        required: ref.required,
        inline: ref.inline,
      });

      // Also update the requiredBy on the target if it exists
      const targetDep = dependencies[refKey];
      if (targetDep) {
        targetDep.requiredBy.push({
          resourceType: deps.resource,
          domain: deps.domain,
          fieldPath: ref.fieldPath,
          required: ref.required,
          inline: ref.inline,
        });
      }
    }
  }
}

/**
 * Compute topologically sorted creation order for a resource
 * Uses depth-first search with cycle detection
 *
 * @param resourceKey - The resource to compute creation order for
 * @param dependencies - All resource dependencies
 * @param maxDepth - Maximum depth for traversal
 * @returns Array of resource keys in creation order
 */
export function computeCreationOrder(
  resourceKey: string,
  dependencies: Record<string, ResourceDependencies>,
  maxDepth: number = 10
): string[] {
  const order: string[] = [];
  const visited = new Set<string>();
  const inProgress = new Set<string>(); // For cycle detection

  function visit(key: string, depth: number): void {
    if (depth > maxDepth) {
      return; // Prevent infinite recursion
    }

    if (inProgress.has(key)) {
      // Cycle detected, skip
      return;
    }

    if (visited.has(key)) {
      return;
    }

    inProgress.add(key);

    const deps = dependencies[key];
    if (deps) {
      // Visit required dependencies first
      for (const ref of deps.requires) {
        const refKey = createResourceKey(ref.domain || "unknown", ref.resourceType);
        visit(refKey, depth + 1);
      }
    }

    inProgress.delete(key);
    visited.add(key);
    order.push(key);
  }

  visit(resourceKey, 0);
  return order;
}

/**
 * Serialize a dependency graph to JSON-compatible format
 */
export function serializeDependencyGraph(graph: DependencyGraph): string {
  const serialized: SerializedDependencyGraph = {
    version: graph.version,
    generatedAt: graph.generatedAt,
    totalResources: graph.totalResources,
    dependencies: graph.dependencies,
    addonServiceMap: graph.addonServiceMap,
    reverseDependencies: graph.reverseDependencies,
  };

  return JSON.stringify(serialized, null, 2);
}

/**
 * Deserialize a dependency graph from JSON
 */
export function deserializeDependencyGraph(json: string): DependencyGraph {
  const parsed = JSON.parse(json) as SerializedDependencyGraph;

  return {
    version: parsed.version,
    generatedAt: parsed.generatedAt,
    totalResources: parsed.totalResources,
    dependencies: parsed.dependencies,
    addonServiceMap: parsed.addonServiceMap,
    reverseDependencies: parsed.reverseDependencies,
  };
}

/**
 * Get resources that must be created before a given resource
 *
 * @param resourceKey - The target resource ("domain/resource")
 * @param graph - The dependency graph
 * @returns Array of prerequisite resource keys
 */
export function getPrerequisites(resourceKey: string, graph: DependencyGraph): string[] {
  const deps = graph.dependencies[resourceKey];
  if (!deps) {
    return [];
  }

  return deps.requires.map((ref) => createResourceKey(ref.domain || "unknown", ref.resourceType));
}

/**
 * Get resources that depend on a given resource
 *
 * @param resourceKey - The target resource ("domain/resource")
 * @param graph - The dependency graph
 * @returns Array of dependent resource keys
 */
export function getDependents(resourceKey: string, graph: DependencyGraph): string[] {
  const reverseDeps = graph.reverseDependencies[resourceKey];
  if (!reverseDeps) {
    return [];
  }

  return reverseDeps.map((ref) => createResourceKey(ref.domain, ref.resourceType));
}

/**
 * Get all resources that require a specific subscription
 *
 * @param addonService - The addon service ID
 * @param graph - The dependency graph
 * @returns Array of resource keys requiring this subscription
 */
export function getResourcesBySubscription(addonService: string, graph: DependencyGraph): string[] {
  return graph.addonServiceMap[addonService] || [];
}

/**
 * Validate the dependency graph for cycles
 *
 * @param graph - The dependency graph to validate
 * @returns Array of cycle paths found (empty if no cycles)
 */
export function validateGraph(graph: DependencyGraph): string[][] {
  const cycles: string[][] = [];
  const visited = new Set<string>();
  const recStack = new Set<string>();
  const path: string[] = [];

  function dfs(key: string): void {
    if (recStack.has(key)) {
      // Found a cycle - extract the cycle from current path
      const cycleStart = path.indexOf(key);
      if (cycleStart >= 0) {
        cycles.push([...path.slice(cycleStart), key]);
      }
      return;
    }

    if (visited.has(key)) {
      return;
    }

    visited.add(key);
    recStack.add(key);
    path.push(key);

    const deps = graph.dependencies[key];
    if (deps) {
      for (const ref of deps.requires) {
        const refKey = createResourceKey(ref.domain || "unknown", ref.resourceType);
        dfs(refKey);
      }
    }

    path.pop();
    recStack.delete(key);
  }

  for (const key of Object.keys(graph.dependencies)) {
    if (!visited.has(key)) {
      dfs(key);
    }
  }

  return cycles;
}
