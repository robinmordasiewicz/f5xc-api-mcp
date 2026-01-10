// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Documentation Test Helper Utilities
 *
 * Provides utilities for validating documentation accuracy
 * by executing CLI commands and parsing documentation files.
 */

import { spawn } from "child_process";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

/**
 * CLI command execution result
 */
export interface CliResult {
  /** Standard output */
  stdout: string;
  /** Standard error */
  stderr: string;
  /** Exit code */
  exitCode: number;
}

/**
 * CURL syntax validation result
 */
export interface CurlValidationResult {
  /** Whether syntax is valid */
  valid: boolean;
  /** Validation errors */
  errors: string[];
}

/**
 * Execute CLI command and capture output
 *
 * @param args - Command line arguments to pass to the CLI
 * @param options - Execution options
 * @returns Promise with stdout, stderr, and exitCode
 *
 * @example
 * ```typescript
 * const result = await runCliCommand(["--version"]);
 * expect(result.stdout).toContain("1.0.0");
 * ```
 */
export async function runCliCommand(
  args: string[],
  options?: { timeout?: number }
): Promise<CliResult> {
  const timeout = options?.timeout ?? 5000;

  return new Promise((resolve, reject) => {
    const child = spawn("node", ["dist/index.js", ...args], {
      cwd: process.cwd(),
      env: {
        ...process.env,
        // Use non-existent config directory to avoid loading real profiles
        XDG_CONFIG_HOME: "/tmp/__nonexistent_test_config__",
        // Disable colors for cleaner output parsing
        NO_COLOR: "1",
        // Suppress any debug logging
        LOG_LEVEL: "error",
      },
      timeout,
    });

    let stdout = "";
    let stderr = "";

    child.stdout?.on("data", (data: Buffer) => {
      stdout += data.toString();
    });

    child.stderr?.on("data", (data: Buffer) => {
      stderr += data.toString();
    });

    child.on("close", (code) => {
      resolve({ stdout, stderr, exitCode: code ?? 0 });
    });

    child.on("error", (error) => {
      reject(error);
    });
  });
}

/**
 * Validate CURL command syntax
 *
 * Checks for common syntax issues:
 * - Proper quoting
 * - Valid HTTP method
 * - URL presence
 * - Valid JSON in request bodies
 *
 * @param curl - CURL command string to validate
 * @returns Validation result with errors if any
 *
 * @example
 * ```typescript
 * const result = validateCurlSyntax('curl -X GET "https://example.com"');
 * expect(result.valid).toBe(true);
 * ```
 */
export function validateCurlSyntax(curl: string): CurlValidationResult {
  const errors: string[] = [];

  // Check starts with curl
  if (!curl.startsWith("curl ") && !curl.startsWith("curl\n") && !curl.startsWith("# ")) {
    // Allow comment-prefixed examples
    const firstNonComment = curl
      .split("\n")
      .find((line) => !line.startsWith("#") && line.trim() !== "");
    if (firstNonComment && !firstNonComment.startsWith("curl")) {
      errors.push("Command must start with 'curl'");
    }
  }

  // Check balanced quotes
  const singleQuotes = (curl.match(/'/g) || []).length;
  const doubleQuotes = (curl.match(/"/g) || []).length;

  if (singleQuotes % 2 !== 0) {
    errors.push("Unbalanced single quotes");
  }
  if (doubleQuotes % 2 !== 0) {
    errors.push("Unbalanced double quotes");
  }

  // Check HTTP method (should have -X METHOD)
  if (!curl.match(/-X\s+(GET|POST|PUT|DELETE|PATCH)/i)) {
    errors.push("Missing or invalid HTTP method (-X GET|POST|PUT|DELETE|PATCH)");
  }

  // Check URL present - allow template variables like ${TENANT} or {tenant}
  if (!curl.match(/"https?:\/\/[^"]+"|'https?:\/\/[^']+'/)) {
    errors.push("Missing or invalid URL in quotes");
  }

  // Check for valid JSON in -d flag if present
  const bodyMatch = curl.match(/-d\s+'([^']+)'/s);
  if (bodyMatch) {
    try {
      JSON.parse(bodyMatch[1]);
    } catch {
      // Allow template placeholders like ${...}
      if (!bodyMatch[1].includes("${")) {
        errors.push("Invalid JSON in request body (-d flag)");
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Parse markdown table into array of objects
 *
 * @param markdown - Markdown content containing a table
 * @returns Array of row objects with header keys
 *
 * @example
 * ```typescript
 * const table = parseMarkdownTable(`
 * | Name | Value |
 * |------|-------|
 * | foo  | bar   |
 * `);
 * expect(table[0].Name).toBe("foo");
 * ```
 */
export function parseMarkdownTable(markdown: string): Array<Record<string, string>> {
  const lines = markdown.split("\n");
  const results: Array<Record<string, string>> = [];

  let headers: string[] = [];
  let inTable = false;
  let separatorSeen = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Check if this is a table row
    if (trimmed.includes("|")) {
      const cells = trimmed
        .split("|")
        .map((c) => c.trim())
        .filter((c) => c !== "");

      if (!inTable) {
        // First row with | is the header
        headers = cells;
        inTable = true;
      } else if (trimmed.match(/^\|[\s-:|]+\|$/)) {
        // Separator row (|----|-----|)
        separatorSeen = true;
      } else if (separatorSeen) {
        // Data row
        const row: Record<string, string> = {};
        headers.forEach((header, i) => {
          row[header] = cells[i] ?? "";
        });
        results.push(row);
      }
    } else if (inTable && trimmed === "") {
      // Empty line ends the table
      break;
    }
  }

  return results;
}

/**
 * Extract environment variables from text
 *
 * Finds all F5XC_*, LOG_LEVEL, and NODE_ENV variables
 *
 * @param text - Text to search for environment variables
 * @returns Array of unique environment variable names
 */
export function extractEnvVarsFromText(text: string): string[] {
  const envVarPattern = /\b(F5XC_[A-Z_]+|LOG_LEVEL|NODE_ENV)\b/g;
  const matches = text.match(envVarPattern) || [];
  return [...new Set(matches)].sort();
}

/**
 * Read a file from the project root
 *
 * @param relativePath - Path relative to project root
 * @returns File content as string
 * @throws Error if file not found
 */
export function readProjectFile(relativePath: string): string {
  const fullPath = join(process.cwd(), relativePath);
  if (!existsSync(fullPath)) {
    throw new Error(`File not found: ${fullPath}`);
  }
  return readFileSync(fullPath, "utf-8");
}

/**
 * Check if a file exists in the project
 *
 * @param relativePath - Path relative to project root
 * @returns true if file exists
 */
export function projectFileExists(relativePath: string): boolean {
  const fullPath = join(process.cwd(), relativePath);
  return existsSync(fullPath);
}

/**
 * Parse package.json and return parsed object
 */
export function getPackageJson(): {
  name: string;
  version: string;
  scripts: Record<string, string>;
  [key: string]: unknown;
} {
  const content = readProjectFile("package.json");
  return JSON.parse(content) as {
    name: string;
    version: string;
    scripts: Record<string, string>;
  };
}

/**
 * Parse manifest.json and return parsed object
 */
export function getManifestJson(): {
  name: string;
  version: string;
  prompts?: Array<{
    name: string;
    description: string;
    arguments: string[];
    text: string;
  }>;
  tools?: Array<{
    name: string;
    description: string;
  }>;
  [key: string]: unknown;
} {
  const content = readProjectFile("manifest.json");
  return JSON.parse(content) as {
    name: string;
    version: string;
    prompts?: Array<{
      name: string;
      description: string;
      arguments: string[];
      text: string;
    }>;
    tools?: Array<{
      name: string;
      description: string;
    }>;
  };
}

/**
 * Validate template syntax for prompt text
 *
 * Checks that ${arguments.X} placeholders are properly formed
 *
 * @param text - Template text to validate
 * @returns Array of invalid placeholders (empty if all valid)
 */
export function validateTemplateVariables(text: string): string[] {
  const invalidPlaceholders: string[] = [];
  const placeholders = text.match(/\$\{[^}]+\}/g) || [];

  for (const placeholder of placeholders) {
    // Valid format: ${arguments.variableName}
    if (!placeholder.match(/^\$\{arguments\.\w+\}$/)) {
      invalidPlaceholders.push(placeholder);
    }
  }

  return invalidPlaceholders;
}

/**
 * Extract template variables from text
 *
 * @param text - Template text
 * @returns Array of variable names (without ${arguments.} prefix)
 */
export function extractTemplateVariables(text: string): string[] {
  const matches = text.match(/\$\{arguments\.(\w+)\}/g) || [];
  return matches.map((m) => m.replace(/\$\{arguments\.(\w+)\}/, "$1"));
}
