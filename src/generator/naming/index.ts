/**
 * Naming Module - Export all naming utilities
 *
 * Pre-enriched specs from robinmordasiewicz/f5xc-api-enriched already have
 * naming transformations applied, so legacy transform functions have been removed.
 */

export {
  TECHNICAL_ACRONYMS,
  isAcronym,
  getCanonicalAcronym,
  toKebabCase,
  toSnakeCase,
  toPascalCase,
  toCamelCase,
} from "./acronyms.js";

export {
  generateToolName,
  extractResourceFromPath,
  methodToOperation,
} from "./volterra-mapping.js";
