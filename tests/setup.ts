/**
 * Global test setup
 *
 * Runs before all tests to configure environment and logging.
 */

import { isCI, isGitHubActions } from "./utils/ci-environment.js";

// Log CI environment detection for debugging
if (isCI()) {
  console.log("[TEST SETUP] Running in CI environment");
  if (isGitHubActions()) {
    console.log("[TEST SETUP] Detected GitHub Actions");
  }
  console.log("[TEST SETUP] Authenticated tests will be skipped");
}
