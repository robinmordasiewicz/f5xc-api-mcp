/**
 * Integration tests for HTTP client with mock API
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import axios from "axios";
import { createHttpClient } from "../../src/auth/http-client.js";
import { CredentialManager } from "../../src/auth/credential-manager.js";

// Mock axios
vi.mock("axios");
const mockedAxios = vi.mocked(axios, true);

describe("HttpClient Integration", () => {
  let credentialManager: CredentialManager;
  let httpClient: HttpClient;
  let mockRequest: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.resetAllMocks();

    // Setup environment for token auth
    process.env.F5XC_API_URL = "https://test-tenant.console.ves.volterra.io";
    process.env.F5XC_API_TOKEN = "test-token-12345";
    delete process.env.F5XC_P12_FILE;
    delete process.env.F5XC_P12_PASSWORD;

    credentialManager = new CredentialManager();

    // Mock axios.create to return a mock instance with request method
    mockRequest = vi.fn();
    const mockAxiosInstance = {
      request: mockRequest,
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() },
      },
    };
    mockedAxios.create.mockReturnValue(mockAxiosInstance as any);

    httpClient = createHttpClient(credentialManager);
  });

  afterEach(() => {
    delete process.env.F5XC_API_URL;
    delete process.env.F5XC_API_TOKEN;
  });

  describe("API Request Methods", () => {
    it("should make GET requests", async () => {
      const mockResponse = {
        data: { items: [{ name: "test-lb" }] },
        status: 200,
        headers: {},
      };

      mockRequest.mockResolvedValue(mockResponse);

      const result = await httpClient.get("/web/namespaces/production/http_loadbalancers");

      expect(mockRequest).toHaveBeenCalledWith({
        method: "GET",
        url: "/web/namespaces/production/http_loadbalancers",
        data: undefined,
      });
      expect(result.data).toEqual(mockResponse.data);
      expect(result.status).toBe(200);
    });

    it("should make POST requests with data", async () => {
      const mockResponse = {
        data: { metadata: { name: "new-lb" } },
        status: 201,
        headers: {},
      };

      const requestData = {
        metadata: { name: "new-lb", namespace: "production" },
        spec: { domains: ["app.example.com"] },
      };

      mockRequest.mockResolvedValue(mockResponse);

      const result = await httpClient.post(
        "/web/namespaces/production/http_loadbalancers",
        requestData
      );

      expect(mockRequest).toHaveBeenCalledWith({
        method: "POST",
        url: "/web/namespaces/production/http_loadbalancers",
        data: requestData,
      });
      expect(result.data).toEqual(mockResponse.data);
      expect(result.status).toBe(201);
    });

    it("should make PUT requests for updates", async () => {
      const mockResponse = {
        data: { metadata: { name: "updated-lb" } },
        status: 200,
        headers: {},
      };

      const updateData = {
        metadata: { name: "my-lb" },
        spec: { domains: ["new-domain.example.com"] },
      };

      mockRequest.mockResolvedValue(mockResponse);

      const result = await httpClient.put(
        "/web/namespaces/production/http_loadbalancers/my-lb",
        updateData
      );

      expect(mockRequest).toHaveBeenCalledWith({
        method: "PUT",
        url: "/web/namespaces/production/http_loadbalancers/my-lb",
        data: updateData,
      });
      expect(result.data).toEqual(mockResponse.data);
      expect(result.status).toBe(200);
    });

    it("should make DELETE requests", async () => {
      const mockResponse = {
        data: {},
        status: 200,
        headers: {},
      };

      mockRequest.mockResolvedValue(mockResponse);

      const result = await httpClient.delete(
        "/web/namespaces/production/http_loadbalancers/my-lb"
      );

      expect(mockRequest).toHaveBeenCalledWith({
        method: "DELETE",
        url: "/web/namespaces/production/http_loadbalancers/my-lb",
        data: undefined,
      });
      expect(result.status).toBe(200);
    });
  });

  describe("Error Handling", () => {
    it("should handle 401 Unauthorized errors", async () => {
      mockRequest.mockRejectedValue({
        response: {
          status: 401,
          data: { message: "Unauthorized" },
        },
        isAxiosError: true,
      });

      await expect(
        httpClient.get("/web/namespaces")
      ).rejects.toMatchObject({
        response: { status: 401 },
      });
    });

    it("should handle 404 Not Found errors", async () => {
      mockRequest.mockRejectedValue({
        response: {
          status: 404,
          data: { message: "Resource not found" },
        },
        isAxiosError: true,
      });

      await expect(
        httpClient.get("/web/namespaces/production/http_loadbalancers/nonexistent")
      ).rejects.toMatchObject({
        response: { status: 404 },
      });
    });

    it("should handle 400 Bad Request errors", async () => {
      mockRequest.mockRejectedValue({
        response: {
          status: 400,
          data: { message: "Invalid request body" },
        },
        isAxiosError: true,
      });

      await expect(
        httpClient.post("/web/namespaces/production/http_loadbalancers", {})
      ).rejects.toMatchObject({
        response: { status: 400 },
      });
    });

    it("should handle network errors", async () => {
      mockRequest.mockRejectedValue({
        code: "ECONNREFUSED",
        message: "Connection refused",
        isAxiosError: true,
      });

      await expect(
        httpClient.get("/web/namespaces")
      ).rejects.toMatchObject({
        code: "ECONNREFUSED",
      });
    });

    it("should handle timeout errors", async () => {
      mockRequest.mockRejectedValue({
        code: "ETIMEDOUT",
        message: "Request timeout",
        isAxiosError: true,
      });

      await expect(
        httpClient.get("/web/namespaces")
      ).rejects.toMatchObject({
        code: "ETIMEDOUT",
      });
    });
  });

  describe("Response Processing", () => {
    it("should return response data for successful requests", async () => {
      const mockData = {
        items: [
          { metadata: { name: "lb-1" } },
          { metadata: { name: "lb-2" } },
        ],
      };

      mockRequest.mockResolvedValue({
        data: mockData,
        status: 200,
        headers: {},
      });

      const result = await httpClient.get("/web/namespaces/production/http_loadbalancers");

      expect(result.data).toEqual(mockData);
      expect(result.status).toBe(200);
      expect(result.duration).toBeGreaterThanOrEqual(0);
    });

    it("should handle empty response bodies", async () => {
      mockRequest.mockResolvedValue({
        data: null,
        status: 204,
        headers: {},
      });

      const result = await httpClient.delete("/web/namespaces/production/http_loadbalancers/my-lb");

      expect(result.data).toBeNull();
      expect(result.status).toBe(204);
    });
  });
});

describe("Mock API Scenarios", () => {
  let mockRequest: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.resetAllMocks();
    process.env.F5XC_API_URL = "https://test-tenant.console.ves.volterra.io";
    process.env.F5XC_API_TOKEN = "test-token";

    mockRequest = vi.fn();
    const mockAxiosInstance = {
      request: mockRequest,
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() },
      },
    };
    mockedAxios.create.mockReturnValue(mockAxiosInstance as any);
  });

  afterEach(() => {
    delete process.env.F5XC_API_URL;
    delete process.env.F5XC_API_TOKEN;
  });

  it("should simulate list namespaces workflow", async () => {
    const mockNamespaces = {
      items: [
        { metadata: { name: "default" } },
        { metadata: { name: "production" } },
        { metadata: { name: "staging" } },
      ],
    };

    mockRequest.mockResolvedValue({ data: mockNamespaces, status: 200, headers: {} });

    const credentialManager = new CredentialManager();
    const httpClient = createHttpClient(credentialManager);

    const result = await httpClient.get("/web/namespaces");

    expect(result.data.items).toHaveLength(3);
    expect(result.data.items[1].metadata.name).toBe("production");
  });

  it("should simulate create HTTP load balancer workflow", async () => {
    const newLbRequest = {
      metadata: {
        name: "my-app-lb",
        namespace: "production",
      },
      spec: {
        domains: ["app.example.com"],
        http: {
          dns_volterra_managed: true,
        },
        default_route_pools: [
          {
            pool: {
              namespace: "production",
              name: "backend-pool",
            },
            weight: 1,
          },
        ],
      },
    };

    const mockResponse = {
      metadata: {
        name: "my-app-lb",
        namespace: "production",
        uid: "abc-123",
      },
      spec: newLbRequest.spec,
      system_metadata: {
        creation_timestamp: "2024-01-01T00:00:00Z",
      },
    };

    mockRequest.mockResolvedValue({ data: mockResponse, status: 201, headers: {} });

    const credentialManager = new CredentialManager();
    const httpClient = createHttpClient(credentialManager);

    const result = await httpClient.post(
      "/web/namespaces/production/http_loadbalancers",
      newLbRequest
    );

    expect(result.data.metadata.name).toBe("my-app-lb");
    expect(result.data.metadata.uid).toBe("abc-123");
  });

  it("should simulate get resource with status workflow", async () => {
    const mockLbWithStatus = {
      metadata: {
        name: "my-app-lb",
        namespace: "production",
      },
      spec: {
        domains: ["app.example.com"],
      },
      status: {
        dns_info: {
          ip_address: "203.0.113.10",
        },
        state: "ACTIVE",
      },
    };

    mockRequest.mockResolvedValue({ data: mockLbWithStatus, status: 200, headers: {} });

    const credentialManager = new CredentialManager();
    const httpClient = createHttpClient(credentialManager);

    const result = await httpClient.get(
      "/web/namespaces/production/http_loadbalancers/my-app-lb"
    );

    expect(result.data.status.state).toBe("ACTIVE");
    expect(result.data.status.dns_info.ip_address).toBe("203.0.113.10");
  });
});
