// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Dependency Discovery Module
 *
 * Provides LLM-accessible tools for querying resource dependency information,
 * prerequisite sequences, mutually exclusive fields, and subscription requirements.
 *
 * This module enables LLMs to understand resource relationships and execute
 * operations in the correct order without hallucinating dependencies.
 */

import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import type {
  DependencyGraph,
  ResourceDependencies,
  ResourceReference,
  OneOfGroup,
  SubscriptionRequirement,
  DependencyDiscoveryAction,
  DependencyDiscoveryResponse,
} from "../../generator/dependency-types.js";
import {
  deserializeDependencyGraph,
  getResourcesBySubscription,
} from "../../generator/dependency-graph.js";
import { createResourceKey } from "../../generator/dependency-types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Cached dependency graph
 */
let cachedGraph: DependencyGraph | null = null;

/**
 * Path to the generated dependency graph JSON
 */
const DEPENDENCY_GRAPH_PATH = join(__dirname, "..", "generated", "dependency-graph.json");

/**
 * Load the dependency graph from the generated JSON file
 * Uses caching for efficiency
 */
export function loadDependencyGraph(): DependencyGraph {
  if (cachedGraph) {
    return cachedGraph;
  }

  if (!existsSync(DEPENDENCY_GRAPH_PATH)) {
    throw new Error(
      `Dependency graph not found at ${DEPENDENCY_GRAPH_PATH}. ` +
        "Run 'npm run generate' to create it."
    );
  }

  const json = readFileSync(DEPENDENCY_GRAPH_PATH, "utf-8");
  cachedGraph = deserializeDependencyGraph(json);
  return cachedGraph;
}

/**
 * Clear the cached dependency graph (useful for testing or hot reload)
 */
export function clearDependencyCache(): void {
  cachedGraph = null;
}

/**
 * Get dependency information for a specific resource
 *
 * @param domain - The domain containing the resource (e.g., "virtual")
 * @param resource - The resource name (e.g., "http-loadbalancer")
 * @returns Resource dependencies or null if not found
 */
export function getResourceDependencies(
  domain: string,
  resource: string
): ResourceDependencies | null {
  const graph = loadDependencyGraph();
  const key = createResourceKey(domain, resource);
  return graph.dependencies[key] ?? null;
}

/**
 * Get the recommended creation order for a resource and its dependencies
 *
 * @param domain - The domain containing the resource
 * @param resource - The resource name
 * @returns Array of resource keys in creation order (prerequisites first)
 */
export function getCreationOrder(domain: string, resource: string): string[] {
  const deps = getResourceDependencies(domain, resource);
  if (!deps) {
    return [];
  }
  return deps.creationOrder;
}

/**
 * Get resources that must be created before this resource
 *
 * @param domain - The domain containing the resource
 * @param resource - The resource name
 * @returns Array of prerequisite resource references
 */
export function getPrerequisiteResources(domain: string, resource: string): ResourceReference[] {
  const deps = getResourceDependencies(domain, resource);
  if (!deps) {
    return [];
  }
  return deps.requires;
}

/**
 * Get resources that depend on this resource
 *
 * @param domain - The domain containing the resource
 * @param resource - The resource name
 * @returns Array of dependent resource references
 */
export function getDependentResources(domain: string, resource: string): ResourceReference[] {
  const deps = getResourceDependencies(domain, resource);
  if (!deps) {
    return [];
  }
  return deps.requiredBy;
}

/**
 * Get mutually exclusive field groups for a resource
 *
 * @param domain - The domain containing the resource
 * @param resource - The resource name
 * @returns Array of oneOf field groups
 */
export function getOneOfGroups(domain: string, resource: string): OneOfGroup[] {
  const deps = getResourceDependencies(domain, resource);
  if (!deps) {
    return [];
  }
  return deps.oneOfGroups;
}

/**
 * Get subscription requirements for a resource
 *
 * @param domain - The domain containing the resource
 * @param resource - The resource name
 * @returns Array of subscription requirements
 */
export function getSubscriptionRequirements(
  domain: string,
  resource: string
): SubscriptionRequirement[] {
  const deps = getResourceDependencies(domain, resource);
  if (!deps) {
    return [];
  }
  return deps.subscriptions;
}

/**
 * Get all resources that require a specific addon service subscription
 *
 * @param addonService - The addon service ID (e.g., "f5xc_waap_advanced")
 * @returns Array of resource keys requiring this subscription
 */
export function getResourcesRequiringSubscription(addonService: string): string[] {
  const graph = loadDependencyGraph();
  return getResourcesBySubscription(addonService, graph);
}

/**
 * Get all available addon services
 *
 * @returns Array of addon service IDs
 */
export function getAvailableAddonServices(): string[] {
  const graph = loadDependencyGraph();
  return Object.keys(graph.addonServiceMap);
}

/**
 * Format a resource reference for human-readable output
 */
function formatResourceRef(ref: ResourceReference): string {
  const domain = ref.domain || "unknown";
  const required = ref.required ? " (required)" : " (optional)";
  const inline = ref.inline ? " [inline allowed]" : "";
  return `${domain}/${ref.resourceType}${required}${inline}`;
}

/**
 * Generate a comprehensive dependency report for a resource
 *
 * @param domain - The domain containing the resource
 * @param resource - The resource name
 * @param action - The type of information to retrieve
 * @returns Formatted dependency discovery response
 */
export function generateDependencyReport(
  domain: string,
  resource: string,
  action: DependencyDiscoveryAction = "full"
): DependencyDiscoveryResponse {
  const deps = getResourceDependencies(domain, resource);

  if (!deps) {
    return {
      resource,
      domain,
      prerequisites: [],
      dependents: [],
      mutuallyExclusiveFields: [],
      subscriptionRequirements: [],
      creationSequence: [],
    };
  }

  const response: DependencyDiscoveryResponse = {
    resource,
    domain,
    prerequisites: [],
    dependents: [],
    mutuallyExclusiveFields: [],
    subscriptionRequirements: [],
    creationSequence: [],
  };

  // Build response based on action
  if (action === "full" || action === "prerequisites") {
    response.prerequisites = deps.requires.map(formatResourceRef);
  }

  if (action === "full" || action === "dependents") {
    response.dependents = deps.requiredBy.map(formatResourceRef);
  }

  if (action === "full" || action === "oneOf") {
    response.mutuallyExclusiveFields = deps.oneOfGroups.map((group) => ({
      field: group.choiceField,
      options: group.options,
    }));
  }

  if (action === "full" || action === "subscriptions") {
    response.subscriptionRequirements = deps.subscriptions.map(
      (sub) => `${sub.displayName} (${sub.tier})${sub.required ? " - required" : ""}`
    );
  }

  if (action === "full" || action === "creationOrder") {
    response.creationSequence = deps.creationOrder;
  }

  return response;
}

/**
 * Get dependency graph statistics
 */
export function getDependencyStats(): {
  totalResources: number;
  totalDependencies: number;
  totalOneOfGroups: number;
  totalSubscriptions: number;
  addonServices: string[];
  graphVersion: string;
  generatedAt: string;
} {
  const graph = loadDependencyGraph();

  let totalDependencies = 0;
  let totalOneOfGroups = 0;
  let totalSubscriptions = 0;

  for (const deps of Object.values(graph.dependencies)) {
    totalDependencies += deps.requires.length;
    totalOneOfGroups += deps.oneOfGroups.length;
    totalSubscriptions += deps.subscriptions.length;
  }

  return {
    totalResources: graph.totalResources,
    totalDependencies,
    totalOneOfGroups,
    totalSubscriptions,
    addonServices: Object.keys(graph.addonServiceMap),
    graphVersion: graph.version,
    generatedAt: graph.generatedAt,
  };
}

/**
 * Search for resources by domain
 *
 * @param domain - The domain to search in
 * @returns Array of resource names in the domain
 */
export function getResourcesInDomain(domain: string): string[] {
  const graph = loadDependencyGraph();
  const resources: string[] = [];

  for (const [_key, deps] of Object.entries(graph.dependencies)) {
    if (deps.domain === domain) {
      resources.push(deps.resource);
    }
  }

  return resources.sort();
}

/**
 * Get all domains in the dependency graph
 */
export function getAllDependencyDomains(): string[] {
  const graph = loadDependencyGraph();
  const domains = new Set<string>();

  for (const deps of Object.values(graph.dependencies)) {
    domains.add(deps.domain);
  }

  return Array.from(domains).sort();
}
