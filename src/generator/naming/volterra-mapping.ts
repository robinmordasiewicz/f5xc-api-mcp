/**
 * Volterra to F5XC Naming Transforms
 *
 * Handles the rebranding transformation from legacy Volterra names
 * to the current F5 Distributed Cloud (F5XC) naming convention.
 *
 * IMPORTANT: Functional URLs containing volterra.io are NOT transformed
 * as they are required for API communication.
 */

/**
 * Namespace/package name mappings
 */
export const NAMESPACE_MAPPINGS: ReadonlyMap<string, string> = new Map([
  ["ves.io", "f5xc"],
  ["ves.io.schema", "f5xc.schema"],
  ["volterra", "f5xc"],
]);

/**
 * Resource name mappings (legacy -> current)
 */
export const RESOURCE_MAPPINGS: ReadonlyMap<string, string> = new Map([
  // Sites
  ["voltstack_site", "customer_edge_site"],
  ["voltstack", "customer_edge"],
  ["ves_site", "regional_edge_site"],

  // General naming
  ["ves_io_tenant", "tenant"],
  ["ves_io", "f5xc"],
]);

/**
 * Field name mappings within resources
 */
export const FIELD_MAPPINGS: ReadonlyMap<string, string> = new Map([
  ["ves_io_tenant", "tenant"],
  ["ves_certified_hw", "f5xc_certified_hw"],
]);

/**
 * Patterns that should NOT be transformed (functional URLs)
 */
const PROTECTED_PATTERNS: readonly RegExp[] = [
  // API URLs - must remain functional
  /https?:\/\/[^/]*\.volterra\.(io|us)/gi,
  // Console URLs
  /console\.ves\.volterra\.io/gi,
  // API paths
  /\/api\/config\//gi,
  /\/api\/data\//gi,
  // Schema references in OpenAPI
  /"?\$ref"?\s*:\s*"[^"]*"/gi,
];

/**
 * Check if a string contains protected patterns that should not be transformed
 *
 * @param text - Text to check
 * @returns True if text contains protected patterns
 */
function containsProtectedPattern(text: string): boolean {
  return PROTECTED_PATTERNS.some((pattern) => pattern.test(text));
}

/**
 * Transform Volterra namespace/package names to F5XC
 *
 * @param namespace - Original namespace
 * @returns Transformed namespace
 */
export function transformNamespace(namespace: string): string {
  for (const [volterra, f5xc] of NAMESPACE_MAPPINGS) {
    if (namespace.startsWith(volterra)) {
      return namespace.replace(volterra, f5xc);
    }
  }
  return namespace;
}

/**
 * Transform Volterra resource names to F5XC
 *
 * @param resourceName - Original resource name
 * @returns Transformed resource name
 */
export function transformResourceName(resourceName: string): string {
  const lowerName = resourceName.toLowerCase();
  return RESOURCE_MAPPINGS.get(lowerName) ?? resourceName;
}

/**
 * Transform Volterra field names to F5XC
 *
 * @param fieldName - Original field name
 * @returns Transformed field name
 */
export function transformFieldName(fieldName: string): string {
  const lowerName = fieldName.toLowerCase();
  return FIELD_MAPPINGS.get(lowerName) ?? fieldName;
}

/**
 * Transform text content with Volterra references to F5XC
 *
 * Handles documentation strings, descriptions, and other text content
 * while preserving functional URLs and API paths.
 *
 * @param text - Text to transform
 * @returns Transformed text
 */
export function transformText(text: string): string {
  // Skip if text contains protected patterns
  if (containsProtectedPattern(text)) {
    return text;
  }

  let result = text;

  // Transform display names and documentation
  const textReplacements: ReadonlyArray<[RegExp, string]> = [
    // Company name - case-insensitive but preserve case pattern
    [/\bVolterra\b/g, "F5 Distributed Cloud"],
    [/\bVES\b/g, "F5XC"],
    [/\bves\b/g, "f5xc"],

    // Product names
    [/\bVoltStack\b/gi, "Customer Edge"],
    [/\bvoltstack\b/g, "customer_edge"],

    // References in documentation
    [/Volterra Edge Services/gi, "F5 Distributed Cloud"],
    [/VES Console/gi, "F5XC Console"],
  ];

  for (const [pattern, replacement] of textReplacements) {
    result = result.replace(pattern, replacement);
  }

  return result;
}

/**
 * Transform OpenAPI specification object
 *
 * Transforms naming throughout an OpenAPI spec while preserving
 * functional URLs and schema references.
 *
 * @param spec - OpenAPI specification object
 * @returns Transformed specification
 */
export function transformOpenApiSpec(spec: Record<string, unknown>): Record<string, unknown> {
  return transformObject(spec) as Record<string, unknown>;
}

/**
 * Recursively transform object properties
 */
function transformObject(obj: unknown): unknown {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === "string") {
    return transformText(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(transformObject);
  }

  if (typeof obj === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      // Transform field names
      const newKey = transformFieldName(key);
      result[newKey] = transformObject(value);
    }
    return result;
  }

  return obj;
}

/**
 * Generate F5XC tool name from operation info
 *
 * Format: f5xc-api-{domain}-{resource}-{operation}
 *
 * @param domain - API domain (waap, dns, network, etc.)
 * @param resource - Resource type (http-loadbalancer, origin-pool, etc.)
 * @param operation - Operation type (create, list, get, update, delete)
 * @returns Tool name in kebab-case
 */
export function generateToolName(domain: string, resource: string, operation: string): string {
  // Normalize inputs
  const normalizedDomain = domain.toLowerCase().replace(/[^a-z0-9]/g, "");
  const normalizedResource = resource
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  const normalizedOperation = operation.toLowerCase().replace(/[^a-z0-9]/g, "");

  return `f5xc-api-${normalizedDomain}-${normalizedResource}-${normalizedOperation}`;
}

/**
 * Extract domain from OpenAPI path
 *
 * @param path - API path like /api/config/namespaces/{namespace}/http_loadbalancers
 * @returns Domain category
 */
export function extractDomainFromPath(path: string): string {
  // Domain mappings based on path patterns
  const domainPatterns: ReadonlyArray<[RegExp, string]> = [
    [/http_loadbalancer|origin_pool|app_firewall|rate_limiter/i, "waap"],
    [/dns_zone|dns_load_balancer|dns_lb_pool/i, "dns"],
    [/network_connector|network_firewall|enhanced_firewall/i, "network"],
    [/aws_vpc_site|azure_vnet_site|gcp_vpc_site/i, "site"],
    [/k8s_cluster|virtual_k8s|workload/i, "appstack"],
    [/service_policy|waf|malicious_user/i, "security"],
    [/namespace|certificate|cloud_credentials/i, "core"],
  ];

  for (const [pattern, domain] of domainPatterns) {
    if (pattern.test(path)) {
      return domain;
    }
  }

  return "core";
}

/**
 * Extract resource type from OpenAPI path
 *
 * @param path - API path like /api/config/namespaces/{namespace}/http_loadbalancers
 * @returns Resource type in kebab-case
 */
export function extractResourceFromPath(path: string): string {
  // Extract the resource name from the path
  const segments = path.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];

  if (!lastSegment) {
    return "unknown";
  }

  // Remove path parameters
  if (lastSegment.startsWith("{")) {
    const secondLast = segments[segments.length - 2];
    return secondLast
      ? secondLast.replace(/_/g, "-").replace(/s$/, "") // Remove trailing 's' for plural
      : "unknown";
  }

  return lastSegment.replace(/_/g, "-").replace(/s$/, "");
}

/**
 * Map HTTP method to operation name
 *
 * @param method - HTTP method
 * @param hasPathParam - Whether the path has a resource name parameter
 * @returns Operation name
 */
export function methodToOperation(method: string, hasPathParam: boolean): string {
  const upperMethod = method.toUpperCase();

  switch (upperMethod) {
    case "GET":
      return hasPathParam ? "get" : "list";
    case "POST":
      return "create";
    case "PUT":
      return "update";
    case "DELETE":
      return "delete";
    case "PATCH":
      return "patch";
    default:
      return upperMethod.toLowerCase();
  }
}
