// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { HttpCache, createHttpCacheFromEnv, type HttpCacheConfig } from "../../../src/utils/http-cache.js";

describe("HttpCache", () => {
  let cache: HttpCache;

  beforeEach(() => {
    cache = new HttpCache({
      maxSize: 10,
      defaultTtl: 5000, // 5 seconds for testing
    });
  });

  describe("Basic Operations", () => {
    it("should store and retrieve cached responses", () => {
      const response = { data: { id: 1, name: "test" }, status: 200 };

      cache.set("/api/resource", response);
      const cached = cache.get("/api/resource");

      expect(cached).toBeDefined();
      expect(cached?.data).toEqual(response.data);
      expect(cached?.status).toBe(200);
    });

    it("should return null for cache miss", () => {
      const cached = cache.get("/api/nonexistent");
      expect(cached).toBeNull();
    });

    it("should check cache existence with has()", () => {
      const response = { data: { id: 1 }, status: 200 };

      expect(cache.has("/api/resource")).toBe(false);

      cache.set("/api/resource", response);

      expect(cache.has("/api/resource")).toBe(true);
    });

    it("should invalidate cached entries", () => {
      const response = { data: { id: 1 }, status: 200 };

      cache.set("/api/resource", response);
      expect(cache.has("/api/resource")).toBe(true);

      cache.invalidate("/api/resource");
      expect(cache.has("/api/resource")).toBe(false);
    });

    it("should clear all cached entries", () => {
      cache.set("/api/resource1", { data: { id: 1 }, status: 200 });
      cache.set("/api/resource2", { data: { id: 2 }, status: 200 });

      expect(cache.getStats().size).toBe(2);

      cache.clear();

      expect(cache.getStats().size).toBe(0);
      expect(cache.has("/api/resource1")).toBe(false);
      expect(cache.has("/api/resource2")).toBe(false);
    });
  });

  describe("HTTP Methods", () => {
    it("should cache different methods separately", () => {
      cache.set("/api/resource", { data: { method: "get" }, status: 200 }, "GET");
      cache.set("/api/resource", { data: { method: "post" }, status: 201 }, "POST", {
        "cache-control": "max-age=60",
      });

      const getCached = cache.get("/api/resource", "GET");
      const postCached = cache.get("/api/resource", "POST");

      expect(getCached?.data).toEqual({ method: "get" });
      expect(postCached?.data).toEqual({ method: "post" });
    });

    it("should not cache non-GET methods by default", () => {
      cache.set("/api/resource", { data: { method: "post" }, status: 201 }, "POST");

      const cached = cache.get("/api/resource", "POST");
      expect(cached).toBeNull();
    });

    it("should cache non-GET methods if Cache-Control header provided", () => {
      cache.set(
        "/api/resource",
        { data: { method: "post" }, status: 201 },
        "POST",
        { "cache-control": "max-age=60" }
      );

      const cached = cache.get("/api/resource", "POST");
      expect(cached?.data).toEqual({ method: "post" });
    });
  });

  describe("TTL Expiration", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should expire entries after TTL", () => {
      cache.set("/api/resource", { data: { id: 1 }, status: 200 });

      expect(cache.has("/api/resource")).toBe(true);

      // Advance time past TTL
      vi.advanceTimersByTime(6000);

      expect(cache.has("/api/resource")).toBe(false);
    });

    it("should not expire entries before TTL", () => {
      cache.set("/api/resource", { data: { id: 1 }, status: 200 });

      vi.advanceTimersByTime(4000); // 4 seconds, TTL is 5

      expect(cache.has("/api/resource")).toBe(true);
    });

    it("should track expirations in stats", () => {
      cache.set("/api/resource", { data: { id: 1 }, status: 200 });

      vi.advanceTimersByTime(6000);

      cache.get("/api/resource"); // Trigger expiration check

      const stats = cache.getStats();
      expect(stats.expirations).toBe(1);
    });
  });

  describe("Cache-Control Headers", () => {
    it("should respect max-age from Cache-Control", () => {
      cache.set(
        "/api/resource",
        { data: { id: 1 }, status: 200 },
        "GET",
        { "cache-control": "max-age=10" } // 10 seconds
      );

      const cached = cache.get("/api/resource");
      expect(cached?.ttl).toBe(10000); // 10 seconds in milliseconds
    });

    it("should not cache when Cache-Control says no-cache", () => {
      cache.set(
        "/api/resource",
        { data: { id: 1 }, status: 200 },
        "GET",
        { "cache-control": "no-cache" }
      );

      const cached = cache.get("/api/resource");
      expect(cached).toBeNull();
    });

    it("should not cache when Cache-Control says no-store", () => {
      cache.set(
        "/api/resource",
        { data: { id: 1 }, status: 200 },
        "GET",
        { "cache-control": "no-store" }
      );

      const cached = cache.get("/api/resource");
      expect(cached).toBeNull();
    });

    it("should use default TTL when no Cache-Control header", () => {
      cache.set("/api/resource", { data: { id: 1 }, status: 200 });

      const cached = cache.get("/api/resource");
      expect(cached?.ttl).toBe(5000); // Default 5 seconds
    });

    it("should disable Cache-Control respect when configured", () => {
      const cacheNoRespect = new HttpCache({
        maxSize: 10,
        defaultTtl: 5000,
        respectCacheControl: false,
      });

      cacheNoRespect.set(
        "/api/resource",
        { data: { id: 1 }, status: 200 },
        "GET",
        { "cache-control": "no-cache" }
      );

      const cached = cacheNoRespect.get("/api/resource");
      expect(cached).toBeDefined(); // Should cache despite no-cache
    });
  });

  describe("ETag Support", () => {
    it("should store ETag from headers", () => {
      cache.set(
        "/api/resource",
        { data: { id: 1 }, status: 200 },
        "GET",
        { etag: '"abc123"' }
      );

      const cached = cache.get("/api/resource");
      expect(cached?.etag).toBe('"abc123"');
    });

    it("should retrieve ETag with getETag()", () => {
      cache.set(
        "/api/resource",
        { data: { id: 1 }, status: 200 },
        "GET",
        { etag: '"abc123"' }
      );

      const etag = cache.getETag("/api/resource");
      expect(etag).toBe('"abc123"');
    });

    it("should return null for missing ETag", () => {
      cache.set("/api/resource", { data: { id: 1 }, status: 200 });

      const etag = cache.getETag("/api/resource");
      expect(etag).toBeNull();
    });
  });

  describe("LRU Eviction", () => {
    beforeEach(() => {
      cache = new HttpCache({
        maxSize: 3, // Small cache for testing
        defaultTtl: 60000,
      });
    });

    it("should evict least recently used when at capacity", () => {
      cache.set("/api/resource1", { data: { id: 1 }, status: 200 });
      cache.set("/api/resource2", { data: { id: 2 }, status: 200 });
      cache.set("/api/resource3", { data: { id: 3 }, status: 200 });

      expect(cache.getStats().size).toBe(3);

      // Add fourth entry, should evict oldest (resource1)
      cache.set("/api/resource4", { data: { id: 4 }, status: 200 });

      expect(cache.getStats().size).toBe(3);
      expect(cache.has("/api/resource1")).toBe(false); // Evicted
      expect(cache.has("/api/resource4")).toBe(true); // New entry
    });

    it("should track recently accessed entries", () => {
      vi.useFakeTimers();

      cache.set("/api/resource1", { data: { id: 1 }, status: 200 });
      vi.advanceTimersByTime(10); // Advance time

      cache.set("/api/resource2", { data: { id: 2 }, status: 200 });
      vi.advanceTimersByTime(10);

      cache.set("/api/resource3", { data: { id: 3 }, status: 200 });
      vi.advanceTimersByTime(10);

      // Access resource1 to make it recently used
      cache.get("/api/resource1");
      vi.advanceTimersByTime(10);

      // Add fourth entry, should evict resource2 (not resource1)
      cache.set("/api/resource4", { data: { id: 4 }, status: 200 });

      expect(cache.has("/api/resource1")).toBe(true); // Still there (recently accessed)
      expect(cache.has("/api/resource2")).toBe(false); // Evicted (least recently used)

      vi.useRealTimers();
    });

    it("should track eviction count in stats", () => {
      cache.set("/api/resource1", { data: { id: 1 }, status: 200 });
      cache.set("/api/resource2", { data: { id: 2 }, status: 200 });
      cache.set("/api/resource3", { data: { id: 3 }, status: 200 });
      cache.set("/api/resource4", { data: { id: 4 }, status: 200 });

      const stats = cache.getStats();
      expect(stats.evictions).toBe(1);
    });

    it("should not evict when updating existing entry", () => {
      cache.set("/api/resource1", { data: { id: 1 }, status: 200 });
      cache.set("/api/resource2", { data: { id: 2 }, status: 200 });
      cache.set("/api/resource3", { data: { id: 3 }, status: 200 });

      // Update existing entry
      cache.set("/api/resource1", { data: { id: 1, updated: true }, status: 200 });

      const stats = cache.getStats();
      expect(stats.evictions).toBe(0); // No eviction
      expect(stats.size).toBe(3);
    });
  });

  describe("Statistics", () => {
    it("should track cache hits", () => {
      cache.set("/api/resource", { data: { id: 1 }, status: 200 });

      cache.get("/api/resource");
      cache.get("/api/resource");

      const stats = cache.getStats();
      expect(stats.hits).toBe(2);
    });

    it("should track cache misses", () => {
      cache.get("/api/nonexistent1");
      cache.get("/api/nonexistent2");

      const stats = cache.getStats();
      expect(stats.misses).toBe(2);
    });

    it("should calculate hit rate correctly", () => {
      cache.set("/api/resource", { data: { id: 1 }, status: 200 });

      cache.get("/api/resource"); // Hit
      cache.get("/api/resource"); // Hit
      cache.get("/api/nonexistent"); // Miss

      const stats = cache.getStats();
      expect(stats.hitRate).toBe(66.67); // 2 hits out of 3 requests
    });

    it("should handle zero requests for hit rate", () => {
      const stats = cache.getStats();
      expect(stats.hitRate).toBe(0);
    });

    it("should report current cache size", () => {
      cache.set("/api/resource1", { data: { id: 1 }, status: 200 });
      cache.set("/api/resource2", { data: { id: 2 }, status: 200 });

      const stats = cache.getStats();
      expect(stats.size).toBe(2);
      expect(stats.maxSize).toBe(10);
    });

    it("should reset stats on clear()", () => {
      cache.set("/api/resource", { data: { id: 1 }, status: 200 });
      cache.get("/api/resource");
      cache.get("/api/nonexistent");

      cache.clear();

      const stats = cache.getStats();
      expect(stats.hits).toBe(0);
      expect(stats.misses).toBe(0);
      expect(stats.evictions).toBe(0);
      expect(stats.expirations).toBe(0);
    });
  });

  describe("Configuration", () => {
    it("should use default configuration", () => {
      const defaultCache = new HttpCache();
      defaultCache.set("/api/resource", { data: { id: 1 }, status: 200 });

      const stats = defaultCache.getStats();
      expect(stats.maxSize).toBe(100); // Default max size
    });

    it("should accept custom configuration", () => {
      const customCache = new HttpCache({
        maxSize: 50,
        defaultTtl: 10000,
        respectCacheControl: false,
        useEtag: false,
      });

      customCache.set("/api/resource", { data: { id: 1 }, status: 200 });

      const stats = customCache.getStats();
      expect(stats.maxSize).toBe(50);
    });

    it("should handle partial configuration", () => {
      const partialCache = new HttpCache({
        maxSize: 25,
      });

      const stats = partialCache.getStats();
      expect(stats.maxSize).toBe(25);
    });
  });

  describe("Edge Cases", () => {
    it("should handle cache key with special characters", () => {
      cache.set("/api/resource?foo=bar&baz=qux", { data: { id: 1 }, status: 200 });

      const cached = cache.get("/api/resource?foo=bar&baz=qux");
      expect(cached).toBeDefined();
    });

    it("should handle empty cache operations", () => {
      cache.clear();
      cache.invalidate("/nonexistent");

      expect(cache.getStats().size).toBe(0);
    });

    it("should handle very large data", () => {
      const largeData = { items: Array.from({ length: 1000 }, (_, i) => ({ id: i })) };

      cache.set("/api/large", { data: largeData, status: 200 });

      const cached = cache.get("/api/large");
      expect(cached?.data).toEqual(largeData);
    });

    it("should handle concurrent cache operations", () => {
      const urls = Array.from({ length: 20 }, (_, i) => `/api/resource${i}`);

      // Simulate concurrent sets
      urls.forEach((url) => {
        cache.set(url, { data: { url }, status: 200 });
      });

      const stats = cache.getStats();
      expect(stats.size).toBeLessThanOrEqual(10); // Max size constraint
    });

    it("should handle missing headers gracefully", () => {
      cache.set("/api/resource", { data: { id: 1 }, status: 200 }, "GET", undefined);

      const cached = cache.get("/api/resource");
      expect(cached).toBeDefined();
    });
  });

  describe("createHttpCacheFromEnv", () => {
    beforeEach(() => {
      delete process.env.F5XC_CACHE_MAX_SIZE;
      delete process.env.F5XC_CACHE_TTL;
    });

    afterEach(() => {
      delete process.env.F5XC_CACHE_MAX_SIZE;
      delete process.env.F5XC_CACHE_TTL;
    });

    it("should use defaults when no env vars set", () => {
      const cache = createHttpCacheFromEnv();

      const stats = cache.getStats();
      expect(stats.maxSize).toBe(100); // Default
    });

    it("should read max size from environment", () => {
      process.env.F5XC_CACHE_MAX_SIZE = "50";

      const cache = createHttpCacheFromEnv();

      const stats = cache.getStats();
      expect(stats.maxSize).toBe(50);
    });

    it("should read TTL from environment (in seconds)", () => {
      process.env.F5XC_CACHE_TTL = "600"; // 10 minutes

      const cache = createHttpCacheFromEnv();
      cache.set("/api/resource", { data: { id: 1 }, status: 200 });

      const cached = cache.get("/api/resource");
      expect(cached?.ttl).toBe(600000); // 600 seconds = 600,000 milliseconds
    });

    it("should handle invalid environment values", () => {
      process.env.F5XC_CACHE_MAX_SIZE = "invalid";
      process.env.F5XC_CACHE_TTL = "not-a-number";

      const cache = createHttpCacheFromEnv();

      const stats = cache.getStats();
      expect(stats.maxSize).toBe(100); // Falls back to default
    });

    it("should handle negative environment values", () => {
      process.env.F5XC_CACHE_MAX_SIZE = "-10";
      process.env.F5XC_CACHE_TTL = "-5";

      const cache = createHttpCacheFromEnv();

      const stats = cache.getStats();
      expect(stats.maxSize).toBe(100); // Falls back to default
    });
  });

  describe("Performance", () => {
    beforeEach(() => {
      cache = new HttpCache({
        maxSize: 1000,
        defaultTtl: 60000,
      });
    });

    it("should handle large cache efficiently", () => {
      const start = Date.now();

      for (let i = 0; i < 1000; i++) {
        cache.set(`/api/resource${i}`, { data: { id: i }, status: 200 });
      }

      const setTime = Date.now() - start;
      expect(setTime).toBeLessThan(100); // Should be fast
    });

    it("should retrieve from large cache efficiently", () => {
      for (let i = 0; i < 1000; i++) {
        cache.set(`/api/resource${i}`, { data: { id: i }, status: 200 });
      }

      const start = Date.now();

      for (let i = 0; i < 100; i++) {
        cache.get(`/api/resource${i}`);
      }

      const getTime = Date.now() - start;
      expect(getTime).toBeLessThan(20); // Should be very fast
    });
  });
});
