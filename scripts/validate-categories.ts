#!/usr/bin/env tsx

/**
 * Validation script to verify domain title conversion and subdivision detection
 */

import { getAllDomains, domainToTitle, requiresSubdivision } from './category-mapping.js';

async function validateCategories() {
  console.log('Domain Categorization Validation\n');
  console.log('='.repeat(70));

  const domains = getAllDomains();
  console.log(`\nTotal Domains: ${domains.length}\n`);

  let subdivisionCount = 0;

  for (const domain of domains) {
    const title = domainToTitle(domain);
    const needsSubdivision = requiresSubdivision(domain);

    if (needsSubdivision) {
      subdivisionCount++;
    }

    const status = needsSubdivision ? '[SUBDIVIDED - 3-LEVEL]' : '[STANDARD - 2-LEVEL]';
    console.log(`${domain.padEnd(25)} → ${title.padEnd(45)} ${status}`);
  }

  console.log('\n' + '='.repeat(70));
  console.log(`\nSummary:`);
  console.log(`  Total domains: ${domains.length}`);
  console.log(`  Subdivided (3-level): ${subdivisionCount}`);
  console.log(`  Standard (2-level): ${domains.length - subdivisionCount}`);
  console.log('\n✅ Domain categorization validation complete\n');
}

validateCategories().catch(console.error);
