/**
 * Test Data Generator
 *
 * Generates unique, collision-free test resource names and configurations.
 * Ensures test isolation and easy identification of test resources.
 */

/**
 * Generate unique test resource name with timestamp and random component
 *
 * @param prefix - Resource type prefix (e.g., "namespace", "lb", "pool")
 * @returns Unique resource name in format: e2e-test-{prefix}-{timestamp}-{random}
 *
 * @example
 * generateTestResourceName("namespace") // "e2e-test-namespace-1736697600000-k3x9"
 * generateTestResourceName("lb") // "e2e-test-lb-1736697600123-m7p2"
 */
export function generateTestResourceName(prefix: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 6);
  return `e2e-test-${prefix}-${timestamp}-${random}`;
}

/**
 * Check if a resource name is a test resource
 *
 * @param name - Resource name to check
 * @returns True if name matches test resource pattern
 */
export function isTestResource(name: string): boolean {
  return name.startsWith("e2e-test-");
}

/**
 * Extract timestamp from test resource name
 *
 * @param name - Test resource name
 * @returns Timestamp or null if not a valid test resource name
 */
export function extractTimestamp(name: string): number | null {
  const match = name.match(/e2e-test-[^-]+-(\d+)-/);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * Get age of test resource in milliseconds
 *
 * @param name - Test resource name
 * @returns Age in milliseconds or null if invalid
 */
export function getResourceAge(name: string): number | null {
  const timestamp = extractTimestamp(name);
  return timestamp ? Date.now() - timestamp : null;
}

/**
 * Test metadata labels to attach to all test resources
 */
export const TEST_METADATA_LABELS = {
  "test-suite": "e2e-workflows",
  "test-run-id": process.env.TEST_RUN_ID || "local",
  "created-by": "vitest",
  "cleanup-eligible": "true",
};

/**
 * Apply test metadata to resource configuration
 *
 * @param config - Resource configuration object
 * @returns Configuration with test metadata labels added
 */
export function applyTestMetadata<T extends { metadata?: any }>(config: T): T {
  return {
    ...config,
    metadata: {
      ...config.metadata,
      labels: {
        ...config.metadata?.labels,
        ...TEST_METADATA_LABELS,
      },
    },
  };
}

/**
 * Test backend servers (TEST-NET addresses from RFC 5737)
 * These are reserved for documentation and won't route
 */
export const TEST_BACKEND_IPS = [
  "192.0.2.1", // TEST-NET-1
  "192.0.2.2",
  "198.51.100.1", // TEST-NET-2
  "198.51.100.2",
  "203.0.113.1", // TEST-NET-3
  "203.0.113.2",
];

/**
 * Generate test origin pool configuration
 *
 * @param poolName - Pool name
 * @param namespace - F5XC namespace
 * @param options - Optional configuration
 * @returns Origin pool configuration
 */
export function generateOriginPoolConfig(
  poolName: string,
  namespace: string,
  options?: {
    port?: number;
    backendCount?: number;
    healthCheck?: boolean;
  }
): any {
  const port = options?.port || 80;
  const backendCount = options?.backendCount || 2;
  const healthCheck = options?.healthCheck ?? false;

  const originServers = TEST_BACKEND_IPS.slice(0, backendCount).map((ip) => ({
    public_ip: { ip },
    labels: {},
  }));

  const config: any = {
    metadata: {
      name: poolName,
      namespace,
    },
    spec: {
      origin_servers: originServers,
      port,
      loadbalancer_algorithm: "ROUND_ROBIN",
    },
  };

  if (healthCheck) {
    config.spec.healthcheck = [
      {
        timeout: 3,
        interval: 15,
        unhealthy_threshold: 2,
        healthy_threshold: 2,
        http_health_check: {
          use_origin_server_name: {},
          path: "/health",
        },
      },
    ];
  }

  return applyTestMetadata(config);
}

/**
 * Generate test HTTP load balancer configuration
 *
 * @param lbName - Load balancer name
 * @param namespace - F5XC namespace
 * @param poolName - Origin pool name to reference
 * @param options - Optional configuration
 * @returns HTTP load balancer configuration
 */
export function generateHttpLoadBalancerConfig(
  lbName: string,
  namespace: string,
  poolName: string,
  options?: {
    domain?: string;
    port?: number;
  }
): any {
  const domain = options?.domain || `${lbName}.example.com`;
  const port = options?.port || 80;

  const config = {
    metadata: {
      name: lbName,
      namespace,
    },
    spec: {
      domains: [domain],
      http: {
        dns_volterra_managed: true,
        port,
      },
      advertise_on_public_default_vip: {},
      default_route_pools: [
        {
          pool: {
            namespace,
            name: poolName,
          },
          weight: 1,
          priority: 1,
        },
      ],
    },
  };

  return applyTestMetadata(config);
}

/**
 * Generate test namespace configuration
 *
 * @param namespaceName - Namespace name
 * @returns Namespace configuration
 */
export function generateNamespaceConfig(namespaceName: string): any {
  return applyTestMetadata({
    metadata: {
      name: namespaceName,
    },
  });
}

/**
 * Delay utility for sequential operations
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
