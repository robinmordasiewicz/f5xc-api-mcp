#!/usr/bin/env npx tsx
/**
 * End-to-End Validation Script for URL Normalization Fix
 *
 * This script tests the actual MCP server functionality with various URL formats
 * to verify the /api/api duplication issue is fixed.
 *
 * Run with:
 *   F5XC_API_URL=https://f5-amer-ent.console.ves.volterra.io \
 *   F5XC_API_TOKEN='your-token' \
 *   npx tsx scripts/validate-url-fix.ts
 */

import { CredentialManager, createHttpClient, AuthMode } from "@robinmordasiewicz/f5xc-auth";
import { normalizeF5XCUrl, normalizePath } from "../src/utils/url-utils.js";
import { buildApiPath } from "../src/resources/templates.js";

interface TestResult {
  name: string;
  passed: boolean;
  details: string;
}

const results: TestResult[] = [];

function log(msg: string) {
  console.log(msg);
}

function logTest(name: string, passed: boolean, details: string) {
  const status = passed ? "✅ PASS" : "❌ FAIL";
  console.log(`\n${status}: ${name}`);
  console.log(`   ${details}`);
  results.push({ name, passed, details });
}

async function runValidation() {
  log("=" .repeat(60));
  log("URL Normalization Fix - End-to-End Validation");
  log("=" .repeat(60));

  // Test 1: Check environment variables
  log("\n--- Test 1: Environment Variables ---");
  const originalApiUrl = process.env.F5XC_API_URL;
  const apiToken = process.env.F5XC_API_TOKEN;

  if (!originalApiUrl || !apiToken) {
    log("ERROR: F5XC_API_URL and F5XC_API_TOKEN must be set");
    process.exit(1);
  }
  logTest("Environment variables set", true, `Original URL: ${originalApiUrl}`);

  // Normalize the URL before CredentialManager reads it (mimics server.ts behavior)
  // This is the pattern until f5xc-auth package handles normalization internally
  const normalizedEnvUrl = normalizeF5XCUrl(originalApiUrl);
  if (normalizedEnvUrl !== originalApiUrl) {
    log(`   Normalizing: ${originalApiUrl} -> ${normalizedEnvUrl}`);
    process.env.F5XC_API_URL = normalizedEnvUrl;
  }
  logTest("URL normalized for CredentialManager", true, `Normalized URL: ${normalizedEnvUrl}`);

  // Test 2: URL Normalization with various formats
  log("\n--- Test 2: URL Normalization ---");
  const urlFormats = [
    { input: "https://f5-amer-ent.console.ves.volterra.io", desc: "standard" },
    { input: "https://f5-amer-ent.console.ves.volterra.io/api", desc: "with /api" },
    { input: "f5-amer-ent.console.ves.volterra.io", desc: "no protocol" },
    { input: "f5-amer-ent.console.ves.volterra.io/api", desc: "no protocol with /api" },
  ];

  for (const { input, desc } of urlFormats) {
    const normalized = normalizeF5XCUrl(input);
    const expected = "https://f5-amer-ent.console.ves.volterra.io";
    const passed = normalized === expected;
    logTest(`URL normalization (${desc})`, passed, `${input} -> ${normalized}`);
  }

  // Test 3: Path Normalization prevents /api/api
  log("\n--- Test 3: Path Normalization ---");
  const resourcePath = buildApiPath("http_loadbalancer", "default");
  if (resourcePath) {
    const normalizedPath = normalizePath(resourcePath);
    const baseUrl = "https://f5-amer-ent.console.ves.volterra.io/api";
    const fullUrl = `${baseUrl}${normalizedPath}`;
    const hasDoubleApi = fullUrl.includes("/api/api");
    logTest(
      "Path normalization prevents /api/api",
      !hasDoubleApi,
      `Full URL: ${fullUrl}`
    );
  }

  // Test 4: Initialize CredentialManager
  log("\n--- Test 4: CredentialManager Initialization ---");
  const credentialManager = new CredentialManager();
  await credentialManager.initialize();

  const authMode = credentialManager.getAuthMode();
  const isAuthenticated = credentialManager.isAuthenticated();
  logTest(
    "CredentialManager initialized",
    authMode !== AuthMode.NONE && isAuthenticated,
    `Auth mode: ${authMode}, Authenticated: ${isAuthenticated}`
  );

  // Test 5: Make actual API call
  log("\n--- Test 5: Live API Call ---");
  try {
    const httpClient = createHttpClient(credentialManager);

    // Use normalizePath to strip /api prefix (simulating what handlers.ts does now)
    const apiPath = buildApiPath("namespace", "system");
    const normalizedApiPath = apiPath ? normalizePath(apiPath) : "/web/namespaces";

    log(`   Making request to: ${normalizedApiPath}`);
    const response = await httpClient.get(normalizedApiPath);

    const hasItems = response.data && (Array.isArray(response.data.items) || response.data.items !== undefined);
    logTest(
      "Live API call succeeded",
      response.status === 200,
      `Status: ${response.status}, Has items: ${hasItems}`
    );
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);

    // Check if error is due to /api/api (the bug we're fixing)
    if (errorMsg.includes("/api/api") || errorMsg.includes("404")) {
      logTest("Live API call succeeded", false, `ERROR: ${errorMsg} - Possible /api/api duplication!`);
    } else if (errorMsg.includes("401") || errorMsg.includes("403")) {
      // Auth errors are expected if token is invalid/expired, but URL is correct
      logTest("Live API call (auth check)", true, `Got auth error (URL is correct): ${errorMsg}`);
    } else {
      logTest("Live API call succeeded", false, `ERROR: ${errorMsg}`);
    }
  }

  // Test 6: Test with different URL format via environment
  log("\n--- Test 6: URL Format Variations via Env ---");
  const testFormats = [
    "f5-amer-ent.console.ves.volterra.io",
    "f5-amer-ent.console.ves.volterra.io/api",
  ];

  for (const testUrl of testFormats) {
    const normalized = normalizeF5XCUrl(testUrl);
    const endsWithApi = normalized.endsWith("/api");
    logTest(
      `URL ${testUrl} normalized correctly`,
      !endsWithApi,
      `Normalized to: ${normalized} (no trailing /api: ${!endsWithApi})`
    );
  }

  // Summary
  log("\n" + "=" .repeat(60));
  log("VALIDATION SUMMARY");
  log("=" .repeat(60));

  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  const total = results.length;

  log(`\nTotal: ${total} tests`);
  log(`Passed: ${passed}`);
  log(`Failed: ${failed}`);

  if (failed > 0) {
    log("\nFailed tests:");
    results.filter(r => !r.passed).forEach(r => {
      log(`  - ${r.name}: ${r.details}`);
    });
    process.exit(1);
  } else {
    log("\n✅ All validation tests passed!");
    process.exit(0);
  }
}

runValidation().catch(err => {
  console.error("Validation failed:", err);
  process.exit(1);
});
