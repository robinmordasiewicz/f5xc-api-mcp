// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * URL Normalization Acceptance Tests
 *
 * Tests that various URL input formats are correctly normalized
 * and that the /api/api duplication issue is prevented.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { CredentialManager, AuthMode } from "@robinmordasiewicz/f5xc-auth";
import { handleConfigureAuth } from "../../src/tools/configure-auth.js";
import { normalizePath, normalizeF5XCUrl } from "../../src/utils/url-utils.js";
import { buildApiPath } from "../../src/resources/templates.js";

/** Staging tenant name — override with TEST_TENANT_NAME env var */
const TEST_TENANT = process.env.TEST_TENANT_NAME ?? "staging-test";

describe("URL Normalization Acceptance Tests", () => {
  describe("URL Format Variations", () => {
    const urlVariations = [
      {
        input: "https://f5-amer-ent.console.ves.volterra.io",
        expected: "https://f5-amer-ent.console.ves.volterra.io",
        description: "standard console URL",
      },
      {
        input: "https://f5-amer-ent.console.ves.volterra.io/api",
        expected: "https://f5-amer-ent.console.ves.volterra.io",
        description: "console URL with /api suffix",
      },
      {
        input: "f5-amer-ent.console.ves.volterra.io",
        expected: "https://f5-amer-ent.console.ves.volterra.io",
        description: "console URL without protocol",
      },
      {
        input: "f5-amer-ent.console.ves.volterra.io/api",
        expected: "https://f5-amer-ent.console.ves.volterra.io",
        description: "console URL without protocol, with /api",
      },
      {
        input: `https://${TEST_TENANT}.staging.volterra.us`,
        expected: `https://${TEST_TENANT}.staging.volterra.us`,
        description: "staging URL",
      },
      {
        input: `https://${TEST_TENANT}.staging.volterra.us/api`,
        expected: `https://${TEST_TENANT}.staging.volterra.us`,
        description: "staging URL with /api suffix",
      },
      {
        input: `${TEST_TENANT}.staging.volterra.us`,
        expected: `https://${TEST_TENANT}.staging.volterra.us`,
        description: "staging URL without protocol",
      },
      {
        input: `${TEST_TENANT}.staging.volterra.us/api`,
        expected: `https://${TEST_TENANT}.staging.volterra.us`,
        description: "staging URL without protocol, with /api",
      },
      {
        input: "  f5-amer-ent.console.ves.volterra.io  ",
        expected: "https://f5-amer-ent.console.ves.volterra.io",
        description: "URL with leading/trailing whitespace",
      },
      {
        input: "https://f5-amer-ent.console.ves.volterra.io///",
        expected: "https://f5-amer-ent.console.ves.volterra.io",
        description: "URL with multiple trailing slashes",
      },
      {
        input: "https://f5-amer-ent.console.ves.volterra.io/api/",
        expected: "https://f5-amer-ent.console.ves.volterra.io",
        description: "URL with /api/ (trailing slash)",
      },
    ];

    it.each(urlVariations)(
      "should normalize $description: $input -> $expected",
      ({ input, expected }) => {
        expect(normalizeF5XCUrl(input)).toBe(expected);
      }
    );
  });

  describe("Path Normalization Prevents /api/api Duplication", () => {
    const resourceTypes = [
      "namespace",
      "certificate",
      "http_loadbalancer",
      "origin_pool",
      "dns_zone",
      "app_firewall",
    ];

    it.each(resourceTypes)(
      "should prevent /api/api for resource type: %s",
      (resourceType: string) => {
        const namespace = "default";
        const apiPath = buildApiPath(resourceType, namespace);

        // Skip if resource type doesn't exist in templates
        if (!apiPath) {
          return;
        }

        // The apiPath from templates includes /api prefix
        expect(apiPath.startsWith("/api/")).toBe(true);

        // After normalization, it should not start with /api
        const normalizedPath = normalizePath(apiPath);
        expect(normalizedPath.startsWith("/api/")).toBe(false);

        // Simulated full URL construction
        const baseUrl = "https://tenant.console.ves.volterra.io/api";
        const fullUrl = `${baseUrl}${normalizedPath}`;

        // Should never have /api/api
        expect(fullUrl).not.toContain("/api/api");

        // Should have exactly one /api
        const apiCount = (fullUrl.match(/\/api/g) ?? []).length;
        expect(apiCount).toBe(1);
      }
    );
  });

  describe("Configure Auth URL Normalization", () => {
    let mockCredentialManager: CredentialManager;

    beforeEach(async () => {
      // Mock fetch to avoid network calls during verification
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ status: 401, ok: false }));

      mockCredentialManager = new CredentialManager();
      await mockCredentialManager.initialize();
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it("should normalize URL when configuring with protocol-less URL", async () => {
      const result = await handleConfigureAuth(
        {
          action: "configure",
          tenantUrl: "f5-amer-ent.console.ves.volterra.io",
          apiToken: "test-token",
          profileName: "test-profile",
          skipVerification: true,
        },
        mockCredentialManager
      );

      expect(result).toHaveProperty("success", true);
      expect(result).toHaveProperty("message");
      expect((result as { message: string }).message).toContain(
        "https://f5-amer-ent.console.ves.volterra.io"
      );
    });

    it("should normalize URL when configuring with /api suffix", async () => {
      const result = await handleConfigureAuth(
        {
          action: "configure",
          tenantUrl: "https://f5-amer-ent.console.ves.volterra.io/api",
          apiToken: "test-token",
          profileName: "test-profile",
          skipVerification: true,
        },
        mockCredentialManager
      );

      expect(result).toHaveProperty("success", true);
      expect(result).toHaveProperty("message");
      // The message should show normalized URL without /api
      expect((result as { message: string }).message).toContain(
        "https://f5-amer-ent.console.ves.volterra.io"
      );
      expect((result as { message: string }).message).not.toContain("/api/api");
    });

    it("should verify URL when skipVerification is false", async () => {
      await handleConfigureAuth(
        {
          action: "configure",
          tenantUrl: "f5-amer-ent.console.ves.volterra.io",
          apiToken: "test-token",
          profileName: "test-profile",
          skipVerification: false,
        },
        mockCredentialManager
      );

      // Should have called fetch for verification
      expect(fetch).toHaveBeenCalledWith(
        "https://f5-amer-ent.console.ves.volterra.io/api",
        expect.any(Object)
      );
    });

    it("should not verify URL when skipVerification is true", async () => {
      await handleConfigureAuth(
        {
          action: "configure",
          tenantUrl: "f5-amer-ent.console.ves.volterra.io",
          apiToken: "test-token",
          profileName: "test-profile",
          skipVerification: true,
        },
        mockCredentialManager
      );

      // Should not have called fetch
      expect(fetch).not.toHaveBeenCalled();
    });

    it("should return error with suggestions when URL verification fails", async () => {
      vi.mocked(fetch).mockRejectedValue(new Error("ENOTFOUND: getaddrinfo failed"));

      const result = await handleConfigureAuth(
        {
          action: "configure",
          tenantUrl: "invalid-tenant.console.ves.volterra.io",
          apiToken: "test-token",
          profileName: "test-profile",
          skipVerification: false,
        },
        mockCredentialManager
      );

      expect(result).toHaveProperty("success", false);
      expect(result).toHaveProperty("message");
      expect((result as { message: string }).message).toContain("verification failed");
      expect((result as { message: string }).message).toContain("Suggestions");
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty string gracefully", () => {
      // Empty string should return https:// with empty host
      const result = normalizeF5XCUrl("");
      expect(result).toBe("");
    });

    it("should handle whitespace-only string", () => {
      const result = normalizeF5XCUrl("   ");
      expect(result).toBe("");
    });

    it("should normalize path with only /api", () => {
      expect(normalizePath("/api")).toBe("/api");
      expect(normalizePath("/api/")).toBe("/");
    });

    it("should preserve query parameters in URL", () => {
      // Note: our normalizeF5XCUrl strips query params since F5XC base URLs shouldn't have them
      // This is intentional behavior - query params belong on API paths, not base URLs
      const result = normalizeF5XCUrl("https://tenant.console.ves.volterra.io?foo=bar");
      expect(result).toBe("https://tenant.console.ves.volterra.io");
    });
  });

  describe("Real-World URL Patterns from User Reports", () => {
    // These test cases are based on actual user-reported URL formats
    const userReportedPatterns = [
      {
        input: `https://${TEST_TENANT}.staging.volterra.us`,
        description: "Staging environment (user format 1)",
      },
      {
        input: `https://${TEST_TENANT}.staging.volterra.us/api`,
        description: "Staging environment with /api (user format 2)",
      },
      {
        input: `${TEST_TENANT}.staging.volterra.us`,
        description: "Staging without protocol (user format 3)",
      },
      {
        input: `${TEST_TENANT}.staging.volterra.us/api`,
        description: "Staging without protocol, with /api (user format 4)",
      },
    ];

    it.each(userReportedPatterns)(
      "should handle $description without causing /api/api",
      ({ input }) => {
        // Normalize the URL
        const normalizedUrl = normalizeF5XCUrl(input);

        // Should have https://
        expect(normalizedUrl.startsWith("https://")).toBe(true);

        // Should not end with /api
        expect(normalizedUrl.endsWith("/api")).toBe(false);

        // When used with a resource path, should not have /api/api
        const resourcePath = "/api/config/namespaces/default/http_loadbalancers";
        const normalizedPath = normalizePath(resourcePath);
        const fullUrl = `${normalizedUrl}/api${normalizedPath}`;

        expect(fullUrl).not.toContain("/api/api");
      }
    );
  });
});
