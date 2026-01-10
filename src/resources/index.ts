// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Resources Module - Export all resource utilities
 */

export {
  RESOURCE_SCHEMES,
  RESOURCE_TYPES,
  buildResourceUri,
  parseResourceUri,
  getResourceType,
  getResourceTypesByTier,
  buildApiPath,
  enhanceWithDomainContext,
  getEnhancedResourceTypes,
  clearEnhancedTypesCache,
} from "./templates.js";

export type { ResourceType } from "./templates.js";

export { ResourceHandler, createResourceHandler } from "./handlers.js";

export type { ResourceReadResult, ResourceDocumentation } from "./handlers.js";
