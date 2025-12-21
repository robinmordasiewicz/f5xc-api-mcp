/**
 * Acronym Normalization for F5XC API
 *
 * Handles consistent capitalization of technical acronyms in API
 * documentation, tool names, and descriptions.
 *
 * Ported from terraform-provider-f5xc/tools/pkg/naming/acronyms.go
 */

/**
 * Known technical acronyms that should be capitalized consistently
 */
export const TECHNICAL_ACRONYMS: readonly string[] = [
  // Networking
  "TCP",
  "UDP",
  "HTTP",
  "HTTPS",
  "DNS",
  "IP",
  "IPv4",
  "IPv6",
  "BGP",
  "OSPF",
  "VLAN",
  "VPN",
  "CIDR",
  "NAT",
  "SNAT",
  "DNAT",
  "MAC",
  "ARP",
  "NIC",
  "MTU",
  "QoS",
  "MPLS",
  "GRE",
  "VXLAN",
  "IPsec",
  "SSL",
  "TLS",
  "SNI",

  // Security
  "WAF",
  "DDoS",
  "XSS",
  "CSRF",
  "SQLi",
  "OWASP",
  "CVE",
  "JWT",
  "OAuth",
  "SAML",
  "LDAP",
  "AD",
  "ACL",
  "RBAC",
  "MFA",
  "SSO",
  "PKI",

  // Load Balancing
  "LB",
  "SLB",
  "GLB",
  "GSLB",
  "ADC",

  // Cloud & Infrastructure
  "AWS",
  "GCP",
  "Azure",
  "VPC",
  "VNet",
  "EC2",
  "EKS",
  "AKS",
  "GKE",
  "VM",
  "K8s",
  "API",
  "REST",
  "gRPC",
  "SDK",
  "CLI",
  "CDN",
  "SaaS",
  "PaaS",
  "IaaS",

  // F5 Specific
  "XC",
  "F5",
  "BIG-IP",
  "NGINX",
  "RE",
  "CE",
  "POP",

  // Standards & Formats
  "JSON",
  "XML",
  "YAML",
  "CSV",
  "HTML",
  "CSS",
  "URL",
  "URI",
  "UUID",
  "RFC",
  "ISO",
  "UTC",
  "TTL",

  // Protocols
  "SMTP",
  "IMAP",
  "POP3",
  "FTP",
  "SFTP",
  "SSH",
  "RDP",
  "SNMP",
  "NTP",
  "RADIUS",
  "TACACS",

  // Other
  "CPU",
  "GPU",
  "RAM",
  "SSD",
  "HDD",
  "IOPS",
  "IO",
  "ID",
  "IDs",
  "ASN",
  "CRD",
  "CRDs",
] as const;

/**
 * Lowercase mapping of acronyms for case-insensitive lookup
 */
const ACRONYM_MAP: Map<string, string> = new Map(
  TECHNICAL_ACRONYMS.map((acronym) => [acronym.toLowerCase(), acronym])
);

/**
 * Normalize acronyms in a text string to consistent capitalization
 *
 * @param text - Input text with potentially inconsistent acronym casing
 * @returns Text with normalized acronym capitalization
 * @deprecated Pre-enriched specs already have normalized acronyms
 */
export function normalizeAcronyms(text: string): string {
  // Word boundary pattern that matches words
  const wordPattern = /\b([a-zA-Z][a-zA-Z0-9-]*)\b/g;

  return text.replace(wordPattern, (match) => {
    const normalized = ACRONYM_MAP.get(match.toLowerCase());
    return normalized ?? match;
  });
}

/**
 * Normalize acronyms in title case text
 *
 * Handles cases like "Tcp Load Balancer" -> "TCP Load Balancer"
 *
 * @param title - Title text to normalize
 * @returns Title with normalized acronym capitalization
 * @deprecated Pre-enriched specs already have normalized acronyms
 */
export function normalizeTitleAcronyms(title: string): string {
  return normalizeAcronyms(title);
}

/**
 * Check if a word is a known acronym
 *
 * @param word - Word to check
 * @returns True if the word is a known acronym
 */
export function isAcronym(word: string): boolean {
  return ACRONYM_MAP.has(word.toLowerCase());
}

/**
 * Get the canonical form of an acronym
 *
 * @param word - Word to look up
 * @returns Canonical acronym form or null if not an acronym
 */
export function getCanonicalAcronym(word: string): string | null {
  return ACRONYM_MAP.get(word.toLowerCase()) ?? null;
}

/**
 * Convert a string to kebab-case with normalized acronyms
 *
 * Used for tool naming: "HTTP Load Balancer" -> "http-loadbalancer"
 *
 * @param text - Input text
 * @returns Kebab-case string
 */
export function toKebabCase(text: string): string {
  return text
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1-$2") // camelCase to kebab
    .replace(/[\s_]+/g, "-") // spaces and underscores to hyphens
    .replace(/[^a-zA-Z0-9-]/g, "") // remove special characters
    .replace(/-+/g, "-") // collapse multiple hyphens
    .toLowerCase();
}

/**
 * Convert a string to snake_case with normalized acronyms
 *
 * Used for resource naming: "HTTP Load Balancer" -> "http_load_balancer"
 *
 * @param text - Input text
 * @returns Snake_case string
 */
export function toSnakeCase(text: string): string {
  return text
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1_$2") // camelCase to snake
    .replace(/[\s-]+/g, "_") // spaces and hyphens to underscores
    .replace(/[^a-zA-Z0-9_]/g, "") // remove special characters
    .replace(/_+/g, "_") // collapse multiple underscores
    .toLowerCase();
}

/**
 * Convert a string to PascalCase with normalized acronyms
 *
 * Used for TypeScript type names: "http load balancer" -> "HttpLoadBalancer"
 *
 * @param text - Input text
 * @returns PascalCase string
 */
export function toPascalCase(text: string): string {
  return text
    .trim()
    .split(/[\s_-]+/)
    .map((word) => {
      const acronym = ACRONYM_MAP.get(word.toLowerCase());
      if (acronym) {
        // Keep acronyms as-is for PascalCase
        return acronym;
      }
      // Capitalize first letter
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
}

/**
 * Convert a string to camelCase with normalized acronyms
 *
 * Used for property names: "http load balancer" -> "httpLoadBalancer"
 *
 * @param text - Input text
 * @returns camelCase string
 */
export function toCamelCase(text: string): string {
  const pascal = toPascalCase(text);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}
