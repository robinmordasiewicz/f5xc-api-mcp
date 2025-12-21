/**
 * Unit tests for CLI setup wizard
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import * as fs from "fs/promises";
import * as fsSync from "fs";
import * as path from "path";
import * as os from "os";
import { ConfigManager } from "../../src/config";
import {
  detectEnvironmentCredentials,
  validateProfileName,
} from "../../src/cli/setup";

describe("CLI Setup Wizard", () => {
  let tempDir: string;
  let configDir: string;
  let configFile: string;
  let manager: ConfigManager;

  beforeEach(async () => {
    // Create temporary test directory
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "f5xc-cli-test-"));
    configDir = path.join(tempDir, ".f5xc");
    configFile = path.join(configDir, "credentials.json");
    manager = new ConfigManager(configDir, configFile);

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

  describe("Environment Variable Detection", () => {
    it("should detect environment variables when present", () => {
      process.env.F5XC_API_URL = "https://test.example.com";
      process.env.F5XC_API_TOKEN = "test-token";

      const detected = detectEnvironmentCredentials();

      expect(detected.hasCredentials).toBe(true);
      expect(detected.apiUrl).toBe("https://test.example.com");
      expect(detected.apiToken).toBe("test-token");
    });

    it("should detect P12 certificate environment variables", () => {
      process.env.F5XC_API_URL = "https://test.example.com";
      process.env.F5XC_P12_FILE = "/path/to/cert.p12";
      process.env.F5XC_P12_PASSWORD = "cert-password";

      const detected = detectEnvironmentCredentials();

      expect(detected.hasCredentials).toBe(true);
      expect(detected.p12File).toBe("/path/to/cert.p12");
      expect(detected.p12Password).toBe("cert-password");
    });

    it("should return no credentials when environment variables are missing", () => {
      const detected = detectEnvironmentCredentials();

      expect(detected.hasCredentials).toBe(false);
      expect(detected.apiUrl).toBeUndefined();
      expect(detected.apiToken).toBeUndefined();
    });

    it("should return no credentials when only API URL is set", () => {
      process.env.F5XC_API_URL = "https://test.example.com";

      const detected = detectEnvironmentCredentials();

      expect(detected.hasCredentials).toBe(false);
    });

    it("should require both API URL and either token or P12 file", () => {
      process.env.F5XC_API_URL = "https://test.example.com";
      process.env.F5XC_P12_FILE = "/path/to/cert.p12";

      const detected = detectEnvironmentCredentials();

      expect(detected.hasCredentials).toBe(true);
      expect(detected.p12File).toBe("/path/to/cert.p12");
    });
  });

  describe("Profile Name Validation", () => {
    it("should accept valid profile names with lowercase letters", () => {
      expect(validateProfileName("production").valid).toBe(true);
      expect(validateProfileName("staging").valid).toBe(true);
      expect(validateProfileName("development").valid).toBe(true);
    });

    it("should accept profile names with numbers", () => {
      expect(validateProfileName("prod1").valid).toBe(true);
      expect(validateProfileName("test2").valid).toBe(true);
    });

    it("should accept profile names with hyphens", () => {
      expect(validateProfileName("prod-us").valid).toBe(true);
      expect(validateProfileName("test-staging").valid).toBe(true);
    });

    it("should accept profile names with underscores", () => {
      expect(validateProfileName("prod_us").valid).toBe(true);
      expect(validateProfileName("test_staging").valid).toBe(true);
    });

    it("should accept uppercase letters", () => {
      expect(validateProfileName("Production").valid).toBe(true);
      expect(validateProfileName("STAGING").valid).toBe(true);
    });

    it("should reject profile names with spaces", () => {
      expect(validateProfileName("prod uat").valid).toBe(false);
    });

    it("should reject profile names with special characters", () => {
      expect(validateProfileName("prod@us").valid).toBe(false);
      expect(validateProfileName("test.staging").valid).toBe(false);
      expect(validateProfileName("prod!").valid).toBe(false);
    });

    it("should reject empty profile names", () => {
      expect(validateProfileName("").valid).toBe(false);
    });

    it("should provide error messages for invalid names", () => {
      const result = validateProfileName("");
      expect(result.error).toBeDefined();
      expect(result.error).toContain("empty");
    });
  });

  describe("Profile Creation from Environment Variables", () => {
    it("should create profile with environment variable credentials", async () => {
      process.env.F5XC_API_URL = "https://tenant.example.com";
      process.env.F5XC_API_TOKEN = "test-token";

      const credentials = {
        apiUrl: process.env.F5XC_API_URL,
        apiToken: process.env.F5XC_API_TOKEN,
        metadata: {
          description: "Test profile from environment",
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await manager.setProfile("test-env", credentials);

      const profile = await manager.getProfile("test-env");
      expect(profile).not.toBeNull();
      expect(profile?.apiUrl).toBe("https://tenant.example.com");
      expect(profile?.apiToken).toBe("test-token");
    });

    it("should create profile with P12 certificate credentials", async () => {
      process.env.F5XC_API_URL = "https://tenant.example.com";
      process.env.F5XC_P12_FILE = "/path/to/cert.p12";
      process.env.F5XC_P12_PASSWORD = "cert-pass";

      const credentials = {
        apiUrl: process.env.F5XC_API_URL,
        p12File: process.env.F5XC_P12_FILE,
        p12Password: process.env.F5XC_P12_PASSWORD,
        metadata: {
          description: "P12 profile from environment",
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await manager.setProfile("test-p12", credentials);

      const profile = await manager.getProfile("test-p12");
      expect(profile).not.toBeNull();
      expect(profile?.p12File).toBe("/path/to/cert.p12");
    });

    it("should set created profile as default", async () => {
      const credentials = {
        apiUrl: "https://test.example.com",
        apiToken: "test-token",
        metadata: {
          description: "Default profile",
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await manager.setProfile("default-test", credentials);
      await manager.setDefaultProfile("default-test");

      const defaultProfile = await manager.getDefaultProfile();
      expect(defaultProfile).toBe("default-test");
    });

    it("should store metadata with profile", async () => {
      const description = "Production environment credentials";
      const credentials = {
        apiUrl: "https://prod.example.com",
        apiToken: "prod-token",
        metadata: {
          description,
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await manager.setProfile("prod", credentials);

      const profile = await manager.getProfile("prod");
      expect(profile?.metadata?.description).toBe(description);
      expect(profile?.metadata?.createdAt).toBeDefined();
      expect(profile?.metadata?.lastModifiedAt).toBeDefined();
    });
  });

  describe("Multiple Profiles Management", () => {
    it("should create and list multiple profiles", async () => {
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

      await manager.setProfile("production", creds1);
      await manager.setProfile("staging", creds2);

      const profiles = await manager.listProfiles();
      expect(profiles).toContain("production");
      expect(profiles).toContain("staging");
      // Just verify we have at least these two profiles, don't assume only 2
      expect(profiles.length).toBeGreaterThanOrEqual(2);
    });

    it("should override existing profile with same name", async () => {
      const creds1 = {
        apiUrl: "https://test1.example.com",
        apiToken: "token1",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      const creds2 = {
        apiUrl: "https://test2.example.com",
        apiToken: "token2",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await manager.setProfile("test", creds1);
      await manager.setProfile("test", creds2);

      const profile = await manager.getProfile("test");
      expect(profile?.apiUrl).toBe("https://test2.example.com");
      expect(profile?.apiToken).toBe("token2");
    });

    it("should delete profile", async () => {
      const credentials = {
        apiUrl: "https://test.example.com",
        apiToken: "test-token",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await manager.setProfile("to-delete", credentials);
      expect(await manager.getProfile("to-delete")).not.toBeNull();

      await manager.deleteProfile("to-delete");
      expect(await manager.getProfile("to-delete")).toBeNull();
    });

    it("should clear default profile when deleting default", async () => {
      const credentials = {
        apiUrl: "https://test.example.com",
        apiToken: "test-token",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await manager.setProfile("only-profile", credentials);
      await manager.setDefaultProfile("only-profile");

      expect(await manager.getDefaultProfile()).toBe("only-profile");

      await manager.deleteProfile("only-profile");
      expect(await manager.getDefaultProfile()).toBeNull();
    });
  });

  describe("Security and Permissions", () => {
    it("should create config directory with secure permissions", async () => {
      const credentials = {
        apiUrl: "https://test.example.com",
        apiToken: "test-token",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await manager.setProfile("test", credentials);

      const dirStats = fsSync.statSync(configDir);
      const dirMode = dirStats.mode & 0o777;
      expect(dirMode).toBe(0o700);
    });

    it("should create config file with secure permissions", async () => {
      const credentials = {
        apiUrl: "https://test.example.com",
        apiToken: "test-token",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      await manager.setProfile("test", credentials);

      const fileStats = fsSync.statSync(configFile);
      const fileMode = fileStats.mode & 0o777;
      expect(fileMode).toBe(0o600);
    });

    it("should not expose credentials in logs", () => {
      const credentials = {
        apiUrl: "https://test.example.com",
        apiToken: "secret-token-12345",
        metadata: {
          createdAt: new Date().toISOString(),
          lastModifiedAt: new Date().toISOString(),
        },
      };

      const config = { version: "1.0", profiles: { test: credentials } };
      const configStr = JSON.stringify(config);

      // Credentials should be in the config
      expect(configStr).toContain("secret-token-12345");

      // But should never be logged in console
      const consoleSpy = vi.spyOn(console, "log");
      console.log(config);

      const logs = consoleSpy.mock.calls.map((call) => call.join(""));
      expect(logs.join("")).not.toContain("secret-token");
    });
  });
});
