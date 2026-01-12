/**
 * HTTP Load Balancer E2E Workflow Test
 *
 * Tests complete HTTP load balancer setup workflow:
 * 1. Create namespace
 * 2. Create origin pool
 * 3. Create HTTP load balancer
 * 4. Verify operational status
 * 5. Cleanup resources (LIFO order)
 *
 * This validates the most common F5XC usage pattern.
 */

import { describe, it, expect, beforeAll, afterEach } from "vitest";
import { CredentialManager } from "@robinmordasiewicz/f5xc-auth";
import axios, { AxiosInstance } from "axios";
import { ResourceTracker } from "../helpers/resource-tracker";
import {
  generateTestResourceName,
  generateNamespaceConfig,
  generateOriginPoolConfig,
  generateHttpLoadBalancerConfig,
  delay,
} from "../helpers/test-data-generator";
import { waitForResourceReady } from "../helpers/validation-helpers";

let httpClient: AxiosInstance;
let resourceTracker: ResourceTracker;

beforeAll(async () => {
  const credentialManager = new CredentialManager();
  await credentialManager.initialize();

  if (!credentialManager.isAuthenticated()) {
    throw new Error("Authentication required for E2E tests");
  }

  httpClient = axios.create({
    baseURL: credentialManager.getApiUrl(),
    headers: {
      Authorization: `APIToken ${credentialManager.getToken()}`,
      "Content-Type": "application/json",
    },
    timeout: 30000,
  });

  resourceTracker = new ResourceTracker();
});

afterEach(async () => {
  await resourceTracker.cleanupAll(httpClient);
}, 120000);

describe("HTTP Load Balancer E2E Workflow", () => {
  it(
    "should complete full HTTP load balancer workflow",
    async () => {
      // Step 1: Create namespace
      const namespaceName = generateTestResourceName("namespace");
      const namespaceConfig = generateNamespaceConfig(namespaceName);

      const nsResponse = await httpClient.post("/api/web/namespaces", namespaceConfig);
      expect(nsResponse.status).toBeGreaterThanOrEqual(200);
      expect(nsResponse.status).toBeLessThan(300);

      resourceTracker.track({
        type: "namespace",
        domain: "tenant_and_identity",
        namespace: "system",
        name: namespaceName,
      });

      await delay(2000);

      // Step 2: Create origin pool
      const poolName = generateTestResourceName("pool");
      const poolConfig = generateOriginPoolConfig(poolName, namespaceName, {
        port: 80,
        backendCount: 2,
        healthCheck: true,
      });

      const poolResponse = await httpClient.post(
        `/api/config/namespaces/${namespaceName}/origin_pools`,
        poolConfig
      );
      expect(poolResponse.status).toBeGreaterThanOrEqual(200);
      expect(poolResponse.status).toBeLessThan(300);

      resourceTracker.track({
        type: "origin_pool",
        domain: "virtual",
        namespace: namespaceName,
        name: poolName,
      });

      await delay(2000);

      // Step 3: Create HTTP load balancer
      const lbName = generateTestResourceName("lb");
      const lbConfig = generateHttpLoadBalancerConfig(lbName, namespaceName, poolName, {
        domain: `${lbName}.example.com`,
        port: 80,
      });

      const lbResponse = await httpClient.post(
        `/api/config/namespaces/${namespaceName}/http_loadbalancers`,
        lbConfig
      );
      expect(lbResponse.status).toBeGreaterThanOrEqual(200);
      expect(lbResponse.status).toBeLessThan(300);

      resourceTracker.track({
        type: "http_loadbalancer",
        domain: "virtual",
        namespace: namespaceName,
        name: lbName,
      });

      // Step 4: Verify load balancer is operational
      const lbUrl = `/api/config/namespaces/${namespaceName}/http_loadbalancers/${lbName}`;
      const readyResult = await waitForResourceReady(httpClient, lbUrl, {
        maxAttempts: 20,
        interval: 3000,
      });

      expect(readyResult.success).toBe(true);

      console.log("\n✅ HTTP Load Balancer workflow complete!");
      console.log(`  - Namespace: ${namespaceName}`);
      console.log(`  - Origin Pool: ${poolName}`);
      console.log(`  - Load Balancer: ${lbName}`);
      console.log(`  - Ready in: ${Math.round(readyResult.duration / 1000)}s\n`);
    },
    { timeout: 180000 }
  );
});
