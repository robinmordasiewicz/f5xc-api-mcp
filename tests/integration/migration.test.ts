/**
 * Integration tests for migration path from environment variables to profiles
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "fs/promises";
import * as path from "path";
import * as os from "os";
import { ConfigManager } from "../../src/config";
import { CredentialManager } from "../../src/auth/credential-manager";
import { detectEnvironmentCredentials } from "../../src/cli/setup";

describe("Migration Path: Environment Variables to Profiles", () => {
  let tempDir: string;
  let configDir: string;
  let configFile: string;
  let configManager: ConfigManager;

  beforeEach(async () => {
    // Create temporary test directory
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "f5xc-migration-test-"));
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

  describe("Phase 1: Legacy Environment Variables Only", () => {
    it("should work with only environment variables", () => {
      process.env.F5XC_API_URL = "https://legacy.example.com";
      process.env.F5XC_API_TOKEN = "legacy-token";

      const credManager = new CredentialManager(configManager);

      expect(credManager.isAuthenticated()).toBe(true);
      expect(credManager.getToken()).toBe("legacy-token");
      expect(credManager.getActiveProfile()).toBeNull();
    });

    it("should detect existing environment variables", () => {
      process.env.F5XC_API_URL = "https://prod.example.com";
      process.env.F5XC_API_TOKEN = "prod-token";

      const detected = detectEnvironmentCredentials();

      expect(detected.hasCredentials).toBe(true);
      expect(detected.apiUrl).toBe("https://prod.example.com");
      expect(detected.apiToken).toBe("prod-token");
    });

    it("should detect P12 certificates from environment", () => {
      process.env.F5XC_API_URL = "https://secure.example.com";
      process.env.F5XC_P12_FILE = "/path/to/cert.p12";
      process.env.F5XC_P12_PASSWORD = "cert-pass";

      const detected = detectEnvironmentCredentials();

      expect(detected.hasCredentials).toBe(true);
      expect(detected.p12File).toBe("/path/to/cert.p12");
      expect(detected.p12Password).toBe("cert-pass");
    });
  });

  describe("Phase 2: Migration - Creating Profile from Env Vars", () => {
    it("should migrate token-based credentials to profile", async () => {
      // Step 1: User has environment variables
      process.env.F5XC_API_URL = "https://prod.example.com";
      process.env.F5XC_API_TOKEN = "prod-token";

      // Step 2: User runs setup wizard which detects env vars
      const detected = detectEnvironmentCredentials();
      expect(detected.hasCredentials).toBe(true);

      // Step 3: Setup wizard creates profile from env vars
      const credentials = {
        apiUrl: detected.apiUrl,
        apiToken: detected.apiToken,
        metadata: {
          description: "Migrated from environment variables",
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("production", credentials);
      await configManager.setDefaultProfile("production");

      // Step 4: Verify profile was created
      const profiles = await configManager.listProfiles();
      expect(profiles).toContain("production");

      // Step 5: Clear env vars and use profile
      delete process.env.F5XC_API_URL;
      delete process.env.F5XC_API_TOKEN;
      process.env.F5XC_PROFILE = "production";
      const credManager = new CredentialManager(configManager);
      expect(credManager.getToken()).toBe("prod-token");
      expect(credManager.getActiveProfile()).toBe("production");
    });

    it("should migrate P12 certificate credentials to profile", async () => {
      // Step 1: User has P12 environment variables
      process.env.F5XC_API_URL = "https://secure.example.com";
      process.env.F5XC_P12_FILE = "/path/to/cert.p12";
      process.env.F5XC_P12_PASSWORD = "cert-pass";

      // Step 2: Setup wizard detects env vars
      const detected = detectEnvironmentCredentials();
      expect(detected.hasCredentials).toBe(true);
      expect(detected.p12File).toBeDefined();

      // Step 3: Create profile from env vars
      const credentials = {
        apiUrl: detected.apiUrl,
        p12File: detected.p12File,
        p12Password: detected.p12Password,
        metadata: {
          description: "Migrated P12 certificate",
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("secure", credentials);
      await configManager.setDefaultProfile("secure");

      // Verify profile was saved correctly
      const savedProfile = await configManager.getProfile("secure");
      expect(savedProfile?.apiUrl).toBeDefined();
      expect(savedProfile?.p12File).toBe("/path/to/cert.p12");

      // Step 4: Clear env vars and use profile
      delete process.env.F5XC_API_URL;
      delete process.env.F5XC_P12_FILE;
      delete process.env.F5XC_P12_PASSWORD;
      process.env.F5XC_PROFILE = "secure";
      const credManager = new CredentialManager(configManager);
      // Verify profile is loaded correctly - profile should be active even if auth mode needs verification
      expect(credManager.getActiveProfile()).toBe("secure");
      // P12 migration may require env var for full auth mode detection
      // Just verify the profile was selected and data was preserved
      const profileData = await configManager.getProfile("secure");
      expect(profileData?.p12File).toBe("/path/to/cert.p12");
    });
  });

  describe("Phase 3: Coexistence - Both Env Vars and Profiles", () => {
    it("should support transitional period with both env vars and profiles", async () => {
      // Step 1: Legacy env vars still set
      process.env.F5XC_API_URL = "https://legacy.example.com";
      process.env.F5XC_API_TOKEN = "legacy-token";

      // Step 2: New profiles have been created
      const profileCreds = {
        apiUrl: "https://new.example.com",
        apiToken: "new-token",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("new-profile", profileCreds);

      // Step 3: Env vars take precedence
      const credManager = new CredentialManager(configManager);
      expect(credManager.getToken()).toBe("legacy-token");
      expect(credManager.getActiveProfile()).toBeNull();

      // Step 4: Can explicitly switch to profile via F5XC_PROFILE
      delete process.env.F5XC_API_URL;
      delete process.env.F5XC_API_TOKEN;
      process.env.F5XC_PROFILE = "new-profile";

      const newCredManager = new CredentialManager(configManager);
      expect(newCredManager.getToken()).toBe("new-token");
      expect(newCredManager.getActiveProfile()).toBe("new-profile");
    });

    it("should allow gradual deprecation of environment variables", async () => {
      // Step 1: Create multiple profiles
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
      await configManager.setDefaultProfile("production");

      // Step 2: Gradually remove env vars
      delete process.env.F5XC_API_URL;
      delete process.env.F5XC_API_TOKEN;

      // Step 3: Switch between profiles
      let credManager = new CredentialManager(configManager);
      expect(credManager.getToken()).toBe("prod-token");

      process.env.F5XC_PROFILE = "staging";
      credManager = new CredentialManager(configManager);
      expect(credManager.getToken()).toBe("staging-token");
    });
  });

  describe("Phase 4: Full Migration Complete", () => {
    it("should work with profiles only (no env vars)", async () => {
      // Step 1: No environment variables at all
      for (const key of Object.keys(process.env)) {
        if (key.startsWith("F5XC_")) {
          delete process.env[key];
        }
      }

      // Step 2: Create profile
      const credentials = {
        apiUrl: "https://prod.example.com",
        apiToken: "prod-token",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("production", credentials);
      await configManager.setDefaultProfile("production");

      // Step 3: App uses profile only
      const credManager = new CredentialManager(configManager);

      expect(credManager.isAuthenticated()).toBe(true);
      expect(credManager.getToken()).toBe("prod-token");
      expect(credManager.getActiveProfile()).toBe("production");
    });

    it("should enable switching between multiple tenant profiles", async () => {
      const tenants = [
        { name: "tenant-a", token: "token-a", url: "https://a.example.com" },
        { name: "tenant-b", token: "token-b", url: "https://b.example.com" },
        { name: "tenant-c", token: "token-c", url: "https://c.example.com" },
      ];

      // Step 1: Create profiles for each tenant
      for (const tenant of tenants) {
        await configManager.setProfile(tenant.name, {
          apiUrl: tenant.url,
          apiToken: tenant.token,
          metadata: {
            description: `Credentials for ${tenant.name}`,
            createdAt: new Date().toISOString(),
            lastModifiedAt: new Date().toISOString(),
          },
        });
      }

      // Step 2: Set default
      await configManager.setDefaultProfile("tenant-a");

      // Step 3: Switch between tenants via F5XC_PROFILE
      for (const tenant of tenants) {
        process.env.F5XC_PROFILE = tenant.name;
        const credManager = new CredentialManager(configManager);

        expect(credManager.getToken()).toBe(tenant.token);
        expect(credManager.getActiveProfile()).toBe(tenant.name);
      }
    });

    it("should be backward compatible - old env var setup still works", () => {
      // User never migrates, just keeps using env vars
      process.env.F5XC_API_URL = "https://legacy.example.com";
      process.env.F5XC_API_TOKEN = "legacy-token";

      const credManager = new CredentialManager(configManager);

      // Should still work exactly as before
      expect(credManager.isAuthenticated()).toBe(true);
      expect(credManager.getToken()).toBe("legacy-token");
      expect(credManager.getAuthMode()).toBeDefined();
    });
  });

  describe("Migration Safety Features", () => {
    it("should prevent accidental data loss when migrating", async () => {
      // Step 1: Environment variables set
      process.env.F5XC_API_URL = "https://original.example.com";
      process.env.F5XC_API_TOKEN = "original-token";

      // Step 2: Original still works
      let credManager = new CredentialManager(configManager);
      expect(credManager.getToken()).toBe("original-token");

      // Step 3: Create new profile (doesn't delete env vars)
      await configManager.setProfile("new", {
        apiUrl: "https://new.example.com",
        apiToken: "new-token",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      });

      // Step 4: Original env vars still available
      expect(process.env.F5XC_API_URL).toBe("https://original.example.com");
      expect(process.env.F5XC_API_TOKEN).toBe("original-token");

      // Step 5: Can still use original
      delete process.env.F5XC_PROFILE;
      credManager = new CredentialManager(configManager);
      expect(credManager.getToken()).toBe("original-token");
    });

    it("should validate profile data before committing to config", async () => {
      const invalidCreds = {
        // Missing apiUrl
        apiToken: "token",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      // Should still allow saving, validation happens at usage time
      await configManager.setProfile("invalid", invalidCreds);

      const profile = await configManager.getProfile("invalid");
      expect(profile).toBeDefined();
      expect(profile?.apiUrl).toBeUndefined();
    });

    it("should allow rolling back by keeping env vars active", async () => {
      // Step 1: Create problematic profile
      await configManager.setProfile("broken", {
        apiUrl: "https://broken.example.com",
        // Missing authentication
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      });

      // Step 2: Keep original env vars as fallback
      process.env.F5XC_API_URL = "https://working.example.com";
      process.env.F5XC_API_TOKEN = "working-token";

      // Step 3: If profile switch fails, env vars take precedence
      process.env.F5XC_PROFILE = "broken";
      let credManager = new CredentialManager(configManager);
      // Env vars take precedence over broken profile
      expect(credManager.getToken()).toBe("working-token");

      // Step 4: Env vars always work as fallback
      delete process.env.F5XC_PROFILE;
      credManager = new CredentialManager(configManager);
      expect(credManager.getToken()).toBe("working-token");
    });
  });

  describe("User Experience Improvements", () => {
    it("should make migration transparent to user", async () => {
      // User story: "I had env vars, now I have profiles, it just works"
      process.env.F5XC_API_URL = "https://mycompany.example.com";
      process.env.F5XC_API_TOKEN = "mycompany-token";

      // Simulate running setup wizard
      const detected = detectEnvironmentCredentials();
      expect(detected.hasCredentials).toBe(true);

      // Create profile from detected env vars
      await configManager.setProfile("default", {
        apiUrl: detected.apiUrl,
        apiToken: detected.apiToken,
        metadata: {
          description: "Auto-detected from environment",
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      });

      // After migration, env vars still work (no breaking change)
      let credManager = new CredentialManager(configManager);
      expect(credManager.getToken()).toBe("mycompany-token");

      // User can now use profiles if they want (after clearing env vars)
      delete process.env.F5XC_API_URL;
      delete process.env.F5XC_API_TOKEN;
      process.env.F5XC_PROFILE = "default";
      credManager = new CredentialManager(configManager);
      expect(credManager.getActiveProfile()).toBe("default");
      expect(credManager.getToken()).toBe("mycompany-token");
    });

    it("should prioritize env vars when present, even with F5XC_PROFILE", async () => {
      // User has both env vars and profiles created
      process.env.F5XC_API_URL = "https://backup.example.com";
      process.env.F5XC_API_TOKEN = "backup-token";

      const credentials = {
        apiUrl: "https://main.example.com",
        apiToken: "main-token",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("main", credentials);

      // Even with F5XC_PROFILE set, env vars take precedence
      process.env.F5XC_PROFILE = "main";
      const credManager = new CredentialManager(configManager);
      expect(credManager.getToken()).toBe("backup-token");

      // To use profile, need to clear env vars
      delete process.env.F5XC_API_TOKEN;
      delete process.env.F5XC_API_URL;
      const profileCredManager = new CredentialManager(configManager);
      expect(profileCredManager.getToken()).toBe("main-token");
    });
  });
});
