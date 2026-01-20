// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Quota Resource Type Mapping
 *
 * Maps MCP resource names to F5XC quota resource identifiers.
 * MCP resource names (e.g., "http-loadbalancer") may differ from
 * F5XC quota API resource types (e.g., "http_loadbalancer").
 */

/**
 * Map MCP resource type to F5XC quota resource identifier
 */
export const QUOTA_RESOURCE_MAP: Record<string, string> = {
  // Load Balancing
  "http-loadbalancer": "http_loadbalancer",
  "tcp-loadbalancer": "tcp_loadbalancer",
  "origin-pool": "origin_pool",
  healthcheck: "healthcheck",

  // DNS
  "dns-zone": "dns_zone",
  "dns-lb-pool": "dns_lb_pool",

  // Security
  "waf-policy": "app_firewall",
  "service-policy": "service_policy",
  "app-firewall": "app_firewall",

  // Infrastructure
  "aws-vpc-site": "aws_vpc_site",
  "azure-vnet-site": "azure_vnet_site",
  "gcp-vpc-site": "gcp_vpc_site",

  // System
  namespace: "namespace",
  "api-credential": "api_credential",

  // Placeholder for additional mappings discovered from F5XC API responses
};

/**
 * Get F5XC quota resource type from MCP resource type
 *
 * @param mcpResourceType - MCP resource type (e.g., "http-loadbalancer")
 * @returns F5XC quota resource type (e.g., "http_loadbalancer")
 */
export function getQuotaResourceType(mcpResourceType: string): string {
  return QUOTA_RESOURCE_MAP[mcpResourceType] || mcpResourceType;
}

/**
 * Check if a resource type has a quota mapping
 *
 * @param mcpResourceType - MCP resource type
 * @returns true if mapping exists
 */
export function hasQuotaMapping(mcpResourceType: string): boolean {
  return mcpResourceType in QUOTA_RESOURCE_MAP;
}
