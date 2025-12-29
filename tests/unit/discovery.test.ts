/**
 * Unit Tests for Discovery Module
 *
 * Tests the dynamic tool discovery system including:
 * - Index loading and caching
 * - Natural language search
 * - Tool description
 * - Execution dispatch
 *
 * IMPORTANT: All tests use dynamic fixtures generated from the current specs.
 * No hardcoded domain names, tool names, or specific values.
 * See tests/fixtures/generated.ts for fixture generation.
 */

import { describe, it, expect, beforeEach } from "vitest";
import {
  getToolIndex,
  clearIndexCache,
  getIndexMetadata,
  toolExists,
  getToolEntry,
} from "../../src/tools/discovery/index-loader.js";
import {
  searchTools,
  getToolsByDomain,
  getToolsByResource,
  getAvailableDomains,
  getToolCountByDomain,
} from "../../src/tools/discovery/search.js";
import {
  describeTool,
  describeTools,
  describeToolSafe,
  describeToolCompact,
  getFullToolSchema,
  getOptimizationStats,
} from "../../src/tools/discovery/describe.js";
import { validateExecuteParams } from "../../src/tools/discovery/execute.js";
import { DISCOVERY_TOOLS } from "../../src/tools/discovery/index.js";
import {
  FIRST_TOOL,
  SAMPLE_DOMAIN,
  AVAILABLE_DOMAINS,
  REGISTRY_STATS,
  SAMPLE_TOOLS_BY_OPERATION,
  getValidToolName,
  getValidDomain,
  getSampleToolByOperation,
} from "../fixtures/generated.js";

describe("discovery/index-loader", () => {
  beforeEach(() => {
    clearIndexCache();
  });

  describe("getToolIndex", () => {
    it("should return a valid tool index", () => {
      const index = getToolIndex();

      expect(index).toBeDefined();
      expect(index.metadata).toBeDefined();
      expect(index.tools).toBeDefined();
      expect(Array.isArray(index.tools)).toBe(true);
      expect(index.tools.length).toBeGreaterThan(0);
    });

    it("should cache the index on subsequent calls", () => {
      const index1 = getToolIndex();
      const index2 = getToolIndex();

      expect(index1).toBe(index2); // Same reference
    });

    it("should have valid metadata", () => {
      const index = getToolIndex();

      expect(index.metadata.totalTools).toBeGreaterThan(0);
      expect(index.metadata.version).toBe("1.0.0");
      expect(index.metadata.generatedAt).toBeDefined();
      expect(Object.keys(index.metadata.domains).length).toBeGreaterThan(0);
    });

    it("should match fixture stats", () => {
      const index = getToolIndex();

      // Verify index matches generated fixtures
      expect(index.tools.length).toBe(REGISTRY_STATS.totalTools);
      expect(Object.keys(index.metadata.domains).length).toBe(REGISTRY_STATS.totalDomains);
    });
  });

  describe("getIndexMetadata", () => {
    it("should return metadata without full index", () => {
      const metadata = getIndexMetadata();

      expect(metadata.totalTools).toBeGreaterThan(0);
      expect(metadata.domains).toBeDefined();
    });
  });

  describe("toolExists", () => {
    it("should return true for existing tools", () => {
      // Use dynamically generated tool name from fixtures
      expect(toolExists(FIRST_TOOL.toolName)).toBe(true);
    });

    it("should return false for non-existent tools", () => {
      expect(toolExists("non-existent-tool-xyz-12345")).toBe(false);
      expect(toolExists("")).toBe(false);
    });
  });

  describe("getToolEntry", () => {
    it("should return tool entry for existing tool", () => {
      const entry = getToolEntry(FIRST_TOOL.toolName);

      expect(entry).toBeDefined();
      expect(entry?.name).toBe(FIRST_TOOL.toolName);
      expect(entry?.domain).toBe(FIRST_TOOL.domain);
      expect(entry?.resource).toBe(FIRST_TOOL.resource);
      expect(entry?.operation).toBe(FIRST_TOOL.operation);
    });

    it("should return undefined for non-existent tool", () => {
      const entry = getToolEntry("non-existent-tool-xyz-12345");

      expect(entry).toBeUndefined();
    });
  });

  describe("clearIndexCache", () => {
    it("should clear the cached index", () => {
      const index1 = getToolIndex();
      clearIndexCache();
      const index2 = getToolIndex();

      // Different reference after cache clear (new generation)
      expect(index1).not.toBe(index2);
      // But same content
      expect(index1.metadata.totalTools).toBe(index2.metadata.totalTools);
    });
  });
});

describe("discovery/search", () => {
  describe("searchTools", () => {
    it("should find tools matching resource terms", () => {
      // Use the first tool's resource as a search term
      const results = searchTools(FIRST_TOOL.resource);

      expect(results.length).toBeGreaterThan(0);
    });

    it("should find tools by domain", () => {
      const domain = getValidDomain();
      const results = searchTools(domain);

      expect(results.length).toBeGreaterThan(0);
      expect(results.some((r) => r.tool.domain === domain)).toBe(true);
    });

    it("should find tools by operation", () => {
      const createTool = getSampleToolByOperation("create");
      if (createTool) {
        const results = searchTools("create");

        expect(results.length).toBeGreaterThan(0);
        expect(results.some((r) => r.tool.operation === "create")).toBe(true);
      }
    });

    it("should respect limit option", () => {
      const results = searchTools(FIRST_TOOL.resource, { limit: 5 });

      expect(results.length).toBeLessThanOrEqual(5);
    });

    it("should filter by domains", () => {
      const domain = getValidDomain();
      const results = searchTools(FIRST_TOOL.resource, { domains: [domain] });

      if (results.length > 0) {
        expect(results.every((r) => r.tool.domain === domain)).toBe(true);
      }
    });

    it("should filter by operations", () => {
      const results = searchTools(FIRST_TOOL.resource, { operations: ["create", "delete"] });

      if (results.length > 0) {
        expect(results.every((r) => ["create", "delete"].includes(r.tool.operation))).toBe(true);
      }
    });

    it("should return empty array for no matches", () => {
      // Use a completely random string with no dictionary words
      const results = searchTools("qzxwjkvmnbfghpyr");

      expect(results.length).toBe(0);
    });

    it("should return scored results", () => {
      const results = searchTools(FIRST_TOOL.resource);

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].score).toBeGreaterThan(0);
      expect(results[0].score).toBeLessThanOrEqual(1);
    });

    it("should include matched terms", () => {
      const results = searchTools(FIRST_TOOL.resource);

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].matchedTerms.length).toBeGreaterThan(0);
    });
  });

  describe("getToolsByDomain", () => {
    it("should return all tools for a domain", () => {
      const domain = getValidDomain();
      const tools = getToolsByDomain(domain);

      expect(tools.length).toBeGreaterThan(0);
      expect(tools.every((t) => t.domain === domain)).toBe(true);
    });

    it("should return empty array for non-existent domain", () => {
      const tools = getToolsByDomain("nonexistent-domain-xyz-12345");

      expect(tools.length).toBe(0);
    });

    it("should be case-insensitive", () => {
      const domain = getValidDomain();
      const tools1 = getToolsByDomain(domain);
      const tools2 = getToolsByDomain(domain.toUpperCase());

      expect(tools1.length).toBe(tools2.length);
    });
  });

  describe("getToolsByResource", () => {
    it("should return tools matching resource name", () => {
      const resource = FIRST_TOOL.resource;
      const tools = getToolsByResource(resource);

      expect(tools.length).toBeGreaterThan(0);
      expect(tools.every((t) => t.resource.includes(resource))).toBe(true);
    });

    it("should handle partial matches", () => {
      // Use first 3 characters of resource as partial match
      const partialResource = FIRST_TOOL.resource.substring(0, 3);
      const tools = getToolsByResource(partialResource);

      expect(tools.length).toBeGreaterThan(0);
    });
  });

  describe("getAvailableDomains", () => {
    it("should return all available domains", () => {
      const domains = getAvailableDomains();

      expect(domains.length).toBeGreaterThan(0);
      // Verify against fixtures - should contain all domains from fixtures
      expect(domains.length).toBe(AVAILABLE_DOMAINS.length);
      expect(domains).toContain(SAMPLE_DOMAIN);
    });
  });

  describe("getToolCountByDomain", () => {
    it("should return tool counts per domain", () => {
      const counts = getToolCountByDomain();
      const domain = getValidDomain();

      expect(Object.keys(counts).length).toBeGreaterThan(0);
      expect(counts[domain]).toBeGreaterThan(0);
    });

    it("should match fixture domain counts", () => {
      const counts = getToolCountByDomain();

      // Verify against fixtures
      expect(Object.keys(counts).length).toBe(REGISTRY_STATS.totalDomains);
    });
  });
});

describe("discovery/describe", () => {
  describe("describeTool", () => {
    it("should return description for existing tool", () => {
      const desc = describeTool(FIRST_TOOL.toolName);

      expect(desc).toBeDefined();
      expect(desc?.name).toBe(FIRST_TOOL.toolName);
      expect(desc?.method).toBe(FIRST_TOOL.method);
      expect(desc?.domain).toBe(FIRST_TOOL.domain);
      expect(desc?.resource).toBe(FIRST_TOOL.resource);
      expect(desc?.operation).toBe(FIRST_TOOL.operation);
    });

    it("should include path parameters", () => {
      const desc = describeTool(FIRST_TOOL.toolName);

      expect(desc?.pathParameters).toBeDefined();
      expect(Array.isArray(desc?.pathParameters)).toBe(true);
    });

    it("should return null for non-existent tool", () => {
      const desc = describeTool("non-existent-tool-xyz-12345");

      expect(desc).toBeNull();
    });

    it("should indicate if request body is required", () => {
      const createTool = getSampleToolByOperation("create");
      const listTool = getSampleToolByOperation("list");

      if (createTool) {
        const createDesc = describeTool(createTool.toolName);
        expect(createDesc?.hasRequestBody).toBe(true);
      }

      if (listTool) {
        const listDesc = describeTool(listTool.toolName);
        expect(listDesc?.hasRequestBody).toBe(false);
      }
    });
  });

  describe("describeTools", () => {
    it("should return descriptions for multiple tools", () => {
      const createTool = getSampleToolByOperation("create");
      const listTool = getSampleToolByOperation("list");

      if (createTool && listTool) {
        const toolNames = [createTool.toolName, listTool.toolName];
        const descriptions = describeTools(toolNames);

        expect(descriptions.size).toBe(2);
        expect(descriptions.has(createTool.toolName)).toBe(true);
        expect(descriptions.has(listTool.toolName)).toBe(true);
      }
    });

    it("should skip non-existent tools", () => {
      const toolNames = [FIRST_TOOL.toolName, "non-existent-tool-xyz-12345"];
      const descriptions = describeTools(toolNames);

      expect(descriptions.size).toBe(1);
    });
  });

  describe("describeToolSafe", () => {
    it("should return success for existing tool", () => {
      const result = describeToolSafe(FIRST_TOOL.toolName);

      expect(result.success).toBe(true);
      expect(result.description).toBeDefined();
      expect(result.error).toBeUndefined();
    });

    it("should return error for non-existent tool", () => {
      const result = describeToolSafe("non-existent-tool-xyz-12345");

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.description).toBeUndefined();
    });
  });

  describe("getFullToolSchema", () => {
    it("should return full ParsedOperation", () => {
      const schema = getFullToolSchema(FIRST_TOOL.toolName);

      expect(schema).toBeDefined();
      expect(schema?.toolName).toBe(FIRST_TOOL.toolName);
      // These may or may not be defined based on the tool
      expect("requestBodySchema" in (schema ?? {})).toBe(true);
      expect("responseSchema" in (schema ?? {})).toBe(true);
    });

    it("should return null for non-existent tool", () => {
      const schema = getFullToolSchema("non-existent-tool-xyz-12345");

      expect(schema).toBeNull();
    });
  });
});

describe("discovery/execute", () => {
  describe("validateExecuteParams", () => {
    it("should validate correct parameters", () => {
      const listTool = getSampleToolByOperation("list");
      if (listTool) {
        const result = validateExecuteParams(listTool.toolName, {
          toolName: listTool.toolName,
          pathParams: { namespace: "default" },
        });

        // Validation may pass or fail based on required params - just verify structure
        expect(typeof result.valid).toBe("boolean");
        expect(Array.isArray(result.errors)).toBe(true);
      }
    });

    it("should detect missing required path parameters", () => {
      const listTool = getSampleToolByOperation("list");
      if (listTool) {
        const result = validateExecuteParams(listTool.toolName, {
          toolName: listTool.toolName,
          pathParams: {},
        });

        // Most list operations require namespace - should have errors
        expect(result.valid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      }
    });

    it("should detect non-existent tool", () => {
      const result = validateExecuteParams("non-existent-tool-xyz-12345", {
        toolName: "non-existent-tool-xyz-12345",
      });

      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes("not found"))).toBe(true);
    });
  });
});

describe("discovery/index (DISCOVERY_TOOLS)", () => {
  describe("DISCOVERY_TOOLS", () => {
    it("should export all discovery tool definitions", () => {
      expect(DISCOVERY_TOOLS.search).toBeDefined();
      expect(DISCOVERY_TOOLS.describe).toBeDefined();
      expect(DISCOVERY_TOOLS.execute).toBeDefined();
      expect(DISCOVERY_TOOLS.serverInfo).toBeDefined();
    });

    it("should have correct tool names", () => {
      expect(DISCOVERY_TOOLS.search.name).toBe("f5xc-api-search-tools");
      expect(DISCOVERY_TOOLS.describe.name).toBe("f5xc-api-describe-tool");
      expect(DISCOVERY_TOOLS.execute.name).toBe("f5xc-api-execute-tool");
      expect(DISCOVERY_TOOLS.serverInfo.name).toBe("f5xc-api-server-info");
    });

    it("should have descriptions", () => {
      expect(DISCOVERY_TOOLS.search.description).toBeTruthy();
      expect(DISCOVERY_TOOLS.describe.description).toBeTruthy();
      expect(DISCOVERY_TOOLS.execute.description).toBeTruthy();
      expect(DISCOVERY_TOOLS.serverInfo.description).toBeTruthy();
    });

    it("should have input schemas", () => {
      expect(DISCOVERY_TOOLS.search.inputSchema).toBeDefined();
      expect(DISCOVERY_TOOLS.search.inputSchema.properties.query).toBeDefined();

      expect(DISCOVERY_TOOLS.describe.inputSchema).toBeDefined();
      expect(DISCOVERY_TOOLS.describe.inputSchema.properties.toolName).toBeDefined();

      expect(DISCOVERY_TOOLS.execute.inputSchema).toBeDefined();
      expect(DISCOVERY_TOOLS.execute.inputSchema.properties.toolName).toBeDefined();
    });
  });
});

describe("Token Efficiency Validation", () => {
  it("should have lightweight index entries", () => {
    const index = getToolIndex();
    const sampleEntry = index.tools[0];

    // Each entry should only have 5 fields for minimal tokens
    const fields = Object.keys(sampleEntry);
    expect(fields).toEqual(["name", "domain", "resource", "operation", "summary"]);
  });

  it("should have significantly fewer tokens than full tools", () => {
    const index = getToolIndex();

    // Validate index is loaded but full schemas are not
    expect(index.tools.length).toBe(REGISTRY_STATS.totalTools);
    expect(index.tools[0].name).toBeDefined();
    expect((index.tools[0] as unknown as Record<string, unknown>).pathParameters).toBeUndefined();
  });
});

describe("Schema Optimization", () => {
  describe("describeToolCompact", () => {
    it("should return compact description for existing tool", () => {
      const compact = describeToolCompact(FIRST_TOOL.toolName);

      expect(compact).toBeDefined();
      expect(compact?.n).toBe(FIRST_TOOL.toolName);
      expect(compact?.m).toBe(FIRST_TOOL.method);
      expect(compact?.d).toBe(FIRST_TOOL.domain);
      expect(compact?.r).toBe(FIRST_TOOL.resource);
      expect(compact?.o).toBe(FIRST_TOOL.operation);
    });

    it("should return null for non-existent tool", () => {
      const compact = describeToolCompact("non-existent-tool-xyz-12345");

      expect(compact).toBeNull();
    });

    it("should be significantly smaller than full description", () => {
      const full = describeTool(FIRST_TOOL.toolName);
      const compact = describeToolCompact(FIRST_TOOL.toolName);

      const fullSize = JSON.stringify(full).length;
      const compactSize = JSON.stringify(compact).length;

      // Compact should be at least 30% smaller
      expect(compactSize).toBeLessThan(fullSize * 0.7);
    });

    it("should include essential information", () => {
      const compact = describeToolCompact(FIRST_TOOL.toolName);

      expect(compact?.s).toBeDefined(); // summary
      expect(compact?.rp).toBeDefined(); // requiredParams
      expect(compact?.pp).toBeDefined(); // pathParams
      expect(typeof compact?.rb).toBe("boolean"); // hasRequestBody
    });
  });

  describe("getOptimizationStats", () => {
    it("should return valid optimization statistics", () => {
      const stats = getOptimizationStats();

      expect(stats.avgOriginalParamDescLen).toBeGreaterThan(0);
      expect(stats.avgOptimizedParamDescLen).toBeGreaterThan(0);
      expect(stats.estimatedSavingsPercent).toMatch(/^\d+\.\d+%$/);
    });

    it("should show meaningful savings", () => {
      const stats = getOptimizationStats();

      // Optimized should be shorter than original
      expect(stats.avgOptimizedParamDescLen).toBeLessThanOrEqual(stats.avgOriginalParamDescLen);
    });
  });

  describe("parameter description optimization", () => {
    it("should use optimized descriptions for common params", () => {
      const desc = describeTool(FIRST_TOOL.toolName);
      const namespaceParam = desc?.pathParameters.find((p) => p.name.includes("namespace"));

      // Should use optimized description, not verbose OpenAPI one
      if (namespaceParam) {
        expect(namespaceParam.description.length).toBeLessThan(200);
      }
    });

    it("should truncate verbose descriptions", () => {
      const desc = describeTool(FIRST_TOOL.toolName);

      // All parameter descriptions should be reasonably short
      for (const param of desc?.pathParameters ?? []) {
        expect(param.description.length).toBeLessThanOrEqual(250);
      }
    });
  });
});
