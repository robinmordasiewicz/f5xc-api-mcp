/**
 * Unit tests for resources module
 */

import { describe, it, expect } from "vitest";
import {
  RESOURCE_SCHEMES,
  RESOURCE_TYPES,
  buildResourceUri,
  parseResourceUri,
  getResourceType,
  getResourceTypesByTier,
  buildApiPath,
} from "../../src/resources/templates.js";

describe("Resource Schemes", () => {
  it("should have correct base scheme", () => {
    expect(RESOURCE_SCHEMES.BASE).toBe("f5xc://");
  });

  it("should have system namespace constant", () => {
    expect(RESOURCE_SCHEMES.SYSTEM).toBe("system");
  });

  it("should have shared namespace constant", () => {
    expect(RESOURCE_SCHEMES.SHARED).toBe("shared");
  });
});

describe("Resource Types", () => {
  it("should define all expected resource types", () => {
    const expectedTypes = [
      "namespace",
      "certificate",
      "secret",
      "cloud_credentials",
      "http_loadbalancer",
      "tcp_loadbalancer",
      "origin_pool",
      "healthcheck",
      "dns_zone",
      "dns_load_balancer",
      "aws_vpc_site",
      "azure_vnet_site",
      "gcp_vpc_site",
      "app_firewall",
      "service_policy",
      "rate_limiter",
      "bot_defense",
      "api_definition",
    ];

    for (const type of expectedTypes) {
      expect(RESOURCE_TYPES[type]).toBeDefined();
    }
  });

  it("should have correct tier assignments", () => {
    // NO_TIER resources
    expect(RESOURCE_TYPES.namespace.tier).toBe("NO_TIER");
    expect(RESOURCE_TYPES.certificate.tier).toBe("NO_TIER");
    expect(RESOURCE_TYPES.secret.tier).toBe("NO_TIER");
    expect(RESOURCE_TYPES.cloud_credentials.tier).toBe("NO_TIER");

    // STANDARD resources
    expect(RESOURCE_TYPES.http_loadbalancer.tier).toBe("STANDARD");
    expect(RESOURCE_TYPES.origin_pool.tier).toBe("STANDARD");
    expect(RESOURCE_TYPES.dns_zone.tier).toBe("STANDARD");

    // ADVANCED resources
    expect(RESOURCE_TYPES.app_firewall.tier).toBe("ADVANCED");
    expect(RESOURCE_TYPES.service_policy.tier).toBe("ADVANCED");
    expect(RESOURCE_TYPES.bot_defense.tier).toBe("ADVANCED");
  });

  it("should have namespace-scoped property correctly set", () => {
    expect(RESOURCE_TYPES.namespace.namespaceScoped).toBe(false);
    expect(RESOURCE_TYPES.http_loadbalancer.namespaceScoped).toBe(true);
    expect(RESOURCE_TYPES.origin_pool.namespaceScoped).toBe(true);
  });

  it("should have related resources defined", () => {
    expect(RESOURCE_TYPES.http_loadbalancer.relatedResources).toContain("origin_pool");
    expect(RESOURCE_TYPES.http_loadbalancer.relatedResources).toContain("app_firewall");
    expect(RESOURCE_TYPES.origin_pool.relatedResources).toContain("healthcheck");
  });
});

describe("buildResourceUri", () => {
  it("should build correct URI with all components", () => {
    const uri = buildResourceUri("mytenant", "production", "http_loadbalancer", "example-lb");
    expect(uri).toBe("f5xc://mytenant/production/http_loadbalancer/example-lb");
  });

  it("should handle system namespace", () => {
    const uri = buildResourceUri("mytenant", "system", "namespace", "default");
    expect(uri).toBe("f5xc://mytenant/system/namespace/default");
  });

  it("should handle shared namespace", () => {
    const uri = buildResourceUri("mytenant", "shared", "certificate", "wildcard-cert");
    expect(uri).toBe("f5xc://mytenant/shared/certificate/wildcard-cert");
  });

  it("should handle special characters in names", () => {
    const uri = buildResourceUri("example-tenant", "prod-ns", "http_loadbalancer", "app-lb-1");
    expect(uri).toBe("f5xc://example-tenant/prod-ns/http_loadbalancer/app-lb-1");
  });
});

describe("parseResourceUri", () => {
  it("should parse valid URI correctly", () => {
    const result = parseResourceUri("f5xc://mytenant/production/http_loadbalancer/example-lb");

    expect(result).not.toBeNull();
    expect(result!.tenant).toBe("mytenant");
    expect(result!.namespace).toBe("production");
    expect(result!.resourceType).toBe("http_loadbalancer");
    expect(result!.name).toBe("example-lb");
  });

  it("should return null for invalid scheme", () => {
    const result = parseResourceUri("https://mytenant/production/http_loadbalancer/example-lb");
    expect(result).toBeNull();
  });

  it("should return null for missing components", () => {
    expect(parseResourceUri("f5xc://mytenant/production/http_loadbalancer")).toBeNull();
    expect(parseResourceUri("f5xc://mytenant/production")).toBeNull();
    expect(parseResourceUri("f5xc://mytenant")).toBeNull();
  });

  it("should return null for extra components", () => {
    const result = parseResourceUri("f5xc://mytenant/production/http_loadbalancer/example-lb/extra");
    expect(result).toBeNull();
  });

  it("should return null for empty components", () => {
    expect(parseResourceUri("f5xc://mytenant//http_loadbalancer/example-lb")).toBeNull();
    expect(parseResourceUri("f5xc:///production/http_loadbalancer/example-lb")).toBeNull();
  });
});

describe("getResourceType", () => {
  it("should return resource type for valid type", () => {
    const result = getResourceType("http_loadbalancer");

    expect(result).toBeDefined();
    expect(result!.type).toBe("http_loadbalancer");
    expect(result!.name).toBe("HTTP Load Balancer");
    expect(result!.tier).toBe("STANDARD");
  });

  it("should return undefined for invalid type", () => {
    const result = getResourceType("nonexistent_type");
    expect(result).toBeUndefined();
  });
});

describe("getResourceTypesByTier", () => {
  it("should return NO_TIER resources", () => {
    const results = getResourceTypesByTier("NO_TIER");

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((r) => r.tier === "NO_TIER")).toBe(true);
    expect(results.map((r) => r.type)).toContain("namespace");
    expect(results.map((r) => r.type)).toContain("certificate");
  });

  it("should return STANDARD resources", () => {
    const results = getResourceTypesByTier("STANDARD");

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((r) => r.tier === "STANDARD")).toBe(true);
    expect(results.map((r) => r.type)).toContain("http_loadbalancer");
    expect(results.map((r) => r.type)).toContain("origin_pool");
  });

  it("should return ADVANCED resources", () => {
    const results = getResourceTypesByTier("ADVANCED");

    expect(results.length).toBeGreaterThan(0);
    expect(results.every((r) => r.tier === "ADVANCED")).toBe(true);
    expect(results.map((r) => r.type)).toContain("app_firewall");
    expect(results.map((r) => r.type)).toContain("bot_defense");
  });
});

describe("buildApiPath", () => {
  it("should build path for namespace-scoped resource", () => {
    const path = buildApiPath("http_loadbalancer", "production");
    expect(path).toBe("/api/config/namespaces/production/http_loadbalancers");
  });

  it("should build path with resource name", () => {
    const path = buildApiPath("http_loadbalancer", "production", "example-lb");
    expect(path).toBe("/api/config/namespaces/production/http_loadbalancers/example-lb");
  });

  it("should build path for non-namespace-scoped resource", () => {
    const path = buildApiPath("namespace", "system");
    expect(path).toBe("/api/web/namespaces");
  });

  it("should return null for invalid resource type", () => {
    const path = buildApiPath("nonexistent_type", "production");
    expect(path).toBeNull();
  });

  it("should handle different namespace values", () => {
    const path1 = buildApiPath("origin_pool", "staging");
    expect(path1).toBe("/api/config/namespaces/staging/origin_pools");

    const path2 = buildApiPath("origin_pool", "system", "global-pool");
    expect(path2).toBe("/api/config/namespaces/system/origin_pools/global-pool");
  });
});
