#!/usr/bin/env tsx

/**
 * OpenAPI Specification Sync Script
 *
 * Downloads pre-enriched F5 Distributed Cloud OpenAPI specifications from
 * the upstream GitHub repository releases.
 *
 * Source: https://github.com/robinmordasiewicz/f5xc-api-enriched/releases
 *
 * Usage:
 *   npm run sync-specs
 *   tsx scripts/sync-specs.ts
 */

import {
  createWriteStream,
  existsSync,
  mkdirSync,
  rmSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "fs";
import { join, dirname, basename } from "path";
import { fileURLToPath } from "url";
import https from "https";
import JSZip from "jszip";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Configuration
 */
const CONFIG = {
  /** GitHub repository for enriched specs */
  GITHUB_REPO: "robinmordasiewicz/f5xc-api-enriched",

  /** GitHub API endpoint for latest release */
  GITHUB_API:
    "https://api.github.com/repos/robinmordasiewicz/f5xc-api-enriched/releases/latest",

  /** Directory to store domain specs */
  SPECS_DOMAINS_DIR: join(__dirname, "..", "specs", "domains"),

  /** Base specs directory */
  SPECS_DIR: join(__dirname, "..", "specs"),

  /** Index file with version metadata */
  SPECS_INDEX_FILE: join(__dirname, "..", "specs", "index.json"),

  /** Temporary download file */
  TEMP_ZIP: join(__dirname, "..", "specs", "temp-enriched.zip"),

  /** Request timeout in milliseconds */
  TIMEOUT: 120000,

  /** User agent for GitHub API */
  USER_AGENT: "f5xc-api-mcp/sync-specs",
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
 * GitHub release metadata
 */
interface GitHubRelease {
  tag_name: string;
  name: string;
  published_at: string;
  assets: Array<{
    name: string;
    browser_download_url: string;
    size: number;
  }>;
}

/**
 * Fetch JSON from URL with GitHub API headers
 */
async function fetchJson<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const headers: Record<string, string> = {
      "User-Agent": CONFIG.USER_AGENT,
      Accept: "application/vnd.github.v3+json",
    };

    // Use GitHub token if available for higher rate limits
    const token = process.env.GITHUB_TOKEN;
    if (token) {
      headers["Authorization"] = `token ${token}`;
    }

    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: "GET",
      headers,
      timeout: CONFIG.TIMEOUT,
    };

    const request = https.request(options, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          fetchJson<T>(redirectUrl).then(resolve).catch(reject);
          return;
        }
      }

      if (response.statusCode !== 200) {
        reject(
          new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`)
        );
        return;
      }

      let data = "";
      response.on("data", (chunk) => {
        data += chunk;
      });
      response.on("end", () => {
        try {
          resolve(JSON.parse(data) as T);
        } catch (error) {
          reject(new Error(`Failed to parse JSON: ${error}`));
        }
      });
    });

    request.on("error", reject);
    request.on("timeout", () => {
      request.destroy();
      reject(new Error("Request timed out"));
    });

    request.end();
  });
}

/**
 * Get latest release metadata from GitHub
 */
async function getLatestRelease(): Promise<GitHubRelease> {
  log.info(`Fetching latest release from ${CONFIG.GITHUB_REPO}`);
  const release = await fetchJson<GitHubRelease>(CONFIG.GITHUB_API);
  log.info(`Found release: ${release.tag_name} (${release.name})`);
  return release;
}

/**
 * Download file from URL
 */
async function downloadFile(url: string, destPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    log.info(`Downloading from ${url}`);

    const file = createWriteStream(destPath);

    const headers: Record<string, string> = {
      "User-Agent": CONFIG.USER_AGENT,
      Accept: "application/octet-stream",
    };

    const token = process.env.GITHUB_TOKEN;
    if (token) {
      headers["Authorization"] = `token ${token}`;
    }

    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: "GET",
      headers,
      timeout: CONFIG.TIMEOUT,
    };

    const request = https.request(options, (response) => {
      // Handle redirects (GitHub uses these for asset downloads)
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          log.info(`Following redirect...`);
          file.close();
          downloadFile(redirectUrl, destPath).then(resolve).catch(reject);
          return;
        }
      }

      if (response.statusCode !== 200) {
        reject(
          new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`)
        );
        return;
      }

      const contentLength = response.headers["content-length"];
      if (contentLength) {
        log.info(
          `Download size: ${(parseInt(contentLength, 10) / 1024 / 1024).toFixed(2)} MB`
        );
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

    request.end();
  });
}

/**
 * Extract domain specs from ZIP file
 */
async function extractDomainSpecs(
  zipPath: string,
  destDir: string
): Promise<number> {
  log.info(`Extracting domain specs to ${destDir}`);

  const zipData = readFileSync(zipPath);
  const zip = await JSZip.loadAsync(zipData);

  // Ensure destination exists
  mkdirSync(destDir, { recursive: true });

  const entries = Object.entries(zip.files);
  let extracted = 0;

  for (const [relativePath, zipEntry] of entries) {
    if (zipEntry.dir) {
      continue;
    }

    // Extract domain JSON files from domains/ directory
    if (relativePath.startsWith("domains/") && relativePath.endsWith(".json")) {
      const filename = basename(relativePath);
      const destPath = join(destDir, filename);

      const content = await zipEntry.async("nodebuffer");
      writeFileSync(destPath, content);
      extracted++;
      log.info(`  Extracted: ${filename}`);
    }

    // Extract index.json to specs directory
    if (relativePath === "index.json") {
      const content = await zipEntry.async("nodebuffer");
      writeFileSync(CONFIG.SPECS_INDEX_FILE, content);
      log.info(`  Extracted: index.json`);
    }
  }

  return extracted;
}

/**
 * Count spec files in directory
 */
function countSpecFiles(dir: string): number {
  if (!existsSync(dir)) {
    return 0;
  }

  return readdirSync(dir).filter((f) => f.endsWith(".json")).length;
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
 * Get current version from index.json if it exists
 */
function getCurrentVersion(): string | null {
  if (!existsSync(CONFIG.SPECS_INDEX_FILE)) {
    return null;
  }

  try {
    const index = JSON.parse(readFileSync(CONFIG.SPECS_INDEX_FILE, "utf-8"));
    return index.version || null;
  } catch {
    return null;
  }
}

/**
 * Main sync function
 */
async function syncSpecs(): Promise<void> {
  console.log("=".repeat(60));
  console.log("F5 Distributed Cloud Enriched OpenAPI Specification Sync");
  console.log(`Source: github.com/${CONFIG.GITHUB_REPO}`);
  console.log("=".repeat(60));

  try {
    // Create directories
    mkdirSync(CONFIG.SPECS_DIR, { recursive: true });
    mkdirSync(CONFIG.SPECS_DOMAINS_DIR, { recursive: true });

    // Check current version
    const currentVersion = getCurrentVersion();
    if (currentVersion) {
      log.info(`Current version: ${currentVersion}`);
    }

    // Check existing specs
    const existingCount = countSpecFiles(CONFIG.SPECS_DOMAINS_DIR);
    if (existingCount > 0) {
      log.info(`Found ${existingCount} existing domain spec files`);
    }

    // Get latest release from GitHub
    const release = await getLatestRelease();

    // Find the ZIP asset
    const zipAsset = release.assets.find((a) => a.name.endsWith(".zip"));
    if (!zipAsset) {
      throw new Error("No ZIP asset found in release");
    }

    log.info(`Asset: ${zipAsset.name} (${(zipAsset.size / 1024 / 1024).toFixed(2)} MB)`);

    // Download the ZIP file
    await downloadFile(zipAsset.browser_download_url, CONFIG.TEMP_ZIP);

    // Clear domains directory for fresh extraction
    if (existsSync(CONFIG.SPECS_DOMAINS_DIR)) {
      rmSync(CONFIG.SPECS_DOMAINS_DIR, { recursive: true, force: true });
    }
    mkdirSync(CONFIG.SPECS_DOMAINS_DIR, { recursive: true });

    // Extract domain specs
    const extractedCount = await extractDomainSpecs(
      CONFIG.TEMP_ZIP,
      CONFIG.SPECS_DOMAINS_DIR
    );

    log.success(`Sync complete: ${extractedCount} domain spec files extracted`);

    // Clean up
    cleanup();

    // Read new version from index
    const newVersion = getCurrentVersion();

    // Summary
    console.log("=".repeat(60));
    console.log("Sync Summary:");
    console.log(`  Source: github.com/${CONFIG.GITHUB_REPO}`);
    console.log(`  Release: ${release.tag_name}`);
    console.log(`  Version: ${newVersion || "unknown"}`);
    console.log(`  Specs directory: ${CONFIG.SPECS_DOMAINS_DIR}`);
    console.log(`  Domain specs: ${extractedCount}`);
    if (currentVersion && newVersion && currentVersion !== newVersion) {
      console.log(`  Updated: ${currentVersion} → ${newVersion}`);
    }
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
    log.error(
      `Sync failed: ${error instanceof Error ? error.message : String(error)}`
    );
    process.exit(1);
  });
