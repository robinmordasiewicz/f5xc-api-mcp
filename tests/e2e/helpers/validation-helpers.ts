/**
 * Validation Helpers for E2E Tests
 *
 * Utilities for status polling, resource readiness checking, and operational validation.
 * Supports waiting for resources to become operational and verifying deletion completion.
 */

export interface PollOptions {
  maxAttempts?: number;
  interval?: number; // milliseconds
  timeout?: number; // milliseconds (overrides maxAttempts if set)
}

export interface ValidationResult {
  success: boolean;
  status?: string;
  attempts: number;
  duration: number;
  error?: string;
}

/**
 * Poll resource status until it matches expected state
 *
 * @param httpClient - HTTP client for API calls
 * @param url - API endpoint to poll
 * @param expectedStatus - Expected status value or predicate function
 * @param options - Polling configuration
 * @returns Validation result with success status and metadata
 */
export async function pollResourceStatus(
  httpClient: any,
  url: string,
  expectedStatus: string | ((status: string) => boolean),
  options: PollOptions = {}
): Promise<ValidationResult> {
  const interval = options.interval || 3000; // 3 seconds default
  const maxAttempts = options.maxAttempts || 40; // 2 minutes total with 3s interval
  const timeout = options.timeout;

  const startTime = Date.now();
  const timeoutTime = timeout ? startTime + timeout : null;

  let attempts = 0;
  let lastStatus: string | undefined;
  let lastError: string | undefined;

  const checkStatus =
    typeof expectedStatus === "function"
      ? expectedStatus
      : (status: string) => status === expectedStatus;

  while (attempts < maxAttempts) {
    // Check timeout if set
    if (timeoutTime && Date.now() > timeoutTime) {
      return {
        success: false,
        status: lastStatus,
        attempts,
        duration: Date.now() - startTime,
        error: `Timeout after ${timeout}ms`,
      };
    }

    attempts++;

    try {
      const response = await httpClient.get(url);
      const status = extractStatus(response.data);
      lastStatus = status;

      if (checkStatus(status)) {
        return {
          success: true,
          status,
          attempts,
          duration: Date.now() - startTime,
        };
      }

      console.log(
        `  ⏳ Attempt ${attempts}/${maxAttempts}: Status = ${status}, waiting ${interval}ms...`
      );
    } catch (error: any) {
      lastError = error.message || String(error);
      console.log(`  ⚠️  Attempt ${attempts}/${maxAttempts}: Error = ${lastError}`);

      // If resource not found (404), it might be deleted
      if (error.response?.status === 404) {
        return {
          success: false,
          status: "NOT_FOUND",
          attempts,
          duration: Date.now() - startTime,
          error: "Resource not found (404)",
        };
      }
    }

    // Wait before next attempt (unless last attempt)
    if (attempts < maxAttempts) {
      await sleep(interval);
    }
  }

  // Max attempts reached
  return {
    success: false,
    status: lastStatus,
    attempts,
    duration: Date.now() - startTime,
    error: lastError || `Max attempts (${maxAttempts}) reached`,
  };
}

/**
 * Wait for resource to become operational/ready
 *
 * @param httpClient - HTTP client for API calls
 * @param url - API endpoint to check
 * @param options - Polling configuration
 * @returns Validation result
 */
export async function waitForResourceReady(
  httpClient: any,
  url: string,
  options: PollOptions = {}
): Promise<ValidationResult> {
  console.log(`⏳ Waiting for resource to become ready: ${url}`);

  const result = await pollResourceStatus(
    httpClient,
    url,
    (status) => isOperationalStatus(status),
    options
  );

  if (result.success) {
    console.log(
      `✅ Resource ready after ${result.attempts} attempts (${Math.round(result.duration / 1000)}s)`
    );
  } else {
    console.error(
      `❌ Resource not ready: ${result.error} (${result.attempts} attempts, ${Math.round(result.duration / 1000)}s)`
    );
  }

  return result;
}

/**
 * Wait for resource deletion to complete (404)
 *
 * @param httpClient - HTTP client for API calls
 * @param url - API endpoint to check
 * @param options - Polling configuration
 * @returns Validation result
 */
export async function waitForResourceDeleted(
  httpClient: any,
  url: string,
  options: PollOptions = {}
): Promise<ValidationResult> {
  console.log(`⏳ Waiting for resource deletion: ${url}`);

  const interval = options.interval || 2000; // 2 seconds default
  const maxAttempts = options.maxAttempts || 30; // 1 minute total
  const timeout = options.timeout;

  const startTime = Date.now();
  const timeoutTime = timeout ? startTime + timeout : null;

  let attempts = 0;

  while (attempts < maxAttempts) {
    // Check timeout if set
    if (timeoutTime && Date.now() > timeoutTime) {
      return {
        success: false,
        attempts,
        duration: Date.now() - startTime,
        error: `Timeout after ${timeout}ms`,
      };
    }

    attempts++;

    try {
      await httpClient.get(url);
      // Resource still exists, wait and retry
      console.log(
        `  ⏳ Attempt ${attempts}/${maxAttempts}: Resource still exists, waiting ${interval}ms...`
      );

      if (attempts < maxAttempts) {
        await sleep(interval);
      }
    } catch (error: any) {
      // Check if 404 (resource deleted)
      if (error.response?.status === 404) {
        console.log(
          `✅ Resource deleted after ${attempts} attempts (${Math.round((Date.now() - startTime) / 1000)}s)`
        );
        return {
          success: true,
          status: "DELETED",
          attempts,
          duration: Date.now() - startTime,
        };
      }

      // Other error (not 404)
      console.log(
        `  ⚠️  Attempt ${attempts}/${maxAttempts}: Unexpected error = ${error.response?.status || "unknown"}`
      );

      if (attempts < maxAttempts) {
        await sleep(interval);
      }
    }
  }

  // Max attempts reached - resource still exists
  return {
    success: false,
    attempts,
    duration: Date.now() - startTime,
    error: `Resource still exists after ${maxAttempts} attempts`,
  };
}

/**
 * Check if resource exists
 *
 * @param httpClient - HTTP client for API calls
 * @param url - API endpoint to check
 * @returns True if resource exists (200 response)
 */
export async function resourceExists(
  httpClient: any,
  url: string
): Promise<boolean> {
  try {
    await httpClient.get(url);
    return true;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return false;
    }
    // Other errors (5xx, network, etc.) - rethrow
    throw error;
  }
}

/**
 * Verify resource has expected properties
 *
 * @param httpClient - HTTP client for API calls
 * @param url - API endpoint to check
 * @param validator - Function to validate resource data
 * @returns Validation result
 */
export async function verifyResource(
  httpClient: any,
  url: string,
  validator: (data: any) => boolean | string
): Promise<ValidationResult> {
  const startTime = Date.now();

  try {
    const response = await httpClient.get(url);
    const validationResult = validator(response.data);

    if (validationResult === true) {
      return {
        success: true,
        attempts: 1,
        duration: Date.now() - startTime,
      };
    }

    // Validation failed
    const error =
      typeof validationResult === "string"
        ? validationResult
        : "Validation failed";

    return {
      success: false,
      attempts: 1,
      duration: Date.now() - startTime,
      error,
    };
  } catch (error: any) {
    return {
      success: false,
      attempts: 1,
      duration: Date.now() - startTime,
      error: error.message || String(error),
    };
  }
}

/**
 * Extract status from F5XC API response
 *
 * @param data - API response data
 * @returns Status string
 */
function extractStatus(data: any): string {
  // Try common status field locations
  if (data?.system_metadata?.status?.status) {
    return data.system_metadata.status.status;
  }

  if (data?.status?.status) {
    return data.status.status;
  }

  if (data?.system_metadata?.state) {
    return data.system_metadata.state;
  }

  if (data?.state) {
    return data.state;
  }

  return "UNKNOWN";
}

/**
 * Check if status indicates resource is operational
 *
 * @param status - Status string
 * @returns True if operational
 */
function isOperationalStatus(status: string): boolean {
  const operationalStatuses = [
    "READY",
    "ACTIVE",
    "ONLINE",
    "UP",
    "AVAILABLE",
    "RUNNING",
    "PROVISIONED",
    "APPLIED",
  ];

  return operationalStatuses.includes(status.toUpperCase());
}

/**
 * Sleep for specified milliseconds
 *
 * @param ms - Milliseconds to sleep
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Wait for multiple resources to become ready in parallel
 *
 * @param httpClient - HTTP client for API calls
 * @param urls - Array of API endpoints to check
 * @param options - Polling configuration
 * @returns Array of validation results
 */
export async function waitForMultipleResourcesReady(
  httpClient: any,
  urls: string[],
  options: PollOptions = {}
): Promise<ValidationResult[]> {
  console.log(`⏳ Waiting for ${urls.length} resources to become ready...`);

  const promises = urls.map((url) =>
    waitForResourceReady(httpClient, url, options)
  );

  return Promise.all(promises);
}

/**
 * Retry an operation with exponential backoff
 *
 * @param operation - Async operation to retry
 * @param maxRetries - Maximum retry attempts
 * @param initialDelay - Initial delay in milliseconds
 * @returns Operation result
 */
export async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;

      if (attempt < maxRetries) {
        const delay = initialDelay * Math.pow(2, attempt);
        console.log(
          `  🔄 Retry ${attempt + 1}/${maxRetries} after ${delay}ms...`
        );
        await sleep(delay);
      }
    }
  }

  throw lastError!;
}
