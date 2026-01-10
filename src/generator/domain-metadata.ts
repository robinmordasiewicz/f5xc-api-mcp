// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

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
 * Workflow step in a common workflow (v2.0.5+)
 */
export interface WorkflowStep {
  /** Step number in sequence */
  step: number;
  /** Command to execute */
  command: string;
  /** Description of what this step does */
  description: string;
}

/**
 * Common workflow for domain operations (v2.0.5+)
 */
export interface CommonWorkflow {
  /** Workflow name */
  name: string;
  /** Workflow description */
  description: string;
  /** Ordered steps to execute */
  steps: WorkflowStep[];
  /** Prerequisites before starting workflow */
  prerequisites?: string[];
  /** Expected outcome after workflow completion */
  expectedOutcome?: string;
}

/**
 * Troubleshooting guide for common issues (v2.0.5+)
 */
export interface TroubleshootingGuide {
  /** Problem description */
  problem: string;
  /** Observable symptoms */
  symptoms: string[];
  /** Commands to diagnose the issue */
  diagnosisCommands: string[];
  /** Possible solutions */
  solutions: string[];
}

/**
 * CLI metadata for quick start examples and workflows (v2.0.5+)
 */
export interface CliMetadata {
  quick_start?: {
    command: string;
    description: string;
    expected_output: string;
  };
  /** Common workflows for this domain */
  common_workflows?: CommonWorkflow[];
  /** Troubleshooting guides for common issues */
  troubleshooting?: TroubleshootingGuide[];
  /** Domain icon */
  icon?: string;
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
  /** Use case descriptions */
  useCases: string[];
  /** Related domain names */
  relatedDomains: string[];
  /** Primary resource types with rich metadata */
  primaryResources: ResourceMetadata[];
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
 * Raw specification entry from JSON (v2.0.0+ x-f5xc-* namespace)
 * Note: Nested resource objects still use snake_case internally
 */
interface RawSpecEntry {
  domain: string;
  title: string;
  description: string;
  file: string;
  path_count: number;
  schema_count: number;
  // x-f5xc-* prefixed fields (v2.0.0+)
  "x-f5xc-description-short": string;
  "x-f5xc-description-medium": string;
  "x-f5xc-complexity": string;
  "x-f5xc-is-preview": boolean;
  "x-f5xc-requires-tier": string;
  "x-f5xc-category": string; // Replaces both domain_category and ui_category
  "x-f5xc-use-cases": string[];
  "x-f5xc-related-domains": string[];
  "x-f5xc-icon": string;
  "x-f5xc-logo-svg"?: string;
  "x-f5xc-primary-resources": RawResourceEntry[];
  "x-f5xc-primary-resources-simple": string[];
  // x-f5xc-cli-metadata (v2.0.5+) contains structured CLI guidance
  "x-f5xc-cli-metadata"?: {
    quick_start?: {
      command: string;
      description: string;
      expected_output: string;
    };
    common_workflows?: Array<{
      name: string;
      description: string;
      steps: Array<{
        step: number;
        command: string;
        description: string;
      }>;
      prerequisites?: string[];
      expected_outcome?: string;
    }>;
    troubleshooting?: Array<{
      problem: string;
      symptoms: string[];
      diagnosis_commands: string[];
      solutions: string[];
    }>;
    icon?: string;
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
 * Transform raw CLI metadata to camelCase CliMetadata (v2.0.5+)
 */
function transformCliMetadata(raw: RawSpecEntry["x-f5xc-cli-metadata"]): CliMetadata | undefined {
  if (!raw) return undefined;

  return {
    quick_start: raw.quick_start,
    common_workflows: raw.common_workflows?.map((wf) => ({
      name: wf.name,
      description: wf.description,
      steps: wf.steps.map((s) => ({
        step: s.step,
        command: s.command,
        description: s.description,
      })),
      prerequisites: wf.prerequisites,
      expectedOutcome: wf.expected_outcome,
    })),
    troubleshooting: raw.troubleshooting?.map((ts) => ({
      problem: ts.problem,
      symptoms: ts.symptoms,
      diagnosisCommands: ts.diagnosis_commands,
      solutions: ts.solutions,
    })),
    icon: raw.icon,
  };
}

/**
 * Transform raw spec entry (x-f5xc-* namespace) to DomainMetadata (camelCase)
 * v2.0.0+: x-f5xc-category replaces both domain_category and ui_category
 * v2.0.5+: x-f5xc-cli-metadata contains workflows and troubleshooting
 */
function transformSpecEntry(raw: RawSpecEntry): DomainMetadata {
  // x-f5xc-category is a DRY consolidation of domain_category and ui_category
  const category = raw["x-f5xc-category"];

  return {
    domain: raw.domain,
    title: raw.title,
    description: raw.description,
    descriptionShort: raw["x-f5xc-description-short"],
    descriptionMedium: raw["x-f5xc-description-medium"],
    file: raw.file,
    pathCount: raw.path_count,
    schemaCount: raw.schema_count,
    complexity: raw["x-f5xc-complexity"] as "simple" | "moderate" | "advanced",
    isPreview: raw["x-f5xc-is-preview"],
    requiresTier: raw["x-f5xc-requires-tier"] as "Standard" | "Advanced",
    domainCategory: category, // From x-f5xc-category
    uiCategory: category, // From x-f5xc-category (same value, DRY consolidation)
    useCases: raw["x-f5xc-use-cases"] || [],
    relatedDomains: raw["x-f5xc-related-domains"] || [],
    primaryResources: (raw["x-f5xc-primary-resources"] || []).map(transformResourceEntry),
    icon: raw["x-f5xc-icon"],
    logoSvg: raw["x-f5xc-logo-svg"],
    cliMetadata: transformCliMetadata(raw["x-f5xc-cli-metadata"]),
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
    for (const resource of spec.primaryResources) {
      // Use kebab-case as the key (consistent with tool naming)
      const kebabCase = resource.name.toLowerCase().replace(/_/g, "-");
      map[kebabCase] = spec.domain;
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
  cachedGuidedWorkflows = null;
  cachedErrorResolution = null;
  cachedCriticalResources = null;
  cachedAcronyms = null;
}

// ============================================================================
// Upstream Extensions (v2.0.8+)
// x-f5xc-guided-workflows, x-f5xc-error-resolution, x-f5xc-critical-resources
// ============================================================================

/**
 * Guided workflow step from upstream x-f5xc-guided-workflows (v2.0.8+)
 */
export interface GuidedWorkflowStep {
  order: number;
  action: string;
  name: string;
  description: string;
  resource?: string;
  requiredFields?: string[];
  dependsOn?: number[];
  tips?: string[];
  verification?: string[];
  optional?: boolean;
}

/**
 * Guided workflow from upstream x-f5xc-guided-workflows (v2.0.8+)
 */
export interface GuidedWorkflow {
  id: string;
  name: string;
  description: string;
  complexity: "low" | "medium" | "high";
  estimatedSteps: number;
  prerequisites: string[];
  steps: GuidedWorkflowStep[];
  domain: string;
}

/**
 * HTTP error diagnostic step from upstream x-f5xc-error-resolution (v2.0.8+)
 */
export interface ErrorDiagnosticStep {
  step: number;
  action: string;
  description: string;
  command?: string;
}

/**
 * HTTP error resolution from upstream x-f5xc-error-resolution (v2.0.8+)
 */
export interface HttpErrorResolution {
  code: number;
  name: string;
  description: string;
  commonCauses: string[];
  diagnosticSteps: ErrorDiagnosticStep[];
  prevention: string[];
  relatedErrors: number[];
}

/**
 * Resource-specific error pattern from upstream x-f5xc-error-resolution (v2.0.8+)
 */
export interface ResourceErrorPattern {
  errorCode: number;
  pattern: string;
  resolution: string;
}

/**
 * Error resolution index structure (v2.0.8+)
 */
export interface ErrorResolutionIndex {
  version: string;
  httpErrors: Map<number, HttpErrorResolution>;
  resourceErrors: Map<string, ResourceErrorPattern[]>;
}

/**
 * Guided workflows index structure (v2.0.8+)
 */
export interface GuidedWorkflowsIndex {
  version: string;
  totalWorkflows: number;
  domains: string[];
  workflows: GuidedWorkflow[];
}

/**
 * Technical acronym entry from upstream x-f5xc-acronyms (v2.0.10+)
 */
export interface AcronymEntry {
  /** The acronym (e.g., "TCP", "WAF") */
  acronym: string;
  /** Full expansion (e.g., "Transmission Control Protocol") */
  expansion: string;
  /** Category (e.g., "Networking", "Security") */
  category: string;
}

/**
 * Acronyms extension index structure (v2.0.10+)
 */
export interface AcronymsIndex {
  version: string;
  categories: string[];
  acronyms: AcronymEntry[];
}

// Raw types for JSON parsing
interface RawGuidedWorkflowStep {
  order: number;
  action: string;
  name: string;
  description: string;
  resource?: string;
  required_fields?: string[];
  depends_on?: number[];
  tips?: string[];
  verification?: string[];
  optional?: boolean;
}

interface RawGuidedWorkflow {
  id: string;
  name: string;
  description: string;
  complexity: string;
  estimated_steps: number;
  prerequisites: string[];
  steps: RawGuidedWorkflowStep[];
  domain: string;
}

interface RawGuidedWorkflowsExtension {
  version: string;
  total_workflows: number;
  domains: string[];
  workflows: RawGuidedWorkflow[];
}

interface RawErrorDiagnosticStep {
  step: number;
  action: string;
  description: string;
  command?: string;
}

interface RawHttpError {
  code: number;
  name: string;
  description: string;
  common_causes: string[];
  diagnostic_steps: RawErrorDiagnosticStep[];
  prevention: string[];
  related_errors: number[];
}

interface RawResourceError {
  error_code: number;
  pattern: string;
  resolution: string;
}

interface RawErrorResolutionExtension {
  version: string;
  http_errors: Record<string, RawHttpError>;
  resource_errors: Record<string, RawResourceError[]>;
}

/**
 * Raw acronym entry from JSON (snake_case)
 */
interface RawAcronymEntry {
  acronym: string;
  expansion: string;
  category: string;
}

/**
 * Raw acronyms extension from JSON (v2.0.10+)
 */
interface RawAcronymsExtension {
  version: string;
  categories: string[];
  acronyms: RawAcronymEntry[];
}

interface RawSpecIndexWithExtensions extends RawSpecIndex {
  "x-f5xc-guided-workflows"?: RawGuidedWorkflowsExtension;
  "x-f5xc-error-resolution"?: RawErrorResolutionExtension;
  "x-f5xc-critical-resources"?: string[];
  "x-f5xc-acronyms"?: RawAcronymsExtension;
}

// Caches for new extensions
let cachedGuidedWorkflows: GuidedWorkflowsIndex | null = null;
let cachedErrorResolution: ErrorResolutionIndex | null = null;
let cachedCriticalResources: string[] | null = null;
let cachedAcronyms: AcronymsIndex | null = null;

/**
 * Transform raw guided workflow step to camelCase
 */
function transformGuidedWorkflowStep(raw: RawGuidedWorkflowStep): GuidedWorkflowStep {
  return {
    order: raw.order,
    action: raw.action,
    name: raw.name,
    description: raw.description,
    resource: raw.resource,
    requiredFields: raw.required_fields,
    dependsOn: raw.depends_on,
    tips: raw.tips,
    verification: raw.verification,
    optional: raw.optional,
  };
}

/**
 * Transform raw guided workflow to camelCase
 */
function transformGuidedWorkflow(raw: RawGuidedWorkflow): GuidedWorkflow {
  return {
    id: raw.id,
    name: raw.name,
    description: raw.description,
    complexity: raw.complexity as "low" | "medium" | "high",
    estimatedSteps: raw.estimated_steps,
    prerequisites: raw.prerequisites || [],
    steps: raw.steps.map(transformGuidedWorkflowStep),
    domain: raw.domain,
  };
}

/**
 * Load the raw spec index including extensions
 */
function loadRawSpecIndexWithExtensions(): RawSpecIndexWithExtensions {
  const indexPath = getSpecIndexPath();

  if (!existsSync(indexPath)) {
    throw new Error(`Spec index not found at ${indexPath}. Run 'npm run sync-specs' first.`);
  }

  const content = readFileSync(indexPath, "utf-8");
  return JSON.parse(content) as RawSpecIndexWithExtensions;
}

/**
 * Load guided workflows from upstream specs (v2.0.8+)
 */
export function loadGuidedWorkflows(): GuidedWorkflowsIndex {
  if (cachedGuidedWorkflows) {
    return cachedGuidedWorkflows;
  }

  const raw = loadRawSpecIndexWithExtensions();
  const ext = raw["x-f5xc-guided-workflows"];

  if (!ext) {
    cachedGuidedWorkflows = {
      version: "0.0.0",
      totalWorkflows: 0,
      domains: [],
      workflows: [],
    };
    return cachedGuidedWorkflows;
  }

  cachedGuidedWorkflows = {
    version: ext.version,
    totalWorkflows: ext.total_workflows,
    domains: ext.domains || [],
    workflows: ext.workflows.map(transformGuidedWorkflow),
  };

  return cachedGuidedWorkflows;
}

/**
 * Get all guided workflows, optionally filtered by domain
 */
export function getGuidedWorkflows(domain?: string): GuidedWorkflow[] {
  const index = loadGuidedWorkflows();

  if (domain) {
    return index.workflows.filter((w) => w.domain === domain);
  }

  return index.workflows;
}

/**
 * Get a specific guided workflow by ID
 */
export function getGuidedWorkflowById(id: string): GuidedWorkflow | undefined {
  const index = loadGuidedWorkflows();
  return index.workflows.find((w) => w.id === id);
}

/**
 * Get all domains that have guided workflows
 */
export function getDomainsWithWorkflows(): string[] {
  const index = loadGuidedWorkflows();
  return index.domains;
}

/**
 * Load error resolution data from upstream specs (v2.0.8+)
 */
export function loadErrorResolution(): ErrorResolutionIndex {
  if (cachedErrorResolution) {
    return cachedErrorResolution;
  }

  const raw = loadRawSpecIndexWithExtensions();
  const ext = raw["x-f5xc-error-resolution"];

  if (!ext) {
    cachedErrorResolution = {
      version: "0.0.0",
      httpErrors: new Map(),
      resourceErrors: new Map(),
    };
    return cachedErrorResolution;
  }

  const httpErrors = new Map<number, HttpErrorResolution>();
  for (const [codeStr, error] of Object.entries(ext.http_errors)) {
    const code = parseInt(codeStr, 10);
    httpErrors.set(code, {
      code: error.code,
      name: error.name,
      description: error.description,
      commonCauses: error.common_causes || [],
      diagnosticSteps: (error.diagnostic_steps || []).map((s) => ({
        step: s.step,
        action: s.action,
        description: s.description,
        command: s.command,
      })),
      prevention: error.prevention || [],
      relatedErrors: error.related_errors || [],
    });
  }

  const resourceErrors = new Map<string, ResourceErrorPattern[]>();
  for (const [resource, errors] of Object.entries(ext.resource_errors)) {
    resourceErrors.set(
      resource,
      errors.map((e) => ({
        errorCode: e.error_code,
        pattern: e.pattern,
        resolution: e.resolution,
      }))
    );
  }

  cachedErrorResolution = {
    version: ext.version,
    httpErrors,
    resourceErrors,
  };

  return cachedErrorResolution;
}

/**
 * Get HTTP error resolution by status code (v2.0.8+)
 */
export function getHttpErrorResolution(statusCode: number): HttpErrorResolution | undefined {
  const index = loadErrorResolution();
  return index.httpErrors.get(statusCode);
}

/**
 * Get all HTTP error codes with resolutions
 */
export function getAllHttpErrorCodes(): number[] {
  const index = loadErrorResolution();
  return Array.from(index.httpErrors.keys()).sort((a, b) => a - b);
}

/**
 * Get resource-specific error patterns (v2.0.8+)
 */
export function getResourceErrorPatterns(resourceType: string): ResourceErrorPattern[] {
  const index = loadErrorResolution();
  const normalized = resourceType.toLowerCase().replace(/-/g, "_");
  return index.resourceErrors.get(normalized) || [];
}

/**
 * Get all resources with error patterns
 */
export function getResourcesWithErrorPatterns(): string[] {
  const index = loadErrorResolution();
  return Array.from(index.resourceErrors.keys());
}

/**
 * Load critical resources list from upstream specs (v2.0.8+)
 */
export function loadCriticalResources(): string[] {
  if (cachedCriticalResources) {
    return cachedCriticalResources;
  }

  const raw = loadRawSpecIndexWithExtensions();
  cachedCriticalResources = raw["x-f5xc-critical-resources"] || [];
  return cachedCriticalResources;
}

/**
 * Check if a resource is considered critical
 */
export function isCriticalResource(resourceType: string): boolean {
  const critical = loadCriticalResources();
  const normalized = resourceType.toLowerCase().replace(/-/g, "_");
  return critical.some((r) => r.toLowerCase().replace(/-/g, "_") === normalized);
}

// ============================================================================
// Acronyms Extension (v2.0.10+)
// x-f5xc-acronyms - Technical acronym definitions for consistent capitalization
// ============================================================================

/**
 * Load acronyms from upstream specs (v2.0.10+)
 */
export function loadAcronyms(): AcronymsIndex {
  if (cachedAcronyms) {
    return cachedAcronyms;
  }

  const raw = loadRawSpecIndexWithExtensions();
  const ext = raw["x-f5xc-acronyms"];

  if (!ext) {
    cachedAcronyms = {
      version: "0.0.0",
      categories: [],
      acronyms: [],
    };
    return cachedAcronyms;
  }

  cachedAcronyms = {
    version: ext.version,
    categories: ext.categories || [],
    acronyms: ext.acronyms || [],
  };

  return cachedAcronyms;
}

/**
 * Get all technical acronyms from upstream specs (v2.0.10+)
 */
export function getAcronyms(): AcronymEntry[] {
  const index = loadAcronyms();
  return index.acronyms;
}

/**
 * Get all acronym categories from upstream specs (v2.0.10+)
 */
export function getAcronymCategories(): string[] {
  const index = loadAcronyms();
  return index.categories;
}

/**
 * Get acronyms by category (v2.0.10+)
 */
export function getAcronymsByCategory(category: string): AcronymEntry[] {
  const index = loadAcronyms();
  return index.acronyms.filter((a) => a.category.toLowerCase() === category.toLowerCase());
}

/**
 * Get a specific acronym by name (case-insensitive) (v2.0.10+)
 */
export function getAcronymByName(name: string): AcronymEntry | undefined {
  const index = loadAcronyms();
  return index.acronyms.find((a) => a.acronym.toLowerCase() === name.toLowerCase());
}

/**
 * Get acronyms version (v2.0.10+)
 */
export function getAcronymsVersion(): string {
  const index = loadAcronyms();
  return index.version;
}
