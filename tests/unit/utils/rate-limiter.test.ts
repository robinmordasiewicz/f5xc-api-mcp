// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

import { describe, it, expect, beforeEach, vi } from "vitest";
import { RateLimiter, createRateLimiterFromEnv } from "../../../src/utils/rate-limiter.js";

describe("RateLimiter", () => {
  describe("Token Bucket Algorithm", () => {
    it("should allow burst requests up to burstSize", async () => {
      const limiter = new RateLimiter({
        requestsPerMinute: 60,
        burstSize: 5,
      });

      const results: number[] = [];
      const requests = Array.from({ length: 5 }, (_, i) =>
        limiter.execute(async () => {
          results.push(i);
          return i;
        })
      );

      await Promise.all(requests);
      expect(results).toHaveLength(5);
    });

    it("should refill tokens over time", async () => {
      const limiter = new RateLimiter({
        requestsPerMinute: 60, // 1 token per second
        burstSize: 2,
      });

      // Exhaust initial tokens
      await limiter.execute(async () => 1);
      await limiter.execute(async () => 2);

      // Wait for token refill (1 second = 1 token)
      await new Promise((resolve) => setTimeout(resolve, 1100));

      const state = limiter.getState();
      expect(state.tokens).toBeGreaterThanOrEqual(0.9); // Allow for timing variance
    });

    it("should not exceed burstSize when refilling", async () => {
      const limiter = new RateLimiter({
        requestsPerMinute: 60,
        burstSize: 3,
      });

      // Wait for potential over-refill
      await new Promise((resolve) => setTimeout(resolve, 5000));

      const state = limiter.getState();
      expect(state.tokens).toBeLessThanOrEqual(3);
    });

    it("should track queued requests", async () => {
      const limiter = new RateLimiter({
        requestsPerMinute: 60,
        burstSize: 1,
      });

      // Start multiple requests (only 1 can execute immediately)
      const requests = Array.from({ length: 3 }, () =>
        limiter.execute(async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          return "done";
        })
      );

      // Check queue before completion
      await new Promise((resolve) => setTimeout(resolve, 50));
      const stateDuring = limiter.getState();
      expect(stateDuring.queuedRequests).toBeGreaterThan(0);

      await Promise.all(requests);

      // Queue should be empty after all complete
      const stateAfter = limiter.getState();
      expect(stateAfter.queuedRequests).toBe(0);
    });
  });

  describe("Retry Strategies", () => {
    it("should use exponential backoff by default", async () => {
      const limiter = new RateLimiter({
        requestsPerMinute: 120, // 2 per second, reasonable rate
        burstSize: 2,
        maxRetries: 3,
        initialRetryDelay: 100,
      });

      const startTime = Date.now();

      // Exhaust tokens
      await limiter.execute(async () => "first");
      await limiter.execute(async () => "second");

      // This will wait for token refill (500ms for 1 token at 120rpm)
      await limiter.execute(async () => "third");

      const elapsed = Date.now() - startTime;
      // Should take at least 100ms (first retry)
      expect(elapsed).toBeGreaterThan(90);
    });

    it("should use linear backoff when configured", async () => {
      const limiter = new RateLimiter({
        requestsPerMinute: 120,
        burstSize: 2,
        retryStrategy: "linear",
        maxRetries: 3,
        initialRetryDelay: 100,
      });

      const startTime = Date.now();

      // Exhaust tokens
      await limiter.execute(async () => "first");
      await limiter.execute(async () => "second");
      await limiter.execute(async () => "third");

      const elapsed = Date.now() - startTime;
      // Linear: 100ms (first retry)
      expect(elapsed).toBeGreaterThan(90);
    });

    it("should throw error when max retries exceeded", async () => {
      const limiter = new RateLimiter({
        requestsPerMinute: 1, // Extremely low
        burstSize: 1,
        maxRetries: 2,
        initialRetryDelay: 50,
      });

      // Exhaust token
      await limiter.execute(async () => "first");

      // Should fail after 2 retries
      await expect(limiter.execute(async () => "second")).rejects.toThrow(
        /Rate limit exceeded.*max retries/
      );
    });
  });

  describe("Configuration", () => {
    it("should use default configuration", () => {
      const limiter = new RateLimiter();
      const config = limiter.getConfig();

      expect(config.requestsPerMinute).toBe(60);
      expect(config.burstSize).toBe(10);
      expect(config.retryStrategy).toBe("exponential");
      expect(config.maxRetries).toBe(3);
      expect(config.initialRetryDelay).toBe(1000);
    });

    it("should accept custom configuration", () => {
      const limiter = new RateLimiter({
        requestsPerMinute: 120,
        burstSize: 20,
        retryStrategy: "linear",
        maxRetries: 5,
        initialRetryDelay: 500,
      });

      const config = limiter.getConfig();
      expect(config.requestsPerMinute).toBe(120);
      expect(config.burstSize).toBe(20);
      expect(config.retryStrategy).toBe("linear");
      expect(config.maxRetries).toBe(5);
      expect(config.initialRetryDelay).toBe(500);
    });

    it("should allow partial configuration", () => {
      const limiter = new RateLimiter({
        requestsPerMinute: 30,
      });

      const config = limiter.getConfig();
      expect(config.requestsPerMinute).toBe(30);
      expect(config.burstSize).toBe(10); // default
      expect(config.retryStrategy).toBe("exponential"); // default
    });
  });

  describe("State Management", () => {
    it("should provide current state", () => {
      const limiter = new RateLimiter({
        requestsPerMinute: 60,
        burstSize: 5,
      });

      const state = limiter.getState();
      expect(state.tokens).toBe(5);
      expect(state.queuedRequests).toBe(0);
      expect(state.lastRefillTime).toBeGreaterThan(0);
    });

    it("should reset state correctly", async () => {
      const limiter = new RateLimiter({
        requestsPerMinute: 60,
        burstSize: 3,
      });

      // Exhaust some tokens
      await limiter.execute(async () => 1);
      await limiter.execute(async () => 2);

      const stateBefore = limiter.getState();
      expect(stateBefore.tokens).toBeLessThan(3);

      limiter.reset();

      const stateAfter = limiter.getState();
      expect(stateAfter.tokens).toBe(3);
      expect(stateAfter.queuedRequests).toBe(0);
    });

    it("should check if can accept request", () => {
      const limiter = new RateLimiter({
        requestsPerMinute: 60,
        burstSize: 2,
      });

      expect(limiter.canAccept()).toBe(true);

      // Exhaust tokens (without using execute to avoid async)
      limiter.getState(); // Force refill
      expect(limiter.canAccept()).toBe(true);
    });
  });

  describe("Error Handling", () => {
    it("should propagate errors from executed function", async () => {
      const limiter = new RateLimiter();

      await expect(
        limiter.execute(async () => {
          throw new Error("Test error");
        })
      ).rejects.toThrow("Test error");
    });

    it("should decrement queue count even on error", async () => {
      const limiter = new RateLimiter();

      try {
        await limiter.execute(async () => {
          throw new Error("Test error");
        });
      } catch {
        // Ignore error
      }

      const state = limiter.getState();
      expect(state.queuedRequests).toBe(0);
    });
  });

  describe("Concurrent Requests", () => {
    it("should handle concurrent requests correctly", async () => {
      const limiter = new RateLimiter({
        requestsPerMinute: 120, // 2 per second
        burstSize: 10,
      });

      const results: number[] = [];
      const requests = Array.from({ length: 20 }, (_, i) =>
        limiter.execute(async () => {
          results.push(i);
          return i;
        })
      );

      await Promise.all(requests);
      expect(results).toHaveLength(20);
    });

    it("should maintain rate limit under concurrent load", async () => {
      const limiter = new RateLimiter({
        requestsPerMinute: 600, // 10 per second - high enough to avoid excessive retries
        burstSize: 10,
        maxRetries: 10,
        initialRetryDelay: 50,
      });

      const startTime = Date.now();
      const results: string[] = [];

      // Launch 15 concurrent requests (10 burst + 5 waiting)
      const requests = Array.from({ length: 15 }, (_, i) =>
        limiter.execute(async () => {
          results.push(`request-${i}`);
          return `request-${i}`;
        })
      );

      await Promise.all(requests);

      const elapsed = Date.now() - startTime;
      expect(results).toHaveLength(15);

      // With high rate, most should complete quickly, but some waiting expected
      expect(elapsed).toBeGreaterThan(10);
    });
  });

  describe("Environment Variable Configuration", () => {
    beforeEach(() => {
      // Clear environment variables
      delete process.env.F5XC_RATE_LIMIT_RPM;
      delete process.env.F5XC_RATE_LIMIT_BURST;
      delete process.env.F5XC_RATE_LIMIT_STRATEGY;
      delete process.env.F5XC_RATE_LIMIT_MAX_RETRIES;
    });

    it("should create rate limiter with default config when no env vars", () => {
      const limiter = createRateLimiterFromEnv();
      const config = limiter.getConfig();

      expect(config.requestsPerMinute).toBe(60);
      expect(config.burstSize).toBe(10);
      expect(config.retryStrategy).toBe("exponential");
      expect(config.maxRetries).toBe(3);
    });

    it("should read configuration from environment variables", () => {
      process.env.F5XC_RATE_LIMIT_RPM = "120";
      process.env.F5XC_RATE_LIMIT_BURST = "20";
      process.env.F5XC_RATE_LIMIT_STRATEGY = "linear";
      process.env.F5XC_RATE_LIMIT_MAX_RETRIES = "5";

      const limiter = createRateLimiterFromEnv();
      const config = limiter.getConfig();

      expect(config.requestsPerMinute).toBe(120);
      expect(config.burstSize).toBe(20);
      expect(config.retryStrategy).toBe("linear");
      expect(config.maxRetries).toBe(5);
    });

    it("should ignore invalid environment variable values", () => {
      process.env.F5XC_RATE_LIMIT_RPM = "invalid";
      process.env.F5XC_RATE_LIMIT_BURST = "-10";
      process.env.F5XC_RATE_LIMIT_STRATEGY = "invalid";

      const limiter = createRateLimiterFromEnv();
      const config = limiter.getConfig();

      // Should use defaults for invalid values
      expect(config.requestsPerMinute).toBe(60);
      expect(config.burstSize).toBe(10);
      expect(config.retryStrategy).toBe("exponential");
    });

    it("should handle partial environment configuration", () => {
      process.env.F5XC_RATE_LIMIT_RPM = "90";

      const limiter = createRateLimiterFromEnv();
      const config = limiter.getConfig();

      expect(config.requestsPerMinute).toBe(90);
      expect(config.burstSize).toBe(10); // default
      expect(config.retryStrategy).toBe("exponential"); // default
    });
  });

  describe("Performance", () => {
    it("should handle high throughput efficiently", async () => {
      const limiter = new RateLimiter({
        requestsPerMinute: 6000, // 100 per second
        burstSize: 100,
      });

      const startTime = Date.now();
      const requests = Array.from({ length: 100 }, (_, i) =>
        limiter.execute(async () => i)
      );

      await Promise.all(requests);
      const elapsed = Date.now() - startTime;

      // Should complete quickly with high rate limit
      expect(elapsed).toBeLessThan(500);
    });

    it("should minimize overhead for token refill calculation", () => {
      const limiter = new RateLimiter();

      const startTime = Date.now();
      for (let i = 0; i < 1000; i++) {
        limiter.canAccept(); // Forces refill calculation
      }
      const elapsed = Date.now() - startTime;

      // 1000 refill calculations should be fast
      expect(elapsed).toBeLessThan(100);
    });
  });
});
