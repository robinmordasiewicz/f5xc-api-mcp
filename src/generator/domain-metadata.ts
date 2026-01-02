/**
 * Domain Metadata Module
 *
 * Parses and exposes domain-level metadata from specs/index.json
 * as the single source of truth for domain descriptions, categories,
 * and resource mappings.
 */

import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * CLI metadata for quick start examples
 */
export interface CliMetadata {
  quick_start?: {
    command: string;
    description: string;
    expected_output: string;
  };
}

/**
 * Resource dependencies from upstream specs
 */
export interface ResourceDependencies {
  /** Resources that MUST exist before creating this resource */
  required: string[];
  /** Resources that are optional dependencies */
  optional: string[];
}

/**
 * Rich resource metadata from upstream specs (v1.0.84+)
 * Each primary_resource entry now contains detailed information
 */
export interface ResourceMetadata {
  /** Resource type name (e.g., "http_loadbalancer") */
  name: string;
  /** Full description of the resource */
  description: string;
  /** Short description for tooltips/brief contexts */
  descriptionShort: string;
  /** Required subscription tier for this resource */
  tier: string;
  /** Emoji icon for the resource */
  icon: string;
  /** Resource category (e.g., "Load Balancing", "Security") */
  category: string;
  /** Whether this resource supports log collection */
  supportsLogs: boolean;
  /** Whether this resource supports metrics collection */
  supportsMetrics: boolean;
  /** Resource dependencies */
  dependencies: ResourceDependencies;
  /** Human-readable relationship hints */
  relationshipHints: string[];
}

/**
 * Domain metadata from upstream specs index.json
 */
export interface DomainMetadata {
  /** Domain identifier (e.g., "network", "waf") */
  domain: string;
  /** Human-readable title */
  title: string;
  /** Full description (long form) */
  description: string;
  /** Short description for tooltips/brief contexts */
  descriptionShort: string;
  /** Medium-length description for summaries */
  descriptionMedium: string;
  /** Spec file name */
  file: string;
  /** Number of API paths */
  pathCount: number;
  /** Number of schemas */
  schemaCount: number;
  /** Complexity level */
  complexity: "simple" | "moderate" | "advanced";
  /** Preview/beta status */
  isPreview: boolean;
  /** Required subscription tier */
  requiresTier: "Standard" | "Advanced";
  /** High-level category (Platform, Security, etc.) */
  domainCategory: string;
  /** UI grouping category */
  uiCategory: string;
  /** Alternative names for the domain */
  aliases: string[];
  /** Use case descriptions */
  useCases: string[];
  /** Related domain names */
  relatedDomains: string[];
  /** Primary resource types with rich metadata (v1.0.84+) */
  primaryResources: ResourceMetadata[];
  /** Simple list of resource names for backward compatibility */
  primaryResourcesSimple: string[];
  /** Emoji icon */
  icon: string;
  /** SVG logo data URI */
  logoSvg?: string;
  /** CLI quick start metadata */
  cliMetadata?: CliMetadata;
}

/**
 * Spec index structure from specs/index.json
 */
export interface SpecIndex {
  version: string;
  timestamp: string;
  specifications: DomainMetadata[];
}

/**
 * Raw resource entry from JSON (snake_case)
 */
interface RawResourceEntry {
  name: string;
  description: string;
  description_short: string;
  tier: string;
  icon: string;
  category: string;
  supports_logs: boolean;
  supports_metrics: boolean;
  dependencies: {
    required: string[];
    optional: string[];
  };
  relationship_hints: string[];
}

/**
 * Raw specification entry from JSON (snake_case)
 */
interface RawSpecEntry {
  domain: string;
  title: string;
  description: string;
  description_short: string;
  description_medium: string;
  file: string;
  path_count: number;
  schema_count: number;
  complexity: string;
  is_preview: boolean;
  requires_tier: string;
  domain_category: string;
  ui_category: string;
  aliases: string[];
  use_cases: string[];
  related_domains: string[];
  primary_resources: RawResourceEntry[];
  primary_resources_simple: string[];
  icon: string;
  logo_svg?: string;
  cli_metadata?: {
    quick_start?: {
      command: string;
      description: string;
      expected_output: string;
    };
  };
}

interface RawSpecIndex {
  version: string;
  timestamp: string;
  specifications: RawSpecEntry[];
}

// Cache for loaded spec index
let cachedSpecIndex: SpecIndex | null = null;
let resourceToDomainCache: Map<string, DomainMetadata> | null = null;
let resourceMetadataCache: Map<string, ResourceMetadata> | null = null;
let aliasToDomainCache: Map<string, DomainMetadata> | null = null;

/**
 * Get the path to specs/index.json
 */
function getSpecIndexPath(): string {
  // Navigate from src/generator to specs/index.json
  return join(__dirname, "..", "..", "specs", "index.json");
}

/**
 * Transform raw resource entry (snake_case) to ResourceMetadata (camelCase)
 */
function transformResourceEntry(raw: RawResourceEntry): ResourceMetadata {
  return {
    name: raw.name,
    description: raw.description,
    descriptionShort: raw.description_short,
    tier: raw.tier,
    icon: raw.icon,
    category: raw.category,
    supportsLogs: raw.supports_logs,
    supportsMetrics: raw.supports_metrics,
    dependencies: {
      required: raw.dependencies?.required || [],
      optional: raw.dependencies?.optional || [],
    },
    relationshipHints: raw.relationship_hints || [],
  };
}

/**
 * Transform raw spec entry (snake_case) to DomainMetadata (camelCase)
 */
function transformSpecEntry(raw: RawSpecEntry): DomainMetadata {
  return {
    domain: raw.domain,
    title: raw.title,
    description: raw.description,
    descriptionShort: raw.description_short,
    descriptionMedium: raw.description_medium,
    file: raw.file,
    pathCount: raw.path_count,
    schemaCount: raw.schema_count,
    complexity: raw.complexity as "simple" | "moderate" | "advanced",
    isPreview: raw.is_preview,
    requiresTier: raw.requires_tier as "Standard" | "Advanced",
    domainCategory: raw.domain_category,
    uiCategory: raw.ui_category,
    aliases: raw.aliases || [],
    useCases: raw.use_cases || [],
    relatedDomains: raw.related_domains || [],
    primaryResources: (raw.primary_resources || []).map(transformResourceEntry),
    primaryResourcesSimple: raw.primary_resources_simple || [],
    icon: raw.icon,
    logoSvg: raw.logo_svg,
    cliMetadata: raw.cli_metadata,
  };
}

/**
 * Load and parse the spec index from specs/index.json
 * Results are cached for performance.
 */
export function loadSpecIndex(): SpecIndex {
  if (cachedSpecIndex) {
    return cachedSpecIndex;
  }

  const indexPath = getSpecIndexPath();

  if (!existsSync(indexPath)) {
    throw new Error(`Spec index not found at ${indexPath}. Run 'npm run sync-specs' first.`);
  }

  const content = readFileSync(indexPath, "utf-8");
  const raw: RawSpecIndex = JSON.parse(content);

  cachedSpecIndex = {
    version: raw.version,
    timestamp: raw.timestamp,
    specifications: raw.specifications.map(transformSpecEntry),
  };

  return cachedSpecIndex;
}

/**
 * Get metadata for a specific domain by name
 */
export function getDomainMetadata(domain: string): DomainMetadata | undefined {
  const index = loadSpecIndex();
  return index.specifications.find((spec) => spec.domain === domain);
}

/**
 * Get domain metadata by alias
 */
export function getDomainByAlias(alias: string): DomainMetadata | undefined {
  if (!aliasToDomainCache) {
    aliasToDomainCache = new Map();
    const index = loadSpecIndex();
    for (const spec of index.specifications) {
      for (const a of spec.aliases) {
        aliasToDomainCache.set(a.toLowerCase(), spec);
      }
      // Also add domain name itself
      aliasToDomainCache.set(spec.domain.toLowerCase(), spec);
    }
  }
  return aliasToDomainCache.get(alias.toLowerCase());
}

/**
 * Build the resource caches from spec index
 */
function buildResourceCaches(): void {
  if (resourceToDomainCache && resourceMetadataCache) {
    return;
  }

  resourceToDomainCache = new Map();
  resourceMetadataCache = new Map();
  const index = loadSpecIndex();

  for (const spec of index.specifications) {
    // Use rich primaryResources for full metadata
    for (const resource of spec.primaryResources) {
      // Normalize resource name (handle both snake_case and kebab-case)
      const normalized = resource.name.toLowerCase().replace(/-/g, "_");
      resourceToDomainCache.set(normalized, spec);
      resourceMetadataCache.set(normalized, resource);

      // Also add kebab-case version
      const kebab = resource.name.toLowerCase().replace(/_/g, "-");
      resourceToDomainCache.set(kebab, spec);
      resourceMetadataCache.set(kebab, resource);
    }

    // Also index from primaryResourcesSimple for backward compatibility
    for (const resourceName of spec.primaryResourcesSimple) {
      const normalized = resourceName.toLowerCase().replace(/-/g, "_");
      if (!resourceToDomainCache.has(normalized)) {
        resourceToDomainCache.set(normalized, spec);
      }
      const kebab = resourceName.toLowerCase().replace(/_/g, "-");
      if (!resourceToDomainCache.has(kebab)) {
        resourceToDomainCache.set(kebab, spec);
      }
    }
  }
}

/**
 * Get domain metadata by resource type
 * Uses primary_resources field to map resources to domains
 */
export function getResourceDomain(resourceType: string): DomainMetadata | undefined {
  buildResourceCaches();

  const normalized = resourceType.toLowerCase().replace(/-/g, "_");
  return (
    resourceToDomainCache!.get(normalized) ||
    resourceToDomainCache!.get(resourceType.toLowerCase().replace(/_/g, "-"))
  );
}

/**
 * Get rich metadata for a specific resource type
 * Returns detailed information including description, tier, dependencies, etc.
 */
export function getResourceMetadata(resourceType: string): ResourceMetadata | undefined {
  buildResourceCaches();

  const normalized = resourceType.toLowerCase().replace(/-/g, "_");
  return (
    resourceMetadataCache!.get(normalized) ||
    resourceMetadataCache!.get(resourceType.toLowerCase().replace(/_/g, "-"))
  );
}

/**
 * Get dependencies for a specific resource type
 * Returns required and optional dependency arrays
 */
export function getResourceDependencies(resourceType: string): ResourceDependencies | undefined {
  const metadata = getResourceMetadata(resourceType);
  return metadata?.dependencies;
}

/**
 * Get all domains in a specific category
 */
export function getDomainsByCategory(category: string): DomainMetadata[] {
  const index = loadSpecIndex();
  return index.specifications.filter(
    (spec) => spec.domainCategory.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get all domains by UI category
 */
export function getDomainsByUiCategory(uiCategory: string): DomainMetadata[] {
  const index = loadSpecIndex();
  return index.specifications.filter(
    (spec) => spec.uiCategory.toLowerCase() === uiCategory.toLowerCase()
  );
}

/**
 * Get all domain names
 */
export function getAllDomainNames(): string[] {
  const index = loadSpecIndex();
  return index.specifications.map((spec) => spec.domain);
}

/**
 * Get all unique domain categories
 */
export function getAllDomainCategories(): string[] {
  const index = loadSpecIndex();
  const categories = new Set(index.specifications.map((spec) => spec.domainCategory));
  return Array.from(categories).sort();
}

/**
 * Get all unique UI categories
 */
export function getAllUiCategories(): string[] {
  const index = loadSpecIndex();
  const categories = new Set(index.specifications.map((spec) => spec.uiCategory));
  return Array.from(categories).sort();
}

/**
 * Get a mapping of all resources to their domains
 */
export function getResourceToDomainMap(): Record<string, string> {
  const index = loadSpecIndex();
  const map: Record<string, string> = {};

  for (const spec of index.specifications) {
    // Use rich primaryResources with resource.name
    for (const resource of spec.primaryResources) {
      // Use kebab-case as the key (consistent with tool naming)
      const kebabCase = resource.name.toLowerCase().replace(/_/g, "-");
      map[kebabCase] = spec.domain;
    }

    // Also include primaryResourcesSimple for backward compatibility
    for (const resourceName of spec.primaryResourcesSimple) {
      const kebabCase = resourceName.toLowerCase().replace(/_/g, "-");
      if (!map[kebabCase]) {
        map[kebabCase] = spec.domain;
      }
    }
  }

  return map;
}

/**
 * Get spec version
 */
export function getSpecVersion(): string {
  const index = loadSpecIndex();
  return index.version;
}

/**
 * Clear all caches (useful for testing or after spec updates)
 */
export function clearMetadataCache(): void {
  cachedSpecIndex = null;
  resourceToDomainCache = null;
  resourceMetadataCache = null;
  aliasToDomainCache = null;
}
