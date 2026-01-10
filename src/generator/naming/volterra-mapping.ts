// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * F5XC Tool Naming Utilities
 *
 * Generates consistent tool names and extracts resource information from API paths.
 * Pre-enriched specs from robinmordasiewicz/f5xc-api-enriched already have naming
 * transformations applied, so legacy Volterra transform functions have been removed.
 */

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
