// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Tests verifying HTTP cache is wired into tool execution.
 * Security fix for issue #493.
 *
 * These tests verify the HttpCache and createHttpCacheFromEnv()
 * functions directly since executeTool() requires the full tool registry.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { HttpCache, createHttpCacheFromEnv } from "../../src/utils/http-cache.js";

describe("HTTP cache integration (#493)", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    delete process.env.F5XC_CACHE_MAX_SIZE;
    delete process.env.F5XC_CACHE_TTL;
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  describe("HttpCache basic operations", () => {
    it("should store and retrieve GET responses", () => {
      const cache = new HttpCache({ maxSize: 10, defaultTtl: 60000 });

      cache.set("/config/namespaces", { data: { items: [] }, status: 200 });

      const cached = cache.get("/config/namespaces");
      expect(cached).not.toBeNull();
      expect(cached!.data).toEqual({ items: [] });
      expect(cached!.status).toBe(200);
    });

    it("should return null for cache misses", () => {
      const cache = new HttpCache({ maxSize: 10, defaultTtl: 60000 });
      const cached = cache.get("/nonexistent/path");
      expect(cached).toBeNull();
    });

    it("should not cache non-GET requests by default", () => {
      const cache = new HttpCache({ maxSize: 10, defaultTtl: 60000 });

      cache.set("/config/namespaces", { data: {}, status: 201 }, "POST");

      const cached = cache.get("/config/namespaces", "POST");
      expect(cached).toBeNull();
    });

    it("should invalidate cache entries", () => {
      const cache = new HttpCache({ maxSize: 10, defaultTtl: 60000 });

      cache.set("/config/namespaces", { data: { items: [] }, status: 200 });
      expect(cache.has("/config/namespaces")).toBe(true);

      cache.invalidate("/config/namespaces");
      expect(cache.has("/config/namespaces")).toBe(false);
    });

    it("should evict LRU entries when at capacity", async () => {
      const cache = new HttpCache({ maxSize: 2, defaultTtl: 60000 });

      cache.set("/path/1", { data: "first", status: 200 });
      cache.set("/path/2", { data: "second", status: 200 });

      // Small delay so Date.now() differs for the access timestamp
      await new Promise((resolve) => setTimeout(resolve, 5));

      // Access path/1 to make it more recently used
      cache.get("/path/1");

      // Adding path/3 should evict path/2 (least recently used)
      cache.set("/path/3", { data: "third", status: 200 });

      expect(cache.has("/path/1")).toBe(true);
      expect(cache.has("/path/2")).toBe(false);
      expect(cache.has("/path/3")).toBe(true);
    });

    it("should expire entries after TTL", async () => {
      const cache = new HttpCache({ maxSize: 10, defaultTtl: 50 });

      cache.set("/config/namespaces", { data: { items: [] }, status: 200 });
      expect(cache.has("/config/namespaces")).toBe(true);

      // Wait for TTL to expire
      await new Promise((resolve) => setTimeout(resolve, 60));

      expect(cache.has("/config/namespaces")).toBe(false);
    });
  });

  describe("HttpCache stats tracking", () => {
    it("should track cache hits and misses", () => {
      const cache = new HttpCache({ maxSize: 10, defaultTtl: 60000 });

      cache.set("/path/1", { data: "data", status: 200 });

      cache.get("/path/1"); // hit
      cache.get("/path/2"); // miss

      const stats = cache.getStats();
      expect(stats.hits).toBe(1);
      expect(stats.misses).toBe(1);
      expect(stats.hitRate).toBe(50);
    });

    it("should track evictions", () => {
      const cache = new HttpCache({ maxSize: 1, defaultTtl: 60000 });

      cache.set("/path/1", { data: "first", status: 200 });
      cache.set("/path/2", { data: "second", status: 200 });

      const stats = cache.getStats();
      expect(stats.evictions).toBe(1);
    });

    it("should reset stats on clear", () => {
      const cache = new HttpCache({ maxSize: 10, defaultTtl: 60000 });

      cache.set("/path/1", { data: "data", status: 200 });
      cache.get("/path/1"); // hit

      cache.clear();
      const stats = cache.getStats();
      expect(stats.hits).toBe(0);
      expect(stats.misses).toBe(0);
      expect(stats.size).toBe(0);
    });
  });

  describe("createHttpCacheFromEnv", () => {
    it("should use defaults when no env vars are set", () => {
      const cache = createHttpCacheFromEnv();
      const stats = cache.getStats();
      expect(stats.maxSize).toBe(100);
    });

    it("should read F5XC_CACHE_MAX_SIZE from environment", () => {
      process.env.F5XC_CACHE_MAX_SIZE = "50";
      const cache = createHttpCacheFromEnv();
      const stats = cache.getStats();
      expect(stats.maxSize).toBe(50);
    });

    it("should read F5XC_CACHE_TTL from environment", async () => {
      // Set a very short TTL (1 second) to verify it's being read
      process.env.F5XC_CACHE_TTL = "1";
      const cache = createHttpCacheFromEnv();

      cache.set("/test", { data: "value", status: 200 });
      expect(cache.has("/test")).toBe(true);

      // Wait for TTL to expire (slightly more than 1 second)
      await new Promise((resolve) => setTimeout(resolve, 1100));
      expect(cache.has("/test")).toBe(false);
    });

    it("should ignore invalid numeric values", () => {
      process.env.F5XC_CACHE_MAX_SIZE = "abc";
      const cache = createHttpCacheFromEnv();
      const stats = cache.getStats();
      expect(stats.maxSize).toBe(100);
    });

    it("should ignore zero or negative values", () => {
      process.env.F5XC_CACHE_MAX_SIZE = "0";
      const cache = createHttpCacheFromEnv();
      const stats = cache.getStats();
      expect(stats.maxSize).toBe(100);
    });
  });
});
