#!/usr/bin/env tsx

/**
 * OpenAPI Specification Sync Script
 *
 * Downloads and unpacks the F5 Distributed Cloud OpenAPI specification bundle.
 * This script is designed to run as part of CI/CD or manually to update specs.
 *
 * Usage:
 *   npm run sync-specs
 *   tsx scripts/sync-specs.ts
 */

import { createWriteStream, existsSync, mkdirSync, rmSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { pipeline } from "stream/promises";
import { createGunzip } from "zlib";
import https from "https";
import JSZip from "jszip";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Configuration
 */
const CONFIG = {
  /** URL to download OpenAPI bundle */
  OPENAPI_BUNDLE_URL:
    "https://docs.cloud.f5.com/docs-v2/downloads/f5-distributed-cloud-open-api.zip",

  /** Directory to store raw specs */
  SPECS_RAW_DIR: join(__dirname, "..", "specs", "raw"),

  /** Directory to store transformed specs */
  SPECS_DIR: join(__dirname, "..", "specs"),

  /** Temporary download file */
  TEMP_ZIP: join(__dirname, "..", "specs", "temp-openapi.zip"),

  /** Request timeout in milliseconds */
  TIMEOUT: 120000,
};

/**
 * Logger for script output
 */
const log = {
  info: (message: string): void => console.log(`[INFO] ${message}`),
  warn: (message: string): void => console.warn(`[WARN] ${message}`),
  error: (message: string): void => console.error(`[ERROR] ${message}`),
  success: (message: string): void => console.log(`[SUCCESS] ${message}`),
};

/**
 * Download file from URL
 */
async function downloadFile(url: string, destPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    log.info(`Downloading from ${url}`);

    const file = createWriteStream(destPath);

    const request = https.get(url, { timeout: CONFIG.TIMEOUT }, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          log.info(`Following redirect to ${redirectUrl}`);
          file.close();
          downloadFile(redirectUrl, destPath).then(resolve).catch(reject);
          return;
        }
      }

      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
        return;
      }

      const contentLength = response.headers["content-length"];
      if (contentLength) {
        log.info(`Download size: ${(parseInt(contentLength, 10) / 1024 / 1024).toFixed(2)} MB`);
      }

      response.pipe(file);

      file.on("finish", () => {
        file.close();
        log.success("Download completed");
        resolve();
      });
    });

    request.on("error", (error) => {
      file.close();
      rmSync(destPath, { force: true });
      reject(error);
    });

    request.on("timeout", () => {
      request.destroy();
      file.close();
      rmSync(destPath, { force: true });
      reject(new Error("Request timed out"));
    });
  });
}

/**
 * Extract ZIP file
 */
async function extractZip(zipPath: string, destDir: string): Promise<void> {
  log.info(`Extracting ${zipPath} to ${destDir}`);

  const zipData = readFileSync(zipPath);
  const zip = await JSZip.loadAsync(zipData);

  // Ensure destination exists
  mkdirSync(destDir, { recursive: true });

  const entries = Object.entries(zip.files);
  let extracted = 0;

  for (const [relativePath, zipEntry] of entries) {
    if (zipEntry.dir) {
      mkdirSync(join(destDir, relativePath), { recursive: true });
      continue;
    }

    // Only extract JSON and YAML files
    if (
      !relativePath.endsWith(".json") &&
      !relativePath.endsWith(".yaml") &&
      !relativePath.endsWith(".yml")
    ) {
      continue;
    }

    const destPath = join(destDir, relativePath);
    mkdirSync(dirname(destPath), { recursive: true });

    const content = await zipEntry.async("nodebuffer");
    writeFileSync(destPath, content);
    extracted++;
  }

  log.success(`Extracted ${extracted} spec files`);
}

/**
 * Count spec files in directory
 */
function countSpecFiles(dir: string): number {
  if (!existsSync(dir)) {
    return 0;
  }

  let count = 0;

  function scanDir(currentDir: string): void {
    const entries = readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(currentDir, entry.name);
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (
        entry.name.endsWith(".json") ||
        entry.name.endsWith(".yaml") ||
        entry.name.endsWith(".yml")
      ) {
        count++;
      }
    }
  }

  scanDir(dir);
  return count;
}

/**
 * Clean up temporary files
 */
function cleanup(): void {
  if (existsSync(CONFIG.TEMP_ZIP)) {
    rmSync(CONFIG.TEMP_ZIP, { force: true });
    log.info("Cleaned up temporary files");
  }
}

/**
 * Main sync function
 */
async function syncSpecs(): Promise<void> {
  console.log("=".repeat(60));
  console.log("F5 Distributed Cloud OpenAPI Specification Sync");
  console.log("=".repeat(60));

  try {
    // Create directories
    mkdirSync(CONFIG.SPECS_DIR, { recursive: true });
    mkdirSync(CONFIG.SPECS_RAW_DIR, { recursive: true });

    // Check existing specs
    const existingCount = countSpecFiles(CONFIG.SPECS_RAW_DIR);
    if (existingCount > 0) {
      log.info(`Found ${existingCount} existing spec files`);
    }

    // Download new specs
    await downloadFile(CONFIG.OPENAPI_BUNDLE_URL, CONFIG.TEMP_ZIP);

    // Clear raw directory for fresh extraction
    if (existsSync(CONFIG.SPECS_RAW_DIR)) {
      rmSync(CONFIG.SPECS_RAW_DIR, { recursive: true, force: true });
    }
    mkdirSync(CONFIG.SPECS_RAW_DIR, { recursive: true });

    // Extract specs
    await extractZip(CONFIG.TEMP_ZIP, CONFIG.SPECS_RAW_DIR);

    // Count extracted files
    const newCount = countSpecFiles(CONFIG.SPECS_RAW_DIR);
    log.success(`Sync complete: ${newCount} spec files available`);

    // Clean up
    cleanup();

    // Summary
    console.log("=".repeat(60));
    console.log("Sync Summary:");
    console.log(`  Specs directory: ${CONFIG.SPECS_RAW_DIR}`);
    console.log(`  Total spec files: ${newCount}`);
    console.log("=".repeat(60));
  } catch (error) {
    cleanup();
    throw error;
  }
}

/**
 * Entry point
 */
syncSpecs()
  .then(() => {
    process.exit(0);
  })
  .catch((error: unknown) => {
    log.error(`Sync failed: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  });
