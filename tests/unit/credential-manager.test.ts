/**
 * Unit tests for CredentialManager
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import fs from "fs";
import {
  normalizeApiUrl,
  extractTenantFromUrl,
  CredentialManager,
  AuthMode,
} from "../../src/auth/credential-manager.js";
import { shouldSkipP12Tests, shouldSkipTokenAuthTests } from "../utils/ci-environment.js";

// Mock fs for P12 file testing
vi.mock("fs", async (importOriginal) => {
  const original = await importOriginal<typeof import("fs")>();
  return {
    ...original,
    readFileSync: vi.fn((path: string) => {
      if (path.includes("fail")) {
        throw new Error("File not found");
      }
      return Buffer.from("mock-p12-data");
    }),
  };
});

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

  it("should return null for P12 password when not configured", () => {
    const manager = new CredentialManager();
    expect(manager.getP12Password()).toBeNull();
  });

  it("should return frozen credentials object", () => {
    process.env.F5XC_API_URL = "https://mytenant.volterra.us";
    process.env.F5XC_API_TOKEN = "test-token";

    const manager = new CredentialManager();
    const credentials = manager.getCredentials();

    expect(credentials).toBeDefined();
    expect(Object.isFrozen(credentials)).toBe(true);
    expect(credentials.token).toBe("test-token");
  });

  it("should return null P12 certificate when not configured", () => {
    const manager = new CredentialManager();
    expect(manager.getP12Certificate()).toBeNull();
  });

  it.skipIf(shouldSkipP12Tests())("should use certificate auth when P12 file is provided", () => {
    process.env.F5XC_API_URL = "https://mytenant.volterra.us";
    process.env.F5XC_P12_FILE = "/path/to/cert.p12";
    process.env.F5XC_P12_PASSWORD = "password";

    const manager = new CredentialManager();
    expect(manager.getAuthMode()).toBe(AuthMode.CERTIFICATE);
    expect(manager.getP12Certificate()).toEqual(Buffer.from("mock-p12-data"));
    expect(manager.getP12Password()).toBe("password");
  });

  it.skipIf(shouldSkipP12Tests())("should fall back to token auth when P12 file fails to load", () => {
    process.env.F5XC_API_URL = "https://mytenant.volterra.us";
    process.env.F5XC_P12_FILE = "/path/to/fail.p12"; // "fail" in path triggers mock error
    process.env.F5XC_API_TOKEN = "fallback-token";

    const manager = new CredentialManager();
    expect(manager.getAuthMode()).toBe(AuthMode.TOKEN);
    expect(manager.getToken()).toBe("fallback-token");
  });

  it.skipIf(shouldSkipP12Tests())("should fall back to NONE when P12 file fails and no token", () => {
    process.env.F5XC_API_URL = "https://mytenant.volterra.us";
    process.env.F5XC_P12_FILE = "/path/to/fail.p12"; // "fail" in path triggers mock error
    delete process.env.F5XC_API_TOKEN;

    const manager = new CredentialManager();
    expect(manager.getAuthMode()).toBe(AuthMode.NONE);
  });
});
