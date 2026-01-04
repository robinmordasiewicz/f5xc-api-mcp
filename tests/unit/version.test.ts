/**
 * Version Consistency Tests
 *
 * Ensures all version sources (package.json, manifest.json, runtime VERSION constant)
 * are kept in sync. The VERSION constant is generated from package.json at build time.
 */

import { describe, it, expect, beforeAll } from "vitest";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "../..");

describe("Version Consistency", () => {
  let pkgVersion: string;
  let manifestVersion: string;
  let runtimeVersion: string;

  beforeAll(async () => {
    // Read package.json version
    const pkg = JSON.parse(readFileSync(join(rootDir, "package.json"), "utf-8"));
    pkgVersion = pkg.version;

    // Read manifest.json version
    const manifest = JSON.parse(readFileSync(join(rootDir, "manifest.json"), "utf-8"));
    manifestVersion = manifest.version;

    // Import the runtime VERSION constant
    // This tests the generated src/version.ts file
    const { VERSION } = await import("../../src/version.js");
    runtimeVersion = VERSION;
  });

  it("should have VERSION constant matching package.json", () => {
    expect(runtimeVersion).toBe(pkgVersion);
  });

  it("should have manifest.json version matching package.json", () => {
    expect(manifestVersion).toBe(pkgVersion);
  });

  it("should have valid semver-like version format", () => {
    // Our version format: {upstream}-{YYMMDDHHMM} or just semver
    // Examples: "1.0.91-2601040355", "1.0.0"
    const semverPattern = /^\d+\.\d+\.\d+(-[\w]+)?$/;
    expect(pkgVersion).toMatch(semverPattern);
  });

  it("should not have placeholder version in runtime", () => {
    // Ensure we're not using the default dev placeholder
    expect(runtimeVersion).not.toBe("0.0.0-dev");
  });

  it("should have package name in version.ts", async () => {
    const { PACKAGE_NAME } = await import("../../src/version.js");
    expect(PACKAGE_NAME).toBe("@robinmordasiewicz/f5xc-api-mcp");
  });
});

describe("Version File Generation", () => {
  it("should have version.ts file that can be imported", async () => {
    const versionModule = await import("../../src/version.js");
    expect(versionModule.VERSION).toBeDefined();
    expect(versionModule.PACKAGE_NAME).toBeDefined();
    expect(versionModule.UPSTREAM_VERSION).toBeDefined();
  });

  it("should export VERSION as a string", async () => {
    const { VERSION } = await import("../../src/version.js");
    expect(typeof VERSION).toBe("string");
    expect(VERSION.length).toBeGreaterThan(0);
  });
});
