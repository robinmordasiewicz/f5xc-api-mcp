/**
 * Unit Tests for F5XC Tool Naming Utilities
 *
 * Pre-enriched specs from robinmordasiewicz/f5xc-api-enriched already have
 * naming transformations applied, so legacy transform functions have been removed.
 */

import { describe, it, expect } from "vitest";
import {
  generateToolName,
  extractResourceFromPath,
  methodToOperation,
} from "../../src/generator/naming/volterra-mapping.js";

describe("volterra-mapping", () => {
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
