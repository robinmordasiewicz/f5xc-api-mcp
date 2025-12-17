/**
 * MCP Resource URI Templates
 *
 * Defines URI templates for F5XC configuration resources.
 * URI scheme: f5xc://{tenant}/{namespace}/{resource-type}/{name}
 */

/**
 * Resource URI schemes
 */
export const RESOURCE_SCHEMES = {
  /** Base scheme for all F5XC resources */
  BASE: "f5xc://",

  /** System namespace for global resources */
  SYSTEM: "system",

  /** Shared namespace for cross-tenant resources */
  SHARED: "shared",
} as const;

/**
 * Resource type definitions
 */
export interface ResourceType {
  /** Resource type identifier */
  type: string;
  /** Human-readable name */
  name: string;
  /** Resource description */
  description: string;
  /** API path template */
  apiPath: string;
  /** Whether resource is namespace-scoped */
  namespaceScoped: boolean;
  /** Subscription tier required */
  tier: "NO_TIER" | "STANDARD" | "ADVANCED";
  /** Related resources */
  relatedResources?: string[];
}

/**
 * All supported resource types
 */
export const RESOURCE_TYPES: Record<string, ResourceType> = {
  // Core Resources (NO_TIER)
  namespace: {
    type: "namespace",
    name: "Namespace",
    description: "Logical grouping of resources",
    apiPath: "/api/web/namespaces",
    namespaceScoped: false,
    tier: "NO_TIER",
  },
  certificate: {
    type: "certificate",
    name: "Certificate",
    description: "TLS/SSL certificate",
    apiPath: "/api/config/namespaces/{namespace}/certificates",
    namespaceScoped: true,
    tier: "NO_TIER",
  },
  secret: {
    type: "secret",
    name: "Secret",
    description: "Sensitive data storage",
    apiPath: "/api/config/namespaces/{namespace}/secrets",
    namespaceScoped: true,
    tier: "NO_TIER",
  },
  cloud_credentials: {
    type: "cloud_credentials",
    name: "Cloud Credentials",
    description: "Cloud provider authentication",
    apiPath: "/api/config/namespaces/{namespace}/cloud_credentials",
    namespaceScoped: true,
    tier: "NO_TIER",
  },

  // Standard Resources
  http_loadbalancer: {
    type: "http_loadbalancer",
    name: "HTTP Load Balancer",
    description: "Layer 7 HTTP/HTTPS load balancer",
    apiPath: "/api/config/namespaces/{namespace}/http_loadbalancers",
    namespaceScoped: true,
    tier: "STANDARD",
    relatedResources: ["origin_pool", "healthcheck", "app_firewall"],
  },
  tcp_loadbalancer: {
    type: "tcp_loadbalancer",
    name: "TCP Load Balancer",
    description: "Layer 4 TCP load balancer",
    apiPath: "/api/config/namespaces/{namespace}/tcp_loadbalancers",
    namespaceScoped: true,
    tier: "STANDARD",
    relatedResources: ["origin_pool", "healthcheck"],
  },
  origin_pool: {
    type: "origin_pool",
    name: "Origin Pool",
    description: "Backend server pool for load balancing",
    apiPath: "/api/config/namespaces/{namespace}/origin_pools",
    namespaceScoped: true,
    tier: "STANDARD",
    relatedResources: ["healthcheck"],
  },
  healthcheck: {
    type: "healthcheck",
    name: "Health Check",
    description: "Health monitoring for origin servers",
    apiPath: "/api/config/namespaces/{namespace}/healthchecks",
    namespaceScoped: true,
    tier: "STANDARD",
  },
  dns_zone: {
    type: "dns_zone",
    name: "DNS Zone",
    description: "DNS zone management",
    apiPath: "/api/config/namespaces/{namespace}/dns_zones",
    namespaceScoped: true,
    tier: "STANDARD",
  },
  dns_load_balancer: {
    type: "dns_load_balancer",
    name: "DNS Load Balancer",
    description: "Global DNS-based load balancing",
    apiPath: "/api/config/namespaces/{namespace}/dns_load_balancers",
    namespaceScoped: true,
    tier: "STANDARD",
    relatedResources: ["dns_zone"],
  },

  // Site Resources
  aws_vpc_site: {
    type: "aws_vpc_site",
    name: "AWS VPC Site",
    description: "F5XC site deployed in AWS VPC",
    apiPath: "/api/config/namespaces/{namespace}/aws_vpc_sites",
    namespaceScoped: true,
    tier: "STANDARD",
    relatedResources: ["cloud_credentials"],
  },
  azure_vnet_site: {
    type: "azure_vnet_site",
    name: "Azure VNet Site",
    description: "F5XC site deployed in Azure VNet",
    apiPath: "/api/config/namespaces/{namespace}/azure_vnet_sites",
    namespaceScoped: true,
    tier: "STANDARD",
    relatedResources: ["cloud_credentials"],
  },
  gcp_vpc_site: {
    type: "gcp_vpc_site",
    name: "GCP VPC Site",
    description: "F5XC site deployed in GCP VPC",
    apiPath: "/api/config/namespaces/{namespace}/gcp_vpc_sites",
    namespaceScoped: true,
    tier: "STANDARD",
    relatedResources: ["cloud_credentials"],
  },

  // Advanced Resources (WAAP)
  app_firewall: {
    type: "app_firewall",
    name: "Application Firewall",
    description: "Web Application Firewall (WAF) policy",
    apiPath: "/api/config/namespaces/{namespace}/app_firewalls",
    namespaceScoped: true,
    tier: "ADVANCED",
  },
  service_policy: {
    type: "service_policy",
    name: "Service Policy",
    description: "Service-level security policy",
    apiPath: "/api/config/namespaces/{namespace}/service_policys",
    namespaceScoped: true,
    tier: "ADVANCED",
  },
  rate_limiter: {
    type: "rate_limiter",
    name: "Rate Limiter",
    description: "Request rate limiting policy",
    apiPath: "/api/config/namespaces/{namespace}/rate_limiters",
    namespaceScoped: true,
    tier: "ADVANCED",
  },
  bot_defense: {
    type: "bot_defense",
    name: "Bot Defense",
    description: "Bot detection and mitigation",
    apiPath: "/api/config/namespaces/{namespace}/bot_defenses",
    namespaceScoped: true,
    tier: "ADVANCED",
  },
  api_definition: {
    type: "api_definition",
    name: "API Definition",
    description: "OpenAPI specification for API protection",
    apiPath: "/api/config/namespaces/{namespace}/api_definitions",
    namespaceScoped: true,
    tier: "ADVANCED",
  },
};

/**
 * Build resource URI from components
 *
 * @param tenant - Tenant name
 * @param namespace - Namespace (or 'system'/'shared')
 * @param resourceType - Resource type identifier
 * @param name - Resource name
 * @returns Formatted resource URI
 */
export function buildResourceUri(
  tenant: string,
  namespace: string,
  resourceType: string,
  name: string
): string {
  return `${RESOURCE_SCHEMES.BASE}${tenant}/${namespace}/${resourceType}/${name}`;
}

/**
 * Parse resource URI into components
 *
 * @param uri - Resource URI to parse
 * @returns Parsed components or null if invalid
 */
export function parseResourceUri(
  uri: string
): { tenant: string; namespace: string; resourceType: string; name: string } | null {
  if (!uri.startsWith(RESOURCE_SCHEMES.BASE)) {
    return null;
  }

  const path = uri.slice(RESOURCE_SCHEMES.BASE.length);
  const parts = path.split("/");

  if (parts.length !== 4) {
    return null;
  }

  const [tenant, namespace, resourceType, name] = parts;

  if (!tenant || !namespace || !resourceType || !name) {
    return null;
  }

  return { tenant, namespace, resourceType, name };
}

/**
 * Get resource type definition
 *
 * @param type - Resource type identifier
 * @returns Resource type definition or undefined
 */
export function getResourceType(type: string): ResourceType | undefined {
  return RESOURCE_TYPES[type];
}

/**
 * Get all resource types for a tier
 *
 * @param tier - Subscription tier
 * @returns Array of resource types
 */
export function getResourceTypesByTier(tier: "NO_TIER" | "STANDARD" | "ADVANCED"): ResourceType[] {
  return Object.values(RESOURCE_TYPES).filter((rt) => rt.tier === tier);
}

/**
 * Build API path for a resource
 *
 * @param resourceType - Resource type identifier
 * @param namespace - Namespace name
 * @param name - Resource name (optional)
 * @returns API path
 */
export function buildApiPath(
  resourceType: string,
  namespace: string,
  name?: string
): string | null {
  const rt = RESOURCE_TYPES[resourceType];
  if (!rt) {
    return null;
  }

  let path = rt.apiPath.replace("{namespace}", namespace);

  if (name) {
    path += `/${name}`;
  }

  return path;
}
