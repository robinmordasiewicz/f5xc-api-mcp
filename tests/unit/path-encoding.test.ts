// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Tests for consistent path parameter encoding.
 * Security fix for issue #491.
 */

import { describe, it, expect } from "vitest";
import { buildApiPath } from "../../src/resources/templates.js";

describe("path parameter encoding (#491)", () => {
  describe("buildApiPath", () => {
    it("should encode namespace with special characters", () => {
      const path = buildApiPath("http_loadbalancer", "my namespace");
      expect(path).toBe("/api/config/namespaces/my%20namespace/http_loadbalancers");
    });

    it("should encode namespace with slashes", () => {
      const path = buildApiPath("http_loadbalancer", "ns/evil");
      expect(path).toBe("/api/config/namespaces/ns%2Fevil/http_loadbalancers");
    });

    it("should encode namespace with URL-unsafe characters", () => {
      const path = buildApiPath("healthcheck", "test&ns=admin");
      expect(path).toBe("/api/config/namespaces/test%26ns%3Dadmin/healthchecks");
    });

    it("should not double-encode already safe namespaces", () => {
      const path = buildApiPath("http_loadbalancer", "default");
      expect(path).toBe("/api/config/namespaces/default/http_loadbalancers");
    });

    it("should encode name parameter with special characters", () => {
      const path = buildApiPath("http_loadbalancer", "default", "my lb/test");
      expect(path).toBe("/api/config/namespaces/default/http_loadbalancers/my%20lb%2Ftest");
    });

    it("should encode name parameter with URL-unsafe characters", () => {
      const path = buildApiPath("origin_pool", "default", "pool&name=evil");
      expect(path).toBe("/api/config/namespaces/default/origin_pools/pool%26name%3Devil");
    });

    it("should return null for unknown resource types", () => {
      const path = buildApiPath("nonexistent", "default");
      expect(path).toBeNull();
    });

    it("should handle non-namespaced resources", () => {
      const path = buildApiPath("namespace", "system");
      // namespace resource has apiPath: /api/web/namespaces (no {namespace} placeholder)
      expect(path).toBe("/api/web/namespaces");
    });
  });
});
