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

  const p12File = process.env.F5XC_P12_FILE;
  if (!p12File) return true; // P12 not configured at all

  // Check if it's a real file path vs a test mock
  return !p12File.includes("mock");
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
 * Get a ConfigManager mock for CI tests that prevents loading profiles from disk
 * This is used to ensure tests that expect documentation mode don't accidentally
 * load real credentials from ~/.f5xc/credentials.json
 */
export function createEmptyConfigManager() {
  // Return a mock ConfigManager that has no profiles
  return {
    readSync: () => ({
      version: "1.0",
      defaultProfile: null,
      profiles: {},
      metadata: { lastModifiedAt: new Date().toISOString() },
    }),
    read: async () => ({
      version: "1.0",
      defaultProfile: null,
      profiles: {},
      metadata: { lastModifiedAt: new Date().toISOString() },
    }),
    setProfile: async () => {},
    deleteProfile: async () => {},
    setDefaultProfile: async () => {},
    touchProfile: async () => {},
  };
}
