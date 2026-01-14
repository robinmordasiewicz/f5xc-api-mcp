// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Rate Limiter using Token Bucket Algorithm
 *
 * Implements client-side rate limiting to prevent API abuse and handle
 * upstream rate limits gracefully with configurable backoff strategies.
 */

export interface RateLimitConfig {
  /** Maximum number of requests per minute */
  requestsPerMinute: number;
  /** Maximum burst size (tokens available at once) */
  burstSize: number;
  /** Retry strategy for rate-limited requests */
  retryStrategy: "exponential" | "linear";
  /** Maximum number of retry attempts */
  maxRetries: number;
  /** Initial retry delay in milliseconds */
  initialRetryDelay: number;
}

export interface RateLimitState {
  /** Available tokens in the bucket */
  tokens: number;
  /** Last token refill timestamp */
  lastRefillTime: number;
  /** Number of requests currently waiting */
  queuedRequests: number;
}

/**
 * Token Bucket Rate Limiter
 *
 * Implements a token bucket algorithm for rate limiting with configurable
 * burst capacity and refill rate. Provides automatic retry with exponential
 * or linear backoff for rate-limited requests.
 */
export class RateLimiter {
  private tokens: number;
  private lastRefillTime: number;
  private readonly config: RateLimitConfig;
  private readonly refillRate: number; // tokens per millisecond
  private queuedRequests = 0;

  constructor(config: Partial<RateLimitConfig> = {}) {
    this.config = {
      requestsPerMinute: config.requestsPerMinute ?? 60,
      burstSize: config.burstSize ?? 10,
      retryStrategy: config.retryStrategy ?? "exponential",
      maxRetries: config.maxRetries ?? 3,
      initialRetryDelay: config.initialRetryDelay ?? 1000,
    };

    // Calculate token refill rate (tokens per millisecond)
    this.refillRate = this.config.requestsPerMinute / (60 * 1000);

    // Initialize with full bucket
    this.tokens = this.config.burstSize;
    this.lastRefillTime = Date.now();
  }

  /**
   * Refill tokens based on elapsed time since last refill
   */
  private refillTokens(): void {
    const now = Date.now();
    const timeSinceLastRefill = now - this.lastRefillTime;
    const tokensToAdd = timeSinceLastRefill * this.refillRate;

    this.tokens = Math.min(this.config.burstSize, this.tokens + tokensToAdd);
    this.lastRefillTime = now;
  }

  /**
   * Try to acquire a token for a request
   * @returns true if token acquired, false if rate limited
   */
  private tryAcquireToken(): boolean {
    this.refillTokens();

    if (this.tokens >= 1) {
      this.tokens -= 1;
      return true;
    }

    return false;
  }

  /**
   * Calculate delay for next retry attempt
   * @param attempt - Current retry attempt number (0-based)
   * @returns Delay in milliseconds
   */
  private calculateRetryDelay(attempt: number): number {
    if (this.config.retryStrategy === "exponential") {
      return this.config.initialRetryDelay * Math.pow(2, attempt);
    } else {
      return this.config.initialRetryDelay * (attempt + 1);
    }
  }

  /**
   * Wait for a token to become available
   * @param attempt - Current retry attempt number
   * @returns Promise that resolves when token is acquired
   * @throws Error if max retries exceeded
   */
  private async waitForToken(attempt = 0): Promise<void> {
    if (attempt >= this.config.maxRetries) {
      throw new Error(
        `Rate limit exceeded: max retries (${this.config.maxRetries}) reached. ` +
          `Current rate: ${this.config.requestsPerMinute} requests/minute`
      );
    }

    const delay = this.calculateRetryDelay(attempt);
    await new Promise((resolve) => setTimeout(resolve, delay));

    if (!this.tryAcquireToken()) {
      return this.waitForToken(attempt + 1);
    }
  }

  /**
   * Execute a function with rate limiting
   *
   * Acquires a token before executing the function. If no tokens are available,
   * waits with backoff strategy until a token becomes available or max retries reached.
   *
   * @param fn - Async function to execute
   * @returns Promise resolving to function result
   * @throws Error if rate limit exceeded or function throws
   */
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    this.queuedRequests++;

    try {
      // Try to acquire token immediately
      if (!this.tryAcquireToken()) {
        // No tokens available, wait with backoff
        await this.waitForToken();
      }

      return await fn();
    } finally {
      this.queuedRequests--;
    }
  }

  /**
   * Get current rate limiter state
   * @returns Current state including available tokens and queue size
   */
  getState(): RateLimitState {
    this.refillTokens();

    return {
      tokens: this.tokens,
      lastRefillTime: this.lastRefillTime,
      queuedRequests: this.queuedRequests,
    };
  }

  /**
   * Get rate limiter configuration
   * @returns Current configuration
   */
  getConfig(): Readonly<RateLimitConfig> {
    return { ...this.config };
  }

  /**
   * Reset rate limiter state (useful for testing)
   */
  reset(): void {
    this.tokens = this.config.burstSize;
    this.lastRefillTime = Date.now();
    this.queuedRequests = 0;
  }

  /**
   * Check if rate limiter would accept a request without executing it
   * @returns true if token is available, false otherwise
   */
  canAccept(): boolean {
    this.refillTokens();
    return this.tokens >= 1;
  }
}

/**
 * Create a rate limiter from environment variables
 *
 * Reads configuration from:
 * - F5XC_RATE_LIMIT_RPM: Requests per minute (default: 60)
 * - F5XC_RATE_LIMIT_BURST: Burst size (default: 10)
 * - F5XC_RATE_LIMIT_STRATEGY: Retry strategy (default: exponential)
 * - F5XC_RATE_LIMIT_MAX_RETRIES: Max retry attempts (default: 3)
 *
 * @returns Configured RateLimiter instance
 */
export function createRateLimiterFromEnv(): RateLimiter {
  const config: Partial<RateLimitConfig> = {};

  if (process.env.F5XC_RATE_LIMIT_RPM) {
    const rpm = parseInt(process.env.F5XC_RATE_LIMIT_RPM, 10);
    if (!isNaN(rpm) && rpm > 0) {
      config.requestsPerMinute = rpm;
    }
  }

  if (process.env.F5XC_RATE_LIMIT_BURST) {
    const burst = parseInt(process.env.F5XC_RATE_LIMIT_BURST, 10);
    if (!isNaN(burst) && burst > 0) {
      config.burstSize = burst;
    }
  }

  if (process.env.F5XC_RATE_LIMIT_STRATEGY) {
    const strategy = process.env.F5XC_RATE_LIMIT_STRATEGY.toLowerCase();
    if (strategy === "exponential" || strategy === "linear") {
      config.retryStrategy = strategy;
    }
  }

  if (process.env.F5XC_RATE_LIMIT_MAX_RETRIES) {
    const maxRetries = parseInt(process.env.F5XC_RATE_LIMIT_MAX_RETRIES, 10);
    if (!isNaN(maxRetries) && maxRetries >= 0) {
      config.maxRetries = maxRetries;
    }
  }

  return new RateLimiter(config);
}
