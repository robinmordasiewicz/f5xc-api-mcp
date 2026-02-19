// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Tests for SSRF domain allowlist protection.
 * Security fix for issue #487.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { isAllowedF5XCDomain, normalizeF5XCUrl } from "../../src/utils/url-utils.js";

describe("SSRF domain allowlist (#487)", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    delete process.env.F5XC_ALLOWED_DOMAINS;
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  describe("isAllowedF5XCDomain", () => {
    it("should allow production console domains", () => {
      expect(isAllowedF5XCDomain("tenant.console.ves.volterra.io")).toBe(true);
    });

    it("should allow staging domains", () => {
      expect(isAllowedF5XCDomain("tenant.staging.volterra.us")).toBe(true);
    });

    it("should allow ves.volterra.io subdomains", () => {
      expect(isAllowedF5XCDomain("anything.ves.volterra.io")).toBe(true);
    });

    it("should reject arbitrary domains", () => {
      expect(isAllowedF5XCDomain("evil.com")).toBe(false);
    });

    it("should reject internal network addresses", () => {
      expect(isAllowedF5XCDomain("localhost")).toBe(false);
      expect(isAllowedF5XCDomain("192.168.1.1")).toBe(false);
      expect(isAllowedF5XCDomain("10.0.0.1")).toBe(false);
    });

    it("should reject domains that contain volterra but are not subdomains", () => {
      expect(isAllowedF5XCDomain("volterra.io.evil.com")).toBe(false);
      expect(isAllowedF5XCDomain("fakevolterra.io")).toBe(false);
    });

    it("should be case-insensitive", () => {
      expect(isAllowedF5XCDomain("Tenant.Console.Ves.Volterra.IO")).toBe(true);
    });

    it("should allow custom domains from F5XC_ALLOWED_DOMAINS", () => {
      process.env.F5XC_ALLOWED_DOMAINS = "internal.corp.com,dev.example.io";
      expect(isAllowedF5XCDomain("api.internal.corp.com")).toBe(true);
      expect(isAllowedF5XCDomain("test.dev.example.io")).toBe(true);
    });

    it("should handle leading dots in F5XC_ALLOWED_DOMAINS", () => {
      process.env.F5XC_ALLOWED_DOMAINS = ".custom.domain.com";
      expect(isAllowedF5XCDomain("api.custom.domain.com")).toBe(true);
    });

    it("should handle whitespace in F5XC_ALLOWED_DOMAINS", () => {
      process.env.F5XC_ALLOWED_DOMAINS = " custom.com , other.com ";
      expect(isAllowedF5XCDomain("api.custom.com")).toBe(true);
      expect(isAllowedF5XCDomain("api.other.com")).toBe(true);
    });
  });

  describe("normalizeF5XCUrl SSRF protection", () => {
    it("should accept valid F5XC production URLs", () => {
      expect(normalizeF5XCUrl("tenant.console.ves.volterra.io")).toBe(
        "https://tenant.console.ves.volterra.io"
      );
    });

    it("should accept valid F5XC staging URLs", () => {
      expect(normalizeF5XCUrl("tenant.staging.volterra.us")).toBe(
        "https://tenant.staging.volterra.us"
      );
    });

    it("should throw for non-F5XC domains", () => {
      expect(() => normalizeF5XCUrl("https://evil.com")).toThrow("not an allowed F5XC domain");
    });

    it("should throw for internal network addresses", () => {
      expect(() => normalizeF5XCUrl("http://localhost:8080")).toThrow(
        "not an allowed F5XC domain"
      );
    });

    it("should throw for metadata service URLs (cloud SSRF)", () => {
      expect(() => normalizeF5XCUrl("http://169.254.169.254")).toThrow(
        "not an allowed F5XC domain"
      );
    });

    it("should accept custom domains when configured", () => {
      process.env.F5XC_ALLOWED_DOMAINS = "custom.internal.com";
      expect(normalizeF5XCUrl("api.custom.internal.com")).toBe(
        "https://api.custom.internal.com"
      );
    });

    it("should still return empty for empty input", () => {
      expect(normalizeF5XCUrl("")).toBe("");
    });
  });
});
