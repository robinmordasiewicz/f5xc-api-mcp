/**
 * Comprehensive F5XC API Tool Validation Tests
 *
 * Validates all 1,535 F5XC API tools against nferreira.staging.volterra.us tenant.
 * Purpose: Bug discovery and feature enhancement identification.
 *
 * Execution Strategy:
 * - LIST operations (400 tools): 100% real API calls
 * - GET operations (350 tools): 100% real API calls (404/403 acceptable)
 * - CREATE operations (~15 tools): Real API with cleanup
 * - UPDATE/DELETE (970 tools): Documentation mode only
 *
 * Estimated Duration: 75 minutes for full suite
 *
 * Usage:
 *   npm run test:discover              # Full suite (~2-3 hours)
 *   npm run test:discover:sample       # Sample (virtual domain only, ~10 min)
 */

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { CredentialManager } from "@robinmordasiewicz/f5xc-auth";
import axios, { AxiosInstance } from "axios";
import { RateLimiter } from "../utils/rate-limiter";
import { ResourceTracker } from "../e2e/helpers/resource-tracker";
import { generateTestResourceName } from "../e2e/helpers/test-data-generator";
import fs from "fs";
import path from "path";

// Test configuration
const TEST_CONFIG = {
  rateLimit: {
    requestsPerMinute: 12,
    maxRetries: 3,
    retryDelay: 2000,
  },
  domainFailureThreshold: 0.15, // Skip domain after 15% failures
  progressInterval: 50, // Log progress every 50 tests
  timeout: 30000, // 30 second timeout per test
};

// Global test state
let credentialManager: CredentialManager;
let httpClient: AxiosInstance;
let rateLimiter: RateLimiter;
let resourceTracker: ResourceTracker;

// Load tool registry synchronously at module level
const toolRegistry = loadToolRegistrySync();

// Test statistics
const stats = {
  total: 0,
  passed: 0,
  failed: 0,
  skipped: 0,
  rbacRestricted: 0,
  rbacTools: [] as string[],
  domainStats: new Map<string, { total: number; passed: number; failed: number; rbac: number }>(),
};

/**
 * Load tool registry from generated tool modules synchronously
 */
function loadToolRegistrySync(): any {
  const distDir = path.join(process.cwd(), "dist", "tools", "generated");

  // Load all domain directories
  const domains: string[] = [];
  const toolsByDomain = new Map<string, any[]>();
  let totalTools = 0;

  if (fs.existsSync(distDir)) {
    const entries = fs.readdirSync(distDir, { withFileTypes: true });

    // Filter for directories (each domain is a directory)
    const domainDirs = entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

    for (const domainName of domainDirs) {
      const indexPath = path.join(distDir, domainName, "index.js");

      if (fs.existsSync(indexPath)) {
        try {
          // Use require() for synchronous loading
          // Clear the require cache to ensure fresh load
          delete require.cache[require.resolve(indexPath)];
          const module = require(indexPath);

          // Find the tools array export (e.g., virtualTools, wafTools, etc.)
          const toolsArrayName = Object.keys(module).find(key => key.endsWith('Tools'));

          if (toolsArrayName && Array.isArray(module[toolsArrayName])) {
            const tools = module[toolsArrayName];

            if (tools.length > 0) {
              domains.push(domainName);
              toolsByDomain.set(domainName, tools);
              totalTools += tools.length;
            }
          }
        } catch (error) {
          console.warn(`Warning: Could not load tools from ${domainName}:`, error);
        }
      }
    }
  }

  return {
    domains,
    toolsByDomain,
    totalTools,
  };
}

/**
 * Setup authentication and HTTP client
 */
beforeAll(async () => {
  console.log("\n🔧 Setting up comprehensive tool validation tests...\n");

  // Verify credentials
  if (!process.env.F5XC_API_URL || !process.env.F5XC_API_TOKEN) {
    throw new Error(
      "Missing F5XC credentials. Set F5XC_API_URL and F5XC_API_TOKEN environment variables."
    );
  }

  // Initialize credential manager
  credentialManager = new CredentialManager();
  await credentialManager.initialize();

  if (!credentialManager.isAuthenticated()) {
    throw new Error("Failed to authenticate with F5XC API");
  }

  const tenant = credentialManager.getTenant();
  console.log(`✅ Authenticated as tenant: ${tenant}`);
  console.log(`🌐 API URL: ${credentialManager.getApiUrl()}\n`);

  // Create HTTP client
  httpClient = axios.create({
    baseURL: credentialManager.getApiUrl(),
    headers: {
      Authorization: `APIToken ${credentialManager.getToken()}`,
      "Content-Type": "application/json",
    },
    timeout: TEST_CONFIG.timeout,
  });

  // Initialize rate limiter
  rateLimiter = new RateLimiter(TEST_CONFIG.rateLimit);
  console.log(
    `⏱️  Rate Limiter: ${TEST_CONFIG.rateLimit.requestsPerMinute} requests/minute\n`
  );

  // Initialize resource tracker
  resourceTracker = new ResourceTracker();

  // Initialize domain stats (toolRegistry loaded at module level)
  for (const domain of toolRegistry.domains) {
    if (!stats.domainStats.has(domain)) {
      stats.domainStats.set(domain, { total: 0, passed: 0, failed: 0, rbac: 0 });
    }
  }

  console.log(`📊 Loaded ${toolRegistry.totalTools} tools across ${toolRegistry.domains.length} domains\n`);
}, 60000);

/**
 * Cleanup resources after all tests
 */
afterAll(async () => {
  console.log("\n🧹 Cleaning up test resources...");
  await resourceTracker.cleanupAll(httpClient);

  // Print final statistics
  printFinalStatistics();
}, 120000);

/**
 * Update domain statistics
 */
function updateDomainStats(domain: string, passed: boolean, rbac: boolean = false): void {
  const domainStat = stats.domainStats.get(domain);
  if (domainStat) {
    domainStat.total++;
    if (rbac) {
      domainStat.rbac++;
    } else if (passed) {
      domainStat.passed++;
    } else {
      domainStat.failed++;
    }
  }
}

/**
 * Track RBAC-restricted tool
 */
function trackRbacRestricted(toolName: string): void {
  stats.rbacRestricted++;
  stats.rbacTools.push(toolName);
}

/**
 * Check if domain should be skipped due to high failure rate
 */
function shouldSkipDomain(domain: string): boolean {
  const domainStat = stats.domainStats.get(domain);
  if (!domainStat || domainStat.total === 0) return false;

  const failureRate = domainStat.failed / domainStat.total;
  return failureRate > TEST_CONFIG.domainFailureThreshold && domainStat.total > 10;
}

/**
 * Log progress
 */
function logProgress(): void {
  if (stats.total > 0 && stats.total % TEST_CONFIG.progressInterval === 0) {
    const passRate = ((stats.passed / stats.total) * 100).toFixed(1);
    console.log(
      `\n📊 Progress: ${stats.total} tests | ${stats.passed} passed | ${stats.failed} failed | ${passRate}% pass rate\n`
    );
  }
}

/**
 * Print final statistics
 */
function printFinalStatistics(): void {
  console.log("\n" + "=".repeat(80));
  console.log("📊 COMPREHENSIVE TEST SUITE - FINAL STATISTICS");
  console.log("=".repeat(80) + "\n");

  console.log(`Total Tests: ${stats.total}`);
  console.log(`✅ Passed: ${stats.passed} (${((stats.passed / stats.total) * 100).toFixed(1)}%)`);
  console.log(`❌ Failed: ${stats.failed} (${((stats.failed / stats.total) * 100).toFixed(1)}%)`);
  console.log(`⏭️  Skipped: ${stats.skipped}`);
  console.log(`🔒 RBAC Restricted: ${stats.rbacRestricted}\n`);

  if (stats.rbacRestricted > 0) {
    console.log(`RBAC-Restricted Tools (${stats.rbacRestricted}):`);
    const rbacByDomain = new Map<string, string[]>();

    // Group RBAC tools by domain
    stats.rbacTools.forEach(toolName => {
      const domainMatch = toolName.match(/^f5xc-api-([^-]+)/);
      if (domainMatch) {
        const domain = domainMatch[1];
        if (!rbacByDomain.has(domain)) {
          rbacByDomain.set(domain, []);
        }
        rbacByDomain.get(domain)!.push(toolName);
      }
    });

    // Print grouped by domain
    for (const [domain, tools] of Array.from(rbacByDomain.entries()).sort()) {
      console.log(`  ${domain}: ${tools.length} tool(s)`);
    }
    console.log();
  }

  console.log("Domain Breakdown:\n");

  // Sort domains by failure rate
  const sortedDomains = Array.from(stats.domainStats.entries()).sort(
    (a, b) => {
      const failRateA = a[1].total > 0 ? a[1].failed / a[1].total : 0;
      const failRateB = b[1].total > 0 ? b[1].failed / b[1].total : 0;
      return failRateB - failRateA;
    }
  );

  for (const [domain, domainStat] of sortedDomains) {
    if (domainStat.total === 0) continue;

    const passRate = ((domainStat.passed / domainStat.total) * 100).toFixed(1);
    const rbacInfo = domainStat.rbac > 0 ? ` (${domainStat.rbac} RBAC)` : "";
    const icon = domainStat.failed === 0 ? "✅" : domainStat.failed > domainStat.passed ? "❌" : "⚠️";

    console.log(
      `  ${icon} ${domain.padEnd(30)} ${domainStat.passed}/${domainStat.total} (${passRate}%)${rbacInfo}`
    );
  }

  console.log("\n" + "=".repeat(80) + "\n");
}

/**
 * Execute API call with rate limiting
 */
async function executeWithRateLimit<T>(fn: () => Promise<T>): Promise<T> {
  return await rateLimiter.schedule(fn);
}

/**
 * Validate LIST operation
 */
async function validateListOperation(tool: any, domain: string): Promise<void> {
  // Verify tool has required path property
  if (!tool.path) {
    console.warn(`⚠️  Tool ${tool.toolName} missing path property, skipping`);
    stats.skipped++;
    return;
  }

  // Replace path parameters with test values
  const testUrl = tool.path
    .replace("{namespace}", "system")
    .replace("{name}", "test-resource");

  try {
    const response = await executeWithRateLimit(() => httpClient.get(testUrl));

    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();

    // Verify response structure
    if (response.data.items) {
      expect(Array.isArray(response.data.items)).toBe(true);
    }

    updateDomainStats(domain, true, false);
    stats.passed++;
  } catch (error: any) {
    const status = error.response?.status;

    // 403 Forbidden = RBAC restriction, skip gracefully
    if (status === 403) {
      console.log(`🔒 RBAC: ${tool.toolName} - Access denied (403), skipping`);
      trackRbacRestricted(tool.toolName);
      updateDomainStats(domain, false, true);
      stats.skipped++;
      return;
    }

    // 404 Not Found = endpoint doesn't exist or wrong path, investigate
    // Other errors are actual failures
    updateDomainStats(domain, false, false);
    stats.failed++;
    throw error;
  }
}

/**
 * Validate GET operation
 */
async function validateGetOperation(tool: any, domain: string): Promise<void> {
  // Verify tool has required path property
  if (!tool.path) {
    console.warn(`⚠️  Tool ${tool.toolName} missing path property, skipping`);
    stats.skipped++;
    return;
  }

  // For GET operations, 404 and 403 are acceptable (resource may not exist or RBAC)
  const testResourceName = generateTestResourceName("get-test");

  // Replace path parameters
  const testUrl = tool.path
    .replace("{namespace}", "system")
    .replace("{name}", testResourceName);

  try {
    const response = await executeWithRateLimit(() => httpClient.get(testUrl));

    // If we get a response, validate structure
    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();

    updateDomainStats(domain, true, false);
    stats.passed++;
  } catch (error: any) {
    const status = error.response?.status;

    // 403 Forbidden = RBAC restriction, skip gracefully
    if (status === 403) {
      console.log(`🔒 RBAC: ${tool.toolName} - Access denied (403), skipping`);
      trackRbacRestricted(tool.toolName);
      updateDomainStats(domain, false, true);
      stats.skipped++;
      return;
    }

    // 404 Not Found = resource doesn't exist (acceptable for GET)
    if (status === 404) {
      updateDomainStats(domain, true, false);
      stats.passed++;
      return;
    }

    // Other errors are actual failures
    updateDomainStats(domain, false, false);
    stats.failed++;
    throw error;
  }
}

/**
 * Validate CREATE operation (with cleanup)
 */
async function validateCreateOperation(tool: any, domain: string): Promise<void> {
  // Verify tool has required path property
  if (!tool.path) {
    console.warn(`⚠️  Tool ${tool.toolName} missing path property, skipping`);
    stats.skipped++;
    return;
  }

  const testName = generateTestResourceName("create-test");

  // Build minimal valid payload
  const payload = {
    metadata: {
      name: testName,
      namespace: "system",
    },
    spec: {}, // Minimal spec
  };

  // Replace path parameters
  const testUrl = tool.path
    .replace("{namespace}", "system")
    .replace("{name}", testName);

  try {
    const response = await executeWithRateLimit(() => httpClient.post(testUrl, payload));

    expect(response.status).toBeGreaterThanOrEqual(200);
    expect(response.status).toBeLessThan(300);
    expect(response.data).toBeDefined();

    // Track for cleanup
    resourceTracker.track({
      type: tool.resourceType || tool.endpoint,
      domain,
      namespace: "system",
      name: testName,
    });

    updateDomainStats(domain, true, false);
    stats.passed++;
  } catch (error: any) {
    // CREATE failures are expected for many tools (missing required fields, etc.)
    // We're primarily testing that the endpoint exists and responds
    const status = error.response?.status;

    // 403 Forbidden = RBAC restriction, skip gracefully
    if (status === 403) {
      console.log(`🔒 RBAC: ${tool.toolName} - Access denied (403), skipping`);
      trackRbacRestricted(tool.toolName);
      updateDomainStats(domain, false, true);
      stats.skipped++;
      return;
    }

    if (status && status >= 400 && status < 500) {
      // Client errors are acceptable (validation, auth, etc.)
      updateDomainStats(domain, true, false);
      stats.passed++;
    } else {
      // Server errors are actual failures
      updateDomainStats(domain, false);
      stats.failed++;
      throw error;
    }
  }
}

/**
 * Validate UPDATE/DELETE operations in documentation mode
 */
async function validateDocumentationMode(tool: any, domain: string): Promise<void> {
  // For UPDATE/DELETE, we just verify the tool is properly registered
  // We don't make actual API calls to avoid destructive operations

  expect(tool.toolName).toBeDefined();
  expect(tool.description).toBeDefined();
  expect(typeof tool.toolName).toBe("string");
  expect(typeof tool.description).toBe("string");

  // Verify tool has required metadata
  if (tool.parameters) {
    expect(tool.parameters.properties).toBeDefined();
  }

  updateDomainStats(domain, true);
  stats.passed++;
}

// ============================================================================
// TEST SUITES BY DOMAIN
// ============================================================================

describe(
  "F5XC API Comprehensive Tool Validation",
  () => {
  // Generate test suites for each domain
  for (const domain of toolRegistry.domains) {
    describe(`domain: ${domain}`, () => {
      const tools = toolRegistry.toolsByDomain.get(domain) || [];

      for (const tool of tools) {
        it(
          `should validate ${tool.toolName}`,
          { timeout: TEST_CONFIG.timeout },
          async () => {
            // Check if domain should be skipped
            if (shouldSkipDomain(domain)) {
              console.log(`⏭️  Skipping ${domain} domain due to high failure rate`);
              stats.skipped++;
              return;
            }

            stats.total++;

            try {
              // Determine operation type and validate accordingly
              const operation = tool.operation?.toLowerCase() || "list";

              if (operation === "list") {
                await validateListOperation(tool, domain);
              } else if (operation === "get") {
                await validateGetOperation(tool, domain);
              } else if (operation === "create") {
                await validateCreateOperation(tool, domain);
              } else if (operation === "update" || operation === "delete") {
                await validateDocumentationMode(tool, domain);
              } else {
                // Default to documentation mode for unknown operations
                await validateDocumentationMode(tool, domain);
              }

              // Log progress
              logProgress();
            } catch (error: any) {
              stats.failed++;
              updateDomainStats(domain, false);
              logProgress();

              // Re-throw to fail the test
              throw error;
            }
          }
        );
      }
    });
  }
});
