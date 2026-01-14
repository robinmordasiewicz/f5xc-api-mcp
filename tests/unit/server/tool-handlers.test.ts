// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Unit Tests for Refactored Tool Handlers
 *
 * Tests the modular tool handler architecture extracted from server.ts.
 * Validates that all tool registration functions work correctly in
 * both authenticated and unauthenticated modes.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { CredentialManager, AuthMode } from "@robinmordasiewicz/f5xc-auth";
import {
  setupDocumentationModeEnv,
  setupAuthenticatedModeEnv,
} from "../../utils/ci-environment.js";

// Mock MCP SDK
const {
  mockTool,
  mockResource,
  mockPrompt,
} = vi.hoisted(() => ({
  mockTool: vi.fn(),
  mockResource: vi.fn(),
  mockPrompt: vi.fn(),
}));

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
vi.mock("../../../src/utils/logging.js", () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
  },
}));

describe("tool-handlers", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };
    setupDocumentationModeEnv();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe("registerTools orchestrator", () => {
    it("should register all tool categories", async () => {
      const { registerTools } = await import(
        "../../../src/server/handlers/tool-handlers/index.js"
      );
      const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

      const credentialManager = new CredentialManager();
      await credentialManager.initialize();

      const server = new McpServer();
      registerTools(server, { credentialManager });

      // Should register multiple tools
      expect(mockTool).toHaveBeenCalled();

      // Verify key tools are registered
      const toolNames = mockTool.mock.calls.map((call) => call[0]);

      // Metadata tools
      expect(toolNames).toContain("f5xc-api-server-info");
      expect(toolNames).toContain("f5xc-api-configure-auth");

      // Discovery tools
      expect(toolNames).toContain("f5xc-api-search-tools");
      expect(toolNames).toContain("f5xc-api-describe-tool");
      expect(toolNames).toContain("f5xc-api-get-schema");
      expect(toolNames).toContain("f5xc-api-suggest-parameters");

      // Execution tools
      expect(toolNames).toContain("f5xc-api-execute-tool");
      expect(toolNames).toContain("f5xc-api-execute-resource");

      // Analysis tools
      expect(toolNames).toContain("f5xc-api-dependencies");
      expect(toolNames).toContain("f5xc-api-dependency-stats");
      expect(toolNames).toContain("f5xc-api-validate-params");

      // Planning tools
      expect(toolNames).toContain("f5xc-api-resolve-dependencies");
      expect(toolNames).toContain("f5xc-api-estimate-cost");

      // Guidance tools
      expect(toolNames).toContain("f5xc-api-best-practices");
    });

    it("should register at least 14 tools", async () => {
      const { registerTools } = await import(
        "../../../src/server/handlers/tool-handlers/index.js"
      );
      const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

      const credentialManager = new CredentialManager();
      await credentialManager.initialize();

      const server = new McpServer();
      registerTools(server, { credentialManager });

      // At least 14 core tools (may be more as features expand)
      expect(mockTool.mock.calls.length).toBeGreaterThanOrEqual(14);
    });
  });

  describe("metadata tools", () => {
    describe("server-info tool", () => {
      it("should return documentation mode when unauthenticated", async () => {
        const { registerMetadataTools } = await import(
          "../../../src/server/handlers/tool-handlers/metadata.js"
        );
        const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

        const credentialManager = new CredentialManager();
        await credentialManager.initialize();

        const server = new McpServer();
        registerMetadataTools(server, credentialManager);

        // Find server-info handler
        const serverInfoCall = mockTool.mock.calls.find(
          (call) => call[0] === "f5xc-api-server-info"
        );
        expect(serverInfoCall).toBeDefined();

        const handler = serverInfoCall[3];
        const result = await handler();

        expect(result.content).toHaveLength(1);
        const data = JSON.parse(result.content[0].text);
        expect(data.mode).toBe("documentation");
        expect(data.authenticated).toBe(false);
        expect(data.capabilities.api_execution).toBe(false);
      });

      it("should return execution mode when authenticated", async () => {
        setupAuthenticatedModeEnv();

        // Clear module cache to pick up new env vars
        vi.resetModules();

        const { registerMetadataTools } = await import(
          "../../../src/server/handlers/tool-handlers/metadata.js"
        );
        const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

        const credentialManager = new CredentialManager();
        await credentialManager.initialize();

        const server = new McpServer();
        registerMetadataTools(server, credentialManager);

        const serverInfoCall = mockTool.mock.calls.find(
          (call) => call[0] === "f5xc-api-server-info"
        );
        const handler = serverInfoCall[3];
        const result = await handler();

        const data = JSON.parse(result.content[0].text);
        expect(data.mode).toBe("execution");
        expect(data.authenticated).toBe(true);
        expect(data.capabilities.api_execution).toBe(true);
      });

      it("should include tool index information", async () => {
        const { registerMetadataTools } = await import(
          "../../../src/server/handlers/tool-handlers/metadata.js"
        );
        const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

        const credentialManager = new CredentialManager();
        await credentialManager.initialize();

        const server = new McpServer();
        registerMetadataTools(server, credentialManager);

        const serverInfoCall = mockTool.mock.calls.find(
          (call) => call[0] === "f5xc-api-server-info"
        );
        const handler = serverInfoCall[3];
        const result = await handler();

        const data = JSON.parse(result.content[0].text);
        expect(data.toolIndex).toBeDefined();
        expect(data.toolIndex.totalTools).toBeGreaterThan(0);
        expect(data.toolIndex.domains).toBeDefined();
        expect(data.toolIndex.availableDomains).toBeInstanceOf(Array);
        expect(data.toolIndex.availableDomains.length).toBeGreaterThan(0);
      });

      it("should include consolidation stats", async () => {
        const { registerMetadataTools } = await import(
          "../../../src/server/handlers/tool-handlers/metadata.js"
        );
        const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

        const credentialManager = new CredentialManager();
        await credentialManager.initialize();

        const server = new McpServer();
        registerMetadataTools(server, credentialManager);

        const serverInfoCall = mockTool.mock.calls.find(
          (call) => call[0] === "f5xc-api-server-info"
        );
        const handler = serverInfoCall[3];
        const result = await handler();

        const data = JSON.parse(result.content[0].text);
        expect(data.consolidation).toBeDefined();
      });

      it("should list all discovery tools", async () => {
        const { registerMetadataTools } = await import(
          "../../../src/server/handlers/tool-handlers/metadata.js"
        );
        const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

        const credentialManager = new CredentialManager();
        await credentialManager.initialize();

        const server = new McpServer();
        registerMetadataTools(server, credentialManager);

        const serverInfoCall = mockTool.mock.calls.find(
          (call) => call[0] === "f5xc-api-server-info"
        );
        const handler = serverInfoCall[3];
        const result = await handler();

        const data = JSON.parse(result.content[0].text);
        expect(data.discoveryTools).toContain("f5xc-api-search-tools");
        expect(data.discoveryTools).toContain("f5xc-api-execute-tool");
        expect(data.discoveryTools).toContain("f5xc-api-best-practices");
      });
    });

    describe("configure-auth tool", () => {
      it("should register configure-auth tool with correct schema", async () => {
        const { registerMetadataTools } = await import(
          "../../../src/server/handlers/tool-handlers/metadata.js"
        );
        const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

        const credentialManager = new CredentialManager();
        await credentialManager.initialize();

        const server = new McpServer();
        registerMetadataTools(server, credentialManager);

        const configureAuthCall = mockTool.mock.calls.find(
          (call) => call[0] === "f5xc-api-configure-auth"
        );
        expect(configureAuthCall).toBeDefined();

        // Verify schema has expected parameters
        const schema = configureAuthCall[2];
        expect(schema).toHaveProperty("action");
        expect(schema).toHaveProperty("tenantUrl");
        expect(schema).toHaveProperty("apiToken");
        expect(schema).toHaveProperty("profileName");
      });
    });
  });

  describe("discovery tools", () => {
    it("should register search-tools with correct schema", async () => {
      const { registerDiscoveryTools } = await import(
        "../../../src/server/handlers/tool-handlers/discovery.js"
      );
      const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

      const server = new McpServer();
      registerDiscoveryTools(server);

      const searchToolsCall = mockTool.mock.calls.find(
        (call) => call[0] === "f5xc-api-search-tools"
      );
      expect(searchToolsCall).toBeDefined();

      const schema = searchToolsCall[2];
      expect(schema).toHaveProperty("query");
    });

    it("should register describe-tool with toolName parameter", async () => {
      const { registerDiscoveryTools } = await import(
        "../../../src/server/handlers/tool-handlers/discovery.js"
      );
      const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

      const server = new McpServer();
      registerDiscoveryTools(server);

      const describeToolCall = mockTool.mock.calls.find(
        (call) => call[0] === "f5xc-api-describe-tool"
      );
      expect(describeToolCall).toBeDefined();

      const schema = describeToolCall[2];
      expect(schema).toHaveProperty("toolName");
    });

    it("should register all 5 discovery tools", async () => {
      const { registerDiscoveryTools } = await import(
        "../../../src/server/handlers/tool-handlers/discovery.js"
      );
      const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

      const server = new McpServer();
      registerDiscoveryTools(server);

      const expectedTools = [
        "f5xc-api-search-tools",
        "f5xc-api-describe-tool",
        "f5xc-api-get-schema",
        "f5xc-api-suggest-parameters",
        "f5xc-api-search-resources",
      ];

      const registeredTools = mockTool.mock.calls.map((call) => call[0]);
      for (const tool of expectedTools) {
        expect(registeredTools).toContain(tool);
      }
    });
  });

  describe("execution tools", () => {
    it("should register execute-tool", async () => {
      setupAuthenticatedModeEnv();
      vi.resetModules();

      const { registerExecutionTools } = await import(
        "../../../src/server/handlers/tool-handlers/execution.js"
      );
      const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

      const credentialManager = new CredentialManager();
      await credentialManager.initialize();

      const server = new McpServer();
      registerExecutionTools(server, credentialManager);

      const executeToolCall = mockTool.mock.calls.find(
        (call) => call[0] === "f5xc-api-execute-tool"
      );
      expect(executeToolCall).toBeDefined();
    });

    it("should register execute-resource", async () => {
      setupAuthenticatedModeEnv();
      vi.resetModules();

      const { registerExecutionTools } = await import(
        "../../../src/server/handlers/tool-handlers/execution.js"
      );
      const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

      const credentialManager = new CredentialManager();
      await credentialManager.initialize();

      const server = new McpServer();
      registerExecutionTools(server, credentialManager);

      const executeResourceCall = mockTool.mock.calls.find(
        (call) => call[0] === "f5xc-api-execute-resource"
      );
      expect(executeResourceCall).toBeDefined();
    });
  });

  describe("analysis tools", () => {
    it("should register dependencies tool", async () => {
      const { registerAnalysisTools } = await import(
        "../../../src/server/handlers/tool-handlers/analysis.js"
      );
      const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

      const server = new McpServer();
      registerAnalysisTools(server);

      const depsCall = mockTool.mock.calls.find(
        (call) => call[0] === "f5xc-api-dependencies"
      );
      expect(depsCall).toBeDefined();

      const schema = depsCall[2];
      expect(schema).toHaveProperty("resource");
      expect(schema).toHaveProperty("domain");
    });

    it("should register validate-params tool", async () => {
      const { registerAnalysisTools } = await import(
        "../../../src/server/handlers/tool-handlers/analysis.js"
      );
      const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

      const server = new McpServer();
      registerAnalysisTools(server);

      const validateCall = mockTool.mock.calls.find(
        (call) => call[0] === "f5xc-api-validate-params"
      );
      expect(validateCall).toBeDefined();
    });
  });

  describe("planning tools", () => {
    it("should register resolve-dependencies tool", async () => {
      const { registerPlanningTools } = await import(
        "../../../src/server/handlers/tool-handlers/planning.js"
      );
      const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

      const server = new McpServer();
      registerPlanningTools(server);

      const resolveCall = mockTool.mock.calls.find(
        (call) => call[0] === "f5xc-api-resolve-dependencies"
      );
      expect(resolveCall).toBeDefined();
    });

    it("should register estimate-cost tool", async () => {
      const { registerPlanningTools } = await import(
        "../../../src/server/handlers/tool-handlers/planning.js"
      );
      const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

      const server = new McpServer();
      registerPlanningTools(server);

      const estimateCall = mockTool.mock.calls.find(
        (call) => call[0] === "f5xc-api-estimate-cost"
      );
      expect(estimateCall).toBeDefined();
    });
  });

  describe("guidance tools", () => {
    it("should register best-practices tool", async () => {
      const { registerGuidanceTools } = await import(
        "../../../src/server/handlers/tool-handlers/guidance.js"
      );
      const { McpServer } = await import("@modelcontextprotocol/sdk/server/mcp.js");

      const server = new McpServer();
      registerGuidanceTools(server);

      const bpCall = mockTool.mock.calls.find(
        (call) => call[0] === "f5xc-api-best-practices"
      );
      expect(bpCall).toBeDefined();

      const schema = bpCall[2];
      expect(schema).toHaveProperty("domain");
    });
  });
});
