#!/usr/bin/env tsx
// Copyright (c) 2026 Robin Mordasiewicz. MIT License.

/**
 * Documentation Generation Script
 *
 * Generates Starlight-compatible MDX documentation from the tool registry with proper
 * front matter and organized category structure for API reference.
 *
 * Usage:
 *   npm run generate-docs
 *   tsx scripts/generate-docs.ts
 */

import {
  existsSync,
  mkdirSync,
  writeFileSync,
  rmSync,
  readdirSync,
  readFileSync,
} from "fs";
import { basename, join, dirname } from "path";
import { fileURLToPath } from "url";
import YAML from "yaml";
import type { ParsedOperation } from "../src/generator/openapi-parser.js";
import type { OneOfGroup } from "../src/generator/dependency-types.js";
import {
  resourceToTitle,
  getAllUsedSubcategories,
  domainToTitle,
  getCategoryPath,
  requiresSubdivision,
  type CategoryPath,
} from "./category-mapping.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Configuration
 */
const CONFIG = {
  /** Directory for generated documentation */
  DOCS_DIR: join(__dirname, "..", "docs", "tools"),

  /** Preserve these manual doc files from deletion */
  PRESERVE_FILES: ["index.mdx"],

  /** Large domain threshold for subdivision */
  LARGE_DOMAIN_THRESHOLD: 50,

};

/**
 * Logger for script output
 */
const log = {
  info: (message: string): void => console.log(`[INFO] ${message}`),
  warn: (message: string): void => console.warn(`[WARN] ${message}`),
  error: (message: string): void => console.error(`[ERROR] ${message}`),
  success: (message: string): void => console.log(`[SUCCESS] ${message}`),
};

/**
 * Rich metadata aggregated from tools
 */
interface AggregatedMetadata {
  /** Highest danger level across all tools */
  maxDangerLevel: "low" | "medium" | "high" | null;
  /** Whether any tool requires confirmation */
  requiresConfirmation: boolean;
  /** Aggregated side effects */
  sideEffects: {
    creates: string[];
    modifies: string[];
    deletes: string[];
  };
  /** Parameter examples */
  parameterExamples: Record<string, string>;
  /** Configuration choices (oneOf groups) with recommended options (v2.0.34+) */
  oneOfGroups: OneOfGroup[];
}

/**
 * Resource documentation data grouped from tools
 */
interface ResourceDoc {
  resource: string;
  domain: string;
  categoryPath: CategoryPath;
  title: string;
  tools: ParsedOperation[];
  summary: string;
  description: string;
  /** Rich metadata from enriched specs */
  metadata: AggregatedMetadata;
}

/**
 * Escape JSX-incompatible characters in text that appears outside code blocks.
 * MDX interprets bare { } as JSX expressions and < as JSX tags.
 */
function escapeJsx(text: string): string {
  return text
    .replace(/\{/g, "\\{")
    .replace(/\}/g, "\\}")
    .replace(/</g, "&lt;");
}

/**
 * Generate CURL command examples for API operations
 */
function generateCurlCommand(resource: string, operation: string, domain: string): string {
  const normalizedResource = resource.replace(/-/g, "_");

  // Build API path - most resources follow /api/config/namespaces/{namespace}/{resource_type}
  const apiPath = `/api/config/namespaces/\${NAMESPACE}/${normalizedResource}s`;

  switch (operation) {
    case "list":
      return `curl -X GET "https://\${TENANT}.console.ves.volterra.io${apiPath}" \\
  -H "Authorization: APIToken \${F5XC_API_TOKEN}" \\
  -H "Content-Type: application/json"`;
    case "get":
      return `curl -X GET "https://\${TENANT}.console.ves.volterra.io${apiPath}/<name>" \\
  -H "Authorization: APIToken \${F5XC_API_TOKEN}" \\
  -H "Content-Type: application/json"`;
    case "create":
      return `curl -X POST "https://\${TENANT}.console.ves.volterra.io${apiPath}" \\
  -H "Authorization: APIToken \${F5XC_API_TOKEN}" \\
  -H "Content-Type: application/json" \\
  -d @${normalizedResource}.json`;
    case "update":
      return `curl -X PUT "https://\${TENANT}.console.ves.volterra.io${apiPath}/<name>" \\
  -H "Authorization: APIToken \${F5XC_API_TOKEN}" \\
  -H "Content-Type: application/json" \\
  -d @${normalizedResource}.json`;
    case "delete":
      return `curl -X DELETE "https://\${TENANT}.console.ves.volterra.io${apiPath}/<name>" \\
  -H "Authorization: APIToken \${F5XC_API_TOKEN}"`;
    default:
      return `curl -X GET "https://\${TENANT}.console.ves.volterra.io${apiPath}" \\
  -H "Authorization: APIToken \${F5XC_API_TOKEN}"`;
  }
}

/**
 * Get danger level badge for markdown
 */
function getDangerBadge(level: "low" | "medium" | "high" | null): string {
  switch (level) {
    case "high":
      return ':::danger[High Risk Operation]\nThis resource includes operations that may cause significant changes. Review carefully before executing.\n:::\n\n';
    case "medium":
      return ':::caution[Medium Risk]\nSome operations on this resource may modify or delete data.\n:::\n\n';
    case "low":
      return ':::note[Low Risk]\nOperations on this resource are generally safe.\n:::\n\n';
    default:
      return "";
  }
}

/**
 * Format side effects for markdown display
 */
function formatSideEffects(sideEffects: AggregatedMetadata["sideEffects"]): string {
  const hasEffects =
    sideEffects.creates.length > 0 ||
    sideEffects.modifies.length > 0 ||
    sideEffects.deletes.length > 0;

  if (!hasEffects) {
    return "";
  }

  let content = "\n## Side Effects\n\n";
  content += "Operations on this resource may have the following effects:\n\n";

  if (sideEffects.creates.length > 0) {
    content += "**Creates:**\n\n";
    for (const item of sideEffects.creates) {
      content += `- ${escapeJsx(item)}\n`;
    }
    content += "\n";
  }

  if (sideEffects.modifies.length > 0) {
    content += "**Modifies:**\n\n";
    for (const item of sideEffects.modifies) {
      content += `- ${escapeJsx(item)}\n`;
    }
    content += "\n";
  }

  if (sideEffects.deletes.length > 0) {
    content += "**Deletes:**\n\n";
    for (const item of sideEffects.deletes) {
      content += `- ${escapeJsx(item)}\n`;
    }
    content += "\n";
  }

  return content;
}

/**
 * Format configuration choices (oneOf groups) for markdown display (v2.0.34+)
 */
function formatConfigurationChoices(oneOfGroups: OneOfGroup[]): string {
  if (oneOfGroups.length === 0) {
    return "";
  }

  let content = "\n## Configuration Choices\n\n";
  content += "This resource includes mutually exclusive configuration options:\n\n";

  for (const group of oneOfGroups) {
    content += `### ${group.choiceField}\n\n`;

    if (group.description) {
      content += `${group.description}\n\n`;
    }

    content += "| Option | Description | Recommended |\n|--------|-------------|-------------|\n";

    for (const option of group.options) {
      const isRecommended = group.recommendedOption === option ? "✅ Yes" : "";
      const description = group.description || "-";
      content += `| \`${option}\` | ${description} | ${isRecommended} |\n`;
    }

    if (group.recommendedOption) {
      content += `\n:::tip[Recommended Option]\nUse \`${group.recommendedOption}\` for most use cases.\n:::\n\n`;
    }

    content += "\n";
  }

  return content;
}

/**
 * Generate markdown content for a resource
 */
function generateMarkdown(resourceDoc: ResourceDoc): string {
  const { resource: rawResource, categoryPath, title: rawTitle, tools, summary, description, metadata } = resourceDoc;

  // Sanitize resource and title: strip curly braces that MDX interprets as JSX expressions
  const resource = rawResource.replace(/[{}]/g, "");
  const title = rawTitle.replace(/[{}]/g, "");

  // Generate front matter - wrap long descriptions to avoid line length issues
  const rawDescription = summary || `Manage ${title} resources in F5 Distributed Cloud.`;

  // Wrap text at specified length, with optional indent for continuation lines
  const wrapText = (text: string, maxLen: number, indent = ""): string => {
    if (text.length <= maxLen) return text;
    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = "";
    for (const word of words) {
      if ((currentLine + " " + word).trim().length <= maxLen) {
        currentLine = (currentLine + " " + word).trim();
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines.join("\n" + indent);
  };

  // Use indent for YAML front matter continuation
  const wrappedDescription = wrapText(rawDescription, 80, "  ");

  const frontMatter = {
    title,
    description: wrappedDescription,
  };

  // Generate danger badge and confirmation warning
  const dangerBadge = getDangerBadge(metadata.maxDangerLevel);
  const confirmationWarning = metadata.requiresConfirmation
    ? ':::note[Confirmation Required]\nSome operations on this resource require explicit confirmation before execution.\n:::\n\n'
    : "";

  // Tools table
  const toolRows = tools
    .sort((a, b) => {
      // Sort by operation: create, get, list, update, delete, then others
      const opOrder = { create: 1, get: 2, list: 3, update: 4, delete: 5 };
      const aOrder = opOrder[a.operation as keyof typeof opOrder] ?? 99;
      const bOrder = opOrder[b.operation as keyof typeof opOrder] ?? 99;
      return aOrder - bOrder;
    })
    .map((tool) => `| \`${tool.toolName}\` | ${escapeJsx(tool.summary)} |`)
    .join("\n");

  // Collect unique parameters from all tools
  const pathParams = new Map<string, string>();
  const queryParams = new Map<string, string>();
  for (const tool of tools) {
    for (const param of tool.pathParameters) {
      if (!pathParams.has(param.name)) {
        pathParams.set(param.name, param.description ?? "");
      }
    }
    for (const param of tool.queryParameters) {
      if (!queryParams.has(param.name)) {
        queryParams.set(param.name, param.description ?? "");
      }
    }
  }

  // Parameters section with examples from enriched specs
  let parametersSection = "";
  if (pathParams.size > 0 || queryParams.size > 0) {
    parametersSection = "\n## Parameters\n\n";

    // Helper to escape pipe characters in table cells
    const escapeTableCell = (text: string): string => text.replace(/\|/g, "\\|");

    if (pathParams.size > 0) {
      parametersSection += "### Path Parameters\n\n";
      parametersSection +=
        "| Parameter | Description | Example |\n|-----------|-------------|--------|\n";
      for (const [name, desc] of pathParams) {
        // Clean up description - take first sentence only, escape pipes
        const cleanDesc = escapeJsx(escapeTableCell(
          desc
            .split("\n")[0]
            .replace(/x-example:.*$/i, "")
            .trim() || `The ${name} identifier`
        ));
        // Get example from aggregated metadata
        const example = escapeTableCell(metadata.parameterExamples[name] || "-");
        parametersSection += `| \`${name}\` | ${cleanDesc} | \`${example}\` |\n`;
      }
      parametersSection += "\n";
    }

    if (queryParams.size > 0) {
      parametersSection += "### Query Parameters\n\n";
      parametersSection +=
        "| Parameter | Description | Example |\n|-----------|-------------|--------|\n";
      for (const [name, desc] of queryParams) {
        const cleanDesc = escapeJsx(escapeTableCell(
          desc
            .split("\n")[0]
            .replace(/x-example:.*$/i, "")
            .trim() || `The ${name} parameter`
        ));
        // Get example from aggregated metadata
        const example = escapeTableCell(metadata.parameterExamples[name] || "-");
        parametersSection += `| \`${name}\` | ${cleanDesc} | \`${example}\` |\n`;
      }
      parametersSection += "\n";
    }
  }

  // Get example operations
  const createOp = tools.find((t) => t.operation === "create");
  const getOp = tools.find((t) => t.operation === "get");
  const listOp = tools.find((t) => t.operation === "list");

  // Example usage section
  let exampleSection = `
## Example Usage

Ask Claude to help you work with ${title} resources:
`;

  if (createOp) {
    exampleSection += `
### Create ${title}

> "Create a ${resource} named 'example' in the 'production' namespace"
`;
  }

  if (listOp) {
    exampleSection += `
### List ${title}s

> "List all ${resource}s in the 'production' namespace"
`;
  }

  if (getOp) {
    exampleSection += `
### Get ${title} Details

> "Get details of the ${resource} named 'example' in namespace 'production'"
`;
  }

  // CURL examples section
  const curlSection = `
## CURL Examples

\`\`\`bash
# List resources
${generateCurlCommand(resource, "list", categoryPath.domain)}

# Get specific resource
${generateCurlCommand(resource, "get", categoryPath.domain)}

# Create resource
${generateCurlCommand(resource, "create", categoryPath.domain)}

# Delete resource
${generateCurlCommand(resource, "delete", categoryPath.domain)}
\`\`\`
`;

  // Wrap body description too for line length compliance
  // Sanitize description to fix markdown issues (unbalanced lists, etc.)
  const sanitizeDescription = (text: string): string => {
    // Replace numbered list markers that might cause issues
    let sanitized = text.replace(/^\d+\)\s*/gm, "- ");
    // Ensure blank lines before list items
    sanitized = sanitized.replace(/([^\n])\n(- )/g, "$1\n\n$2");
    return sanitized;
  };

  const bodyDescription = escapeJsx(sanitizeDescription(
    description || summary || `Manage ${title} resources in F5 Distributed Cloud.`
  ));
  const wrappedBodyDescription = wrapText(bodyDescription, 100);

  // Generate side effects from enriched specs
  const sideEffectsSection = formatSideEffects(metadata.sideEffects);

  // Generate configuration choices from oneOf groups (v2.0.34+)
  const configChoicesSection = formatConfigurationChoices(metadata.oneOfGroups);

  // Build the full markdown with YAML lineWidth to wrap long descriptions
  const markdown = `---
${YAML.stringify(frontMatter, { lineWidth: 100 }).trim()}
---

${dangerBadge}${confirmationWarning}${wrappedBodyDescription}

## Tools

| Tool | Description |
|------|-------------|
${toolRows}
${parametersSection}${configChoicesSection}${sideEffectsSection}${exampleSection}${curlSection}`;

  return markdown;
}

/**
 * Clean existing generated docs (preserving manually maintained files)
 */
function cleanGeneratedDocs(): void {
  if (!existsSync(CONFIG.DOCS_DIR)) {
    return;
  }

  const entries = readdirSync(CONFIG.DOCS_DIR, { withFileTypes: true });
  for (const entry of entries) {
    if (CONFIG.PRESERVE_FILES.includes(entry.name)) {
      continue;
    }

    const fullPath = join(CONFIG.DOCS_DIR, entry.name);
    if (entry.isDirectory()) {
      // Remove entire subdirectory
      rmSync(fullPath, { recursive: true, force: true });
    } else if (entry.name.endsWith(".mdx")) {
      // Check if it's a top-level generated file (we'll keep manually created ones at root)
      // For now, preserve all root-level .mdx files except those in subdirectories
      // The new structure puts all generated files in subcategory subdirectories
    }
  }
}

/**
 * Subdivide large domains by tags
 */
function subdivideByTags(domain: string, docs: ResourceDoc[]): Map<string, ResourceDoc[]> {
  const groups = new Map<string, ResourceDoc[]>();

  for (const doc of docs) {
    const subdivision = doc.categoryPath.subdivision || "Other";

    if (!groups.has(subdivision)) {
      groups.set(subdivision, []);
    }
    groups.get(subdivision)!.push(doc);
  }

  return groups;
}

/**
 * Aggregate rich metadata from multiple tools
 */
function aggregateMetadata(tools: ParsedOperation[]): AggregatedMetadata {
  const dangerLevels: Array<"low" | "medium" | "high"> = [];
  let requiresConfirmation = false;
  const creates = new Set<string>();
  const modifies = new Set<string>();
  const deletes = new Set<string>();
  const parameterExamples: Record<string, string> = {};
  const oneOfGroupsMap = new Map<string, OneOfGroup>();

  for (const tool of tools) {
    // Aggregate danger level (track all for finding max)
    if (tool.dangerLevel) {
      dangerLevels.push(tool.dangerLevel);
    }

    // Any tool requiring confirmation triggers the flag
    if (tool.confirmationRequired) {
      requiresConfirmation = true;
    }

    // Aggregate side effects
    if (tool.sideEffects) {
      if (tool.sideEffects.creates) {
        for (const item of tool.sideEffects.creates) {
          creates.add(item);
        }
      }
      if (tool.sideEffects.modifies) {
        for (const item of tool.sideEffects.modifies) {
          modifies.add(item);
        }
      }
      if (tool.sideEffects.deletes) {
        for (const item of tool.sideEffects.deletes) {
          deletes.add(item);
        }
      }
    }

    // Merge parameter examples
    if (tool.parameterExamples) {
      for (const [param, example] of Object.entries(tool.parameterExamples)) {
        if (!parameterExamples[param]) {
          parameterExamples[param] = example;
        }
      }
    }

    // Aggregate oneOf groups (v2.0.34+)
    if (tool.oneOfGroups) {
      for (const group of tool.oneOfGroups) {
        // Use choiceField as key to deduplicate across tools
        if (!oneOfGroupsMap.has(group.choiceField)) {
          oneOfGroupsMap.set(group.choiceField, group);
        }
      }
    }
  }

  // Determine max danger level
  let maxDangerLevel: "low" | "medium" | "high" | null = null;
  if (dangerLevels.includes("high")) {
    maxDangerLevel = "high";
  } else if (dangerLevels.includes("medium")) {
    maxDangerLevel = "medium";
  } else if (dangerLevels.includes("low")) {
    maxDangerLevel = "low";
  }

  return {
    maxDangerLevel,
    requiresConfirmation,
    sideEffects: {
      creates: Array.from(creates),
      modifies: Array.from(modifies),
      deletes: Array.from(deletes),
    },
    parameterExamples,
    oneOfGroups: Array.from(oneOfGroupsMap.values()),
  };
}

/**
 * Group tools by resource
 */
function groupToolsByResource(tools: ParsedOperation[]): Map<string, ResourceDoc> {
  const resourceMap = new Map<string, ResourceDoc>();

  for (const tool of tools) {
    const key = `${tool.domain}/${tool.resource}`;

    if (!resourceMap.has(key)) {
      // Extract tags from tool
      const tags = tool.tags || [];

      // Generate category path using domain and tags
      const categoryPath = getCategoryPath(tool.domain, tool.resource, tags);

      resourceMap.set(key, {
        resource: tool.resource,
        domain: tool.domain,
        categoryPath,
        title: resourceToTitle(tool.resource),
        tools: [],
        summary: tool.summary,
        description: tool.description,
        metadata: {
          maxDangerLevel: null,
          requiresConfirmation: false,
          sideEffects: { creates: [], modifies: [], deletes: [] },
          parameterExamples: {},
        },
      });
    }

    const doc = resourceMap.get(key)!;
    doc.tools.push(tool);

    // Use the longest description as the resource description
    if (tool.description && tool.description.length > (doc.description?.length ?? 0)) {
      doc.description = tool.description;
    }
  }

  // After grouping, aggregate metadata for each resource
  for (const doc of resourceMap.values()) {
    doc.metadata = aggregateMetadata(doc.tools);
  }

  return resourceMap;
}

/**
 * Generate enhanced navigation structure with domain grouping
 */
function generateEnhancedNavigation(resourceDocs: ResourceDoc[]): Array<Record<string, unknown>> {
  // Group by domain
  const byDomain = new Map<string, ResourceDoc[]>();

  for (const doc of resourceDocs) {
    const domain = doc.categoryPath.domain;
    if (!byDomain.has(domain)) {
      byDomain.set(domain, []);
    }
    byDomain.get(domain)!.push(doc);
  }

  // Build navigation structure
  const navigation: Array<Record<string, unknown>> = [];

  // Sort domains alphabetically by display title
  const sortedDomains = Array.from(byDomain.keys()).sort((a, b) => {
    return domainToTitle(a).localeCompare(domainToTitle(b));
  });

  for (const domain of sortedDomains) {
    const docs = byDomain.get(domain)!;
    const domainTitle = domainToTitle(domain);

    // Check if domain needs subdivision
    if (requiresSubdivision(domain)) {
      // Three-level: Domain → Tag → Resource
      const tagGroups = subdivideByTags(domain, docs);
      const tagEntries: Array<Record<string, Array<Record<string, string>>>> = [];

      // Sort tags alphabetically
      const sortedTags = Array.from(tagGroups.keys()).sort();

      for (const tag of sortedTags) {
        const tagDocs = tagGroups.get(tag)!;
        const resources = tagDocs
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((doc) => ({
            [doc.title]: `tools/${doc.categoryPath.directoryPath}/${doc.resource.replace(/[{}]/g, "")}.mdx`,
          }));

        tagEntries.push({ [tag]: resources });
      }

      navigation.push({ [domainTitle]: tagEntries });
    } else {
      // Two-level: Domain → Resource
      const resources = docs
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((doc) => ({
          [doc.title]: `tools/${doc.categoryPath.directoryPath}/${doc.resource.replace(/[{}]/g, "")}.mdx`,
        }));

      navigation.push({ [domainTitle]: resources });
    }
  }

  return navigation;
}

/**
 * Read and parse a .pages file for navigation
 * Returns nav entries with directory path prepended for mkdocs compatibility
 */
function readPagesFile(dirPath: string): Array<Record<string, unknown>> | null {
  const pagesFile = join(dirPath, ".pages");
  if (!existsSync(pagesFile)) {
    return null;
  }

  // Extract directory name for path prefix (e.g., "getting-started" from path)
  const dirName = basename(dirPath);

  try {
    const content = readFileSync(pagesFile, "utf-8");
    const parsed = YAML.parse(content);
    if (parsed && "nav" in parsed && Array.isArray(parsed.nav)) {
      // Prefix each file entry with directory path for mkdocs
      return parsed.nav.map((entry: unknown) => {
        if (typeof entry === "string" && (entry.endsWith(".mdx") || entry.endsWith(".md"))) {
          return `${dirName}/${entry}`;
        }
        return entry;
      });
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Main generation function
 */
async function generateDocs(): Promise<void> {
  console.log("=".repeat(60));
  console.log("F5XC API MCP Documentation Generator");
  console.log("=".repeat(60));

  // Dynamic import to avoid circular dependencies
  const { allTools } = await import("../src/tools/registry.js");

  if (!allTools || allTools.length === 0) {
    log.warn("No tools found in registry. Run 'npm run generate' first.");
    return;
  }

  log.info(`Found ${allTools.length} tools in registry`);

  // Group tools by resource
  const resourceDocs = groupToolsByResource(allTools);
  log.info(`Grouped into ${resourceDocs.size} unique resources`);

  // Get all used subcategories
  const subcategories = getAllUsedSubcategories(allTools);
  log.info(`Categories: ${subcategories.join(", ")}`);

  // Clean existing generated docs
  log.info("Cleaning existing generated docs...");
  cleanGeneratedDocs();

  // Create directory structure and generate markdown with new domain-based paths
  const generatedDocs: ResourceDoc[] = [];
  let fileCount = 0;

  for (const [, resourceDoc] of resourceDocs) {
    // Use new categoryPath for directory structure
    const outputDir = join(CONFIG.DOCS_DIR, resourceDoc.categoryPath.directoryPath);
    // Sanitize filename: strip curly braces that break MDX/Astro builds
    const safeResource = resourceDoc.resource.replace(/[{}]/g, "");
    const outputFile = join(outputDir, `${safeResource}.mdx`);

    // Create directory
    mkdirSync(outputDir, { recursive: true });

    // Generate and write markdown
    const markdown = generateMarkdown(resourceDoc);
    writeFileSync(outputFile, markdown);

    generatedDocs.push(resourceDoc);
    fileCount++;
  }

  log.info(`Generated ${fileCount} documentation files`);

  // Generate enhanced navigation structure (for reference/logging)
  const navigation = generateEnhancedNavigation(generatedDocs);
  log.info(`Generated navigation with ${navigation.length} domain entries`);

  // Summary
  console.log("=".repeat(60));
  console.log("Generation Summary:");
  console.log(`  Total tools: ${allTools.length}`);
  console.log(`  Unique resources: ${resourceDocs.size}`);
  console.log(`  Categories: ${subcategories.length}`);
  console.log(`  Files generated: ${fileCount}`);
  console.log(`  Output directory: ${CONFIG.DOCS_DIR}`);
  console.log("=".repeat(60));

  // Category breakdown by domain
  console.log("\nDomain Breakdown:");
  const domainCount = new Map<string, number>();
  for (const doc of generatedDocs) {
    const domain = doc.categoryPath.domain;
    domainCount.set(domain, (domainCount.get(domain) ?? 0) + 1);
  }
  for (const [domain, count] of Array.from(domainCount.entries()).sort()) {
    const title = domainToTitle(domain);
    console.log(`  ${title}: ${count} resources`);
  }

  log.success("Documentation generation complete!");
}

/**
 * Entry point
 */
generateDocs()
  .then(() => {
    process.exit(0);
  })
  .catch((error: unknown) => {
    log.error(`Generation failed: ${error instanceof Error ? error.message : String(error)}`);
    if (error instanceof Error && error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  });
