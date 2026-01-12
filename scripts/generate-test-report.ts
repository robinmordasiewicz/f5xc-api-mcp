#!/usr/bin/env tsx
/**
 * Test Report Generator
 *
 * Parses Vitest JSON results and generates comprehensive bug/enhancement documentation.
 * Categorizes failures by severity and identifies patterns across test runs.
 *
 * Usage:
 *   npm run test:report
 *   tsx scripts/generate-test-report.ts [--input path/to/results.json]
 */

import * as fs from "fs";
import * as path from "path";

interface TestResult {
  name: string;
  state: "passed" | "failed" | "skipped";
  duration?: number;
  error?: {
    message: string;
    stack?: string;
  };
}

interface TestSuite {
  name: string;
  tests: TestResult[];
  duration: number;
}

interface VitestResults {
  testResults: TestSuite[];
  numTotalTests: number;
  numPassedTests: number;
  numFailedTests: number;
  numPendingTests: number;
  startTime: number;
  success: boolean;
}

interface CategorizedIssue {
  severity: "critical" | "high" | "medium" | "low";
  testName: string;
  error: string;
  stack?: string;
  httpStatus?: number;
  category: string;
}

interface IssuePattern {
  errorPattern: string;
  occurrences: number;
  affectedTests: string[];
  severity: "critical" | "high" | "medium" | "low";
}

/**
 * Main report generation function
 */
async function generateReport(): Promise<void> {
  console.log("📊 Generating Test Report...\n");

  // Find most recent test results
  const resultsDir = path.join(process.cwd(), "test-reports");

  if (!fs.existsSync(resultsDir)) {
    console.error("❌ No test-reports directory found. Run tests first.");
    process.exit(1);
  }

  // Get all JSON result files
  const resultFiles = fs
    .readdirSync(resultsDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => ({
      name: f,
      path: path.join(resultsDir, f),
      mtime: fs.statSync(path.join(resultsDir, f)).mtime,
    }))
    .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

  if (resultFiles.length === 0) {
    console.error("❌ No test result JSON files found in test-reports/");
    process.exit(1);
  }

  console.log(`📂 Found ${resultFiles.length} test result file(s)`);
  console.log(`📄 Processing most recent: ${resultFiles[0].name}\n`);

  // Parse results
  const results: VitestResults = JSON.parse(
    fs.readFileSync(resultFiles[0].path, "utf-8")
  );

  // Categorize issues
  const issues = categorizeIssues(results);
  const patterns = identifyPatterns(issues);

  // Generate reports
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

  generateBugsMarkdown(issues, patterns, timestamp);
  generateEnhancementsMarkdown(issues, timestamp);
  generateSummaryMarkdown(results, issues, patterns, timestamp);
  generateGitHubIssues(issues.filter((i) => i.severity === "critical"), timestamp);

  console.log("\n✅ Report generation complete!");
  console.log(`\n📂 Generated files in project root:`);
  console.log(`   - BUGS.md`);
  console.log(`   - ENHANCEMENTS.md`);
  console.log(`   - test-reports/summary-${timestamp}.md`);
  console.log(`   - test-reports/github-issues/`);
}

/**
 * Categorize test failures by severity
 */
function categorizeIssues(results: VitestResults): CategorizedIssue[] {
  const issues: CategorizedIssue[] = [];

  for (const suite of results.testResults) {
    for (const test of suite.tests) {
      if (test.state === "failed" && test.error) {
        const issue = categorizeFailure(test.name, test.error);
        issues.push(issue);
      }
    }
  }

  return issues;
}

/**
 * Categorize individual failure by severity
 */
function categorizeFailure(
  testName: string,
  error: { message: string; stack?: string }
): CategorizedIssue {
  const errorMsg = error.message.toLowerCase();
  const stack = error.stack || "";

  // Extract HTTP status code if present
  const statusMatch = errorMsg.match(/status:?\s*(\d{3})/i) || stack.match(/status:?\s*(\d{3})/i);
  const httpStatus = statusMatch ? parseInt(statusMatch[1], 10) : undefined;

  // Determine severity
  let severity: "critical" | "high" | "medium" | "low" = "medium";
  let category = "Unknown";

  // Critical: 500 errors, null pointer, system crashes
  if (
    httpStatus && httpStatus >= 500 ||
    errorMsg.includes("null pointer") ||
    errorMsg.includes("cannot read property") ||
    errorMsg.includes("internal server error") ||
    errorMsg.includes("segmentation fault") ||
    errorMsg.includes("fatal error")
  ) {
    severity = "critical";
    category = "System Failure";
  }
  // High: Incorrect behavior, authentication issues, data corruption
  else if (
    errorMsg.includes("expected") && errorMsg.includes("received") ||
    httpStatus === 401 ||
    httpStatus === 403 ||
    errorMsg.includes("schema mismatch") ||
    errorMsg.includes("data type error") ||
    errorMsg.includes("validation failed")
  ) {
    severity = "high";
    category = httpStatus === 401 || httpStatus === 403
      ? "Authentication/Authorization"
      : "Incorrect Behavior";
  }
  // Medium: API inconsistencies, undocumented behavior
  else if (
    httpStatus === 404 ||
    errorMsg.includes("undocumented") ||
    errorMsg.includes("inconsistent") ||
    errorMsg.includes("deprecated") ||
    errorMsg.includes("timeout")
  ) {
    severity = "medium";
    category = "API Inconsistency";
  }
  // Low: Performance issues, minor bugs
  else if (
    errorMsg.includes("slow") ||
    errorMsg.includes("performance") ||
    errorMsg.includes("memory leak")
  ) {
    severity = "low";
    category = "Performance";
  }

  return {
    severity,
    testName,
    error: error.message,
    stack: error.stack,
    httpStatus,
    category,
  };
}

/**
 * Identify patterns in failures
 */
function identifyPatterns(issues: CategorizedIssue[]): IssuePattern[] {
  const patternMap = new Map<string, IssuePattern>();

  for (const issue of issues) {
    // Extract error pattern (first line of error message)
    const errorPattern = issue.error.split("\n")[0];

    if (patternMap.has(errorPattern)) {
      const pattern = patternMap.get(errorPattern)!;
      pattern.occurrences++;
      pattern.affectedTests.push(issue.testName);
    } else {
      patternMap.set(errorPattern, {
        errorPattern,
        occurrences: 1,
        affectedTests: [issue.testName],
        severity: issue.severity,
      });
    }
  }

  // Convert to array and sort by occurrences
  return Array.from(patternMap.values()).sort(
    (a, b) => b.occurrences - a.occurrences
  );
}

/**
 * Generate BUGS.md file
 */
function generateBugsMarkdown(
  issues: CategorizedIssue[],
  patterns: IssuePattern[],
  timestamp: string
): void {
  const critical = issues.filter((i) => i.severity === "critical");
  const high = issues.filter((i) => i.severity === "high");
  const medium = issues.filter((i) => i.severity === "medium");
  const low = issues.filter((i) => i.severity === "low");

  let markdown = `# Discovered Bugs - F5XC API MCP Server\n\n`;
  markdown += `**Report Generated**: ${new Date(timestamp).toLocaleString()}\n\n`;
  markdown += `## Summary\n\n`;
  markdown += `- 🔴 **Critical**: ${critical.length} (Blocking Functionality)\n`;
  markdown += `- 🟠 **High**: ${high.length} (Incorrect Behavior)\n`;
  markdown += `- 🟡 **Medium**: ${medium.length} (API Inconsistencies)\n`;
  markdown += `- 🟢 **Low**: ${low.length} (Minor Issues)\n\n`;

  if (patterns.length > 0) {
    markdown += `## Common Error Patterns\n\n`;
    markdown += `The following error patterns affect multiple tools:\n\n`;
    for (const pattern of patterns.slice(0, 10)) {
      markdown += `### ${pattern.errorPattern}\n\n`;
      markdown += `- **Occurrences**: ${pattern.occurrences}\n`;
      markdown += `- **Severity**: ${pattern.severity}\n`;
      markdown += `- **Affected Tests**: ${pattern.affectedTests.slice(0, 5).join(", ")}${pattern.affectedTests.length > 5 ? `, and ${pattern.affectedTests.length - 5} more` : ""}\n\n`;
    }
  }

  if (critical.length > 0) {
    markdown += `## 🔴 Critical Bugs (Blocking Functionality)\n\n`;
    markdown += `These issues completely break functionality and require immediate attention.\n\n`;
    for (const issue of critical) {
      markdown += `### ${issue.testName}\n\n`;
      markdown += `- **Category**: ${issue.category}\n`;
      if (issue.httpStatus) {
        markdown += `- **HTTP Status**: ${issue.httpStatus}\n`;
      }
      markdown += `- **Error**: \`${issue.error}\`\n`;
      markdown += `- **Priority**: URGENT - Blocks functionality\n\n`;
    }
  }

  if (high.length > 0) {
    markdown += `## 🟠 High Priority Bugs (Incorrect Behavior)\n\n`;
    markdown += `These issues cause incorrect behavior and should be fixed soon.\n\n`;
    for (const issue of high) {
      markdown += `### ${issue.testName}\n\n`;
      markdown += `- **Category**: ${issue.category}\n`;
      if (issue.httpStatus) {
        markdown += `- **HTTP Status**: ${issue.httpStatus}\n`;
      }
      markdown += `- **Error**: \`${issue.error}\`\n\n`;
    }
  }

  if (medium.length > 0) {
    markdown += `## 🟡 Medium Priority (API Inconsistencies)\n\n`;
    markdown += `These issues indicate API inconsistencies or undocumented behavior.\n\n`;
    for (const issue of medium) {
      markdown += `- **${issue.testName}**: ${issue.error}\n`;
    }
    markdown += `\n`;
  }

  if (low.length > 0) {
    markdown += `## 🟢 Low Priority (Minor Issues)\n\n`;
    markdown += `These issues are minor and can be addressed later.\n\n`;
    for (const issue of low) {
      markdown += `- **${issue.testName}**: ${issue.error}\n`;
    }
    markdown += `\n`;
  }

  fs.writeFileSync("BUGS.md", markdown);
  console.log("✅ Generated BUGS.md");
}

/**
 * Generate ENHANCEMENTS.md file
 */
function generateEnhancementsMarkdown(
  issues: CategorizedIssue[],
  timestamp: string
): void {
  let markdown = `# Feature Enhancement Opportunities - F5XC API MCP Server\n\n`;
  markdown += `**Report Generated**: ${new Date(timestamp).toLocaleString()}\n\n`;

  markdown += `## Tool Improvements\n\n`;
  markdown += `Based on test failures and API behavior, consider these enhancements:\n\n`;

  // Group issues by category to identify enhancement opportunities
  const categoryMap = new Map<string, CategorizedIssue[]>();
  for (const issue of issues) {
    const category = issue.category;
    if (!categoryMap.has(category)) {
      categoryMap.set(category, []);
    }
    categoryMap.get(category)!.push(issue);
  }

  if (categoryMap.has("API Inconsistency")) {
    markdown += `### API Standardization\n\n`;
    markdown += `- Add consistent error response format across all tools\n`;
    markdown += `- Standardize status field locations in API responses\n`;
    markdown += `- Document all possible HTTP status codes per operation\n`;
    markdown += `- Add request/response validation with clear error messages\n\n`;
  }

  if (categoryMap.has("Authentication/Authorization")) {
    markdown += `### Authentication Improvements\n\n`;
    markdown += `- Add more descriptive authentication error messages\n`;
    markdown += `- Implement automatic token refresh mechanism\n`;
    markdown += `- Add API key validation at initialization\n`;
    markdown += `- Provide better guidance for permission errors\n\n`;
  }

  if (categoryMap.has("Performance")) {
    markdown += `### Performance Enhancements\n\n`;
    markdown += `- Add caching for frequently accessed tools\n`;
    markdown += `- Implement request batching where possible\n`;
    markdown += `- Optimize tool search and description generation\n`;
    markdown += `- Add progress indicators for slow operations\n\n`;
  }

  markdown += `### MCP Server Features\n\n`;
  markdown += `- Add tool usage examples with common scenarios\n`;
  markdown += `- Implement better error recovery and retry logic\n`;
  markdown += `- Add validation hints for required parameters\n`;
  markdown += `- Create tool categories for easier discovery\n`;
  markdown += `- Add dependency resolution for create operations\n`;
  markdown += `- Implement dry-run mode for destructive operations\n\n`;

  markdown += `### Testing Infrastructure\n\n`;
  markdown += `- Add more comprehensive error scenario coverage\n`;
  markdown += `- Implement performance regression detection\n`;
  markdown += `- Add visual comparison testing for UI components\n`;
  markdown += `- Create automated cleanup for orphaned test resources\n\n`;

  markdown += `### Documentation\n\n`;
  markdown += `- Add troubleshooting guide for common errors\n`;
  markdown += `- Create comprehensive API usage examples\n`;
  markdown += `- Document rate limiting and best practices\n`;
  markdown += `- Add migration guides for breaking changes\n\n`;

  fs.writeFileSync("ENHANCEMENTS.md", markdown);
  console.log("✅ Generated ENHANCEMENTS.md");
}

/**
 * Generate summary markdown report
 */
function generateSummaryMarkdown(
  results: VitestResults,
  issues: CategorizedIssue[],
  patterns: IssuePattern[],
  timestamp: string
): void {
  const passRate = (
    (results.numPassedTests / results.numTotalTests) *
    100
  ).toFixed(1);

  let markdown = `# Test Discovery Report - ${new Date(timestamp).toLocaleString()}\n\n`;

  markdown += `## Executive Summary\n\n`;
  markdown += `- **Total Tests**: ${results.numTotalTests}\n`;
  markdown += `- **Passed**: ${results.numPassedTests} (${passRate}%)\n`;
  markdown += `- **Failed**: ${results.numFailedTests}\n`;
  markdown += `- **Skipped**: ${results.numPendingTests}\n`;
  markdown += `- **Duration**: ${Math.round((Date.now() - results.startTime) / 1000)}s\n\n`;

  const critical = issues.filter((i) => i.severity === "critical");
  const high = issues.filter((i) => i.severity === "high");

  markdown += `## Issue Summary\n\n`;
  markdown += `- 🔴 **Critical Bugs**: ${critical.length} (require immediate attention)\n`;
  markdown += `- 🟠 **High Priority**: ${high.length} (fix soon)\n`;
  markdown += `- 🟡 **Medium Priority**: ${issues.filter((i) => i.severity === "medium").length}\n`;
  markdown += `- 🟢 **Low Priority**: ${issues.filter((i) => i.severity === "low").length}\n\n`;

  if (patterns.length > 0) {
    markdown += `## Top Error Patterns\n\n`;
    for (const pattern of patterns.slice(0, 5)) {
      markdown += `1. **${pattern.errorPattern}** (${pattern.occurrences} occurrences)\n`;
    }
    markdown += `\n`;
  }

  markdown += `## Next Steps\n\n`;
  markdown += `1. Review critical bugs in BUGS.md and prioritize fixes\n`;
  markdown += `2. Create GitHub issues for critical bugs (see test-reports/github-issues/)\n`;
  markdown += `3. Review enhancement opportunities in ENHANCEMENTS.md\n`;
  markdown += `4. Re-run tests after fixes to validate improvements\n\n`;

  markdown += `## Detailed Reports\n\n`;
  markdown += `- **Bug Report**: See BUGS.md for categorized bug list\n`;
  markdown += `- **Enhancements**: See ENHANCEMENTS.md for improvement opportunities\n`;
  markdown += `- **GitHub Issues**: See test-reports/github-issues/ for critical bug templates\n\n`;

  const summaryPath = path.join(
    process.cwd(),
    "test-reports",
    `summary-${timestamp}.md`
  );
  fs.writeFileSync(summaryPath, markdown);
  console.log(`✅ Generated test-reports/summary-${timestamp}.md`);
}

/**
 * Generate GitHub issue templates for critical bugs
 */
function generateGitHubIssues(
  criticalIssues: CategorizedIssue[],
  timestamp: string
): void {
  const issuesDir = path.join(process.cwd(), "test-reports", "github-issues");

  if (!fs.existsSync(issuesDir)) {
    fs.mkdirSync(issuesDir, { recursive: true });
  }

  for (let i = 0; i < criticalIssues.length; i++) {
    const issue = criticalIssues[i];
    const filename = `critical-bug-${i + 1}-${timestamp}.md`;

    let markdown = `---\n`;
    markdown += `name: Critical Bug\n`;
    markdown += `about: ${issue.testName}\n`;
    markdown += `title: "[CRITICAL] ${issue.testName}"\n`;
    markdown += `labels: bug, critical, needs-triage\n`;
    markdown += `assignees: ''\n`;
    markdown += `---\n\n`;

    markdown += `## Bug Description\n\n`;
    markdown += `**Test**: ${issue.testName}\n`;
    markdown += `**Category**: ${issue.category}\n`;
    if (issue.httpStatus) {
      markdown += `**HTTP Status**: ${issue.httpStatus}\n`;
    }
    markdown += `**Severity**: CRITICAL (Blocks functionality)\n\n`;

    markdown += `## Error Message\n\n`;
    markdown += `\`\`\`\n${issue.error}\n\`\`\`\n\n`;

    if (issue.stack) {
      markdown += `## Stack Trace\n\n`;
      markdown += `\`\`\`\n${issue.stack}\n\`\`\`\n\n`;
    }

    markdown += `## Steps to Reproduce\n\n`;
    markdown += `1. Run test suite: \`npm run test:discover\`\n`;
    markdown += `2. Observe failure in test: ${issue.testName}\n\n`;

    markdown += `## Expected Behavior\n\n`;
    markdown += `Test should pass with successful API response.\n\n`;

    markdown += `## Actual Behavior\n\n`;
    markdown += `Test fails with error: ${issue.error}\n\n`;

    markdown += `## Impact\n\n`;
    markdown += `This is a CRITICAL bug that blocks functionality and requires immediate attention.\n\n`;

    markdown += `## Environment\n\n`;
    markdown += `- F5XC Tenant: nferreira.staging.volterra.us\n`;
    markdown += `- Test Framework: Vitest\n`;
    markdown += `- Discovered: ${new Date(timestamp).toLocaleString()}\n`;

    fs.writeFileSync(path.join(issuesDir, filename), markdown);
  }

  if (criticalIssues.length > 0) {
    console.log(
      `✅ Generated ${criticalIssues.length} GitHub issue template(s) in test-reports/github-issues/`
    );
  }
}

// Run report generation
generateReport().catch((error) => {
  console.error("❌ Report generation failed:", error);
  process.exit(1);
});
