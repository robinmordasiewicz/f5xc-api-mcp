// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

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
import {
  getDomainMetadata,
  getGuidedWorkflows,
  getHttpErrorResolution,
  getResourceErrorPatterns,
  type TroubleshootingGuide,
  type GuidedWorkflow,
} from "../../generator/domain-metadata.js";

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
  /** Troubleshooting guides from upstream CLI metadata (v2.0.5+) */
  troubleshootingGuides?: TroubleshootingGuide[];
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
 * Get domain display info from upstream metadata
 * Falls back to formatted domain name if not available
 */
function getDomainDisplayInfo(domain: string): { displayName: string; description: string } {
  const meta = getDomainMetadata(domain);
  if (meta) {
    return {
      displayName: meta.title,
      description: meta.descriptionShort || meta.description,
    };
  }
  // Fallback for unknown domains
  return {
    displayName: domain.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    description: `Operations for ${domain} resources`,
  };
}

/**
 * Get common errors for a domain from upstream error resolution data
 * Combines HTTP errors with resource-specific errors
 */
function getDomainCommonErrors(domain: string): CommonError[] {
  const errors: CommonError[] = [];

  // Get resources in this domain to find resource-specific errors
  const resources = getResourcesInDomain(domain);

  for (const resource of resources) {
    const resourceErrors = getResourceErrorPatterns(resource);
    for (const err of resourceErrors) {
      // Get HTTP error info for this status code
      const httpError = getHttpErrorResolution(err.errorCode);

      errors.push({
        statusCode: err.errorCode,
        errorType: httpError?.name || "Error",
        description: err.pattern,
        resolution: [err.resolution, ...(httpError?.prevention?.slice(0, 2) || [])],
      });
    }
  }

  // Add general HTTP errors relevant to this domain (common ones)
  const commonHttpCodes = [400, 401, 403, 404, 409];
  for (const code of commonHttpCodes) {
    // Only add if we don't already have this code from resource errors
    if (!errors.some((e) => e.statusCode === code)) {
      const httpError = getHttpErrorResolution(code);
      if (httpError) {
        errors.push({
          statusCode: httpError.code,
          errorType: httpError.name,
          description: httpError.description,
          resolution: httpError.diagnosticSteps.slice(0, 3).map((s) => s.description),
        });
      }
    }
  }

  // Deduplicate and limit to top 5 errors
  const seen = new Set<number>();
  return errors
    .filter((e) => {
      if (seen.has(e.statusCode)) return false;
      seen.add(e.statusCode);
      return true;
    })
    .slice(0, 5);
}

/**
 * Get security notes for a domain
 * Currently returns empty array - upstream x-f5xc-best-practices will provide this in future
 */
function getDomainSecurityNotes(_domain: string): string[] {
  // Security notes will be provided by upstream x-f5xc-best-practices extension
  // when implemented. For now, return empty array.
  return [];
}

/**
 * Get performance tips for a domain
 * Currently returns empty array - upstream x-f5xc-best-practices will provide this in future
 */
function getDomainPerformanceTips(_domain: string): string[] {
  // Performance tips will be provided by upstream x-f5xc-best-practices extension
  // when implemented. For now, return empty array.
  return [];
}

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
 * Convert upstream GuidedWorkflow to local RecommendedWorkflow format
 */
function convertUpstreamWorkflow(upstream: GuidedWorkflow): RecommendedWorkflow {
  return {
    name: upstream.name,
    description: upstream.description,
    steps: upstream.steps.map((step) => ({
      stepNumber: step.order,
      action: step.name,
      toolName: step.resource
        ? `f5xc-api-${upstream.domain}-${step.resource}-${step.action}`
        : undefined,
      note: step.description,
    })),
    prerequisites: upstream.prerequisites,
    complexity: upstream.complexity,
  };
}

/**
 * Generate recommended workflows for a domain from upstream data
 */
function generateWorkflows(domain: string): RecommendedWorkflow[] {
  // Get workflows from upstream x-f5xc-guided-workflows
  const upstreamWorkflows = getGuidedWorkflows(domain);
  const workflows: RecommendedWorkflow[] = upstreamWorkflows.map(convertUpstreamWorkflow);

  // If no upstream workflows, add a basic discovery workflow
  if (workflows.length === 0) {
    const resources = getResourcesInDomain(domain);
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
  }

  return workflows;
}

/**
 * Get best practices for a specific domain
 * Sources data from upstream x-f5xc-* extensions (v2.0.8+)
 */
export function getDomainBestPractices(domain: string): DomainBestPractices | null {
  const index = getToolIndex();
  const domainTools = index.tools.filter((t) => t.domain === domain);

  if (domainTools.length === 0) {
    return null;
  }

  // Get display info from upstream metadata
  const info = getDomainDisplayInfo(domain);

  // Get troubleshooting guides from upstream CLI metadata (v2.0.5+)
  const domainMeta = getDomainMetadata(domain);
  const troubleshootingGuides = domainMeta?.cliMetadata?.troubleshooting;

  return {
    domain,
    displayName: info.displayName,
    description: info.description,
    totalTools: domainTools.length,
    operations: countOperations(domain),
    dangerAnalysis: analyzeDangerLevels(domain),
    commonErrors: getDomainCommonErrors(domain),
    workflows: generateWorkflows(domain),
    securityNotes: getDomainSecurityNotes(domain),
    performanceTips: getDomainPerformanceTips(domain),
    troubleshootingGuides,
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
      const info = getDomainDisplayInfo(domain);
      return {
        domain,
        displayName: info.displayName,
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

  if (practices.troubleshootingGuides && practices.troubleshootingGuides.length > 0) {
    lines.push("## Troubleshooting Guides");
    for (const guide of practices.troubleshootingGuides) {
      lines.push(`### ${guide.problem}`);
      lines.push("**Symptoms**:");
      for (const symptom of guide.symptoms) {
        lines.push(`- ${symptom}`);
      }
      lines.push("**Diagnosis**:");
      for (const cmd of guide.diagnosisCommands) {
        lines.push(`- ${cmd}`);
      }
      lines.push("**Solutions**:");
      for (const solution of guide.solutions) {
        lines.push(`- ${solution}`);
      }
      lines.push("");
    }
  }

  return lines.join("\n");
}
