// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Quota Types Module
 *
 * Centralized type definitions for quota awareness functionality.
 * Provides type safety for quota checking, validation, and reporting.
 */

/**
 * Quota threshold levels
 */
export type QuotaThreshold = "green" | "yellow" | "red";

/**
 * Quota information for a resource type
 */
export interface QuotaInfo {
  /** Maximum allowed resources */
  limit: number;
  /** Currently used resources */
  current: number;
  /** Available capacity */
  remaining: number;
  /** Usage percentage (0-100) */
  percentage: number;
  /** Threshold level based on usage */
  threshold: QuotaThreshold;
  /** When quota resets (if applicable) */
  resetTime?: string;
}

/**
 * Result of quota availability check
 */
export interface QuotaCheckResult {
  /** Whether resource creation is allowed */
  allowed: boolean;
  /** Reason for blocking (if not allowed) */
  reason?: string;
  /** Detailed quota information */
  quotaInfo: QuotaInfo;
}

/**
 * Rate limit information from API headers
 */
export interface RateLimitInfo {
  /** Total rate limit */
  limit: number;
  /** Remaining requests */
  remaining: number;
  /** When rate limit resets (timestamp) */
  reset: number;
}

/**
 * Complete quota status for a resource type
 */
export interface QuotaStatus {
  /** Resource type */
  resourceType: string;
  /** Namespace */
  namespace: string;
  /** Quota limits and usage */
  limits: QuotaInfo;
  /** Subscription tier (if available) */
  subscriptionTier?: string;
  /** API rate limit info (if available) */
  apiRateLimit?: RateLimitInfo;
}

/**
 * Cached quota entry
 */
export interface CachedQuotaEntry {
  /** Cached quota status data */
  data: QuotaStatus;
  /** Timestamp when cached */
  timestamp: number;
  /** Time-to-live in milliseconds */
  ttl: number;
}

/**
 * Quota resource usage from F5XC API
 */
export interface QuotaResourceUsage {
  /** Resource type identifier */
  resourceType: string;
  /** Current usage count */
  current: number;
  /** Maximum limit */
  limit: number;
}

/**
 * F5XC Quota Usage API Response
 * GET /api/web/namespaces/{namespace}/quota/usage
 */
export interface F5XCQuotaUsageResponse {
  /** Quota usage map (capitalized resource names) */
  quota_usage?: Record<
    string,
    {
      /** Limit information */
      limit: {
        /** Maximum allowed */
        maximum: number;
      };
      /** Usage information */
      usage: {
        /** Current count */
        current: number;
      };
      /** Display name */
      display_name?: string;
      /** Description */
      description?: string;
    }
  >;
  /** Objects map (lowercase resource names) */
  objects?: Record<
    string,
    {
      /** Limit information */
      limit: {
        /** Maximum allowed */
        maximum: number;
      };
      /** Usage information */
      usage: {
        /** Current count */
        current: number;
      };
      /** API limit */
      api_limit?: number | null;
      /** Display name */
      display_name?: string;
      /** Description */
      description?: string;
    }
  >;
  /** Float quota usage */
  float_quota_usage?: Record<
    string,
    {
      /** Usage count (can be decimal) */
      usage: number;
    }
  >;
  /** Resources (dynamic structure) */
  resources?: Record<string, unknown>;
  /** Alternative structure: array of resource usage */
  usage?: QuotaResourceUsage[];
}

/**
 * F5XC Quota Limits API Response
 * GET /api/web/namespaces/{namespace}/quota/limits
 */
export interface F5XCQuotaLimitsResponse {
  /** Map of resource types to limits */
  limits?: Record<string, number>;
}
