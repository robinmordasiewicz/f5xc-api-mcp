// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Quota Service
 *
 * Centralized service for checking quota availability before resource creation.
 * Provides caching, threshold calculation, and quota validation.
 */

import type { HttpClient } from "@robinmordasiewicz/f5xc-auth";
import type { QuotaCheckResult, QuotaStatus, QuotaInfo, CachedQuotaEntry } from "../types/quota.js";
import { fetchQuotaUsage, parseQuotaUsage } from "./quota-api-client.js";
import { getQuotaResourceType } from "./quota-resource-mapping.js";
import { getThresholdLevel, getQuotaThresholds } from "./quota-thresholds.js";
import { logger } from "../utils/logging.js";

/**
 * Default cache TTL (5 minutes)
 */
const DEFAULT_CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Quota Service - Singleton pattern for caching
 */
export class QuotaService {
  private cache: Map<string, CachedQuotaEntry> = new Map();
  private cacheTTL: number;

  constructor() {
    // Get cache TTL from environment or use default
    this.cacheTTL =
      parseInt(process.env.F5XC_QUOTA_CACHE_TTL || String(DEFAULT_CACHE_TTL / 1000), 10) * 1000;
  }

  /**
   * Check if quota is available for creating a resource
   *
   * @param namespace - Namespace to check quota in
   * @param resourceType - MCP resource type (e.g., "http-loadbalancer")
   * @param httpClient - Authenticated HTTP client
   * @returns Quota check result with allowed/blocked decision
   */
  async checkQuotaAvailability(
    namespace: string,
    resourceType: string,
    httpClient: HttpClient
  ): Promise<QuotaCheckResult> {
    try {
      // Get quota status (from cache or API)
      const status = await this.getQuotaStatus(namespace, resourceType, httpClient);

      // Determine if creation is allowed based on threshold
      const allowed = status.limits.threshold !== "red";
      const reason = allowed
        ? undefined
        : `Resource quota limit reached. Cannot create additional ${resourceType} resources.`;

      return {
        allowed,
        reason,
        quotaInfo: status.limits,
      };
    } catch (error) {
      // If quota check fails, log error but don't block operation
      logger.error(`Quota check failed for ${resourceType} in ${namespace}`, {
        error: error instanceof Error ? error.message : String(error),
      });

      // Return allowed=true to not block operations when quota API is unavailable
      return {
        allowed: true,
        reason: "Quota check failed - proceeding without quota validation",
        quotaInfo: {
          limit: Infinity,
          current: 0,
          remaining: Infinity,
          percentage: 0,
          threshold: "green",
        },
      };
    }
  }

  /**
   * Get current quota status for a resource type
   *
   * @param namespace - Namespace to check quota in
   * @param resourceType - MCP resource type
   * @param httpClient - Authenticated HTTP client
   * @returns Current quota status
   */
  async getQuotaStatus(
    namespace: string,
    resourceType: string,
    httpClient: HttpClient
  ): Promise<QuotaStatus> {
    // Check cache first
    const cacheKey = this.getCacheKey(namespace, resourceType);
    const cached = this.getFromCache(cacheKey);

    if (cached) {
      logger.debug(`Quota cache hit for ${resourceType} in ${namespace}`);
      return cached;
    }

    logger.debug(`Quota cache miss for ${resourceType} in ${namespace} - fetching from API`);

    // Fetch from API
    const quotaUsage = await fetchQuotaUsage(namespace, httpClient);
    const usageData = parseQuotaUsage(quotaUsage);

    // Convert MCP resource type to F5XC quota resource type
    const f5xcResourceType = getQuotaResourceType(resourceType);

    // Find usage for this specific resource type
    const resourceUsage = usageData.find((u) => u.resourceType === f5xcResourceType);

    if (!resourceUsage) {
      // Resource type not found in quota data - may be unlimited or not tracked
      logger.warn(
        `Resource type ${f5xcResourceType} not found in quota data for namespace ${namespace}`
      );

      const status: QuotaStatus = {
        resourceType,
        namespace,
        limits: {
          limit: Infinity,
          current: 0,
          remaining: Infinity,
          percentage: 0,
          threshold: "green",
        },
      };

      // Cache the result
      this.addToCache(cacheKey, status);
      return status;
    }

    // Calculate quota info
    const quotaInfo = this.calculateQuotaInfo(resourceUsage.current, resourceUsage.limit);

    const status: QuotaStatus = {
      resourceType,
      namespace,
      limits: quotaInfo,
    };

    // Cache the result
    this.addToCache(cacheKey, status);

    return status;
  }

  /**
   * Get all quota statuses for a namespace
   *
   * @param namespace - Namespace to check
   * @param httpClient - Authenticated HTTP client
   * @returns Array of quota statuses for all resources
   */
  async getAllNamespaceQuotas(namespace: string, httpClient: HttpClient): Promise<QuotaStatus[]> {
    const quotaUsage = await fetchQuotaUsage(namespace, httpClient);
    const usageData = parseQuotaUsage(quotaUsage);

    return usageData.map((resourceUsage) => {
      const quotaInfo = this.calculateQuotaInfo(resourceUsage.current, resourceUsage.limit);

      return {
        resourceType: resourceUsage.resourceType,
        namespace,
        limits: quotaInfo,
      };
    });
  }

  /**
   * Calculate quota information from current usage and limit
   */
  private calculateQuotaInfo(current: number, limit: number): QuotaInfo {
    const remaining = Math.max(0, limit - current);
    const percentage = limit > 0 ? Math.round((current / limit) * 100) : 0;
    const threshold = getThresholdLevel(percentage, getQuotaThresholds());

    return {
      limit,
      current,
      remaining,
      percentage,
      threshold,
    };
  }

  /**
   * Generate cache key for namespace + resource type
   */
  private getCacheKey(namespace: string, resourceType: string): string {
    return `${namespace}:${resourceType}:quota`;
  }

  /**
   * Get entry from cache if valid
   */
  private getFromCache(key: string): QuotaStatus | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    // Check if cache entry has expired
    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  /**
   * Add entry to cache
   */
  private addToCache(key: string, data: QuotaStatus): void {
    const entry: CachedQuotaEntry = {
      data,
      timestamp: Date.now(),
      ttl: this.cacheTTL,
    };

    this.cache.set(key, entry);
  }

  /**
   * Clear cache for a specific namespace
   */
  clearNamespaceCache(namespace: string): void {
    const keys = Array.from(this.cache.keys()).filter((key) => key.startsWith(`${namespace}:`));
    for (const key of keys) {
      this.cache.delete(key);
    }
    logger.debug(`Cleared quota cache for namespace: ${namespace}`);
  }

  /**
   * Clear all quota cache entries
   */
  clearCache(): void {
    this.cache.clear();
    logger.debug("Cleared all quota cache entries");
  }
}

// Export singleton instance
export const quotaService = new QuotaService();
