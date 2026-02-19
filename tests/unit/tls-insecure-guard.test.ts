// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Tests for F5XC_TLS_INSECURE production guard.
 * Security fix for issue #494.
 *
 * These tests verify the guard logic directly rather than calling createServer(),
 * which requires CredentialManager initialization and STDIO transport.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { normalizeF5XCUrl } from "../../src/utils/url-utils.js";

/**
 * Extracted guard logic for testability — mirrors the logic in createServer().
 * Returns true if the flag was cleared.
 */
function shouldClearTlsInsecure(
  apiUrl: string | undefined,
  tlsInsecure: string | undefined
): boolean {
  if (tlsInsecure !== "true" || !apiUrl) {
    return false;
  }

  let normalizedForCheck: string;
  try {
    normalizedForCheck = normalizeF5XCUrl(apiUrl);
  } catch {
    // SSRF domain validation rejected the URL — not a production domain
    return false;
  }
  try {
    const hostname = new URL(normalizedForCheck).hostname.toLowerCase();
    const isProduction =
      hostname.endsWith(".console.ves.volterra.io") && !hostname.includes(".staging.");
    return isProduction;
  } catch {
    return false;
  }
}

describe("TLS insecure production guard (#494)", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    delete process.env.F5XC_TLS_INSECURE;
    delete process.env.F5XC_API_URL;
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("should clear TLS insecure for production console domains", () => {
    expect(shouldClearTlsInsecure("https://tenant.console.ves.volterra.io", "true")).toBe(true);
  });

  it("should clear TLS insecure for production domains without protocol", () => {
    expect(shouldClearTlsInsecure("tenant.console.ves.volterra.io", "true")).toBe(true);
  });

  it("should allow TLS insecure for staging domains", () => {
    expect(shouldClearTlsInsecure("https://tenant.staging.volterra.us", "true")).toBe(false);
  });

  it("should allow TLS insecure for staging console domains", () => {
    expect(shouldClearTlsInsecure("https://tenant.staging.console.ves.volterra.io", "true")).toBe(
      false
    );
  });

  it("should not interfere when F5XC_TLS_INSECURE is not set", () => {
    expect(shouldClearTlsInsecure("https://tenant.console.ves.volterra.io", undefined)).toBe(false);
  });

  it("should not interfere when F5XC_TLS_INSECURE is false", () => {
    expect(shouldClearTlsInsecure("https://tenant.console.ves.volterra.io", "false")).toBe(false);
  });

  it("should not interfere when no API URL is set", () => {
    expect(shouldClearTlsInsecure(undefined, "true")).toBe(false);
  });

  it("should handle empty API URL", () => {
    expect(shouldClearTlsInsecure("", "true")).toBe(false);
  });

  it("should allow TLS insecure for custom non-volterra domains", () => {
    expect(shouldClearTlsInsecure("https://internal.example.com", "true")).toBe(false);
  });

  it("should allow TLS insecure for localhost", () => {
    expect(shouldClearTlsInsecure("https://localhost:8443", "true")).toBe(false);
  });
});
