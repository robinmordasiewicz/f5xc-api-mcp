/**
 * MCP Resource Handlers
 *
 * Implements resource read handlers for F5XC configuration objects.
 * Supports both documentation mode (returns schema info) and
 * execution mode (fetches actual resource data).
 */

import {
  parseResourceUri,
  getResourceType,
  buildApiPath,
  RESOURCE_TYPES,
  ResourceType,
} from "./templates.js";
import { CredentialManager, AuthMode } from "../auth/credential-manager.js";
import { HttpClient } from "../auth/http-client.js";
import { logger } from "../utils/logging.js";
import { F5XCApiError } from "../utils/error-handling.js";

/**
 * Resource read result
 */
export interface ResourceReadResult {
  /** Resource URI */
  uri: string;
  /** MIME type of content */
  mimeType: string;
  /** Resource content */
  content: string;
  /** Whether this is documentation or actual data */
  mode: "documentation" | "execution";
}

/**
 * Resource documentation (for unauthenticated mode)
 */
export interface ResourceDocumentation {
  /** Resource URI */
  uri: string;
  /** Resource type information */
  resourceType: ResourceType;
  /** API path for this resource */
  apiPath: string;
  /** Example resource structure */
  exampleResource: Record<string, unknown>;
  /** f5xcctl command to get this resource */
  f5xcctlCommand: string;
  /** Terraform data source */
  terraformDataSource: string;
  /** Related resources */
  relatedResources: string[];
}

/**
 * Generate example resource structure based on type
 */
function generateExampleResource(
  resourceType: string,
  namespace: string,
  name: string
): Record<string, unknown> {
  const baseMetadata = {
    name,
    namespace,
    labels: {},
    annotations: {},
    description: `Example ${resourceType}`,
  };

  switch (resourceType) {
    case "http_loadbalancer":
      return {
        metadata: baseMetadata,
        spec: {
          domains: ["app.example.com"],
          http: {
            dns_volterra_managed: true,
          },
          default_route_pools: [
            {
              pool: {
                tenant: "your-tenant",
                namespace,
                name: "example-origin-pool",
              },
              weight: 1,
            },
          ],
          advertise_on_public_default_vip: {},
        },
        system_metadata: {
          creation_timestamp: "2024-01-01T00:00:00Z",
          modification_timestamp: "2024-01-01T00:00:00Z",
        },
      };

    case "origin_pool":
      return {
        metadata: baseMetadata,
        spec: {
          origin_servers: [
            {
              public_ip: {
                ip: "10.0.0.1",
              },
            },
          ],
          port: 80,
          no_tls: {},
          endpoint_selection: "LOCAL_PREFERRED",
          loadbalancer_algorithm: "ROUND_ROBIN",
        },
        system_metadata: {
          creation_timestamp: "2024-01-01T00:00:00Z",
        },
      };

    case "dns_zone":
      return {
        metadata: baseMetadata,
        spec: {
          primary: {
            soa_parameters: {
              refresh: 3600,
              retry: 600,
              expire: 604800,
              negative_ttl: 1800,
            },
            default_rr_set_group: [],
          },
        },
        system_metadata: {
          creation_timestamp: "2024-01-01T00:00:00Z",
        },
      };

    case "app_firewall":
      return {
        metadata: baseMetadata,
        spec: {
          detection_settings: {
            signature_selection_setting: {
              default_attack_type_settings: {},
              high_medium_accuracy_signatures: {},
            },
            enable_suppression: {},
            enable_threat_campaigns: {},
          },
          bot_protection_setting: {
            malicious_bot_action: "BLOCK",
            suspicious_bot_action: "REPORT",
            good_bot_action: "REPORT",
          },
        },
        system_metadata: {
          creation_timestamp: "2024-01-01T00:00:00Z",
        },
      };

    default:
      return {
        metadata: baseMetadata,
        spec: {},
        system_metadata: {
          creation_timestamp: "2024-01-01T00:00:00Z",
        },
      };
  }
}

/**
 * Generate f5xcctl command for resource
 */
function generateF5xcctlCommand(
  resourceType: string,
  namespace: string,
  name: string
): string {
  const rt = resourceType.replace(/-/g, "_");
  return `f5xcctl get ${rt} ${name} -n ${namespace} -o yaml`;
}

/**
 * Generate Terraform data source
 */
function generateTerraformDataSource(
  resourceType: string,
  namespace: string,
  name: string
): string {
  const tfResource = `volterra_${resourceType.replace(/-/g, "_")}`;
  return `data "${tfResource}" "example" {
  name      = "${name}"
  namespace = "${namespace}"
}`;
}

/**
 * Build documentation response for a resource
 */
function buildDocumentationResponse(
  uri: string,
  _tenant: string,
  namespace: string,
  resourceType: string,
  name: string
): ResourceDocumentation {
  const rt = getResourceType(resourceType);

  if (!rt) {
    throw new F5XCApiError(`Unknown resource type: ${resourceType}`, 400);
  }

  const apiPath = buildApiPath(resourceType, namespace, name);

  return {
    uri,
    resourceType: rt,
    apiPath: apiPath ?? "",
    exampleResource: generateExampleResource(resourceType, namespace, name),
    f5xcctlCommand: generateF5xcctlCommand(resourceType, namespace, name),
    terraformDataSource: generateTerraformDataSource(resourceType, namespace, name),
    relatedResources: rt.relatedResources ?? [],
  };
}

/**
 * Resource Handler class
 */
export class ResourceHandler {
  private credentialManager: CredentialManager;
  private httpClient: HttpClient | null;

  constructor(
    credentialManager: CredentialManager,
    httpClient: HttpClient | null
  ) {
    this.credentialManager = credentialManager;
    this.httpClient = httpClient;
  }

  /**
   * Read a resource by URI
   */
  async readResource(uri: string): Promise<ResourceReadResult> {
    const parsed = parseResourceUri(uri);

    if (!parsed) {
      throw new F5XCApiError(`Invalid resource URI: ${uri}`, 400);
    }

    const { tenant, namespace, resourceType, name } = parsed;

    // Check if resource type is valid
    const rt = getResourceType(resourceType);
    if (!rt) {
      throw new F5XCApiError(`Unknown resource type: ${resourceType}`, 400);
    }

    // Documentation mode - return schema and examples
    if (this.credentialManager.getAuthMode() === AuthMode.NONE || !this.httpClient) {
      const doc = buildDocumentationResponse(uri, tenant, namespace, resourceType, name);

      return {
        uri,
        mimeType: "application/json",
        content: JSON.stringify(doc, null, 2),
        mode: "documentation",
      };
    }

    // Execution mode - fetch actual resource
    const apiPath = buildApiPath(resourceType, namespace, name);

    if (!apiPath) {
      throw new F5XCApiError(`Cannot build API path for: ${uri}`, 400);
    }

    try {
      const response = await this.httpClient.get(apiPath);

      return {
        uri,
        mimeType: "application/json",
        content: JSON.stringify(response.data, null, 2),
        mode: "execution",
      };
    } catch (error) {
      logger.error(`Failed to read resource: ${uri}`, {
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  /**
   * List available resource templates
   */
  listResourceTemplates(): Array<{
    uriTemplate: string;
    name: string;
    description: string;
    mimeType: string;
  }> {
    const tenant = this.credentialManager.getTenant() ?? "{tenant}";

    return Object.values(RESOURCE_TYPES).map((rt) => ({
      uriTemplate: rt.namespaceScoped
        ? `f5xc://${tenant}/{namespace}/${rt.type}/{name}`
        : `f5xc://${tenant}/system/${rt.type}/{name}`,
      name: rt.name,
      description: rt.description,
      mimeType: "application/json",
    }));
  }

  /**
   * List resources of a specific type in a namespace
   */
  async listResources(
    namespace: string,
    resourceType: string
  ): Promise<ResourceReadResult> {
    const rt = getResourceType(resourceType);

    if (!rt) {
      throw new F5XCApiError(`Unknown resource type: ${resourceType}`, 400);
    }

    const tenant = this.credentialManager.getTenant() ?? "unknown";
    const uri = `f5xc://${tenant}/${namespace}/${resourceType}`;

    // Documentation mode
    if (this.credentialManager.getAuthMode() === AuthMode.NONE || !this.httpClient) {
      const doc = {
        uri,
        resourceType: rt,
        apiPath: buildApiPath(resourceType, namespace),
        note: "In documentation mode. Provide F5XC credentials to list actual resources.",
        f5xcctlCommand: `f5xcctl get ${resourceType.replace(/-/g, "_")}s -n ${namespace}`,
      };

      return {
        uri,
        mimeType: "application/json",
        content: JSON.stringify(doc, null, 2),
        mode: "documentation",
      };
    }

    // Execution mode - list resources
    const apiPath = buildApiPath(resourceType, namespace);

    if (!apiPath) {
      throw new F5XCApiError(`Cannot build API path for listing: ${resourceType}`, 400);
    }

    try {
      const response = await this.httpClient.get(apiPath);

      return {
        uri,
        mimeType: "application/json",
        content: JSON.stringify(response.data, null, 2),
        mode: "execution",
      };
    } catch (error) {
      logger.error(`Failed to list resources: ${resourceType}`, {
        namespace,
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }
}

/**
 * Create resource handler
 */
export function createResourceHandler(
  credentialManager: CredentialManager,
  httpClient: HttpClient | null
): ResourceHandler {
  return new ResourceHandler(credentialManager, httpClient);
}
