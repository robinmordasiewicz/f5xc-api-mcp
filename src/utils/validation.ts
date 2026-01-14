// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Request Body Validation Utilities
 *
 * Provides validation for request bodies to prevent malformed or malicious
 * payloads from causing performance issues or security vulnerabilities.
 */

export class ValidationError extends Error {
  constructor(
    message: string,
    public readonly path?: string,
    public readonly actualDepth?: number,
    public readonly maxDepth?: number
  ) {
    super(message);
    this.name = "ValidationError";
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export interface ValidationConfig {
  /** Maximum allowed object nesting depth */
  maxDepth: number;
  /** Maximum allowed array length */
  maxArrayLength?: number;
  /** Maximum allowed string length */
  maxStringLength?: number;
  /** Whether to track the path for error reporting */
  trackPath: boolean;
}

/**
 * Validate object depth to prevent deeply nested attack payloads
 *
 * Recursively checks the nesting depth of an object/array structure.
 * Throws ValidationError if depth exceeds the configured maximum.
 *
 * @param obj - Object to validate
 * @param maxDepth - Maximum allowed depth (default: 10)
 * @param currentPath - Current path in the object tree (for error reporting)
 * @param currentDepth - Current recursion depth (internal use)
 * @throws ValidationError if depth exceeds maxDepth
 *
 * @example
 * ```typescript
 * // Valid object (depth 3)
 * validateObjectDepth({ a: { b: { c: 1 } } }, 10); // OK
 *
 * // Too deep (depth 11)
 * validateObjectDepth(deepObject, 10); // throws ValidationError
 * ```
 */
export function validateObjectDepth(
  obj: unknown,
  maxDepth = 10,
  currentPath = "root",
  currentDepth = 0
): void {
  // Base cases: primitives don't add depth
  if (obj === null || obj === undefined) {
    return;
  }

  if (typeof obj !== "object") {
    return;
  }

  // Check depth limit
  if (currentDepth > maxDepth) {
    throw new ValidationError(
      `Object nesting exceeds maximum depth of ${maxDepth}`,
      currentPath,
      currentDepth,
      maxDepth
    );
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      const item = obj[i];
      const itemPath = `${currentPath}[${i}]`;

      // Recurse for objects/arrays in array
      if (typeof item === "object" && item !== null) {
        validateObjectDepth(item, maxDepth, itemPath, currentDepth + 1);
      }
    }
    return;
  }

  // Handle plain objects
  for (const [key, value] of Object.entries(obj)) {
    const valuePath = `${currentPath}.${key}`;

    // Recurse for nested objects/arrays
    if (typeof value === "object" && value !== null) {
      validateObjectDepth(value, maxDepth, valuePath, currentDepth + 1);
    }
  }
}

/**
 * Validate request body with configurable rules
 *
 * Performs comprehensive validation including depth, array length,
 * and string length checks to prevent resource exhaustion attacks.
 *
 * @param body - Request body to validate
 * @param config - Validation configuration
 * @throws ValidationError if validation fails
 */
export function validateRequestBody(body: unknown, config: Partial<ValidationConfig> = {}): void {
  const fullConfig: ValidationConfig = {
    maxDepth: config.maxDepth ?? 10,
    maxArrayLength: config.maxArrayLength,
    maxStringLength: config.maxStringLength,
    trackPath: config.trackPath ?? true,
  };

  // Validate depth
  if (fullConfig.trackPath) {
    validateObjectDepth(body, fullConfig.maxDepth);
  } else {
    // Skip path tracking for performance
    validateObjectDepth(body, fullConfig.maxDepth, "", 0);
  }

  // Additional validations if configured
  if (fullConfig.maxArrayLength !== undefined || fullConfig.maxStringLength !== undefined) {
    validateSizes(body, fullConfig);
  }
}

/**
 * Validate array lengths and string lengths
 * @internal
 */
function validateSizes(obj: unknown, config: ValidationConfig, currentPath = "root"): void {
  if (obj === null || obj === undefined) {
    return;
  }

  // Check string length
  if (typeof obj === "string" && config.maxStringLength !== undefined) {
    if (obj.length > config.maxStringLength) {
      throw new ValidationError(
        `String length (${obj.length}) exceeds maximum (${config.maxStringLength})`,
        currentPath
      );
    }
    return;
  }

  if (typeof obj !== "object") {
    return;
  }

  // Check array length
  if (Array.isArray(obj)) {
    if (config.maxArrayLength !== undefined && obj.length > config.maxArrayLength) {
      throw new ValidationError(
        `Array length (${obj.length}) exceeds maximum (${config.maxArrayLength})`,
        currentPath
      );
    }

    // Recurse into array elements
    for (let i = 0; i < obj.length; i++) {
      validateSizes(obj[i], config, `${currentPath}[${i}]`);
    }
    return;
  }

  // Recurse into object properties
  for (const [key, value] of Object.entries(obj)) {
    validateSizes(value, config, `${currentPath}.${key}`);
  }
}

/**
 * Create validation config from environment variables
 *
 * Reads configuration from:
 * - F5XC_MAX_DEPTH: Maximum object nesting depth (default: 10)
 * - F5XC_MAX_ARRAY_LENGTH: Maximum array length (optional)
 * - F5XC_MAX_STRING_LENGTH: Maximum string length (optional)
 *
 * @returns Validation configuration
 */
export function createValidationConfigFromEnv(): Partial<ValidationConfig> {
  const config: Partial<ValidationConfig> = {};

  if (process.env.F5XC_MAX_DEPTH) {
    const maxDepth = parseInt(process.env.F5XC_MAX_DEPTH, 10);
    if (!isNaN(maxDepth) && maxDepth > 0) {
      config.maxDepth = maxDepth;
    }
  }

  if (process.env.F5XC_MAX_ARRAY_LENGTH) {
    const maxArrayLength = parseInt(process.env.F5XC_MAX_ARRAY_LENGTH, 10);
    if (!isNaN(maxArrayLength) && maxArrayLength > 0) {
      config.maxArrayLength = maxArrayLength;
    }
  }

  if (process.env.F5XC_MAX_STRING_LENGTH) {
    const maxStringLength = parseInt(process.env.F5XC_MAX_STRING_LENGTH, 10);
    if (!isNaN(maxStringLength) && maxStringLength > 0) {
      config.maxStringLength = maxStringLength;
    }
  }

  return config;
}

/**
 * Get the actual depth of an object
 *
 * Utility function to measure the depth of an object/array structure.
 * Useful for testing and debugging. Handles circular references.
 *
 * @param obj - Object to measure
 * @param currentDepth - Current depth (internal use)
 * @param visited - Set of visited objects for circular reference detection
 * @returns Maximum depth of the object tree
 */
export function getObjectDepth(
  obj: unknown,
  currentDepth = 0,
  visited: WeakSet<object> = new WeakSet()
): number {
  if (obj === null || obj === undefined || typeof obj !== "object") {
    return currentDepth;
  }

  // Check for circular reference
  if (visited.has(obj)) {
    return currentDepth; // Don't recurse into circular references
  }

  // Mark as visited
  visited.add(obj);

  if (Array.isArray(obj)) {
    if (obj.length === 0) {
      return currentDepth;
    }

    return Math.max(...obj.map((item) => getObjectDepth(item, currentDepth + 1, visited)));
  }

  const entries = Object.entries(obj);
  if (entries.length === 0) {
    return currentDepth;
  }

  return Math.max(...entries.map(([, value]) => getObjectDepth(value, currentDepth + 1, visited)));
}
