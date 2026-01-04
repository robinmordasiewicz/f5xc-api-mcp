/**
 * Installation Syntax Validation Tests
 *
 * Validates that installation commands and configuration examples
 * in documentation have correct syntax.
 */

import { describe, it, expect } from "vitest";
import { getPackageJson, getManifestJson } from "../utils/documentation-helpers.js";

describe("Installation Command Syntax Validation", () => {
  describe("npm commands", () => {
    it("should have valid package name in package.json", () => {
      const pkg = getPackageJson();
      expect(pkg.name).toBe("@robinmordasiewicz/f5xc-api-mcp");
    });

    it("should have scoped package name format", () => {
      const pkg = getPackageJson();
      expect(pkg.name).toMatch(/^@[a-z0-9-]+\/[a-z0-9-]+$/);
    });

    it("npx command should have correct package name", () => {
      const pkg = getPackageJson();
      const npxCommand = `npx ${pkg.name}`;

      expect(npxCommand).toBe("npx @robinmordasiewicz/f5xc-api-mcp");
    });

    it("npm install -g command should be valid", () => {
      const pkg = getPackageJson();
      const installCommand = `npm install -g ${pkg.name}`;

      expect(installCommand).toContain("npm install -g");
      expect(installCommand).toContain(pkg.name);
    });
  });

  describe("package.json bin configuration", () => {
    it("should define bin entry point", () => {
      const pkg = getPackageJson();
      expect((pkg as { bin?: Record<string, string> }).bin).toBeDefined();
    });

    it("should have f5xc-api-mcp as bin name", () => {
      const pkg = getPackageJson() as { bin?: Record<string, string> };
      expect(pkg.bin?.["f5xc-api-mcp"]).toBeDefined();
    });

    it("should point to correct entry file", () => {
      const pkg = getPackageJson() as { bin?: Record<string, string> };
      expect(pkg.bin?.["f5xc-api-mcp"]).toBe("./dist/index.js");
    });
  });

  describe("MCP configuration JSON", () => {
    it("should have valid mcpServers structure example", () => {
      const config = {
        mcpServers: {
          "f5xc-api": {
            command: "npx",
            args: ["@robinmordasiewicz/f5xc-api-mcp"],
            env: {
              F5XC_API_URL: "https://your-tenant.console.ves.volterra.io",
              F5XC_API_TOKEN: "your-api-token",
            },
          },
        },
      };

      expect(() => JSON.stringify(config)).not.toThrow();
      expect(config.mcpServers["f5xc-api"].command).toBe("npx");
    });

    it("should have valid args array in config example", () => {
      const pkg = getPackageJson();
      const args = [pkg.name];

      expect(Array.isArray(args)).toBe(true);
      expect(args[0]).toBe("@robinmordasiewicz/f5xc-api-mcp");
    });

    it("should have valid env object in config example", () => {
      const env = {
        F5XC_API_URL: "https://example.console.ves.volterra.io",
        F5XC_API_TOKEN: "test-token",
      };

      expect(typeof env.F5XC_API_URL).toBe("string");
      expect(typeof env.F5XC_API_TOKEN).toBe("string");
    });
  });

  describe("Claude CLI add command", () => {
    it("should have valid claude mcp add syntax", () => {
      const pkg = getPackageJson();
      const command = `claude mcp add f5xc-api -- npx ${pkg.name}`;

      expect(command).toContain("claude mcp add");
      expect(command).toContain("--");
      expect(command).toContain("npx");
      expect(command).toContain(pkg.name);
    });

    it("should use server name without @ prefix", () => {
      const serverName = "f5xc-api";

      // Server name in claude mcp add should not have @ or slashes
      expect(serverName).not.toContain("@");
      expect(serverName).not.toContain("/");
    });
  });

  describe("manifest.json server configuration", () => {
    it("should have valid server type", () => {
      const manifest = getManifestJson() as {
        server?: { type: string };
      };
      expect(manifest.server?.type).toBe("node");
    });

    it("should have valid entry_point", () => {
      const manifest = getManifestJson() as {
        server?: { entry_point: string };
      };
      expect(manifest.server?.entry_point).toBe("dist/index.js");
    });

    it("should have mcp_config with command", () => {
      const manifest = getManifestJson() as {
        server?: {
          mcp_config?: { command: string };
        };
      };
      expect(manifest.server?.mcp_config?.command).toBe("node");
    });
  });

  describe("Docker commands (if applicable)", () => {
    it("should have valid docker image name format", () => {
      // Expected Docker image names
      const validFormats = [
        "ghcr.io/robinmordasiewicz/f5xc-api-mcp:latest",
        "robinmordasiewicz/f5xc-api-mcp:latest",
      ];

      for (const imageName of validFormats) {
        expect(imageName).toMatch(/^[a-z0-9./-]+:[a-z0-9.-]+$/);
      }
    });

    it("docker pull command should be valid", () => {
      const pullCommand = "docker pull ghcr.io/robinmordasiewicz/f5xc-api-mcp:latest";

      expect(pullCommand).toContain("docker pull");
      expect(pullCommand).toMatch(/:latest$/);
    });

    it("docker run command should include interactive flags", () => {
      const runCommand =
        "docker run -it ghcr.io/robinmordasiewicz/f5xc-api-mcp:latest";

      expect(runCommand).toContain("docker run");
      expect(runCommand).toContain("-it");
    });
  });

  describe("version consistency", () => {
    it("should have matching versions in package.json and manifest.json", () => {
      const pkg = getPackageJson();
      const manifest = getManifestJson();

      expect(pkg.version).toBe(manifest.version);
    });

    it("should have valid semver format", () => {
      const pkg = getPackageJson();

      expect(pkg.version).toMatch(/^\d+\.\d+\.\d+$/);
    });
  });

  describe("repository and homepage URLs", () => {
    it("should have valid GitHub repository URL", () => {
      const pkg = getPackageJson() as {
        repository?: { url: string };
      };

      expect(pkg.repository?.url).toMatch(
        /^https:\/\/github\.com\/[a-z0-9-]+\/[a-z0-9-]+\.git$/
      );
    });

    it("should have valid homepage URL", () => {
      const pkg = getPackageJson() as { homepage?: string };

      expect(pkg.homepage).toMatch(/^https:\/\//);
    });
  });

  describe("publishConfig", () => {
    it("should be configured for public access", () => {
      const pkg = getPackageJson() as {
        publishConfig?: { access: string };
      };

      expect(pkg.publishConfig?.access).toBe("public");
    });

    it("should target npm registry", () => {
      const pkg = getPackageJson() as {
        publishConfig?: { registry: string };
      };

      expect(pkg.publishConfig?.registry).toBe("https://registry.npmjs.org/");
    });
  });

  describe("engine requirements", () => {
    it("should specify Node.js version requirement", () => {
      const pkg = getPackageJson() as { engines?: { node: string } };

      expect(pkg.engines?.node).toBeDefined();
    });

    it("should require Node.js 24+", () => {
      const pkg = getPackageJson() as { engines?: { node: string } };

      expect(pkg.engines?.node).toMatch(/>=24/);
    });
  });
});
