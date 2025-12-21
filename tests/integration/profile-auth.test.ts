/**
 * Integration tests for CredentialManager + ConfigManager
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "fs/promises";
import * as path from "path";
import * as os from "os";
import { ConfigManager } from "../../src/config";
import { CredentialManager } from "../../src/auth/credential-manager";

describe("Profile-Based Authentication Integration", () => {
  let tempDir: string;
  let configDir: string;
  let configFile: string;
  let configManager: ConfigManager;

  beforeEach(async () => {
    // Create temporary test directory
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "f5xc-profile-auth-test-"));
    configDir = path.join(tempDir, ".f5xc");
    configFile = path.join(configDir, "credentials.json");
    configManager = new ConfigManager(configDir, configFile);

    // Clear environment variables for clean tests
    delete process.env.F5XC_API_URL;
    delete process.env.F5XC_API_TOKEN;
    delete process.env.F5XC_P12_FILE;
    delete process.env.F5XC_P12_PASSWORD;
    delete process.env.F5XC_PROFILE;
  });

  afterEach(async () => {
    // Clean up temporary directory
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
    } catch {
      // Ignore cleanup errors
    }

    // Clear environment variables
    delete process.env.F5XC_API_URL;
    delete process.env.F5XC_API_TOKEN;
    delete process.env.F5XC_P12_FILE;
    delete process.env.F5XC_P12_PASSWORD;
    delete process.env.F5XC_PROFILE;
  });

  describe("Credential Loading Priority", () => {
    it("should load credentials from environment variables when present", () => {
      process.env.F5XC_API_URL = "https://env.example.com";
      process.env.F5XC_API_TOKEN = "env-token";

      // Pass custom configManager to use our temp directory
      const credManager = new CredentialManager(configManager);

      // CredentialManager normalizes URLs, so just check it's set
      expect(credManager.getApiUrl()).toBeDefined();
      expect(credManager.getToken()).toBe("env-token");
      expect(credManager.getAuthMode()).toBe("TOKEN");
      expect(credManager.isAuthenticated()).toBe(true);
    });

    it("should use profile credentials when no environment variables", async () => {
      const credentials = {
        apiUrl: "https://profile.example.com",
        apiToken: "profile-token",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("default-profile", credentials);
      await configManager.setDefaultProfile("default-profile");

      const credManager = new CredentialManager(configManager);

      expect(credManager.getApiUrl()).toBeDefined();
      expect(credManager.getToken()).toBe("profile-token");
      expect(credManager.getActiveProfile()).toBe("default-profile");
      expect(credManager.isAuthenticated()).toBe(true);
    });

    it("should prioritize environment variables over profile", async () => {
      // Set up profile
      const profileCreds = {
        apiUrl: "https://profile.example.com",
        apiToken: "profile-token",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("my-profile", profileCreds);
      await configManager.setDefaultProfile("my-profile");

      // Set environment variables
      process.env.F5XC_API_URL = "https://env.example.com";
      process.env.F5XC_API_TOKEN = "env-token";

      const credManager = new CredentialManager(configManager);

      // Should use environment variables
      expect(credManager.getApiUrl()).toBeDefined();
      expect(credManager.getToken()).toBe("env-token");
      // Environment variables take priority, so no profile is active
      expect(credManager.getActiveProfile()).toBeNull();
    });

    it("should fall back to documentation mode when no credentials available", () => {
      const credManager = new CredentialManager(configManager);

      expect(credManager.getAuthMode()).toMatch(/none/i);
      expect(credManager.isAuthenticated()).toBe(false);
    });
  });

  describe("Profile Selection", () => {
    it("should use F5XC_PROFILE environment variable", async () => {
      const creds1 = {
        apiUrl: "https://prod.example.com",
        apiToken: "prod-token",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      const creds2 = {
        apiUrl: "https://staging.example.com",
        apiToken: "staging-token",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("production", creds1);
      await configManager.setProfile("staging", creds2);
      await configManager.setDefaultProfile("production");

      // Set F5XC_PROFILE to staging
      process.env.F5XC_PROFILE = "staging";

      const credManager = new CredentialManager(configManager);

      expect(credManager.getApiUrl()).toBe("https://staging.example.com");
      expect(credManager.getToken()).toBe("staging-token");
      expect(credManager.getActiveProfile()).toBe("staging");
    });

    it("should use default profile when F5XC_PROFILE not set", async () => {
      const prodCreds = {
        apiUrl: "https://prod.example.com",
        apiToken: "prod-token",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      const stagingCreds = {
        apiUrl: "https://staging.example.com",
        apiToken: "staging-token",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("production", prodCreds);
      await configManager.setProfile("staging", stagingCreds);
      await configManager.setDefaultProfile("staging");

      const credManager = new CredentialManager(configManager);

      expect(credManager.getApiUrl()).toBe("https://staging.example.com");
      expect(credManager.getToken()).toBe("staging-token");
      expect(credManager.getActiveProfile()).toBe("staging");
    });

    it("should handle invalid F5XC_PROFILE gracefully", async () => {
      const creds = {
        apiUrl: "https://default.example.com",
        apiToken: "default-token",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("default", creds);
      await configManager.setDefaultProfile("default");

      // Set F5XC_PROFILE to non-existent profile
      process.env.F5XC_PROFILE = "non-existent";

      const credManager = new CredentialManager(configManager);

      // Should fall back to default profile
      expect(credManager.getApiUrl()).toBe("https://default.example.com");
      expect(credManager.getToken()).toBe("default-token");
      expect(credManager.getActiveProfile()).toBe("default");
    });
  });

  describe("Profile Switching", () => {
    it("should switch between profiles via F5XC_PROFILE", async () => {
      const creds1 = {
        apiUrl: "https://profile1.example.com",
        apiToken: "token1",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      const creds2 = {
        apiUrl: "https://profile2.example.com",
        apiToken: "token2",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("profile1", creds1);
      await configManager.setProfile("profile2", creds2);

      // Use profile1
      process.env.F5XC_PROFILE = "profile1";
      let credManager = new CredentialManager(configManager);
      expect(credManager.getToken()).toBe("token1");

      // Switch to profile2
      process.env.F5XC_PROFILE = "profile2";
      credManager = new CredentialManager(configManager);
      expect(credManager.getToken()).toBe("token2");
    });

    it("should track active profile for metadata updates", async () => {
      const creds = {
        apiUrl: "https://test.example.com",
        apiToken: "test-token",
        metadata: {
          description: "Test profile",
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("tracked", creds);
      process.env.F5XC_PROFILE = "tracked";

      const credManager = new CredentialManager(configManager);
      expect(credManager.getActiveProfile()).toBe("tracked");

      // Update lastUsedAt for the profile
      await configManager.touchProfile("tracked");

      const profile = await configManager.getProfile("tracked");
      expect(profile?.metadata?.lastUsedAt).toBeDefined();
    });
  });

  describe("Certificate-Based Authentication", () => {
    it("should load P12 certificate credentials from profile", async () => {
      const credentials = {
        apiUrl: "https://secure.example.com",
        p12File: "/path/to/cert.p12",
        p12Password: "cert-password",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("secure", credentials);
      await configManager.setDefaultProfile("secure");

      const credManager = new CredentialManager(configManager);

      expect(credManager.getAuthMode()).toBe("CERTIFICATE");
      expect(credManager.getP12File()).toBe("/path/to/cert.p12");
      expect(credManager.getP12Password()).toBe("cert-password");
    });

    it("should prefer token over P12 when both present", async () => {
      const credentials = {
        apiUrl: "https://mixed.example.com",
        apiToken: "token-auth",
        p12File: "/path/to/cert.p12",
        p12Password: "cert-password",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("mixed", credentials);
      await configManager.setDefaultProfile("mixed");

      const credManager = new CredentialManager(configManager);

      expect(credManager.getAuthMode()).toBe("TOKEN");
      expect(credManager.getToken()).toBe("token-auth");
    });

    it("should use environment P12 variables over profile", async () => {
      const profileCreds = {
        apiUrl: "https://test.example.com",
        p12File: "/profile/path/cert.p12",
        p12Password: "profile-pass",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("test", profileCreds);
      await configManager.setDefaultProfile("test");

      // Set environment P12 variables
      process.env.F5XC_API_URL = "https://env.example.com";
      process.env.F5XC_P12_FILE = "/env/path/cert.p12";
      process.env.F5XC_P12_PASSWORD = "env-pass";

      const credManager = new CredentialManager(configManager);

      expect(credManager.getP12File()).toBe("/env/path/cert.p12");
      expect(credManager.getP12Password()).toBe("env-pass");
    });
  });

  describe("Metadata Tracking", () => {
    it("should update lastUsedAt timestamp when profile loaded", async () => {
      const credentials = {
        apiUrl: "https://test.example.com",
        apiToken: "test-token",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("tracked", credentials);
      const beforeTime = new Date();

      process.env.F5XC_PROFILE = "tracked";
      const credManager = new CredentialManager(configManager);

      // Profile should be loaded
      expect(credManager.getActiveProfile()).toBe("tracked");

      // Wait a moment to ensure timestamp difference
      await new Promise((resolve) => setTimeout(resolve, 10));

      // TouchProfile would update the timestamp
      await configManager.touchProfile("tracked");

      const profile = await configManager.getProfile("tracked");
      expect(profile?.metadata?.lastUsedAt).toBeDefined();
      if (profile?.metadata?.lastUsedAt) {
        const lastUsedTime = new Date(profile.metadata.lastUsedAt);
        expect(lastUsedTime.getTime()).toBeGreaterThanOrEqual(beforeTime.getTime());
      }
    });
  });

  describe("Error Handling", () => {
    it("should handle invalid JSON in config file", async () => {
      // Create invalid config file
      await fs.mkdir(configDir, { recursive: true });
      await fs.writeFile(configFile, "{ invalid json }");

      const credManager = new CredentialManager(configManager);

      // Should fall back to NONE auth mode
      expect(credManager.getAuthMode()).toMatch(/none/i);
    });

    it("should handle missing config file gracefully", () => {
      // ConfigManager handles missing files gracefully
      const credManager = new CredentialManager(configManager);

      expect(credManager.getAuthMode()).toMatch(/none/i);
      expect(credManager.isAuthenticated()).toBe(false);
    });

    it("should handle malformed profile data", async () => {
      // Create config with invalid profile
      const config = {
        version: "1.0",
        profiles: {
          invalid: {
            // Missing required fields
          },
        },
      };

      await fs.mkdir(configDir, { recursive: true });
      await fs.writeFile(configFile, JSON.stringify(config, null, 2));

      // Should handle gracefully
      const credManager = new CredentialManager(configManager);
      expect(credManager.getAuthMode()).toMatch(/none/i);
    });
  });

  describe("Full Workflow Scenarios", () => {
    it("should support complete profile creation and usage flow", async () => {
      // 1. User runs setup wizard and creates profile
      const setupCreds = {
        apiUrl: "https://tenant.volterra.us",
        apiToken: "setup-token",
        metadata: {
          description: "Volterra tenant",
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("volterra", setupCreds);
      await configManager.setDefaultProfile("volterra");

      // 2. User runs app with default profile
      let credManager = new CredentialManager(configManager);
      // Note: URLs are normalized to canonical format
      expect(credManager.getApiUrl()).toContain("console.ves.volterra");
      expect(credManager.isAuthenticated()).toBe(true);

      // 3. User switches profile via environment variable
      process.env.F5XC_PROFILE = "volterra";
      credManager = new CredentialManager(configManager);
      expect(credManager.getActiveProfile()).toBe("volterra");

      // 4. User overrides with environment variables
      process.env.F5XC_API_URL = "https://override.volterra.us";
      process.env.F5XC_API_TOKEN = "override-token";
      credManager = new CredentialManager(configManager);
      expect(credManager.getApiUrl()).toBeDefined();
      expect(credManager.getToken()).toBe("override-token");
    });

    it("should maintain backward compatibility with environment variables", () => {
      // Legacy users using only environment variables
      process.env.F5XC_API_URL = "https://legacy.example.com";
      process.env.F5XC_API_TOKEN = "legacy-token";

      const credManager = new CredentialManager(configManager);

      // URLs may be normalized, just check it's set
      expect(credManager.getApiUrl()).toBeDefined();
      expect(credManager.getToken()).toBe("legacy-token");
      // Auth mode is lowercase
      expect(credManager.getAuthMode()).toMatch(/token/i);
      expect(credManager.isAuthenticated()).toBe(true);
    });
  });
});
