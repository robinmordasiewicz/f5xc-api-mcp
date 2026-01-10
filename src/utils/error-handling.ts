// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/// <reference types="node" />
/**
 * Error handling utilities for F5XC API MCP Server
 *
 * Provides typed error classes for different error scenarios
 * and utilities for error categorization and handling.
 */

/**
 * Base error class for F5XC API errors
 */
export class F5XCError extends Error {
  /** Error code for categorization */
  readonly code: string;
  /** Additional error context */
  readonly context?: Record<string, unknown>;

  constructor(message: string, code: string, context?: Record<string, unknown>) {
    super(message);
    this.name = "F5XCError";
    this.code = code;
    this.context = context;

    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, F5XCError);
    }
  }

  /**
   * Convert error to JSON representation
   */
  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      context: this.context,
    };
  }
}

/**
 * Authentication-related errors
 */
export class AuthenticationError extends F5XCError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, "AUTH_ERROR", context);
    this.name = "AuthenticationError";
  }
}

/**
 * API request/response errors
 */
export class F5XCApiError extends F5XCError {
  /** HTTP status code */
  readonly status?: number;
  /** Raw API response */
  readonly response?: unknown;

  constructor(
    message: string,
    status?: number,
    response?: unknown,
    context?: Record<string, unknown>
  ) {
    super(message, "API_ERROR", context);
    this.name = "F5XCApiError";
    this.status = status;
    this.response = response;
  }

  toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      status: this.status,
      response: this.response,
    };
  }
}

/**
 * Configuration errors
 */
export class ConfigurationError extends F5XCError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, "CONFIG_ERROR", context);
    this.name = "ConfigurationError";
  }
}

/**
 * SSL/TLS certificate validation errors
 */
export class SSLCertificateError extends F5XCError {
  /** The hostname that failed validation */
  readonly hostname?: string;
  /** Certificate details if available */
  readonly certInfo?: {
    subject?: string;
    altNames?: string[];
    issuer?: string;
  };

  constructor(
    message: string,
    hostname?: string,
    certInfo?: SSLCertificateError["certInfo"],
    context?: Record<string, unknown>
  ) {
    super(message, "SSL_CERT_ERROR", context);
    this.name = "SSLCertificateError";
    this.hostname = hostname;
    this.certInfo = certInfo;
  }

  toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      hostname: this.hostname,
      certInfo: this.certInfo,
    };
  }
}

/**
 * Validation errors for request parameters
 */
export class ValidationError extends F5XCError {
  /** Field-level validation errors */
  readonly errors: Array<{
    field: string;
    message: string;
  }>;

  constructor(
    message: string,
    errors: Array<{ field: string; message: string }>,
    context?: Record<string, unknown>
  ) {
    super(message, "VALIDATION_ERROR", context);
    this.name = "ValidationError";
    this.errors = errors;
  }

  toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      errors: this.errors,
    };
  }
}

/**
 * Tool execution errors
 */
export class ToolExecutionError extends F5XCError {
  /** Name of the tool that failed */
  readonly toolName: string;

  constructor(toolName: string, message: string, context?: Record<string, unknown>) {
    super(message, "TOOL_ERROR", context);
    this.name = "ToolExecutionError";
    this.toolName = toolName;
  }

  toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      toolName: this.toolName,
    };
  }
}

/**
 * OpenAPI specification errors
 */
export class SpecificationError extends F5XCError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, "SPEC_ERROR", context);
    this.name = "SpecificationError";
  }
}

/**
 * Error categorization for MCP responses
 */
export enum ErrorCategory {
  /** User input validation errors */
  VALIDATION = "validation",
  /** Authentication/authorization errors */
  AUTHENTICATION = "authentication",
  /** Server-side errors */
  SERVER = "server",
  /** Network/connectivity errors */
  NETWORK = "network",
  /** Configuration errors */
  CONFIGURATION = "configuration",
  /** SSL/TLS certificate errors */
  SSL_CERTIFICATE = "ssl_certificate",
  /** Unknown errors */
  UNKNOWN = "unknown",
}

/**
 * Categorize an error for appropriate handling
 */
export function categorizeError(error: unknown): ErrorCategory {
  if (error instanceof ValidationError) {
    return ErrorCategory.VALIDATION;
  }
  if (error instanceof AuthenticationError) {
    return ErrorCategory.AUTHENTICATION;
  }
  if (error instanceof ConfigurationError) {
    return ErrorCategory.CONFIGURATION;
  }
  if (error instanceof SSLCertificateError) {
    return ErrorCategory.SSL_CERTIFICATE;
  }
  if (error instanceof F5XCApiError) {
    if (error.status !== undefined) {
      if (error.status === 401 || error.status === 403) {
        return ErrorCategory.AUTHENTICATION;
      }
      if (error.status >= 400 && error.status < 500) {
        return ErrorCategory.VALIDATION;
      }
      if (error.status >= 500) {
        return ErrorCategory.SERVER;
      }
    }
    return ErrorCategory.SERVER;
  }
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    const code = (error as NodeJS.ErrnoException).code?.toLowerCase() ?? "";

    // SSL/TLS certificate errors
    if (
      message.includes("certificate") ||
      message.includes("ssl") ||
      message.includes("tls") ||
      message.includes("altnames") ||
      (message.includes("hostname") && message.includes("match")) ||
      message.includes("self signed") ||
      message.includes("self-signed") ||
      message.includes("unable to verify") ||
      code === "cert_has_expired" ||
      code === "depth_zero_self_signed_cert" ||
      code === "unable_to_get_issuer_cert" ||
      code === "unable_to_verify_leaf_signature" ||
      code === "hostname_mismatch" ||
      code === "err_tls_cert_altname_invalid"
    ) {
      return ErrorCategory.SSL_CERTIFICATE;
    }

    // Network/connectivity errors
    if (
      message.includes("network") ||
      message.includes("timeout") ||
      message.includes("econnrefused") ||
      message.includes("enotfound")
    ) {
      return ErrorCategory.NETWORK;
    }
  }
  return ErrorCategory.UNKNOWN;
}

/**
 * Format error for MCP tool response
 */
export function formatErrorForMcp(error: unknown): {
  isError: true;
  content: Array<{ type: "text"; text: string }>;
} {
  const category = categorizeError(error);

  let errorMessage: string;
  let errorCode: string;
  let details: Record<string, unknown> | undefined;

  if (error instanceof F5XCError) {
    errorMessage = error.message;
    errorCode = error.code;
    details = error.context;
  } else if (error instanceof Error) {
    errorMessage = error.message;
    errorCode = "UNKNOWN_ERROR";
  } else {
    errorMessage = String(error);
    errorCode = "UNKNOWN_ERROR";
  }

  const errorResponse = {
    error: {
      category,
      code: errorCode,
      message: errorMessage,
      details,
    },
  };

  return {
    isError: true,
    content: [
      {
        type: "text",
        text: JSON.stringify(errorResponse, null, 2),
      },
    ],
  };
}

/**
 * Wrap async function with error handling
 */
export function withErrorHandling<T extends unknown[], R>(
  fn: (...args: T) => Promise<R>
): (...args: T) => Promise<R> {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args);
    } catch (error) {
      if (error instanceof F5XCError) {
        throw error;
      }
      if (error instanceof Error) {
        throw new F5XCError(error.message, "UNKNOWN_ERROR", {
          originalError: error.name,
          stack: error.stack,
        });
      }
      throw new F5XCError(String(error), "UNKNOWN_ERROR");
    }
  };
}

/**
 * Detect and wrap SSL certificate errors with actionable guidance
 *
 * @param error - Original error to analyze
 * @param apiUrl - Optional API URL for context
 * @returns Wrapped SSLCertificateError with helpful guidance or original error
 */
export function wrapSSLError(error: unknown, apiUrl?: string): Error {
  if (!(error instanceof Error)) {
    return error instanceof Error ? error : new Error(String(error));
  }

  const message = error.message.toLowerCase();
  let hostname: string | undefined;

  try {
    if (apiUrl) {
      hostname = new URL(apiUrl).hostname;
    }
  } catch {
    // Invalid URL, ignore
  }

  // Check for hostname/altname mismatch (the staging certificate issue)
  if (message.includes("altnames") || (message.includes("hostname") && message.includes("match"))) {
    const isStaging = hostname?.includes(".staging.");

    let guidance = `SSL Certificate Error: The server certificate does not cover hostname "${hostname ?? "unknown"}".`;

    if (isStaging) {
      guidance += `

This is a known issue with F5 XC staging environments. The wildcard certificate
*.console.ves.volterra.io does not match multi-level subdomains like
tenant.staging.console.ves.volterra.io.

SOLUTIONS:
1. (Recommended) Set F5XC_CA_BUNDLE=/path/to/custom-ca.crt
2. (Development only) Set F5XC_TLS_INSECURE=true to bypass verification
   WARNING: Never use insecure mode in production!

Example:
  export F5XC_TLS_INSECURE=true`;
    } else {
      guidance += `

SOLUTIONS:
1. Verify the API URL is correct: ${apiUrl ?? "not set"}
2. If using a custom CA, set F5XC_CA_BUNDLE=/path/to/ca-bundle.crt
3. Check if the certificate has expired or is self-signed`;
    }

    return new SSLCertificateError(guidance, hostname, undefined, {
      originalError: error.message,
      apiUrl,
    });
  }

  // Check for self-signed certificates
  if (message.includes("self signed") || message.includes("self-signed")) {
    return new SSLCertificateError(
      `SSL Certificate Error: Self-signed certificate detected.

SOLUTIONS:
1. (Recommended) Add your CA certificate: F5XC_CA_BUNDLE=/path/to/ca.crt
2. (Development only) Set F5XC_TLS_INSECURE=true to bypass verification`,
      hostname,
      undefined,
      { originalError: error.message, apiUrl }
    );
  }

  // Check for expired certificates
  if (message.includes("expired") || message.includes("not yet valid")) {
    return new SSLCertificateError(
      `SSL Certificate Error: Certificate has expired or is not yet valid.

Contact your F5 XC administrator to renew the certificate.`,
      hostname,
      undefined,
      { originalError: error.message, apiUrl }
    );
  }

  // Generic SSL error
  if (
    message.includes("certificate") ||
    message.includes("ssl") ||
    message.includes("tls") ||
    message.includes("unable to verify")
  ) {
    return new SSLCertificateError(
      `SSL/TLS Error: ${error.message}

If this is a staging environment, you may need to:
1. Set F5XC_CA_BUNDLE=/path/to/ca.crt for custom CA
2. Set F5XC_TLS_INSECURE=true to disable verification (development only)`,
      hostname,
      undefined,
      { originalError: error.message, apiUrl }
    );
  }

  // Not an SSL error, return original
  return error;
}
