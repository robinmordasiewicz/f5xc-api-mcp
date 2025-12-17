/**
 * Naming Module - Export all naming utilities
 */

export {
  TECHNICAL_ACRONYMS,
  normalizeAcronyms,
  normalizeTitleAcronyms,
  isAcronym,
  getCanonicalAcronym,
  toKebabCase,
  toSnakeCase,
  toPascalCase,
  toCamelCase,
} from "./acronyms.js";

export {
  NAMESPACE_MAPPINGS,
  RESOURCE_MAPPINGS,
  FIELD_MAPPINGS,
  transformNamespace,
  transformResourceName,
  transformFieldName,
  transformText,
  transformOpenApiSpec,
  generateToolName,
  extractDomainFromPath,
  extractResourceFromPath,
  methodToOperation,
} from "./volterra-mapping.js";
