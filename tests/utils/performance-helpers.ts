/**
 * Performance Helper Utilities
 *
 * Utilities for measuring performance, memory usage, and profiling test execution.
 */

export interface PerformanceResult<T> {
  result: T;
  duration: number; // milliseconds
  startTime: number;
  endTime: number;
}

export interface MemorySnapshot {
  heapUsed: number;
  heapTotal: number;
  external: number;
  arrayBuffers: number;
  timestamp: number;
}

/**
 * Measure execution time of an async function
 */
export async function measurePerformance<T>(
  fn: () => Promise<T>
): Promise<PerformanceResult<T>> {
  const startTime = Date.now();
  const result = await fn();
  const endTime = Date.now();
  const duration = endTime - startTime;

  return {
    result,
    duration,
    startTime,
    endTime,
  };
}

/**
 * Measure execution time of a synchronous function
 */
export function measurePerformanceSync<T>(fn: () => T): PerformanceResult<T> {
  const startTime = Date.now();
  const result = fn();
  const endTime = Date.now();
  const duration = endTime - startTime;

  return {
    result,
    duration,
    startTime,
    endTime,
  };
}

/**
 * Take a memory snapshot
 */
export function measureMemory(): MemorySnapshot {
  const memUsage = process.memoryUsage();
  return {
    heapUsed: memUsage.heapUsed,
    heapTotal: memUsage.heapTotal,
    external: memUsage.external,
    arrayBuffers: memUsage.arrayBuffers,
    timestamp: Date.now(),
  };
}

/**
 * Calculate memory growth between two snapshots
 */
export function calculateMemoryGrowth(
  before: MemorySnapshot,
  after: MemorySnapshot
): {
  heapUsedGrowth: number;
  heapUsedGrowthMB: number;
  heapTotalGrowth: number;
  duration: number;
} {
  const heapUsedGrowth = after.heapUsed - before.heapUsed;
  const heapTotalGrowth = after.heapTotal - before.heapTotal;
  const duration = after.timestamp - before.timestamp;

  return {
    heapUsedGrowth,
    heapUsedGrowthMB: heapUsedGrowth / (1024 * 1024),
    heapTotalGrowth,
    duration,
  };
}

/**
 * Run a function N times concurrently
 */
export async function runConcurrent<T>(
  fn: () => Promise<T>,
  count: number
): Promise<T[]> {
  const promises = Array.from({ length: count }, () => fn());
  return Promise.all(promises);
}

/**
 * Run a function N times sequentially
 */
export async function runSequential<T>(
  fn: () => Promise<T>,
  count: number
): Promise<T[]> {
  const results: T[] = [];
  for (let i = 0; i < count; i++) {
    results.push(await fn());
  }
  return results;
}

/**
 * Calculate average from array of numbers
 */
export function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, n) => acc + n, 0);
  return sum / numbers.length;
}

/**
 * Calculate percentile from array of numbers
 */
export function calculatePercentile(
  numbers: number[],
  percentile: number
): number {
  if (numbers.length === 0) return 0;
  const sorted = [...numbers].sort((a, b) => a - b);
  const index = Math.ceil((percentile / 100) * sorted.length) - 1;
  return sorted[Math.max(0, index)];
}

/**
 * Calculate standard deviation
 */
export function calculateStdDev(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const avg = calculateAverage(numbers);
  const squareDiffs = numbers.map((n) => Math.pow(n - avg, 2));
  const avgSquareDiff = calculateAverage(squareDiffs);
  return Math.sqrt(avgSquareDiff);
}

/**
 * Performance statistics
 */
export interface PerformanceStats {
  count: number;
  average: number;
  min: number;
  max: number;
  p50: number;
  p90: number;
  p95: number;
  p99: number;
  stdDev: number;
}

/**
 * Calculate comprehensive performance statistics
 */
export function calculateStats(durations: number[]): PerformanceStats {
  if (durations.length === 0) {
    return {
      count: 0,
      average: 0,
      min: 0,
      max: 0,
      p50: 0,
      p90: 0,
      p95: 0,
      p99: 0,
      stdDev: 0,
    };
  }

  return {
    count: durations.length,
    average: calculateAverage(durations),
    min: Math.min(...durations),
    max: Math.max(...durations),
    p50: calculatePercentile(durations, 50),
    p90: calculatePercentile(durations, 90),
    p95: calculatePercentile(durations, 95),
    p99: calculatePercentile(durations, 99),
    stdDev: calculateStdDev(durations),
  };
}

/**
 * Format performance stats for human readability
 */
export function formatStats(stats: PerformanceStats): string {
  return `
Performance Statistics (${stats.count} samples):
  Average: ${stats.average.toFixed(2)}ms
  Min: ${stats.min.toFixed(2)}ms
  Max: ${stats.max.toFixed(2)}ms
  P50: ${stats.p50.toFixed(2)}ms
  P90: ${stats.p90.toFixed(2)}ms
  P95: ${stats.p95.toFixed(2)}ms
  P99: ${stats.p99.toFixed(2)}ms
  Std Dev: ${stats.stdDev.toFixed(2)}ms
  `.trim();
}

/**
 * Format memory growth for human readability
 */
export function formatMemoryGrowth(growth: {
  heapUsedGrowthMB: number;
  duration: number;
}): string {
  const rate = growth.heapUsedGrowthMB / (growth.duration / 1000); // MB per second
  return `Memory growth: ${growth.heapUsedGrowthMB.toFixed(2)} MB over ${(growth.duration / 1000).toFixed(1)}s (${rate.toFixed(2)} MB/s)`;
}

/**
 * Sleep utility for testing
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Trigger garbage collection if available
 */
export function triggerGC(): void {
  if (global.gc) {
    global.gc();
  } else {
    console.warn(
      '⚠️  Garbage collection not exposed. Run with --expose-gc for accurate memory tests.'
    );
  }
}
