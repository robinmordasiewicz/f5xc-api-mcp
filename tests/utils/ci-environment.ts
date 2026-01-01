/**
 * CI Environment Detection Utility
 *
 * Provides helpers to detect when tests are running in CI environment
 * and skip authentication-related tests that require real credentials.
 */

/**
 * Check if tests are running in CI environment
 * Detects common CI platforms: GitHub Actions, GitLab CI, Circle CI, Travis CI, etc.
 */
export function isCI(): boolean {
  return !!(
    process.env.CI || // Generic CI indicator
    process.env.GITHUB_ACTIONS || // GitHub Actions
    process.env.GITLAB_CI || // GitLab CI
    process.env.CIRCLECI || // Circle CI
    process.env.TRAVIS || // Travis CI
    process.env.BUILDKITE || // Buildkite
    process.env.DRONE || // Drone
    process.env.APPVEYOR // AppVeyor
  );
}

/**
 * Check if running in GitHub Actions specifically
 */
export function isGitHubActions(): boolean {
  return !!process.env.GITHUB_ACTIONS;
}

/**
 * Provide skip condition for tests that require authentication
 * Returns true if test should be skipped (in CI environment)
 */
export function shouldSkipAuthenticatedTests(): boolean {
  return isCI();
}

/**
 * Provide skip condition for tests that require P12 certificate
 * Returns true if test should be skipped (in CI environment without real certificates)
 */
export function shouldSkipP12Tests(): boolean {
  // Skip if in CI and actual P12 file doesn't exist
  if (!isCI()) return false;

  const p12Bundle = process.env.F5XC_P12_BUNDLE;
  if (!p12Bundle) return true; // P12 not configured at all

  // Check if it's a real file path vs a test mock
  return !p12Bundle.includes("mock");
}

/**
 * Provide skip condition for tests that require API TOKEN
 * Returns true if test should be skipped (in CI environment without real token)
 */
export function shouldSkipTokenAuthTests(): boolean {
  // Skip if in CI and actual API token doesn't exist (in CI, it won't)
  if (!isCI()) return false;

  const apiToken = process.env.F5XC_API_TOKEN;
  return !apiToken || apiToken === "test-token" || apiToken.includes("mock");
}

/**
 * Clear all F5XC environment variables
 * Use in test setup/teardown to ensure clean state
 */
export function clearF5XCEnvVars(): void {
  delete process.env.F5XC_API_URL;
  delete process.env.F5XC_API_TOKEN;
  delete process.env.F5XC_P12_BUNDLE;
  delete process.env.F5XC_CERT;
  delete process.env.F5XC_KEY;
  delete process.env.F5XC_NAMESPACE;
}

/**
 * Set up environment for documentation mode testing
 * Clears all auth env vars and disables profile loading
 */
export function setupDocumentationModeEnv(): void {
  clearF5XCEnvVars();
  // Set XDG_CONFIG_HOME to a non-existent directory to prevent loading real profiles
  process.env.XDG_CONFIG_HOME = "/tmp/__nonexistent_test_config__";
}

/**
 * Set up environment for authenticated mode testing
 */
export function setupAuthenticatedModeEnv(options?: {
  apiUrl?: string;
  apiToken?: string;
}): void {
  clearF5XCEnvVars();
  process.env.F5XC_API_URL = options?.apiUrl ?? "https://test.console.ves.volterra.io";
  process.env.F5XC_API_TOKEN = options?.apiToken ?? "test-token";
}
