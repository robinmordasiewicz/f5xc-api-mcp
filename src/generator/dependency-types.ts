// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Dependency Intelligence Type Definitions
 *
 * Types for resource dependency tracking, oneOf/anyOf field extraction,
 * subscription awareness, and sequencing intelligence.
 *
 * These types enable LLMs to understand resource relationships and
 * execute operations in the correct order.
 */

/**
 * Represents a reference from one resource to another via $ref patterns
 */
export interface ResourceReference {
  /** The type of resource being referenced (e.g., "origin_pool") */
  resourceType: string;
  /** The domain the referenced resource belongs to (e.g., "network") */
  domain: string;
  /** The JSON path where this reference appears (e.g., "spec.default_route_pools") */
  fieldPath: string;
  /** Whether this reference is required for the parent resource to function */
  required: boolean;
  /** Whether the reference allows inline definition vs external reference only */
  inline: boolean;
}

/**
 * Represents a group of mutually exclusive fields (oneOf/anyOf patterns)
 * Extracted from x-ves-oneof-field-* OpenAPI extensions
 */
export interface OneOfGroup {
  /** The name of the choice field (e.g., "advertise_choice") */
  choiceField: string;
  /** Available options for this choice (e.g., ["site", "virtual_site", "public_default_vip"]) */
  options: string[];
  /** JSON path where this oneOf group appears */
  fieldPath: string;
  /** Human-readable description of the choice */
  description?: string;
}

/**
 * Represents a subscription or addon service requirement
 */
export interface SubscriptionRequirement {
  /** Internal addon service identifier (e.g., "f5xc_waap_advanced") */
  addonService: string;
  /** Human-readable display name */
  displayName: string;
  /** Subscription tier level (e.g., "advanced", "premium") */
  tier: string;
  /** Whether this subscription is required or optional for the resource */
  required: boolean;
}

/**
 * Complete dependency information for a single resource
 */
export interface ResourceDependencies {
  /** Resource name (e.g., "http-loadbalancer") */
  resource: string;
  /** Domain the resource belongs to (e.g., "virtual") */
  domain: string;
  /** Resources this resource depends on (must exist before creation) */
  requires: ResourceReference[];
  /** Resources that depend on this resource (will break if deleted) */
  requiredBy: ResourceReference[];
  /** Mutually exclusive field groups within this resource */
  oneOfGroups: OneOfGroup[];
  /** Subscription/addon requirements for this resource */
  subscriptions: SubscriptionRequirement[];
  /** Topologically sorted creation order for this resource and its dependencies */
  creationOrder: string[];
}

/**
 * Complete dependency graph for the entire API
 */
export interface DependencyGraph {
  /** Schema version for forwards compatibility */
  version: string;
  /** Timestamp when the graph was generated */
  generatedAt: string;
  /** Total number of resources in the graph */
  totalResources: number;
  /** Map of "domain/resource" -> ResourceDependencies */
  dependencies: Record<string, ResourceDependencies>;
  /** Map of addon service ID -> list of resources requiring it */
  addonServiceMap: Record<string, string[]>;
  /** Reverse dependency lookup: "domain/resource" -> resources that depend on it */
  reverseDependencies: Record<string, ResourceReference[]>;
}

/**
 * Serializable version of DependencyGraph for JSON storage
 * Uses Record instead of Map for JSON compatibility
 */
export interface SerializedDependencyGraph {
  version: string;
  generatedAt: string;
  totalResources: number;
  dependencies: Record<string, ResourceDependencies>;
  addonServiceMap: Record<string, string[]>;
  reverseDependencies: Record<string, ResourceReference[]>;
}

/**
 * Result of parsing a $ref string from OpenAPI schema
 */
export interface ParsedRef {
  /** Full schema path (e.g., "#/components/schemas/origin_poolCreateRequest") */
  fullPath: string;
  /** Extracted schema name (e.g., "origin_poolCreateRequest") */
  schemaName: string;
  /** Inferred resource type (e.g., "origin_pool") */
  resourceType: string | null;
  /** Inferred operation type (e.g., "create", "get", "list") */
  operationType: string | null;
}

/**
 * Extracted dependency information from a single operation's schema
 */
export interface ExtractedDependencies {
  /** Direct resource references found in the schema */
  references: ResourceReference[];
  /** OneOf groups found in the schema */
  oneOfGroups: OneOfGroup[];
}

/**
 * Addon service definition extracted from billing specs
 */
export interface AddonServiceDefinition {
  /** Internal service identifier */
  serviceId: string;
  /** Human-readable name */
  displayName: string;
  /** Service category/tier */
  tier: string;
  /** Description of the service */
  description?: string;
}

/**
 * Options for dependency graph generation
 */
export interface DependencyGraphOptions {
  /** Whether to include inline reference capability detection */
  detectInlineRefs: boolean;
  /** Whether to compute full creation order sequences */
  computeCreationOrder: boolean;
  /** Whether to build reverse dependency map */
  buildReverseDeps: boolean;
  /** Maximum depth for dependency chain traversal */
  maxDepth: number;
  /** Fixed timestamp for deterministic generation (optional) */
  generatedAt?: string;
}

/**
 * Default options for dependency graph generation
 */
export const DEFAULT_DEPENDENCY_OPTIONS: DependencyGraphOptions = {
  detectInlineRefs: true,
  computeCreationOrder: true,
  buildReverseDeps: true,
  maxDepth: 10,
};

/**
 * Discovery tool response format for dependency queries
 */
export interface DependencyDiscoveryResponse {
  /** The queried resource */
  resource: string;
  /** The queried domain */
  domain: string;
  /** Human-readable list of prerequisites */
  prerequisites: string[];
  /** Human-readable list of dependent resources */
  dependents: string[];
  /** Mutually exclusive field information */
  mutuallyExclusiveFields: Array<{
    field: string;
    options: string[];
  }>;
  /** Required subscription/addon services */
  subscriptionRequirements: string[];
  /** Recommended creation sequence for this resource */
  creationSequence: string[];
}

/**
 * Actions available for the f5xc-api-dependencies discovery tool
 */
export type DependencyDiscoveryAction =
  | "prerequisites"
  | "dependents"
  | "oneOf"
  | "subscriptions"
  | "creationOrder"
  | "full";

/**
 * Input schema for the f5xc-api-dependencies discovery tool
 */
export interface DependencyDiscoveryInput {
  /** Resource name to query (e.g., "http-loadbalancer") */
  resource: string;
  /** Domain containing the resource (e.g., "virtual") */
  domain: string;
  /** Type of dependency information to retrieve */
  action: DependencyDiscoveryAction;
}

/**
 * Resource key format: "domain/resource"
 */
export type ResourceKey = `${string}/${string}`;

/**
 * Helper to create a resource key from domain and resource
 */
export function createResourceKey(domain: string, resource: string): ResourceKey {
  return `${domain}/${resource}` as ResourceKey;
}

/**
 * Helper to parse a resource key into domain and resource
 */
export function parseResourceKey(key: ResourceKey): { domain: string; resource: string } {
  const parts = key.split("/");
  const domain = parts[0] ?? "";
  const resource = parts.slice(1).join("/");
  return {
    domain,
    resource,
  };
}
