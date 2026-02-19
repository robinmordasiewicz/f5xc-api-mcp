// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Test file patterns
    include: ["tests/**/*.test.ts", "tests/**/*.spec.ts"],
    exclude: [
      "node_modules",
      "dist",
      // Exclude authenticated tests that require F5XC API credentials
      // Run explicitly with npm run test:discover, test:errors, test:performance, test:workflows
      "tests/acceptance/tools-comprehensive.test.ts",
      "tests/acceptance/error-scenarios.test.ts",
      "tests/acceptance/performance-baseline.test.ts",
      "tests/integration/network-failures.test.ts",
      "tests/e2e/**/*.test.ts",
    ],

    // Environment
    environment: "node",

    // Coverage configuration
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.d.ts", "src/**/index.ts", "src/**/*.test.ts", "src/**/*.spec.ts"],
      thresholds: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70,
        },
      },
    },

    // Test timeout
    testTimeout: 30000,

    // Reporter
    reporters: ["default"],

    // Global setup/teardown
    globalSetup: undefined,
    setupFiles: ["tests/setup.ts"],

    // Type checking
    typecheck: {
      enabled: true,
      include: ["tests/**/*.ts"],
    },
  },
});
