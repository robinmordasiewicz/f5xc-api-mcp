#!/usr/bin/env tsx
// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Validates that tool generation is consistent and complete
 *
 * This script:
 * 1. Parses specs from the specs/domains directory
 * 2. Checks that generated registry files exist
 * 3. Validates rich metadata extraction
 * 4. Reports coverage statistics
 *
 * Exit codes:
 *   0 - All validations passed
 *   1 - Validation failed
 */

import { join } from "path";
import { existsSync, readFileSync } from "fs";

// Import from the built output to validate the compiled code
const SPECS_DIR = join(process.cwd(), "specs", "domains");
const REGISTRY_FILE = join(process.cwd(), "src", "tools", "registry.ts");
const FIXTURES_FILE = join(process.cwd(), "tests", "fixtures", "generated.ts");

interface ValidationResult {
  passed: boolean;
  message: string;
  details?: string[];
}

const results: ValidationResult[] = [];

function addResult(name: string, result: ValidationResult): void {
  results.push({ ...result, message: `${name}: ${result.message}` });
}

async function main(): Promise<void> {
  console.log("🔍 Validating tool generation...\n");

  // 1. Check specs directory exists
  try {
    if (!existsSync(SPECS_DIR)) {
      addResult("Specs Directory", { passed: false, message: "specs/domains directory not found" });
    } else {
      addResult("Specs Directory", { passed: true, message: "exists" });
    }
  } catch (error) {
    addResult("Specs Directory", { passed: false, message: (error as Error).message });
  }

  // 2. Check registry file exists
  try {
    if (!existsSync(REGISTRY_FILE)) {
      addResult("Registry File", { passed: false, message: "src/tools/registry.ts not found - run npm run generate" });
    } else {
      addResult("Registry File", { passed: true, message: "exists" });
    }
  } catch (error) {
    addResult("Registry File", { passed: false, message: (error as Error).message });
  }

  // 3. Check fixtures file exists
  try {
    if (!existsSync(FIXTURES_FILE)) {
      addResult("Test Fixtures", {
        passed: false,
        message: "tests/fixtures/generated.ts not found - run npm run generate:fixtures",
      });
    } else {
      addResult("Test Fixtures", { passed: true, message: "exists" });
    }
  } catch (error) {
    addResult("Test Fixtures", { passed: false, message: (error as Error).message });
  }

  // 4. Validate registry content
  try {
    const content = readFileSync(REGISTRY_FILE, "utf-8");

    if (!content.includes("export const allTools")) {
      addResult("Registry Content", { passed: false, message: "missing allTools export" });
    } else if (!content.includes("export function getToolByName")) {
      addResult("Registry Content", { passed: false, message: "missing getToolByName export" });
    } else if (!content.includes("export function getAllDomains")) {
      addResult("Registry Content", { passed: false, message: "missing getAllDomains export" });
    } else {
      addResult("Registry Content", { passed: true, message: "has required exports" });
    }
  } catch (error) {
    addResult("Registry Content", { passed: false, message: (error as Error).message });
  }

  // 5. Validate fixtures content
  try {
    const content = readFileSync(FIXTURES_FILE, "utf-8");

    if (!content.includes("export const REGISTRY_STATS")) {
      addResult("Fixtures Content", { passed: false, message: "missing REGISTRY_STATS export" });
    } else if (!content.includes("export const FIRST_TOOL")) {
      addResult("Fixtures Content", { passed: false, message: "missing FIRST_TOOL export" });
    } else if (!content.includes("export const AVAILABLE_DOMAINS")) {
      addResult("Fixtures Content", { passed: false, message: "missing AVAILABLE_DOMAINS export" });
    } else {
      addResult("Fixtures Content", { passed: true, message: "has required exports" });
    }
  } catch (error) {
    addResult("Fixtures Content", { passed: false, message: (error as Error).message });
  }

  // 6. Extract and validate stats from fixtures
  try {
    const content = readFileSync(FIXTURES_FILE, "utf-8");

    const toolsMatch = content.match(/totalTools:\s*(\d+)/);
    const domainsMatch = content.match(/totalDomains:\s*(\d+)/);

    if (!toolsMatch || !domainsMatch) {
      addResult("Generation Statistics", { passed: false, message: "cannot parse statistics" });
    } else {
      const totalTools = parseInt(toolsMatch[1], 10);
      const totalDomains = parseInt(domainsMatch[1], 10);

      if (totalTools < 100) {
        addResult("Generation Statistics", {
          passed: false,
          message: `only ${totalTools} tools generated - expected 100+`,
        });
      } else if (totalDomains < 10) {
        addResult("Generation Statistics", {
          passed: false,
          message: `only ${totalDomains} domains found - expected 10+`,
        });
      } else {
        addResult("Generation Statistics", {
          passed: true,
          message: `${totalTools} tools across ${totalDomains} domains`,
        });
      }
    }
  } catch (error) {
    addResult("Generation Statistics", { passed: false, message: (error as Error).message });
  }

  // 7. Validate rich metadata coverage by importing at runtime
  try {
    // Dynamic import the registry
    const { allTools } = await import("../src/tools/registry.js");

    if (!allTools || !Array.isArray(allTools)) {
      addResult("Rich Metadata Coverage", { passed: false, message: "allTools is not an array" });
    } else {
      const total = allTools.length;

      interface ToolWithMetadata {
        dangerLevel: unknown;
        sideEffects: unknown;
        operationMetadata: unknown;
        parameterExamples: Record<string, unknown>;
      }

      const coverage = {
        dangerLevel: allTools.filter((t: ToolWithMetadata) => t.dangerLevel !== null).length,
        sideEffects: allTools.filter((t: ToolWithMetadata) => t.sideEffects !== null).length,
        operationMetadata: allTools.filter((t: ToolWithMetadata) => t.operationMetadata !== null).length,
        parameterExamples: allTools.filter(
          (t: ToolWithMetadata) => Object.keys(t.parameterExamples || {}).length > 0
        ).length,
      };

      const details = Object.entries(coverage).map(
        ([field, count]) => `${field}: ${count}/${total} (${((count / total) * 100).toFixed(1)}%)`
      );

      // At least dangerLevel or operationMetadata should have good coverage (50%+)
      const hasGoodCoverage = coverage.dangerLevel > total * 0.5 || coverage.operationMetadata > total * 0.5;

      addResult("Rich Metadata Coverage", {
        passed: hasGoodCoverage,
        message: hasGoodCoverage ? "good coverage" : "insufficient metadata coverage",
        details,
      });
    }
  } catch (error) {
    addResult("Rich Metadata Coverage", { passed: false, message: `import failed: ${(error as Error).message}` });
  }

  // Print results
  console.log("📊 Validation Results:\n");

  let allPassed = true;
  for (const result of results) {
    const icon = result.passed ? "✅" : "❌";
    console.log(`${icon} ${result.message}`);
    if (result.details) {
      for (const detail of result.details) {
        console.log(`   ${detail}`);
      }
    }
    if (!result.passed) allPassed = false;
  }

  console.log("");

  if (allPassed) {
    console.log("✅ All validations passed!\n");
    process.exit(0);
  } else {
    console.log("❌ Some validations failed!\n");
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
