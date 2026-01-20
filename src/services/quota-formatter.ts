// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Quota Message Formatting
 *
 * Provides clear, actionable formatting for quota-related messages,
 * errors, and status displays.
 */

import type { QuotaStatus, QuotaInfo, QuotaCheckResult, QuotaThreshold } from "../types/quota.js";

/**
 * Get status icon for threshold level
 */
function getStatusIcon(threshold: QuotaThreshold): string {
  const icons = {
    green: "✅",
    yellow: "⚠️",
    red: "❌",
  };
  return icons[threshold];
}

/**
 * Get status text for threshold level
 */
function getStatusText(threshold: QuotaThreshold): string {
  const texts = {
    green: "Available capacity",
    yellow: "Approaching limit",
    red: "At limit - cannot create resources",
  };
  return texts[threshold];
}

/**
 * Get recommendation text based on threshold and resource info
 */
function getRecommendation(
  threshold: QuotaThreshold,
  resourceType: string,
  namespace: string
): string {
  if (threshold === "red") {
    return `
Action Required:
1. Delete unused ${resourceType} resources in '${namespace}' namespace
2. Request quota increase from F5 XC support
3. Use a different namespace with available quota
    `.trim();
  }

  if (threshold === "yellow") {
    return `
Recommendation:
Consider reviewing and cleaning up unused ${resourceType} resources
before reaching the quota limit.
    `.trim();
  }

  return "";
}

/**
 * Format quota status for display
 *
 * @param status - Quota status to format
 * @returns Formatted quota status string
 */
export function formatQuotaStatus(status: QuotaStatus): string {
  const { resourceType, namespace, limits } = status;
  const icon = getStatusIcon(limits.threshold);
  const statusText = getStatusText(limits.threshold);

  return `
Quota Status for ${resourceType}

Namespace: ${namespace}
Current Usage: ${limits.current}/${limits.limit} (${limits.percentage}%)
Remaining: ${limits.remaining}
Status: ${icon} ${statusText}

${getRecommendation(limits.threshold, resourceType, namespace)}
  `.trim();
}

/**
 * Format quota error message for blocking
 *
 * @param quotaCheck - Quota check result that failed
 * @returns Formatted error message
 */
export function formatQuotaError(quotaCheck: QuotaCheckResult): string {
  const { quotaInfo } = quotaCheck;

  return `Resource quota limit reached: ${quotaInfo.current}/${quotaInfo.limit} used (${quotaInfo.percentage}%). ${quotaCheck.reason || "Cannot create additional resources."}`;
}

/**
 * Format quota table for multiple resources
 *
 * @param quotas - Array of quota statuses
 * @returns Formatted table string
 */
export function formatQuotaTable(quotas: QuotaStatus[]): string {
  if (quotas.length === 0) {
    return "No quota information available.";
  }

  // Calculate column widths
  const maxResourceLen = Math.max(
    8, // "Resource" header length
    ...quotas.map((q) => q.resourceType.length)
  );

  // Header
  const header = `${"Resource".padEnd(maxResourceLen)} | Limit | Current | Remaining | Usage | Status`;
  const separator = "-".repeat(header.length);

  // Rows
  const rows = quotas.map((q) => {
    const resource = q.resourceType.padEnd(maxResourceLen);
    const limit = String(q.limits.limit).padStart(5);
    const current = String(q.limits.current).padStart(7);
    const remaining = String(q.limits.remaining).padStart(9);
    const usage = `${String(q.limits.percentage)}%`.padStart(5);
    const status = getStatusIcon(q.limits.threshold);

    return `${resource} | ${limit} | ${current} | ${remaining} | ${usage} | ${status}`;
  });

  return [header, separator, ...rows].join("\n");
}

/**
 * Format quota warning message for yellow zone
 *
 * @param quotaInfo - Quota information
 * @param resourceType - Resource type
 * @returns Formatted warning message
 */
export function formatQuotaWarning(quotaInfo: QuotaInfo, resourceType: string): string {
  return `Quota approaching limit: ${quotaInfo.current}/${quotaInfo.limit} used (${quotaInfo.percentage}%) for ${resourceType}`;
}
