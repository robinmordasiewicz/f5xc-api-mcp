/**
 * Rate Limiter Utility
 *
 * Token bucket algorithm to guarantee API rate limit compliance.
 * Prevents 429 rate limit errors during comprehensive testing.
 */

export interface RateLimiterConfig {
  requestsPerMinute: number;
  maxRetries: number;
  retryDelay: number;
}

export class RateLimiter {
  private requestTimestamps: number[] = [];
  private config: RateLimiterConfig;

  constructor(config: RateLimiterConfig) {
    this.config = config;
  }

  /**
   * Schedule a function to execute with rate limiting
   */
  async schedule<T>(fn: () => Promise<T>): Promise<T> {
    // Wait for available slot
    await this.waitForSlot();

    // Track request
    this.requestTimestamps.push(Date.now());
    this.cleanupOldTimestamps();

    // Execute with retry
    return await this.executeWithRetry(fn);
  }

  /**
   * Wait until a request slot is available
   */
  private async waitForSlot(): Promise<void> {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;

    // Count recent requests (within last minute)
    const recentRequests = this.requestTimestamps.filter(
      (ts) => ts > oneMinuteAgo
    );

    if (recentRequests.length >= this.config.requestsPerMinute) {
      // Calculate wait time
      const oldestRequest = Math.min(...recentRequests);
      const waitTime = 60000 - (now - oldestRequest) + 100; // +100ms buffer

      console.log(
        `⏳ Rate limit: ${recentRequests.length}/${this.config.requestsPerMinute} requests in last minute, waiting ${Math.round(waitTime / 1000)}s...`
      );
      await this.sleep(waitTime);
    }
  }

  /**
   * Execute function with exponential backoff retry
   */
  private async executeWithRetry<T>(fn: () => Promise<T>): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.config.maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;

        // Check if retryable
        const statusCode = (error as any).statusCode || (error as any).response?.status;

        // Don't retry client errors (4xx except 429)
        if (statusCode >= 400 && statusCode < 500 && statusCode !== 429) {
          throw error;
        }

        // Exponential backoff for server errors (5xx) and rate limits (429)
        if (attempt < this.config.maxRetries) {
          const backoffTime = this.config.retryDelay * Math.pow(2, attempt - 1);
          console.log(
            `🔄 Retry ${attempt}/${this.config.maxRetries} after ${backoffTime}ms (error: ${statusCode || 'unknown'})`
          );
          await this.sleep(backoffTime);
        }
      }
    }

    throw lastError!;
  }

  /**
   * Clean up timestamps older than 1 hour
   */
  private cleanupOldTimestamps(): void {
    const cutoff = Date.now() - 3600000; // 1 hour
    this.requestTimestamps = this.requestTimestamps.filter((ts) => ts > cutoff);
  }

  /**
   * Sleep for specified milliseconds
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Get current request statistics
   */
  getStats(): {
    recentRequests: number;
    totalRequests: number;
    remainingCapacity: number;
  } {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    const recentRequests = this.requestTimestamps.filter(
      (ts) => ts > oneMinuteAgo
    ).length;

    return {
      recentRequests,
      totalRequests: this.requestTimestamps.length,
      remainingCapacity: this.config.requestsPerMinute - recentRequests,
    };
  }

  /**
   * Reset rate limiter state
   */
  reset(): void {
    this.requestTimestamps = [];
  }
}
