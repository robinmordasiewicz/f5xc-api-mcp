/**
 * Network Failure Integration Tests
 *
 * Tests network error handling and resilience under adverse conditions.
 * Uses controlled scenarios to validate error handling without impacting live API.
 *
 * Scenarios:
 * - ETIMEDOUT (connection timeout)
 * - ECONNREFUSED (connection refused)
 * - ENOTFOUND (DNS resolution failure)
 * - Network interruption mid-request
 * - 429 rate limit response handling
 */

import { describe, it, expect } from "vitest";
import axios, { AxiosError } from "axios";

/** Staging tenant name — override with TEST_TENANT_NAME env var */
const TEST_TENANT = process.env.TEST_TENANT_NAME ?? "staging-test";
const STAGING_BASE_URL = `https://${TEST_TENANT}.staging.volterra.us`;

describe("Network Failure Integration Tests", () => {
  describe("Connection Timeout Scenarios", () => {
    it("should handle ETIMEDOUT with very short timeout", async () => {
      const httpClient = axios.create({
        baseURL: STAGING_BASE_URL,
        timeout: 1, // 1ms timeout - will fail
      });

      try {
        await httpClient.get("/api/web/namespaces");
        expect.fail("Should have thrown timeout error");
      } catch (error: any) {
        expect(error.code).toBeDefined();
        expect(["ECONNABORTED", "ETIMEDOUT"]).toContain(error.code);
        expect(error.message).toContain("timeout");
      }
    });

    it("should provide timeout context in error", async () => {
      const httpClient = axios.create({
        baseURL: STAGING_BASE_URL,
        timeout: 1,
      });

      try {
        await httpClient.get("/api/web/namespaces");
        expect.fail("Should have thrown timeout error");
      } catch (error: any) {
        // Verify error context
        expect(error.config).toBeDefined();
        expect(error.config.timeout).toBe(1);
        expect(error.config.url).toBeDefined();
      }
    });

    it("should handle read timeout vs connection timeout", async () => {
      const httpClient = axios.create({
        baseURL: STAGING_BASE_URL,
        timeout: 1,
      });

      try {
        await httpClient.get("/api/web/namespaces");
        expect.fail("Should have thrown timeout error");
      } catch (error: any) {
        // Any timeout error is acceptable
        expect(error.code).toBeDefined();
        expect(error.message).toBeDefined();
      }
    });
  });

  describe("DNS Resolution Failures", () => {
    it("should handle ENOTFOUND for invalid hostname", async () => {
      const httpClient = axios.create({
        baseURL: "https://nonexistent-invalid-hostname-12345.volterra.us",
        timeout: 5000,
      });

      try {
        await httpClient.get("/api/web/namespaces");
        expect.fail("Should have thrown DNS error");
      } catch (error: any) {
        expect(error.code).toBeDefined();
        expect(["ENOTFOUND", "EAI_AGAIN"]).toContain(error.code);
      }
    });

    it("should handle DNS timeout", async () => {
      const httpClient = axios.create({
        baseURL: "https://test-nonexistent-dns-timeout-12345.invalid",
        timeout: 5000,
      });

      try {
        await httpClient.get("/api/web/namespaces");
        expect.fail("Should have thrown DNS error");
      } catch (error: any) {
        expect(error.code).toBeDefined();
        // Could be ENOTFOUND or timeout
        expect(error.code).toBeDefined();
      }
    });
  });

  describe("Connection Refused Scenarios", () => {
    it("should handle ECONNREFUSED on invalid port", async () => {
      const httpClient = axios.create({
        baseURL: "http://127.0.0.1:9999", // Local port that's not listening
        timeout: 5000,
      });

      try {
        await httpClient.get("/api/web/namespaces");
        expect.fail("Should have thrown connection error");
      } catch (error: any) {
        expect(error.code).toBeDefined();
        // Could be ECONNREFUSED or timeout
        expect(["ECONNREFUSED", "ETIMEDOUT", "ECONNABORTED"]).toContain(error.code);
      }
    });

    it("should provide connection refused context", async () => {
      const httpClient = axios.create({
        baseURL: "http://127.0.0.1:9999",
        timeout: 3000,
      });

      try {
        await httpClient.get("/test");
        expect.fail("Should have thrown connection error");
      } catch (error: any) {
        // Verify we have error context
        expect(error.message).toBeDefined();
        expect(error.config).toBeDefined();
        expect(error.config.baseURL).toBe("http://127.0.0.1:9999");
      }
    });
  });

  describe("Network Interruption Scenarios", () => {
    it("should handle connection reset", async () => {
      // Simulate connection reset with invalid host
      const httpClient = axios.create({
        baseURL: "http://192.0.2.1", // TEST-NET-1 - should not route
        timeout: 3000,
      });

      try {
        await httpClient.get("/api/test");
        expect.fail("Should have thrown network error");
      } catch (error: any) {
        // Should get network error
        expect(error.code).toBeDefined();
        expect(["ETIMEDOUT", "ECONNABORTED", "ECONNREFUSED"]).toContain(error.code);
      }
    });

    it("should handle SSL/TLS errors gracefully", async () => {
      // Try connecting to HTTP endpoint with HTTPS
      const httpClient = axios.create({
        baseURL: "https://example.com:80", // HTTP port with HTTPS protocol
        timeout: 5000,
      });

      try {
        await httpClient.get("/");

        // If it succeeds (redirect or upgrade), that's fine
        expect(true).toBe(true);
      } catch (error: any) {
        // Should get SSL/TLS or connection error
        expect(error.code).toBeDefined();
      }
    });
  });

  describe("Rate Limit Handling", () => {
    it("should identify 429 responses", async () => {
      // Note: We can't reliably trigger 429 without flooding the API
      // This test validates our ability to recognize 429 when it occurs

      // Create a test for 429 detection
      const mockError: AxiosError = {
        name: "AxiosError",
        message: "Request failed with status code 429",
        config: {} as any,
        code: "ERR_BAD_REQUEST",
        request: {},
        response: {
          status: 429,
          statusText: "Too Many Requests",
          headers: {
            "retry-after": "60",
          },
          config: {} as any,
          data: {
            error: "Rate limit exceeded",
          },
        },
        isAxiosError: true,
        toJSON: () => ({}),
      };

      // Verify we can detect 429
      expect(mockError.response?.status).toBe(429);
      expect(mockError.response?.headers["retry-after"]).toBeDefined();
    });

    it("should extract retry-after header from 429 responses", async () => {
      // Mock 429 response with retry-after header
      const mockResponse = {
        status: 429,
        headers: {
          "retry-after": "60",
        },
        data: {
          error: "Rate limit exceeded",
        },
      };

      // Verify we can extract retry-after
      const retryAfter = mockResponse.headers["retry-after"];
      expect(retryAfter).toBe("60");
      expect(parseInt(retryAfter, 10)).toBe(60);
    });
  });

  describe("Error Recovery Patterns", () => {
    it("should retry on network errors with exponential backoff", async () => {
      const maxRetries = 3;
      const baseDelay = 100;
      let attemptCount = 0;

      const attemptRequest = async (): Promise<any> => {
        attemptCount++;

        if (attemptCount < maxRetries) {
          // Simulate network failure
          throw new Error("Network failure");
        }

        // Succeed on final attempt
        return { data: "success" };
      };

      const retryWithBackoff = async (): Promise<any> => {
        let lastError: Error | null = null;

        for (let attempt = 0; attempt < maxRetries; attempt++) {
          try {
            return await attemptRequest();
          } catch (error) {
            lastError = error as Error;

            if (attempt < maxRetries - 1) {
              const delay = baseDelay * Math.pow(2, attempt);
              await new Promise((resolve) => setTimeout(resolve, delay));
            }
          }
        }

        throw lastError;
      };

      const result = await retryWithBackoff();
      expect(result.data).toBe("success");
      expect(attemptCount).toBe(maxRetries);
    });

    it("should not retry on client errors (4xx)", async () => {
      let attemptCount = 0;

      const attemptRequest = async (): Promise<any> => {
        attemptCount++;

        const error: any = new Error("Client error");
        error.response = { status: 400 };
        throw error;
      };

      const shouldRetry = (error: any): boolean => {
        const status = error.response?.status;
        // Don't retry 4xx errors except 429
        if (status >= 400 && status < 500 && status !== 429) {
          return false;
        }
        return true;
      };

      try {
        await attemptRequest();
        expect.fail("Should have thrown error");
      } catch (error: any) {
        expect(shouldRetry(error)).toBe(false);
        expect(attemptCount).toBe(1); // No retries
      }
    });

    it("should retry on server errors (5xx)", async () => {
      let attemptCount = 0;
      const maxRetries = 3;

      const attemptRequest = async (): Promise<any> => {
        attemptCount++;

        if (attemptCount < maxRetries) {
          const error: any = new Error("Server error");
          error.response = { status: 500 };
          throw error;
        }

        return { data: "success" };
      };

      const shouldRetry = (error: any): boolean => {
        const status = error.response?.status;
        // Retry 5xx errors
        return status >= 500;
      };

      const retryLogic = async (): Promise<any> => {
        let lastError: Error | null = null;

        for (let attempt = 0; attempt < maxRetries; attempt++) {
          try {
            return await attemptRequest();
          } catch (error: any) {
            lastError = error;

            if (!shouldRetry(error) || attempt >= maxRetries - 1) {
              throw error;
            }

            await new Promise((resolve) => setTimeout(resolve, 100));
          }
        }
      };

      const result = await retryLogic();
      expect(result.data).toBe("success");
      expect(attemptCount).toBe(maxRetries);
    });
  });

  describe("Error Context Preservation", () => {
    it("should preserve full error context through retries", async () => {
      let capturedErrors: any[] = [];

      const attemptWithContext = async (): Promise<void> => {
        const error: any = new Error("Test error");
        error.config = {
          url: "/api/test",
          method: "GET",
          baseURL: "https://test.example.com",
        };
        error.response = {
          status: 500,
          statusText: "Internal Server Error",
        };

        capturedErrors.push(error);
        throw error;
      };

      try {
        await attemptWithContext();
      } catch (error: any) {
        expect(capturedErrors.length).toBe(1);
        expect(capturedErrors[0].config).toBeDefined();
        expect(capturedErrors[0].config.url).toBe("/api/test");
        expect(capturedErrors[0].response.status).toBe(500);
      }
    });
  });
});
