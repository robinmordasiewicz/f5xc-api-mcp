/**
 * URL Utilities Unit Tests
 *
 * Tests for URL normalization and path handling functions
 * that prevent /api/api duplication errors.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  normalizePath,
  normalizeF5XCUrl,
  extractTenantFromUrl,
  verifyF5XCEndpoint,
  verifyWithRetry,
} from "../../src/utils/url-utils.js";

describe("URL Utilities", () => {
  describe("normalizePath", () => {
    it("should strip /api prefix from paths", () => {
      expect(normalizePath("/api/config/namespaces/default")).toBe("/config/namespaces/default");
    });

    it("should strip /api prefix from paths with resource names", () => {
      expect(normalizePath("/api/config/namespaces/default/http_loadbalancers/my-lb")).toBe(
        "/config/namespaces/default/http_loadbalancers/my-lb"
      );
    });

    it("should preserve paths without /api prefix", () => {
      expect(normalizePath("/config/namespaces/default")).toBe("/config/namespaces/default");
    });

    it("should handle paths that start with /api without trailing content", () => {
      expect(normalizePath("/api/")).toBe("/");
    });

    it("should not modify paths that contain api elsewhere", () => {
      expect(normalizePath("/config/api-gateway/default")).toBe("/config/api-gateway/default");
    });

    it("should handle root path", () => {
      expect(normalizePath("/")).toBe("/");
    });

    it("should handle empty string", () => {
      expect(normalizePath("")).toBe("");
    });

    it("should not strip /api if it's not at the start", () => {
      expect(normalizePath("/v1/api/config")).toBe("/v1/api/config");
    });
  });

  describe("normalizeF5XCUrl", () => {
    describe("protocol handling", () => {
      it("should add https:// to protocol-less URLs", () => {
        expect(normalizeF5XCUrl("tenant.console.ves.volterra.io")).toBe(
          "https://tenant.console.ves.volterra.io"
        );
      });

      it("should preserve existing https:// protocol", () => {
        expect(normalizeF5XCUrl("https://tenant.console.ves.volterra.io")).toBe(
          "https://tenant.console.ves.volterra.io"
        );
      });

      it("should preserve http:// protocol (even though not recommended)", () => {
        expect(normalizeF5XCUrl("http://tenant.console.ves.volterra.io")).toBe(
          "http://tenant.console.ves.volterra.io"
        );
      });
    });

    describe("/api suffix handling", () => {
      it("should remove /api suffix", () => {
        expect(normalizeF5XCUrl("https://tenant.console.ves.volterra.io/api")).toBe(
          "https://tenant.console.ves.volterra.io"
        );
      });

      it("should remove /api suffix from protocol-less URLs", () => {
        expect(normalizeF5XCUrl("tenant.console.ves.volterra.io/api")).toBe(
          "https://tenant.console.ves.volterra.io"
        );
      });

      it("should handle /api/ with trailing slash", () => {
        expect(normalizeF5XCUrl("https://tenant.console.ves.volterra.io/api/")).toBe(
          "https://tenant.console.ves.volterra.io"
        );
      });

      it("should handle case-insensitive /API suffix", () => {
        expect(normalizeF5XCUrl("https://tenant.console.ves.volterra.io/API")).toBe(
          "https://tenant.console.ves.volterra.io"
        );
      });
    });

    describe("trailing slash handling", () => {
      it("should remove single trailing slash", () => {
        expect(normalizeF5XCUrl("https://tenant.console.ves.volterra.io/")).toBe(
          "https://tenant.console.ves.volterra.io"
        );
      });

      it("should remove multiple trailing slashes", () => {
        expect(normalizeF5XCUrl("https://tenant.console.ves.volterra.io///")).toBe(
          "https://tenant.console.ves.volterra.io"
        );
      });
    });

    describe("staging URLs", () => {
      it("should normalize staging URLs", () => {
        expect(normalizeF5XCUrl("tenant.staging.volterra.us")).toBe(
          "https://tenant.staging.volterra.us"
        );
      });

      it("should normalize staging URLs with /api", () => {
        expect(normalizeF5XCUrl("tenant.staging.volterra.us/api")).toBe(
          "https://tenant.staging.volterra.us"
        );
      });

      it("should normalize staging URLs with https", () => {
        expect(normalizeF5XCUrl("https://tenant.staging.volterra.us")).toBe(
          "https://tenant.staging.volterra.us"
        );
      });
    });

    describe("console URLs", () => {
      it("should normalize console.ves.volterra.io URLs", () => {
        expect(normalizeF5XCUrl("tenant.console.ves.volterra.io")).toBe(
          "https://tenant.console.ves.volterra.io"
        );
      });

      it("should normalize staging console URLs", () => {
        expect(normalizeF5XCUrl("tenant.staging.console.ves.volterra.io")).toBe(
          "https://tenant.staging.console.ves.volterra.io"
        );
      });
    });

    describe("whitespace handling", () => {
      it("should trim leading/trailing whitespace", () => {
        expect(normalizeF5XCUrl("  tenant.console.ves.volterra.io  ")).toBe(
          "https://tenant.console.ves.volterra.io"
        );
      });
    });

    describe("port handling", () => {
      it("should preserve explicit ports", () => {
        expect(normalizeF5XCUrl("https://tenant.console.ves.volterra.io:8443")).toBe(
          "https://tenant.console.ves.volterra.io:8443"
        );
      });
    });
  });

  describe("extractTenantFromUrl", () => {
    it("should extract tenant from console URL", () => {
      expect(extractTenantFromUrl("https://f5-amer-ent.console.ves.volterra.io")).toBe(
        "f5-amer-ent"
      );
    });

    it("should extract tenant from staging URL", () => {
      expect(extractTenantFromUrl("https://nferreira.staging.volterra.us")).toBe("nferreira");
    });

    it("should extract tenant from protocol-less URL", () => {
      expect(extractTenantFromUrl("mytenant.console.ves.volterra.io")).toBe("mytenant");
    });

    it("should extract tenant from URL with /api suffix", () => {
      expect(extractTenantFromUrl("https://mytenant.console.ves.volterra.io/api")).toBe("mytenant");
    });

    it("should return null for invalid URL", () => {
      expect(extractTenantFromUrl("not-a-url")).toBe(null);
    });

    it("should handle hyphenated tenant names", () => {
      expect(extractTenantFromUrl("https://my-tenant-name.console.ves.volterra.io")).toBe(
        "my-tenant-name"
      );
    });
  });

  describe("verifyF5XCEndpoint", () => {
    beforeEach(() => {
      vi.stubGlobal("fetch", vi.fn());
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it("should return valid for 401 response (valid URL, needs auth)", async () => {
      vi.mocked(fetch).mockResolvedValue({
        status: 401,
        ok: false,
      } as Response);

      const result = await verifyF5XCEndpoint("https://tenant.console.ves.volterra.io");

      expect(result.valid).toBe(true);
      expect(result.normalizedUrl).toBe("https://tenant.console.ves.volterra.io");
      expect(result.tenant).toBe("tenant");
    });

    it("should return valid for 403 response (valid URL, needs auth)", async () => {
      vi.mocked(fetch).mockResolvedValue({
        status: 403,
        ok: false,
      } as Response);

      const result = await verifyF5XCEndpoint("https://tenant.console.ves.volterra.io");

      expect(result.valid).toBe(true);
    });

    it("should return invalid for 404 response with suggestions", async () => {
      vi.mocked(fetch).mockResolvedValue({
        status: 404,
        ok: false,
      } as Response);

      const result = await verifyF5XCEndpoint("https://tenant.console.ves.volterra.io");

      expect(result.valid).toBe(false);
      expect(result.error).toContain("404");
      expect(result.suggestions).toBeDefined();
      expect(result.suggestions!.length).toBeGreaterThan(0);
    });

    it("should return invalid for network error with suggestions", async () => {
      vi.mocked(fetch).mockRejectedValue(new Error("ENOTFOUND: getaddrinfo failed"));

      const result = await verifyF5XCEndpoint("https://invalid.console.ves.volterra.io");

      expect(result.valid).toBe(false);
      expect(result.error).toContain("Could not resolve hostname");
      expect(result.suggestions).toBeDefined();
    });

    it("should return invalid for timeout", async () => {
      vi.mocked(fetch).mockRejectedValue(new Error("aborted"));

      const result = await verifyF5XCEndpoint("https://tenant.console.ves.volterra.io", {
        timeoutMs: 1000,
      });

      expect(result.valid).toBe(false);
      expect(result.error).toContain("timed out");
    });

    it("should skip verification when skipVerification is true", async () => {
      const result = await verifyF5XCEndpoint("https://tenant.console.ves.volterra.io", {
        skipVerification: true,
      });

      expect(result.valid).toBe(true);
      expect(fetch).not.toHaveBeenCalled();
    });

    it("should normalize URL before verification", async () => {
      vi.mocked(fetch).mockResolvedValue({
        status: 401,
        ok: false,
      } as Response);

      const result = await verifyF5XCEndpoint("tenant.console.ves.volterra.io/api");

      expect(result.normalizedUrl).toBe("https://tenant.console.ves.volterra.io");
      expect(fetch).toHaveBeenCalledWith(
        "https://tenant.console.ves.volterra.io/api",
        expect.any(Object)
      );
    });
  });

  describe("verifyWithRetry", () => {
    beforeEach(() => {
      vi.stubGlobal("fetch", vi.fn());
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it("should return immediately if first attempt succeeds", async () => {
      vi.mocked(fetch).mockResolvedValue({
        status: 401,
        ok: false,
      } as Response);

      const result = await verifyWithRetry("https://tenant.console.ves.volterra.io");

      expect(result.valid).toBe(true);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("should try common patterns for tenant-only input", async () => {
      // First call fails, second succeeds
      vi.mocked(fetch)
        .mockRejectedValueOnce(new Error("ENOTFOUND"))
        .mockResolvedValueOnce({
          status: 401,
          ok: false,
        } as Response);

      const result = await verifyWithRetry("mytenant");

      expect(result.valid).toBe(true);
      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });

  describe("Integration: normalizePath with buildApiPath patterns", () => {
    // These test cases ensure that the combination of resource template paths
    // and normalizePath prevents /api/api duplication

    const resourcePaths = [
      "/api/web/namespaces",
      "/api/config/namespaces/{namespace}/certificates",
      "/api/config/namespaces/{namespace}/http_loadbalancers",
      "/api/config/namespaces/{namespace}/origin_pools",
      "/api/config/namespaces/{namespace}/dns_zones",
      "/api/config/namespaces/{namespace}/app_firewalls",
    ];

    it.each(resourcePaths)(
      "should correctly normalize resource path: %s",
      (resourcePath: string) => {
        const normalizedPath = normalizePath(resourcePath);
        const baseUrl = "https://tenant.console.ves.volterra.io/api";
        const fullUrl = `${baseUrl}${normalizedPath}`;

        // Should never have /api/api
        expect(fullUrl).not.toContain("/api/api");

        // Should have exactly one /api
        const apiCount = (fullUrl.match(/\/api/g) ?? []).length;
        expect(apiCount).toBe(1);
      }
    );

    it("should construct correct URL from baseUrl + normalized path", () => {
      const baseUrl = "https://tenant.console.ves.volterra.io/api";
      const resourcePath = "/api/config/namespaces/default/http_loadbalancers";
      const normalizedPath = normalizePath(resourcePath);
      const fullUrl = `${baseUrl}${normalizedPath}`;

      expect(fullUrl).toBe(
        "https://tenant.console.ves.volterra.io/api/config/namespaces/default/http_loadbalancers"
      );
    });
  });
});
