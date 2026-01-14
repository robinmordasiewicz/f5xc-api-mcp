// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * HTTP Response Caching Utility
 *
 * Implements LRU (Least Recently Used) cache for HTTP responses.
 * Reduces network bandwidth and latency for repeated API calls.
 *
 * Features:
 * - LRU eviction strategy with configurable max size
 * - Configurable TTL (time to live) per entry
 * - Cache-Control header support
 * - ETag support for conditional requests
 * - Cache hit/miss metrics
 * - Memory-bounded with automatic cleanup
 */

/**
 * Cache entry structure
 */
interface CacheEntry<T = unknown> {
  /** Cached response data */
  data: T;
  /** HTTP status code */
  status: number;
  /** Cache timestamp */
  timestamp: number;
  /** Time to live in milliseconds */
  ttl: number;
  /** ETag header value if available */
  etag?: string;
  /** Last access timestamp for LRU */
  lastAccess: number;
}

/**
 * Cache configuration options
 */
export interface HttpCacheConfig {
  /** Maximum number of cached entries (default: 100) */
  maxSize: number;
  /** Default TTL in milliseconds (default: 5 minutes) */
  defaultTtl: number;
  /** Whether to respect Cache-Control headers (default: true) */
  respectCacheControl: boolean;
  /** Whether to use ETag for conditional requests (default: true) */
  useEtag: boolean;
}

/**
 * Cache statistics for monitoring
 */
export interface CacheStats {
  /** Total cache hits */
  hits: number;
  /** Total cache misses */
  misses: number;
  /** Current cache size */
  size: number;
  /** Maximum cache size */
  maxSize: number;
  /** Cache hit rate percentage */
  hitRate: number;
  /** Number of evictions due to size limit */
  evictions: number;
  /** Number of entries expired due to TTL */
  expirations: number;
}

/**
 * HTTP Response Cache with LRU eviction
 *
 * Implements a memory-bounded cache for HTTP responses using LRU
 * (Least Recently Used) eviction strategy.
 *
 * @example
 * ```typescript
 * const cache = new HttpCache({
 *   maxSize: 100,
 *   defaultTtl: 5 * 60 * 1000, // 5 minutes
 * });
 *
 * // Store response
 * cache.set('/api/resource', {
 *   data: { id: 1, name: 'example' },
 *   status: 200,
 * });
 *
 * // Retrieve response
 * const cached = cache.get('/api/resource');
 * if (cached) {
 *   console.log('Cache hit:', cached.data);
 * }
 * ```
 */
export class HttpCache {
  private cache = new Map<string, CacheEntry>();
  private config: HttpCacheConfig;
  private stats = {
    hits: 0,
    misses: 0,
    evictions: 0,
    expirations: 0,
  };

  constructor(config: Partial<HttpCacheConfig> = {}) {
    this.config = {
      maxSize: config.maxSize ?? 100,
      defaultTtl: config.defaultTtl ?? 5 * 60 * 1000, // 5 minutes
      respectCacheControl: config.respectCacheControl ?? true,
      useEtag: config.useEtag ?? true,
    };
  }

  /**
   * Generate cache key from URL and method
   */
  private getCacheKey(url: string, method: string = "GET"): string {
    return `${method.toUpperCase()}:${url}`;
  }

  /**
   * Check if entry is expired
   */
  private isExpired(entry: CacheEntry): boolean {
    const age = Date.now() - entry.timestamp;
    return age > entry.ttl;
  }

  /**
   * Update access time for LRU
   */
  private touch(entry: CacheEntry): void {
    entry.lastAccess = Date.now();
  }

  /**
   * Evict least recently used entry
   */
  private evictLRU(): void {
    let oldestKey: string | null = null;
    let oldestTime = Number.MAX_SAFE_INTEGER;

    for (const [key, entry] of this.cache.entries()) {
      if (entry.lastAccess < oldestTime) {
        oldestTime = entry.lastAccess;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
      this.stats.evictions++;
    }
  }

  /**
   * Parse Cache-Control header to determine TTL
   */
  private parseCacheControl(cacheControl: string | undefined): number | null {
    if (!cacheControl || !this.config.respectCacheControl) {
      return null;
    }

    const maxAgeMatch = cacheControl.match(/max-age=(\d+)/);
    if (maxAgeMatch) {
      return parseInt(maxAgeMatch[1]!, 10) * 1000; // Convert to milliseconds
    }

    // Check for no-cache or no-store directives
    if (cacheControl.includes("no-cache") || cacheControl.includes("no-store")) {
      return 0; // Don't cache
    }

    return null;
  }

  /**
   * Get cached response if available and not expired
   *
   * @param url - Request URL
   * @param method - HTTP method (default: GET)
   * @returns Cached response or null if not found or expired
   */
  get<T = unknown>(url: string, method: string = "GET"): CacheEntry<T> | null {
    const key = this.getCacheKey(url, method);
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;

    if (!entry) {
      this.stats.misses++;
      return null;
    }

    // Check if expired
    if (this.isExpired(entry)) {
      this.cache.delete(key);
      this.stats.expirations++;
      this.stats.misses++;
      return null;
    }

    // Update access time for LRU
    this.touch(entry);
    this.stats.hits++;
    return entry;
  }

  /**
   * Store response in cache
   *
   * @param url - Request URL
   * @param response - Response data and status
   * @param method - HTTP method (default: GET)
   * @param headers - Response headers for Cache-Control/ETag
   */
  set<T = unknown>(
    url: string,
    response: { data: T; status: number },
    method: string = "GET",
    headers?: Record<string, string>
  ): void {
    // Don't cache non-GET requests by default (unless explicitly configured)
    if (method.toUpperCase() !== "GET" && !headers?.["cache-control"]) {
      return;
    }

    // Respect Cache-Control header
    const cacheControl = headers?.["cache-control"];
    const ttlFromHeader = this.parseCacheControl(cacheControl);

    // Don't cache if Cache-Control says so
    if (ttlFromHeader === 0) {
      return;
    }

    const ttl = ttlFromHeader ?? this.config.defaultTtl;
    const key = this.getCacheKey(url, method);

    // Evict LRU entry if at capacity
    if (this.cache.size >= this.config.maxSize && !this.cache.has(key)) {
      this.evictLRU();
    }

    const entry: CacheEntry<T> = {
      data: response.data,
      status: response.status,
      timestamp: Date.now(),
      ttl,
      etag: headers?.["etag"],
      lastAccess: Date.now(),
    };

    this.cache.set(key, entry as CacheEntry);
  }

  /**
   * Check if entry exists in cache and is valid
   *
   * @param url - Request URL
   * @param method - HTTP method (default: GET)
   * @returns True if cached and not expired
   */
  has(url: string, method: string = "GET"): boolean {
    const entry = this.get(url, method);
    return entry !== null;
  }

  /**
   * Invalidate (remove) cached entry
   *
   * @param url - Request URL
   * @param method - HTTP method (default: GET)
   */
  invalidate(url: string, method: string = "GET"): void {
    const key = this.getCacheKey(url, method);
    this.cache.delete(key);
  }

  /**
   * Clear all cached entries
   */
  clear(): void {
    this.cache.clear();
    this.stats = {
      hits: 0,
      misses: 0,
      evictions: 0,
      expirations: 0,
    };
  }

  /**
   * Get cache statistics
   *
   * @returns Current cache statistics
   */
  getStats(): CacheStats {
    const totalRequests = this.stats.hits + this.stats.misses;
    const hitRate = totalRequests > 0 ? (this.stats.hits / totalRequests) * 100 : 0;

    return {
      hits: this.stats.hits,
      misses: this.stats.misses,
      size: this.cache.size,
      maxSize: this.config.maxSize,
      hitRate: Math.round(hitRate * 100) / 100, // Round to 2 decimal places
      evictions: this.stats.evictions,
      expirations: this.stats.expirations,
    };
  }

  /**
   * Get ETag for conditional request
   *
   * @param url - Request URL
   * @param method - HTTP method (default: GET)
   * @returns ETag value if available
   */
  getETag(url: string, method: string = "GET"): string | null {
    const entry = this.get(url, method);
    return entry?.etag ?? null;
  }
}

/**
 * Create HTTP cache from environment variables
 *
 * Reads F5XC_CACHE_* environment variables for configuration.
 *
 * Environment variables:
 * - F5XC_CACHE_MAX_SIZE: Maximum cache entries (default: 100)
 * - F5XC_CACHE_TTL: Default TTL in seconds (default: 300 / 5 minutes)
 *
 * @returns Configured HTTP cache instance
 */
export function createHttpCacheFromEnv(): HttpCache {
  const config: Partial<HttpCacheConfig> = {};

  // Parse max size
  const maxSizeEnv = process.env.F5XC_CACHE_MAX_SIZE;
  if (maxSizeEnv) {
    const maxSize = parseInt(maxSizeEnv, 10);
    if (!isNaN(maxSize) && maxSize > 0) {
      config.maxSize = maxSize;
    }
  }

  // Parse TTL (in seconds)
  const ttlEnv = process.env.F5XC_CACHE_TTL;
  if (ttlEnv) {
    const ttlSeconds = parseInt(ttlEnv, 10);
    if (!isNaN(ttlSeconds) && ttlSeconds > 0) {
      config.defaultTtl = ttlSeconds * 1000; // Convert to milliseconds
    }
  }

  return new HttpCache(config);
}
