/**
 * Environment Variables Validation Tests
 *
 * Validates that documented environment variables are recognized
 * by the system and documented consistently across CLI help and docs.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  runCliCommand,
  extractEnvVarsFromText,
  readProjectFile,
} from "../utils/documentation-helpers.js";

describe("Environment Variable Recognition", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    // Clear F5XC env vars
    Object.keys(process.env)
      .filter((k) => k.startsWith("F5XC_"))
      .forEach((k) => delete process.env[k]);
  });

  afterEach(() => {
    // Restore original env
    process.env = { ...originalEnv };
  });

  describe("documented environment variables", () => {
    const coreEnvVars = [
      { name: "F5XC_API_URL", description: "Tenant URL" },
      { name: "F5XC_API_TOKEN", description: "API token" },
      { name: "F5XC_P12_BUNDLE", description: "P12 certificate" },
      { name: "F5XC_NAMESPACE", description: "Default namespace" },
    ];

    coreEnvVars.forEach(({ name, description }) => {
      it(`should document ${name} in CLI help`, async () => {
        const result = await runCliCommand(["--help"]);

        expect(result.stdout).toContain(name);
      });
    });
  });

  describe("CLI help documentation", () => {
    it("should document all auth-related environment variables", async () => {
      const helpOutput = await runCliCommand(["--help"]);

      const authEnvVars = ["F5XC_API_URL", "F5XC_API_TOKEN", "F5XC_P12_BUNDLE"];
      authEnvVars.forEach((envVar) => {
        expect(helpOutput.stdout).toContain(envVar);
      });
    });

    it("should have Environment Variables section", async () => {
      const helpOutput = await runCliCommand(["--help"]);

      expect(helpOutput.stdout).toContain("Environment Variables");
    });

    it("should describe tenant URL format", async () => {
      const helpOutput = await runCliCommand(["--help"]);

      // Should show example URL format
      expect(helpOutput.stdout).toMatch(/https?:\/\/.*\.console\.ves\.volterra\.io/);
    });
  });

  describe("README.md consistency", () => {
    it("should document core environment variables in README", () => {
      const readme = readProjectFile("README.md");
      const envVars = extractEnvVarsFromText(readme);

      expect(envVars).toContain("F5XC_API_URL");
      expect(envVars).toContain("F5XC_API_TOKEN");
    });

    it("should explain environment variable usage in README", () => {
      const readme = readProjectFile("README.md");

      // Should have section about configuration or environment variables
      expect(readme.toLowerCase()).toMatch(/environment|configuration|setup/);
    });
  });

  describe("documentation consistency", () => {
    it("should document same env vars in help and README", async () => {
      const helpResult = await runCliCommand(["--help"]);
      const readme = readProjectFile("README.md");

      const helpEnvVars = extractEnvVarsFromText(helpResult.stdout);
      const readmeEnvVars = extractEnvVarsFromText(readme);

      // Core env vars from help should be in README
      const requiredEnvVars = ["F5XC_API_URL", "F5XC_API_TOKEN"];

      for (const envVar of requiredEnvVars) {
        if (helpEnvVars.includes(envVar)) {
          expect(readmeEnvVars).toContain(envVar);
        }
      }
    });
  });

  describe("manifest.json env configuration", () => {
    it("should define user_config for env vars", () => {
      const manifest = JSON.parse(readProjectFile("manifest.json")) as {
        user_config: Record<string, { type: string }>;
      };

      expect(manifest.user_config).toBeDefined();
      expect(manifest.user_config.f5xc_api_url).toBeDefined();
      expect(manifest.user_config.f5xc_api_token).toBeDefined();
    });

    it("should mark sensitive fields appropriately", () => {
      const manifest = JSON.parse(readProjectFile("manifest.json")) as {
        user_config: Record<string, { sensitive?: boolean }>;
      };

      // API token should be marked sensitive
      expect(manifest.user_config.f5xc_api_token?.sensitive).toBe(true);
    });

    it("should have correct types for user_config fields", () => {
      const manifest = JSON.parse(readProjectFile("manifest.json")) as {
        user_config: Record<string, { type: string }>;
      };

      expect(manifest.user_config.f5xc_api_url?.type).toBe("string");
      expect(manifest.user_config.f5xc_api_token?.type).toBe("string");
      expect(manifest.user_config.log_level?.type).toBe("string");
    });
  });

  describe("path documentation", () => {
    it("should document profile path consistently", async () => {
      const helpResult = await runCliCommand(["--help"]);

      // Should mention the XDG-compliant path
      expect(helpResult.stdout).toContain("~/.config/f5xc/");
    });

    it("should document profiles directory", async () => {
      const helpResult = await runCliCommand(["--help"]);

      expect(helpResult.stdout).toContain("profiles/");
    });
  });
});
