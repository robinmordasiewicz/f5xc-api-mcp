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

  constructor(
    message: string,
    code: string,
    context?: Record<string, unknown>
  ) {
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

  constructor(
    toolName: string,
    message: string,
    context?: Record<string, unknown>
  ) {
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
