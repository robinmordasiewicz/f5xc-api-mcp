#!/usr/bin/env npx tsx
// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Auth Integration Validation Script
 *
 * Idempotent script to validate the @robinmordasiewicz/f5xc-auth integration.
 * Can be run repeatedly to verify auth functionality after the refactoring.
 *
 * Usage:
 *   npm run validate:auth
 *   npx tsx scripts/validate-auth-integration.ts
 *   npx tsx scripts/validate-auth-integration.ts --verbose
 *   npx tsx scripts/validate-auth-integration.ts --test-real-api
 *
 * Exit codes:
 *   0 - All validations passed
 *   1 - Some validations failed
 *   2 - Script error
 */

import { execSync } from "child_process";
import { existsSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  dim: "\x1b[2m",
};

// Parse CLI arguments
const args = process.argv.slice(2);
const verbose = args.includes("--verbose") || args.includes("-v");
const testRealApi = args.includes("--test-real-api");
const help = args.includes("--help") || args.includes("-h");

if (help) {
  console.log(`
${colors.cyan}Auth Integration Validation Script${colors.reset}

Validates the @robinmordasiewicz/f5xc-auth package integration.

${colors.yellow}Usage:${colors.reset}
  npx tsx scripts/validate-auth-integration.ts [options]

${colors.yellow}Options:${colors.reset}
  --verbose, -v     Show detailed output
  --test-real-api   Test against real F5XC API (requires credentials)
  --help, -h        Show this help message

${colors.yellow}Environment Variables:${colors.reset}
  F5XC_API_URL      F5XC API URL (for real API tests)
  F5XC_API_TOKEN    F5XC API Token (for real API tests)

${colors.yellow}Exit Codes:${colors.reset}
  0  All validations passed
  1  Some validations failed
  2  Script error
`);
  process.exit(0);
}

interface ValidationResult {
  name: string;
  passed: boolean;
  message: string;
  details?: string;
  duration: number;
}

const results: ValidationResult[] = [];

function log(message: string, color = colors.reset): void {
  console.log(`${color}${message}${colors.reset}`);
}

function logVerbose(message: string): void {
  if (verbose) {
    console.log(`${colors.dim}  ${message}${colors.reset}`);
  }
}

function runCommand(cmd: string, options: { cwd?: string; silent?: boolean } = {}): {
  success: boolean;
  output: string;
  error?: string;
} {
  try {
    const output = execSync(cmd, {
      cwd: options.cwd || projectRoot,
      encoding: "utf-8",
      stdio: options.silent ? "pipe" : ["pipe", "pipe", "pipe"],
    });
    return { success: true, output: output.trim() };
  } catch (error) {
    const execError = error as { stdout?: Buffer | string; stderr?: Buffer | string; message: string };
    return {
      success: false,
      output: execError.stdout?.toString() || "",
      error: execError.stderr?.toString() || execError.message,
    };
  }
}

async function validate(
  name: string,
  testFn: () => Promise<{ passed: boolean; message: string; details?: string }>
): Promise<void> {
  const start = Date.now();
  log(`\n${colors.blue}▶${colors.reset} ${name}...`);

  try {
    const result = await testFn();
    const duration = Date.now() - start;

    results.push({
      name,
      ...result,
      duration,
    });

    if (result.passed) {
      log(`  ${colors.green}✓${colors.reset} ${result.message} ${colors.dim}(${duration}ms)${colors.reset}`);
    } else {
      log(`  ${colors.red}✗${colors.reset} ${result.message} ${colors.dim}(${duration}ms)${colors.reset}`);
    }

    if (result.details && (verbose || !result.passed)) {
      console.log(`    ${colors.dim}${result.details}${colors.reset}`);
    }
  } catch (error) {
    const duration = Date.now() - start;
    const errorMessage = error instanceof Error ? error.message : String(error);

    results.push({
      name,
      passed: false,
      message: `Exception: ${errorMessage}`,
      duration,
    });

    log(`  ${colors.red}✗${colors.reset} Exception: ${errorMessage} ${colors.dim}(${duration}ms)${colors.reset}`);
  }
}

// ===========================================================================
// VALIDATION CHECKS
// ===========================================================================

async function main(): Promise<void> {
  log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  log(`${colors.cyan}  Auth Integration Validation${colors.reset}`);
  log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  log(`${colors.dim}  Project: ${projectRoot}${colors.reset}`);
  log(`${colors.dim}  Verbose: ${verbose}${colors.reset}`);
  log(`${colors.dim}  Real API: ${testRealApi}${colors.reset}`);

  // ---------------------------------------------------------------------------
  // 1. Package Dependencies
  // ---------------------------------------------------------------------------
  await validate("Check f5xc-auth dependency installed", async () => {
    const packageJson = JSON.parse(readFileSync(join(projectRoot, "package.json"), "utf-8"));
    const hasAuthDep = "@robinmordasiewicz/f5xc-auth" in (packageJson.dependencies || {});

    return {
      passed: hasAuthDep,
      message: hasAuthDep
        ? "f5xc-auth dependency found in package.json"
        : "f5xc-auth dependency NOT found",
      details: hasAuthDep
        ? `Version: ${packageJson.dependencies["@robinmordasiewicz/f5xc-auth"]}`
        : "Add @robinmordasiewicz/f5xc-auth to dependencies",
    };
  });

  await validate("Check f5xc-auth module resolves", async () => {
    const result = runCommand("node -e \"require.resolve('@robinmordasiewicz/f5xc-auth')\"", { silent: true });

    return {
      passed: result.success,
      message: result.success
        ? "f5xc-auth module resolves correctly"
        : "f5xc-auth module resolution failed",
      details: result.error,
    };
  });

  // ---------------------------------------------------------------------------
  // 2. TypeScript Compilation
  // ---------------------------------------------------------------------------
  await validate("TypeScript compilation", async () => {
    const result = runCommand("npm run typecheck", { silent: true });

    return {
      passed: result.success,
      message: result.success
        ? "TypeScript compilation successful"
        : "TypeScript compilation failed",
      details: result.error?.slice(0, 500),
    };
  });

  // ---------------------------------------------------------------------------
  // 3. Build
  // ---------------------------------------------------------------------------
  await validate("Build project", async () => {
    const result = runCommand("npm run build", { silent: true });

    return {
      passed: result.success,
      message: result.success ? "Build successful" : "Build failed",
      details: result.error?.slice(0, 500),
    };
  });

  // ---------------------------------------------------------------------------
  // 4. Unit Tests
  // ---------------------------------------------------------------------------
  await validate("Run unit tests", async () => {
    const result = runCommand("npm run test -- tests/unit/ --reporter=dot", { silent: true });

    // Extract test counts from output
    const passMatch = result.output.match(/(\d+) passed/);
    const failMatch = result.output.match(/(\d+) failed/);
    const passCount = passMatch ? parseInt(passMatch[1], 10) : 0;
    const failCount = failMatch ? parseInt(failMatch[1], 10) : 0;

    return {
      passed: result.success && failCount === 0,
      message: result.success
        ? `Unit tests passed (${passCount} tests)`
        : `Unit tests failed (${failCount} failures)`,
      details: result.error?.slice(0, 500),
    };
  });

  // ---------------------------------------------------------------------------
  // 5. Acceptance Tests
  // ---------------------------------------------------------------------------
  await validate("Run acceptance tests", async () => {
    const result = runCommand("npm run test -- tests/acceptance/ --reporter=dot", { silent: true });

    const passMatch = result.output.match(/(\d+) passed/);
    const failMatch = result.output.match(/(\d+) failed/);
    const passCount = passMatch ? parseInt(passMatch[1], 10) : 0;
    const failCount = failMatch ? parseInt(failMatch[1], 10) : 0;

    return {
      passed: result.success && failCount === 0,
      message: result.success
        ? `Acceptance tests passed (${passCount} tests)`
        : `Acceptance tests failed (${failCount} failures)`,
      details: result.error?.slice(0, 500),
    };
  });

  // ---------------------------------------------------------------------------
  // 6. Auth Package API Validation
  // ---------------------------------------------------------------------------
  await validate("Validate CredentialManager API", async () => {
    const testCode = `
      const { CredentialManager, AuthMode } = require('@robinmordasiewicz/f5xc-auth');

      // Test CredentialManager instantiation
      const cm = new CredentialManager();

      // Test methods exist
      const methods = ['initialize', 'reload', 'isAuthenticated', 'getAuthMode', 'getApiUrl', 'getTenant', 'getToken', 'getNamespace'];
      const missing = methods.filter(m => typeof cm[m] !== 'function');

      // Test AuthMode enum
      const modes = [AuthMode.NONE, AuthMode.TOKEN, AuthMode.CERTIFICATE];
      const validModes = modes.every(m => typeof m === 'string');

      if (missing.length > 0) {
        throw new Error('Missing methods: ' + missing.join(', '));
      }
      if (!validModes) {
        throw new Error('AuthMode enum values are not strings');
      }
      console.log('API validated successfully');
    `;

    const result = runCommand(`node -e "${testCode.replace(/\n/g, " ")}"`, { silent: true });

    return {
      passed: result.success,
      message: result.success
        ? "CredentialManager API validated"
        : "CredentialManager API validation failed",
      details: result.error,
    };
  });

  await validate("Validate ProfileManager API", async () => {
    const testCode = `
      const { getProfileManager } = require('@robinmordasiewicz/f5xc-auth');

      // Test ProfileManager access
      const pm = getProfileManager();

      // Test methods exist
      const methods = ['list', 'get', 'getActive', 'setActive'];
      const missing = methods.filter(m => typeof pm[m] !== 'function');

      if (missing.length > 0) {
        throw new Error('Missing methods: ' + missing.join(', '));
      }
      console.log('ProfileManager API validated successfully');
    `;

    const result = runCommand(`node -e "${testCode.replace(/\n/g, " ")}"`, { silent: true });

    return {
      passed: result.success,
      message: result.success
        ? "ProfileManager API validated"
        : "ProfileManager API validation failed",
      details: result.error,
    };
  });

  // ---------------------------------------------------------------------------
  // 7. Documentation Mode Validation
  // ---------------------------------------------------------------------------
  await validate("Documentation mode initialization", async () => {
    const testCode = `
      process.env.XDG_CONFIG_HOME = '/tmp/__nonexistent__';
      delete process.env.F5XC_API_URL;
      delete process.env.F5XC_API_TOKEN;

      const { CredentialManager, AuthMode } = require('@robinmordasiewicz/f5xc-auth');

      async function test() {
        const cm = new CredentialManager();
        await cm.initialize();

        if (cm.getAuthMode() !== AuthMode.NONE) {
          throw new Error('Expected NONE mode, got: ' + cm.getAuthMode());
        }
        if (cm.isAuthenticated()) {
          throw new Error('Should not be authenticated');
        }
        console.log('Documentation mode works correctly');
      }
      test().catch(e => { console.error(e.message); process.exit(1); });
    `;

    const result = runCommand(`node -e "${testCode.replace(/\n/g, " ")}"`, { silent: true });

    return {
      passed: result.success,
      message: result.success
        ? "Documentation mode initialization works"
        : "Documentation mode initialization failed",
      details: result.error,
    };
  });

  // ---------------------------------------------------------------------------
  // 8. Token Mode Validation
  // ---------------------------------------------------------------------------
  await validate("Token mode initialization", async () => {
    const testCode = `
      process.env.XDG_CONFIG_HOME = '/tmp/__nonexistent__';
      process.env.F5XC_API_URL = 'https://test.console.ves.volterra.io';
      process.env.F5XC_API_TOKEN = 'test-token';

      const { CredentialManager, AuthMode } = require('@robinmordasiewicz/f5xc-auth');

      async function test() {
        const cm = new CredentialManager();
        await cm.initialize();

        if (cm.getAuthMode() !== AuthMode.TOKEN) {
          throw new Error('Expected TOKEN mode, got: ' + cm.getAuthMode());
        }
        if (!cm.isAuthenticated()) {
          throw new Error('Should be authenticated');
        }
        if (cm.getTenant() !== 'test') {
          throw new Error('Expected tenant "test", got: ' + cm.getTenant());
        }
        console.log('Token mode works correctly');
      }
      test().catch(e => { console.error(e.message); process.exit(1); });
    `;

    const result = runCommand(`node -e "${testCode.replace(/\n/g, " ")}"`, { silent: true });

    return {
      passed: result.success,
      message: result.success
        ? "Token mode initialization works"
        : "Token mode initialization failed",
      details: result.error,
    };
  });

  // ---------------------------------------------------------------------------
  // 9. Server Creation Validation
  // ---------------------------------------------------------------------------
  await validate("Server creation in documentation mode", async () => {
    const testCode = `
      process.env.XDG_CONFIG_HOME = '/tmp/__nonexistent__';
      delete process.env.F5XC_API_URL;
      delete process.env.F5XC_API_TOKEN;

      const { createServer } = require('./dist/server.js');
      const { AuthMode } = require('@robinmordasiewicz/f5xc-auth');

      async function test() {
        const server = await createServer();
        const cm = server.getCredentialManager();

        if (cm.getAuthMode() !== AuthMode.NONE) {
          throw new Error('Expected NONE mode, got: ' + cm.getAuthMode());
        }
        console.log('Server creation works in documentation mode');
      }
      test().catch(e => { console.error(e.message); process.exit(1); });
    `;

    const result = runCommand(`node -e "${testCode.replace(/\n/g, " ")}"`, { silent: true });

    return {
      passed: result.success,
      message: result.success
        ? "Server creation in documentation mode works"
        : "Server creation failed",
      details: result.error,
    };
  });

  // ---------------------------------------------------------------------------
  // 10. Real API Test (Optional)
  // ---------------------------------------------------------------------------
  if (testRealApi) {
    await validate("Real API connectivity test", async () => {
      const apiUrl = process.env.F5XC_API_URL;
      const apiToken = process.env.F5XC_API_TOKEN;

      if (!apiUrl || !apiToken) {
        return {
          passed: false,
          message: "Missing F5XC_API_URL or F5XC_API_TOKEN",
          details: "Set environment variables to run real API tests",
        };
      }

      const testCode = `
        const { CredentialManager, AuthMode } = require('@robinmordasiewicz/f5xc-auth');

        async function test() {
          const cm = new CredentialManager();
          await cm.initialize();

          if (!cm.isAuthenticated()) {
            throw new Error('Not authenticated with provided credentials');
          }

          // Try to make a simple API call
          const https = require('https');
          const url = cm.getApiUrl() + '/web/namespaces';
          const token = cm.getToken();

          return new Promise((resolve, reject) => {
            const req = https.get(url, {
              headers: { 'Authorization': 'APIToken ' + token }
            }, (res) => {
              if (res.statusCode === 200) {
                resolve('API connection successful');
              } else {
                reject(new Error('API returned status: ' + res.statusCode));
              }
            });
            req.on('error', reject);
            req.setTimeout(10000, () => reject(new Error('Timeout')));
          });
        }
        test().then(console.log).catch(e => { console.error(e.message); process.exit(1); });
      `;

      const result = runCommand(`node -e "${testCode.replace(/\n/g, " ")}"`, { silent: true });

      return {
        passed: result.success,
        message: result.success
          ? "Real API connectivity verified"
          : "Real API connectivity failed",
        details: result.error,
      };
    });
  }

  // ---------------------------------------------------------------------------
  // SUMMARY
  // ---------------------------------------------------------------------------
  log(`\n${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  log(`${colors.cyan}  Validation Summary${colors.reset}`);
  log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);

  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;
  const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);

  log(`\n  ${colors.green}Passed:${colors.reset} ${passed}`);
  log(`  ${colors.red}Failed:${colors.reset} ${failed}`);
  log(`  ${colors.dim}Total:  ${results.length}${colors.reset}`);
  log(`  ${colors.dim}Time:   ${totalDuration}ms${colors.reset}`);

  if (failed > 0) {
    log(`\n${colors.red}  ✗ Some validations failed${colors.reset}`);
    log(`\n${colors.yellow}  Failed checks:${colors.reset}`);
    results
      .filter((r) => !r.passed)
      .forEach((r) => {
        log(`    • ${r.name}: ${r.message}`);
      });
    process.exit(1);
  } else {
    log(`\n${colors.green}  ✓ All validations passed${colors.reset}`);
    process.exit(0);
  }
}

main().catch((error) => {
  console.error(`${colors.red}Script error:${colors.reset}`, error);
  process.exit(2);
});
