import { z } from "zod";

/**
 * Safely merge objects, guarding against prototype pollution.
 * Only merges own enumerable string-keyed properties.
 */
export function safeMerge<T extends Record<string, unknown>>(
  target: T,
  source: Partial<Record<string, unknown>>
): T {
  const result: Record<string, unknown> = { ...target };

  for (const key of Object.keys(source)) {
    if (typeof key !== "string") continue;

    if (!Object.prototype.hasOwnProperty.call(source, key)) continue;

    if (!/^[a-zA-Z0-9_-]+$/.test(key)) {
      throw new Error(`Invalid property name: ${key}`);
    }

    result[key] = source[key];
  }

  return result as T;
}

/**
 * Safely parse JSON with schema validation and prototype pollution protection.
 */
export function safeParseJSON<T>(json: string, schema: z.ZodSchema<T>): T {
  const parsed = JSON.parse(json);

  const validated = schema.parse(parsed);

  return JSON.parse(JSON.stringify(validated)) as T;
}
