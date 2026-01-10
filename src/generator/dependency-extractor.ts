// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Dependency Extractor
 *
 * Extracts resource dependencies from OpenAPI specifications:
 * - $ref patterns for resource relationships
 * - x-ves-oneof-field-* patterns for mutually exclusive options
 * - Addon service definitions from billing specs
 */

import type {
  ResourceReference,
  OneOfGroup,
  AddonServiceDefinition,
  ExtractedDependencies,
  ParsedRef,
} from "./dependency-types.js";
import { getResourceDomain, getResourceMetadata, getDomainMetadata } from "./domain-metadata.js";

/**
 * Known resource type suffixes to strip from schema names
 * Order matters - more specific suffixes first
 */
const RESOURCE_SUFFIXES = [
  "CreateRequest",
  "CreateResponse",
  "ReplaceRequest",
  "ReplaceResponse",
  "GetRequest",
  "GetResponse",
  "ListRequest",
  "ListResponse",
  "DeleteRequest",
  "DeleteResponse",
  "UpdateRequest",
  "UpdateResponse",
  "Spec",
  "SpecType",
  "Object",
  "Type",
];

/**
 * Known operation types inferred from schema names
 */
const OPERATION_PATTERNS: Record<string, string> = {
  CreateRequest: "create",
  CreateResponse: "create",
  ReplaceRequest: "replace",
  ReplaceResponse: "replace",
  GetRequest: "get",
  GetResponse: "get",
  ListRequest: "list",
  ListResponse: "list",
  DeleteRequest: "delete",
  DeleteResponse: "delete",
  UpdateRequest: "update",
  UpdateResponse: "update",
};

/**
 * Parse a $ref string and extract resource information
 *
 * @example
 * parseRef("#/components/schemas/origin_poolCreateRequest")
 * // => { fullPath: "...", schemaName: "origin_poolCreateRequest",
 * //      resourceType: "origin_pool", operationType: "create" }
 */
export function parseRef(refString: string): ParsedRef | null {
  if (!refString || typeof refString !== "string") {
    return null;
  }

  // Match OpenAPI component schema references
  const match = refString.match(/#\/components\/schemas\/(.+)/);
  if (!match || !match[1]) {
    return null;
  }

  const schemaName: string = match[1];
  let resourceType: string | null = null;
  let operationType: string | null = null;

  // Try to extract resource type and operation from schema name
  for (const [suffix, operation] of Object.entries(OPERATION_PATTERNS)) {
    if (schemaName.endsWith(suffix)) {
      resourceType = schemaName.slice(0, -suffix.length);
      operationType = operation;
      break;
    }
  }

  // If no operation pattern matched, try just removing known suffixes
  if (!resourceType) {
    for (const suffix of RESOURCE_SUFFIXES) {
      if (schemaName.endsWith(suffix)) {
        resourceType = schemaName.slice(0, -suffix.length);
        break;
      }
    }
  }

  return {
    fullPath: refString,
    schemaName,
    resourceType,
    operationType,
  };
}

/**
 * Normalize a resource type name to kebab-case for consistency
 *
 * @example
 * normalizeResourceType("origin_pool") // => "origin-pool"
 * normalizeResourceType("httpLoadbalancer") // => "http-loadbalancer"
 */
export function normalizeResourceType(resourceType: string): string {
  return resourceType
    .replace(/_/g, "-")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase();
}

/**
 * Recursively extract all $ref patterns from a schema object
 *
 * @param schema - OpenAPI schema object to traverse
 * @param currentPath - Current JSON path (for fieldPath tracking)
 * @returns Array of resource references found
 */
export function extractRefPatterns(
  schema: Record<string, unknown>,
  currentPath = ""
): ResourceReference[] {
  const references: ResourceReference[] = [];

  if (!schema || typeof schema !== "object") {
    return references;
  }

  // Handle direct $ref
  if ("$ref" in schema && typeof schema.$ref === "string") {
    const parsed = parseRef(schema.$ref);
    if (parsed?.resourceType) {
      references.push({
        resourceType: normalizeResourceType(parsed.resourceType),
        domain: "", // Will be resolved later from the full spec context
        fieldPath: currentPath,
        required: false, // Will be updated based on parent "required" array
        inline: false, // Simple refs are not inline
      });
    }
  }

  // Handle properties object
  if ("properties" in schema && typeof schema.properties === "object" && schema.properties) {
    const properties = schema.properties as Record<string, unknown>;
    const requiredFields =
      Array.isArray(schema.required) && schema.required.every((r) => typeof r === "string")
        ? (schema.required as string[])
        : [];

    for (const [propName, propSchema] of Object.entries(properties)) {
      if (typeof propSchema === "object" && propSchema !== null) {
        const propPath = currentPath ? `${currentPath}.${propName}` : propName;
        const propRefs = extractRefPatterns(propSchema as Record<string, unknown>, propPath);

        // Mark as required if in parent's required array
        for (const ref of propRefs) {
          if (ref.fieldPath === propPath && requiredFields.includes(propName)) {
            ref.required = true;
          }
        }

        references.push(...propRefs);
      }
    }
  }

  // Handle allOf
  if ("allOf" in schema && Array.isArray(schema.allOf)) {
    for (const [index, item] of schema.allOf.entries()) {
      if (typeof item === "object" && item !== null) {
        const allOfPath = currentPath ? `${currentPath}.allOf[${index}]` : `allOf[${index}]`;
        references.push(...extractRefPatterns(item as Record<string, unknown>, allOfPath));
      }
    }
  }

  // Handle oneOf (inline capability)
  if ("oneOf" in schema && Array.isArray(schema.oneOf)) {
    for (const [index, item] of schema.oneOf.entries()) {
      if (typeof item === "object" && item !== null) {
        const oneOfPath = currentPath ? `${currentPath}.oneOf[${index}]` : `oneOf[${index}]`;
        const oneOfRefs = extractRefPatterns(item as Record<string, unknown>, oneOfPath);
        // Mark oneOf refs as supporting inline definitions
        for (const ref of oneOfRefs) {
          ref.inline = true;
        }
        references.push(...oneOfRefs);
      }
    }
  }

  // Handle anyOf (inline capability)
  if ("anyOf" in schema && Array.isArray(schema.anyOf)) {
    for (const [index, item] of schema.anyOf.entries()) {
      if (typeof item === "object" && item !== null) {
        const anyOfPath = currentPath ? `${currentPath}.anyOf[${index}]` : `anyOf[${index}]`;
        const anyOfRefs = extractRefPatterns(item as Record<string, unknown>, anyOfPath);
        for (const ref of anyOfRefs) {
          ref.inline = true;
        }
        references.push(...anyOfRefs);
      }
    }
  }

  // Handle items (arrays)
  if ("items" in schema && typeof schema.items === "object" && schema.items !== null) {
    const itemsPath = currentPath ? `${currentPath}[]` : "[]";
    references.push(...extractRefPatterns(schema.items as Record<string, unknown>, itemsPath));
  }

  // Handle additionalProperties
  if (
    "additionalProperties" in schema &&
    typeof schema.additionalProperties === "object" &&
    schema.additionalProperties !== null
  ) {
    const addPropsPath = currentPath ? `${currentPath}[*]` : "[*]";
    references.push(
      ...extractRefPatterns(schema.additionalProperties as Record<string, unknown>, addPropsPath)
    );
  }

  return references;
}

/**
 * Extract x-ves-oneof-field-* patterns from a schema
 *
 * @param schema - OpenAPI schema object (typically a component schema)
 * @returns Array of OneOfGroup definitions
 */
export function extractOneOfPatterns(schema: Record<string, unknown>): OneOfGroup[] {
  const groups: OneOfGroup[] = [];

  if (!schema || typeof schema !== "object") {
    return groups;
  }

  // Look for x-ves-oneof-field-* keys
  for (const [key, value] of Object.entries(schema)) {
    if (key.startsWith("x-ves-oneof-field-") && typeof value === "string") {
      const choiceField = key.replace("x-ves-oneof-field-", "");

      try {
        // Value is a JSON array string like "[\"option1\",\"option2\"]"
        const options = JSON.parse(value) as unknown;
        if (Array.isArray(options) && options.every((o) => typeof o === "string")) {
          groups.push({
            choiceField,
            options: options as string[],
            fieldPath: choiceField,
            description: undefined, // Could be extracted from property description if available
          });
        }
      } catch {
        // Invalid JSON, skip this pattern
      }
    }
  }

  // Also check nested properties for description
  if ("properties" in schema && typeof schema.properties === "object" && schema.properties) {
    const properties = schema.properties as Record<string, unknown>;
    for (const group of groups) {
      const prop = properties[group.choiceField];
      if (prop && typeof prop === "object" && "description" in prop) {
        group.description = String(prop.description);
      }
    }
  }

  return groups;
}

/**
 * Extract addon service definitions from subscription schema
 *
 * @param subscriptionSchema - The subscriptionSubscribeRequest schema
 * @returns Array of addon service definitions
 */
export function extractAddonServicesFromSchema(
  subscriptionSchema: Record<string, unknown>
): AddonServiceDefinition[] {
  const services: AddonServiceDefinition[] = [];

  // Look for x-ves-oneof-field-addon_choice
  const addonChoiceKey = "x-ves-oneof-field-addon_choice";
  const addonChoiceValue = subscriptionSchema[addonChoiceKey];

  if (typeof addonChoiceValue === "string") {
    try {
      const addons = JSON.parse(addonChoiceValue) as unknown;
      if (Array.isArray(addons) && addons.every((a) => typeof a === "string")) {
        for (const addon of addons as string[]) {
          services.push({
            serviceId: addon,
            displayName: formatAddonDisplayName(addon),
            tier: extractTierFromAddon(addon),
            description: undefined, // Could be extracted from property description
          });
        }
      }
    } catch {
      // Invalid JSON, skip
    }
  }

  return services;
}

/**
 * Format an addon service ID into a display name
 *
 * @example
 * formatAddonDisplayName("f5xc_waap_advanced")
 * // => "F5XC WAAP Advanced"
 */
export function formatAddonDisplayName(serviceId: string): string {
  return serviceId
    .replace(/^f5xc_/, "F5XC ")
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => {
      // Keep common acronyms uppercase
      if (["F5XC", "WAAP", "CDN", "API", "WAF", "DNS"].includes(word.toUpperCase())) {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

/**
 * Extract tier level from addon service ID
 *
 * @example
 * extractTierFromAddon("f5xc_waap_advanced") // => "advanced"
 * extractTierFromAddon("f5xc_waap_standard") // => "standard"
 */
export function extractTierFromAddon(serviceId: string): string {
  const tiers = ["advanced", "standard", "premium", "basic", "enterprise"];
  const lowerServiceId = serviceId.toLowerCase();

  for (const tier of tiers) {
    if (lowerServiceId.includes(tier)) {
      return tier;
    }
  }

  return "standard"; // Default tier
}

/**
 * Extract all subscription services from a billing spec
 *
 * @param billingSpec - Parsed billing_and_usage.json spec
 * @returns Array of addon service definitions
 */
export function extractSubscriptionServices(billingSpec: {
  schemas: Record<string, unknown>;
}): AddonServiceDefinition[] {
  const schemas = billingSpec.schemas || {};

  // Look for subscriptionSubscribeRequest schema
  const subscribeSchema = schemas.subscriptionSubscribeRequest;
  if (subscribeSchema && typeof subscribeSchema === "object") {
    return extractAddonServicesFromSchema(subscribeSchema as Record<string, unknown>);
  }

  // Fallback: look for any schema with x-ves-oneof-field-addon_choice
  for (const schemaName of Object.keys(schemas)) {
    const schema = schemas[schemaName];
    if (schema && typeof schema === "object") {
      const schemaObj = schema as Record<string, unknown>;
      if ("x-ves-oneof-field-addon_choice" in schemaObj) {
        return extractAddonServicesFromSchema(schemaObj);
      }
    }
  }

  return [];
}

/**
 * Extract dependencies from a single operation's request body schema
 *
 * @param requestBodySchema - The operation's request body schema
 * @param componentSchemas - All component schemas for resolving references
 * @returns Extracted dependencies including references and oneOf groups
 */
export function extractOperationDependencies(
  requestBodySchema: Record<string, unknown> | null,
  componentSchemas: Record<string, unknown>
): ExtractedDependencies {
  const result: ExtractedDependencies = {
    references: [],
    oneOfGroups: [],
  };

  if (!requestBodySchema) {
    return result;
  }

  // Extract references from the request body schema
  result.references = extractRefPatterns(requestBodySchema);

  // If the request body has a $ref, also look in that component schema
  if ("$ref" in requestBodySchema && typeof requestBodySchema.$ref === "string") {
    const parsed = parseRef(requestBodySchema.$ref);
    if (parsed?.schemaName) {
      const componentSchema = componentSchemas[parsed.schemaName];
      if (componentSchema && typeof componentSchema === "object") {
        // Extract oneOf patterns from the component schema
        result.oneOfGroups = extractOneOfPatterns(componentSchema as Record<string, unknown>);

        // Also extract nested references from the component schema
        const componentRefs = extractRefPatterns(componentSchema as Record<string, unknown>);
        result.references.push(...componentRefs);
      }
    }
  }

  // Deduplicate references by resourceType + fieldPath
  const seenRefs = new Set<string>();
  result.references = result.references.filter((ref) => {
    const key = `${ref.resourceType}:${ref.fieldPath}`;
    if (seenRefs.has(key)) {
      return false;
    }
    seenRefs.add(key);
    return true;
  });

  return result;
}

/**
 * Map category to subscription IDs (v1.0.84+)
 */
const CATEGORY_SUBSCRIPTION_MAP: Record<string, string[]> = {
  security: ["f5xc_waap_standard", "f5xc_waap_advanced"],
  "api security": ["f5xc_waap_standard", "f5xc_waap_advanced"],
  "bot defense": ["f5xc_waap_standard", "f5xc_waap_advanced"],
  cdn: ["f5xc_content_delivery_network_standard"],
  "content delivery": ["f5xc_content_delivery_network_standard"],
  mesh: ["f5xc_securemesh_standard", "f5xc_securemesh_advanced"],
  "service mesh": ["f5xc_securemesh_standard", "f5xc_securemesh_advanced"],
  kubernetes: ["f5xc_appstack_standard"],
  infrastructure: ["f5xc_site_management_standard"],
};

/**
 * Map resources to subscription services using upstream metadata (v1.0.84+)
 *
 * Priority:
 * 1. Upstream resource metadata (tier + category)
 * 2. Domain metadata (requiresTier + uiCategory)
 * 3. Fallback pattern-based heuristics
 *
 * @param resource - Resource name (e.g., "http-loadbalancer")
 * @param domain - Domain name (e.g., "virtual")
 * @returns Array of subscription service IDs that may be required
 */
export function mapResourceToSubscriptions(resource: string, domain: string): string[] {
  const subscriptions: string[] = [];

  // Normalize resource name
  const normalizedResource = resource.toLowerCase().replace(/-/g, "_");

  // Try upstream resource metadata first (v1.0.84+)
  const resourceMeta = getResourceMetadata(normalizedResource);

  if (resourceMeta && resourceMeta.tier === "Advanced") {
    const category = resourceMeta.category.toLowerCase();
    const categorySubscriptions = CATEGORY_SUBSCRIPTION_MAP[category];
    if (categorySubscriptions) {
      subscriptions.push(...categorySubscriptions);
    }
  }

  // Also check domain metadata for domain-level subscriptions
  const domainMeta = getDomainMetadata(domain);
  if (domainMeta && domainMeta.requiresTier === "Advanced") {
    const uiCategory = domainMeta.uiCategory.toLowerCase();
    const domainSubscriptions = CATEGORY_SUBSCRIPTION_MAP[uiCategory];
    if (domainSubscriptions) {
      subscriptions.push(...domainSubscriptions);
    }
  }

  // Fallback: Pattern-based heuristics for resources not in upstream specs
  if (subscriptions.length === 0) {
    // WAAP-related resources
    const waapResources = [
      "app-firewall",
      "waf",
      "service-policy",
      "rate-limiter",
      "api-definition",
      "api-security",
      "data-guard",
      "trusted-client",
      "malicious-user",
      "client-side-defense",
      "service-policy-set",
    ];
    const waapDomains = ["waf", "api", "rate_limiting", "bot_and_threat_defense"];

    if (waapResources.some((r) => resource.includes(r)) || waapDomains.includes(domain)) {
      subscriptions.push("f5xc_waap_standard", "f5xc_waap_advanced");
    }

    // CDN-related resources
    const cdnResources = ["cdn-loadbalancer", "cdn-origin", "cdn-origin-pool"];
    if (cdnResources.some((r) => resource.includes(r)) || domain === "cdn") {
      subscriptions.push("f5xc_content_delivery_network_standard");
    }

    // SecureMesh-related resources
    const meshResources = ["site-mesh-group", "mesh-policy", "global-network"];
    if (
      meshResources.some((r) => resource.includes(r)) ||
      domain === "service_mesh" ||
      domain === "network_security"
    ) {
      subscriptions.push("f5xc_securemesh_standard", "f5xc_securemesh_advanced");
    }

    // AppStack-related resources
    if (domain === "managed_kubernetes" || resource.includes("vk8s")) {
      subscriptions.push("f5xc_appstack_standard");
    }

    // Site management resources
    const siteResources = ["site", "fleet", "token", "tunnel"];
    if (siteResources.some((r) => resource.includes(r)) || domain === "sites") {
      subscriptions.push("f5xc_site_management_standard");
    }
  }

  return [...new Set(subscriptions)]; // Deduplicate
}

/**
 * Fallback domain mapping for resource types not in upstream specs
 * Used only when getResourceDomain() from domain-metadata.ts returns no match
 * @deprecated Prefer adding resources to upstream specs instead of extending this map
 */
export const FALLBACK_RESOURCE_DOMAIN_MAP: Record<string, string> = {
  "origin-pool": "network",
  origin_pool: "network",
  "http-loadbalancer": "virtual",
  http_loadbalancer: "virtual",
  "tcp-loadbalancer": "virtual",
  tcp_loadbalancer: "virtual",
  "dns-lb-pool": "dns",
  dns_lb_pool: "dns",
  "dns-zone": "dns",
  dns_zone: "dns",
  "app-firewall": "waf",
  app_firewall: "waf",
  "service-policy": "network_security",
  service_policy: "network_security",
  certificate: "certificates",
  "api-definition": "api",
  api_definition: "api",
  site: "sites",
  "aws-vpc-site": "sites",
  "azure-vnet-site": "sites",
  "gcp-vpc-site": "sites",
  healthcheck: "network",
  "virtual-host": "virtual",
  namespace: "tenant_and_identity",
  secret: "blindfold",
  token: "authentication",
};

/**
 * Resolve a resource type to its domain
 *
 * Uses upstream specs as primary source of truth (via domain-metadata.ts),
 * falling back to hardcoded mappings only when spec data is unavailable.
 *
 * @param resourceType - Normalized resource type (kebab-case or snake_case)
 * @returns Domain string or empty string if unknown
 */
export function resolveResourceDomain(resourceType: string): string {
  // Try upstream specs first (primary source of truth)
  const domainMeta = getResourceDomain(resourceType);
  if (domainMeta) {
    return domainMeta.domain;
  }

  // Also try with underscore variant
  const underscoreVariant = resourceType.replace(/-/g, "_");
  const domainMetaUnderscore = getResourceDomain(underscoreVariant);
  if (domainMetaUnderscore) {
    return domainMetaUnderscore.domain;
  }

  // Fall back to hardcoded mappings for resources not in specs
  return (
    FALLBACK_RESOURCE_DOMAIN_MAP[resourceType] ||
    FALLBACK_RESOURCE_DOMAIN_MAP[underscoreVariant] ||
    ""
  );
}
