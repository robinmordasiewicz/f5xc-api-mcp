/**
 * Category Mapping for Documentation Generation
 *
 * Maps tool domains and resources to documentation subcategories,
 * matching the structure used in Terraform provider and f5xcctl CLI.
 */

/**
 * Subcategory definitions matching sister projects
 */
export const SUBCATEGORIES = {
  AI_ML: "AI/ML",
  API_SECURITY: "API Security",
  APPLICATIONS: "Applications",
  AUTHENTICATION: "Authentication",
  BIGIP_INTEGRATION: "BIG-IP Integration",
  BOT_DEFENSE: "Bot Defense",
  CERTIFICATES: "Certificates",
  CLOUD_RESOURCES: "Cloud Resources",
  DNS: "DNS",
  INFRASTRUCTURE_PROTECTION: "Infrastructure Protection",
  INTEGRATIONS: "Integrations",
  KUBERNETES: "Kubernetes",
  LOAD_BALANCING: "Load Balancing",
  MONITORING: "Monitoring",
  NETWORKING: "Networking",
  ORGANIZATION: "Organization",
  SECURITY: "Security",
  SERVICE_MESH: "Service Mesh",
  SITES: "Sites",
  SUBSCRIPTIONS: "Subscriptions",
  VPN: "VPN",
  GENERAL: "General",
} as const;

export type Subcategory = (typeof SUBCATEGORIES)[keyof typeof SUBCATEGORIES];

/**
 * Domain to subcategory mapping
 * Primary categorization based on tool domain
 */
const DOMAIN_MAP: Record<string, Subcategory> = {
  waap: SUBCATEGORIES.LOAD_BALANCING,
  dns: SUBCATEGORIES.DNS,
  site: SUBCATEGORIES.SITES,
  network: SUBCATEGORIES.NETWORKING,
  appstack: SUBCATEGORIES.KUBERNETES,
  security: SUBCATEGORIES.SECURITY,
  core: SUBCATEGORIES.ORGANIZATION,
};

/**
 * Resource pattern to subcategory mapping
 * Secondary categorization based on resource name patterns
 * These take precedence over domain-based mapping
 */
const RESOURCE_PATTERNS: Array<{ pattern: RegExp; subcategory: Subcategory }> = [
  // Load Balancing
  { pattern: /http[_-]?loadbalancer/i, subcategory: SUBCATEGORIES.LOAD_BALANCING },
  { pattern: /tcp[_-]?loadbalancer/i, subcategory: SUBCATEGORIES.LOAD_BALANCING },
  { pattern: /udp[_-]?loadbalancer/i, subcategory: SUBCATEGORIES.LOAD_BALANCING },
  { pattern: /origin[_-]?pool/i, subcategory: SUBCATEGORIES.LOAD_BALANCING },
  { pattern: /healthcheck/i, subcategory: SUBCATEGORIES.LOAD_BALANCING },
  { pattern: /endpoint/i, subcategory: SUBCATEGORIES.LOAD_BALANCING },
  { pattern: /route/i, subcategory: SUBCATEGORIES.LOAD_BALANCING },
  { pattern: /virtual[_-]?host/i, subcategory: SUBCATEGORIES.LOAD_BALANCING },

  // DNS
  { pattern: /dns[_-]?zone/i, subcategory: SUBCATEGORIES.DNS },
  { pattern: /dns[_-]?loadbalancer/i, subcategory: SUBCATEGORIES.DNS },
  { pattern: /dns[_-]?domain/i, subcategory: SUBCATEGORIES.DNS },
  { pattern: /dns[_-]?record/i, subcategory: SUBCATEGORIES.DNS },

  // Sites
  { pattern: /aws[_-]?vpc[_-]?site/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /azure[_-]?vnet[_-]?site/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /gcp[_-]?vpc[_-]?site/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /site[_-]?mesh/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /^site$/i, subcategory: SUBCATEGORIES.SITES },
  { pattern: /voltstack/i, subcategory: SUBCATEGORIES.SITES },

  // Security
  { pattern: /app[_-]?firewall/i, subcategory: SUBCATEGORIES.SECURITY },
  { pattern: /waf/i, subcategory: SUBCATEGORIES.SECURITY },
  { pattern: /service[_-]?policy/i, subcategory: SUBCATEGORIES.SECURITY },
  { pattern: /rate[_-]?limit/i, subcategory: SUBCATEGORIES.SECURITY },
  { pattern: /ip[_-]?prefix/i, subcategory: SUBCATEGORIES.SECURITY },
  { pattern: /known[_-]?attack/i, subcategory: SUBCATEGORIES.SECURITY },
  { pattern: /user[_-]?identification/i, subcategory: SUBCATEGORIES.SECURITY },
  { pattern: /malicious/i, subcategory: SUBCATEGORIES.SECURITY },

  // Bot Defense
  { pattern: /bot[_-]?defense/i, subcategory: SUBCATEGORIES.BOT_DEFENSE },
  { pattern: /shape/i, subcategory: SUBCATEGORIES.BOT_DEFENSE },
  { pattern: /client[_-]?side[_-]?defense/i, subcategory: SUBCATEGORIES.BOT_DEFENSE },

  // API Security
  { pattern: /api[_-]?discovery/i, subcategory: SUBCATEGORIES.API_SECURITY },
  { pattern: /api[_-]?definition/i, subcategory: SUBCATEGORIES.API_SECURITY },
  { pattern: /api[_-]?group/i, subcategory: SUBCATEGORIES.API_SECURITY },
  { pattern: /api[_-]?crawler/i, subcategory: SUBCATEGORIES.API_SECURITY },
  { pattern: /graphql/i, subcategory: SUBCATEGORIES.API_SECURITY },
  { pattern: /openapi/i, subcategory: SUBCATEGORIES.API_SECURITY },
  { pattern: /swagger/i, subcategory: SUBCATEGORIES.API_SECURITY },

  // Certificates
  { pattern: /certificate/i, subcategory: SUBCATEGORIES.CERTIFICATES },
  { pattern: /trusted[_-]?ca/i, subcategory: SUBCATEGORIES.CERTIFICATES },
  { pattern: /tls/i, subcategory: SUBCATEGORIES.CERTIFICATES },
  { pattern: /secret/i, subcategory: SUBCATEGORIES.CERTIFICATES },
  { pattern: /blindfold/i, subcategory: SUBCATEGORIES.CERTIFICATES },

  // Kubernetes
  { pattern: /k8s/i, subcategory: SUBCATEGORIES.KUBERNETES },
  { pattern: /virtual[_-]?k8s/i, subcategory: SUBCATEGORIES.KUBERNETES },
  { pattern: /workload/i, subcategory: SUBCATEGORIES.KUBERNETES },
  { pattern: /vk8s/i, subcategory: SUBCATEGORIES.KUBERNETES },
  { pattern: /deployment/i, subcategory: SUBCATEGORIES.KUBERNETES },
  { pattern: /pod/i, subcategory: SUBCATEGORIES.KUBERNETES },

  // Cloud Resources
  { pattern: /cloud[_-]?credential/i, subcategory: SUBCATEGORIES.CLOUD_RESOURCES },
  { pattern: /cloud[_-]?region/i, subcategory: SUBCATEGORIES.CLOUD_RESOURCES },
  { pattern: /cloud[_-]?site/i, subcategory: SUBCATEGORIES.CLOUD_RESOURCES },

  // Networking
  { pattern: /network[_-]?firewall/i, subcategory: SUBCATEGORIES.NETWORKING },
  { pattern: /network[_-]?connector/i, subcategory: SUBCATEGORIES.NETWORKING },
  { pattern: /network[_-]?policy/i, subcategory: SUBCATEGORIES.NETWORKING },
  { pattern: /virtual[_-]?network/i, subcategory: SUBCATEGORIES.NETWORKING },
  { pattern: /fleet/i, subcategory: SUBCATEGORIES.NETWORKING },
  { pattern: /interface/i, subcategory: SUBCATEGORIES.NETWORKING },
  { pattern: /vlan/i, subcategory: SUBCATEGORIES.NETWORKING },

  // Monitoring
  { pattern: /alert[_-]?receiver/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /alert[_-]?policy/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /log[_-]?receiver/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /global[_-]?log/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /access[_-]?log/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /metric/i, subcategory: SUBCATEGORIES.MONITORING },
  { pattern: /audit/i, subcategory: SUBCATEGORIES.MONITORING },

  // Organization
  { pattern: /^namespace$/i, subcategory: SUBCATEGORIES.ORGANIZATION },
  { pattern: /tenant/i, subcategory: SUBCATEGORIES.ORGANIZATION },
  { pattern: /user/i, subcategory: SUBCATEGORIES.ORGANIZATION },
  { pattern: /role/i, subcategory: SUBCATEGORIES.ORGANIZATION },
  { pattern: /group/i, subcategory: SUBCATEGORIES.ORGANIZATION },
  { pattern: /label/i, subcategory: SUBCATEGORIES.ORGANIZATION },

  // Authentication
  { pattern: /oidc/i, subcategory: SUBCATEGORIES.AUTHENTICATION },
  { pattern: /oauth/i, subcategory: SUBCATEGORIES.AUTHENTICATION },
  { pattern: /saml/i, subcategory: SUBCATEGORIES.AUTHENTICATION },
  { pattern: /ldap/i, subcategory: SUBCATEGORIES.AUTHENTICATION },
  { pattern: /authentication/i, subcategory: SUBCATEGORIES.AUTHENTICATION },

  // BIG-IP Integration
  { pattern: /bigip/i, subcategory: SUBCATEGORIES.BIGIP_INTEGRATION },
  { pattern: /big[_-]?ip/i, subcategory: SUBCATEGORIES.BIGIP_INTEGRATION },
  { pattern: /irule/i, subcategory: SUBCATEGORIES.BIGIP_INTEGRATION },

  // Service Mesh
  { pattern: /segment/i, subcategory: SUBCATEGORIES.SERVICE_MESH },
  { pattern: /forwarding[_-]?class/i, subcategory: SUBCATEGORIES.SERVICE_MESH },
  { pattern: /service[_-]?mesh/i, subcategory: SUBCATEGORIES.SERVICE_MESH },

  // Infrastructure Protection
  { pattern: /infraprotect/i, subcategory: SUBCATEGORIES.INFRASTRUCTURE_PROTECTION },
  { pattern: /ddos/i, subcategory: SUBCATEGORIES.INFRASTRUCTURE_PROTECTION },

  // Subscriptions
  { pattern: /subscription/i, subcategory: SUBCATEGORIES.SUBSCRIPTIONS },
  { pattern: /addon/i, subcategory: SUBCATEGORIES.SUBSCRIPTIONS },
  { pattern: /billing/i, subcategory: SUBCATEGORIES.SUBSCRIPTIONS },

  // Integrations
  { pattern: /connector/i, subcategory: SUBCATEGORIES.INTEGRATIONS },
  { pattern: /external/i, subcategory: SUBCATEGORIES.INTEGRATIONS },
  { pattern: /webhook/i, subcategory: SUBCATEGORIES.INTEGRATIONS },

  // VPN
  { pattern: /ike/i, subcategory: SUBCATEGORIES.VPN },
  { pattern: /ipsec/i, subcategory: SUBCATEGORIES.VPN },
  { pattern: /tunnel/i, subcategory: SUBCATEGORIES.VPN },
  { pattern: /vpn/i, subcategory: SUBCATEGORIES.VPN },

  // AI/ML
  { pattern: /ai[_-]?assistant/i, subcategory: SUBCATEGORIES.AI_ML },
  { pattern: /ai[_-]?data/i, subcategory: SUBCATEGORIES.AI_ML },
  { pattern: /ml/i, subcategory: SUBCATEGORIES.AI_ML },

  // Applications
  { pattern: /app[_-]?type/i, subcategory: SUBCATEGORIES.APPLICATIONS },
  { pattern: /app[_-]?setting/i, subcategory: SUBCATEGORIES.APPLICATIONS },
  { pattern: /application/i, subcategory: SUBCATEGORIES.APPLICATIONS },
];

/**
 * Exact resource name to subcategory mapping
 * Highest priority - overrides both patterns and domain mapping
 */
const EXACT_RESOURCE_MAP: Record<string, Subcategory> = {
  // Load Balancing
  "http-loadbalancer": SUBCATEGORIES.LOAD_BALANCING,
  "tcp-loadbalancer": SUBCATEGORIES.LOAD_BALANCING,
  "udp-loadbalancer": SUBCATEGORIES.LOAD_BALANCING,
  "origin-pool": SUBCATEGORIES.LOAD_BALANCING,
  healthcheck: SUBCATEGORIES.LOAD_BALANCING,

  // DNS
  "dns-zone": SUBCATEGORIES.DNS,
  "dns-loadbalancer": SUBCATEGORIES.DNS,

  // Security
  "app-firewall": SUBCATEGORIES.SECURITY,
  "service-policy": SUBCATEGORIES.SECURITY,
  "rate-limiter": SUBCATEGORIES.SECURITY,

  // Organization
  namespace: SUBCATEGORIES.ORGANIZATION,
  tenant: SUBCATEGORIES.ORGANIZATION,

  // Certificates
  certificate: SUBCATEGORIES.CERTIFICATES,
  secret: SUBCATEGORIES.CERTIFICATES,

  // Sites
  "aws-vpc-site": SUBCATEGORIES.SITES,
  "azure-vnet-site": SUBCATEGORIES.SITES,
  "gcp-vpc-site": SUBCATEGORIES.SITES,

  // Kubernetes
  "k8s-cluster": SUBCATEGORIES.KUBERNETES,
  "virtual-k8s": SUBCATEGORIES.KUBERNETES,
};

/**
 * Get subcategory for a tool based on its domain and resource
 *
 * Priority:
 * 1. Exact resource name match
 * 2. Resource pattern match
 * 3. Domain-based mapping
 * 4. Default to General
 */
export function getSubcategory(domain: string, resource: string): Subcategory {
  // 1. Check exact resource match (highest priority)
  const normalizedResource = resource.toLowerCase();
  if (normalizedResource in EXACT_RESOURCE_MAP) {
    return EXACT_RESOURCE_MAP[normalizedResource];
  }

  // 2. Check resource patterns
  for (const { pattern, subcategory } of RESOURCE_PATTERNS) {
    if (pattern.test(resource)) {
      return subcategory;
    }
  }

  // 3. Fall back to domain mapping
  const normalizedDomain = domain.toLowerCase();
  if (normalizedDomain in DOMAIN_MAP) {
    return DOMAIN_MAP[normalizedDomain];
  }

  // 4. Default
  return SUBCATEGORIES.GENERAL;
}

/**
 * Convert subcategory to kebab-case directory name
 */
export function subcategoryToDirectory(subcategory: Subcategory): string {
  return subcategory
    .toLowerCase()
    .replace(/\//g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/**
 * Convert resource name to human-readable title
 */
export function resourceToTitle(resource: string): string {
  return resource
    .split("-")
    .map((word) => {
      // Handle acronyms
      const acronyms = ["http", "https", "tcp", "udp", "dns", "api", "ip", "waf", "tls", "ssl", "k8s", "vpc", "vnet", "gcp", "aws", "azure"];
      if (acronyms.includes(word.toLowerCase())) {
        return word.toUpperCase();
      }
      // Capitalize first letter
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

/**
 * Get all unique subcategories that have tools
 */
export function getAllUsedSubcategories(
  tools: Array<{ domain: string; resource: string }>
): Subcategory[] {
  const used = new Set<Subcategory>();
  for (const tool of tools) {
    used.add(getSubcategory(tool.domain, tool.resource));
  }
  return Array.from(used).sort();
}
