#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

const distDir = path.join(process.cwd(), 'dist', 'tools', 'generated');
const entries = fs.readdirSync(distDir, { withFileTypes: true });
const domainDirs = entries.filter(e => e.isDirectory()).map(e => e.name);

let totalTools = 0;
let toolsWithoutPath = 0;
const missingPathTools = [];

for (const domain of domainDirs) {
  const indexPath = path.join(distDir, domain, 'index.js');
  if (fs.existsSync(indexPath)) {
    try {
      delete require.cache[require.resolve(indexPath)];
      const module = require(indexPath);
      const toolsArrayName = Object.keys(module).find(key => key.endsWith('Tools'));

      if (toolsArrayName && Array.isArray(module[toolsArrayName])) {
        const tools = module[toolsArrayName];
        totalTools += tools.length;

        tools.forEach((tool, idx) => {
          if (!tool.path) {
            toolsWithoutPath++;
            missingPathTools.push({
              domain,
              index: idx,
              toolName: tool.toolName || 'unnamed',
              operation: tool.operation,
              method: tool.method
            });
          }
        });
      }
    } catch (error) {
      console.error(`Error loading ${domain}:`, error.message);
    }
  }
}

console.log(`\nTool Path Analysis:`);
console.log(`Total tools checked: ${totalTools}`);
console.log(`Tools without path: ${toolsWithoutPath}`);
console.log(`Percentage missing: ${((toolsWithoutPath / totalTools) * 100).toFixed(2)}%\n`);

if (missingPathTools.length > 0) {
  console.log(`First 10 tools missing path property:`);
  missingPathTools.slice(0, 10).forEach(tool => {
    console.log(`  - ${tool.domain}: ${tool.toolName} (${tool.method} ${tool.operation})`);
  });
}
