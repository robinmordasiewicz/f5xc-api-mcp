#!/usr/bin/env tsx
/**
 * Orphan Resource Cleanup Script
 *
 * Identifies and cleans up test resources older than 24 hours.
 * Searches for resources with 'e2e-test-' prefix across F5XC tenant.
 *
 * Usage:
 *   npm run test:cleanup
 *   tsx tests/e2e/scripts/orphan-cleanup.ts [--age-hours 24] [--dry-run]
 */

import { CredentialManager } from "@robinmordasiewicz/f5xc-auth";
import axios, { AxiosInstance } from "axios";
import { isTestResource, extractTimestamp, getResourceAge } from "../helpers/test-data-generator";

interface OrphanResource {
  type: string;
  domain: string;
  namespace: string;
  name: string;
  ageHours: number;
  createdAt: Date;
}

interface CleanupReport {
  scanned: number;
  orphansFound: number;
  deleted: number;
  failed: number;
  orphans: OrphanResource[];
  errors: Array<{ resource: string; error: string }>;
}

// Parse command line arguments
const args = process.argv.slice(2);
const ageHoursArg = args.find((arg) => arg.startsWith("--age-hours="));
const MAX_AGE_HOURS = ageHoursArg ? parseInt(ageHoursArg.split("=")[1], 10) : 24;
const DRY_RUN = args.includes("--dry-run");

console.log(`\n🧹 F5XC Orphan Resource Cleanup\n`);
console.log(`Configuration:`);
console.log(`  - Max Age: ${MAX_AGE_HOURS} hours`);
console.log(`  - Mode: ${DRY_RUN ? "DRY RUN (no deletions)" : "LIVE (will delete)"}\n`);

/**
 * Main cleanup function
 */
async function cleanupOrphans(): Promise<void> {
  // Initialize authentication
  const credentialManager = new CredentialManager();
  await credentialManager.initialize();

  if (!credentialManager.isAuthenticated()) {
    console.error("❌ Not authenticated. Please configure F5XC credentials.");
    process.exit(1);
  }

  const tenant = credentialManager.getTenant();
  console.log(`✅ Authenticated as tenant: ${tenant}\n`);

  // Create HTTP client
  const httpClient = createHttpClient(credentialManager);

  // Scan for orphaned resources
  console.log("🔍 Scanning for orphaned test resources...\n");
  const report: CleanupReport = {
    scanned: 0,
    orphansFound: 0,
    deleted: 0,
    failed: 0,
    orphans: [],
    errors: [],
  };

  // Resource types to scan
  const resourceTypes = [
    { domain: "virtual", type: "http_loadbalancer", endpoint: "http_loadbalancers" },
    { domain: "virtual", type: "tcp_loadbalancer", endpoint: "tcp_loadbalancers" },
    { domain: "virtual", type: "origin_pool", endpoint: "origin_pools" },
    { domain: "waf", type: "app_firewall", endpoint: "app_firewalls" },
    { domain: "dns", type: "dns_zone", endpoint: "dns_zones" },
    { domain: "certificate", type: "certificate", endpoint: "certificates" },
    { domain: "tenant_and_identity", type: "namespace", endpoint: "namespaces" },
  ];

  // Scan each resource type
  for (const resourceType of resourceTypes) {
    await scanResourceType(httpClient, resourceType, report);
  }

  // Display orphans found
  if (report.orphansFound > 0) {
    console.log(`\n📋 Found ${report.orphansFound} orphaned resource(s):\n`);
    for (const orphan of report.orphans) {
      console.log(
        `  - ${orphan.domain}/${orphan.type}/${orphan.namespace}/${orphan.name} (${orphan.ageHours.toFixed(1)} hours old)`
      );
    }
  } else {
    console.log(`\n✅ No orphaned resources found!\n`);
    printSummary(report);
    return;
  }

  // Delete orphans (if not dry run)
  if (!DRY_RUN) {
    console.log(`\n🗑️  Deleting orphaned resources...\n`);
    for (const orphan of report.orphans) {
      await deleteOrphan(httpClient, orphan, report);
    }
  } else {
    console.log(`\n⚠️  DRY RUN: Would delete ${report.orphansFound} resource(s)\n`);
  }

  // Print summary
  printSummary(report);

  // Generate cleanup report file
  generateCleanupReport(report);

  // Exit with error code if failures occurred
  if (report.failed > 0) {
    process.exit(1);
  }
}

/**
 * Scan a specific resource type for orphans
 */
async function scanResourceType(
  httpClient: AxiosInstance,
  resourceType: { domain: string; type: string; endpoint: string },
  report: CleanupReport
): Promise<void> {
  console.log(`🔍 Scanning ${resourceType.domain}/${resourceType.type}...`);

  try {
    // Get list of resources
    let url: string;
    if (resourceType.type === "namespace") {
      // Namespaces are not namespaced themselves
      url = `/api/web/namespaces`;
    } else {
      // Most resources are in namespaces - scan all namespaces
      const namespaces = await listNamespaces(httpClient);

      for (const namespace of namespaces) {
        const namespacedUrl = `/api/config/namespaces/${namespace}/${resourceType.endpoint}`;
        await scanEndpoint(httpClient, namespacedUrl, resourceType, namespace, report);
      }
      return;
    }

    await scanEndpoint(httpClient, url, resourceType, "system", report);
  } catch (error: any) {
    console.log(`  ⚠️  Error scanning ${resourceType.domain}/${resourceType.type}: ${error.message}`);
  }
}

/**
 * Scan a specific endpoint for test resources
 */
async function scanEndpoint(
  httpClient: AxiosInstance,
  url: string,
  resourceType: { domain: string; type: string },
  namespace: string,
  report: CleanupReport
): Promise<void> {
  try {
    const response = await httpClient.get(url);
    const items = response.data?.items || [];

    for (const item of items) {
      report.scanned++;
      const name = item.metadata?.name || item.name;

      if (!name) continue;

      // Check if test resource
      if (isTestResource(name)) {
        const age = getResourceAge(name);

        if (age !== null) {
          const ageHours = age / (1000 * 60 * 60);

          // Check if orphaned (older than max age)
          if (ageHours > MAX_AGE_HOURS) {
            const timestamp = extractTimestamp(name);
            const createdAt = timestamp ? new Date(timestamp) : new Date();

            report.orphansFound++;
            report.orphans.push({
              type: resourceType.type,
              domain: resourceType.domain,
              namespace,
              name,
              ageHours,
              createdAt,
            });
          }
        }
      }
    }
  } catch (error: any) {
    // 404 is acceptable (endpoint may not exist in namespace)
    if (error.response?.status !== 404) {
      console.log(`  ⚠️  Error scanning ${url}: ${error.message}`);
    }
  }
}

/**
 * List all namespaces
 */
async function listNamespaces(httpClient: AxiosInstance): Promise<string[]> {
  try {
    const response = await httpClient.get("/api/web/namespaces");
    const items = response.data?.items || [];
    return items.map((item: any) => item.name).filter(Boolean);
  } catch (error) {
    console.log("  ⚠️  Error listing namespaces, using default namespaces");
    return ["default", "system"];
  }
}

/**
 * Delete an orphaned resource
 */
async function deleteOrphan(
  httpClient: AxiosInstance,
  orphan: OrphanResource,
  report: CleanupReport
): Promise<void> {
  try {
    const url = getDeleteUrl(orphan);
    await httpClient.delete(url);

    report.deleted++;
    console.log(
      `  ✅ Deleted ${orphan.domain}/${orphan.type}/${orphan.namespace}/${orphan.name}`
    );

    // Brief pause between deletions
    await sleep(500);
  } catch (error: any) {
    // 404 is acceptable (already deleted)
    if (error.response?.status === 404) {
      report.deleted++;
      console.log(
        `  ℹ️  ${orphan.domain}/${orphan.type}/${orphan.namespace}/${orphan.name} already deleted`
      );
    } else {
      report.failed++;
      const errorMsg = error.message || String(error);
      report.errors.push({
        resource: `${orphan.domain}/${orphan.type}/${orphan.namespace}/${orphan.name}`,
        error: errorMsg,
      });
      console.error(
        `  ❌ Failed to delete ${orphan.domain}/${orphan.type}/${orphan.namespace}/${orphan.name}: ${errorMsg}`
      );
    }
  }
}

/**
 * Get API delete URL for a resource
 */
function getDeleteUrl(orphan: OrphanResource): string {
  // Special handling for namespaces (not namespaced themselves)
  if (orphan.type === "namespace") {
    return `/api/web/namespaces/${orphan.name}`;
  }

  // Map resource types to API endpoints
  const typeToEndpoint: Record<string, string> = {
    http_loadbalancer: "http_loadbalancers",
    tcp_loadbalancer: "tcp_loadbalancers",
    origin_pool: "origin_pools",
    app_firewall: "app_firewalls",
    service_policy: "service_policys",
    dns_zone: "dns_zones",
    certificate: "certificates",
    virtual_network: "virtual_networks",
  };

  const endpoint = typeToEndpoint[orphan.type] || `${orphan.type}s`;

  // Most resources are namespaced
  return `/api/config/namespaces/${orphan.namespace}/${endpoint}/${orphan.name}`;
}

/**
 * Print cleanup summary
 */
function printSummary(report: CleanupReport): void {
  console.log(`\n📊 Cleanup Summary:\n`);
  console.log(`  - Resources Scanned: ${report.scanned}`);
  console.log(`  - Orphans Found: ${report.orphansFound}`);

  if (!DRY_RUN) {
    console.log(`  - Successfully Deleted: ${report.deleted}`);
    console.log(`  - Failed Deletions: ${report.failed}`);
  }

  if (report.failed > 0) {
    console.log(`\n⚠️  Failed Deletions:\n`);
    for (const error of report.errors) {
      console.log(`  - ${error.resource}: ${error.error}`);
    }
  }
  console.log();
}

/**
 * Generate cleanup report file
 */
function generateCleanupReport(report: CleanupReport): void {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const reportPath = `test-reports/cleanup-${timestamp}.json`;

  const reportData = {
    timestamp: new Date().toISOString(),
    maxAgeHours: MAX_AGE_HOURS,
    dryRun: DRY_RUN,
    summary: {
      scanned: report.scanned,
      orphansFound: report.orphansFound,
      deleted: report.deleted,
      failed: report.failed,
    },
    orphans: report.orphans,
    errors: report.errors,
  };

  const fs = require("fs");
  const path = require("path");

  const reportsDir = path.join(process.cwd(), "test-reports");
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(process.cwd(), reportPath),
    JSON.stringify(reportData, null, 2)
  );

  console.log(`📄 Cleanup report saved: ${reportPath}\n`);
}

/**
 * Create HTTP client with authentication
 */
function createHttpClient(credentialManager: CredentialManager): AxiosInstance {
  const baseURL = credentialManager.getApiUrl();
  const apiToken = credentialManager.getToken();

  return axios.create({
    baseURL,
    headers: {
      Authorization: `APIToken ${apiToken}`,
      "Content-Type": "application/json",
    },
    timeout: 30000,
  });
}

/**
 * Sleep for specified milliseconds
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Run cleanup
cleanupOrphans().catch((error) => {
  console.error("❌ Cleanup failed:", error);
  process.exit(1);
});
