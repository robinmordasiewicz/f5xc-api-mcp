// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * URL Normalization Utilities for F5 Distributed Cloud
 *
 * Handles various URL formats users might enter and normalizes them
 * to a consistent format that works with the F5XC API.
 */

import { logger } from "./logging.js";

/**
 * Strip /api prefix from paths to prevent /api/api duplication
 * when used with HTTP client that has /api in baseURL.
 *
 * The F5XC API client sets baseURL to include /api, so paths
 * from resource templates that include /api need to be normalized.
 *
 * @param path - API path that may contain /api prefix
 * @returns Path with /api prefix removed if present
 *
 * @example
 * normalizePath('/api/config/namespaces/default') // '/config/namespaces/default'
 * normalizePath('/config/namespaces/default') // '/config/namespaces/default'
 */
export function normalizePath(path: string): string {
  if (path.startsWith("/api/")) {
    return path.slice(4); // Remove '/api', keep the leading '/'
  }
  return path;
}

/**
 * Normalize F5XC tenant URL to consistent format.
 *
 * Handles various input formats:
 * - Protocol-less URLs: tenant.console.ves.volterra.io
 * - URLs with /api suffix: https://tenant.console.ves.volterra.io/api
 * - Trailing slashes: https://tenant.console.ves.volterra.io/
 * - Various domain patterns (staging, production, console)
 *
 * @param input - User-provided URL in any supported format
 * @returns Normalized URL without /api suffix (httpClient adds it)
 *
 * @example
 * normalizeF5XCUrl('tenant.console.ves.volterra.io')
 * // 'https://tenant.console.ves.volterra.io'
 *
 * normalizeF5XCUrl('https://tenant.console.ves.volterra.io/api')
 * // 'https://tenant.console.ves.volterra.io'
 *
 * normalizeF5XCUrl('tenant.staging.volterra.us/api/')
 * // 'https://tenant.staging.volterra.us'
 */
export function normalizeF5XCUrl(input: string): string {
  let url = input.trim();

  // Handle empty string
  if (!url) {
    return "";
  }

  // Add https:// protocol if missing
  if (!url.match(/^https?:\/\//i)) {
    url = `https://${url}`;
  }

  // Remove trailing slashes
  url = url.replace(/\/+$/, "");

  // Remove /api suffix (case-insensitive) - httpClient will add it
  url = url.replace(/\/api$/i, "");

  // Validate it's a proper URL
  try {
    const parsed = new URL(url);
    // Reconstruct to ensure consistency
    return `${parsed.protocol}//${parsed.hostname}${parsed.port ? `:${parsed.port}` : ""}`;
  } catch {
    // If URL parsing fails, return the cleaned input
    logger.warn(`Could not parse URL: ${input}, returning cleaned input`);
    return url;
  }
}

/**
 * Extract tenant name from F5XC URL
 *
 * @param url - Normalized or raw F5XC URL
 * @returns Tenant name or null if not extractable
 */
export function extractTenantFromUrl(url: string): string | null {
  try {
    const normalized = normalizeF5XCUrl(url);
    const parsed = new URL(normalized);
    const hostname = parsed.hostname.toLowerCase();

    // Match first subdomain as tenant
    const match = hostname.match(/^([^.]+)\./);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

/**
 * Result of URL verification
 */
export interface UrlVerificationResult {
  /** Whether the URL is valid and accessible */
  valid: boolean;
  /** Normalized URL */
  normalizedUrl: string;
  /** Extracted tenant name */
  tenant: string | null;
  /** Error message if invalid */
  error?: string;
  /** Suggestions for fixing the URL */
  suggestions?: string[];
}

/**
 * Verify F5XC API endpoint is accessible.
 *
 * Tests the URL by making a request to the /api endpoint.
 * - 401/403 response = URL is valid (needs authentication)
 * - 2xx response = URL is valid (unexpected but ok)
 * - Network error = URL is invalid or unreachable
 *
 * @param url - URL to verify (will be normalized)
 * @param options - Verification options
 * @returns Verification result with status and suggestions
 */
export async function verifyF5XCEndpoint(
  url: string,
  options: { timeoutMs?: number; skipVerification?: boolean } = {}
): Promise<UrlVerificationResult> {
  const { timeoutMs = 10000, skipVerification = false } = options;

  const normalizedUrl = normalizeF5XCUrl(url);
  const tenant = extractTenantFromUrl(normalizedUrl);

  // If verification is skipped, just return the normalized URL
  if (skipVerification) {
    return {
      valid: true,
      normalizedUrl,
      tenant,
    };
  }

  const apiUrl = `${normalizedUrl}/api`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    // 401/403 = URL is valid, just needs authentication
    if (response.status === 401 || response.status === 403) {
      return {
        valid: true,
        normalizedUrl,
        tenant,
      };
    }

    // 404 = Wrong URL format or path
    if (response.status === 404) {
      return {
        valid: false,
        normalizedUrl,
        tenant,
        error: "API endpoint not found (404). Verify the tenant URL format.",
        suggestions: tenant
          ? [
              `Try: https://${tenant}.console.ves.volterra.io`,
              `Try: https://${tenant}.staging.volterra.us`,
            ]
          : ["Verify the tenant name is correct"],
      };
    }

    // Other successful responses - URL is valid
    if (response.ok) {
      return {
        valid: true,
        normalizedUrl,
        tenant,
      };
    }

    // Other error responses
    return {
      valid: false,
      normalizedUrl,
      tenant,
      error: `Unexpected response: HTTP ${response.status}`,
      suggestions: ["Verify the tenant URL and check F5XC console status"],
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    // Handle abort/timeout
    if (errorMessage.includes("abort") || errorMessage.includes("timeout")) {
      return {
        valid: false,
        normalizedUrl,
        tenant,
        error: `Connection timed out after ${timeoutMs}ms`,
        suggestions: [
          "Check network connectivity",
          "Verify the F5XC console is accessible",
          "Try increasing timeout if on slow network",
        ],
      };
    }

    // Handle SSL/TLS errors
    if (
      errorMessage.includes("certificate") ||
      errorMessage.includes("SSL") ||
      errorMessage.includes("TLS")
    ) {
      return {
        valid: false,
        normalizedUrl,
        tenant,
        error: `SSL/TLS error: ${errorMessage}`,
        suggestions: [
          "For staging environments, you may need to configure TLS settings",
          "Verify the tenant URL is correct",
        ],
      };
    }

    // Handle DNS/network errors
    if (
      errorMessage.includes("ENOTFOUND") ||
      errorMessage.includes("getaddrinfo") ||
      errorMessage.includes("resolve")
    ) {
      return {
        valid: false,
        normalizedUrl,
        tenant,
        error: `Could not resolve hostname: ${errorMessage}`,
        suggestions: tenant
          ? [
              `Verify tenant name "${tenant}" is correct`,
              `Try: https://${tenant}.console.ves.volterra.io`,
              "Check DNS resolution and network connectivity",
            ]
          : ["Verify the hostname is correct", "Check DNS resolution"],
      };
    }

    // Generic connection error
    return {
      valid: false,
      normalizedUrl,
      tenant,
      error: `Connection failed: ${errorMessage}`,
      suggestions: [
        "Verify the tenant URL is correct",
        "Check network connectivity",
        "Ensure the F5XC console is accessible",
      ],
    };
  }
}

/**
 * Verify URL with retry using different URL patterns.
 *
 * If the initial URL fails, tries common F5XC URL patterns
 * based on the extracted tenant name.
 *
 * @param input - User-provided URL or tenant name
 * @param options - Verification options
 * @returns Best verification result from tried patterns
 */
export async function verifyWithRetry(
  input: string,
  options: { timeoutMs?: number } = {}
): Promise<UrlVerificationResult> {
  // Try the original input first
  let result = await verifyF5XCEndpoint(input, options);
  if (result.valid) return result;

  // If input looks like just a tenant name (no dots), try common patterns
  if (!input.includes(".")) {
    const patterns = [
      `${input}.console.ves.volterra.io`,
      `${input}.staging.volterra.us`,
      `${input}.volterra.us`,
    ];

    for (const pattern of patterns) {
      result = await verifyF5XCEndpoint(pattern, options);
      if (result.valid) {
        logger.info(`URL verified using pattern: ${pattern}`);
        return result;
      }
    }
  }

  // Return the last result with accumulated suggestions
  return result;
}
