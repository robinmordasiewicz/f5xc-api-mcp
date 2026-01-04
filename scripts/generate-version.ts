#!/usr/bin/env tsx
/**
 * Version Generator Script
 *
 * Generates src/version.ts from package.json at build time.
 * This ensures the runtime VERSION constant always matches package.json.
 *
 * Run manually: npm run generate:version
 * Run automatically: happens before every build via prebuild hook
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");

/**
 * Generate src/version.ts with version info from package.json
 */
function generateVersion(): void {
  const packagePath = join(rootDir, "package.json");
  const pkg = JSON.parse(readFileSync(packagePath, "utf-8"));

  // Get upstream version from specs if available
  let upstreamVersion = "unknown";
  const specPath = join(rootDir, "specs", "index.json");
  if (existsSync(specPath)) {
    try {
      const specIndex = JSON.parse(readFileSync(specPath, "utf-8"));
      upstreamVersion = specIndex.version || "unknown";
    } catch {
      // Ignore errors reading spec file
    }
  }

  const content = `/**
 * Auto-generated version file - DO NOT EDIT MANUALLY
 *
 * This file is regenerated automatically by:
 *   npm run generate:version
 *
 * It runs automatically before each build via the prebuild hook.
 * The version comes from package.json to ensure consistency.
 */

/** Package version from package.json */
export const VERSION = "${pkg.version}";

/** Package name */
export const PACKAGE_NAME = "${pkg.name}";

/** Upstream F5 XC API version from specs */
export const UPSTREAM_VERSION = "${upstreamVersion}";
`;

  const versionPath = join(rootDir, "src", "version.ts");
  writeFileSync(versionPath, content);
  console.log(`Generated src/version.ts with version ${pkg.version}`);
}

generateVersion();
