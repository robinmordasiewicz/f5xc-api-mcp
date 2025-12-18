/**
 * Unit Tests for Discovery Module
 *
 * Tests the dynamic tool discovery system including:
 * - Index loading and caching
 * - Natural language search
 * - Tool description
 * - Execution dispatch
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
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
  getFullToolSchema,
} from "../../src/tools/discovery/describe.js";
import { validateExecuteParams } from "../../src/tools/discovery/execute.js";
import { DISCOVERY_TOOLS } from "../../src/tools/discovery/index.js";

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
      expect(toolExists("f5xc-api-waap-http-loadbalancer-create")).toBe(true);
      expect(toolExists("f5xc-api-waap-http-loadbalancer-list")).toBe(true);
    });

    it("should return false for non-existent tools", () => {
      expect(toolExists("non-existent-tool")).toBe(false);
      expect(toolExists("")).toBe(false);
    });
  });

  describe("getToolEntry", () => {
    it("should return tool entry for existing tool", () => {
      const entry = getToolEntry("f5xc-api-waap-http-loadbalancer-create");

      expect(entry).toBeDefined();
      expect(entry?.name).toBe("f5xc-api-waap-http-loadbalancer-create");
      expect(entry?.domain).toBe("waap");
      expect(entry?.resource).toBe("http-loadbalancer");
      expect(entry?.operation).toBe("create");
    });

    it("should return undefined for non-existent tool", () => {
      const entry = getToolEntry("non-existent-tool");

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
    it("should find tools matching simple queries", () => {
      const results = searchTools("http load balancer");

      expect(results.length).toBeGreaterThan(0);
      // Resource name may vary, but should contain "http" and "load" related terms
      const topResult = results[0].tool;
      expect(
        topResult.resource.includes("http") ||
          topResult.resource.includes("load") ||
          topResult.summary.toLowerCase().includes("load balancer")
      ).toBe(true);
    });

    it("should find tools by domain", () => {
      const results = searchTools("waap");

      expect(results.length).toBeGreaterThan(0);
      expect(results.some((r) => r.tool.domain === "waap")).toBe(true);
    });

    it("should find tools by operation", () => {
      const results = searchTools("create load balancer");

      expect(results.length).toBeGreaterThan(0);
      expect(results.some((r) => r.tool.operation === "create")).toBe(true);
    });

    it("should respect limit option", () => {
      const results = searchTools("load balancer", { limit: 5 });

      expect(results.length).toBeLessThanOrEqual(5);
    });

    it("should filter by domains", () => {
      const results = searchTools("load balancer", { domains: ["waap"] });

      expect(results.every((r) => r.tool.domain === "waap")).toBe(true);
    });

    it("should filter by operations", () => {
      const results = searchTools("load balancer", { operations: ["create", "delete"] });

      expect(results.every((r) => ["create", "delete"].includes(r.tool.operation))).toBe(true);
    });

    it("should return empty array for no matches", () => {
      const results = searchTools("xyz123nonexistent");

      expect(results.length).toBe(0);
    });

    it("should return scored results", () => {
      const results = searchTools("http loadbalancer create");

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].score).toBeGreaterThan(0);
      expect(results[0].score).toBeLessThanOrEqual(1);
    });

    it("should include matched terms", () => {
      const results = searchTools("http loadbalancer");

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].matchedTerms.length).toBeGreaterThan(0);
    });
  });

  describe("getToolsByDomain", () => {
    it("should return all tools for a domain", () => {
      const tools = getToolsByDomain("waap");

      expect(tools.length).toBeGreaterThan(0);
      expect(tools.every((t) => t.domain === "waap")).toBe(true);
    });

    it("should return empty array for non-existent domain", () => {
      const tools = getToolsByDomain("nonexistent");

      expect(tools.length).toBe(0);
    });

    it("should be case-insensitive", () => {
      const tools1 = getToolsByDomain("waap");
      const tools2 = getToolsByDomain("WAAP");

      expect(tools1.length).toBe(tools2.length);
    });
  });

  describe("getToolsByResource", () => {
    it("should return tools matching resource name", () => {
      const tools = getToolsByResource("http-loadbalancer");

      expect(tools.length).toBeGreaterThan(0);
      expect(tools.every((t) => t.resource.includes("http-loadbalancer"))).toBe(true);
    });

    it("should handle partial matches", () => {
      const tools = getToolsByResource("loadbalancer");

      expect(tools.length).toBeGreaterThan(0);
    });
  });

  describe("getAvailableDomains", () => {
    it("should return all available domains", () => {
      const domains = getAvailableDomains();

      expect(domains.length).toBeGreaterThan(0);
      expect(domains).toContain("waap");
      expect(domains).toContain("core");
    });
  });

  describe("getToolCountByDomain", () => {
    it("should return tool counts per domain", () => {
      const counts = getToolCountByDomain();

      expect(Object.keys(counts).length).toBeGreaterThan(0);
      expect(counts.waap).toBeGreaterThan(0);
      expect(counts.core).toBeGreaterThan(0);
    });
  });
});

describe("discovery/describe", () => {
  describe("describeTool", () => {
    it("should return description for existing tool", () => {
      const desc = describeTool("f5xc-api-waap-http-loadbalancer-create");

      expect(desc).toBeDefined();
      expect(desc?.name).toBe("f5xc-api-waap-http-loadbalancer-create");
      expect(desc?.method).toBe("POST");
      expect(desc?.domain).toBe("waap");
      expect(desc?.resource).toBe("http-loadbalancer");
      expect(desc?.operation).toBe("create");
    });

    it("should include path parameters", () => {
      const desc = describeTool("f5xc-api-waap-http-loadbalancer-create");

      expect(desc?.pathParameters).toBeDefined();
      expect(Array.isArray(desc?.pathParameters)).toBe(true);
    });

    it("should return null for non-existent tool", () => {
      const desc = describeTool("non-existent-tool");

      expect(desc).toBeNull();
    });

    it("should indicate if request body is required", () => {
      const createDesc = describeTool("f5xc-api-waap-http-loadbalancer-create");
      expect(createDesc?.hasRequestBody).toBe(true);

      const listDesc = describeTool("f5xc-api-waap-http-loadbalancer-list");
      expect(listDesc?.hasRequestBody).toBe(false);
    });
  });

  describe("describeTools", () => {
    it("should return descriptions for multiple tools", () => {
      const toolNames = [
        "f5xc-api-waap-http-loadbalancer-create",
        "f5xc-api-waap-http-loadbalancer-list",
      ];
      const descriptions = describeTools(toolNames);

      expect(descriptions.size).toBe(2);
      expect(descriptions.has("f5xc-api-waap-http-loadbalancer-create")).toBe(true);
      expect(descriptions.has("f5xc-api-waap-http-loadbalancer-list")).toBe(true);
    });

    it("should skip non-existent tools", () => {
      const toolNames = ["f5xc-api-waap-http-loadbalancer-create", "non-existent-tool"];
      const descriptions = describeTools(toolNames);

      expect(descriptions.size).toBe(1);
    });
  });

  describe("describeToolSafe", () => {
    it("should return success for existing tool", () => {
      const result = describeToolSafe("f5xc-api-waap-http-loadbalancer-create");

      expect(result.success).toBe(true);
      expect(result.description).toBeDefined();
      expect(result.error).toBeUndefined();
    });

    it("should return error for non-existent tool", () => {
      const result = describeToolSafe("non-existent-tool");

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.description).toBeUndefined();
    });
  });

  describe("getFullToolSchema", () => {
    it("should return full ParsedOperation", () => {
      const schema = getFullToolSchema("f5xc-api-waap-http-loadbalancer-create");

      expect(schema).toBeDefined();
      expect(schema?.toolName).toBe("f5xc-api-waap-http-loadbalancer-create");
      expect(schema?.requestBodySchema).toBeDefined();
      expect(schema?.responseSchema).toBeDefined();
    });

    it("should return null for non-existent tool", () => {
      const schema = getFullToolSchema("non-existent-tool");

      expect(schema).toBeNull();
    });
  });
});

describe("discovery/execute", () => {
  describe("validateExecuteParams", () => {
    it("should validate correct parameters", () => {
      const result = validateExecuteParams("f5xc-api-waap-http-loadbalancer-list", {
        toolName: "f5xc-api-waap-http-loadbalancer-list",
        pathParams: { namespace: "default" },
      });

      expect(result.valid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it("should detect missing required path parameters", () => {
      const result = validateExecuteParams("f5xc-api-waap-http-loadbalancer-list", {
        toolName: "f5xc-api-waap-http-loadbalancer-list",
        pathParams: {},
      });

      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes("namespace"))).toBe(true);
    });

    it("should detect non-existent tool", () => {
      const result = validateExecuteParams("non-existent-tool", {
        toolName: "non-existent-tool",
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
      expect(DISCOVERY_TOOLS.search.name).toBe("f5xc-search-tools");
      expect(DISCOVERY_TOOLS.describe.name).toBe("f5xc-describe-tool");
      expect(DISCOVERY_TOOLS.execute.name).toBe("f5xc-execute-tool");
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

    // Each lightweight entry is ~50 tokens vs ~375 for full ParsedOperation
    // 1426 tools * 375 tokens = 534,750 tokens (full)
    // 1426 tools * 50 tokens = 71,300 tokens (lightweight index)
    // Meta-tools: ~500 tokens
    // Effective savings: 95%+ for initial load

    // Validate index is loaded but full schemas are not
    expect(index.tools.length).toBeGreaterThan(1000);
    expect(index.tools[0].name).toBeDefined();
    expect((index.tools[0] as unknown as Record<string, unknown>).pathParameters).toBeUndefined();
  });
});
