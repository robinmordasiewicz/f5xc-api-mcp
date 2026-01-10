// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Naming Module - Export all naming utilities
 *
 * Pre-enriched specs from robinmordasiewicz/f5xc-api-enriched already have
 * naming transformations applied, so legacy transform functions have been removed.
 */

export {
  getTechnicalAcronyms,
  isAcronym,
  getCanonicalAcronym,
  toKebabCase,
  toSnakeCase,
  toPascalCase,
  toCamelCase,
  clearAcronymCache,
} from "./acronyms.js";

export {
  generateToolName,
  extractResourceFromPath,
  methodToOperation,
} from "./volterra-mapping.js";
