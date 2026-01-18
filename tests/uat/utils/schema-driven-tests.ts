// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Schema-Driven Test Generation Utilities
 *
 * Programmatically generates test configurations and expectations
 * based on the OpenAPI spec metadata. This ensures tests stay in sync
 * with spec changes and recommended values.
 */

import {
  getResolvedRequestBodySchema,
  extractFieldDefaults,
  type ResolvedSchema,
} from "../../../src/tools/discovery/schema-loader.js";
import type { FieldDefaultMetadata } from "../../../src/generator/openapi-parser.js";

/**
 * Generated test case for a tool
 */
export interface GeneratedTestCase {
  name: string;
  description: string;
  config: Record<string, unknown>;
  expectedValid: boolean;
  serverAppliedDefaults: Array<{
    field: string;
    value: unknown;
  }>;
  recommendedValues: Array<{
    field: string;
    value: unknown;
  }>;
}

/**
 * Test matrix configuration
 */
export interface TestMatrixConfig {
  toolName: string;
  baseConfig: Record<string, unknown>;
  requiredFields: string[];
  optionalFieldVariants: Record<string, unknown[]>;
}

/**
 * Schema metadata for a tool
 */
export interface ToolSchemaMetadata {
  toolName: string;
  serverDefaults: FieldDefaultMetadata[];
  recommendedValues: FieldDefaultMetadata[];
  allDefaults: FieldDefaultMetadata[];
  schema: ResolvedSchema | null;
}

/**
 * Extract schema metadata for a tool
 * @param toolName - Full tool name (e.g., "f5xc-api-virtual-healthcheck-create")
 * @returns Schema metadata including defaults and recommended values
 */
export function getToolSchemaMetadata(toolName: string): ToolSchemaMetadata {
  const schema = getResolvedRequestBodySchema(toolName);
  const allDefaults = schema ? extractFieldDefaults(schema) : [];

  return {
    toolName,
    serverDefaults: allDefaults.filter((d) => d.isServerDefault),
    recommendedValues: allDefaults.filter((d) => d.recommendedValue !== undefined),
    allDefaults,
    schema,
  };
}

/**
 * Generate a minimal valid configuration using recommended values
 * @param toolName - Tool name
 * @param baseRequired - Base required fields configuration
 * @returns Configuration with recommended values applied
 */
export function generateRecommendedConfig(
  toolName: string,
  baseRequired: Record<string, unknown>
): Record<string, unknown> {
  const metadata = getToolSchemaMetadata(toolName);
  const config = JSON.parse(JSON.stringify(baseRequired)) as Record<string, unknown>;

  // Apply recommended values
  for (const rec of metadata.recommendedValues) {
    setNestedValue(config, rec.fieldPath, rec.recommendedValue);
  }

  return config;
}

/**
 * Generate test cases for a tool based on its schema
 * @param config - Test matrix configuration
 * @returns Array of generated test cases
 */
export function generateTestMatrix(config: TestMatrixConfig): GeneratedTestCase[] {
  const metadata = getToolSchemaMetadata(config.toolName);
  const testCases: GeneratedTestCase[] = [];

  // Test case 1: Minimal config (only required fields)
  testCases.push({
    name: "Minimal configuration (required fields only)",
    description: "Tests that server applies defaults for all omitted optional fields",
    config: JSON.parse(JSON.stringify(config.baseConfig)),
    expectedValid: true,
    serverAppliedDefaults: metadata.serverDefaults.map((d) => ({
      field: d.fieldPath,
      value: d.defaultValue,
    })),
    recommendedValues: metadata.recommendedValues.map((d) => ({
      field: d.fieldPath,
      value: d.recommendedValue,
    })),
  });

  // Test case 2: All recommended values
  const recommendedConfig = generateRecommendedConfig(config.toolName, config.baseConfig);
  testCases.push({
    name: "All recommended values",
    description: "Tests configuration with all UI-recommended values explicitly set",
    config: recommendedConfig,
    expectedValid: true,
    serverAppliedDefaults: [], // No defaults needed when values are explicit
    recommendedValues: metadata.recommendedValues.map((d) => ({
      field: d.fieldPath,
      value: d.recommendedValue,
    })),
  });

  // Test case 3: Generate variant test cases for optional fields
  for (const [fieldName, values] of Object.entries(config.optionalFieldVariants)) {
    for (const value of values) {
      const variantConfig = JSON.parse(JSON.stringify(config.baseConfig)) as Record<
        string,
        unknown
      >;
      setNestedValue(variantConfig, fieldName, value);

      testCases.push({
        name: `With ${fieldName} = ${JSON.stringify(value)}`,
        description: `Tests explicit ${fieldName} value overriding server default`,
        config: variantConfig,
        expectedValid: true,
        serverAppliedDefaults: metadata.serverDefaults
          .filter((d) => d.fieldPath !== fieldName)
          .map((d) => ({ field: d.fieldPath, value: d.defaultValue })),
        recommendedValues: [],
      });
    }
  }

  return testCases;
}

/**
 * Generate test cases for OneOf field patterns
 * @param toolName - Tool name
 * @param oneOfGroups - Array of OneOf group configurations
 * @returns Test cases for mutual exclusivity validation
 */
export function generateOneOfTests(
  toolName: string,
  oneOfGroups: Array<{
    name: string;
    options: string[];
    validConfigs: Record<string, unknown>[];
    invalidConfig?: Record<string, unknown>;
  }>
): GeneratedTestCase[] {
  const testCases: GeneratedTestCase[] = [];

  for (const group of oneOfGroups) {
    // Valid: Each option alone
    for (let i = 0; i < group.validConfigs.length; i++) {
      testCases.push({
        name: `${group.name}: ${group.options[i]} only`,
        description: `Tests that ${group.options[i]} is valid when specified alone`,
        config: group.validConfigs[i],
        expectedValid: true,
        serverAppliedDefaults: [],
        recommendedValues: [],
      });
    }

    // Invalid: Multiple options (if provided)
    if (group.invalidConfig) {
      testCases.push({
        name: `${group.name}: Multiple options (invalid)`,
        description: `Tests that specifying multiple mutually exclusive options produces warning`,
        config: group.invalidConfig,
        expectedValid: false, // Should warn about mutual exclusivity
        serverAppliedDefaults: [],
        recommendedValues: [],
      });
    }
  }

  return testCases;
}

/**
 * Generate plain language query test mappings
 * @param toolName - Tool name
 * @param queries - Natural language queries to test
 * @returns Test configuration for plain language tests
 */
export function generatePlainLanguageTests(
  toolName: string,
  queries: Array<{
    plainText: string;
    searchQuery: string;
    minimalConfig: Record<string, unknown>;
  }>
): Array<{
  query: string;
  searchQuery: string;
  config: Record<string, unknown>;
  metadata: ToolSchemaMetadata;
}> {
  const metadata = getToolSchemaMetadata(toolName);

  return queries.map((q) => ({
    query: q.plainText,
    searchQuery: q.searchQuery,
    config: q.minimalConfig,
    metadata,
  }));
}

/**
 * Set a nested value in an object using dot notation
 */
function setNestedValue(obj: Record<string, unknown>, path: string, value: unknown): void {
  const parts = path.split(".");
  let current = obj;

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!(part in current) || typeof current[part] !== "object") {
      current[part] = {};
    }
    current = current[part] as Record<string, unknown>;
  }

  current[parts[parts.length - 1]] = value;
}

/**
 * Get expected server defaults summary for documentation
 */
export function getServerDefaultsSummary(
  toolName: string
): Array<{ field: string; serverDefault: unknown; description: string }> {
  const metadata = getToolSchemaMetadata(toolName);

  return metadata.serverDefaults.map((d) => ({
    field: d.fieldPath,
    serverDefault: d.defaultValue,
    description: d.requiredForCreate
      ? "User-required but has server default"
      : "Server applies default if omitted",
  }));
}

/**
 * Get recommended values summary for documentation
 */
export function getRecommendedValuesSummary(
  toolName: string
): Array<{ field: string; recommended: unknown; serverDefault?: unknown }> {
  const metadata = getToolSchemaMetadata(toolName);

  return metadata.recommendedValues.map((d) => {
    const serverDefault = metadata.serverDefaults.find((s) => s.fieldPath === d.fieldPath);
    return {
      field: d.fieldPath,
      recommended: d.recommendedValue,
      serverDefault: serverDefault?.defaultValue,
    };
  });
}

/**
 * Validate that a configuration will work with server defaults
 * Returns what the server will apply
 */
export function analyzeConfigWithDefaults(
  toolName: string,
  config: Record<string, unknown>
): {
  providedFields: string[];
  serverWillApply: Array<{ field: string; value: unknown }>;
  matchesRecommended: Array<{ field: string; provided: unknown; recommended: unknown }>;
  belowRecommended: Array<{ field: string; provided: unknown; recommended: unknown }>;
} {
  const metadata = getToolSchemaMetadata(toolName);
  const providedFields: string[] = [];
  const serverWillApply: Array<{ field: string; value: unknown }> = [];
  const matchesRecommended: Array<{
    field: string;
    provided: unknown;
    recommended: unknown;
  }> = [];
  const belowRecommended: Array<{
    field: string;
    provided: unknown;
    recommended: unknown;
  }> = [];

  // Check what's provided
  for (const def of metadata.allDefaults) {
    const providedValue = getNestedValue(config, def.fieldPath);

    if (providedValue !== undefined) {
      providedFields.push(def.fieldPath);

      // Check against recommended
      if (def.recommendedValue !== undefined) {
        if (providedValue === def.recommendedValue) {
          matchesRecommended.push({
            field: def.fieldPath,
            provided: providedValue,
            recommended: def.recommendedValue,
          });
        } else if (
          typeof providedValue === "number" &&
          typeof def.recommendedValue === "number" &&
          providedValue < def.recommendedValue
        ) {
          belowRecommended.push({
            field: def.fieldPath,
            provided: providedValue,
            recommended: def.recommendedValue,
          });
        }
      }
    } else if (def.isServerDefault) {
      // Server will apply default
      serverWillApply.push({
        field: def.fieldPath,
        value: def.defaultValue,
      });
    }
  }

  return {
    providedFields,
    serverWillApply,
    matchesRecommended,
    belowRecommended,
  };
}

/**
 * Get nested value from object using dot notation
 */
function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = obj;

  for (const part of parts) {
    if (current === null || current === undefined) {
      return undefined;
    }
    if (typeof current !== "object") {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }

  return current;
}
