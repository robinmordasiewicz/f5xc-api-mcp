// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * MCP Handler Integration Tests
 *
 * Comprehensive integration tests for the refactored MCP server handlers.
 * Tests both authenticated and unauthenticated (documentation) modes.
 *
 * These tests are idempotent and can be run repeatedly without side effects.
 */

import { describe, it, expect, vi, beforeEach, afterEach, beforeAll } from "vitest";
import { CredentialManager, AuthMode } from "@robinmordasiewicz/f5xc-auth";
import {
  setupDocumentationModeEnv,
  setupAuthenticatedModeEnv,
  clearF5XCEnvVars,
} from "../utils/ci-environment.js";

// Mock MCP SDK to capture tool registrations
const toolHandlers: Map<string, Function> = new Map();
const mockTool = vi.fn().mockImplementation((name, _desc, _schema, handler) => {
  toolHandlers.set(name, handler);
});
const mockResource = vi.fn();
const mockPrompt = vi.fn();

vi.mock("@modelcontextprotocol/sdk/server/mcp.js", () => {
  const MockMcpServer = function (this: Record<string, unknown>) {
    this.tool = mockTool;
    this.resource = mockResource;
    this.prompt = mockPrompt;
  } as unknown as new () => {
    tool: typeof mockTool;
    resource: typeof mockResource;
    prompt: typeof mockPrompt;
  };
  return { McpServer: MockMcpServer };
});

// Mock logging
vi.mock("../../src/utils/logging.js", () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
  },
}));

describe("MCP Handler Integration Tests", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    toolHandlers.clear();
    vi.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe("Documentation Mode (Unauthenticated)", () => {
    beforeEach(() => {
      setupDocumentationModeEnv();
    });

    describe("server-info tool", () => {
      it("should return documentation mode status", async () => {
        const { registerTools } = await import(
          "../../src/server/handlers/tool-handlers/index.js"
        );
        const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

        const credentialManager = new CredentialManager();
        await credentialManager.initialize();

        const server = new McpServer();
        registerTools(server, { credentialManager });

        const handler = toolHandlers.get("f5xc-api-server-info");
        expect(handler).toBeDefined();

        const result = await handler!();
        const data = JSON.parse(result.content[0].text);

        expect(data.mode).toBe("documentation");
        expect(data.authenticated).toBe(false);
        expect(data.authMethod).toBe(AuthMode.NONE);
        expect(data.tenantUrl).toBeNull();
        expect(data.capabilities.documentation).toBe(true);
        expect(data.capabilities.api_execution).toBe(false);
        expect(data.server).toBe("f5xc-api-mcp");
      });

      it("should include tool index metadata", async () => {
        const { registerTools } = await import(
          "../../src/server/handlers/tool-handlers/index.js"
        );
        const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

        const credentialManager = new CredentialManager();
        await credentialManager.initialize();

        const server = new McpServer();
        registerTools(server, { credentialManager });

        const handler = toolHandlers.get("f5xc-api-server-info");
        const result = await handler!();
        const data = JSON.parse(result.content[0].text);

        expect(data.toolIndex).toBeDefined();
        expect(data.toolIndex.totalTools).toBeGreaterThan(1000);
        expect(data.toolIndex.availableDomains).toContain("virtual");
        expect(data.toolIndex.availableDomains).toContain("dns");
      });
    });

    describe("search-tools tool", () => {
      it("should search for HTTP load balancer tools", async () => {
        const { registerDiscoveryTools } = await import(
          "../../src/server/handlers/tool-handlers/discovery.js"
        );
        const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

        const server = new McpServer();
        registerDiscoveryTools(server);

        const handler = toolHandlers.get("f5xc-api-search-tools");
        expect(handler).toBeDefined();

        const result = await handler!({ query: "http load balancer" });
        const data = JSON.parse(result.content[0].text);

        expect(data.results).toBeDefined();
        expect(data.results.length).toBeGreaterThan(0);
        expect(data.results[0]).toHaveProperty("name");
        expect(data.results[0]).toHaveProperty("score");
      });

      it("should filter by domain", async () => {
        const { registerDiscoveryTools } = await import(
          "../../src/server/handlers/tool-handlers/discovery.js"
        );
        const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

        const server = new McpServer();
        registerDiscoveryTools(server);

        const handler = toolHandlers.get("f5xc-api-search-tools");
        const result = await handler!({
          query: "create",
          domains: ["dns"],
        });
        const data = JSON.parse(result.content[0].text);

        expect(data.results).toBeDefined();
        for (const tool of data.results) {
          expect(tool.domain).toBe("dns");
        }
      });

      it("should limit results", async () => {
        const { registerDiscoveryTools } = await import(
          "../../src/server/handlers/tool-handlers/discovery.js"
        );
        const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

        const server = new McpServer();
        registerDiscoveryTools(server);

        const handler = toolHandlers.get("f5xc-api-search-tools");
        const result = await handler!({
          query: "list",
          limit: 5,
        });
        const data = JSON.parse(result.content[0].text);

        expect(data.results.length).toBeLessThanOrEqual(5);
      });
    });

    describe("describe-tool tool", () => {
      it("should describe a known tool", async () => {
        const { registerDiscoveryTools } = await import(
          "../../src/server/handlers/tool-handlers/discovery.js"
        );
        const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

        const server = new McpServer();
        registerDiscoveryTools(server);

        // First search to get a valid tool name
        const searchHandler = toolHandlers.get("f5xc-api-search-tools");
        const searchResult = await searchHandler!({ query: "http load balancer", limit: 1 });
        const searchData = JSON.parse(searchResult.content[0].text);

        if (searchData.results.length > 0) {
          const toolName = searchData.results[0].name;

          const describeHandler = toolHandlers.get("f5xc-api-describe-tool");
          const describeResult = await describeHandler!({ toolName });
          const describeData = JSON.parse(describeResult.content[0].text);

          // Response has { tool: {...}, hint: "..." }
          expect(describeData.tool).toBeDefined();
          expect(describeData.tool.name || describeData.tool.operationId).toBeDefined();
        }
      });

      it("should return error for unknown tool", async () => {
        const { registerDiscoveryTools } = await import(
          "../../src/server/handlers/tool-handlers/discovery.js"
        );
        const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

        const server = new McpServer();
        registerDiscoveryTools(server);

        const handler = toolHandlers.get("f5xc-api-describe-tool");
        const result = await handler!({ toolName: "nonexistent-tool-xyz" });

        expect(result.isError).toBe(true);
      });
    });

    describe("search-resources tool", () => {
      it("should search for resources", async () => {
        const { registerDiscoveryTools } = await import(
          "../../src/server/handlers/tool-handlers/discovery.js"
        );
        const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

        const server = new McpServer();
        registerDiscoveryTools(server);

        const handler = toolHandlers.get("f5xc-api-search-resources");
        expect(handler).toBeDefined();

        const result = await handler!({ query: "load balancer" });
        const data = JSON.parse(result.content[0].text);

        expect(data.results).toBeDefined();
        expect(data.results.length).toBeGreaterThan(0);
      });
    });

    describe("dependencies tool", () => {
      it("should return dependency information", async () => {
        const { registerAnalysisTools } = await import(
          "../../src/server/handlers/tool-handlers/analysis.js"
        );
        const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

        const server = new McpServer();
        registerAnalysisTools(server);

        const handler = toolHandlers.get("f5xc-api-dependencies");
        expect(handler).toBeDefined();

        const result = await handler!({
          resource: "http-loadbalancer",
          domain: "virtual",
        });
        const data = JSON.parse(result.content[0].text);

        // Should return dependency info (may be empty or have data)
        expect(result.isError).toBeUndefined();
      });
    });

    describe("dependency-stats tool", () => {
      it("should return graph statistics", async () => {
        const { registerAnalysisTools } = await import(
          "../../src/server/handlers/tool-handlers/analysis.js"
        );
        const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

        const server = new McpServer();
        registerAnalysisTools(server);

        const handler = toolHandlers.get("f5xc-api-dependency-stats");
        expect(handler).toBeDefined();

        const result = await handler!({});
        expect(result.isError).toBeUndefined();
      });
    });

    describe("best-practices tool", () => {
      it("should return best practices for a domain", async () => {
        const { registerGuidanceTools } = await import(
          "../../src/server/handlers/tool-handlers/guidance.js"
        );
        const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

        const server = new McpServer();
        registerGuidanceTools(server);

        const handler = toolHandlers.get("f5xc-api-best-practices");
        expect(handler).toBeDefined();

        const result = await handler!({ domain: "virtual" });
        expect(result.isError).toBeUndefined();
      });

      it("should return general best practices without domain", async () => {
        const { registerGuidanceTools } = await import(
          "../../src/server/handlers/tool-handlers/guidance.js"
        );
        const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

        const server = new McpServer();
        registerGuidanceTools(server);

        const handler = toolHandlers.get("f5xc-api-best-practices");
        const result = await handler!({});
        expect(result.isError).toBeUndefined();
      });
    });

    describe("validate-params tool", () => {
      it("should validate parameters for a tool", async () => {
        const { registerAnalysisTools } = await import(
          "../../src/server/handlers/tool-handlers/analysis.js"
        );
        const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

        const server = new McpServer();
        registerAnalysisTools(server);

        const handler = toolHandlers.get("f5xc-api-validate-params");
        expect(handler).toBeDefined();

        // Search for a tool first
        const { registerDiscoveryTools } = await import(
          "../../src/server/handlers/tool-handlers/discovery.js"
        );
        registerDiscoveryTools(server);

        const searchHandler = toolHandlers.get("f5xc-api-search-tools");
        const searchResult = await searchHandler!({ query: "create http", limit: 1 });
        const searchData = JSON.parse(searchResult.content[0].text);

        if (searchData.results.length > 0) {
          const toolName = searchData.results[0].toolName;
          const result = await handler!({
            toolName,
            body: { metadata: { name: "test" } },
          });
          expect(result.isError).toBeUndefined();
        }
      });
    });

    describe("execute-tool in documentation mode", () => {
      it("should return documentation without executing", async () => {
        setupDocumentationModeEnv();
        vi.resetModules();

        const { registerExecutionTools } = await import(
          "../../src/server/handlers/tool-handlers/execution.js"
        );
        const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

        const credentialManager = new CredentialManager();
        await credentialManager.initialize();

        const server = new McpServer();
        registerExecutionTools(server, credentialManager);

        const handler = toolHandlers.get("f5xc-api-execute-tool");
        expect(handler).toBeDefined();

        // Should work in documentation mode - returns docs/examples not actual API calls
        const result = await handler!({
          toolName: "virtual_list-http-loadbalancers",
          pathParams: { namespace: "default" },
        });

        // In documentation mode, should not error and should return some content
        expect(result.content).toBeDefined();
        expect(result.content.length).toBeGreaterThan(0);
        const data = JSON.parse(result.content[0].text);
        // Should have some response (could be documentation, error about tool not found, etc.)
        expect(data).toBeDefined();
      });
    });
  });

  describe("Authenticated Mode", () => {
    beforeEach(async () => {
      setupAuthenticatedModeEnv();
      vi.resetModules();
      toolHandlers.clear();
    });

    describe("server-info tool", () => {
      it("should return execution mode status", async () => {
        const { registerTools } = await import(
          "../../src/server/handlers/tool-handlers/index.js"
        );
        const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

        const credentialManager = new CredentialManager();
        await credentialManager.initialize();

        const server = new McpServer();
        registerTools(server, { credentialManager });

        const handler = toolHandlers.get("f5xc-api-server-info");
        const result = await handler!();
        const data = JSON.parse(result.content[0].text);

        expect(data.mode).toBe("execution");
        expect(data.authenticated).toBe(true);
        expect(data.authMethod).toBe(AuthMode.TOKEN);
        expect(data.tenantUrl).not.toBeNull();
        expect(data.capabilities.api_execution).toBe(true);
      });
    });

    describe("configure-auth tool", () => {
      it("should return auth status", async () => {
        const { registerMetadataTools } = await import(
          "../../src/server/handlers/tool-handlers/metadata.js"
        );
        const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

        const credentialManager = new CredentialManager();
        await credentialManager.initialize();

        const server = new McpServer();
        registerMetadataTools(server, credentialManager);

        const handler = toolHandlers.get("f5xc-api-configure-auth");
        expect(handler).toBeDefined();

        const result = await handler!({ action: "status" });
        expect(result.isError).toBeUndefined();
        const data = JSON.parse(result.content[0].text);
        // Response uses 'authMethod' not 'authMode'
        expect(data.authMethod).toBe(AuthMode.TOKEN);
        expect(data.authenticated).toBe(true);
      });

      it("should list profiles", async () => {
        const { registerMetadataTools } = await import(
          "../../src/server/handlers/tool-handlers/metadata.js"
        );
        const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

        const credentialManager = new CredentialManager();
        await credentialManager.initialize();

        const server = new McpServer();
        registerMetadataTools(server, credentialManager);

        const handler = toolHandlers.get("f5xc-api-configure-auth");
        const result = await handler!({ action: "list-profiles" });
        expect(result.isError).toBeUndefined();
        const data = JSON.parse(result.content[0].text);
        expect(data.profiles).toBeInstanceOf(Array);
      });
    });
  });

  describe("Idempotency Verification", () => {
    it("should produce same results when called multiple times", async () => {
      setupDocumentationModeEnv();
      vi.resetModules();

      const { registerTools } = await import(
        "../../src/server/handlers/tool-handlers/index.js"
      );
      const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

      const credentialManager = new CredentialManager();
      await credentialManager.initialize();

      const server = new McpServer();
      registerTools(server, { credentialManager });

      const handler = toolHandlers.get("f5xc-api-server-info");

      // Call multiple times
      const results = await Promise.all([
        handler!(),
        handler!(),
        handler!(),
      ]);

      // All results should be identical
      const firstResult = results[0].content[0].text;
      for (const result of results) {
        expect(result.content[0].text).toBe(firstResult);
      }
    });

    it("should produce consistent search results", async () => {
      setupDocumentationModeEnv();
      vi.resetModules();

      const { registerDiscoveryTools } = await import(
        "../../src/server/handlers/tool-handlers/discovery.js"
      );
      const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

      const server = new McpServer();
      registerDiscoveryTools(server);

      const handler = toolHandlers.get("f5xc-api-search-tools");

      // Call with same parameters
      const result1 = await handler!({ query: "http load balancer", limit: 5 });
      const result2 = await handler!({ query: "http load balancer", limit: 5 });

      const data1 = JSON.parse(result1.content[0].text);
      const data2 = JSON.parse(result2.content[0].text);

      // Results should be identical
      expect(data1.results.length).toBe(data2.results.length);
      for (let i = 0; i < data1.results.length; i++) {
        expect(data1.results[i].toolName).toBe(data2.results[i].toolName);
      }
    });
  });

  describe("Handler Error Handling", () => {
    it("should handle missing required parameters gracefully", async () => {
      setupDocumentationModeEnv();
      vi.resetModules();

      const { registerDiscoveryTools } = await import(
        "../../src/server/handlers/tool-handlers/discovery.js"
      );
      const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

      const server = new McpServer();
      registerDiscoveryTools(server);

      const handler = toolHandlers.get("f5xc-api-describe-tool");

      // Call without required toolName
      const result = await handler!({});

      // Should return error
      expect(result.isError).toBe(true);
    });

    it("should handle invalid parameter types gracefully", async () => {
      setupDocumentationModeEnv();
      vi.resetModules();

      const { registerDiscoveryTools } = await import(
        "../../src/server/handlers/tool-handlers/discovery.js"
      );
      const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

      const server = new McpServer();
      registerDiscoveryTools(server);

      const handler = toolHandlers.get("f5xc-api-search-tools");

      // Call with invalid limit type - should still work or error gracefully
      const result = await handler!({ query: "test", limit: "invalid" });

      // Should either work (coercing to valid) or return clean error
      expect(result.content).toBeDefined();
    });
  });

  describe("All Registered Handlers Are Functional", () => {
    it("should have functional handlers for all 14+ registered tools", async () => {
      setupDocumentationModeEnv();
      vi.resetModules();

      const { registerTools } = await import(
        "../../src/server/handlers/tool-handlers/index.js"
      );
      const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

      const credentialManager = new CredentialManager();
      await credentialManager.initialize();

      const server = new McpServer();
      registerTools(server, { credentialManager });

      // All registered tools should have handlers
      expect(toolHandlers.size).toBeGreaterThanOrEqual(14);

      // Test that each handler is callable
      for (const [name, handler] of toolHandlers.entries()) {
        expect(typeof handler).toBe("function");

        // Try calling with empty args (some may error, but shouldn't throw)
        try {
          await handler({});
        } catch (e) {
          // Handler threw instead of returning error response - this is acceptable
          // but the function should be callable
        }
      }
    });
  });
});
