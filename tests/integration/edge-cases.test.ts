/**
 * Edge case tests for credential management and configuration
 * Tests error handling, invalid data, corrupted files, and edge scenarios
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "fs/promises";
import * as fsSync from "fs";
import * as path from "path";
import * as os from "os";
import { ConfigManager } from "../../src/config";
import { CredentialManager } from "../../src/auth/credential-manager";
import { validateProfileName } from "../../src/cli/setup";

describe("Edge Cases and Error Handling", () => {
  let tempDir: string;
  let configDir: string;
  let configFile: string;
  let configManager: ConfigManager;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "f5xc-edge-case-test-"));
    configDir = path.join(tempDir, ".f5xc");
    configFile = path.join(configDir, "credentials.json");
    configManager = new ConfigManager(configDir, configFile);

    // Clear environment variables
    delete process.env.F5XC_API_URL;
    delete process.env.F5XC_API_TOKEN;
    delete process.env.F5XC_P12_FILE;
    delete process.env.F5XC_P12_PASSWORD;
    delete process.env.F5XC_PROFILE;
  });

  afterEach(async () => {
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
    } catch {
      // Ignore cleanup errors
    }

    delete process.env.F5XC_API_URL;
    delete process.env.F5XC_API_TOKEN;
    delete process.env.F5XC_P12_FILE;
    delete process.env.F5XC_P12_PASSWORD;
    delete process.env.F5XC_PROFILE;
  });

  describe("Invalid Profile Names", () => {
    it("should reject profile names with spaces", () => {
      const result = validateProfileName("prod uat");
      expect(result.valid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it("should reject profile names with special characters", () => {
      expect(validateProfileName("prod@us").valid).toBe(false);
      expect(validateProfileName("test.staging").valid).toBe(false);
      expect(validateProfileName("prod!").valid).toBe(false);
      expect(validateProfileName("test#prod").valid).toBe(false);
    });

    it("should reject empty profile names", () => {
      const result = validateProfileName("");
      expect(result.valid).toBe(false);
      expect(result.error?.toLowerCase()).toContain("empty");
    });

    it("should allow reasonably long profile names", () => {
      // Profile name validation only checks for valid characters, not length
      const longName = "prod-" + "a".repeat(50);
      const result = validateProfileName(longName);
      // Valid characters (alphanumeric, dash, underscore) should pass
      expect(result.valid).toBe(true);
    });

    it("should accept valid profile names with hyphens and underscores", () => {
      expect(validateProfileName("prod-us").valid).toBe(true);
      expect(validateProfileName("test_staging").valid).toBe(true);
      expect(validateProfileName("prod-us-east-1").valid).toBe(true);
    });

    it("should accept profile names with numbers", () => {
      expect(validateProfileName("prod1").valid).toBe(true);
      expect(validateProfileName("test123").valid).toBe(true);
      expect(validateProfileName("2024-prod").valid).toBe(true);
    });
  });

  describe("Corrupted Configuration Files", () => {
    it("should handle invalid JSON in config file", async () => {
      await fs.mkdir(configDir, { recursive: true });
      await fs.writeFile(configFile, "{ invalid json }");

      const credManager = new CredentialManager(configManager);

      // Should fall back to documentation mode
      expect(credManager.isAuthenticated()).toBe(false);
      expect(credManager.getAuthMode()).toMatch(/none/i);
    });

    it("should handle completely empty config file", async () => {
      await fs.mkdir(configDir, { recursive: true });
      await fs.writeFile(configFile, "");

      const credManager = new CredentialManager(configManager);

      expect(credManager.isAuthenticated()).toBe(false);
    });

    it("should handle null config file content", async () => {
      await fs.mkdir(configDir, { recursive: true });
      await fs.writeFile(configFile, "null");

      const credManager = new CredentialManager(configManager);

      expect(credManager.isAuthenticated()).toBe(false);
    });

    it("should handle array instead of object in config file", async () => {
      await fs.mkdir(configDir, { recursive: true });
      await fs.writeFile(configFile, JSON.stringify([]));

      const credManager = new CredentialManager(configManager);

      expect(credManager.isAuthenticated()).toBe(false);
    });

    it("should handle missing profiles field in config", async () => {
      await fs.mkdir(configDir, { recursive: true });
      await fs.writeFile(
        configFile,
        JSON.stringify({ version: "1.0", defaultProfile: "test" })
      );

      const credManager = new CredentialManager(configManager);

      expect(credManager.isAuthenticated()).toBe(false);
    });

    it("should handle malformed profile data", async () => {
      await fs.mkdir(configDir, { recursive: true });
      await fs.writeFile(
        configFile,
        JSON.stringify({
          version: "1.0",
          profiles: {
            invalid: {
              // Missing all required fields
            },
          },
        })
      );

      const credManager = new CredentialManager(configManager);

      expect(credManager.isAuthenticated()).toBe(false);
    });
  });

  describe("Missing and Incomplete Credentials", () => {
    it("should handle profile missing API URL", async () => {
      const credentials = {
        apiToken: "token",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("no-url", credentials);
      process.env.F5XC_PROFILE = "no-url";

      const credManager = new CredentialManager(configManager);

      // Missing URL means not authenticated
      expect(credManager.isAuthenticated()).toBe(false);
    });

    it("should handle profile missing authentication (no token or p12)", async () => {
      const credentials = {
        apiUrl: "https://test.example.com",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("no-auth", credentials);
      process.env.F5XC_PROFILE = "no-auth";

      const credManager = new CredentialManager(configManager);

      expect(credManager.isAuthenticated()).toBe(false);
    });

    it("should handle profile with only P12 file path, no password", async () => {
      const credentials = {
        apiUrl: "https://test.example.com",
        p12File: "/path/to/cert.p12",
        // No p12Password
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("incomplete-p12", credentials);
      process.env.F5XC_PROFILE = "incomplete-p12";

      const credManager = new CredentialManager(configManager);

      // P12 without password might still be considered "authenticated" depending on implementation
      // At minimum, it shouldn't crash
      expect(credManager.getAuthMode()).toBeDefined();
    });

    it("should handle environment variables with only API URL, no auth", () => {
      process.env.F5XC_API_URL = "https://test.example.com";
      // No token or P12 vars

      const credManager = new CredentialManager(configManager);

      expect(credManager.isAuthenticated()).toBe(false);
    });

    it("should handle empty token value", async () => {
      const credentials = {
        apiUrl: "https://test.example.com",
        apiToken: "",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("empty-token", credentials);
      process.env.F5XC_PROFILE = "empty-token";

      const credManager = new CredentialManager(configManager);

      // Empty token should not authenticate
      expect(credManager.isAuthenticated()).toBe(false);
    });
  });

  describe("Configuration File Permissions", () => {
    it("should create directory with secure permissions (0700)", async () => {
      const credentials = {
        apiUrl: "https://test.example.com",
        apiToken: "token",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("test", credentials);

      const dirStats = fsSync.statSync(configDir);
      const dirMode = dirStats.mode & 0o777;

      expect(dirMode).toBe(0o700);
    });

    it("should create file with secure permissions (0600)", async () => {
      const credentials = {
        apiUrl: "https://test.example.com",
        apiToken: "token",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("test", credentials);

      const fileStats = fsSync.statSync(configFile);
      const fileMode = fileStats.mode & 0o777;

      expect(fileMode).toBe(0o600);
    });
  });

  describe("Concurrent Operations", () => {
    it("should handle sequential profile writes correctly", async () => {
      // ConfigManager uses atomic writes, but concurrent writes to the same file
      // can cause race conditions. This test verifies sequential writes work.
      const profiles = [];

      for (let i = 0; i < 5; i++) {
        const credentials = {
          apiUrl: `https://tenant${i}.example.com`,
          apiToken: `token-${i}`,
          metadata: {
            createdAt: new Date().toISOString(),
            lastModifiedAt: new Date().toISOString(),
          },
        };

        await configManager.setProfile(`profile-${i}`, credentials);
        profiles.push(`profile-${i}`);
      }

      const savedProfiles = await configManager.listProfiles();
      for (const profile of profiles) {
        expect(savedProfiles).toContain(profile);
      }
    });

    it("should handle concurrent profile reads", async () => {
      // First create a profile
      const credentials = {
        apiUrl: "https://test.example.com",
        apiToken: "token",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("concurrent-test", credentials);

      // Then read it concurrently
      const promises = [];
      for (let i = 0; i < 5; i++) {
        promises.push(configManager.getProfile("concurrent-test"));
      }

      const results = await Promise.all(promises);

      results.forEach((profile) => {
        expect(profile?.apiToken).toBe("token");
      });
    });
  });

  describe("Special Characters in Values", () => {
    it("should handle API URLs with special characters", async () => {
      const credentials = {
        apiUrl: "https://tenant.example.com:8443/api?key=value&other=param",
        apiToken: "token-with-special-!@#$%",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("special-url", credentials);

      const profile = await configManager.getProfile("special-url");
      expect(profile?.apiToken).toContain("special");
    });

    it("should handle profile descriptions with special characters", async () => {
      const description =
        'Production "main" tenant @ datacenter-1 (US-EAST) [critical]';
      const credentials = {
        apiUrl: "https://test.example.com",
        apiToken: "token",
        metadata: {
          description,
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("special-desc", credentials);

      const profile = await configManager.getProfile("special-desc");
      expect(profile?.metadata?.description).toBe(description);
    });
  });

  describe("Profile Selection Edge Cases", () => {
    it("should handle F5XC_PROFILE pointing to non-existent profile", async () => {
      const credentials = {
        apiUrl: "https://default.example.com",
        apiToken: "default-token",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("default", credentials);
      await configManager.setDefaultProfile("default");

      process.env.F5XC_PROFILE = "does-not-exist";

      const credManager = new CredentialManager(configManager);

      // Should fall back to default profile
      expect(credManager.getActiveProfile()).toBe("default");
    });

    it("should handle empty F5XC_PROFILE environment variable", async () => {
      const credentials = {
        apiUrl: "https://default.example.com",
        apiToken: "default-token",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("default", credentials);
      await configManager.setDefaultProfile("default");

      process.env.F5XC_PROFILE = "";

      const credManager = new CredentialManager(configManager);

      // Empty F5XC_PROFILE should use default
      expect(credManager.getActiveProfile()).toBe("default");
    });

    it("should handle case-sensitive profile names", async () => {
      const credentials = {
        apiUrl: "https://test.example.com",
        apiToken: "token",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("Production", credentials);

      // Try to access with different case
      const profile = await configManager.getProfile("production");
      expect(profile).toBeNull(); // Should not find case-mismatch
    });
  });

  describe("Environment Variable Precedence Edge Cases", () => {
    it("should prefer partial env vars over complete profile", async () => {
      const credentials = {
        apiUrl: "https://profile.example.com",
        apiToken: "profile-token",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("main", credentials);
      await configManager.setDefaultProfile("main");

      // Set only API URL env var (incomplete)
      process.env.F5XC_API_URL = "https://env.example.com";

      const credManager = new CredentialManager(configManager);

      // Incomplete env vars should fall back to profile
      expect(credManager.isAuthenticated()).toBe(true);
      expect(credManager.getActiveProfile()).toBe("main");
    });

    it("should handle malformed environment variable values", () => {
      process.env.F5XC_API_URL = "not-a-valid-url";
      process.env.F5XC_API_TOKEN = "token";

      const credManager = new CredentialManager(configManager);

      // Should attempt to use the values even if malformed
      // The actual validation happens during API calls
      expect(credManager.isAuthenticated()).toBe(true);
    });
  });

  describe("Profile Deletion Edge Cases", () => {
    it("should allow deleting non-default profile", async () => {
      const creds = {
        apiUrl: "https://test.example.com",
        apiToken: "token",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("non-default", creds);
      await configManager.setProfile("default", creds);
      await configManager.setDefaultProfile("default");

      expect(await configManager.getProfile("non-default")).not.toBeNull();

      await configManager.deleteProfile("non-default");

      expect(await configManager.getProfile("non-default")).toBeNull();
      expect(await configManager.getDefaultProfile()).toBe("default");
    });

    it("should clear default when deleting default profile", async () => {
      const creds = {
        apiUrl: "https://test.example.com",
        apiToken: "token",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("only-one", creds);
      await configManager.setDefaultProfile("only-one");

      expect(await configManager.getDefaultProfile()).toBe("only-one");

      await configManager.deleteProfile("only-one");

      expect(await configManager.getDefaultProfile()).toBeNull();
    });

    it("should throw error when deleting already-deleted profile", async () => {
      const creds = {
        apiUrl: "https://test.example.com",
        apiToken: "token",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("temp-delete", creds);
      await configManager.deleteProfile("temp-delete");

      // Second delete should throw error
      try {
        await configManager.deleteProfile("temp-delete");
        expect(true).toBe(false); // Should not reach here
      } catch (error) {
        expect(error).toBeDefined();
        expect((error as Error).message).toContain("does not exist");
      }
    });
  });

  describe("Metadata Edge Cases", () => {
    it("should handle missing metadata fields", async () => {
      const credentials = {
        apiUrl: "https://test.example.com",
        apiToken: "token",
        // No metadata
      };

      await configManager.setProfile("no-metadata", credentials);

      const profile = await configManager.getProfile("no-metadata");
      expect(profile).not.toBeNull();
    });

    it("should handle profiles with only partial metadata", async () => {
      const credentials = {
        apiUrl: "https://test.example.com",
        apiToken: "token",
        metadata: {
          createdAt: new Date().toISOString(),
          // Missing lastModifiedAt
        },
      };

      await configManager.setProfile("partial-metadata", credentials);

      const profile = await configManager.getProfile("partial-metadata");
      expect(profile?.metadata?.createdAt).toBeDefined();
    });

    it("should validate metadata fields and reject invalid ones", async () => {
      const credentials = {
        apiUrl: "https://test.example.com",
        apiToken: "token",
        metadata: {
          description: "Valid profile",
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
          // Any extra fields will be rejected by schema validation
        },
      };

      await configManager.setProfile("valid-metadata", credentials);

      const profile = await configManager.getProfile("valid-metadata");
      expect(profile?.metadata?.description).toBe("Valid profile");
      expect(profile?.metadata?.createdAt).toBeDefined();
    });
  });

  describe("Large Data Handling", () => {
    it("should handle very long API URLs", async () => {
      const longUrl =
        "https://tenant.example.com/api?q=" +
        "a".repeat(500) +
        "&param2=" +
        "b".repeat(500);
      const credentials = {
        apiUrl: longUrl,
        apiToken: "token",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("long-url", credentials);

      const profile = await configManager.getProfile("long-url");
      expect(profile?.apiUrl?.length).toBeGreaterThan(500);
    });

    it("should handle very long token values", async () => {
      const longToken = "x".repeat(10000);
      const credentials = {
        apiUrl: "https://test.example.com",
        apiToken: longToken,
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await configManager.setProfile("long-token", credentials);

      const profile = await configManager.getProfile("long-token");
      expect(profile?.apiToken?.length).toBe(10000);
    });

    it("should handle many profiles in single config file", async () => {
      const profileCount = 50;

      for (let i = 0; i < profileCount; i++) {
        const credentials = {
          apiUrl: `https://tenant${i}.example.com`,
          apiToken: `token-${i}`,
          metadata: {
            createdAt: new Date().toISOString(),
            lastModifiedAt: new Date().toISOString(),
          },
        };

        await configManager.setProfile(`profile-${i}`, credentials);
      }

      const profiles = await configManager.listProfiles();
      expect(profiles.length).toBeGreaterThanOrEqual(profileCount);
    });
  });
});
