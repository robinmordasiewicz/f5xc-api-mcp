/**
 * Unit tests for ConfigManager
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "fs/promises";
import * as fsSync from "fs";
import * as path from "path";
import * as os from "os";
import { ConfigManager } from "../../src/config";
import { ProfileCredentials, CONFIG_FILE_PERMISSIONS, CONFIG_DIR_PERMISSIONS } from "../../src/config/types";

describe("ConfigManager", () => {
  let tempDir: string;
  let configDir: string;
  let configFile: string;
  let manager: ConfigManager;

  beforeEach(async () => {
    // Create temporary test directory
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "f5xc-config-test-"));
    configDir = path.join(tempDir, ".f5xc");
    configFile = path.join(configDir, "credentials.json");
    manager = new ConfigManager(configDir, configFile);
  });

  afterEach(async () => {
    // Clean up temporary directory
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
    } catch {
      // Ignore cleanup errors
    }
  });

  describe("File Operations", () => {
    it("should return false for exists() when config file does not exist", async () => {
      expect(await manager.exists()).toBe(false);
    });

    it("should return true for exists() when config file exists", async () => {
      await manager.write({ version: "1.0", profiles: {} });
      expect(await manager.exists()).toBe(true);
    });

    it("should return default config when reading non-existent file", async () => {
      const config = await manager.read();
      expect(config.version).toBe("1.0");
      expect(config.profiles).toEqual({});
    });

    it("should read written configuration", async () => {
      const original = {
        version: "1.0",
        profiles: {
          test: {
            apiUrl: "https://test.example.com",
            apiToken: "test-token",
          },
        },
      };

      await manager.write(original);
      const read = await manager.read();

      expect(read.version).toBe("1.0");
      expect(read.profiles.test?.apiUrl).toBe("https://test.example.com");
      expect(read.profiles.test?.apiToken).toBe("test-token");
    });

    it("should create config directory with proper permissions", async () => {
      await manager.write({ version: "1.0", profiles: {} });

      const stats = fsSync.statSync(configDir);
      const mode = stats.mode & 0o777;
      expect(mode).toBe(CONFIG_DIR_PERMISSIONS);
    });

    it("should create config file with proper permissions", async () => {
      await manager.write({ version: "1.0", profiles: {} });

      const stats = fsSync.statSync(configFile);
      const mode = stats.mode & 0o777;
      expect(mode).toBe(CONFIG_FILE_PERMISSIONS);
    });
  });

  describe("Profile CRUD Operations", () => {
    it("should list profiles", async () => {
      const credentials: ProfileCredentials = {
        apiUrl: "https://test.example.com",
        apiToken: "test-token",
      };

      await manager.setProfile("test-profile", credentials);
      const profiles = await manager.listProfiles();

      expect(profiles).toContain("test-profile");
    });

    it("should get a profile", async () => {
      const credentials: ProfileCredentials = {
        apiUrl: "https://test.example.com",
        apiToken: "test-token",
      };

      await manager.setProfile("test-profile", credentials);
      const profile = await manager.getProfile("test-profile");

      expect(profile?.apiUrl).toBe("https://test.example.com");
      expect(profile?.apiToken).toBe("test-token");
    });

    it("should return null for non-existent profile", async () => {
      const profile = await manager.getProfile("non-existent");
      expect(profile).toBeNull();
    });

    it("should create a new profile with metadata", async () => {
      const credentials: ProfileCredentials = {
        apiUrl: "https://test.example.com",
        apiToken: "test-token",
      };

      await manager.setProfile("test-profile", credentials);
      const profile = await manager.getProfile("test-profile");

      expect(profile?.metadata?.createdAt).toBeDefined();
      expect(profile?.metadata?.lastModifiedAt).toBeDefined();
    });

    it("should update an existing profile", async () => {
      const credentials1: ProfileCredentials = {
        apiUrl: "https://test1.example.com",
        apiToken: "token1",
      };

      const credentials2: ProfileCredentials = {
        apiUrl: "https://test2.example.com",
        apiToken: "token2",
      };

      await manager.setProfile("test-profile", credentials1);
      await manager.setProfile("test-profile", credentials2);

      const profile = await manager.getProfile("test-profile");
      expect(profile?.apiUrl).toBe("https://test2.example.com");
      expect(profile?.apiToken).toBe("token2");
    });

    it("should delete a profile", async () => {
      const credentials: ProfileCredentials = {
        apiUrl: "https://test.example.com",
        apiToken: "test-token",
      };

      await manager.setProfile("test-profile", credentials);
      await manager.deleteProfile("test-profile");

      const profiles = await manager.listProfiles();
      expect(profiles).not.toContain("test-profile");
    });

    it("should throw error when deleting non-existent profile", async () => {
      await expect(manager.deleteProfile("non-existent")).rejects.toThrow();
    });

    it("should validate profile name format", async () => {
      const credentials: ProfileCredentials = {
        apiUrl: "https://test.example.com",
        apiToken: "test-token",
      };

      await expect(manager.setProfile("invalid profile!", credentials)).rejects.toThrow();
      await expect(manager.setProfile("invalid.profile", credentials)).rejects.toThrow();
    });

    it("should accept valid profile names", async () => {
      const credentials: ProfileCredentials = {
        apiUrl: "https://test.example.com",
        apiToken: "test-token",
      };

      await manager.setProfile("valid-profile", credentials);
      await manager.setProfile("valid_profile", credentials);
      await manager.setProfile("ValidProfile", credentials);
      await manager.setProfile("profile123", credentials);

      const profiles = await manager.listProfiles();
      expect(profiles).toContain("valid-profile");
      expect(profiles).toContain("valid_profile");
      expect(profiles).toContain("ValidProfile");
      expect(profiles).toContain("profile123");
    });
  });

  describe("Default Profile Management", () => {
    it("should set and get default profile", async () => {
      const credentials: ProfileCredentials = {
        apiUrl: "https://test.example.com",
        apiToken: "test-token",
      };

      await manager.setProfile("test-profile", credentials);
      await manager.setDefaultProfile("test-profile");

      const defaultProfile = await manager.getDefaultProfile();
      expect(defaultProfile).toBe("test-profile");
    });

    it("should return null for default profile when not set", async () => {
      const defaultProfile = await manager.getDefaultProfile();
      expect(defaultProfile).toBeNull();
    });

    it("should throw error when setting non-existent profile as default", async () => {
      await expect(manager.setDefaultProfile("non-existent")).rejects.toThrow();
    });

    it("should clear default profile when profile is deleted", async () => {
      const credentials: ProfileCredentials = {
        apiUrl: "https://test.example.com",
        apiToken: "test-token",
      };

      await manager.setProfile("test-profile", credentials);
      await manager.setDefaultProfile("test-profile");
      await manager.deleteProfile("test-profile");

      const defaultProfile = await manager.getDefaultProfile();
      expect(defaultProfile).toBeNull();
    });
  });

  describe("Profile Touch (Last Used)", () => {
    it("should update lastUsedAt timestamp", async () => {
      const credentials: ProfileCredentials = {
        apiUrl: "https://test.example.com",
        apiToken: "test-token",
      };

      await manager.setProfile("test-profile", credentials);
      const before = await manager.getProfile("test-profile");

      await new Promise((resolve) => setTimeout(resolve, 100));
      await manager.touchProfile("test-profile");
      const after = await manager.getProfile("test-profile");

      expect(after?.metadata?.lastUsedAt).toBeDefined();
      expect(after?.metadata?.lastUsedAt).not.toBe(before?.metadata?.lastUsedAt);
    });

    it("should silently ignore touch on non-existent profile", async () => {
      await expect(manager.touchProfile("non-existent")).resolves.not.toThrow();
    });
  });

  describe("Synchronous Read", () => {
    it("should read config synchronously", async () => {
      const credentials: ProfileCredentials = {
        apiUrl: "https://test.example.com",
        apiToken: "test-token",
      };

      await manager.setProfile("sync-test-profile", credentials);
      const config = manager.readSync();

      expect(config.profiles["sync-test-profile"]).toBeDefined();
      expect(config.version).toBe("1.0");
    });

    it("should return config version correctly", async () => {
      const credentials: ProfileCredentials = {
        apiUrl: "https://test.example.com",
        apiToken: "test-token",
      };

      await manager.setProfile("version-test", credentials);
      const config = manager.readSync();

      expect(config.version).toBe("1.0");
    });
  });

  describe("Configuration Validation", () => {
    it("should reject invalid version", async () => {
      const invalid = {
        version: 123 as unknown,
        profiles: {},
      };

      await expect(manager.write(invalid as any)).rejects.toThrow();
    });

    it("should accept optional fields", async () => {
      const config = {
        version: "1.0",
        profiles: {
          test: {
            apiUrl: "https://test.example.com",
            // apiToken not provided
          },
        },
      };

      await manager.write(config as any);
      const read = await manager.read();
      expect(read.profiles.test?.apiUrl).toBe("https://test.example.com");
    });
  });

  describe("Multiple Profiles", () => {
    it("should manage multiple profiles independently", async () => {
      const creds1: ProfileCredentials = {
        apiUrl: "https://test1.example.com",
        apiToken: "token1",
      };

      const creds2: ProfileCredentials = {
        apiUrl: "https://test2.example.com",
        apiToken: "token2",
      };

      await manager.setProfile("production", creds1);
      await manager.setProfile("staging", creds2);

      const prod = await manager.getProfile("production");
      const staging = await manager.getProfile("staging");

      expect(prod?.apiUrl).toBe("https://test1.example.com");
      expect(staging?.apiUrl).toBe("https://test2.example.com");
    });

    it("should handle metadata separately for each profile", async () => {
      const creds1: ProfileCredentials = {
        apiUrl: "https://test1.example.com",
        apiToken: "token1",
        metadata: { description: "Production", createdAt: "2025-01-01T00:00:00Z", lastModifiedAt: "2025-01-01T00:00:00Z" },
      };

      const creds2: ProfileCredentials = {
        apiUrl: "https://test2.example.com",
        apiToken: "token2",
        metadata: { description: "Staging", createdAt: "2025-01-02T00:00:00Z", lastModifiedAt: "2025-01-02T00:00:00Z" },
      };

      await manager.setProfile("production", creds1);
      await manager.setProfile("staging", creds2);

      const prod = await manager.getProfile("production");
      const staging = await manager.getProfile("staging");

      expect(prod?.metadata?.description).toBe("Production");
      expect(staging?.metadata?.description).toBe("Staging");
    });
  });
});
