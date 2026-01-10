// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Acronym Normalization for F5XC API
 *
 * Handles consistent capitalization of technical acronyms in API
 * documentation, tool names, and descriptions.
 *
 * Acronyms are sourced from upstream x-f5xc-acronyms extension (v2.0.10+)
 */

import { getAcronyms, type AcronymEntry } from "../domain-metadata.js";

/**
 * Cached acronym map for case-insensitive lookup
 * Built lazily from upstream x-f5xc-acronyms data
 */
let acronymMap: Map<string, string> | null = null;

/**
 * Build the acronym map from upstream data
 */
function buildAcronymMap(): Map<string, string> {
  if (acronymMap) {
    return acronymMap;
  }

  const acronyms = getAcronyms();
  acronymMap = new Map(
    acronyms.map((entry: AcronymEntry) => [entry.acronym.toLowerCase(), entry.acronym])
  );

  return acronymMap;
}

/**
 * Get all technical acronyms as a simple string array
 * Sourced from upstream x-f5xc-acronyms extension
 */
export function getTechnicalAcronyms(): readonly string[] {
  const acronyms = getAcronyms();
  return Object.freeze(acronyms.map((entry: AcronymEntry) => entry.acronym));
}

/**
 * Check if a word is a known acronym
 *
 * @param word - Word to check
 * @returns True if the word is a known acronym
 */
export function isAcronym(word: string): boolean {
  const map = buildAcronymMap();
  return map.has(word.toLowerCase());
}

/**
 * Get the canonical form of an acronym
 *
 * @param word - Word to look up
 * @returns Canonical acronym form or null if not an acronym
 */
export function getCanonicalAcronym(word: string): string | null {
  const map = buildAcronymMap();
  return map.get(word.toLowerCase()) ?? null;
}

/**
 * Convert a string to kebab-case with normalized acronyms
 *
 * Used for tool naming: "HTTP Load Balancer" -> "http-loadbalancer"
 *
 * @param text - Input text
 * @returns Kebab-case string
 */
export function toKebabCase(text: string): string {
  return text
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1-$2") // camelCase to kebab
    .replace(/[\s_]+/g, "-") // spaces and underscores to hyphens
    .replace(/[^a-zA-Z0-9-]/g, "") // remove special characters
    .replace(/-+/g, "-") // collapse multiple hyphens
    .toLowerCase();
}

/**
 * Convert a string to snake_case with normalized acronyms
 *
 * Used for resource naming: "HTTP Load Balancer" -> "http_load_balancer"
 *
 * @param text - Input text
 * @returns Snake_case string
 */
export function toSnakeCase(text: string): string {
  return text
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1_$2") // camelCase to snake
    .replace(/[\s-]+/g, "_") // spaces and hyphens to underscores
    .replace(/[^a-zA-Z0-9_]/g, "") // remove special characters
    .replace(/_+/g, "_") // collapse multiple underscores
    .toLowerCase();
}

/**
 * Convert a string to PascalCase with normalized acronyms
 *
 * Used for TypeScript type names: "http load balancer" -> "HttpLoadBalancer"
 *
 * @param text - Input text
 * @returns PascalCase string
 */
export function toPascalCase(text: string): string {
  const map = buildAcronymMap();
  return text
    .trim()
    .split(/[\s_-]+/)
    .map((word) => {
      const acronym = map.get(word.toLowerCase());
      if (acronym) {
        // Keep acronyms as-is for PascalCase
        return acronym;
      }
      // Capitalize first letter
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
}

/**
 * Convert a string to camelCase with normalized acronyms
 *
 * Used for property names: "http load balancer" -> "httpLoadBalancer"
 *
 * @param text - Input text
 * @returns camelCase string
 */
export function toCamelCase(text: string): string {
  const pascal = toPascalCase(text);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

/**
 * Clear the acronym cache (useful for testing)
 */
export function clearAcronymCache(): void {
  acronymMap = null;
}
