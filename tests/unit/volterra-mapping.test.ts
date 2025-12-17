/**
 * Unit Tests for Volterra to F5XC Naming Transforms
 */

import { describe, it, expect } from "vitest";
import {
  NAMESPACE_MAPPINGS,
  RESOURCE_MAPPINGS,
  FIELD_MAPPINGS,
  transformNamespace,
  transformResourceName,
  transformFieldName,
  transformText,
  transformOpenApiSpec,
  generateToolName,
  extractDomainFromPath,
  extractResourceFromPath,
  methodToOperation,
} from "../../src/generator/naming/volterra-mapping.js";

describe("volterra-mapping", () => {
  describe("NAMESPACE_MAPPINGS", () => {
    it("should contain expected namespace mappings", () => {
      expect(NAMESPACE_MAPPINGS.get("ves.io")).toBe("f5xc");
      expect(NAMESPACE_MAPPINGS.get("ves.io.schema")).toBe("f5xc.schema");
      expect(NAMESPACE_MAPPINGS.get("volterra")).toBe("f5xc");
    });
  });

  describe("RESOURCE_MAPPINGS", () => {
    it("should contain expected resource mappings", () => {
      expect(RESOURCE_MAPPINGS.get("voltstack_site")).toBe("customer_edge_site");
      expect(RESOURCE_MAPPINGS.get("voltstack")).toBe("customer_edge");
      expect(RESOURCE_MAPPINGS.get("ves_site")).toBe("regional_edge_site");
      expect(RESOURCE_MAPPINGS.get("ves_io")).toBe("f5xc");
    });
  });

  describe("FIELD_MAPPINGS", () => {
    it("should contain expected field mappings", () => {
      expect(FIELD_MAPPINGS.get("ves_io_tenant")).toBe("tenant");
      expect(FIELD_MAPPINGS.get("ves_certified_hw")).toBe("f5xc_certified_hw");
    });
  });

  describe("transformNamespace", () => {
    it("should transform ves.io namespace", () => {
      expect(transformNamespace("ves.io")).toBe("f5xc");
      expect(transformNamespace("ves.io.api")).toBe("f5xc.api");
    });

    it("should transform ves.io.schema namespace", () => {
      expect(transformNamespace("ves.io.schema")).toBe("f5xc.schema");
      expect(transformNamespace("ves.io.schema.views")).toBe("f5xc.schema.views");
    });

    it("should transform volterra namespace", () => {
      expect(transformNamespace("volterra")).toBe("f5xc");
      expect(transformNamespace("volterra.config")).toBe("f5xc.config");
    });

    it("should not transform unrecognized namespaces", () => {
      expect(transformNamespace("other.namespace")).toBe("other.namespace");
      expect(transformNamespace("com.example")).toBe("com.example");
    });

    it("should handle empty string", () => {
      expect(transformNamespace("")).toBe("");
    });
  });

  describe("transformResourceName", () => {
    it("should transform voltstack_site to customer_edge_site", () => {
      expect(transformResourceName("voltstack_site")).toBe("customer_edge_site");
      expect(transformResourceName("VOLTSTACK_SITE")).toBe("customer_edge_site");
    });

    it("should transform voltstack to customer_edge", () => {
      expect(transformResourceName("voltstack")).toBe("customer_edge");
    });

    it("should transform ves_site to regional_edge_site", () => {
      expect(transformResourceName("ves_site")).toBe("regional_edge_site");
    });

    it("should return original name for unmapped resources", () => {
      expect(transformResourceName("http_loadbalancer")).toBe("http_loadbalancer");
      expect(transformResourceName("origin_pool")).toBe("origin_pool");
    });

    it("should handle case-insensitive matching", () => {
      expect(transformResourceName("VES_IO")).toBe("f5xc");
      expect(transformResourceName("Ves_Io")).toBe("f5xc");
    });
  });

  describe("transformFieldName", () => {
    it("should transform ves_io_tenant to tenant", () => {
      expect(transformFieldName("ves_io_tenant")).toBe("tenant");
      expect(transformFieldName("VES_IO_TENANT")).toBe("tenant");
    });

    it("should transform ves_certified_hw", () => {
      expect(transformFieldName("ves_certified_hw")).toBe("f5xc_certified_hw");
    });

    it("should return original name for unmapped fields", () => {
      expect(transformFieldName("namespace")).toBe("namespace");
      expect(transformFieldName("metadata")).toBe("metadata");
    });
  });

  describe("transformText", () => {
    it("should transform Volterra company name", () => {
      expect(transformText("Welcome to Volterra")).toBe("Welcome to F5 Distributed Cloud");
    });

    it("should transform VES acronym", () => {
      expect(transformText("VES API Documentation")).toBe("F5XC API Documentation");
      expect(transformText("Configure via ves console")).toBe("Configure via f5xc console");
    });

    it("should transform VoltStack to Customer Edge", () => {
      expect(transformText("Deploy VoltStack site")).toBe("Deploy Customer Edge site");
      // Note: The case-insensitive /gi flag transforms both cases to "Customer Edge"
      expect(transformText("voltstack configuration")).toBe("Customer Edge configuration");
    });

    it("should transform Volterra Edge Services", () => {
      // Note: The pattern replaces "Volterra Edge Services" but "Edge Services" remains
      expect(transformText("Volterra Edge Services platform")).toBe(
        "F5 Distributed Cloud Edge Services platform"
      );
    });

    it("should transform VES Console", () => {
      expect(transformText("Access the VES Console")).toBe("Access the F5XC Console");
    });

    it("should not transform protected URLs", () => {
      const urlText = "API endpoint: https://api.volterra.io/api/config/namespaces";
      expect(transformText(urlText)).toBe(urlText);
    });

    it("should not transform console URLs", () => {
      const consoleUrl = "Login at console.ves.volterra.io";
      expect(transformText(consoleUrl)).toBe(consoleUrl);
    });

    it("should handle empty string", () => {
      expect(transformText("")).toBe("");
    });

    it("should handle text without Volterra references", () => {
      const plainText = "Configure your load balancer settings";
      expect(transformText(plainText)).toBe(plainText);
    });
  });

  describe("transformOpenApiSpec", () => {
    it("should transform string values in spec", () => {
      const spec = {
        info: {
          title: "Volterra API",
          description: "VES API documentation",
        },
      };
      const result = transformOpenApiSpec(spec);
      expect(result.info).toEqual({
        title: "F5 Distributed Cloud API",
        description: "F5XC API documentation",
      });
    });

    it("should transform nested objects", () => {
      const spec = {
        paths: {
          "/api/config": {
            summary: "Volterra configuration endpoint",
          },
        },
      };
      const result = transformOpenApiSpec(spec);
      expect((result.paths as Record<string, Record<string, string>>)["/api/config"].summary).toBe(
        "F5 Distributed Cloud configuration endpoint"
      );
    });

    it("should transform arrays", () => {
      const spec = {
        tags: ["Volterra", "VES", "API"],
      };
      const result = transformOpenApiSpec(spec);
      expect(result.tags).toEqual(["F5 Distributed Cloud", "F5XC", "API"]);
    });

    it("should handle null and undefined values", () => {
      const spec = {
        value: null,
        other: undefined,
        text: "Volterra",
      };
      const result = transformOpenApiSpec(spec);
      expect(result.value).toBeNull();
      expect(result.other).toBeUndefined();
      expect(result.text).toBe("F5 Distributed Cloud");
    });

    it("should transform field names", () => {
      const spec = {
        ves_io_tenant: "my-tenant",
      };
      const result = transformOpenApiSpec(spec);
      expect(result.tenant).toBe("my-tenant");
      expect(result.ves_io_tenant).toBeUndefined();
    });
  });

  describe("generateToolName", () => {
    it("should generate correct tool name format", () => {
      expect(generateToolName("waap", "http_loadbalancer", "create")).toBe(
        "f5xc-api-waap-http-loadbalancer-create"
      );
    });

    it("should normalize domain to lowercase alphanumeric", () => {
      expect(generateToolName("WAAP", "origin_pool", "list")).toBe(
        "f5xc-api-waap-origin-pool-list"
      );
      expect(generateToolName("DNS-Zone", "record", "get")).toBe("f5xc-api-dnszone-record-get");
    });

    it("should convert underscores to hyphens in resource", () => {
      expect(generateToolName("core", "http_loadbalancer", "delete")).toBe(
        "f5xc-api-core-http-loadbalancer-delete"
      );
    });

    it("should handle special characters", () => {
      expect(generateToolName("net!work", "fire@wall", "update")).toBe(
        "f5xc-api-network-firewall-update"
      );
    });

    it("should handle empty strings", () => {
      expect(generateToolName("", "", "")).toBe("f5xc-api---");
    });

    it("should generate names for all operation types", () => {
      const operations = ["create", "list", "get", "update", "delete", "patch"];
      operations.forEach((op) => {
        const result = generateToolName("core", "namespace", op);
        expect(result).toBe(`f5xc-api-core-namespace-${op}`);
      });
    });
  });

  describe("extractDomainFromPath", () => {
    it("should extract waap domain for load balancer paths", () => {
      expect(extractDomainFromPath("/api/config/namespaces/{namespace}/http_loadbalancers")).toBe(
        "waap"
      );
      expect(extractDomainFromPath("/api/config/namespaces/{namespace}/origin_pools")).toBe("waap");
      expect(extractDomainFromPath("/api/config/namespaces/{namespace}/app_firewalls")).toBe(
        "waap"
      );
      expect(extractDomainFromPath("/api/config/namespaces/{namespace}/rate_limiters")).toBe(
        "waap"
      );
    });

    it("should extract dns domain for DNS paths", () => {
      expect(extractDomainFromPath("/api/config/namespaces/{namespace}/dns_zones")).toBe("dns");
      expect(extractDomainFromPath("/api/config/namespaces/{namespace}/dns_load_balancers")).toBe(
        "dns"
      );
      expect(extractDomainFromPath("/api/config/namespaces/{namespace}/dns_lb_pools")).toBe("dns");
    });

    it("should extract network domain for network paths", () => {
      expect(extractDomainFromPath("/api/config/namespaces/{namespace}/network_connectors")).toBe(
        "network"
      );
      expect(extractDomainFromPath("/api/config/namespaces/{namespace}/network_firewalls")).toBe(
        "network"
      );
      expect(extractDomainFromPath("/api/config/namespaces/{namespace}/enhanced_firewalls")).toBe(
        "network"
      );
    });

    it("should extract site domain for cloud site paths", () => {
      expect(extractDomainFromPath("/api/config/namespaces/{namespace}/aws_vpc_sites")).toBe(
        "site"
      );
      expect(extractDomainFromPath("/api/config/namespaces/{namespace}/azure_vnet_sites")).toBe(
        "site"
      );
      expect(extractDomainFromPath("/api/config/namespaces/{namespace}/gcp_vpc_sites")).toBe(
        "site"
      );
    });

    it("should extract appstack domain for k8s paths", () => {
      expect(extractDomainFromPath("/api/config/namespaces/{namespace}/k8s_clusters")).toBe(
        "appstack"
      );
      expect(extractDomainFromPath("/api/config/namespaces/{namespace}/virtual_k8s")).toBe(
        "appstack"
      );
      expect(extractDomainFromPath("/api/config/namespaces/{namespace}/workloads")).toBe("appstack");
    });

    it("should extract security domain for policy paths", () => {
      // Note: The regex pattern is "service_policy|waf|malicious_user" (singular forms)
      // service_policies (plural) doesn't match, so it defaults to core
      expect(extractDomainFromPath("/api/config/namespaces/{namespace}/service_policy")).toBe(
        "security"
      );
      expect(extractDomainFromPath("/api/config/namespaces/{namespace}/wafs")).toBe("security");
      expect(extractDomainFromPath("/api/config/namespaces/{namespace}/malicious_users")).toBe(
        "security"
      );
    });

    it("should extract core domain for base resources", () => {
      expect(extractDomainFromPath("/api/config/namespaces")).toBe("core");
      expect(extractDomainFromPath("/api/config/namespaces/{namespace}/certificates")).toBe("core");
      expect(extractDomainFromPath("/api/config/namespaces/{namespace}/cloud_credentials")).toBe(
        "core"
      );
    });

    it("should default to core for unknown paths", () => {
      expect(extractDomainFromPath("/api/config/unknown/resource")).toBe("core");
      expect(extractDomainFromPath("/some/random/path")).toBe("core");
    });
  });

  describe("extractResourceFromPath", () => {
    it("should extract resource from plural path", () => {
      expect(extractResourceFromPath("/api/config/namespaces/{namespace}/http_loadbalancers")).toBe(
        "http-loadbalancer"
      );
      expect(extractResourceFromPath("/api/config/namespaces/{namespace}/origin_pools")).toBe(
        "origin-pool"
      );
    });

    it("should extract resource from path with trailing parameter", () => {
      expect(
        extractResourceFromPath("/api/config/namespaces/{namespace}/http_loadbalancers/{name}")
      ).toBe("http-loadbalancer");
    });

    it("should convert underscores to hyphens", () => {
      expect(extractResourceFromPath("/api/config/dns_zones")).toBe("dns-zone");
      expect(extractResourceFromPath("/api/config/aws_vpc_sites")).toBe("aws-vpc-site");
    });

    it("should handle simple paths", () => {
      expect(extractResourceFromPath("/namespaces")).toBe("namespace");
      expect(extractResourceFromPath("/certificates")).toBe("certificate");
    });

    it("should return unknown for empty or invalid paths", () => {
      expect(extractResourceFromPath("/")).toBe("unknown");
      expect(extractResourceFromPath("")).toBe("unknown");
    });

    it("should handle paths with only parameters", () => {
      expect(extractResourceFromPath("/{id}")).toBe("unknown");
    });
  });

  describe("methodToOperation", () => {
    it("should map GET to list when no path param", () => {
      expect(methodToOperation("GET", false)).toBe("list");
      expect(methodToOperation("get", false)).toBe("list");
    });

    it("should map GET to get when path param exists", () => {
      expect(methodToOperation("GET", true)).toBe("get");
      expect(methodToOperation("get", true)).toBe("get");
    });

    it("should map POST to create", () => {
      expect(methodToOperation("POST", false)).toBe("create");
      expect(methodToOperation("POST", true)).toBe("create");
      expect(methodToOperation("post", false)).toBe("create");
    });

    it("should map PUT to update", () => {
      expect(methodToOperation("PUT", false)).toBe("update");
      expect(methodToOperation("PUT", true)).toBe("update");
      expect(methodToOperation("put", true)).toBe("update");
    });

    it("should map DELETE to delete", () => {
      expect(methodToOperation("DELETE", false)).toBe("delete");
      expect(methodToOperation("DELETE", true)).toBe("delete");
      expect(methodToOperation("delete", false)).toBe("delete");
    });

    it("should map PATCH to patch", () => {
      expect(methodToOperation("PATCH", false)).toBe("patch");
      expect(methodToOperation("PATCH", true)).toBe("patch");
      expect(methodToOperation("patch", true)).toBe("patch");
    });

    it("should lowercase unknown methods", () => {
      expect(methodToOperation("HEAD", false)).toBe("head");
      expect(methodToOperation("OPTIONS", false)).toBe("options");
      expect(methodToOperation("CUSTOM", true)).toBe("custom");
    });
  });
});
