// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Quota Threshold Configuration
 *
 * Manages quota threshold levels and calculates usage zones.
 * Thresholds determine when to warn or block resource creation.
 */

import type { QuotaThreshold } from "../types/quota.js";

/**
 * Quota threshold configuration
 */
export interface QuotaThresholdConfig {
  /** Green zone: 0% to this percentage (no warnings) */
  greenThreshold: number;
  /** Yellow zone: above greenThreshold to this percentage (warnings) */
  yellowThreshold: number;
  /** Red zone: above yellowThreshold (blocking) */
  redThreshold: number;
}

/**
 * Default thresholds
 * - Green: 0-79% (no action)
 * - Yellow: 80-99% (warnings)
 * - Red: 100%+ (blocking)
 */
export const DEFAULT_QUOTA_THRESHOLDS: QuotaThresholdConfig = {
  greenThreshold: 79,
  yellowThreshold: 99,
  redThreshold: 100,
};

/**
 * Get threshold configuration from environment or use defaults
 */
export function getQuotaThresholds(): QuotaThresholdConfig {
  return {
    greenThreshold: parseInt(process.env.F5XC_QUOTA_GREEN_THRESHOLD || "79", 10),
    yellowThreshold: parseInt(process.env.F5XC_QUOTA_YELLOW_THRESHOLD || "99", 10),
    redThreshold: parseInt(process.env.F5XC_QUOTA_RED_THRESHOLD || "100", 10),
  };
}

/**
 * Determine threshold level based on quota percentage
 *
 * @param percentage - Quota usage percentage (0-100)
 * @param config - Threshold configuration (defaults to DEFAULT_QUOTA_THRESHOLDS)
 * @returns Threshold level (green, yellow, or red)
 */
export function getThresholdLevel(
  percentage: number,
  config: QuotaThresholdConfig = DEFAULT_QUOTA_THRESHOLDS
): QuotaThreshold {
  if (percentage >= config.redThreshold) {
    return "red";
  }
  if (percentage >= config.yellowThreshold) {
    return "yellow";
  }
  return "green";
}
