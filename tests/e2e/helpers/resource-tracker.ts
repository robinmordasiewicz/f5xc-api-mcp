/**
 * Resource Tracker for E2E Test Cleanup
 *
 * Tracks created F5XC API resources and ensures cleanup in LIFO (Last In, First Out) order.
 * Handles cleanup failures gracefully and provides orphan detection.
 */

export interface TrackedResource {
  type: string; // e.g., "namespace", "http_loadbalancer", "origin_pool"
  domain: string; // e.g., "tenant_and_identity", "virtual", "waf"
  namespace: string; // F5XC namespace (e.g., "system", "default", test namespace)
  name: string; // Resource name
  createdAt: Date;
}

export interface CleanupResult {
  success: boolean;
  deleted: string[];
  failed: Array<{ resource: string; error: string }>;
  skipped: string[];
}

export class ResourceTracker {
  private resources: TrackedResource[] = [];
  private readonly maxRetries = 3;
  private readonly retryDelay = 2000; // 2 seconds

  /**
   * Track a created resource for later cleanup
   */
  track(resource: Omit<TrackedResource, "createdAt">): void {
    const tracked: TrackedResource = {
      ...resource,
      createdAt: new Date(),
    };

    this.resources.push(tracked);
    console.log(
      `📝 Tracked ${resource.domain}/${resource.type}: ${resource.namespace}/${resource.name}`
    );
  }

  /**
   * Get all tracked resources
   */
  getAll(): TrackedResource[] {
    return [...this.resources];
  }

  /**
   * Get count of tracked resources
   */
  count(): number {
    return this.resources.length;
  }

  /**
   * Clean up all tracked resources in LIFO order
   */
  async cleanupAll(httpClient: any): Promise<CleanupResult> {
    console.log(
      `\n🧹 Starting cleanup of ${this.resources.length} tracked resources...`
    );

    const result: CleanupResult = {
      success: true,
      deleted: [],
      failed: [],
      skipped: [],
    };

    // Delete in REVERSE order (LIFO)
    const resourcesToCleanup = [...this.resources].reverse();

    for (const resource of resourcesToCleanup) {
      try {
        await this.deleteResourceWithRetry(httpClient, resource);
        result.deleted.push(this.formatResourceName(resource));
        console.log(
          `✅ Deleted ${resource.domain}/${resource.type}: ${resource.namespace}/${resource.name}`
        );
      } catch (error: any) {
        // Check if resource already deleted (404)
        if (error.response?.status === 404) {
          result.skipped.push(this.formatResourceName(resource));
          console.log(
            `ℹ️  ${resource.domain}/${resource.type}: ${resource.namespace}/${resource.name} already deleted`
          );
        } else {
          result.success = false;
          result.failed.push({
            resource: this.formatResourceName(resource),
            error: error.message || String(error),
          });
          console.error(
            `❌ Failed to delete ${resource.domain}/${resource.type}: ${resource.namespace}/${resource.name}:`,
            error.message
          );
          // Continue cleanup even if one fails
        }
      }

      // Brief pause between deletions
      await this.sleep(500);
    }

    // Clear tracked resources
    this.resources = [];

    // Summary
    console.log(`\n✅ Cleanup complete:`);
    console.log(`  - Deleted: ${result.deleted.length}`);
    console.log(`  - Skipped (already deleted): ${result.skipped.length}`);
    console.log(`  - Failed: ${result.failed.length}`);

    if (result.failed.length > 0) {
      console.log(`\n⚠️  Failed deletions:`);
      result.failed.forEach((f) =>
        console.log(`  - ${f.resource}: ${f.error}`)
      );
    }

    return result;
  }

  /**
   * Delete a specific resource with retry logic
   */
  private async deleteResourceWithRetry(
    httpClient: any,
    resource: TrackedResource
  ): Promise<void> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        const url = this.getDeleteUrl(resource);
        await httpClient.delete(url);

        // Wait a bit for deletion to propagate
        await this.sleep(1000);
        return;
      } catch (error: any) {
        lastError = error;

        // Don't retry 404 (already deleted)
        if (error.response?.status === 404) {
          throw error;
        }

        // Retry on other errors
        if (attempt < this.maxRetries) {
          const backoffTime = this.retryDelay * Math.pow(2, attempt - 1);
          console.log(
            `  🔄 Retry ${attempt}/${this.maxRetries} for ${resource.type}/${resource.name} after ${backoffTime}ms`
          );
          await this.sleep(backoffTime);
        }
      }
    }

    throw lastError!;
  }

  /**
   * Get API delete URL for a resource
   */
  private getDeleteUrl(resource: TrackedResource): string {
    // Special handling for namespaces (not namespaced themselves)
    if (resource.type === "namespace") {
      return `/api/web/namespaces/${resource.name}`;
    }

    // Map resource types to API endpoints
    const typeToEndpoint: Record<string, string> = {
      http_loadbalancer: "http_loadbalancers",
      tcp_loadbalancer: "tcp_loadbalancers",
      origin_pool: "origin_pools",
      app_firewall: "app_firewalls",
      service_policy: "service_policys",
      dns_zone: "dns_zones",
      certificate: "certificates",
      virtual_network: "virtual_networks",
      // Add more as needed
    };

    const endpoint = typeToEndpoint[resource.type] || `${resource.type}s`;

    // Most resources are namespaced
    return `/api/config/namespaces/${resource.namespace}/${endpoint}/${resource.name}`;
  }

  /**
   * Format resource name for display
   */
  private formatResourceName(resource: TrackedResource): string {
    return `${resource.domain}/${resource.type}/${resource.namespace}/${resource.name}`;
  }

  /**
   * Sleep utility
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Clear all tracked resources (without deleting)
   */
  clear(): void {
    this.resources = [];
  }

  /**
   * Get resources older than specified duration
   */
  getOrphans(olderThanMs: number = 24 * 60 * 60 * 1000): TrackedResource[] {
    const cutoff = new Date(Date.now() - olderThanMs);
    return this.resources.filter((r) => r.createdAt < cutoff);
  }
}
