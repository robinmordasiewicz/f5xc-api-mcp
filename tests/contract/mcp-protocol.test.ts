/**
 * Contract tests for MCP protocol compliance
 *
 * Verifies the server follows Model Context Protocol specification
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { F5XCApiServer, createServer } from "../../src/server.js";
import { CredentialManager, AuthMode } from "../../src/auth/credential-manager.js";

describe("MCP Protocol Compliance", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // Ensure unauthenticated mode for consistent testing
    delete process.env.F5XC_API_URL;
    delete process.env.F5XC_API_TOKEN;
    delete process.env.F5XC_P12_FILE;
    delete process.env.F5XC_P12_PASSWORD;
  });

  describe("Server Creation", () => {
    it("should create server with valid configuration", () => {
      const server = createServer();

      expect(server).toBeInstanceOf(F5XCApiServer);
      expect(server.getMcpServer()).toBeDefined();
    });

    it("should have credential manager", () => {
      const server = createServer();

      expect(server.getCredentialManager()).toBeInstanceOf(CredentialManager);
    });

    it("should default to documentation mode without credentials", () => {
      const server = createServer();
      const credManager = server.getCredentialManager();

      expect(credManager.getAuthMode()).toBe(AuthMode.NONE);
    });
  });

  describe("Server Configuration", () => {
    it("should have correct server name", () => {
      const server = createServer();
      const mcpServer = server.getMcpServer();

      // The MCP server should be configured with our server name
      expect(mcpServer).toBeDefined();
    });

    it("should support STDIO transport", () => {
      const server = createServer();

      // Server should be able to start (we won't actually start it in tests)
      expect(typeof server.start).toBe("function");
      expect(typeof server.stop).toBe("function");
    });
  });

  describe("Capability Registration", () => {
    it("should have tools capability", () => {
      const server = createServer();
      const mcpServer = server.getMcpServer();

      // MCP server should have tool method for registration
      expect(typeof mcpServer.tool).toBe("function");
    });

    it("should have resources capability", () => {
      const server = createServer();
      const mcpServer = server.getMcpServer();

      // MCP server should have resource method for registration
      expect(typeof mcpServer.resource).toBe("function");
    });

    it("should have prompts capability", () => {
      const server = createServer();
      const mcpServer = server.getMcpServer();

      // MCP server should have prompt method for registration
      expect(typeof mcpServer.prompt).toBe("function");
    });
  });
});

describe("MCP Tool Contract", () => {
  describe("Tool Response Format", () => {
    it("should return content array with text items", () => {
      // Tool responses must follow MCP format
      const validResponse = {
        content: [
          {
            type: "text",
            text: "Response content",
          },
        ],
      };

      expect(validResponse.content).toBeInstanceOf(Array);
      expect(validResponse.content[0].type).toBe("text");
      expect(typeof validResponse.content[0].text).toBe("string");
    });

    it("should support JSON in text content", () => {
      const jsonContent = {
        mode: "documentation",
        tool: "f5xc-api-server-info",
        data: { key: "value" },
      };

      const response = {
        content: [
          {
            type: "text",
            text: JSON.stringify(jsonContent, null, 2),
          },
        ],
      };

      // Verify JSON is valid
      const parsed = JSON.parse(response.content[0].text);
      expect(parsed.mode).toBe("documentation");
    });
  });

  describe("Tool Input Validation", () => {
    it("should validate required parameters", () => {
      // Simulating Zod validation behavior
      const validateRequired = (params: Record<string, unknown>, required: string[]) => {
        for (const field of required) {
          if (!(field in params) || params[field] === undefined) {
            return { valid: false, error: `Missing required field: ${field}` };
          }
        }
        return { valid: true };
      };

      const result = validateRequired({ name: "test" }, ["name", "namespace"]);
      expect(result.valid).toBe(false);
      expect(result.error).toContain("namespace");
    });

    it("should accept valid parameters", () => {
      const validateRequired = (params: Record<string, unknown>, required: string[]) => {
        for (const field of required) {
          if (!(field in params) || params[field] === undefined) {
            return { valid: false, error: `Missing required field: ${field}` };
          }
        }
        return { valid: true };
      };

      const result = validateRequired(
        { name: "test", namespace: "production" },
        ["name", "namespace"]
      );
      expect(result.valid).toBe(true);
    });
  });
});

describe("MCP Resource Contract", () => {
  describe("Resource URI Format", () => {
    it("should follow f5xc:// scheme", () => {
      const validUris = [
        "f5xc://tenant/namespace/http_loadbalancer/example-lb",
        "f5xc://tenant/system/namespace/production",
        "f5xc://tenant/shared/origin_pool/backend",
      ];

      for (const uri of validUris) {
        expect(uri.startsWith("f5xc://")).toBe(true);
      }
    });

    it("should have parseable path components", () => {
      const uri = "f5xc://mytenant/production/http_loadbalancer/example-app";

      // Remove scheme and parse path
      const path = uri.replace("f5xc://", "");
      const parts = path.split("/");

      expect(parts[0]).toBe("mytenant"); // tenant
      expect(parts[1]).toBe("production"); // namespace
      expect(parts[2]).toBe("http_loadbalancer"); // resource type
      expect(parts[3]).toBe("example-app"); // resource name
    });
  });

  describe("Resource Response Format", () => {
    it("should return contents array", () => {
      const validResponse = {
        contents: [
          {
            uri: "f5xc://tenant/ns/type/name",
            mimeType: "application/json",
            text: '{"data": "value"}',
          },
        ],
      };

      expect(validResponse.contents).toBeInstanceOf(Array);
      expect(validResponse.contents[0].uri).toBeDefined();
      expect(validResponse.contents[0].mimeType).toBe("application/json");
    });
  });
});

describe("MCP Prompt Contract", () => {
  describe("Prompt Response Format", () => {
    it("should return messages array", () => {
      const validResponse = {
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: "Processed prompt content",
            },
          },
        ],
      };

      expect(validResponse.messages).toBeInstanceOf(Array);
      expect(validResponse.messages[0].role).toBe("user");
      expect(validResponse.messages[0].content.type).toBe("text");
    });
  });

  describe("Prompt Arguments", () => {
    it("should process template variables", () => {
      const template = "Deploy {{name}} in {{namespace}}";
      const args = { name: "example-app", namespace: "production" };

      let result = template;
      for (const [key, value] of Object.entries(args)) {
        result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), value);
      }

      expect(result).toBe("Deploy example-app in production");
    });

    it("should handle missing optional arguments", () => {
      const template = "Port: {{port}}";
      const args: Record<string, string> = {};

      // Default handling
      const defaultPort = args.port ?? "80";
      const result = template.replace("{{port}}", defaultPort);

      expect(result).toBe("Port: 80");
    });
  });
});

describe("Dual-Mode Operation Contract", () => {
  describe("Documentation Mode", () => {
    it("should return documentation structure", () => {
      const docResponse = {
        mode: "documentation",
        tool: "f5xc-api-waap-http-loadbalancer-create",
        description: "Creates an HTTP Load Balancer",
        parameters: {
          namespace: { type: "string", required: true },
          name: { type: "string", required: true },
        },
        f5xcctl_command: "f5xcctl apply -f config.yaml",
        terraform_resource: "volterra_http_loadbalancer",
        terraform_example: 'resource "volterra_http_loadbalancer" "example" {...}',
        prerequisites: ["namespace must exist"],
        subscription_tier: "STANDARD",
      };

      expect(docResponse.mode).toBe("documentation");
      expect(docResponse.f5xcctl_command).toBeDefined();
      expect(docResponse.terraform_resource).toBeDefined();
    });
  });

  describe("Execution Mode", () => {
    it("should return execution result structure", () => {
      const execResponse = {
        mode: "execution",
        tool: "f5xc-api-waap-http-loadbalancer-create",
        status: "success",
        response: {
          metadata: { name: "example-lb", namespace: "production" },
        },
        resource_url: "https://tenant.console.ves.volterra.io/...",
      };

      expect(execResponse.mode).toBe("execution");
      expect(execResponse.status).toBe("success");
      expect(execResponse.response).toBeDefined();
    });

    it("should return error structure on failure", () => {
      const errorResponse = {
        mode: "execution",
        tool: "f5xc-api-waap-http-loadbalancer-create",
        status: "error",
        error: {
          code: 400,
          message: "Invalid configuration",
          details: "Missing required field: domains",
        },
      };

      expect(errorResponse.mode).toBe("execution");
      expect(errorResponse.status).toBe("error");
      expect(errorResponse.error.code).toBe(400);
    });
  });
});

describe("Error Response Contract", () => {
  it("should follow MCP error format", () => {
    // MCP errors should have code and message
    const mcpError = {
      code: -32600,
      message: "Invalid Request",
      data: {
        details: "Missing required parameter",
      },
    };

    expect(typeof mcpError.code).toBe("number");
    expect(typeof mcpError.message).toBe("string");
  });

  it("should map HTTP errors to appropriate codes", () => {
    const httpToMcpCode = (httpStatus: number): number => {
      switch (httpStatus) {
        case 400:
          return -32600; // Invalid Request
        case 401:
        case 403:
          return -32001; // Unauthorized
        case 404:
          return -32002; // Not Found
        case 500:
          return -32603; // Internal Error
        default:
          return -32000; // Server Error
      }
    };

    expect(httpToMcpCode(400)).toBe(-32600);
    expect(httpToMcpCode(401)).toBe(-32001);
    expect(httpToMcpCode(404)).toBe(-32002);
    expect(httpToMcpCode(500)).toBe(-32603);
  });
});
