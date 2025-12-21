/**
 * Zod validation schemas for F5XC API MCP configuration
 */

import { z } from "zod";
import type { ConfigFile, ProfileCredentials } from "./types.js";

/**
 * Schema for profile metadata
 */
export const ProfileMetadataSchema = z
  .object({
    description: z.string().optional(),
    createdAt: z.string().datetime(),
    lastUsedAt: z.string().datetime().optional(),
    lastModifiedAt: z.string().datetime(),
  })
  .strict();

/**
 * Schema for profile credentials
 */
export const ProfileCredentialsSchema = z
  .object({
    apiUrl: z.string().url().optional(),
    apiToken: z.string().optional(),
    p12File: z.string().optional(),
    p12Password: z.string().optional(),
    metadata: ProfileMetadataSchema.optional(),
  })
  .strict();

/**
 * Schema for configuration file
 */
export const ConfigFileSchema = z
  .object({
    version: z.string(),
    defaultProfile: z.string().optional(),
    profiles: z.record(z.string(), ProfileCredentialsSchema),
    metadata: z
      .object({
        lastModifiedAt: z.string().datetime(),
      })
      .strict()
      .optional(),
  })
  .strict();

/**
 * Validate a configuration file
 * @param data - Data to validate
 * @returns Validated ConfigFile or throws ZodError
 */
export function validateConfigFile(data: unknown): ConfigFile {
  return ConfigFileSchema.parse(data);
}

/**
 * Validate profile credentials
 * @param data - Data to validate
 * @returns Validated ProfileCredentials or throws ZodError
 */
export function validateProfileCredentials(data: unknown): ProfileCredentials {
  return ProfileCredentialsSchema.parse(data);
}

/**
 * Safely validate a configuration file
 * @param data - Data to validate
 * @returns Object with success flag and data or error
 */
export function safeValidateConfigFile(data: unknown): {
  success: boolean;
  data?: ConfigFile;
  error?: string;
} {
  try {
    const config = validateConfigFile(data);
    return { success: true, data: config };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown validation error";
    return { success: false, error: message };
  }
}
