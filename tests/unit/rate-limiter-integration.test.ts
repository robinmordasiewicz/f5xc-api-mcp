// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Tests verifying rate limiter is wired into tool execution.
 * Security fix for issue #490.
 *
 * These tests verify the RateLimiter and createRateLimiterFromEnv()
 * functions directly since executeTool() requires the full tool registry.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { RateLimiter, createRateLimiterFromEnv } from "../../src/utils/rate-limiter.js";

describe("rate limiter integration (#490)", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    delete process.env.F5XC_RATE_LIMIT_RPM;
    delete process.env.F5XC_RATE_LIMIT_BURST;
    delete process.env.F5XC_RATE_LIMIT_STRATEGY;
    delete process.env.F5XC_RATE_LIMIT_MAX_RETRIES;
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  describe("RateLimiter.execute", () => {
    it("should execute a function successfully within rate limits", async () => {
      const limiter = new RateLimiter({ burstSize: 5, requestsPerMinute: 60 });
      const result = await limiter.execute(async () => "success");
      expect(result).toBe("success");
    });

    it("should propagate errors from the executed function", async () => {
      const limiter = new RateLimiter({ burstSize: 5, requestsPerMinute: 60 });
      await expect(
        limiter.execute(async () => {
          throw new Error("API failure");
        })
      ).rejects.toThrow("API failure");
    });

    it("should track queued requests", async () => {
      const limiter = new RateLimiter({ burstSize: 10, requestsPerMinute: 600 });
      expect(limiter.getState().queuedRequests).toBe(0);

      // Start a slow operation
      const promise = limiter.execute(
        () => new Promise((resolve) => setTimeout(() => resolve("done"), 50))
      );
      // The request is queued during execution
      expect(limiter.getState().queuedRequests).toBe(1);
      await promise;
      expect(limiter.getState().queuedRequests).toBe(0);
    });

    it("should consume tokens on each request", async () => {
      const limiter = new RateLimiter({ burstSize: 3, requestsPerMinute: 60 });
      const initialTokens = limiter.getState().tokens;

      await limiter.execute(async () => "ok");
      const afterOneRequest = limiter.getState().tokens;

      expect(afterOneRequest).toBeLessThan(initialTokens);
    });
  });

  describe("createRateLimiterFromEnv", () => {
    it("should use defaults when no env vars are set", () => {
      const limiter = createRateLimiterFromEnv();
      const config = limiter.getConfig();
      expect(config.requestsPerMinute).toBe(60);
      expect(config.burstSize).toBe(10);
      expect(config.retryStrategy).toBe("exponential");
      expect(config.maxRetries).toBe(3);
    });

    it("should read F5XC_RATE_LIMIT_RPM from environment", () => {
      process.env.F5XC_RATE_LIMIT_RPM = "120";
      const limiter = createRateLimiterFromEnv();
      expect(limiter.getConfig().requestsPerMinute).toBe(120);
    });

    it("should read F5XC_RATE_LIMIT_BURST from environment", () => {
      process.env.F5XC_RATE_LIMIT_BURST = "20";
      const limiter = createRateLimiterFromEnv();
      expect(limiter.getConfig().burstSize).toBe(20);
    });

    it("should read F5XC_RATE_LIMIT_STRATEGY from environment", () => {
      process.env.F5XC_RATE_LIMIT_STRATEGY = "linear";
      const limiter = createRateLimiterFromEnv();
      expect(limiter.getConfig().retryStrategy).toBe("linear");
    });

    it("should read F5XC_RATE_LIMIT_MAX_RETRIES from environment", () => {
      process.env.F5XC_RATE_LIMIT_MAX_RETRIES = "5";
      const limiter = createRateLimiterFromEnv();
      expect(limiter.getConfig().maxRetries).toBe(5);
    });

    it("should ignore invalid numeric values", () => {
      process.env.F5XC_RATE_LIMIT_RPM = "abc";
      const limiter = createRateLimiterFromEnv();
      expect(limiter.getConfig().requestsPerMinute).toBe(60);
    });

    it("should ignore zero or negative RPM values", () => {
      process.env.F5XC_RATE_LIMIT_RPM = "0";
      const limiter = createRateLimiterFromEnv();
      expect(limiter.getConfig().requestsPerMinute).toBe(60);
    });

    it("should ignore invalid strategy values", () => {
      process.env.F5XC_RATE_LIMIT_STRATEGY = "invalid";
      const limiter = createRateLimiterFromEnv();
      expect(limiter.getConfig().retryStrategy).toBe("exponential");
    });
  });

  describe("RateLimiter.canAccept", () => {
    it("should accept when tokens are available", () => {
      const limiter = new RateLimiter({ burstSize: 5, requestsPerMinute: 60 });
      expect(limiter.canAccept()).toBe(true);
    });

    it("should reject when all tokens are consumed", async () => {
      const limiter = new RateLimiter({
        burstSize: 2,
        requestsPerMinute: 1,
        maxRetries: 0,
      });

      // Consume all tokens
      await limiter.execute(async () => "ok");
      await limiter.execute(async () => "ok");

      expect(limiter.canAccept()).toBe(false);
    });
  });

  describe("RateLimiter.reset", () => {
    it("should restore tokens to full bucket after reset", async () => {
      const limiter = new RateLimiter({ burstSize: 3, requestsPerMinute: 60 });

      // Consume some tokens
      await limiter.execute(async () => "ok");
      await limiter.execute(async () => "ok");

      limiter.reset();
      const state = limiter.getState();
      expect(state.tokens).toBe(3);
      expect(state.queuedRequests).toBe(0);
    });
  });
});
