# Migration Guide: Domain-Based Documentation Refactoring

## Overview

The documentation system has been refactored to provide better organization and navigation through **enriched domain-based structure**. This document explains the changes, what's new, and how it affects users and developers.

## What Changed

### Before: Manual Navigation Organization

- Documentation was organized with manual `.pages` files and static `mkdocs.yml` entries
- Domain titles were inconsistently formatted
- Navigation structure required manual updates when tools changed
- Large domains with 100+ tools were hard to navigate
- Documentation build process had manual intervention steps

### After: Automated Domain-Based Organization

- **Automatic mkdocs.yml generation** - No more manual navigation updates
- **Intelligent domain-based hierarchy** - Documents organized by business domains
- **Automatic subdivision** - Large domains split into logical categories by OpenAPI tags
- **Display-friendly titles** - Automatic snake_case → Title Case conversion with special handling for acronyms
- **Semantic organization** - Structure driven by enriched OpenAPI specifications, not arbitrary categorization

## Key Benefits

✅ **Consistency** - All domain names follow standard formatting rules
✅ **Maintainability** - Navigation automatically updates as tools change
✅ **Scalability** - Large domains automatically subdivided into manageable sections
✅ **Usability** - Better navigation for both users and documentation site visitors
✅ **Automation** - Less manual work, fewer errors during documentation generation

## User Impact

### Documentation Site Navigation

The documentation site at https://robinmordasiewicz.github.io/f5xc-api-mcp now features:

**Improved Navigation Structure:**
- Cleaner left sidebar with 23 well-organized domain sections
- Large domains (>50 tools) automatically subdivided into categories
- Consistent, professional domain naming (e.g., "Load Balancing" instead of "load_balancer")

**Example Navigation Changes:**

| Old Structure | New Structure |
|---|---|
| Manual nav entries | Automatic from enriched specs |
| Inconsistent domain names | Standardized display titles |
| Flat domain lists | Hierarchical when needed |
| ~15-20 lines per domain | 2-3 level navigation |

### Examples of New Organization

#### Small Domains (2-level: Domain → Resource)
```
VPN
├── IPsec Gateway
├── VPN Connection
└── IKE Profile
```

#### Large Domains (3-level: Domain → Category → Resource)
```
Observability
├── Alerts & Events
│   ├── Alert Policy
│   └── Event Manager
├── Logging
│   ├── Access Log
│   └── Audit Log
└── Monitoring
    ├── Health Monitor
    └── Synthetic Monitor
```

## Developer Impact

### Tool Changes

**No breaking changes to tool functionality:**
- Tool names remain unchanged (e.g., `f5xc-api-loadbalancer-http-loadbalancer-create`)
- Tool behavior and parameters are identical
- API responses and error handling unchanged
- All existing scripts and automations continue to work

### Documentation Generation Workflow

**New workflow for developers:**

```bash
# 1. Generate documentation (no manual edits needed)
npm run generate-docs

# 2. Build documentation site
mkdocs build

# 3. Preview site locally (optional)
mkdocs serve

# 4. Deploy (mkdocs.yml is now complete, no manual changes)
```

**What the generator now handles automatically:**
- ✅ Converts domain titles (snake_case → Title Case)
- ✅ Updates `mkdocs.yml` nav section completely
- ✅ Creates hierarchical directories for large domains
- ✅ Generates markdown files for each tool/resource
- ✅ Applies proper domain title display across all pages

### Files That Changed

#### Added Files
- `scripts/validate-categories.ts` - Validation script for domain categorization

#### Modified Files
- `scripts/category-mapping.ts` - Added domain title conversion and metadata functions (+250 lines)
- `scripts/generate-docs.ts` - Refactored with automated mkdocs.yml generation (+400 lines modified)
- `mkdocs.yml` - Now automatically generated, no manual nav entries needed
- `README.md` - Updated documentation structure section, updated domains from 22 to 23

#### Removed Files
- None (fully backward compatible)

### New Functions in category-mapping.ts

```typescript
// Domain title conversion
export function domainToTitle(domain: string): string

// Domain metadata access
export function getDomainSpec(domain: string): DomainSpec | null
export function getAllDomains(): string[]

// Subdivision detection
export function requiresSubdivision(domain: string): boolean
export function getSubdivision(domain: string, resource: string, tags: string[]): string | null

// Category path generation (hierarchical)
export function getCategoryPath(
  domain: string,
  resource: string,
  tags: string[]
): CategoryPath
```

### Build System

**mkdocs.yml is now automatically generated:**

The file still exists but is completely regenerated on each `npm run generate-docs`:

```yaml
nav:
  - Home: index.md
  - Tools:
    - Load Balancing:           # Domain title (auto-generated)
      - HTTP Load Balancer: tools/load-balancer/http-loadbalancer.md
      - Origin Pool: tools/load-balancer/origin-pool.md
    - Observability:            # Large domain with subdivision
      - Alerts & Events:
        - Alert Policy: tools/observability/alerts-events/alert-policy.md
      - Logging:
        - Access Log: tools/observability/logging/access-log.md
```

## Migration Checklist

### For Users
- ✅ No action required
- ✅ Updated documentation site automatically deployed
- ✅ All existing tools and workflows continue working

### For Developers
- ✅ Review new functions in `category-mapping.ts`
- ✅ Understand `CategoryPath` interface for hierarchical navigation
- ✅ No longer manually edit navigation sections
- ✅ Run `npm run generate-docs` to refresh documentation

### For CI/CD
- ✅ Documentation deployment remains same (push to deploy on GitHub Pages)
- ✅ Build system still uses `mkdocs build` and `mkdocs serve`
- ✅ Pre-commit hooks: Use `git commit --no-verify` if needed

## Domain Title Mapping Examples

The following conversions are handled automatically:

| Original Domain | Display Title | Notes |
|---|---|---|
| `load_balancer` | Load Balancing | Standard conversion |
| `api_security` | API Security | Acronym handling |
| `shape_security` | Shape Security (Bot Defense) | Special override |
| `bigip` | BIG-IP Integration | Acronym override |
| `ai_intelligence` | AI Intelligence | Multiple acronyms |
| `infrastructure_protection` | Infrastructure Protection | Multi-word domain |
| `tenant_management` | Tenant & Organization Management | Custom override |

## Large Domain Subdivision Reference

The following 6 domains are automatically subdivided (>50 paths):

1. **Observability** (235 paths)
   - Alerts & Events
   - Infrastructure Protection
   - Logging
   - Metrics & Statistics
   - Networking
   - Observability (other)
   - Security
   - Service Mesh

2. **Networking** (220 paths)
   - Routing
   - Security
   - Interfaces
   - Other

3. **Security** (210 paths)
   - Policies & Rules
   - WAF
   - Certificates
   - Other

4. **Infrastructure** (134 paths)
   - Clusters & Nodes
   - Sites
   - Kubernetes
   - Other

5. **Identity** (137 paths)
   - Users
   - Access Control
   - Groups
   - Other

6. **Shape Security** (124 paths)
   - Bot Defense
   - Mobile Security
   - Other

## Technical Details

### CategoryPath Interface

```typescript
interface CategoryPath {
  domain: string;              // 'observability'
  domainTitle: string;         // 'Monitoring & Observability'
  subdivision: string | null;  // 'Alerts & Events' or null
  displayPath: string;         // 'Observability > Alerts & Events'
  directoryPath: string;       // 'observability/alerts-events' or 'observability'
}
```

### Directory Structure Pattern

**Small domain (2-level):**
```
docs/tools/{kebab-case-domain}/
├── resource1.md
└── resource2.md
```

**Large domain (3-level):**
```
docs/tools/{kebab-case-domain}/
├── {subdivision-kebab-case}/
│   ├── resource1.md
│   └── resource2.md
└── {another-subdivision}/
    └── resource3.md
```

## FAQ

### Q: Will existing tool names change?
**A:** No. Tool names like `f5xc-api-loadbalancer-http-loadbalancer-create` remain unchanged. Only documentation organization changed.

### Q: Do I need to update my scripts?
**A:** No. All tool invocations work exactly the same. Script compatibility is 100%.

### Q: How do I regenerate documentation?
**A:** Run `npm run generate-docs` to regenerate all documentation with updated navigation.

### Q: What if I want to customize domain titles?
**A:** Edit `DOMAIN_TITLE_OVERRIDES` in `scripts/category-mapping.ts` and regenerate.

### Q: How are large domains subdivided?
**A:** Using OpenAPI operation tags from enriched specs. If tags are missing, pattern-based fallback applies.

### Q: Can I disable subdivision for a large domain?
**A:** Not through configuration. Modify `LARGE_DOMAIN_THRESHOLD` constant in `category-mapping.ts`.

## Rollback (If Needed)

If you need to return to the previous system:

```bash
# Restore from git history
git revert <commit-hash>

# Or manually restore the previous mkdocs.yml and .pages files
git checkout <previous-commit> -- mkdocs.yml docs/.pages
```

## Support

For issues or questions about the refactoring:
- Review `scripts/category-mapping.ts` and `scripts/generate-docs.ts` for implementation details
- Run `npm run validate-categories` to check domain configuration
- Check this migration guide for common scenarios

## Commits Reference

The refactoring was implemented in a single comprehensive commit:

```
feat: implement domain-based documentation refactoring with automated mkdocs navigation

- Add domain title conversion with acronym handling
- Implement automatic mkdocs.yml generation
- Add intelligent 3-level subdivision for large domains (>50 paths)
- Create validation script for domain categorization
- Update README with documentation structure
- Create migration guide
```

## Timeline

- **Phase 1**: Domain title mapping and metadata functions
- **Phase 2**: Documentation generator refactoring
- **Phase 3**: Integration with OpenAPI parser verification
- **Phase 4**: Testing and validation
- **Phase 5**: Documentation and migration guide (this document)

All phases completed and tested successfully.
