#!/usr/bin/env tsx

/**
 * Documentation Generation Script
 *
 * Generates MkDocs documentation from the tool registry with proper front matter
 * and category structure matching the Terraform provider and f5xcctl CLI.
 *
 * Usage:
 *   npm run generate-docs
 *   tsx scripts/generate-docs.ts
 */

import { existsSync, mkdirSync, writeFileSync, rmSync, readdirSync, readFileSync, copyFileSync, renameSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import YAML from "yaml";
import type { ParsedOperation } from "../src/generator/openapi-parser.js";
import {
  getSubcategory,
  subcategoryToDirectory,
  resourceToTitle,
  getAllUsedSubcategories,
  domainToTitle,
  getCategoryPath,
  requiresSubdivision,
  type Subcategory,
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

  /** MkDocs configuration file */
  MKDOCS_FILE: join(__dirname, "..", "mkdocs.yml"),

  /** Preserve these manual doc files from deletion */
  PRESERVE_FILES: ["index.md"],

  /** Large domain threshold for subdivision */
  LARGE_DOMAIN_THRESHOLD: 50,

  /** Backup suffix for mkdocs.yml */
  BACKUP_SUFFIX: ".backup",
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
 * Parse mkdocs.yml and extract configuration
 */
function parseMkDocsConfig(filePath: string): {
  config: Record<string, unknown>;
  hasNav: boolean;
} {
  if (!existsSync(filePath)) {
    throw new Error(`mkdocs.yml not found at ${filePath}`);
  }

  const content = readFileSync(filePath, 'utf-8');
  const config = YAML.parse(content);
  const hasNav = 'nav' in config;

  return { config, hasNav };
}

/**
 * Create backup of mkdocs.yml
 */
function backupMkDocsConfig(filePath: string): string {
  const backupPath = `${filePath}${CONFIG.BACKUP_SUFFIX}`;
  copyFileSync(filePath, backupPath);
  log.info(`Created backup: ${backupPath}`);
  return backupPath;
}

/**
 * Validate mkdocs.yml structure
 */
function validateMkDocsConfig(filePath: string): boolean {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const config = YAML.parse(content);

    // Check required sections
    const required = ['site_name', 'theme', 'plugins'];
    for (const section of required) {
      if (!(section in config)) {
        log.error(`Missing required section: ${section}`);
        return false;
      }
    }

    // Validate nav is array if present
    if ('nav' in config && !Array.isArray(config.nav)) {
      log.error('nav section must be an array');
      return false;
    }

    return true;
  } catch (error) {
    log.error(`Validation failed: ${error instanceof Error ? error.message : String(error)}`);
    return false;
  }
}

/**
 * Resource documentation data grouped from tools
 */
interface ResourceDoc {
  resource: string;
  domain: string;
  subcategory: Subcategory;  // Deprecated, for backwards compatibility
  categoryPath: CategoryPath; // NEW: Hierarchical category
  title: string;
  tools: ParsedOperation[];
  summary: string;
  description: string;
}

/**
 * Generate f5xcctl equivalent command
 */
function generateF5xcctlCommand(resource: string, operation: string, domain: string): string {
  const normalizedResource = resource.replace(/-/g, "_");
  const normalizedDomain = domain.replace(/-/g, "_");

  switch (operation) {
    case "list":
      return `f5xcctl ${normalizedDomain} list ${normalizedResource} -n <namespace>`;
    case "get":
      return `f5xcctl ${normalizedDomain} get ${normalizedResource} <name> -n <namespace>`;
    case "create":
      return `f5xcctl ${normalizedDomain} create ${normalizedResource} -n <namespace> -i ${normalizedResource}.yaml`;
    case "update":
      return `f5xcctl ${normalizedDomain} apply ${normalizedResource} -n <namespace> -i ${normalizedResource}.yaml`;
    case "delete":
      return `f5xcctl ${normalizedDomain} delete ${normalizedResource} <name> -n <namespace>`;
    default:
      return `f5xcctl ${normalizedDomain} ${operation} ${normalizedResource}`;
  }
}

/**
 * Generate Terraform resource example
 */
function generateTerraformExample(resource: string): string {
  const normalizedResource = resource.replace(/-/g, "_");
  const terraformResource = `volterra_${normalizedResource}`;

  return `resource "${terraformResource}" "example" {
  name      = "example-${resource}"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}`;
}

/**
 * Generate markdown content for a resource
 */
function generateMarkdown(resourceDoc: ResourceDoc): string {
  const { resource, categoryPath, title, tools, summary, description } = resourceDoc;

  // Generate front matter - wrap long descriptions to avoid line length issues
  const rawDescription = summary || `Manage ${title} resources in F5 Distributed Cloud.`;

  // Wrap text at specified length, with optional indent for continuation lines
  const wrapText = (text: string, maxLen: number, indent = ''): string => {
    if (text.length <= maxLen) return text;
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    for (const word of words) {
      if ((currentLine + ' ' + word).trim().length <= maxLen) {
        currentLine = (currentLine + ' ' + word).trim();
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines.join('\n' + indent);
  };

  // Use indent for YAML front matter continuation
  const wrappedDescription = wrapText(rawDescription, 80, '  ');

  const frontMatter = {
    page_title: `f5xc_${resource.replace(/-/g, "_")} - f5xc-api-mcp`,
    subcategory: categoryPath.domainTitle,  // Display-friendly domain title
    description: wrappedDescription,
  };

  // Tools table
  const toolRows = tools
    .sort((a, b) => {
      // Sort by operation: create, get, list, update, delete, then others
      const opOrder = { create: 1, get: 2, list: 3, update: 4, delete: 5 };
      const aOrder = opOrder[a.operation as keyof typeof opOrder] ?? 99;
      const bOrder = opOrder[b.operation as keyof typeof opOrder] ?? 99;
      return aOrder - bOrder;
    })
    .map((tool) => `| \`${tool.toolName}\` | ${tool.summary} |`)
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

  // Parameters section
  let parametersSection = "";
  if (pathParams.size > 0 || queryParams.size > 0) {
    parametersSection = "\n## Parameters\n\n";

    if (pathParams.size > 0) {
      parametersSection += "### Path Parameters\n\n";
      parametersSection += "| Parameter | Description |\n|-----------|-------------|\n";
      for (const [name, desc] of pathParams) {
        // Clean up description - take first sentence only
        const cleanDesc = desc.split("\n")[0].replace(/x-example:.*$/i, "").trim() || `The ${name} identifier`;
        parametersSection += `| \`${name}\` | ${cleanDesc} |\n`;
      }
      parametersSection += "\n";
    }

    if (queryParams.size > 0) {
      parametersSection += "### Query Parameters\n\n";
      parametersSection += "| Parameter | Description |\n|-----------|-------------|\n";
      for (const [name, desc] of queryParams) {
        const cleanDesc = desc.split("\n")[0].replace(/x-example:.*$/i, "").trim() || `The ${name} parameter`;
        parametersSection += `| \`${name}\` | ${cleanDesc} |\n`;
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

  // CLI equivalent
  const cliSection = `
## f5xcctl Equivalent

\`\`\`bash
# Create/Update
${generateF5xcctlCommand(resource, "create", categoryPath.domain)}

# Get
${generateF5xcctlCommand(resource, "get", categoryPath.domain)}

# List
${generateF5xcctlCommand(resource, "list", categoryPath.domain)}

# Delete
${generateF5xcctlCommand(resource, "delete", categoryPath.domain)}
\`\`\`
`;

  // Terraform section
  const terraformSection = `
## Terraform Resource

\`\`\`hcl
${generateTerraformExample(resource)}
\`\`\`

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
`;

  // Wrap body description too for line length compliance
  const bodyDescription = description || summary || `Manage ${title} resources in F5 Distributed Cloud.`;
  const wrappedBodyDescription = wrapText(bodyDescription, 100);

  // Build the full markdown with YAML lineWidth to wrap long descriptions
  const markdown = `---
${YAML.stringify(frontMatter, { lineWidth: 100 }).trim()}
---

# ${title}

${wrappedBodyDescription}

## Tools

| Tool | Description |
|------|-------------|
${toolRows}
${parametersSection}${exampleSection}${cliSection}${terraformSection}`;

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
    } else if (entry.name.endsWith(".md")) {
      // Check if it's a top-level generated file (we'll keep manually created ones at root)
      // For now, preserve all root-level .md files except those in subdirectories
      // The new structure puts all generated files in subcategory subdirectories
    }
  }
}

/**
 * Subdivide large domains by tags
 */
function subdivideByTags(
  domain: string,
  docs: ResourceDoc[]
): Map<string, ResourceDoc[]> {
  const groups = new Map<string, ResourceDoc[]>();

  for (const doc of docs) {
    const subdivision = doc.categoryPath.subdivision || 'Other';

    if (!groups.has(subdivision)) {
      groups.set(subdivision, []);
    }
    groups.get(subdivision)!.push(doc);
  }

  return groups;
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

      const subcategory = getSubcategory(tool.domain, tool.resource);
      resourceMap.set(key, {
        resource: tool.resource,
        domain: tool.domain,
        subcategory,
        categoryPath,
        title: resourceToTitle(tool.resource),
        tools: [],
        summary: tool.summary,
        description: tool.description,
      });
    }

    const doc = resourceMap.get(key)!;
    doc.tools.push(tool);

    // Use the longest description as the resource description
    if (tool.description && tool.description.length > (doc.description?.length ?? 0)) {
      doc.description = tool.description;
    }
  }

  return resourceMap;
}

/**
 * Generate enhanced navigation structure with domain grouping
 */
function generateEnhancedNavigation(
  resourceDocs: ResourceDoc[]
): Array<Record<string, unknown>> {
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
          .map(doc => ({
            [doc.title]: `tools/${doc.categoryPath.directoryPath}/${doc.resource}.md`
          }));

        tagEntries.push({ [tag]: resources });
      }

      navigation.push({ [domainTitle]: tagEntries });

    } else {
      // Two-level: Domain → Resource
      const resources = docs
        .sort((a, b) => a.title.localeCompare(b.title))
        .map(doc => ({
          [doc.title]: `tools/${doc.categoryPath.directoryPath}/${doc.resource}.md`
        }));

      navigation.push({ [domainTitle]: resources });
    }
  }

  return navigation;
}

/**
 * Update mkdocs.yml with new navigation structure
 */
function updateMkDocsNavigation(
  configPath: string,
  navigation: Array<Record<string, unknown>>
): void {
  const tempFile = `${configPath}.tmp`;
  const backupFile = backupMkDocsConfig(configPath);

  try {
    log.info('Updating mkdocs.yml navigation...');

    // Parse existing config
    const { config } = parseMkDocsConfig(configPath);

    // Build complete nav structure
    const completeNav = [
      { Home: 'index.md' },
      { 'Getting Started': 'getting-started.md' },
      { Tools: [
        { Overview: 'tools/index.md' },
        ...navigation
      ]}
    ];

    // Merge with existing config (remove old nav if present)
    const { nav: _, ...preserved } = config;
    const updated = {
      ...preserved,
      nav: completeNav
    };

    // Write to temp file
    const yamlContent = YAML.stringify(updated, {
      lineWidth: 0,
      indent: 2,
      defaultKeyType: 'PLAIN',
      defaultStringType: 'PLAIN'
    });

    writeFileSync(tempFile, yamlContent);

    // Validate temp file
    if (!validateMkDocsConfig(tempFile)) {
      throw new Error('Generated invalid YAML structure');
    }

    // Atomic rename
    renameSync(tempFile, configPath);
    log.success('mkdocs.yml navigation updated successfully');

    // Cleanup backup
    rmSync(backupFile);

  } catch (error) {
    log.error(`Failed to update mkdocs.yml: ${error instanceof Error ? error.message : String(error)}`);

    // Rollback from backup
    if (existsSync(backupFile)) {
      copyFileSync(backupFile, configPath);
      log.info('Rolled back from backup');
      rmSync(backupFile);
    }

    // Cleanup temp file
    if (existsSync(tempFile)) {
      rmSync(tempFile);
    }

    throw error;
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
    const outputFile = join(outputDir, `${resourceDoc.resource}.md`);

    // Create directory
    mkdirSync(outputDir, { recursive: true });

    // Generate and write markdown
    const markdown = generateMarkdown(resourceDoc);
    writeFileSync(outputFile, markdown);

    generatedDocs.push(resourceDoc);
    fileCount++;
  }

  log.info(`Generated ${fileCount} documentation files`);

  // Generate enhanced navigation structure
  const navigation = generateEnhancedNavigation(generatedDocs);

  // Update mkdocs.yml automatically
  try {
    updateMkDocsNavigation(CONFIG.MKDOCS_FILE, navigation);
  } catch (error) {
    log.error('Failed to update mkdocs.yml - navigation changes not applied');
    log.info('Navigation structure:');
    console.log(YAML.stringify({ Tools: [{ Overview: "tools/index.md" }, ...navigation] }));
    throw error;
  }

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
  log.info("mkdocs.yml has been updated automatically.");
}

/**
 * Entry point
 */
generateDocs()
  .then(() => {
    process.exit(0);
  })
  .catch((error: unknown) => {
    log.error(
      `Generation failed: ${error instanceof Error ? error.message : String(error)}`
    );
    if (error instanceof Error && error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  });
