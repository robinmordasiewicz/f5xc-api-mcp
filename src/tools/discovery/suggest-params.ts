// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Parameter Suggestion Module
 *
 * Provides pre-built example payloads for common F5XC API operations
 * to help AI assistants construct correct request bodies without guessing.
 *
 * Enhanced with schema-based generation and smart defaults fallback.
 */

import { getToolByName } from "../registry.js";
import {
  getMinimumConfiguration,
  getRequiredFields,
  getMutuallyExclusiveFields,
  generateSmartExamplePayload,
  type MinimumConfiguration,
  type MutuallyExclusiveGroup,
} from "./schema.js";

/**
 * Extended suggestion result with rich metadata
 */
export interface SuggestionResult {
  /** The example payload to use */
  examplePayload: Record<string, unknown>;
  /** Human-readable description */
  description: string;
  /** Source of the example */
  source: "curated" | "spec" | "generated";
  /** Required fields that must be provided */
  requiredFields?: string[];
  /** Mutually exclusive field groups */
  mutuallyExclusiveGroups?: MutuallyExclusiveGroup[];
  /** Usage notes and tips */
  notes?: string[];
  /** cURL example if available */
  curlExample?: string;
  /** YAML example if available */
  yamlExample?: string;
}

/**
 * Pre-defined example payloads for common F5XC operations
 * These are based on real-world usage patterns and cover the most common scenarios
 */
const COMMON_EXAMPLES: Record<string, Record<string, unknown>> = {
  // HTTP Load Balancer examples
  "f5xc-api-virtual-http-loadbalancer-create": {
    metadata: {
      name: "my-http-lb",
      namespace: "default",
      labels: {
        "ves.io/site": "aws-us-west-2",
      },
    },
    spec: {
      domains: ["example.com"],
      http: {
        port: 80,
      },
      routes: [
        {
          match: {
            http_method: "ANY",
          },
          route: {
            destinations: [
              {
                host: "backend.example.com",
                port: 80,
              },
            ],
          },
        },
      ],
    },
  },

  // Origin Pool examples
  "f5xc-api-virtual-origin-pool-create": {
    metadata: {
      name: "my-origin-pool",
      namespace: "default",
    },
    spec: {
      origins: [
        {
          public_name: {
            dns_name: "backend.example.com",
          },
          port: 80,
          method: "GET",
        },
      ],
      healthcheck: [
        {
          name: "default-health-check",
          http_health_check: {
            use_http_path: "/health",
            use_http_port: 80,
            expected_status_codes: ["200"],
          },
        },
      ],
    },
  },

  // TCP Load Balancer examples
  "f5xc-api-virtual-tcp-loadbalancer-create": {
    metadata: {
      name: "my-tcp-lb",
      namespace: "default",
    },
    spec: {
      listen_port: 3306,
      tcp: {
        port: 3306,
      },
      routes: [
        {
          match: {
            any: true,
          },
          route: {
            destinations: [
              {
                host: "mysql.example.com",
                port: 3306,
              },
            ],
          },
        },
      ],
    },
  },

  // DNS Zone examples
  "f5xc-api-dns-zone-create": {
    metadata: {
      name: "example-com-zone",
      namespace: "system",
    },
    spec: {
      primary: {
        allowed_sig_ips: [],
        default_soa_parameters: {
          refresh: 86400,
          retry: 7200,
          expire: 3600000,
          negative_ttl: 300,
          ttl: 3600,
        },
        default_ttl: 3600,
      },
      zone_name: "example.com",
    },
  },

  // DNS Load Balancer examples
  "f5xc-api-dns-load-balancer-create": {
    metadata: {
      name: "my-dns-lb",
      namespace: "system",
    },
    spec: {
      dns_lb_type: "DNS_LB_TYPE_ROUND_ROBIN",
      dns_policy: {
        rules: [
          {
            rule_name: "default-rule",
            rule_type: "DNS_LB_RULE_TYPE_STATIC",
            static_route: {
              destinations: [
                {
                  ip: "192.168.1.100",
                  port: 80,
                },
              ],
            },
          },
        ],
      },
    },
  },

  // Certificate examples
  "f5xc-api-certificates-certificate-create": {
    metadata: {
      name: "my-certificate",
      namespace: "system",
    },
    spec: {
      certificate_url: {
        url: "string:///<base64-encoded-certificate>",
      },
      private_key: {
        blindfold_secret_info: {
          location: "string:///<base64-encoded-private-key>",
        },
      },
    },
  },

  // Namespace examples
  "f5xc-api-system-namespace-create": {
    metadata: {
      name: "my-namespace",
      namespace: "system",
    },
    spec: {},
  },

  // WAF Policy examples
  "f5xc-api-app-firewall-policy-create": {
    metadata: {
      name: "my-waf-policy",
      namespace: "default",
    },
    spec: {
      blocking: true,
      default_action: {
        deny: {},
      },
      enforcement_mode: "ENFORCEMENT_MODE_ACTIVE",
    },
  },

  // Service Policy examples
  "f5xc-api-network-security-service-policy-create": {
    metadata: {
      name: "my-service-policy",
      namespace: "default",
    },
    spec: {
      algo: "FIRST_MATCH",
      any_server: {},
      rule_list: {
        rules: [
          {
            metadata: {
              name: "allow-internal",
            },
            spec: {
              action: "ALLOW",
              any_client: {},
              label_matcher: {
                keys: ["app"],
              },
            },
          },
        ],
      },
    },
  },

  // Network Firewall examples
  "f5xc-api-network-security-network-firewall-create": {
    metadata: {
      name: "my-network-firewall",
      namespace: "system",
    },
    spec: {
      active_service_policies: {
        policies: [
          {
            name: "my-service-policy",
            namespace: "default",
          },
        ],
      },
    },
  },

  // Rate Limiter examples
  "f5xc-api-rate-limiting-rate-limiter-create": {
    metadata: {
      name: "my-rate-limiter",
      namespace: "default",
    },
    spec: {
      limits: [
        {
          total_number: 100,
          unit: "MINUTE",
        },
      ],
    },
  },
};

/**
 * Get suggested parameters for a tool with fallback chain
 *
 * Priority order:
 * 1. x-f5xc-minimum-configuration.example_json (from spec)
 * 2. COMMON_EXAMPLES (curated)
 * 3. Schema-generated with smart defaults
 *
 * @param toolName - The exact tool name
 * @returns Suggested parameters with metadata or null if unavailable
 */
export function suggestParameters(toolName: string): SuggestionResult | null {
  const tool = getToolByName(toolName);

  if (!tool) {
    return null;
  }

  // Collect metadata that applies to all sources
  const requiredFields = getRequiredFields(toolName);
  const mutuallyExclusiveGroups = getMutuallyExclusiveFields(toolName);

  // Priority 1: Check for x-f5xc-minimum-configuration example
  const minConfig = getMinimumConfiguration(toolName);
  if (minConfig?.example_json) {
    try {
      const payload = JSON.parse(minConfig.example_json) as Record<string, unknown>;
      return {
        examplePayload: payload,
        description:
          minConfig.description || `Example payload for ${tool.resource} ${tool.operation}`,
        source: "spec",
        requiredFields: requiredFields.length > 0 ? requiredFields : undefined,
        mutuallyExclusiveGroups:
          mutuallyExclusiveGroups.length > 0 ? mutuallyExclusiveGroups : undefined,
        notes: buildNotesFromMinConfig(minConfig),
        curlExample: minConfig.example_curl,
        yamlExample: minConfig.example_yaml,
      };
    } catch {
      // Invalid JSON, fall through to next source
    }
  }

  // Priority 2: Check for curated example
  const curatedExample = COMMON_EXAMPLES[toolName];
  if (curatedExample) {
    return {
      examplePayload: JSON.parse(JSON.stringify(curatedExample)), // Deep copy
      description: `Curated example payload for ${tool.resource} ${tool.operation}`,
      source: "curated",
      requiredFields: requiredFields.length > 0 ? requiredFields : undefined,
      mutuallyExclusiveGroups:
        mutuallyExclusiveGroups.length > 0 ? mutuallyExclusiveGroups : undefined,
      notes: [
        "This is a complete, working example based on common usage patterns",
        "Modify the values to match your specific requirements",
        "Required fields are already included",
      ],
    };
  }

  // Priority 3: Generate from schema with smart defaults
  const generatedPayload = generateSmartExamplePayload(toolName);
  if (generatedPayload) {
    return {
      examplePayload: generatedPayload,
      description: `Auto-generated example payload for ${tool.resource} ${tool.operation}`,
      source: "generated",
      requiredFields: requiredFields.length > 0 ? requiredFields : undefined,
      mutuallyExclusiveGroups:
        mutuallyExclusiveGroups.length > 0 ? mutuallyExclusiveGroups : undefined,
      notes: [
        "This example was auto-generated from the schema",
        "Review and modify values before using in production",
        "Some nested objects may need additional configuration",
      ],
    };
  }

  return null;
}

/**
 * Build usage notes from minimum configuration
 */
function buildNotesFromMinConfig(minConfig: MinimumConfiguration): string[] {
  const notes: string[] = [];

  if (minConfig.description) {
    notes.push(minConfig.description);
  }

  if (minConfig.required_fields && minConfig.required_fields.length > 0) {
    notes.push(`Required fields: ${minConfig.required_fields.join(", ")}`);
  }

  if (minConfig.mutually_exclusive_groups && minConfig.mutually_exclusive_groups.length > 0) {
    for (const group of minConfig.mutually_exclusive_groups) {
      notes.push(`Mutually exclusive: ${group.fields.join(" OR ")} - ${group.reason}`);
    }
  }

  if (notes.length === 0) {
    notes.push("Example from official F5XC API specification");
  }

  return notes;
}

/**
 * Get suggested parameters (legacy interface for backward compatibility)
 *
 * @deprecated Use suggestParameters() for richer metadata
 */
export function suggestParametersLegacy(toolName: string): {
  examplePayload: Record<string, unknown>;
  description: string;
  notes?: string[];
} | null {
  const result = suggestParameters(toolName);
  if (!result) {
    return null;
  }

  return {
    examplePayload: result.examplePayload,
    description: result.description,
    notes: result.notes,
  };
}

/**
 * Get all available example tools (curated only)
 *
 * @returns List of tool names that have curated pre-built examples
 */
export function getAvailableExamples(): string[] {
  return Object.keys(COMMON_EXAMPLES);
}

/**
 * Check if a tool has suggested parameters (from any source)
 *
 * @param toolName - The exact tool name
 * @returns True if examples are available from any source
 */
export function hasSuggestedParameters(toolName: string): boolean {
  // Check curated examples first (fastest)
  if (toolName in COMMON_EXAMPLES) {
    return true;
  }

  // Check if tool has a request body schema (can generate)
  const tool = getToolByName(toolName);
  if (tool?.requestBodySchema) {
    return true;
  }

  return false;
}

/**
 * Check if a tool has curated examples (not generated)
 *
 * @param toolName - The exact tool name
 * @returns True if curated examples exist
 */
export function hasCuratedExample(toolName: string): boolean {
  return toolName in COMMON_EXAMPLES;
}

/**
 * Get suggestion source for a tool
 *
 * @param toolName - The exact tool name
 * @returns Source type or null if no suggestions available
 */
export function getSuggestionSource(toolName: string): "curated" | "spec" | "generated" | null {
  // Check minimum configuration first
  const minConfig = getMinimumConfiguration(toolName);
  if (minConfig?.example_json) {
    return "spec";
  }

  // Check curated examples
  if (toolName in COMMON_EXAMPLES) {
    return "curated";
  }

  // Check if can generate
  const tool = getToolByName(toolName);
  if (tool?.requestBodySchema) {
    return "generated";
  }

  return null;
}

/**
 * Get statistics about available suggestions
 */
export function getSuggestionStats(): {
  curatedCount: number;
  curatedTools: string[];
} {
  const curatedTools = Object.keys(COMMON_EXAMPLES);
  return {
    curatedCount: curatedTools.length,
    curatedTools,
  };
}
