// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Quota API Client
 *
 * Handles communication with F5XC Quota APIs.
 * Provides methods to fetch quota usage and limits from the F5XC platform.
 */

import type { HttpClient } from "@robinmordasiewicz/f5xc-auth";
import type {
  F5XCQuotaUsageResponse,
  F5XCQuotaLimitsResponse,
  QuotaResourceUsage,
} from "../types/quota.js";
import { logger } from "../utils/logging.js";

/**
 * Fetch quota usage from F5XC API
 *
 * @param namespace - Namespace to check quota for
 * @param httpClient - Authenticated HTTP client
 * @returns Quota usage response
 */
export async function fetchQuotaUsage(
  namespace: string,
  httpClient: HttpClient
): Promise<F5XCQuotaUsageResponse> {
  try {
    logger.debug(`Fetching quota usage for namespace: ${namespace}`);

    // Normalize path - remove /api prefix since baseURL includes it
    const path = `/web/namespaces/${namespace}/quota/usage`;

    const response = await httpClient.get<F5XCQuotaUsageResponse>(path);

    logger.debug(`Quota usage fetched successfully for namespace: ${namespace}`, {
      statusCode: response.status,
    });

    return response.data;
  } catch (error) {
    logger.error(`Failed to fetch quota usage for namespace: ${namespace}`, {
      error: error instanceof Error ? error.message : String(error),
    });
    throw new Error(
      `Failed to fetch quota usage: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * Fetch quota limits from F5XC API
 *
 * @param namespace - Namespace to check quota limits for
 * @param httpClient - Authenticated HTTP client
 * @returns Quota limits response
 */
export async function fetchQuotaLimits(
  namespace: string,
  httpClient: HttpClient
): Promise<F5XCQuotaLimitsResponse> {
  try {
    logger.debug(`Fetching quota limits for namespace: ${namespace}`);

    // Normalize path - remove /api prefix since baseURL includes it
    const path = `/web/namespaces/${namespace}/quota/limits`;

    const response = await httpClient.get<F5XCQuotaLimitsResponse>(path);

    logger.debug(`Quota limits fetched successfully for namespace: ${namespace}`, {
      statusCode: response.status,
    });

    return response.data;
  } catch (error) {
    logger.error(`Failed to fetch quota limits for namespace: ${namespace}`, {
      error: error instanceof Error ? error.message : String(error),
    });
    throw new Error(
      `Failed to fetch quota limits: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * Parse quota usage response to extract resource usage
 *
 * @param response - F5XC quota usage API response
 * @returns Array of resource usage information
 */
export function parseQuotaUsage(response: F5XCQuotaUsageResponse): QuotaResourceUsage[] {
  const usage: QuotaResourceUsage[] = [];

  // Handle quota_usage map (capitalized resource names)
  if (response.quota_usage) {
    for (const [resourceType, info] of Object.entries(response.quota_usage)) {
      usage.push({
        resourceType,
        current: info.usage?.current ?? 0,
        limit: info.limit?.maximum ?? Infinity,
      });
    }
  }

  // Handle objects map (lowercase resource names) - prioritize this over quota_usage
  if (response.objects) {
    for (const [resourceType, info] of Object.entries(response.objects)) {
      usage.push({
        resourceType,
        current: info.usage?.current ?? 0,
        limit: info.limit?.maximum ?? Infinity,
      });
    }
  }

  // Handle float_quota_usage (resources with decimal usage)
  if (response.float_quota_usage) {
    for (const [resourceType, info] of Object.entries(response.float_quota_usage)) {
      usage.push({
        resourceType,
        current: info.usage ?? 0,
        limit: Infinity, // Float quotas typically don't have limits
      });
    }
  }

  // Handle alternative array structure (fallback)
  if (response.usage) {
    usage.push(...response.usage);
  }

  return usage;
}
