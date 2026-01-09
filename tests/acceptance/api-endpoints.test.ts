/**
 * API Endpoint Acceptance Tests
 *
 * Tests API endpoint behavior under different authentication states:
 * - Unauthenticated: Documentation endpoints work, API execution fails gracefully
 * - Authenticated: Both documentation and API execution work
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { createServer, F5XCApiServer } from "../../src/server.js";
import { CredentialManager, AuthMode } from "@robinmordasiewicz/f5xc-auth";
import {
  clearF5XCEnvVars,
  setupDocumentationModeEnv,
  setupAuthenticatedModeEnv,
  isCI,
} from "../utils/ci-environment.js";

// Mock MCP SDK for unit testing
const mockConnect = vi.fn().mockResolvedValue(undefined);
const mockClose = vi.fn().mockResolvedValue(undefined);
const mockTool = vi.fn();
const mockResource = vi.fn();
const mockPrompt = vi.fn();

vi.mock("@modelcontextprotocol/sdk/server/mcp.js", () => {
  const MockMcpServer = function (this: Record<string, unknown>) {
    this.connect = mockConnect;
    this.close = mockClose;
    this.tool = mockTool;
    this.resource = mockResource;
    this.prompt = mockPrompt;
  } as unknown as new (config: { name: string; version: string }) => {
    connect: typeof mockConnect;
    close: typeof mockClose;
    tool: typeof mockTool;
    resource: typeof mockResource;
    prompt: typeof mockPrompt;
  };

  return { McpServer: MockMcpServer };
});

vi.mock("@modelcontextprotocol/sdk/server/stdio.js", () => {
  const MockStdioServerTransport = function () {
    // Empty transport mock
  } as unknown as new () => Record<string, never>;

  return { StdioServerTransport: MockStdioServerTransport };
});

// Mock http-client
vi.mock("../../src/auth/http-client.js", () => ({
  createHttpClient: vi.fn().mockReturnValue({
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  }),
  HttpClient: vi.fn(),
}));

// Mock resources
vi.mock("../../src/resources/index.js", () => ({
  RESOURCE_TYPES: {
    http_loadbalancer: {
      type: "http_loadbalancer",
      description: "HTTP Load Balancer",
      namespaceScoped: true,
    },
    namespace: {
      type: "namespace",
      description: "Namespace",
      namespaceScoped: false,
    },
  },
  createResourceHandler: vi.fn().mockImplementation(() => ({
    readResource: vi.fn(),
    listResources: vi.fn(),
    listResourceTemplates: vi.fn().mockReturnValue([]),
  })),
  ResourceHandler: vi.fn(),
}));

// Mock logger
vi.mock("../../src/utils/logging.js", () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
  },
}));

describe("API Endpoint Acceptance Tests", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  // ===========================================================================
  // UNAUTHENTICATED ENDPOINT TESTS
  // ===========================================================================
  describe("Unauthenticated API Endpoints", () => {
    beforeEach(() => {
      setupDocumentationModeEnv();
    });

    describe("Server Info Tool", () => {
      it("should return documentation mode in server info", async () => {
        const server = await createServer();

        // Find the server-info tool handler
        const serverInfoCall = mockTool.mock.calls.find(
          (call) => call[0] === "f5xc-api-server-info"
        );
        expect(serverInfoCall).toBeDefined();

        const handler = serverInfoCall[3];
        const result = await handler();

        const data = JSON.parse(result.content[0].text);
        expect(data.mode).toBe("documentation");
        expect(data.authenticated).toBe(false);
        expect(data.capabilities.documentation).toBe(true);
        expect(data.capabilities.api_execution).toBe(false);
      });

      it("should indicate no tenant URL when unauthenticated", async () => {
        const server = await createServer();

        const serverInfoCall = mockTool.mock.calls.find(
          (call) => call[0] === "f5xc-api-server-info"
        );
        const handler = serverInfoCall[3];
        const result = await handler();

        const data = JSON.parse(result.content[0].text);
        expect(data.tenantUrl).toBeNull();
      });
    });

    describe("Tool Registration", () => {
      it("should register all tools in documentation mode", async () => {
        await createServer();

        // Should have registered tools
        expect(mockTool.mock.calls.length).toBeGreaterThan(0);

        // server-info should always be registered
        const hasServerInfo = mockTool.mock.calls.some(
          (call) => call[0] === "f5xc-api-server-info"
        );
        expect(hasServerInfo).toBe(true);
      });

      it("should register resources in documentation mode", async () => {
        await createServer();

        // Should have registered resources
        expect(mockResource.mock.calls.length).toBeGreaterThan(0);
      });

      it("should register prompts in documentation mode", async () => {
        await createServer();

        // Should have registered prompts
        expect(mockPrompt.mock.calls.length).toBeGreaterThan(0);
      });
    });

    describe("Credential Manager Access", () => {
      it("should expose unauthenticated credential manager", async () => {
        const server = await createServer();
        const credManager = server.getCredentialManager();

        expect(credManager).toBeInstanceOf(CredentialManager);
        expect(credManager.getAuthMode()).toBe(AuthMode.NONE);
        expect(credManager.isAuthenticated()).toBe(false);
      });
    });
  });

  // ===========================================================================
  // AUTHENTICATED ENDPOINT TESTS
  // ===========================================================================
  describe("Authenticated API Endpoints", () => {
    beforeEach(() => {
      setupAuthenticatedModeEnv();
    });

    describe("Server Info Tool", () => {
      it("should return execution mode in server info", async () => {
        const server = await createServer();

        const serverInfoCall = mockTool.mock.calls.find(
          (call) => call[0] === "f5xc-api-server-info"
        );
        expect(serverInfoCall).toBeDefined();

        const handler = serverInfoCall[3];
        const result = await handler();

        const data = JSON.parse(result.content[0].text);
        expect(data.mode).toBe("execution");
        expect(data.authenticated).toBe(true);
        expect(data.capabilities.documentation).toBe(true);
        expect(data.capabilities.api_execution).toBe(true);
      });

      it("should include tenant URL when authenticated", async () => {
        const server = await createServer();

        const serverInfoCall = mockTool.mock.calls.find(
          (call) => call[0] === "f5xc-api-server-info"
        );
        const handler = serverInfoCall[3];
        const result = await handler();

        const data = JSON.parse(result.content[0].text);
        expect(data.tenantUrl).not.toBeNull();
        expect(data.tenantUrl).toContain("console.ves.volterra.io");
      });
    });

    describe("Credential Manager Access", () => {
      it("should expose authenticated credential manager", async () => {
        const server = await createServer();
        const credManager = server.getCredentialManager();

        expect(credManager).toBeInstanceOf(CredentialManager);
        expect(credManager.getAuthMode()).toBe(AuthMode.TOKEN);
        expect(credManager.isAuthenticated()).toBe(true);
      });

      it("should have valid tenant", async () => {
        const server = await createServer();
        const credManager = server.getCredentialManager();

        expect(credManager.getTenant()).toBe("test");
      });

      it("should have valid API URL", async () => {
        const server = await createServer();
        const credManager = server.getCredentialManager();

        // Note: f5xc-auth normalizes API URLs to include /api path
        expect(credManager.getApiUrl()).toBe("https://test.console.ves.volterra.io/api");
      });
    });
  });

  // ===========================================================================
  // STATE TRANSITION TESTS
  // ===========================================================================
  describe("Authentication State Transitions", () => {
    it("should create server correctly when transitioning from unauth to auth", async () => {
      // First, create server in documentation mode
      setupDocumentationModeEnv();
      const server1 = await createServer();
      expect(server1.getCredentialManager().getAuthMode()).toBe(AuthMode.NONE);

      // Then, create new server with authentication
      setupAuthenticatedModeEnv();
      vi.clearAllMocks(); // Clear tool registration mocks
      const server2 = await createServer();
      expect(server2.getCredentialManager().getAuthMode()).toBe(AuthMode.TOKEN);
    });

    it("should maintain independent server instances", async () => {
      setupAuthenticatedModeEnv({
        apiUrl: "https://tenant-a.console.ves.volterra.io",
        apiToken: "token-a",
      });
      const server1 = await createServer();

      setupAuthenticatedModeEnv({
        apiUrl: "https://tenant-b.console.ves.volterra.io",
        apiToken: "token-b",
      });
      vi.clearAllMocks();
      const server2 = await createServer();

      // Servers should have different credentials
      expect(server1.getCredentialManager().getTenant()).toBe("tenant-a");
      expect(server2.getCredentialManager().getTenant()).toBe("tenant-b");
    });
  });

  // ===========================================================================
  // PROMPT REGISTRATION TESTS
  // ===========================================================================
  describe("Prompt Registration", () => {
    it("should register workflow prompts in documentation mode", async () => {
      setupDocumentationModeEnv();
      await createServer();

      // Check for key prompts
      const hasDeployLb = mockPrompt.mock.calls.some(
        (call) => call[0] === "deploy_http_loadbalancer"
      );
      expect(hasDeployLb).toBe(true);
    });

    it("should register workflow prompts in authenticated mode", async () => {
      setupAuthenticatedModeEnv();
      await createServer();

      // Check for key prompts
      const hasDeployLb = mockPrompt.mock.calls.some(
        (call) => call[0] === "deploy_http_loadbalancer"
      );
      expect(hasDeployLb).toBe(true);
    });

    it("should execute prompt handler with arguments", async () => {
      setupDocumentationModeEnv();
      await createServer();

      const deployLbPrompt = mockPrompt.mock.calls.find(
        (call) => call[0] === "deploy_http_loadbalancer"
      );
      expect(deployLbPrompt).toBeDefined();

      const handler = deployLbPrompt[3];
      const result = await handler({
        name: "test-lb",
        namespace: "test-ns",
      });

      expect(result).toBeDefined();
      expect(result.messages).toHaveLength(1);
      expect(result.messages[0].role).toBe("user");
    });
  });

  // ===========================================================================
  // SERVER LIFECYCLE TESTS
  // ===========================================================================
  describe("Server Lifecycle", () => {
    it("should start and stop cleanly in documentation mode", async () => {
      setupDocumentationModeEnv();
      const server = await createServer();

      await server.start();
      expect(mockConnect).toHaveBeenCalled();

      await server.stop();
      expect(mockClose).toHaveBeenCalled();
    });

    it("should start and stop cleanly in authenticated mode", async () => {
      setupAuthenticatedModeEnv();
      const server = await createServer();

      await server.start();
      expect(mockConnect).toHaveBeenCalled();

      await server.stop();
      expect(mockClose).toHaveBeenCalled();
    });

    it("should handle multiple start/stop cycles", async () => {
      setupDocumentationModeEnv();
      const server = await createServer();

      // First cycle
      await server.start();
      await server.stop();

      // Second cycle
      await server.start();
      await server.stop();

      expect(mockConnect).toHaveBeenCalledTimes(2);
      expect(mockClose).toHaveBeenCalledTimes(2);
    });
  });
});

// ===========================================================================
// API CAPABILITY MATRIX
// ===========================================================================
describe("API Capability Matrix", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  const capabilityMatrix: Array<{
    name: string;
    setup: () => void;
    expectedCapabilities: {
      documentation: boolean;
      api_execution: boolean;
    };
  }> = [
    {
      name: "Unauthenticated → Documentation only",
      setup: () => setupDocumentationModeEnv(),
      expectedCapabilities: {
        documentation: true,
        api_execution: false,
      },
    },
    {
      name: "Token authenticated → Full capabilities",
      setup: () => setupAuthenticatedModeEnv(),
      expectedCapabilities: {
        documentation: true,
        api_execution: true,
      },
    },
    {
      name: "Custom tenant → Full capabilities",
      setup: () => setupAuthenticatedModeEnv({
        apiUrl: "https://production.console.ves.volterra.io",
        apiToken: "prod-token",
      }),
      expectedCapabilities: {
        documentation: true,
        api_execution: true,
      },
    },
  ];

  capabilityMatrix.forEach(({ name, setup, expectedCapabilities }) => {
    it(`Capability Matrix: ${name}`, async () => {
      setup();
      const server = await createServer();

      const serverInfoCall = mockTool.mock.calls.find(
        (call) => call[0] === "f5xc-api-server-info"
      );
      const handler = serverInfoCall[3];
      const result = await handler();

      const data = JSON.parse(result.content[0].text);
      expect(data.capabilities.documentation).toBe(expectedCapabilities.documentation);
      expect(data.capabilities.api_execution).toBe(expectedCapabilities.api_execution);
    });
  });
});
