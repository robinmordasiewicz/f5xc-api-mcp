/**
 * Best Practices Discovery
 *
 * Generates domain-specific best practices from tool metadata including:
 * - Common errors and resolutions
 * - Danger level analysis
 * - Recommended workflows
 * - Security considerations
 */

import { getToolIndex } from "./index-loader.js";
import { getResourcesInDomain, getAllDependencyDomains } from "./dependencies.js";

/**
 * Common error pattern with resolution guidance
 */
export interface CommonError {
  /** HTTP status code */
  statusCode: number;
  /** Error type/category */
  errorType: string;
  /** Error description */
  description: string;
  /** Resolution steps */
  resolution: string[];
  /** Related tools for diagnosis */
  relatedTools?: string[];
}

/**
 * Danger level summary for a domain
 */
export interface DangerAnalysis {
  /** Number of low-danger operations */
  low: number;
  /** Number of medium-danger operations */
  medium: number;
  /** Number of high-danger operations */
  high: number;
  /** High-danger tool names for reference */
  highDangerTools: string[];
  /** Percentage of safe (low/medium) operations */
  safePercentage: number;
}

/**
 * Recommended workflow for common operations
 */
export interface RecommendedWorkflow {
  /** Workflow name */
  name: string;
  /** Workflow description */
  description: string;
  /** Ordered steps */
  steps: Array<{
    stepNumber: number;
    action: string;
    toolName?: string;
    note?: string;
  }>;
  /** Prerequisites */
  prerequisites?: string[];
  /** Estimated complexity */
  complexity: "low" | "medium" | "high";
}

/**
 * Domain-specific best practices
 */
export interface DomainBestPractices {
  /** Domain name */
  domain: string;
  /** Display name for the domain */
  displayName: string;
  /** Domain description */
  description: string;
  /** Total tools in domain */
  totalTools: number;
  /** Operation breakdown */
  operations: {
    create: number;
    get: number;
    list: number;
    update: number;
    delete: number;
    other: number;
  };
  /** Danger level analysis */
  dangerAnalysis: DangerAnalysis;
  /** Common errors in this domain */
  commonErrors: CommonError[];
  /** Recommended workflows */
  workflows: RecommendedWorkflow[];
  /** Security considerations */
  securityNotes: string[];
  /** Performance tips */
  performanceTips: string[];
}

/**
 * Query parameters for best practices
 */
export interface BestPracticesQuery {
  /** Domain to query */
  domain?: string;
  /** Specific aspect to retrieve */
  aspect?: "errors" | "workflows" | "danger" | "security" | "performance" | "all";
  /** Include detailed breakdowns */
  detailed?: boolean;
}

/**
 * Best practices query result
 */
export interface BestPracticesResult {
  /** Whether query was successful */
  success: boolean;
  /** Domain-specific best practices */
  practices?: DomainBestPractices;
  /** Available domains if no domain specified */
  availableDomains?: string[];
  /** Error message if failed */
  error?: string;
}

/**
 * Domain display names and descriptions
 */
const DOMAIN_INFO: Record<string, { displayName: string; description: string }> = {
  virtual: {
    displayName: "Virtual Services (WAAP)",
    description: "HTTP load balancers, origin pools, and web application protection",
  },
  network: {
    displayName: "Network Infrastructure",
    description: "Network policies, cloud connectors, and routing configuration",
  },
  dns: {
    displayName: "DNS Management",
    description: "DNS zones, records, and domain management",
  },
  certificates: {
    displayName: "Certificate Management",
    description: "TLS certificates, CA management, and certificate lifecycle",
  },
  waf: {
    displayName: "Web Application Firewall",
    description: "WAF policies, rule sets, and security configurations",
  },
  sites: {
    displayName: "Site Management",
    description: "F5XC site deployment and configuration across cloud providers",
  },
  api: {
    displayName: "API Security",
    description: "API definitions, discovery, and protection policies",
  },
  bot_and_threat_defense: {
    displayName: "Bot & Threat Defense",
    description: "Bot detection, threat intelligence, and automated defense",
  },
  authentication: {
    displayName: "Authentication",
    description: "Identity providers, OIDC, and authentication policies",
  },
  users: {
    displayName: "User Management",
    description: "User accounts, roles, and access control",
  },
  tenant_and_identity: {
    displayName: "Tenant & Identity",
    description: "Tenant configuration and identity management",
  },
};

/**
 * Common errors by domain
 */
const DOMAIN_COMMON_ERRORS: Record<string, CommonError[]> = {
  virtual: [
    {
      statusCode: 404,
      errorType: "NotFound",
      description: "Origin pool or referenced resource not found",
      resolution: [
        "Verify the origin pool exists using f5xc-api-network-origin-pool-list",
        "Check namespace is correct",
        "Ensure referenced certificates exist",
      ],
      relatedTools: ["f5xc-api-network-origin-pool-list", "f5xc-api-certificates-certificate-list"],
    },
    {
      statusCode: 409,
      errorType: "Conflict",
      description: "Load balancer with same name already exists",
      resolution: [
        "Use a unique name for the load balancer",
        "Delete existing resource if replacement is intended",
        "Check for naming conflicts across namespaces",
      ],
    },
  ],
  dns: [
    {
      statusCode: 400,
      errorType: "ValidationError",
      description: "Invalid DNS record format or TTL",
      resolution: [
        "Verify record type matches the data format",
        "Check TTL is within valid range (60-86400)",
        "Ensure FQDN is properly formatted",
      ],
    },
  ],
  certificates: [
    {
      statusCode: 400,
      errorType: "CertificateError",
      description: "Invalid certificate chain or format",
      resolution: [
        "Verify certificate is in PEM format",
        "Ensure full chain is included",
        "Check certificate is not expired",
        "Verify private key matches certificate",
      ],
    },
  ],
};

/**
 * Security notes by domain
 */
const DOMAIN_SECURITY_NOTES: Record<string, string[]> = {
  virtual: [
    "Always enable WAF policies for production load balancers",
    "Use TLS 1.2 or higher for all HTTPS listeners",
    "Configure rate limiting to prevent DoS attacks",
    "Review origin pool health check configurations",
  ],
  certificates: [
    "Never expose private keys in API responses",
    "Use certificate chains for proper validation",
    "Set up certificate expiration alerts",
    "Prefer automatic certificate management when available",
  ],
  authentication: [
    "Use short-lived API tokens when possible",
    "Implement token rotation policies",
    "Audit authentication logs regularly",
    "Use certificate-based authentication for automation",
  ],
  users: [
    "Follow principle of least privilege",
    "Regularly audit user access and roles",
    "Use namespaces to isolate resources",
    "Enable MFA for console access",
  ],
};

/**
 * Performance tips by domain
 */
const DOMAIN_PERFORMANCE_TIPS: Record<string, string[]> = {
  virtual: [
    "Use appropriate health check intervals to balance detection vs overhead",
    "Configure connection pooling for origin servers",
    "Enable response caching where appropriate",
    "Use regional deployments for latency-sensitive applications",
  ],
  dns: [
    "Set appropriate TTLs based on update frequency",
    "Use ALIAS records for apex domains when possible",
    "Configure health-based routing for failover",
  ],
  sites: [
    "Pre-configure site templates for faster deployments",
    "Use site mesh groups for efficient routing",
    "Monitor site health metrics proactively",
  ],
};

/**
 * Analyze danger levels for a domain
 */
function analyzeDangerLevels(domain: string): DangerAnalysis {
  const index = getToolIndex();
  const domainTools = index.tools.filter((t) => t.domain === domain);

  const analysis: DangerAnalysis = {
    low: 0,
    medium: 0,
    high: 0,
    highDangerTools: [],
    safePercentage: 0,
  };

  for (const tool of domainTools) {
    switch (tool.dangerLevel) {
      case "low":
        analysis.low++;
        break;
      case "medium":
        analysis.medium++;
        break;
      case "high":
        analysis.high++;
        analysis.highDangerTools.push(tool.name);
        break;
    }
  }

  const total = domainTools.length;
  if (total > 0) {
    analysis.safePercentage = Math.round(((analysis.low + analysis.medium) / total) * 100);
  }

  return analysis;
}

/**
 * Count operations by type for a domain
 */
function countOperations(domain: string): DomainBestPractices["operations"] {
  const index = getToolIndex();
  const domainTools = index.tools.filter((t) => t.domain === domain);

  const ops = {
    create: 0,
    get: 0,
    list: 0,
    update: 0,
    delete: 0,
    other: 0,
  };

  for (const tool of domainTools) {
    switch (tool.operation) {
      case "create":
        ops.create++;
        break;
      case "get":
        ops.get++;
        break;
      case "list":
        ops.list++;
        break;
      case "update":
        ops.update++;
        break;
      case "delete":
        ops.delete++;
        break;
      default:
        ops.other++;
    }
  }

  return ops;
}

/**
 * Generate recommended workflows for a domain
 */
function generateWorkflows(domain: string): RecommendedWorkflow[] {
  const workflows: RecommendedWorkflow[] = [];

  // Get resources in the domain from dependency graph
  const resources = getResourcesInDomain(domain);

  // Create a basic CRUD workflow for the domain
  if (resources.length > 0) {
    workflows.push({
      name: `List ${domain} resources`,
      description: `Discover existing resources in the ${domain} domain`,
      steps: [
        {
          stepNumber: 1,
          action: "Search for list operations",
          note: `Use f5xc-api-search-tools with query '${domain} list'`,
        },
        {
          stepNumber: 2,
          action: "Execute list operation",
          note: "Provide namespace parameter to scope results",
        },
        {
          stepNumber: 3,
          action: "Review results",
          note: "Check resource metadata and dependencies",
        },
      ],
      complexity: "low",
    });
  }

  // Domain-specific workflows
  if (domain === "virtual") {
    workflows.push({
      name: "Deploy HTTP Load Balancer",
      description: "Complete workflow to deploy an HTTP load balancer with WAF protection",
      steps: [
        {
          stepNumber: 1,
          action: "Create origin pool",
          toolName: "f5xc-api-network-origin-pool-create",
        },
        {
          stepNumber: 2,
          action: "Create WAF policy (optional)",
          toolName: "f5xc-api-waf-app-firewall-create",
        },
        {
          stepNumber: 3,
          action: "Create HTTP load balancer",
          toolName: "f5xc-api-virtual-http-loadbalancer-create",
        },
        {
          stepNumber: 4,
          action: "Verify deployment",
          toolName: "f5xc-api-virtual-http-loadbalancer-get",
        },
      ],
      prerequisites: ["Certificate (if using HTTPS)", "Namespace"],
      complexity: "medium",
    });
  }

  if (domain === "dns") {
    workflows.push({
      name: "Configure DNS Zone",
      description: "Set up a DNS zone with common record types",
      steps: [
        { stepNumber: 1, action: "Create DNS zone", toolName: "f5xc-api-dns-dns-zone-create" },
        { stepNumber: 2, action: "Add A/AAAA records", note: "Create records for your services" },
        { stepNumber: 3, action: "Add CNAME records (optional)", note: "Set up aliases" },
        { stepNumber: 4, action: "Verify propagation", note: "Use dig or nslookup to verify" },
      ],
      complexity: "low",
    });
  }

  return workflows;
}

/**
 * Get best practices for a specific domain
 */
export function getDomainBestPractices(domain: string): DomainBestPractices | null {
  const index = getToolIndex();
  const domainTools = index.tools.filter((t) => t.domain === domain);

  if (domainTools.length === 0) {
    return null;
  }

  const info = DOMAIN_INFO[domain] ?? {
    displayName: domain.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    description: `Operations for ${domain} resources`,
  };

  return {
    domain,
    displayName: info.displayName,
    description: info.description,
    totalTools: domainTools.length,
    operations: countOperations(domain),
    dangerAnalysis: analyzeDangerLevels(domain),
    commonErrors: DOMAIN_COMMON_ERRORS[domain] ?? [],
    workflows: generateWorkflows(domain),
    securityNotes: DOMAIN_SECURITY_NOTES[domain] ?? [],
    performanceTips: DOMAIN_PERFORMANCE_TIPS[domain] ?? [],
  };
}

/**
 * Query best practices
 */
export function queryBestPractices(query: BestPracticesQuery): BestPracticesResult {
  // If no domain specified, return available domains
  if (!query.domain) {
    const domains = getAllDependencyDomains();
    return {
      success: true,
      availableDomains: domains,
    };
  }

  // Get best practices for specified domain
  const practices = getDomainBestPractices(query.domain);

  if (!practices) {
    return {
      success: false,
      error: `Domain '${query.domain}' not found. Use without domain parameter to see available domains.`,
    };
  }

  // Filter by aspect if specified
  if (query.aspect && query.aspect !== "all") {
    const filtered: DomainBestPractices = { ...practices };

    switch (query.aspect) {
      case "errors":
        filtered.workflows = [];
        filtered.securityNotes = [];
        filtered.performanceTips = [];
        break;
      case "workflows":
        filtered.commonErrors = [];
        filtered.securityNotes = [];
        filtered.performanceTips = [];
        break;
      case "danger":
        filtered.commonErrors = [];
        filtered.workflows = [];
        filtered.securityNotes = [];
        filtered.performanceTips = [];
        break;
      case "security":
        filtered.commonErrors = [];
        filtered.workflows = [];
        filtered.performanceTips = [];
        break;
      case "performance":
        filtered.commonErrors = [];
        filtered.workflows = [];
        filtered.securityNotes = [];
        break;
    }

    return {
      success: true,
      practices: filtered,
    };
  }

  return {
    success: true,
    practices,
  };
}

/**
 * Get summary of all domains with their danger levels
 */
export function getAllDomainsSummary(): Array<{
  domain: string;
  displayName: string;
  toolCount: number;
  dangerSummary: { safe: number; dangerous: number };
}> {
  const index = getToolIndex();
  const domains = new Map<string, { count: number; safe: number; dangerous: number }>();

  for (const tool of index.tools) {
    const existing = domains.get(tool.domain) ?? { count: 0, safe: 0, dangerous: 0 };
    existing.count++;
    if (tool.dangerLevel === "low" || tool.dangerLevel === "medium") {
      existing.safe++;
    } else {
      existing.dangerous++;
    }
    domains.set(tool.domain, existing);
  }

  return Array.from(domains.entries())
    .map(([domain, stats]) => {
      const info = DOMAIN_INFO[domain];
      return {
        domain,
        displayName:
          info?.displayName ?? domain.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        toolCount: stats.count,
        dangerSummary: { safe: stats.safe, dangerous: stats.dangerous },
      };
    })
    .sort((a, b) => b.toolCount - a.toolCount);
}

/**
 * Format best practices for human-readable output
 */
export function formatBestPractices(practices: DomainBestPractices): string {
  const lines: string[] = [];

  lines.push(`# Best Practices: ${practices.displayName}`);
  lines.push("");
  lines.push(`**Description**: ${practices.description}`);
  lines.push(`**Total Tools**: ${practices.totalTools}`);
  lines.push("");

  lines.push("## Operations");
  lines.push(`- Create: ${practices.operations.create}`);
  lines.push(`- Get: ${practices.operations.get}`);
  lines.push(`- List: ${practices.operations.list}`);
  lines.push(`- Update: ${practices.operations.update}`);
  lines.push(`- Delete: ${practices.operations.delete}`);
  lines.push("");

  lines.push("## Danger Analysis");
  lines.push(`- Safe Operations: ${practices.dangerAnalysis.safePercentage}%`);
  lines.push(`- Low: ${practices.dangerAnalysis.low}`);
  lines.push(`- Medium: ${practices.dangerAnalysis.medium}`);
  lines.push(`- High: ${practices.dangerAnalysis.high}`);
  if (practices.dangerAnalysis.highDangerTools.length > 0) {
    lines.push(
      `- High-risk tools: ${practices.dangerAnalysis.highDangerTools.slice(0, 5).join(", ")}${practices.dangerAnalysis.highDangerTools.length > 5 ? "..." : ""}`
    );
  }
  lines.push("");

  if (practices.commonErrors.length > 0) {
    lines.push("## Common Errors");
    for (const error of practices.commonErrors) {
      lines.push(`### ${error.statusCode} - ${error.errorType}`);
      lines.push(error.description);
      lines.push("**Resolution**:");
      for (const step of error.resolution) {
        lines.push(`- ${step}`);
      }
      lines.push("");
    }
  }

  if (practices.workflows.length > 0) {
    lines.push("## Recommended Workflows");
    for (const workflow of practices.workflows) {
      lines.push(`### ${workflow.name}`);
      lines.push(`*${workflow.description}* (Complexity: ${workflow.complexity})`);
      if (workflow.prerequisites && workflow.prerequisites.length > 0) {
        lines.push(`**Prerequisites**: ${workflow.prerequisites.join(", ")}`);
      }
      lines.push("**Steps**:");
      for (const step of workflow.steps) {
        const toolInfo = step.toolName ? ` (\`${step.toolName}\`)` : "";
        const noteInfo = step.note ? ` - ${step.note}` : "";
        lines.push(`${step.stepNumber}. ${step.action}${toolInfo}${noteInfo}`);
      }
      lines.push("");
    }
  }

  if (practices.securityNotes.length > 0) {
    lines.push("## Security Notes");
    for (const note of practices.securityNotes) {
      lines.push(`- ${note}`);
    }
    lines.push("");
  }

  if (practices.performanceTips.length > 0) {
    lines.push("## Performance Tips");
    for (const tip of practices.performanceTips) {
      lines.push(`- ${tip}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}
