// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Unit Tests for Domain Metadata Module
 *
 * Tests the domain metadata functions that parse and expose metadata
 * from specs/index.json as the single source of truth.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  loadSpecIndex,
  getDomainMetadata,
  getResourceDomain,
  getResourceMetadata,
  getResourceDependencies,
  getDomainsByCategory,
  getDomainsByUiCategory,
  getAllDomainNames,
  getAllDomainCategories,
  getAllUiCategories,
  getResourceToDomainMap,
  getSpecVersion,
  clearMetadataCache,
  loadGuidedWorkflows,
  getGuidedWorkflows,
  getGuidedWorkflowById,
  getDomainsWithWorkflows,
  loadErrorResolution,
  getHttpErrorResolution,
  getAllHttpErrorCodes,
  getResourceErrorPatterns,
  getResourcesWithErrorPatterns,
  loadCriticalResources,
  isCriticalResource,
  loadAcronyms,
  getAcronyms,
  getAcronymCategories,
  getAcronymsByCategory,
  getAcronymByName,
  getAcronymsVersion,
  type DomainMetadata,
  type ResourceMetadata,
} from "../../../src/generator/domain-metadata.js";

describe("domain-metadata", () => {
  beforeEach(() => {
    // Clear cache before each test to ensure clean state
    clearMetadataCache();
  });

  afterEach(() => {
    clearMetadataCache();
  });

  describe("loadSpecIndex", () => {
    it("should load spec index successfully", () => {
      const index = loadSpecIndex();

      expect(index).toBeDefined();
      expect(index.version).toBeDefined();
      expect(index.timestamp).toBeDefined();
      expect(index.specifications).toBeInstanceOf(Array);
      expect(index.specifications.length).toBeGreaterThan(0);
    });

    it("should cache the spec index on subsequent calls", () => {
      const index1 = loadSpecIndex();
      const index2 = loadSpecIndex();

      // Should be the same reference due to caching
      expect(index1).toBe(index2);
    });

    it("should return specifications with required fields", () => {
      const index = loadSpecIndex();
      const spec = index.specifications[0];

      expect(spec).toHaveProperty("domain");
      expect(spec).toHaveProperty("title");
      expect(spec).toHaveProperty("description");
      expect(spec).toHaveProperty("file");
      expect(spec).toHaveProperty("pathCount");
      expect(spec).toHaveProperty("schemaCount");
    });
  });

  describe("getDomainMetadata", () => {
    it("should return metadata for a valid domain", () => {
      const metadata = getDomainMetadata("virtual");

      expect(metadata).toBeDefined();
      expect(metadata?.domain).toBe("virtual");
      expect(metadata?.title).toBeDefined();
    });

    it("should return undefined for an invalid domain", () => {
      const metadata = getDomainMetadata("nonexistent_domain_xyz");

      expect(metadata).toBeUndefined();
    });

    it("should return complete domain metadata structure", () => {
      const index = loadSpecIndex();
      const firstDomain = index.specifications[0].domain;
      const metadata = getDomainMetadata(firstDomain);

      expect(metadata).toHaveProperty("domain");
      expect(metadata).toHaveProperty("title");
      expect(metadata).toHaveProperty("description");
      expect(metadata).toHaveProperty("descriptionShort");
      expect(metadata).toHaveProperty("descriptionMedium");
      expect(metadata).toHaveProperty("complexity");
      expect(metadata).toHaveProperty("domainCategory");
      expect(metadata).toHaveProperty("uiCategory");
      expect(metadata).toHaveProperty("primaryResources");
    });

    it("should return domain with primary resources", () => {
      // Get a domain that has primary resources
      const index = loadSpecIndex();
      const domainWithResources = index.specifications.find(
        (s) => s.primaryResources && s.primaryResources.length > 0
      );

      if (domainWithResources) {
        const metadata = getDomainMetadata(domainWithResources.domain);
        expect(metadata?.primaryResources.length).toBeGreaterThan(0);
        expect(metadata?.primaryResources[0]).toHaveProperty("name");
        expect(metadata?.primaryResources[0]).toHaveProperty("description");
      }
    });
  });

  describe("getResourceDomain", () => {
    it("should return domain for a valid resource type", () => {
      // First, get a known resource from the spec
      const index = loadSpecIndex();
      const domainWithResource = index.specifications.find(
        (s) => s.primaryResources && s.primaryResources.length > 0
      );

      if (domainWithResource) {
        const resourceName = domainWithResource.primaryResources[0].name;
        const domain = getResourceDomain(resourceName);

        expect(domain).toBeDefined();
        expect(domain?.domain).toBe(domainWithResource.domain);
      }
    });

    it("should handle kebab-case resource names", () => {
      const index = loadSpecIndex();
      const domainWithResource = index.specifications.find(
        (s) => s.primaryResources && s.primaryResources.length > 0
      );

      if (domainWithResource) {
        // Convert snake_case to kebab-case
        const resourceName = domainWithResource.primaryResources[0].name
          .toLowerCase()
          .replace(/_/g, "-");
        const domain = getResourceDomain(resourceName);

        expect(domain).toBeDefined();
      }
    });

    it("should return undefined for unknown resource", () => {
      const domain = getResourceDomain("completely_unknown_resource_type_xyz");

      expect(domain).toBeUndefined();
    });
  });

  describe("getResourceMetadata", () => {
    it("should return metadata for a valid resource", () => {
      const index = loadSpecIndex();
      const domainWithResource = index.specifications.find(
        (s) => s.primaryResources && s.primaryResources.length > 0
      );

      if (domainWithResource) {
        const resourceName = domainWithResource.primaryResources[0].name;
        const metadata = getResourceMetadata(resourceName);

        expect(metadata).toBeDefined();
        expect(metadata?.name).toBe(resourceName);
      }
    });

    it("should return resource with all expected fields", () => {
      const index = loadSpecIndex();
      const domainWithResource = index.specifications.find(
        (s) => s.primaryResources && s.primaryResources.length > 0
      );

      if (domainWithResource) {
        const resourceName = domainWithResource.primaryResources[0].name;
        const metadata = getResourceMetadata(resourceName);

        expect(metadata).toHaveProperty("name");
        expect(metadata).toHaveProperty("description");
        expect(metadata).toHaveProperty("descriptionShort");
        expect(metadata).toHaveProperty("tier");
        expect(metadata).toHaveProperty("icon");
        expect(metadata).toHaveProperty("category");
        expect(metadata).toHaveProperty("supportsLogs");
        expect(metadata).toHaveProperty("supportsMetrics");
        expect(metadata).toHaveProperty("dependencies");
        expect(metadata).toHaveProperty("relationshipHints");
      }
    });

    it("should return undefined for unknown resource", () => {
      const metadata = getResourceMetadata("unknown_resource_xyz_123");

      expect(metadata).toBeUndefined();
    });
  });

  describe("getResourceDependencies", () => {
    it("should return dependencies for a resource with dependencies", () => {
      const index = loadSpecIndex();

      // Find a resource that has dependencies
      let resourceWithDeps: string | null = null;
      for (const spec of index.specifications) {
        for (const resource of spec.primaryResources) {
          if (
            resource.dependencies.required.length > 0 ||
            resource.dependencies.optional.length > 0
          ) {
            resourceWithDeps = resource.name;
            break;
          }
        }
        if (resourceWithDeps) break;
      }

      if (resourceWithDeps) {
        const deps = getResourceDependencies(resourceWithDeps);

        expect(deps).toBeDefined();
        expect(deps).toHaveProperty("required");
        expect(deps).toHaveProperty("optional");
        expect(Array.isArray(deps?.required)).toBe(true);
        expect(Array.isArray(deps?.optional)).toBe(true);
      }
    });

    it("should return undefined for unknown resource", () => {
      const deps = getResourceDependencies("nonexistent_resource");

      expect(deps).toBeUndefined();
    });
  });

  describe("getDomainsByCategory", () => {
    it("should return domains for a valid category", () => {
      const index = loadSpecIndex();
      const category = index.specifications[0].domainCategory;
      const domains = getDomainsByCategory(category);

      expect(domains).toBeInstanceOf(Array);
      expect(domains.length).toBeGreaterThan(0);
      expect(domains.every((d) => d.domainCategory.toLowerCase() === category.toLowerCase())).toBe(
        true
      );
    });

    it("should return empty array for unknown category", () => {
      const domains = getDomainsByCategory("NonExistent Category XYZ");

      expect(domains).toBeInstanceOf(Array);
      expect(domains.length).toBe(0);
    });

    it("should be case-insensitive", () => {
      const index = loadSpecIndex();
      const category = index.specifications[0].domainCategory;
      const domainsLower = getDomainsByCategory(category.toLowerCase());
      const domainsUpper = getDomainsByCategory(category.toUpperCase());

      expect(domainsLower.length).toBe(domainsUpper.length);
    });
  });

  describe("getDomainsByUiCategory", () => {
    it("should return domains for a valid UI category", () => {
      const index = loadSpecIndex();
      const uiCategory = index.specifications[0].uiCategory;
      const domains = getDomainsByUiCategory(uiCategory);

      expect(domains).toBeInstanceOf(Array);
      expect(domains.length).toBeGreaterThan(0);
    });

    it("should return empty array for unknown UI category", () => {
      const domains = getDomainsByUiCategory("Unknown UI Category");

      expect(domains).toBeInstanceOf(Array);
      expect(domains.length).toBe(0);
    });
  });

  describe("getAllDomainNames", () => {
    it("should return all domain names", () => {
      const names = getAllDomainNames();

      expect(names).toBeInstanceOf(Array);
      expect(names.length).toBeGreaterThan(0);
      expect(names.every((n) => typeof n === "string")).toBe(true);
    });

    it("should return unique domain names", () => {
      const names = getAllDomainNames();
      const uniqueNames = new Set(names);

      expect(names.length).toBe(uniqueNames.size);
    });
  });

  describe("getAllDomainCategories", () => {
    it("should return all unique domain categories", () => {
      const categories = getAllDomainCategories();

      expect(categories).toBeInstanceOf(Array);
      expect(categories.length).toBeGreaterThan(0);
    });

    it("should return sorted categories", () => {
      const categories = getAllDomainCategories();
      const sorted = [...categories].sort();

      expect(categories).toEqual(sorted);
    });

    it("should return unique categories", () => {
      const categories = getAllDomainCategories();
      const unique = new Set(categories);

      expect(categories.length).toBe(unique.size);
    });
  });

  describe("getAllUiCategories", () => {
    it("should return all unique UI categories", () => {
      const categories = getAllUiCategories();

      expect(categories).toBeInstanceOf(Array);
      expect(categories.length).toBeGreaterThan(0);
    });

    it("should return sorted UI categories", () => {
      const categories = getAllUiCategories();
      const sorted = [...categories].sort();

      expect(categories).toEqual(sorted);
    });
  });

  describe("getResourceToDomainMap", () => {
    it("should return a mapping of resources to domains", () => {
      const map = getResourceToDomainMap();

      expect(map).toBeDefined();
      expect(typeof map).toBe("object");
      expect(Object.keys(map).length).toBeGreaterThan(0);
    });

    it("should have kebab-case resource keys", () => {
      const map = getResourceToDomainMap();
      const keys = Object.keys(map);

      // At least some keys should contain hyphens (kebab-case)
      expect(keys.some((k) => k.includes("-") || !k.includes("_"))).toBe(true);
    });

    it("should map resources to valid domain names", () => {
      const map = getResourceToDomainMap();
      const allDomains = getAllDomainNames();

      for (const domain of Object.values(map)) {
        expect(allDomains).toContain(domain);
      }
    });
  });

  describe("getSpecVersion", () => {
    it("should return a version string", () => {
      const version = getSpecVersion();

      expect(version).toBeDefined();
      expect(typeof version).toBe("string");
    });

    it("should return a semver-like version", () => {
      const version = getSpecVersion();

      // Should match semver pattern (x.y.z)
      expect(version).toMatch(/^\d+\.\d+\.\d+/);
    });
  });

  describe("clearMetadataCache", () => {
    it("should clear cached data", () => {
      // Load data to populate cache
      loadSpecIndex();
      getResourceMetadata("http_loadbalancer");

      // Clear cache
      clearMetadataCache();

      // After clearing, loading again should work
      const index = loadSpecIndex();
      expect(index).toBeDefined();
    });
  });

  describe("loadGuidedWorkflows", () => {
    it("should load guided workflows", () => {
      const workflows = loadGuidedWorkflows();

      expect(workflows).toBeDefined();
      expect(workflows).toHaveProperty("version");
      expect(workflows).toHaveProperty("totalWorkflows");
      expect(workflows).toHaveProperty("domains");
      expect(workflows).toHaveProperty("workflows");
    });

    it("should return workflows array", () => {
      const workflows = loadGuidedWorkflows();

      expect(Array.isArray(workflows.workflows)).toBe(true);
    });
  });

  describe("getGuidedWorkflows", () => {
    it("should return all workflows when no domain specified", () => {
      const workflows = getGuidedWorkflows();

      expect(Array.isArray(workflows)).toBe(true);
    });

    it("should filter workflows by domain when specified", () => {
      const allWorkflows = getGuidedWorkflows();

      if (allWorkflows.length > 0) {
        const domain = allWorkflows[0].domain;
        const filtered = getGuidedWorkflows(domain);

        expect(filtered.every((w) => w.domain === domain)).toBe(true);
      }
    });
  });

  describe("getGuidedWorkflowById", () => {
    it("should return undefined for non-existent workflow", () => {
      const workflow = getGuidedWorkflowById("non_existent_workflow_id");

      expect(workflow).toBeUndefined();
    });

    it("should return workflow when ID exists", () => {
      const allWorkflows = getGuidedWorkflows();

      if (allWorkflows.length > 0) {
        const workflow = getGuidedWorkflowById(allWorkflows[0].id);

        expect(workflow).toBeDefined();
        expect(workflow?.id).toBe(allWorkflows[0].id);
      }
    });
  });

  describe("getDomainsWithWorkflows", () => {
    it("should return array of domains", () => {
      const domains = getDomainsWithWorkflows();

      expect(Array.isArray(domains)).toBe(true);
    });
  });

  describe("loadErrorResolution", () => {
    it("should load error resolution data", () => {
      const errorResolution = loadErrorResolution();

      expect(errorResolution).toBeDefined();
      expect(errorResolution).toHaveProperty("version");
      expect(errorResolution).toHaveProperty("httpErrors");
      expect(errorResolution).toHaveProperty("resourceErrors");
    });

    it("should return Maps for error collections", () => {
      const errorResolution = loadErrorResolution();

      expect(errorResolution.httpErrors instanceof Map).toBe(true);
      expect(errorResolution.resourceErrors instanceof Map).toBe(true);
    });
  });

  describe("getHttpErrorResolution", () => {
    it("should return resolution for common HTTP errors", () => {
      const resolution = getHttpErrorResolution(400);

      // May or may not exist depending on specs
      if (resolution) {
        expect(resolution).toHaveProperty("code");
        expect(resolution).toHaveProperty("name");
        expect(resolution).toHaveProperty("description");
      }
    });

    it("should return undefined for unknown error code", () => {
      const resolution = getHttpErrorResolution(999);

      expect(resolution).toBeUndefined();
    });
  });

  describe("getAllHttpErrorCodes", () => {
    it("should return sorted array of error codes", () => {
      const codes = getAllHttpErrorCodes();

      expect(Array.isArray(codes)).toBe(true);

      // Should be sorted
      const sorted = [...codes].sort((a, b) => a - b);
      expect(codes).toEqual(sorted);
    });
  });

  describe("getResourceErrorPatterns", () => {
    it("should return empty array for unknown resource", () => {
      const patterns = getResourceErrorPatterns("unknown_resource_xyz");

      expect(patterns).toBeInstanceOf(Array);
      expect(patterns.length).toBe(0);
    });
  });

  describe("getResourcesWithErrorPatterns", () => {
    it("should return array of resource names", () => {
      const resources = getResourcesWithErrorPatterns();

      expect(Array.isArray(resources)).toBe(true);
    });
  });

  describe("loadCriticalResources", () => {
    it("should return array of critical resources", () => {
      const critical = loadCriticalResources();

      expect(Array.isArray(critical)).toBe(true);
    });
  });

  describe("isCriticalResource", () => {
    it("should return false for unknown resource", () => {
      const isCritical = isCriticalResource("non_critical_resource_xyz");

      expect(isCritical).toBe(false);
    });

    it("should handle different case formats", () => {
      const critical = loadCriticalResources();

      if (critical.length > 0) {
        const resourceName = critical[0];
        const kebabCase = resourceName.replace(/_/g, "-");

        expect(isCriticalResource(resourceName)).toBe(true);
        expect(isCriticalResource(kebabCase)).toBe(true);
      }
    });
  });

  describe("loadAcronyms", () => {
    it("should load acronyms data", () => {
      const acronyms = loadAcronyms();

      expect(acronyms).toBeDefined();
      expect(acronyms).toHaveProperty("version");
      expect(acronyms).toHaveProperty("categories");
      expect(acronyms).toHaveProperty("acronyms");
    });

    it("should return arrays for collections", () => {
      const acronyms = loadAcronyms();

      expect(Array.isArray(acronyms.categories)).toBe(true);
      expect(Array.isArray(acronyms.acronyms)).toBe(true);
    });
  });

  describe("getAcronyms", () => {
    it("should return array of acronyms", () => {
      const acronyms = getAcronyms();

      expect(Array.isArray(acronyms)).toBe(true);
    });

    it("should return acronyms with expected structure", () => {
      const acronyms = getAcronyms();

      if (acronyms.length > 0) {
        expect(acronyms[0]).toHaveProperty("acronym");
        expect(acronyms[0]).toHaveProperty("expansion");
        expect(acronyms[0]).toHaveProperty("category");
      }
    });
  });

  describe("getAcronymCategories", () => {
    it("should return array of categories", () => {
      const categories = getAcronymCategories();

      expect(Array.isArray(categories)).toBe(true);
    });
  });

  describe("getAcronymsByCategory", () => {
    it("should filter acronyms by category", () => {
      const categories = getAcronymCategories();

      if (categories.length > 0) {
        const filtered = getAcronymsByCategory(categories[0]);

        expect(Array.isArray(filtered)).toBe(true);
        expect(filtered.every((a) => a.category.toLowerCase() === categories[0].toLowerCase())).toBe(
          true
        );
      }
    });

    it("should return empty array for unknown category", () => {
      const filtered = getAcronymsByCategory("Unknown Category XYZ");

      expect(filtered).toBeInstanceOf(Array);
      expect(filtered.length).toBe(0);
    });
  });

  describe("getAcronymByName", () => {
    it("should return undefined for unknown acronym", () => {
      const acronym = getAcronymByName("XYZABC");

      expect(acronym).toBeUndefined();
    });

    it("should find acronym by name (case-insensitive)", () => {
      const acronyms = getAcronyms();

      if (acronyms.length > 0) {
        const name = acronyms[0].acronym;
        const found = getAcronymByName(name.toLowerCase());

        expect(found).toBeDefined();
        expect(found?.acronym.toLowerCase()).toBe(name.toLowerCase());
      }
    });
  });

  describe("getAcronymsVersion", () => {
    it("should return version string", () => {
      const version = getAcronymsVersion();

      expect(typeof version).toBe("string");
    });
  });

  describe("type safety", () => {
    it("should return correctly typed DomainMetadata", () => {
      const index = loadSpecIndex();
      const metadata: DomainMetadata | undefined = getDomainMetadata(index.specifications[0].domain);

      if (metadata) {
        // Type assertions to verify structure
        const _domain: string = metadata.domain;
        const _title: string = metadata.title;
        const _complexity: "simple" | "moderate" | "advanced" = metadata.complexity;
        const _resources: ResourceMetadata[] = metadata.primaryResources;

        expect(_domain).toBeDefined();
        expect(_title).toBeDefined();
        expect(["simple", "moderate", "advanced"]).toContain(_complexity);
        expect(Array.isArray(_resources)).toBe(true);
      }
    });
  });
});
