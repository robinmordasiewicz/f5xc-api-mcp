/**
 * Unit Tests for HTTP Client
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import axios, { AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from "axios";
import { HttpClient, createHttpClient, type HttpClientConfig, type ApiResponse } from "../../src/auth/http-client.js";
import { CredentialManager, AuthMode } from "../../src/auth/credential-manager.js";
import { F5XCApiError, AuthenticationError } from "../../src/utils/error-handling.js";
import { shouldSkipP12Tests } from "../utils/ci-environment.js";

// Create mock logger functions for reference using vi.hoisted
const { mockLoggerDebug, mockLoggerInfo, mockLoggerError, mockLoggerWarn } = vi.hoisted(() => ({
  mockLoggerDebug: vi.fn(),
  mockLoggerInfo: vi.fn(),
  mockLoggerError: vi.fn(),
  mockLoggerWarn: vi.fn(),
}));

// Mock logger
vi.mock("../../src/utils/logging.js", () => ({
  logger: {
    info: mockLoggerInfo,
    error: mockLoggerError,
    debug: mockLoggerDebug,
    warn: mockLoggerWarn,
  },
}));

// Mock axios
vi.mock("axios");
const mockedAxios = vi.mocked(axios, true);

// Mock fs for P12 certificate testing
vi.mock("fs", async (importOriginal) => {
  const original = await importOriginal<typeof import("fs")>();
  return {
    ...original,
    readFileSync: vi.fn((path: string) => {
      if (path.includes("fail")) {
        throw new Error("File not found");
      }
      return Buffer.from("mock-p12-data");
    }),
  };
});

describe("http-client", () => {
  const originalEnv = process.env;
  let mockRequest: ReturnType<typeof vi.fn>;
  let requestInterceptorFulfilled: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  let requestInterceptorRejected: (error: unknown) => Promise<never>;
  let responseInterceptorFulfilled: (response: AxiosResponse) => AxiosResponse;
  let responseInterceptorRejected: (error: unknown) => Promise<never>;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };
    delete process.env.F5XC_API_URL;
    delete process.env.F5XC_API_TOKEN;
    delete process.env.F5XC_P12_FILE;
    delete process.env.F5XC_P12_PASSWORD;

    mockRequest = vi.fn();
    const mockAxiosInstance = {
      request: mockRequest,
      interceptors: {
        request: {
          use: vi.fn().mockImplementation((fulfilled, rejected) => {
            requestInterceptorFulfilled = fulfilled;
            requestInterceptorRejected = rejected;
            return 0;
          }),
        },
        response: {
          use: vi.fn().mockImplementation((fulfilled, rejected) => {
            responseInterceptorFulfilled = fulfilled;
            responseInterceptorRejected = rejected;
            return 0;
          }),
        },
      },
    };
    mockedAxios.create.mockReturnValue(mockAxiosInstance as any);
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe("HttpClient", () => {
    describe("constructor", () => {
      it("should not create client when not authenticated", () => {
        const credentialManager = new CredentialManager();
        const httpClient = new HttpClient(credentialManager);

        expect(httpClient.isAvailable()).toBe(false);
        expect(httpClient.getAxiosInstance()).toBeNull();
      });

      it("should create client when authenticated with token", () => {
        process.env.F5XC_API_URL = "https://test.volterra.us";
        process.env.F5XC_API_TOKEN = "test-token";

        const credentialManager = new CredentialManager();
        const httpClient = new HttpClient(credentialManager);

        expect(httpClient.isAvailable()).toBe(true);
        expect(mockedAxios.create).toHaveBeenCalled();
      });

      it("should configure client with custom timeout", () => {
        process.env.F5XC_API_URL = "https://test.volterra.us";
        process.env.F5XC_API_TOKEN = "test-token";

        const credentialManager = new CredentialManager();
        new HttpClient(credentialManager, { timeout: 60000 });

        expect(mockedAxios.create).toHaveBeenCalledWith(
          expect.objectContaining({
            timeout: 60000,
          })
        );
      });

      it("should configure client with custom headers", () => {
        process.env.F5XC_API_URL = "https://test.volterra.us";
        process.env.F5XC_API_TOKEN = "test-token";

        const credentialManager = new CredentialManager();
        new HttpClient(credentialManager, { headers: { "X-Custom-Header": "value" } });

        expect(mockedAxios.create).toHaveBeenCalledWith(
          expect.objectContaining({
            headers: expect.objectContaining({
              "X-Custom-Header": "value",
            }),
          })
        );
      });

      it("should throw AuthenticationError when API URL not configured", () => {
        // Set only token but not URL
        process.env.F5XC_API_TOKEN = "test-token";

        const credentialManager = new CredentialManager();
        // The credential manager won't be authenticated without URL

        expect(credentialManager.getAuthMode()).toBe(AuthMode.NONE);
      });

      it("should throw AuthenticationError when token not configured", () => {
        // Set only URL but not token
        process.env.F5XC_API_URL = "https://test.volterra.us";

        const credentialManager = new CredentialManager();

        expect(credentialManager.getAuthMode()).toBe(AuthMode.NONE);
      });
    });

    describe("isAvailable", () => {
      it("should return false when not authenticated", () => {
        const credentialManager = new CredentialManager();
        const httpClient = new HttpClient(credentialManager);

        expect(httpClient.isAvailable()).toBe(false);
      });

      it("should return true when authenticated", () => {
        process.env.F5XC_API_URL = "https://test.volterra.us";
        process.env.F5XC_API_TOKEN = "test-token";

        const credentialManager = new CredentialManager();
        const httpClient = new HttpClient(credentialManager);

        expect(httpClient.isAvailable()).toBe(true);
      });
    });

    describe("getAxiosInstance", () => {
      it("should return null when not authenticated", () => {
        const credentialManager = new CredentialManager();
        const httpClient = new HttpClient(credentialManager);

        expect(httpClient.getAxiosInstance()).toBeNull();
      });

      it("should return axios instance when authenticated", () => {
        process.env.F5XC_API_URL = "https://test.volterra.us";
        process.env.F5XC_API_TOKEN = "test-token";

        const credentialManager = new CredentialManager();
        const httpClient = new HttpClient(credentialManager);

        expect(httpClient.getAxiosInstance()).toBeDefined();
      });
    });

    describe("request methods - unauthenticated", () => {
      it("should throw AuthenticationError on GET when not authenticated", async () => {
        const credentialManager = new CredentialManager();
        const httpClient = new HttpClient(credentialManager);

        await expect(httpClient.get("/test")).rejects.toThrow(AuthenticationError);
        await expect(httpClient.get("/test")).rejects.toThrow("HTTP client not available");
      });

      it("should throw AuthenticationError on POST when not authenticated", async () => {
        const credentialManager = new CredentialManager();
        const httpClient = new HttpClient(credentialManager);

        await expect(httpClient.post("/test", {})).rejects.toThrow(AuthenticationError);
      });

      it("should throw AuthenticationError on PUT when not authenticated", async () => {
        const credentialManager = new CredentialManager();
        const httpClient = new HttpClient(credentialManager);

        await expect(httpClient.put("/test", {})).rejects.toThrow(AuthenticationError);
      });

      it("should throw AuthenticationError on DELETE when not authenticated", async () => {
        const credentialManager = new CredentialManager();
        const httpClient = new HttpClient(credentialManager);

        await expect(httpClient.delete("/test")).rejects.toThrow(AuthenticationError);
      });
    });

    describe("request methods - authenticated", () => {
      let httpClient: HttpClient;

      beforeEach(() => {
        process.env.F5XC_API_URL = "https://test.volterra.us";
        process.env.F5XC_API_TOKEN = "test-token";

        const credentialManager = new CredentialManager();
        httpClient = new HttpClient(credentialManager);
      });

      it("should make GET request", async () => {
        mockRequest.mockResolvedValue({
          data: { items: [] },
          status: 200,
          headers: {},
        });

        const result = await httpClient.get("/test");

        expect(mockRequest).toHaveBeenCalledWith({
          method: "GET",
          url: "/test",
          data: undefined,
        });
        expect(result.status).toBe(200);
      });

      it("should make POST request with data", async () => {
        mockRequest.mockResolvedValue({
          data: { created: true },
          status: 201,
          headers: {},
        });

        const result = await httpClient.post("/test", { name: "test" });

        expect(mockRequest).toHaveBeenCalledWith({
          method: "POST",
          url: "/test",
          data: { name: "test" },
        });
        expect(result.status).toBe(201);
      });

      it("should make PUT request with data", async () => {
        mockRequest.mockResolvedValue({
          data: { updated: true },
          status: 200,
          headers: {},
        });

        const result = await httpClient.put("/test", { name: "updated" });

        expect(mockRequest).toHaveBeenCalledWith({
          method: "PUT",
          url: "/test",
          data: { name: "updated" },
        });
        expect(result.status).toBe(200);
      });

      it("should make DELETE request", async () => {
        mockRequest.mockResolvedValue({
          data: {},
          status: 204,
          headers: {},
        });

        const result = await httpClient.delete("/test");

        expect(mockRequest).toHaveBeenCalledWith({
          method: "DELETE",
          url: "/test",
          data: undefined,
        });
        expect(result.status).toBe(204);
      });

      it("should pass additional config to request", async () => {
        mockRequest.mockResolvedValue({
          data: {},
          status: 200,
          headers: {},
        });

        await httpClient.get("/test", { params: { key: "value" } });

        expect(mockRequest).toHaveBeenCalledWith({
          method: "GET",
          url: "/test",
          data: undefined,
          params: { key: "value" },
        });
      });

      it("should calculate request duration", async () => {
        mockRequest.mockResolvedValue({
          data: {},
          status: 200,
          headers: {},
        });

        const result = await httpClient.get("/test");

        expect(result.duration).toBeGreaterThanOrEqual(0);
      });
    });

    describe("request interceptors", () => {
      it("should add metadata to request config", () => {
        process.env.F5XC_API_URL = "https://test.volterra.us";
        process.env.F5XC_API_TOKEN = "test-token";

        const credentialManager = new CredentialManager();
        new HttpClient(credentialManager);

        const config = requestInterceptorFulfilled({
          method: "get",
          url: "/test",
        } as InternalAxiosRequestConfig);

        expect((config as any).metadata).toBeDefined();
        expect((config as any).metadata.startTime).toBeGreaterThan(0);
      });

      it("should log request in debug mode", () => {
        process.env.F5XC_API_URL = "https://test.volterra.us";
        process.env.F5XC_API_TOKEN = "test-token";

        const credentialManager = new CredentialManager();
        new HttpClient(credentialManager, { debug: true });

        requestInterceptorFulfilled({
          method: "get",
          url: "/test",
          baseURL: "https://test.console.ves.volterra.io/api",
        } as InternalAxiosRequestConfig);

        expect(mockLoggerDebug).toHaveBeenCalledWith("API Request", expect.any(Object));
      });

      it("should reject errors in request interceptor", async () => {
        process.env.F5XC_API_URL = "https://test.volterra.us";
        process.env.F5XC_API_TOKEN = "test-token";

        const credentialManager = new CredentialManager();
        new HttpClient(credentialManager);

        const error = new Error("Request error");
        await expect(requestInterceptorRejected(error)).rejects.toBe(error);
      });
    });

    describe("response interceptors", () => {
      it("should pass through successful responses", () => {
        process.env.F5XC_API_URL = "https://test.volterra.us";
        process.env.F5XC_API_TOKEN = "test-token";

        const credentialManager = new CredentialManager();
        new HttpClient(credentialManager);

        const response = {
          data: { success: true },
          status: 200,
          config: { metadata: { startTime: Date.now() } },
        } as unknown as AxiosResponse;

        const result = responseInterceptorFulfilled(response);
        expect(result).toBe(response);
      });

      it("should log response in debug mode", () => {
        process.env.F5XC_API_URL = "https://test.volterra.us";
        process.env.F5XC_API_TOKEN = "test-token";

        const credentialManager = new CredentialManager();
        new HttpClient(credentialManager, { debug: true });

        const response = {
          data: { success: true },
          status: 200,
          config: { url: "/test", metadata: { startTime: Date.now() } },
        } as unknown as AxiosResponse;

        responseInterceptorFulfilled(response);

        expect(mockLoggerDebug).toHaveBeenCalledWith("API Response", expect.any(Object));
      });

      it("should calculate duration without metadata", () => {
        process.env.F5XC_API_URL = "https://test.volterra.us";
        process.env.F5XC_API_TOKEN = "test-token";

        const credentialManager = new CredentialManager();
        new HttpClient(credentialManager, { debug: true });

        const response = {
          data: { success: true },
          status: 200,
          config: { url: "/test" },
        } as unknown as AxiosResponse;

        const result = responseInterceptorFulfilled(response);
        expect(result).toBe(response);
      });

      it("should transform Axios errors to F5XCApiError", async () => {
        process.env.F5XC_API_URL = "https://test.volterra.us";
        process.env.F5XC_API_TOKEN = "test-token";

        const credentialManager = new CredentialManager();
        new HttpClient(credentialManager);

        // Mock axios.isAxiosError to return true
        mockedAxios.isAxiosError.mockReturnValue(true);

        const axiosError = {
          response: {
            status: 400,
            data: { message: "Bad Request", details: "Invalid payload" },
          },
          message: "Request failed",
          config: { url: "/test" },
        };

        try {
          await responseInterceptorRejected(axiosError);
          expect.fail("Should have thrown F5XCApiError");
        } catch (error) {
          expect(error).toBeInstanceOf(F5XCApiError);
          expect((error as F5XCApiError).message).toBe("Bad Request");
        }
      });

      it("should handle Axios error without response", async () => {
        process.env.F5XC_API_URL = "https://test.volterra.us";
        process.env.F5XC_API_TOKEN = "test-token";

        const credentialManager = new CredentialManager();
        new HttpClient(credentialManager);

        mockedAxios.isAxiosError.mockReturnValue(true);

        const axiosError = {
          message: "Network error",
          config: { url: "/test" },
        };

        try {
          await responseInterceptorRejected(axiosError);
          expect.fail("Should have thrown F5XCApiError");
        } catch (error) {
          expect(error).toBeInstanceOf(F5XCApiError);
          expect((error as F5XCApiError).message).toBe("Network error");
        }
      });

      it("should pass through non-Axios errors", async () => {
        process.env.F5XC_API_URL = "https://test.volterra.us";
        process.env.F5XC_API_TOKEN = "test-token";

        const credentialManager = new CredentialManager();
        new HttpClient(credentialManager);

        mockedAxios.isAxiosError.mockReturnValue(false);

        const error = new Error("Generic error");
        try {
          await responseInterceptorRejected(error);
          expect.fail("Should have thrown error");
        } catch (caughtError) {
          expect(caughtError).toBe(error);
        }
      });
    });

    describe("P12 certificate authentication", () => {
      it.skipIf(shouldSkipP12Tests())("should configure https agent for P12 auth", () => {
        process.env.F5XC_API_URL = "https://test.volterra.us";
        process.env.F5XC_P12_FILE = "/path/to/cert.p12";
        process.env.F5XC_P12_PASSWORD = "password";

        const credentialManager = new CredentialManager();
        expect(credentialManager.getAuthMode()).toBe(AuthMode.CERTIFICATE);

        // Create HTTP client with P12 auth
        const httpClient = new HttpClient(credentialManager);

        // Verify axios.create was called with httpsAgent configuration
        expect(mockedAxios.create).toHaveBeenCalledWith(
          expect.objectContaining({
            baseURL: expect.any(String),
            timeout: expect.any(Number),
          })
        );

        expect(httpClient.isAvailable()).toBe(true);
      });

      it("should throw AuthenticationError when token is null but auth mode is TOKEN", () => {
        // Create a mock credential manager that returns TOKEN mode but null token
        const mockCredManager = {
          isAuthenticated: vi.fn().mockReturnValue(true),
          getAuthMode: vi.fn().mockReturnValue(AuthMode.TOKEN),
          getApiUrl: vi.fn().mockReturnValue("https://test.console.ves.volterra.io/api"),
          getToken: vi.fn().mockReturnValue(null),
          getTenant: vi.fn().mockReturnValue("test"),
          getP12Certificate: vi.fn().mockReturnValue(null),
          getP12Password: vi.fn().mockReturnValue(null),
        } as unknown as CredentialManager;

        expect(() => new HttpClient(mockCredManager)).toThrow(AuthenticationError);
        expect(() => new HttpClient(mockCredManager)).toThrow("API token not configured");
      });

      it("should throw AuthenticationError when P12 certificate is null but auth mode is CERTIFICATE", () => {
        // Create a mock credential manager that returns CERTIFICATE mode but null certificate
        const mockCredManager = {
          isAuthenticated: vi.fn().mockReturnValue(true),
          getAuthMode: vi.fn().mockReturnValue(AuthMode.CERTIFICATE),
          getApiUrl: vi.fn().mockReturnValue("https://test.console.ves.volterra.io/api"),
          getToken: vi.fn().mockReturnValue(null),
          getTenant: vi.fn().mockReturnValue("test"),
          getP12Certificate: vi.fn().mockReturnValue(null),
          getP12Password: vi.fn().mockReturnValue(null),
        } as unknown as CredentialManager;

        expect(() => new HttpClient(mockCredManager)).toThrow(AuthenticationError);
        expect(() => new HttpClient(mockCredManager)).toThrow("P12 certificate not loaded");
      });

      it("should throw AuthenticationError when API URL is null but authenticated", () => {
        // Create a mock credential manager that returns authenticated but null API URL
        const mockCredManager = {
          isAuthenticated: vi.fn().mockReturnValue(true),
          getAuthMode: vi.fn().mockReturnValue(AuthMode.TOKEN),
          getApiUrl: vi.fn().mockReturnValue(null),
          getToken: vi.fn().mockReturnValue("test-token"),
          getTenant: vi.fn().mockReturnValue("test"),
          getP12Certificate: vi.fn().mockReturnValue(null),
          getP12Password: vi.fn().mockReturnValue(null),
        } as unknown as CredentialManager;

        expect(() => new HttpClient(mockCredManager)).toThrow(AuthenticationError);
        expect(() => new HttpClient(mockCredManager)).toThrow("API URL not configured");
      });
    });
  });

  describe("createHttpClient", () => {
    it("should create HttpClient instance", () => {
      const credentialManager = new CredentialManager();
      const httpClient = createHttpClient(credentialManager);

      expect(httpClient).toBeInstanceOf(HttpClient);
    });

    it("should pass config to HttpClient", () => {
      process.env.F5XC_API_URL = "https://test.volterra.us";
      process.env.F5XC_API_TOKEN = "test-token";

      const credentialManager = new CredentialManager();
      const httpClient = createHttpClient(credentialManager, { timeout: 60000 });

      expect(mockedAxios.create).toHaveBeenCalledWith(
        expect.objectContaining({
          timeout: 60000,
        })
      );
    });
  });
});
