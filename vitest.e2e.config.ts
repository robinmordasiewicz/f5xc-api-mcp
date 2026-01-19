// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

import { defineConfig } from "vitest/config";

/**
 * Vitest configuration for E2E authenticated tests
 *
 * These tests require F5XC API credentials and perform actual API calls.
 * Run with: npm run test:e2e or npx vitest run --config vitest.e2e.config.ts
 */
export default defineConfig({
  test: {
    // E2E test file patterns
    include: ["tests/e2e/**/*.test.ts"],
    exclude: ["node_modules", "dist"],

    // Environment
    environment: "node",

    // Longer timeout for API calls
    testTimeout: 60000,

    // Verbose reporter for visibility
    reporters: ["verbose"],

    // Sequential execution for CRUD operations
    fileParallelism: false,

    // Setup files
    setupFiles: ["tests/setup.ts"],

    // Type checking disabled for faster execution
    typecheck: {
      enabled: false,
    },
  },
});
