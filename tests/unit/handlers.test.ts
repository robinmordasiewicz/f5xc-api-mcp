/**
 * Unit Tests for Resource Handlers
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  ResourceHandler,
  createResourceHandler,
  type ResourceReadResult,
  type ResourceDocumentation,
} from "../../src/resources/handlers.js";
import { CredentialManager, AuthMode } from "../../src/auth/credential-manager.js";
import { HttpClient } from "../../src/auth/http-client.js";
import * as templates from "../../src/resources/templates.js";

// Mock modules
vi.mock("../../src/auth/credential-manager.js", () => ({
  CredentialManager: vi.fn(),
  AuthMode: {
    NONE: "none",
    TOKEN: "token",
    MTLS: "mtls",
  },
}));

vi.mock("../../src/auth/http-client.js", () => ({
  HttpClient: vi.fn(),
}));

vi.mock("../../src/utils/logging.js", () => ({
  logger: {
    error: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
  },
}));

describe("handlers", () => {
  let mockCredentialManager: {
    getAuthMode: ReturnType<typeof vi.fn>;
    getTenant: ReturnType<typeof vi.fn>;
  };
  let mockHttpClient: {
    get: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.clearAllMocks();

    mockCredentialManager = {
      getAuthMode: vi.fn().mockReturnValue(AuthMode.NONE),
      getTenant: vi.fn().mockReturnValue("test-tenant"),
    };

    mockHttpClient = {
      get: vi.fn(),
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("ResourceHandler", () => {
    describe("constructor", () => {
      it("should create handler with credential manager and http client", () => {
        const handler = new ResourceHandler(
          mockCredentialManager as unknown as CredentialManager,
          mockHttpClient as unknown as HttpClient
        );
        expect(handler).toBeInstanceOf(ResourceHandler);
      });

      it("should create handler with null http client", () => {
        const handler = new ResourceHandler(
          mockCredentialManager as unknown as CredentialManager,
          null
        );
        expect(handler).toBeInstanceOf(ResourceHandler);
      });
    });

    describe("readResource", () => {
      describe("documentation mode", () => {
        it("should return documentation for http_loadbalancer resource", async () => {
          mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

          const handler = new ResourceHandler(
            mockCredentialManager as unknown as CredentialManager,
            mockHttpClient as unknown as HttpClient
          );

          const result = await handler.readResource(
            "f5xc://test-tenant/default/http_loadbalancer/my-lb"
          );

          expect(result.mode).toBe("documentation");
          expect(result.mimeType).toBe("application/json");
          expect(result.uri).toBe("f5xc://test-tenant/default/http_loadbalancer/my-lb");

          const content = JSON.parse(result.content) as ResourceDocumentation;
          expect(content.resourceType).toBeDefined();
          expect(content.apiPath).toContain("http_loadbalancers");
          expect(content.f5xcctlCommand).toContain("f5xcctl get");
          expect(content.terraformDataSource).toContain("volterra_http_loadbalancer");
          expect(content.exampleResource).toBeDefined();
          expect(content.exampleResource.metadata).toBeDefined();
          expect(content.exampleResource.spec).toBeDefined();
        });

        it("should return documentation for origin_pool resource", async () => {
          mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

          const handler = new ResourceHandler(
            mockCredentialManager as unknown as CredentialManager,
            mockHttpClient as unknown as HttpClient
          );

          const result = await handler.readResource(
            "f5xc://test-tenant/default/origin_pool/my-pool"
          );

          expect(result.mode).toBe("documentation");
          const content = JSON.parse(result.content) as ResourceDocumentation;
          expect(content.apiPath).toContain("origin_pools");
          expect(content.terraformDataSource).toContain("volterra_origin_pool");
        });

        it("should return documentation for dns_zone resource", async () => {
          mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

          const handler = new ResourceHandler(
            mockCredentialManager as unknown as CredentialManager,
            mockHttpClient as unknown as HttpClient
          );

          const result = await handler.readResource(
            "f5xc://test-tenant/default/dns_zone/my-zone"
          );

          expect(result.mode).toBe("documentation");
          const content = JSON.parse(result.content) as ResourceDocumentation;
          expect(content.apiPath).toContain("dns_zones");
        });

        it("should return documentation for app_firewall resource", async () => {
          mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

          const handler = new ResourceHandler(
            mockCredentialManager as unknown as CredentialManager,
            mockHttpClient as unknown as HttpClient
          );

          const result = await handler.readResource(
            "f5xc://test-tenant/default/app_firewall/my-waf"
          );

          expect(result.mode).toBe("documentation");
          const content = JSON.parse(result.content) as ResourceDocumentation;
          expect(content.apiPath).toContain("app_firewalls");
        });

        it("should return documentation for namespace resource", async () => {
          mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

          const handler = new ResourceHandler(
            mockCredentialManager as unknown as CredentialManager,
            mockHttpClient as unknown as HttpClient
          );

          const result = await handler.readResource(
            "f5xc://test-tenant/system/namespace/my-ns"
          );

          expect(result.mode).toBe("documentation");
          const content = JSON.parse(result.content) as ResourceDocumentation;
          expect(content.apiPath).toContain("namespaces");
        });

        it("should return documentation when httpClient is null", async () => {
          mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.TOKEN);

          const handler = new ResourceHandler(
            mockCredentialManager as unknown as CredentialManager,
            null
          );

          const result = await handler.readResource(
            "f5xc://test-tenant/default/http_loadbalancer/my-lb"
          );

          expect(result.mode).toBe("documentation");
        });

        it("should include related resources in documentation", async () => {
          mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

          const handler = new ResourceHandler(
            mockCredentialManager as unknown as CredentialManager,
            mockHttpClient as unknown as HttpClient
          );

          const result = await handler.readResource(
            "f5xc://test-tenant/default/http_loadbalancer/my-lb"
          );

          const content = JSON.parse(result.content) as ResourceDocumentation;
          expect(content.relatedResources).toBeDefined();
          expect(Array.isArray(content.relatedResources)).toBe(true);
        });
      });

      describe("execution mode", () => {
        it("should fetch actual resource data when authenticated", async () => {
          mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.TOKEN);
          mockHttpClient.get.mockResolvedValue({
            data: {
              metadata: { name: "my-lb" },
              spec: { domains: ["example.com"] },
            },
          });

          const handler = new ResourceHandler(
            mockCredentialManager as unknown as CredentialManager,
            mockHttpClient as unknown as HttpClient
          );

          const result = await handler.readResource(
            "f5xc://test-tenant/default/http_loadbalancer/my-lb"
          );

          expect(result.mode).toBe("execution");
          expect(mockHttpClient.get).toHaveBeenCalledWith(
            expect.stringContaining("http_loadbalancers")
          );

          const content = JSON.parse(result.content);
          expect(content.metadata.name).toBe("my-lb");
        });

        it("should throw error when API call fails", async () => {
          mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.TOKEN);
          mockHttpClient.get.mockRejectedValue(new Error("API Error"));

          const handler = new ResourceHandler(
            mockCredentialManager as unknown as CredentialManager,
            mockHttpClient as unknown as HttpClient
          );

          await expect(
            handler.readResource("f5xc://test-tenant/default/http_loadbalancer/my-lb")
          ).rejects.toThrow("API Error");
        });
      });

      describe("error handling", () => {
        it("should throw error for invalid URI format", async () => {
          const handler = new ResourceHandler(
            mockCredentialManager as unknown as CredentialManager,
            mockHttpClient as unknown as HttpClient
          );

          await expect(
            handler.readResource("invalid-uri")
          ).rejects.toThrow("Invalid resource URI");
        });

        it("should throw error for unknown resource type", async () => {
          const handler = new ResourceHandler(
            mockCredentialManager as unknown as CredentialManager,
            mockHttpClient as unknown as HttpClient
          );

          await expect(
            handler.readResource("f5xc://test-tenant/default/unknown-resource/my-resource")
          ).rejects.toThrow("Unknown resource type");
        });

        it("should throw F5XCApiError when buildApiPath returns null in execution mode", async () => {
          mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.TOKEN);

          const handler = new ResourceHandler(
            mockCredentialManager as unknown as CredentialManager,
            mockHttpClient as unknown as HttpClient
          );

          // Mock buildApiPath to return null
          const buildApiPathSpy = vi.spyOn(templates, "buildApiPath").mockReturnValue(null);

          await expect(
            handler.readResource("f5xc://test-tenant/default/http_loadbalancer/my-lb")
          ).rejects.toThrow("Cannot build API path for");

          buildApiPathSpy.mockRestore();
        });

        it("should throw F5XCApiError when getResourceType returns null in buildDocumentationResponse", async () => {
          mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

          const handler = new ResourceHandler(
            mockCredentialManager as unknown as CredentialManager,
            mockHttpClient as unknown as HttpClient
          );

          // Mock getResourceType to return valid on first call, null on second
          const mockResourceType = { type: "http_loadbalancer", description: "test" };
          const getResourceTypeSpy = vi.spyOn(templates, "getResourceType")
            .mockReturnValueOnce(mockResourceType as templates.ResourceType)
            .mockReturnValueOnce(undefined);

          await expect(
            handler.readResource("f5xc://test-tenant/default/http_loadbalancer/my-lb")
          ).rejects.toThrow("Unknown resource type");

          getResourceTypeSpy.mockRestore();
        });
      });
    });

    describe("listResourceTemplates", () => {
      it("should return list of resource templates", () => {
        const handler = new ResourceHandler(
          mockCredentialManager as unknown as CredentialManager,
          mockHttpClient as unknown as HttpClient
        );

        const templates = handler.listResourceTemplates();

        expect(Array.isArray(templates)).toBe(true);
        expect(templates.length).toBeGreaterThan(0);

        const firstTemplate = templates[0];
        expect(firstTemplate).toHaveProperty("uriTemplate");
        expect(firstTemplate).toHaveProperty("name");
        expect(firstTemplate).toHaveProperty("description");
        expect(firstTemplate).toHaveProperty("mimeType");
        expect(firstTemplate.mimeType).toBe("application/json");
      });

      it("should include tenant in URI template", () => {
        mockCredentialManager.getTenant.mockReturnValue("my-tenant");

        const handler = new ResourceHandler(
          mockCredentialManager as unknown as CredentialManager,
          mockHttpClient as unknown as HttpClient
        );

        const templates = handler.listResourceTemplates();
        const namespaceScoped = templates.find((t) => t.uriTemplate.includes("{namespace}"));

        expect(namespaceScoped?.uriTemplate).toContain("my-tenant");
      });

      it("should use placeholder when tenant is null", () => {
        mockCredentialManager.getTenant.mockReturnValue(null);

        const handler = new ResourceHandler(
          mockCredentialManager as unknown as CredentialManager,
          mockHttpClient as unknown as HttpClient
        );

        const templates = handler.listResourceTemplates();
        const anyTemplate = templates[0];

        expect(anyTemplate.uriTemplate).toContain("{tenant}");
      });

      it("should have namespace-scoped and system-scoped templates", () => {
        const handler = new ResourceHandler(
          mockCredentialManager as unknown as CredentialManager,
          mockHttpClient as unknown as HttpClient
        );

        const templates = handler.listResourceTemplates();
        const namespaceScoped = templates.filter((t) => t.uriTemplate.includes("{namespace}"));
        const systemScoped = templates.filter((t) => t.uriTemplate.includes("/system/"));

        expect(namespaceScoped.length).toBeGreaterThan(0);
        expect(systemScoped.length).toBeGreaterThan(0);
      });
    });

    describe("listResources", () => {
      describe("documentation mode", () => {
        it("should return documentation for listing resources", async () => {
          mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

          const handler = new ResourceHandler(
            mockCredentialManager as unknown as CredentialManager,
            mockHttpClient as unknown as HttpClient
          );

          const result = await handler.listResources("default", "http_loadbalancer");

          expect(result.mode).toBe("documentation");
          expect(result.mimeType).toBe("application/json");

          const content = JSON.parse(result.content);
          expect(content.note).toContain("documentation mode");
          expect(content.f5xcctlCommand).toContain("f5xcctl get");
          expect(content.apiPath).toBeDefined();
        });

        it("should return documentation when httpClient is null", async () => {
          mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.TOKEN);

          const handler = new ResourceHandler(
            mockCredentialManager as unknown as CredentialManager,
            null
          );

          const result = await handler.listResources("default", "origin_pool");

          expect(result.mode).toBe("documentation");
        });
      });

      describe("execution mode", () => {
        it("should fetch actual resource list when authenticated", async () => {
          mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.TOKEN);
          mockHttpClient.get.mockResolvedValue({
            data: {
              items: [
                { metadata: { name: "lb-1" } },
                { metadata: { name: "lb-2" } },
              ],
            },
          });

          const handler = new ResourceHandler(
            mockCredentialManager as unknown as CredentialManager,
            mockHttpClient as unknown as HttpClient
          );

          const result = await handler.listResources("default", "http_loadbalancer");

          expect(result.mode).toBe("execution");
          expect(mockHttpClient.get).toHaveBeenCalledWith(
            expect.stringContaining("http_loadbalancers")
          );

          const content = JSON.parse(result.content);
          expect(content.items).toHaveLength(2);
        });

        it("should throw error when API call fails", async () => {
          mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.TOKEN);
          mockHttpClient.get.mockRejectedValue(new Error("API Error"));

          const handler = new ResourceHandler(
            mockCredentialManager as unknown as CredentialManager,
            mockHttpClient as unknown as HttpClient
          );

          await expect(
            handler.listResources("default", "http_loadbalancer")
          ).rejects.toThrow("API Error");
        });
      });

      describe("error handling", () => {
        it("should throw error for unknown resource type", async () => {
          const handler = new ResourceHandler(
            mockCredentialManager as unknown as CredentialManager,
            mockHttpClient as unknown as HttpClient
          );

          await expect(
            handler.listResources("default", "unknown-type")
          ).rejects.toThrow("Unknown resource type");
        });

        it("should throw F5XCApiError when buildApiPath returns null in execution mode", async () => {
          mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.TOKEN);

          const handler = new ResourceHandler(
            mockCredentialManager as unknown as CredentialManager,
            mockHttpClient as unknown as HttpClient
          );

          // Mock buildApiPath to return null
          const buildApiPathSpy = vi.spyOn(templates, "buildApiPath").mockReturnValue(null);

          await expect(
            handler.listResources("default", "http_loadbalancer")
          ).rejects.toThrow("Cannot build API path for listing");

          buildApiPathSpy.mockRestore();
        });
      });
    });
  });

  describe("createResourceHandler", () => {
    it("should create a ResourceHandler instance", () => {
      const handler = createResourceHandler(
        mockCredentialManager as unknown as CredentialManager,
        mockHttpClient as unknown as HttpClient
      );

      expect(handler).toBeInstanceOf(ResourceHandler);
    });

    it("should create handler with null http client", () => {
      const handler = createResourceHandler(
        mockCredentialManager as unknown as CredentialManager,
        null
      );

      expect(handler).toBeInstanceOf(ResourceHandler);
    });
  });

  describe("example resource generation", () => {
    it("should generate http_loadbalancer example with correct structure", async () => {
      mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

      const handler = new ResourceHandler(
        mockCredentialManager as unknown as CredentialManager,
        null
      );

      const result = await handler.readResource(
        "f5xc://test-tenant/default/http_loadbalancer/my-lb"
      );

      const content = JSON.parse(result.content) as ResourceDocumentation;
      const example = content.exampleResource as {
        metadata: { name: string; namespace: string; description: string };
        spec: { domains: string[]; default_route_pools: unknown[] };
        system_metadata: { creation_timestamp: string };
      };

      expect(example.metadata.name).toBe("my-lb");
      expect(example.metadata.namespace).toBe("default");
      expect(example.spec.domains).toContain("app.example.com");
      expect(example.spec.default_route_pools).toHaveLength(1);
      expect(example.system_metadata.creation_timestamp).toBeDefined();
    });

    it("should generate origin_pool example with correct structure", async () => {
      mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

      const handler = new ResourceHandler(
        mockCredentialManager as unknown as CredentialManager,
        null
      );

      const result = await handler.readResource(
        "f5xc://test-tenant/default/origin_pool/my-pool"
      );

      const content = JSON.parse(result.content) as ResourceDocumentation;
      const example = content.exampleResource as {
        spec: { origin_servers: unknown[]; port: number; no_tls: unknown };
      };

      expect(example.spec.origin_servers).toHaveLength(1);
      expect(example.spec.port).toBe(80);
      expect(example.spec.no_tls).toBeDefined();
    });

    it("should generate dns_zone example with correct structure", async () => {
      mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

      const handler = new ResourceHandler(
        mockCredentialManager as unknown as CredentialManager,
        null
      );

      const result = await handler.readResource(
        "f5xc://test-tenant/default/dns_zone/my-zone"
      );

      const content = JSON.parse(result.content) as ResourceDocumentation;
      const example = content.exampleResource as {
        spec: { primary: { soa_parameters: unknown } };
      };

      expect(example.spec.primary).toBeDefined();
      expect(example.spec.primary.soa_parameters).toBeDefined();
    });

    it("should generate app_firewall example with correct structure", async () => {
      mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

      const handler = new ResourceHandler(
        mockCredentialManager as unknown as CredentialManager,
        null
      );

      const result = await handler.readResource(
        "f5xc://test-tenant/default/app_firewall/my-waf"
      );

      const content = JSON.parse(result.content) as ResourceDocumentation;
      const example = content.exampleResource as {
        spec: { detection_settings: unknown; bot_protection_setting: unknown };
      };

      expect(example.spec.detection_settings).toBeDefined();
      expect(example.spec.bot_protection_setting).toBeDefined();
    });

    it("should generate generic example for unknown types", async () => {
      mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

      const handler = new ResourceHandler(
        mockCredentialManager as unknown as CredentialManager,
        null
      );

      const result = await handler.readResource(
        "f5xc://test-tenant/default/certificate/my-cert"
      );

      const content = JSON.parse(result.content) as ResourceDocumentation;
      const example = content.exampleResource as {
        metadata: { name: string };
        spec: Record<string, unknown>;
        system_metadata: unknown;
      };

      expect(example.metadata.name).toBe("my-cert");
      expect(example.spec).toBeDefined();
      expect(example.system_metadata).toBeDefined();
    });
  });

  describe("f5xcctl command generation", () => {
    it("should generate correct f5xcctl command format", async () => {
      mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

      const handler = new ResourceHandler(
        mockCredentialManager as unknown as CredentialManager,
        null
      );

      const result = await handler.readResource(
        "f5xc://test-tenant/default/http_loadbalancer/my-lb"
      );

      const content = JSON.parse(result.content) as ResourceDocumentation;
      expect(content.f5xcctlCommand).toBe("f5xcctl get http_loadbalancer my-lb -n default -o yaml");
    });

    it("should handle resource types with hyphens", async () => {
      mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

      const handler = new ResourceHandler(
        mockCredentialManager as unknown as CredentialManager,
        null
      );

      const result = await handler.readResource(
        "f5xc://test-tenant/default/origin_pool/my-pool"
      );

      const content = JSON.parse(result.content) as ResourceDocumentation;
      expect(content.f5xcctlCommand).toBe("f5xcctl get origin_pool my-pool -n default -o yaml");
    });
  });

  describe("Terraform data source generation", () => {
    it("should generate correct Terraform data source format", async () => {
      mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

      const handler = new ResourceHandler(
        mockCredentialManager as unknown as CredentialManager,
        null
      );

      const result = await handler.readResource(
        "f5xc://test-tenant/default/http_loadbalancer/my-lb"
      );

      const content = JSON.parse(result.content) as ResourceDocumentation;
      expect(content.terraformDataSource).toContain('data "volterra_http_loadbalancer"');
      expect(content.terraformDataSource).toContain('name      = "my-lb"');
      expect(content.terraformDataSource).toContain('namespace = "default"');
    });

    it("should convert hyphens to underscores for Terraform", async () => {
      mockCredentialManager.getAuthMode.mockReturnValue(AuthMode.NONE);

      const handler = new ResourceHandler(
        mockCredentialManager as unknown as CredentialManager,
        null
      );

      const result = await handler.readResource(
        "f5xc://test-tenant/default/origin_pool/my-pool"
      );

      const content = JSON.parse(result.content) as ResourceDocumentation;
      expect(content.terraformDataSource).toContain("volterra_origin_pool");
    });
  });
});
