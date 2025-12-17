/**
 * Unit tests for CredentialManager
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  normalizeApiUrl,
  extractTenantFromUrl,
  CredentialManager,
  AuthMode,
} from "../../src/auth/credential-manager.js";

describe("normalizeApiUrl", () => {
  it("should normalize short-form URL", () => {
    expect(normalizeApiUrl("https://mytenant.volterra.us")).toBe(
      "https://mytenant.console.ves.volterra.io/api"
    );
  });

  it("should normalize short-form URL with trailing slash", () => {
    expect(normalizeApiUrl("https://mytenant.volterra.us/")).toBe(
      "https://mytenant.console.ves.volterra.io/api"
    );
  });

  it("should normalize short-form URL with /api suffix", () => {
    expect(normalizeApiUrl("https://mytenant.volterra.us/api")).toBe(
      "https://mytenant.console.ves.volterra.io/api"
    );
  });

  it("should normalize staging URL", () => {
    expect(normalizeApiUrl("https://mytenant.staging.volterra.us")).toBe(
      "https://mytenant.staging.console.ves.volterra.io/api"
    );
  });

  it("should normalize console URL", () => {
    expect(normalizeApiUrl("https://mytenant.console.ves.volterra.io")).toBe(
      "https://mytenant.console.ves.volterra.io/api"
    );
  });

  it("should normalize console URL with existing /api", () => {
    expect(normalizeApiUrl("https://mytenant.console.ves.volterra.io/api")).toBe(
      "https://mytenant.console.ves.volterra.io/api"
    );
  });

  it("should handle HTTP URL and convert to HTTPS", () => {
    expect(normalizeApiUrl("http://mytenant.volterra.us")).toBe(
      "https://mytenant.console.ves.volterra.io/api"
    );
  });
});

describe("extractTenantFromUrl", () => {
  it("should extract tenant from normalized URL", () => {
    expect(
      extractTenantFromUrl("https://mytenant.console.ves.volterra.io/api")
    ).toBe("mytenant");
  });

  it("should extract tenant from staging URL", () => {
    expect(
      extractTenantFromUrl("https://mytenant.staging.console.ves.volterra.io/api")
    ).toBe("mytenant");
  });

  it("should return null for invalid URL", () => {
    expect(extractTenantFromUrl("invalid-url")).toBeNull();
  });
});

describe("CredentialManager", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("should default to NONE auth mode when no credentials provided", () => {
    delete process.env.F5XC_API_URL;
    delete process.env.F5XC_API_TOKEN;

    const manager = new CredentialManager();
    expect(manager.getAuthMode()).toBe(AuthMode.NONE);
    expect(manager.isAuthenticated()).toBe(false);
  });

  it("should use token auth when URL and token provided", () => {
    process.env.F5XC_API_URL = "https://mytenant.volterra.us";
    process.env.F5XC_API_TOKEN = "test-token";

    const manager = new CredentialManager();
    expect(manager.getAuthMode()).toBe(AuthMode.TOKEN);
    expect(manager.isAuthenticated()).toBe(true);
    expect(manager.getToken()).toBe("test-token");
    expect(manager.getTenant()).toBe("mytenant");
  });

  it("should normalize API URL", () => {
    process.env.F5XC_API_URL = "https://mytenant.volterra.us";
    process.env.F5XC_API_TOKEN = "test-token";

    const manager = new CredentialManager();
    expect(manager.getApiUrl()).toBe(
      "https://mytenant.console.ves.volterra.io/api"
    );
  });

  it("should return null tenant when not authenticated", () => {
    delete process.env.F5XC_API_URL;

    const manager = new CredentialManager();
    expect(manager.getTenant()).toBeNull();
  });

  it("should reload credentials", () => {
    process.env.F5XC_API_URL = "https://mytenant.volterra.us";
    process.env.F5XC_API_TOKEN = "test-token";

    const manager = new CredentialManager();
    expect(manager.isAuthenticated()).toBe(true);

    // Change environment
    delete process.env.F5XC_API_TOKEN;
    manager.reload();

    expect(manager.getAuthMode()).toBe(AuthMode.NONE);
  });
});
