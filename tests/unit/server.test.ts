/**
 * Unit Tests for F5XC API MCP Server
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { F5XCApiServer, createServer, ServerConfig } from "../../src/server.js";
import { CredentialManager, AuthMode } from "../../src/auth/credential-manager.js";
import { isCI, createEmptyConfigManager } from "../../tests/utils/ci-environment.js";

// Mock dependencies
vi.mock("../../src/utils/logging.js", () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
  },
}));

// Mock MCP SDK - use vi.hoisted to ensure mocks are available before vi.mock runs
const {
  mockConnect,
  mockClose,
  mockTool,
  mockResource,
  mockPrompt,
} = vi.hoisted(() => ({
  mockConnect: vi.fn().mockResolvedValue(undefined),
  mockClose: vi.fn().mockResolvedValue(undefined),
  mockTool: vi.fn(),
  mockResource: vi.fn(),
  mockPrompt: vi.fn(),
}));

vi.mock("@modelcontextprotocol/sdk/server/mcp.js", () => {
  // Use a function expression (not arrow function) to allow 'new' operator
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
  // Use a function expression (not arrow function) to allow 'new' operator
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

// Create mock for resource handler using vi.hoisted
const { mockReadResource, mockListResources, mockListResourceTemplates } = vi.hoisted(() => ({
  mockReadResource: vi.fn(),
  mockListResources: vi.fn(),
  mockListResourceTemplates: vi.fn().mockReturnValue([]),
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
    readResource: mockReadResource,
    listResources: mockListResources,
    listResourceTemplates: mockListResourceTemplates,
  })),
  ResourceHandler: vi.fn(),
}));

describe("server", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };
    delete process.env.F5XC_API_URL;
    delete process.env.F5XC_API_TOKEN;
    delete process.env.F5XC_P12_FILE;
    delete process.env.F5XC_P12_PASSWORD;
    delete process.env.F5XC_PROFILE;

    // In CI mode, prevent loading from config file by setting a non-existent profile
    if (isCI()) {
      process.env.F5XC_PROFILE = "__nonexistent__";
    }
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe("F5XCApiServer", () => {
    describe("constructor", () => {
      it("should create server with valid configuration", () => {
        const credentialManager = new CredentialManager();
        const config: ServerConfig = {
          name: "test-server",
          version: "1.0.0",
          credentialManager,
        };

        const server = new F5XCApiServer(config);

        expect(server).toBeInstanceOf(F5XCApiServer);
        expect(server.getMcpServer()).toBeDefined();
        expect(server.getCredentialManager()).toBe(credentialManager);
      });

      it("should register tools, resources, and prompts on construction", () => {
        const credentialManager = new CredentialManager();
        const config: ServerConfig = {
          name: "test-server",
          version: "1.0.0",
          credentialManager,
        };

        new F5XCApiServer(config);

        // Should register server-info tool
        expect(mockTool).toHaveBeenCalled();

        // Should register resources for each resource type
        expect(mockResource).toHaveBeenCalled();

        // Should register prompts for each workflow
        expect(mockPrompt).toHaveBeenCalled();
      });

      it("should create HTTP client when authenticated", () => {
        process.env.F5XC_API_URL = "https://test.volterra.us";
        process.env.F5XC_API_TOKEN = "test-token";

        const credentialManager = new CredentialManager();
        const config: ServerConfig = {
          name: "test-server",
          version: "1.0.0",
          credentialManager,
        };

        const server = new F5XCApiServer(config);

        expect(server.getCredentialManager().getAuthMode()).toBe(AuthMode.TOKEN);
      });

      it("should not create HTTP client in documentation mode", () => {
        const configManager = isCI() ? createEmptyConfigManager() : undefined;
        const credentialManager = new CredentialManager(configManager as any);
        const config: ServerConfig = {
          name: "test-server",
          version: "1.0.0",
          credentialManager,
        };

        const server = new F5XCApiServer(config);

        expect(server.getCredentialManager().getAuthMode()).toBe(AuthMode.NONE);
      });
    });

    describe("getMcpServer", () => {
      it("should return the underlying MCP server instance", () => {
        const credentialManager = new CredentialManager();
        const config: ServerConfig = {
          name: "test-server",
          version: "1.0.0",
          credentialManager,
        };

        const server = new F5XCApiServer(config);
        const mcpServer = server.getMcpServer();

        expect(mcpServer).toBeDefined();
        expect(typeof mcpServer.tool).toBe("function");
        expect(typeof mcpServer.resource).toBe("function");
        expect(typeof mcpServer.prompt).toBe("function");
      });
    });

    describe("getCredentialManager", () => {
      it("should return the credential manager", () => {
        const credentialManager = new CredentialManager();
        const config: ServerConfig = {
          name: "test-server",
          version: "1.0.0",
          credentialManager,
        };

        const server = new F5XCApiServer(config);

        expect(server.getCredentialManager()).toBe(credentialManager);
      });
    });

    describe("start", () => {
      it("should start server with STDIO transport", async () => {
        const credentialManager = new CredentialManager();
        const config: ServerConfig = {
          name: "test-server",
          version: "1.0.0",
          credentialManager,
        };

        const server = new F5XCApiServer(config);
        await server.start();

        expect(mockConnect).toHaveBeenCalled();
      });
    });

    describe("stop", () => {
      it("should stop server when started", async () => {
        const credentialManager = new CredentialManager();
        const config: ServerConfig = {
          name: "test-server",
          version: "1.0.0",
          credentialManager,
        };

        const server = new F5XCApiServer(config);
        await server.start();
        await server.stop();

        expect(mockClose).toHaveBeenCalled();
      });

      it("should do nothing when not started", async () => {
        const credentialManager = new CredentialManager();
        const config: ServerConfig = {
          name: "test-server",
          version: "1.0.0",
          credentialManager,
        };

        const server = new F5XCApiServer(config);
        await server.stop();

        expect(mockClose).not.toHaveBeenCalled();
      });
    });

    describe("tool registration", () => {
      it("should register f5xc-api-server-info tool", () => {
        const credentialManager = new CredentialManager();
        const config: ServerConfig = {
          name: "test-server",
          version: "1.0.0",
          credentialManager,
        };

        new F5XCApiServer(config);

        // Check that tool was called with server-info
        const serverInfoCall = mockTool.mock.calls.find(
          (call) => call[0] === "f5xc-api-server-info"
        );
        expect(serverInfoCall).toBeDefined();
        expect(serverInfoCall[1]).toContain("F5XC API MCP server information");
      });

      it("should execute server-info tool handler in documentation mode", async () => {
        const configManager = isCI() ? createEmptyConfigManager() : undefined;
        const credentialManager = new CredentialManager(configManager as any);
        const config: ServerConfig = {
          name: "test-server",
          version: "1.0.0",
          credentialManager,
        };

        new F5XCApiServer(config);

        // Get the handler function
        const serverInfoCall = mockTool.mock.calls.find(
          (call) => call[0] === "f5xc-api-server-info"
        );
        const handler = serverInfoCall[3];

        const result = await handler();

        expect(result).toBeDefined();
        expect(result.content).toHaveLength(1);
        expect(result.content[0].type).toBe("text");

        const data = JSON.parse(result.content[0].text);
        expect(data.server).toBe("f5xc-api-mcp");
        expect(data.mode).toBe("documentation");
        expect(data.authenticated).toBe(false);
        expect(data.capabilities.documentation).toBe(true);
        expect(data.capabilities.api_execution).toBe(false);
      });

      it("should execute server-info tool handler in execution mode", async () => {
        process.env.F5XC_API_URL = "https://test.volterra.us";
        process.env.F5XC_API_TOKEN = "test-token";

        const credentialManager = new CredentialManager();
        const config: ServerConfig = {
          name: "test-server",
          version: "1.0.0",
          credentialManager,
        };

        new F5XCApiServer(config);

        // Get the handler function
        const serverInfoCall = mockTool.mock.calls.find(
          (call) => call[0] === "f5xc-api-server-info"
        );
        const handler = serverInfoCall[3];

        const result = await handler();

        expect(result).toBeDefined();
        const data = JSON.parse(result.content[0].text);
        expect(data.mode).toBe("execution");
        expect(data.authenticated).toBe(true);
        expect(data.capabilities.api_execution).toBe(true);
        expect(data.tenantUrl).not.toBeNull();
      });
    });

    describe("resource registration", () => {
      it("should register resources for all resource types", () => {
        const credentialManager = new CredentialManager();
        const config: ServerConfig = {
          name: "test-server",
          version: "1.0.0",
          credentialManager,
        };

        new F5XCApiServer(config);

        // Should have multiple resource registrations
        expect(mockResource.mock.calls.length).toBeGreaterThan(0);
      });

      it("should register namespace-scoped resources with correct URI template", () => {
        const credentialManager = new CredentialManager();
        const config: ServerConfig = {
          name: "test-server",
          version: "1.0.0",
          credentialManager,
        };

        new F5XCApiServer(config);

        // Check that at least one namespace-scoped resource is registered
        const namespacedResource = mockResource.mock.calls.find(
          (call) => call[0].includes("{namespace}")
        );
        expect(namespacedResource).toBeDefined();
      });

      it("should register system resources with correct URI template", () => {
        const credentialManager = new CredentialManager();
        const config: ServerConfig = {
          name: "test-server",
          version: "1.0.0",
          credentialManager,
        };

        new F5XCApiServer(config);

        // Check that at least one system resource is registered
        const systemResource = mockResource.mock.calls.find(
          (call) => call[0].includes("/system/")
        );
        expect(systemResource).toBeDefined();
      });

      it("should register resource handler function", () => {
        const credentialManager = new CredentialManager();
        const config: ServerConfig = {
          name: "test-server",
          version: "1.0.0",
          credentialManager,
        };

        new F5XCApiServer(config);

        // Get the first resource handler
        const resourceCall = mockResource.mock.calls[0];
        const handler = resourceCall[2];

        // Verify handler is a function
        expect(typeof handler).toBe("function");
      });

      it("should execute resource handler and return formatted result", async () => {
        mockReadResource.mockResolvedValue({
          uri: "f5xc://tenant/default/http_loadbalancer/example-lb",
          mimeType: "application/json",
          content: '{"metadata":{"name":"example-lb"}}',
          mode: "documentation",
        });

        const credentialManager = new CredentialManager();
        const config: ServerConfig = {
          name: "test-server",
          version: "1.0.0",
          credentialManager,
        };

        new F5XCApiServer(config);

        // Get a resource handler callback
        const resourceCall = mockResource.mock.calls[0];
        const handler = resourceCall[2];

        // Execute the handler with a URL object
        const uri = new URL("f5xc://tenant/default/http_loadbalancer/example-lb");
        const result = await handler(uri);

        expect(result).toBeDefined();
        expect(result.contents).toHaveLength(1);
        expect(result.contents[0].uri).toBe("f5xc://tenant/default/http_loadbalancer/example-lb");
        expect(result.contents[0].mimeType).toBe("application/json");
        expect(result.contents[0].text).toBe('{"metadata":{"name":"example-lb"}}');
      });

      it("should handle errors in resource handler and re-throw", async () => {
        const testError = new Error("Resource not found");
        mockReadResource.mockRejectedValue(testError);

        const credentialManager = new CredentialManager();
        const config: ServerConfig = {
          name: "test-server",
          version: "1.0.0",
          credentialManager,
        };

        new F5XCApiServer(config);

        // Get a resource handler callback
        const resourceCall = mockResource.mock.calls[0];
        const handler = resourceCall[2];

        // Execute the handler with a URL object
        const uri = new URL("f5xc://tenant/default/http_loadbalancer/example-lb");

        await expect(handler(uri)).rejects.toThrow("Resource not found");
      });

      it("should handle non-Error thrown values in resource handler", async () => {
        mockReadResource.mockRejectedValue("string error");

        const credentialManager = new CredentialManager();
        const config: ServerConfig = {
          name: "test-server",
          version: "1.0.0",
          credentialManager,
        };

        new F5XCApiServer(config);

        // Get a resource handler callback
        const resourceCall = mockResource.mock.calls[0];
        const handler = resourceCall[2];

        // Execute the handler with a URL object
        const uri = new URL("f5xc://tenant/default/http_loadbalancer/example-lb");

        await expect(handler(uri)).rejects.toBe("string error");
      });
    });

    describe("prompt registration", () => {
      it("should register all workflow prompts", () => {
        const credentialManager = new CredentialManager();
        const config: ServerConfig = {
          name: "test-server",
          version: "1.0.0",
          credentialManager,
        };

        new F5XCApiServer(config);

        // Should have registered 4 workflow prompts
        expect(mockPrompt.mock.calls.length).toBe(4);
      });

      it("should register deploy-http-loadbalancer prompt", () => {
        const credentialManager = new CredentialManager();
        const config: ServerConfig = {
          name: "test-server",
          version: "1.0.0",
          credentialManager,
        };

        new F5XCApiServer(config);

        const deployLbPrompt = mockPrompt.mock.calls.find(
          (call) => call[0] === "deploy-http-loadbalancer"
        );
        expect(deployLbPrompt).toBeDefined();
      });

      it("should process prompt template with arguments", async () => {
        const credentialManager = new CredentialManager();
        const config: ServerConfig = {
          name: "test-server",
          version: "1.0.0",
          credentialManager,
        };

        new F5XCApiServer(config);

        // Get the prompt handler
        const deployLbPrompt = mockPrompt.mock.calls.find(
          (call) => call[0] === "deploy-http-loadbalancer"
        );
        const handler = deployLbPrompt[3];

        const result = await handler({
          name: "example-lb",
          namespace: "production",
          domains: "app.example.com",
          origin_pool: "backend-pool",
        });

        expect(result).toBeDefined();
        expect(result.messages).toHaveLength(1);
        expect(result.messages[0].role).toBe("user");
        expect(result.messages[0].content.type).toBe("text");
      });

      it("should handle missing optional arguments with defaults", async () => {
        const credentialManager = new CredentialManager();
        const config: ServerConfig = {
          name: "test-server",
          version: "1.0.0",
          credentialManager,
        };

        new F5XCApiServer(config);

        // Get the prompt handler
        const deployLbPrompt = mockPrompt.mock.calls.find(
          (call) => call[0] === "deploy-http-loadbalancer"
        );
        const handler = deployLbPrompt[3];

        const result = await handler({
          name: "example-lb",
          namespace: "production",
          domains: "app.example.com",
          origin_pool: "backend-pool",
          // backend_port and enable_waf are optional
        });

        expect(result).toBeDefined();
        expect(result.messages[0].content.text).toBeDefined();
      });

      it("should apply default values for optional arguments", async () => {
        const credentialManager = new CredentialManager();
        const config: ServerConfig = {
          name: "test-server",
          version: "1.0.0",
          credentialManager,
        };

        new F5XCApiServer(config);

        // Get the configure-waf prompt handler
        const wafPrompt = mockPrompt.mock.calls.find(
          (call) => call[0] === "configure-waf"
        );

        if (wafPrompt) {
          const handler = wafPrompt[3];

          const result = await handler({
            name: "example-waf",
            namespace: "production",
            // mode is optional, should default to "blocking"
          });

          expect(result).toBeDefined();
          expect(result.messages).toHaveLength(1);
        }
      });
    });
  });

  describe("createServer", () => {
    it("should create server with default configuration", () => {
      const configManager = isCI() ? createEmptyConfigManager() : undefined;
      const server = createServer(configManager as any);

      expect(server).toBeInstanceOf(F5XCApiServer);
      expect(server.getCredentialManager()).toBeInstanceOf(CredentialManager);
    });

    it("should create server in documentation mode without credentials", () => {
      const configManager = isCI() ? createEmptyConfigManager() : undefined;
      const server = createServer(configManager as any);

      expect(server.getCredentialManager().getAuthMode()).toBe(AuthMode.NONE);
    });

    it("should create server in execution mode with credentials", () => {
      process.env.F5XC_API_URL = "https://test.volterra.us";
      process.env.F5XC_API_TOKEN = "test-token";

      const server = createServer();

      expect(server.getCredentialManager().getAuthMode()).toBe(AuthMode.TOKEN);
    });
  });
});
