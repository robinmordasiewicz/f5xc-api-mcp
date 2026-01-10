// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * CLI Help Text Validation Tests
 *
 * Validates that CLI --help and --version output matches
 * documented behavior and is consistent with package.json.
 */

import { describe, it, expect, beforeAll } from "vitest";
import {
  runCliCommand,
  getPackageJson,
  extractEnvVarsFromText,
  readProjectFile,
} from "../utils/documentation-helpers.js";

describe("CLI Help Text Validation", () => {
  let packageJson: ReturnType<typeof getPackageJson>;

  beforeAll(() => {
    packageJson = getPackageJson();
  });

  describe("--version flag", () => {
    it("should output version matching package.json", async () => {
      const result = await runCliCommand(["--version"]);

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain(packageJson.version);
    });

    it("should support -v shorthand", async () => {
      const result = await runCliCommand(["-v"]);

      expect(result.exitCode).toBe(0);
      expect(result.stdout).toContain(packageJson.version);
    });

    it("should have version in expected format", async () => {
      const result = await runCliCommand(["--version"]);

      // Should match format: f5xc-api-mcp vX.X.X
      expect(result.stdout).toMatch(/f5xc-api-mcp v\d+\.\d+\.\d+/);
    });
  });

  describe("--help flag", () => {
    it("should exit with code 0", async () => {
      const result = await runCliCommand(["--help"]);

      expect(result.exitCode).toBe(0);
    });

    it("should support -h shorthand", async () => {
      const result = await runCliCommand(["-h"]);

      expect(result.exitCode).toBe(0);
      expect(result.stdout.length).toBeGreaterThan(100);
    });

    it("should include usage information", async () => {
      const result = await runCliCommand(["--help"]);

      expect(result.stdout).toContain("Usage:");
      expect(result.stdout).toContain("f5xc-api-mcp");
    });

    it("should list available options", async () => {
      const result = await runCliCommand(["--help"]);

      expect(result.stdout).toContain("-v, --version");
      expect(result.stdout).toContain("-h, --help");
    });

    it("should describe documentation mode", async () => {
      const result = await runCliCommand(["--help"]);

      expect(result.stdout.toLowerCase()).toContain("documentation mode");
    });

    it("should include version number", async () => {
      const result = await runCliCommand(["--help"]);

      expect(result.stdout).toContain(packageJson.version);
    });
  });

  describe("environment variables documentation", () => {
    const expectedEnvVars = [
      "F5XC_API_URL",
      "F5XC_API_TOKEN",
      "F5XC_P12_BUNDLE",
      "F5XC_NAMESPACE",
    ];

    it("should document all core authentication environment variables", async () => {
      const result = await runCliCommand(["--help"]);

      for (const envVar of expectedEnvVars) {
        expect(result.stdout).toContain(envVar);
      }
    });

    it("should explain F5XC_API_URL purpose", async () => {
      const result = await runCliCommand(["--help"]);

      expect(result.stdout).toContain("F5XC_API_URL");
      // Should explain it's for tenant URL
      expect(result.stdout.toLowerCase()).toContain("tenant");
    });

    it("should explain F5XC_API_TOKEN purpose", async () => {
      const result = await runCliCommand(["--help"]);

      expect(result.stdout).toContain("F5XC_API_TOKEN");
      // Should explain it's for authentication
      expect(result.stdout.toLowerCase()).toContain("token");
    });

    it("should document P12 certificate option", async () => {
      const result = await runCliCommand(["--help"]);

      expect(result.stdout).toContain("F5XC_P12_BUNDLE");
      // Should mention certificate
      expect(result.stdout.toLowerCase()).toContain("certificate");
    });
  });

  describe("profile configuration documentation", () => {
    it("should describe profile storage location", async () => {
      const result = await runCliCommand(["--help"]);

      // Should mention ~/.config/f5xc/profiles/
      expect(result.stdout).toMatch(/~\/\.config\/f5xc\/profiles\//);
    });

    it("should describe active profile tracking", async () => {
      const result = await runCliCommand(["--help"]);

      // Should mention active_profile
      expect(result.stdout).toContain("active_profile");
    });
  });

  describe("help text consistency with README", () => {
    it("should document same environment variables as README", async () => {
      const helpResult = await runCliCommand(["--help"]);
      const readme = readProjectFile("README.md");

      const helpEnvVars = extractEnvVarsFromText(helpResult.stdout);
      const readmeEnvVars = extractEnvVarsFromText(readme);

      // Core env vars in help should also be in README
      const coreEnvVars = ["F5XC_API_URL", "F5XC_API_TOKEN", "F5XC_P12_BUNDLE"];

      for (const envVar of coreEnvVars) {
        if (helpEnvVars.includes(envVar)) {
          expect(readmeEnvVars).toContain(envVar);
        }
      }
    });
  });

  describe("help output format", () => {
    it("should have clear section headers", async () => {
      const result = await runCliCommand(["--help"]);

      // Should have organized sections
      expect(result.stdout).toContain("Options:");
      expect(result.stdout).toContain("Environment Variables");
    });

    it("should not have excessive whitespace", async () => {
      const result = await runCliCommand(["--help"]);

      // Should not have more than 2 consecutive empty lines
      expect(result.stdout).not.toMatch(/\n\n\n\n/);
    });

    it("should have consistent indentation", async () => {
      const result = await runCliCommand(["--help"]);
      const lines = result.stdout.split("\n");

      // Option lines should start with spaces (indented)
      const optionLines = lines.filter(
        (l) => l.includes("-v,") || l.includes("-h,")
      );
      for (const line of optionLines) {
        expect(line).toMatch(/^\s+-/);
      }
    });
  });
});
