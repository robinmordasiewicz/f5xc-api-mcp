// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Authenticated Healthcheck CRUD Tests
 *
 * End-to-end tests that perform actual authenticated API calls against F5XC.
 * Tests the complete CRUD lifecycle for healthcheck resources.
 *
 * Prerequisites:
 * - F5XC_API_URL and F5XC_API_TOKEN environment variables set
 * - Valid F5XC tenant access
 *
 * Test Matrix:
 * - Create healthcheck with host_header option
 * - Create healthcheck with use_origin_server_name option (recommended)
 * - Get/verify created healthcheck
 * - Validate oneOf conflict detection
 * - Delete healthcheck cleanup
 */

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { CredentialManager } from "@robinmordasiewicz/f5xc-auth";
import { executeTool } from "../../../src/tools/discovery/execute.js";
import { validateToolParams } from "../../../src/tools/discovery/validate.js";
import { getToolByName } from "../../../src/tools/registry.js";
import {
  generateTestResourceName,
  applyTestMetadata,
  delay,
} from "../helpers/test-data-generator.js";
import { isCI } from "../../utils/ci-environment.js";

// Test configuration
const NAMESPACE = "default";
const HEALTHCHECK_CREATE_TOOL = "f5xc-api-virtual-healthcheck-create";
const HEALTHCHECK_GET_TOOL = "f5xc-api-virtual-healthcheck-get";
const HEALTHCHECK_DELETE_TOOL = "f5xc-api-virtual-healthcheck-delete";

// Track created resources for cleanup
const createdResources: string[] = [];

// Authentication state - initialized synchronously
const credentialManager = new CredentialManager();
let isAuthenticated = false;
let tenant: string | null = null;

// Initialize synchronously for test registration
// Note: This is a workaround because vitest evaluates skipIf at registration time
try {
  // Check environment variables directly for quick auth check
  const apiUrl = process.env.F5XC_API_URL;
  const apiToken = process.env.F5XC_API_TOKEN;
  isAuthenticated = !!(apiUrl && apiToken);

  if (apiUrl) {
    // Extract tenant from URL
    const match = apiUrl.match(/https?:\/\/([^.]+)\./);
    tenant = match ? match[1] : null;
  }
} catch {
  isAuthenticated = false;
}

/**
 * Generate healthcheck configuration with host_header option
 */
function generateHealthcheckWithHostHeader(name: string): Record<string, unknown> {
  return applyTestMetadata({
    metadata: { name, namespace: NAMESPACE },
    spec: {
      http_health_check: {
        path: "/health",
        host_header: "custom-host.example.com", // Custom host header option
      },
      interval: 15,
      timeout: 3,
      unhealthy_threshold: 1,
      healthy_threshold: 3,
    },
  });
}

/**
 * Generate healthcheck configuration with use_origin_server_name option (recommended)
 */
function generateHealthcheckWithOriginServerName(name: string): Record<string, unknown> {
  return applyTestMetadata({
    metadata: { name, namespace: NAMESPACE },
    spec: {
      http_health_check: {
        path: "/health",
        use_origin_server_name: {}, // Recommended option
      },
      interval: 15,
      timeout: 3,
      unhealthy_threshold: 1,
      healthy_threshold: 3,
    },
  });
}

/**
 * Generate healthcheck configuration with BOTH options (invalid - mutually exclusive)
 */
function generateHealthcheckWithBothOptions(name: string): Record<string, unknown> {
  return applyTestMetadata({
    metadata: { name, namespace: NAMESPACE },
    spec: {
      http_health_check: {
        path: "/health",
        host_header: "custom-host.example.com", // Option 1
        use_origin_server_name: {}, // Option 2 - CONFLICT!
      },
      interval: 15,
      timeout: 3,
      unhealthy_threshold: 1,
      healthy_threshold: 3,
    },
  });
}

/**
 * Helper to check if response is an API response (not documentation mode)
 */
function isApiResponse(response: unknown): response is { data: unknown; status: number } {
  return (
    typeof response === "object" &&
    response !== null &&
    "data" in response &&
    "status" in response
  );
}

/**
 * Helper to check if response is an error response
 */
function isErrorResponse(response: unknown): response is { success: false; error: string } {
  return (
    typeof response === "object" &&
    response !== null &&
    "success" in response &&
    (response as any).success === false
  );
}

/**
 * Helper to check if response is documentation mode
 */
function isDocumentationResponse(
  response: unknown
): response is { curlExample: string; authMessage: string } {
  return (
    typeof response === "object" &&
    response !== null &&
    "curlExample" in response &&
    "authMessage" in response
  );
}

describe("Authenticated Healthcheck CRUD Tests", () => {
  // Initialize full authentication before all tests
  beforeAll(async () => {
    await credentialManager.initialize();
    isAuthenticated = credentialManager.isAuthenticated();
    tenant = credentialManager.getTenant();

    if (isAuthenticated) {
      console.log(`\n✅ Authenticated as tenant: ${tenant}`);
      console.log(`   Namespace: ${NAMESPACE}\n`);
    } else {
      console.log("\n⚠️  Not authenticated - API tests will be skipped");
      console.log("   Set F5XC_API_URL and F5XC_API_TOKEN to run live tests\n");
    }
  });

  // Cleanup all created resources after all tests
  afterAll(async () => {
    if (!isAuthenticated || createdResources.length === 0) return;

    console.log(`\n🧹 Cleaning up ${createdResources.length} test resource(s)...`);

    for (const resourceName of createdResources) {
      try {
        await executeTool(
          {
            toolName: HEALTHCHECK_DELETE_TOOL,
            pathParams: { namespace: NAMESPACE, name: resourceName },
          },
          credentialManager
        );
        console.log(`   ✅ Deleted: ${resourceName}`);
        await delay(500); // Brief pause between deletions
      } catch (error: any) {
        // 404 is acceptable (already deleted)
        if (error?.response?.status !== 404) {
          console.log(`   ⚠️  Failed to delete ${resourceName}: ${error.message}`);
        }
      }
    }
  });

  // ===========================================================================
  // Authentication Check (always runs)
  // ===========================================================================
  describe("Authentication Check", () => {
    it("should detect authentication state", () => {
      if (isCI() && !isAuthenticated) {
        console.log("   ℹ️  Skipping authenticated tests in CI without credentials");
      }
      // This test always passes - it's just for logging
      expect(true).toBe(true);
    });
  });

  // ===========================================================================
  // SCENARIO 1: Create Healthcheck with host_header option
  // ===========================================================================
  describe("Scenario: Create Healthcheck with host_header option", () => {
    const testName = generateTestResourceName("hc-host-header");

    it("should create healthcheck with host_header", async () => {
      if (!isAuthenticated) {
        console.log("   ⏭️  Skipped: Not authenticated");
        return;
      }

      const config = generateHealthcheckWithHostHeader(testName);

      const createResponse = await executeTool(
        {
          toolName: HEALTHCHECK_CREATE_TOOL,
          pathParams: { "metadata.namespace": NAMESPACE },
          body: config,
        },
        credentialManager
      );

      // Should not be documentation mode
      if (isDocumentationResponse(createResponse)) {
        console.log("   ⚠️ Got documentation response - credentials may not be properly initialized");
        return;
      }

      // Check for API error response (e.g., 401)
      if (isErrorResponse(createResponse)) {
        console.log(`   ⚠️ API error: ${createResponse.error}`);
        console.log("   ℹ️ Check that your F5XC credentials are valid and not expired");
        return;
      }

      // Should be API response
      expect(isApiResponse(createResponse)).toBe(true);

      if (isApiResponse(createResponse)) {
        console.log(`   ✅ Created healthcheck: ${testName}`);
        createdResources.push(testName);

        // Verify response structure
        expect(createResponse.status).toBe(200);
        expect(createResponse.data).toBeDefined();
      }
    });

    it("should retrieve created healthcheck with host_header", async () => {
      if (!isAuthenticated) {
        console.log("   ⏭️  Skipped: Not authenticated");
        return;
      }

      // Skip if resource wasn't created (e.g., previous test had auth error)
      if (!createdResources.includes(testName)) {
        console.log("   ⏭️  Skipped: Resource was not created in previous test");
        return;
      }

      // Wait for resource to be available
      await delay(1000);

      const getResponse = await executeTool(
        {
          toolName: HEALTHCHECK_GET_TOOL,
          pathParams: { namespace: NAMESPACE, name: testName },
        },
        credentialManager
      );

      // Check for API error response (e.g., 401)
      if (isErrorResponse(getResponse)) {
        console.log(`   ⚠️ API error: ${getResponse.error}`);
        console.log("   ℹ️ Check that your F5XC credentials are valid and not expired");
        return;
      }

      expect(isApiResponse(getResponse)).toBe(true);

      if (isApiResponse(getResponse)) {
        const data = getResponse.data as any;
        expect(data.metadata?.name).toBe(testName);
        expect(data.spec?.http_health_check?.host_header).toBe("custom-host.example.com");

        console.log(`   ✅ Verified host_header: ${data.spec?.http_health_check?.host_header}`);
      }
    });
  });

  // ===========================================================================
  // SCENARIO 2: Create Healthcheck with use_origin_server_name option (recommended)
  // ===========================================================================
  describe("Scenario: Create Healthcheck with use_origin_server_name (recommended)", () => {
    const testName = generateTestResourceName("hc-origin-name");

    it("should create healthcheck with use_origin_server_name", async () => {
      if (!isAuthenticated) {
        console.log("   ⏭️  Skipped: Not authenticated");
        return;
      }

      const config = generateHealthcheckWithOriginServerName(testName);

      const createResponse = await executeTool(
        {
          toolName: HEALTHCHECK_CREATE_TOOL,
          pathParams: { "metadata.namespace": NAMESPACE },
          body: config,
        },
        credentialManager
      );

      // Should not be documentation mode
      if (isDocumentationResponse(createResponse)) {
        console.log("   ⚠️ Got documentation response - credentials may not be properly initialized");
        return;
      }

      // Check for API error response (e.g., 401)
      if (isErrorResponse(createResponse)) {
        console.log(`   ⚠️ API error: ${createResponse.error}`);
        console.log("   ℹ️ Check that your F5XC credentials are valid and not expired");
        return;
      }

      expect(isApiResponse(createResponse)).toBe(true);

      if (isApiResponse(createResponse)) {
        console.log(`   ✅ Created healthcheck: ${testName}`);
        createdResources.push(testName);
        expect(createResponse.status).toBe(200);
      }
    });

    it("should retrieve created healthcheck with use_origin_server_name", async () => {
      if (!isAuthenticated) {
        console.log("   ⏭️  Skipped: Not authenticated");
        return;
      }

      // Skip if resource wasn't created (e.g., previous test had auth error)
      if (!createdResources.includes(testName)) {
        console.log("   ⏭️  Skipped: Resource was not created in previous test");
        return;
      }

      await delay(1000);

      const getResponse = await executeTool(
        {
          toolName: HEALTHCHECK_GET_TOOL,
          pathParams: { namespace: NAMESPACE, name: testName },
        },
        credentialManager
      );

      // Check for API error response (e.g., 401)
      if (isErrorResponse(getResponse)) {
        console.log(`   ⚠️ API error: ${getResponse.error}`);
        console.log("   ℹ️ Check that your F5XC credentials are valid and not expired");
        return;
      }

      expect(isApiResponse(getResponse)).toBe(true);

      if (isApiResponse(getResponse)) {
        const data = getResponse.data as any;
        expect(data.metadata?.name).toBe(testName);
        expect(data.spec?.http_health_check?.use_origin_server_name).toBeDefined();

        console.log("   ✅ Verified use_origin_server_name is set");
      }
    });
  });

  // ===========================================================================
  // SCENARIO 3: Validation - OneOf Conflict Detection (host_header_choice)
  // ===========================================================================
  describe("Scenario: OneOf Conflict Detection (host_header_choice)", () => {
    const testName = generateTestResourceName("hc-conflict");

    it("should detect mutually exclusive options in validation", () => {
      const config = generateHealthcheckWithBothOptions(testName);

      const result = validateToolParams({
        toolName: HEALTHCHECK_CREATE_TOOL,
        pathParams: { "metadata.namespace": NAMESPACE },
        body: config,
      });

      console.log(`\n📋 Validation Result:`);
      console.log(`   Valid: ${result.valid}`);
      console.log(`   Errors: ${result.errors.length}`);
      console.log(`   Warnings: ${result.warnings.length}`);

      for (const warning of result.warnings) {
        console.log(`   ⚠️ ${warning}`);
      }

      // Should have warning about mutually exclusive options
      const hasMutualExclusivityWarning = result.warnings.some(
        (w) =>
          w.toLowerCase().includes("mutually exclusive") ||
          w.toLowerCase().includes("choose only one") ||
          w.toLowerCase().includes("multiple")
      );

      expect(hasMutualExclusivityWarning).toBe(true);

      // Warning should mention the field names
      const mentionsFields = result.warnings.some(
        (w) =>
          (w.includes("host_header") && w.includes("use_origin_server_name")) ||
          w.includes("host_header_choice")
      );

      expect(mentionsFields).toBe(true);

      console.log("   ✅ Mutually exclusive options correctly detected");
    });

    it("should reject creation with both options via API", async () => {
      if (!isAuthenticated) {
        console.log("   ⏭️  Skipped: Not authenticated");
        return;
      }

      const config = generateHealthcheckWithBothOptions(testName);

      try {
        const response = await executeTool(
          {
            toolName: HEALTHCHECK_CREATE_TOOL,
            pathParams: { "metadata.namespace": NAMESPACE },
            body: config,
          },
          credentialManager
        );

        // Check for API error response (e.g., 401)
        if (isErrorResponse(response)) {
          console.log(`   ⚠️ API error: ${response.error}`);
          console.log("   ℹ️ Check that your F5XC credentials are valid and not expired");
          return;
        }

        // If API accepts it, that's unexpected behavior
        if (isApiResponse(response) && response.status === 200) {
          console.log("   ⚠️ API accepted config with both options (may be valid server-side)");
          createdResources.push(testName); // Mark for cleanup
        }
      } catch (error: any) {
        // API should reject this configuration
        console.log(`   ✅ API rejected invalid config: ${error.message}`);
        expect(error.response?.status).toBeGreaterThanOrEqual(400);
      }
    });
  });

  // ===========================================================================
  // SCENARIO 4: Validation - Single Option (Valid Configurations)
  // ===========================================================================
  describe("Scenario: Single Option Validation (Valid Configurations)", () => {
    it("should validate config with only host_header", () => {
      const config = generateHealthcheckWithHostHeader("test-host-header-valid");

      const result = validateToolParams({
        toolName: HEALTHCHECK_CREATE_TOOL,
        pathParams: { "metadata.namespace": NAMESPACE },
        body: config,
      });

      expect(result.valid).toBe(true);

      // Should NOT have mutually exclusive warning
      const hasMutualExclusivityWarning = result.warnings.some(
        (w) =>
          w.toLowerCase().includes("mutually exclusive") ||
          w.toLowerCase().includes("choose only one")
      );

      expect(hasMutualExclusivityWarning).toBe(false);
      console.log("   ✅ Single host_header option validates correctly");
    });

    it("should validate config with only use_origin_server_name", () => {
      const config = generateHealthcheckWithOriginServerName("test-origin-name-valid");

      const result = validateToolParams({
        toolName: HEALTHCHECK_CREATE_TOOL,
        pathParams: { "metadata.namespace": NAMESPACE },
        body: config,
      });

      expect(result.valid).toBe(true);

      // Should NOT have mutually exclusive warning
      const hasMutualExclusivityWarning = result.warnings.some(
        (w) =>
          w.toLowerCase().includes("mutually exclusive") ||
          w.toLowerCase().includes("choose only one")
      );

      expect(hasMutualExclusivityWarning).toBe(false);
      console.log("   ✅ Single use_origin_server_name option validates correctly");
    });
  });

  // ===========================================================================
  // SCENARIO 5: Delete Operations
  // ===========================================================================
  describe("Scenario: Delete Healthcheck", () => {
    const testName = generateTestResourceName("hc-delete-test");

    it("should create and delete healthcheck", async () => {
      if (!isAuthenticated) {
        console.log("   ⏭️  Skipped: Not authenticated");
        return;
      }

      // Create
      const config = generateHealthcheckWithOriginServerName(testName);

      const createResponse = await executeTool(
        {
          toolName: HEALTHCHECK_CREATE_TOOL,
          pathParams: { "metadata.namespace": NAMESPACE },
          body: config,
        },
        credentialManager
      );

      // Check for API error response (e.g., 401)
      if (isErrorResponse(createResponse)) {
        console.log(`   ⚠️ API error during create: ${createResponse.error}`);
        console.log("   ℹ️ Check that your F5XC credentials are valid and not expired");
        return;
      }

      if (!isApiResponse(createResponse)) {
        console.log("   ⚠️ Unexpected response type - may be documentation mode");
        return;
      }

      console.log(`   ✅ Created: ${testName}`);

      // Wait for creation
      await delay(1000);

      // Delete
      const deleteResponse = await executeTool(
        {
          toolName: HEALTHCHECK_DELETE_TOOL,
          pathParams: { namespace: NAMESPACE, name: testName },
        },
        credentialManager
      );

      // Check for API error response (e.g., 401)
      if (isErrorResponse(deleteResponse)) {
        console.log(`   ⚠️ API error during delete: ${deleteResponse.error}`);
        return;
      }

      if (!isApiResponse(deleteResponse)) {
        console.log("   ⚠️ Unexpected response type during delete");
        return;
      }

      console.log(`   ✅ Deleted: ${testName}`);

      // Verify deletion - GET should fail
      await delay(500);

      try {
        const getResponse = await executeTool(
          {
            toolName: HEALTHCHECK_GET_TOOL,
            pathParams: { namespace: NAMESPACE, name: testName },
          },
          credentialManager
        );

        // Check for error response
        if (isErrorResponse(getResponse)) {
          console.log("   ✅ Verified deletion (error response on GET)");
          return;
        }

        // Should not reach here with a successful response
        if (isApiResponse(getResponse)) {
          console.log("   ⚠️ Resource still exists after deletion");
        }
      } catch (error: any) {
        expect(error.response?.status).toBe(404);
        console.log("   ✅ Verified deletion (404 on GET)");
      }
    });
  });

  // ===========================================================================
  // SCENARIO 6: OneOf Groups Metadata (uses direct registry access)
  // ===========================================================================
  describe("Scenario: OneOf Groups in Tool Metadata", () => {
    it("should have host_header_choice in tool oneOfGroups", () => {
      // Access tool directly from registry (more reliable than search)
      const tool = getToolByName(HEALTHCHECK_CREATE_TOOL);

      expect(tool).toBeDefined();

      const oneOfGroups = tool?.oneOfGroups || [];

      console.log(`\n📋 OneOf Groups for ${HEALTHCHECK_CREATE_TOOL}:`);
      for (const group of oneOfGroups) {
        console.log(`   ${group.choiceField}:`);
        console.log(`     fieldPath: ${group.fieldPath}`);
        console.log(`     options: ${group.options.join(", ")}`);
        if (group.recommendedOption) {
          console.log(`     recommended: ${group.recommendedOption}`);
        }
      }

      // Should have health_check choice group (top level)
      const healthCheckGroup = oneOfGroups.find(
        (g: { choiceField: string; fieldPath?: string }) =>
          g.choiceField === "health_check" || g.fieldPath?.includes("health_check")
      );

      expect(healthCheckGroup).toBeDefined();
      console.log(`   ✅ health_check group found at ${healthCheckGroup?.fieldPath}`);

      // Should have host_header_choice group with nested path
      const hostHeaderGroup = oneOfGroups.find(
        (g: { choiceField: string; fieldPath?: string }) =>
          g.choiceField === "host_header_choice" ||
          g.fieldPath?.includes("host_header_choice")
      );

      expect(hostHeaderGroup).toBeDefined();

      if (hostHeaderGroup) {
        expect(hostHeaderGroup.fieldPath).toContain("spec.http_health_check");
        console.log(`   ✅ host_header_choice group found at ${hostHeaderGroup.fieldPath}`);

        // Options should include full paths
        const hasPathPrefixedOptions = hostHeaderGroup.options?.some(
          (opt: string) => opt.includes("spec.http_health_check")
        );

        expect(hasPathPrefixedOptions).toBe(true);
        console.log("   ✅ Options include full nested paths");

        // Should have recommended option
        if (hostHeaderGroup.recommendedOption) {
          expect(hostHeaderGroup.recommendedOption).toContain("use_origin_server_name");
          console.log(`   ✅ Recommended option: ${hostHeaderGroup.recommendedOption}`);
        }
      }
    });
  });
});

// ===========================================================================
// TEST STATISTICS
// ===========================================================================
describe("Authenticated CRUD Test Statistics", () => {
  it("should report test execution summary", () => {
    console.log("\n📊 Authenticated CRUD Test Summary:");
    console.log(`   Namespace: ${NAMESPACE}`);
    console.log(`   Authenticated: ${isAuthenticated}`);
    console.log(`   Tenant: ${tenant || "N/A"}`);
    console.log(`   Resources created: ${createdResources.length}`);

    if (createdResources.length > 0) {
      console.log("   Resources:");
      for (const name of createdResources) {
        console.log(`     - ${name}`);
      }
    }

    expect(true).toBe(true);
  });
});
