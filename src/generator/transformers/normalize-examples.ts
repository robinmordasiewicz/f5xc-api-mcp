/**
 * Example Normalization Transformer
 *
 * Normalizes example names in OpenAPI descriptions to follow
 * the project's naming convention (using "example-" prefix).
 */

/**
 * Pattern to match "my-" prefixed example names
 * Matches whole words only to avoid partial replacements
 */
const MY_PREFIX_PATTERN = /\bmy-(\w+)/g;

/**
 * Normalize examples in a description string
 *
 * Replaces "my-" prefixed example names with "example-" prefix
 * to maintain consistent naming conventions throughout the codebase.
 *
 * @param description - The description text to normalize
 * @returns Normalized description with "example-" prefixes
 *
 * @example
 * ```typescript
 * normalizeExamples("my-file, shared/my-file, my-ns/my-file")
 * // Returns: "example-file, shared/example-file, example-ns/example-file"
 *
 * normalizeExamples("Use namespace 'my-namespace' with resource 'my-lb'")
 * // Returns: "Use namespace 'example-namespace' with resource 'example-lb'"
 * ```
 */
export function normalizeExamples(description: string): string {
  if (!description) {
    return description;
  }
  return description.replace(MY_PREFIX_PATTERN, "example-$1");
}

/**
 * Normalize examples in a parameter object
 *
 * Creates a new parameter object with normalized description
 *
 * @param param - The parameter object to normalize
 * @returns New parameter object with normalized description
 */
export function normalizeParameterExamples<T extends { description?: string }>(param: T): T {
  if (!param.description) {
    return param;
  }
  return {
    ...param,
    description: normalizeExamples(param.description),
  };
}

/**
 * Check if a string contains "my-" prefixed examples
 *
 * @param text - Text to check
 * @returns True if "my-" prefixed examples are found
 */
export function hasMyPrefixExamples(text: string): boolean {
  return MY_PREFIX_PATTERN.test(text);
}
