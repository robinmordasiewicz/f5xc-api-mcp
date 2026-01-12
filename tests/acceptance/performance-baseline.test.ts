/**
 * Performance Baseline Tests
 *
 * Establishes performance benchmarks for F5XC API operations.
 * Measures response times, concurrency, and memory usage.
 *
 * Benchmarks:
 * - Simple GET request: < 2 seconds
 * - 10 sequential requests: < 20 seconds
 * - 10 concurrent requests: < 5 seconds
 * - Memory leak detection: < 10MB growth for 100 requests
 * - Tool discovery performance: < 100ms
 */

import { describe, it, expect, beforeAll } from "vitest";
import { CredentialManager } from "@robinmordasiewicz/f5xc-auth";
import axios, { AxiosInstance } from "axios";
import {
  measurePerformance,
  measureMemory,
  calculateMemoryGrowth,
  runConcurrent,
  runSequential,
  calculateStats,
  formatStats,
  triggerGC,
} from "../utils/performance-helpers";

// Performance thresholds
const THRESHOLDS = {
  simpleGet: 2000, // 2 seconds
  sequentialBatch: 20000, // 20 seconds for 10 requests
  concurrentBatch: 5000, // 5 seconds for 10 concurrent requests
  memoryGrowth: 10, // 10 MB
  toolDiscovery: 100, // 100ms
};

let httpClient: AxiosInstance;

beforeAll(async () => {
  console.log("\n⚡ Setting up performance baseline tests...\n");

  const credentialManager = new CredentialManager();
  await credentialManager.initialize();

  if (!credentialManager.isAuthenticated()) {
    throw new Error("Cannot run performance tests without valid credentials");
  }

  httpClient = axios.create({
    baseURL: credentialManager.getApiUrl(),
    headers: {
      Authorization: `APIToken ${credentialManager.getToken()}`,
      "Content-Type": "application/json",
    },
    timeout: 30000,
  });

  console.log(`✅ Authenticated and ready for performance tests\n`);
});

describe("Performance Baseline Tests", () => {
  describe("Response Time Benchmarks", () => {
    it("should complete simple GET request within 2 seconds", async () => {
      const { duration } = await measurePerformance(async () => {
        return await httpClient.get("/api/web/namespaces");
      });

      console.log(`  ⏱️  Simple GET: ${duration}ms`);
      expect(duration).toBeLessThan(THRESHOLDS.simpleGet);
    });

    it("should complete 10 sequential requests within 20 seconds", async () => {
      const { duration } = await measurePerformance(async () => {
        return await runSequential(
          async () => httpClient.get("/api/web/namespaces"),
          10
        );
      });

      const avgDuration = duration / 10;
      console.log(`  ⏱️  Sequential 10x: ${duration}ms total, ${avgDuration.toFixed(0)}ms avg`);
      expect(duration).toBeLessThan(THRESHOLDS.sequentialBatch);
    });

    it("should complete 10 concurrent requests within 5 seconds", async () => {
      const { duration } = await measurePerformance(async () => {
        return await runConcurrent(
          async () => httpClient.get("/api/web/namespaces"),
          10
        );
      });

      console.log(`  ⏱️  Concurrent 10x: ${duration}ms`);
      expect(duration).toBeLessThan(THRESHOLDS.concurrentBatch);
    });

    it("should measure response time statistics over multiple requests", async () => {
      const durations: number[] = [];

      for (let i = 0; i < 20; i++) {
        const { duration } = await measurePerformance(async () => {
          return await httpClient.get("/api/web/namespaces");
        });
        durations.push(duration);
      }

      const stats = calculateStats(durations);
      console.log(`\n  📊 Response Time Statistics (20 samples):`);
      console.log(`     Average: ${stats.average.toFixed(2)}ms`);
      console.log(`     Min: ${stats.min.toFixed(2)}ms`);
      console.log(`     Max: ${stats.max.toFixed(2)}ms`);
      console.log(`     P50: ${stats.p50.toFixed(2)}ms`);
      console.log(`     P95: ${stats.p95.toFixed(2)}ms`);
      console.log(`     P99: ${stats.p99.toFixed(2)}ms\n`);

      // Verify average is within acceptable range
      expect(stats.average).toBeLessThan(THRESHOLDS.simpleGet);

      // Verify P95 is within acceptable range
      expect(stats.p95).toBeLessThan(THRESHOLDS.simpleGet * 1.5);
    });
  });

  describe("Memory Usage Benchmarks", () => {
    it("should not leak memory over 100 requests (< 10MB growth)", async () => {
      // Trigger GC before starting
      triggerGC();
      await new Promise((resolve) => setTimeout(resolve, 100));

      const memBefore = measureMemory();
      console.log(`  💾 Memory before: ${(memBefore.heapUsed / 1024 / 1024).toFixed(2)} MB`);

      // Make 100 requests
      for (let i = 0; i < 100; i++) {
        await httpClient.get("/api/web/namespaces");

        // Brief pause every 10 requests
        if (i % 10 === 0) {
          await new Promise((resolve) => setTimeout(resolve, 10));
        }
      }

      // Trigger GC after requests
      triggerGC();
      await new Promise((resolve) => setTimeout(resolve, 100));

      const memAfter = measureMemory();
      console.log(`  💾 Memory after: ${(memAfter.heapUsed / 1024 / 1024).toFixed(2)} MB`);

      const growth = calculateMemoryGrowth(memBefore, memAfter);
      console.log(`  📈 Memory growth: ${growth.heapUsedGrowthMB.toFixed(2)} MB\n`);

      // Allow some growth, but not excessive
      expect(Math.abs(growth.heapUsedGrowthMB)).toBeLessThan(THRESHOLDS.memoryGrowth);
    });

    it("should maintain stable memory with concurrent requests", async () => {
      triggerGC();
      await new Promise((resolve) => setTimeout(resolve, 100));

      const memBefore = measureMemory();

      // Run 5 batches of 10 concurrent requests
      for (let batch = 0; batch < 5; batch++) {
        await runConcurrent(
          async () => httpClient.get("/api/web/namespaces"),
          10
        );

        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      triggerGC();
      await new Promise((resolve) => setTimeout(resolve, 100));

      const memAfter = measureMemory();
      const growth = calculateMemoryGrowth(memBefore, memAfter);

      console.log(`  📈 Concurrent memory growth: ${growth.heapUsedGrowthMB.toFixed(2)} MB`);

      expect(Math.abs(growth.heapUsedGrowthMB)).toBeLessThan(THRESHOLDS.memoryGrowth);
    });
  });

  describe("Concurrency Benchmarks", () => {
    it("should handle 5 concurrent requests efficiently", async () => {
      const { duration } = await measurePerformance(async () => {
        return await runConcurrent(
          async () => httpClient.get("/api/web/namespaces"),
          5
        );
      });

      console.log(`  ⚡ 5 concurrent: ${duration}ms`);

      // Should be faster than sequential
      expect(duration).toBeLessThan(THRESHOLDS.simpleGet * 3);
    });

    it("should handle 20 concurrent requests", async () => {
      const { duration } = await measurePerformance(async () => {
        return await runConcurrent(
          async () => httpClient.get("/api/web/namespaces"),
          20
        );
      });

      console.log(`  ⚡ 20 concurrent: ${duration}ms`);

      // Allow more time for larger batch, but still efficient
      expect(duration).toBeLessThan(THRESHOLDS.concurrentBatch * 2);
    });

    it("should scale linearly with moderate concurrency", async () => {
      const durations: number[] = [];
      const concurrencyLevels = [1, 2, 5, 10];

      for (const level of concurrencyLevels) {
        const { duration } = await measurePerformance(async () => {
          return await runConcurrent(
            async () => httpClient.get("/api/web/namespaces"),
            level
          );
        });
        durations.push(duration);

        console.log(`  📊 Concurrency ${level}: ${duration}ms`);
      }

      // Verify scaling is sub-linear (efficient concurrency)
      const ratio_2_to_1 = durations[1] / durations[0];
      const ratio_10_to_5 = durations[3] / durations[2];

      console.log(`  📈 Scaling ratios: 2:1=${ratio_2_to_1.toFixed(2)}x, 10:5=${ratio_10_to_5.toFixed(2)}x\n`);

      // Ratios should be less than linear (< 2x and < 2x respectively)
      expect(ratio_2_to_1).toBeLessThan(2);
      expect(ratio_10_to_5).toBeLessThan(2);
    });
  });

  describe("Tool Discovery Performance", () => {
    it("should load tool registry quickly (< 100ms)", async () => {
      const { duration } = await measurePerformance(async () => {
        const fs = await import("fs");
        const path = await import("path");

        const generatedDir = path.join(process.cwd(), "src", "tools", "generated");
        const files = fs.readdirSync(generatedDir).filter((f: string) => f.endsWith(".json"));

        const tools = [];
        for (const file of files) {
          const filePath = path.join(generatedDir, file);
          const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
          if (data.tools) {
            tools.push(...data.tools);
          }
        }

        return tools;
      });

      console.log(`  🔍 Tool registry load: ${duration}ms`);
      expect(duration).toBeLessThan(THRESHOLDS.toolDiscovery);
    });

    it("should search tools efficiently", async () => {
      const fs = await import("fs");
      const path = await import("path");

      // Load tools once
      const generatedDir = path.join(process.cwd(), "src", "tools", "generated");
      const files = fs.readdirSync(generatedDir).filter((f: string) => f.endsWith(".json"));

      const tools = [];
      for (const file of files) {
        const filePath = path.join(generatedDir, file);
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        if (data.tools) {
          tools.push(...data.tools);
        }
      }

      // Measure search performance
      const { duration } = await measurePerformance(async () => {
        const searchTerm = "loadbalancer";
        return tools.filter((tool: any) =>
          tool.name.toLowerCase().includes(searchTerm) ||
          tool.description.toLowerCase().includes(searchTerm)
        );
      });

      console.log(`  🔍 Tool search: ${duration}ms`);
      expect(duration).toBeLessThan(10); // Should be very fast (< 10ms)
    });
  });

  describe("Large Payload Performance", () => {
    it("should handle large list responses efficiently", async () => {
      const { duration } = await measurePerformance(async () => {
        return await httpClient.get("/api/web/namespaces");
      });

      console.log(`  📦 Large list response: ${duration}ms`);

      // Should still be within threshold
      expect(duration).toBeLessThan(THRESHOLDS.simpleGet);
    });

    it("should handle multiple large responses concurrently", async () => {
      const { duration } = await measurePerformance(async () => {
        return await runConcurrent(
          async () => httpClient.get("/api/web/namespaces"),
          5
        );
      });

      console.log(`  📦 5 concurrent large responses: ${duration}ms`);
      expect(duration).toBeLessThan(THRESHOLDS.concurrentBatch);
    });
  });

  describe("Error Path Performance", () => {
    it("should fail fast on 404 errors", async () => {
      const { duration } = await measurePerformance(async () => {
        try {
          await httpClient.get("/api/config/namespaces/system/http_loadbalancers/nonexistent-12345");
        } catch (error) {
          // Expected 404
        }
      });

      console.log(`  ⚡ 404 error response: ${duration}ms`);

      // 404 should be fast
      expect(duration).toBeLessThan(THRESHOLDS.simpleGet);
    });

    it("should handle authentication errors quickly", async () => {
      const invalidClient = axios.create({
        baseURL: httpClient.defaults.baseURL as string,
        headers: {
          Authorization: "APIToken invalid-token",
        },
        timeout: 5000,
      });

      const { duration } = await measurePerformance(async () => {
        try {
          await invalidClient.get("/api/web/namespaces");
        } catch (error) {
          // Expected 401
        }
      });

      console.log(`  ⚡ 401 error response: ${duration}ms`);

      // Auth errors should be fast
      expect(duration).toBeLessThan(THRESHOLDS.simpleGet);
    });
  });
});
