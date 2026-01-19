# Upstream Investigation: Issues #496 and #494

## Investigation Date

2026-01-19

## Summary

Issues #494 and #496 have been successfully implemented in the upstream repository
`robinmordasiewicz/f5xc-api-enriched` via PR #497, which introduced the new
`x-f5xc-conflicts-with` extension for OneOf field mutual exclusivity validation.

## Issue Details

### Issue #494 (CLOSED)

**Title**: feat: Add x-f5xc-conflicts-with extension for OneOf mutual exclusivity validation

**Problem Identified**:
During CRUD acceptance testing of the healthcheck `host_header_choice` OneOf group, it was
discovered that while the F5XC API correctly rejects requests with both `host_header` AND
`use_origin_server_name` set simultaneously (HTTP 400 BAD_REQUEST), the OpenAPI spec doesn't
provide explicit metadata for downstream consumers to validate this mutual exclusivity at the
schema/validation layer.

**Current Behavior**:

- OpenAPI spec has: `"x-ves-oneof-field-host_header_choice": "[\"host_header\",\"use_origin_server_name\"]"`
- This identifies OneOf group members but doesn't declare mutual exclusivity for schema validation
- API correctly rejects conflicting fields at runtime
- Terraform `validate` passes but `apply` fails at API call time
- Users get poor error experience - discovering conflicts only at runtime

**Use Case Example**:

```json
{
  "http_health_check": {
    "host_header": "example.com",
    "use_origin_server_name": {}
  }
}
```

Result: HTTP 400 BAD_REQUEST from API

**Test Results from Issue**:

| Test Case | Result |
|-----------|--------|
| CREATE with `use_origin_server_name` only | ✅ PASSED |
| CREATE with `host_header` only | ✅ PASSED |
| CREATE with BOTH fields | ✅ API correctly rejects with 400 |
| DESTROY | ✅ PASSED |

### Issue #496 (OPEN - tracking issue)

**Title**: feat: add x-f5xc-conflicts-with extension for OneOf field validation

**Status**: Implementation tracking issue that references the actual implementation in PR #497

## Implementation Details

### PR #497 (MERGED)

**Title**: feat: add x-f5xc-conflicts-with extension for OneOf field validation
**Merged**: 2026-01-19T17:03:29Z
**Closes**: Issue #494

**Changes Implemented**:

1. **New Extension**: `x-f5xc-conflicts-with` (array of strings)
   - Auto-derived from `x-ves-oneof-field-*` extensions during enrichment
   - Declares which properties cannot be used together
   - Enables schema-level validation in downstream tools

2. **New Enricher**: `ConflictsWithEnricher` class
   - Location: `scripts/utils/conflicts_with_enricher.py` (275 lines)
   - Inspects native `x-ves-oneof-field-*` extensions
   - Auto-derives mutual exclusivity relationships
   - Adds `x-f5xc-conflicts-with` to each OneOf group member

3. **Pipeline Integration**:
   - Integrated into main enrichment pipeline (`scripts/pipeline.py`)
   - Tracks conflicts added in pipeline statistics
   - Includes metrics in summary report and JSON output

4. **Documentation**:
   - Updated `docs/DEVELOPMENT.md` with complete extension reference
   - Added OneOf extension comparison table
   - Included use cases and schema examples
   - Updated `config/extension_registry.yaml`

5. **Testing**:
   - Comprehensive test suite: `tests/test_conflicts_with_enricher.py` (761 lines)
   - 20+ test cases covering:
     - Basic conflict detection and enrichment
     - Multiple OneOf variants in single schema
     - Preservation of existing conflict metadata
     - JSON-encoded extension values
     - Large-scale acceptance criteria (150 schemas)
     - Terraform-compatible output format

**Example Output Schema**:

```json
{
  "host_header": {
    "type": "string",
    "x-f5xc-conflicts-with": ["use_origin_server_name"],
    "description": "Custom Host header value (mutually exclusive with use_origin_server_name)"
  },
  "use_origin_server_name": {
    "type": "object",
    "x-f5xc-recommended-oneof-variant": true,
    "x-f5xc-conflicts-with": ["host_header"],
    "description": "Use origin server name as Host header (RECOMMENDED, mutually exclusive with host_header)"
  }
}
```

## Version Information

### Current State (f5xc-api-mcp)

- **Version**: v2.0.39
- **Synced**: 2026-01-19 (before PR #497 merge)
- **Status**: Does NOT include `x-f5xc-conflicts-with` extension

### Upstream Repository (f5xc-api-enriched)

- **Latest Version**: v2.0.41
- **Released**: 2026-01-19T18:47:04Z (after PR #497 merge)
- **Status**: ✅ INCLUDES `x-f5xc-conflicts-with` extension

### Version Timeline

1. v2.0.39 - Released 2026-01-19T05:55:11Z (before PR #497)
2. PR #497 - Merged 2026-01-19T17:03:29Z
3. v2.0.40 - Released 2026-01-19T18:09:09Z (transitional, may or may not include feature)
4. v2.0.41 - Released 2026-01-19T18:47:04Z (✅ DEFINITELY includes feature)

**Recommendation**: Sync to v2.0.41 to ensure we have the latest implementation.

## Affected Resources and Domains

The `x-f5xc-conflicts-with` extension will be automatically added to ALL resources that have
OneOf field groups (identified by `x-ves-oneof-field-*` extensions). This affects multiple
domains including:

- **virtual** domain (healthchecks, origin-pools, http-loadbalancers, etc.)
- **network** domain
- **dns** domain
- **waf** domain
- And others with OneOf patterns

## Impact on f5xc-api-mcp

### Benefits for Downstream Consumers

1. **Terraform Provider**:
   - Can use `ConflictsWith` schema validation
   - Catch errors at `terraform validate` time
   - Better user experience vs runtime API errors

2. **MCP Server**:
   - Can add validation hints in tool parameter descriptions
   - Provide conflict-aware schema analysis
   - Generate correct warnings before API calls

3. **xcsh CLI**:
   - Can reject invalid flag combinations before making API calls
   - Immediate, clear error messages

4. **IDE Extensions**:
   - Intelligent autocompletion avoiding conflicts
   - Real-time validation feedback

5. **AI Assistants**:
   - Generate correct OneOf configurations automatically
   - Understand field mutual exclusivity

### Required Code Changes

**Minimal Impact** - The new extension is already in OpenAPI specs and will be automatically available. However, we should:

1. **OpenAPI Parser** (`src/generator/openapi-parser.ts`):
   - Add `x-f5xc-conflicts-with` to schema (likely already flexible enough)
   - Verify it's exposed in tool schemas

2. **Tool Discovery** (`src/tools/discovery/describe.ts`):
   - Surface conflict information in tool descriptions
   - Add conflict warnings to parameter descriptions

3. **Parameter Validation** (`src/tools/discovery/validate.ts`):
   - Implement client-side validation to check for conflicting parameters
   - Provide helpful error messages before API calls

4. **Documentation Generation**:
   - Include conflict information in generated docs
   - Add examples showing correct OneOf usage

## Next Steps

### Phase 2: Download & Verify

1. Download v2.0.41 specs from upstream
2. Compare with current v2.0.39 specs
3. Identify all resources with new `x-f5xc-conflicts-with` fields
4. Document specific changes in virtual domain (healthchecks priority)

### Phase 3: Code Integration

1. Update parser if needed (likely minimal changes)
2. Add conflict validation logic
3. Update tool descriptions to show conflicts
4. Regenerate tools with new specs

### Phase 4: Authenticated Testing

**Critical Priority**: Test real CRUD operations with OpenCode CLI

- CREATE healthcheck with conflicting fields → verify client-side validation
- CREATE healthcheck with correct OneOf selection → verify success
- Full CRUD lifecycle testing

### Phase 5: Automated Testing

- Create UAT scenarios for conflict validation
- Test multiple OneOf patterns across domains
- Verify error messages are clear and helpful

## Validation Commands

```bash
# Download v2.0.41
cd ~/GIT/robinmordasiewicz/f5xc/f5xc-api-mcp
npm run sync-specs

# Check for new extension in specs
grep -r "x-f5xc-conflicts-with" specs/domains/ | head -20

# Count occurrences
grep -r "x-f5xc-conflicts-with" specs/domains/ | wc -l

# Check healthcheck specifically
jq '.paths[][] | select(.operationId == \
  "ves.io.schema.views.virtual.healthcheck.healthcheck.ves.io.schema.virtual.healthcheck.API.CreateObject") | \
  .requestBody.content."application/json".schema' specs/domains/virtual.json | \
  grep -A 2 "conflicts-with"
```

## Related Resources

- **Issue #494**: <https://github.com/robinmordasiewicz/f5xc-api-enriched/issues/494>
- **Issue #496**: <https://github.com/robinmordasiewicz/f5xc-api-enriched/issues/496>
- **PR #497**: <https://github.com/robinmordasiewicz/f5xc-api-enriched/pull/497>
- **Upstream Repo**: <https://github.com/robinmordasiewicz/f5xc-api-enriched>
- **Terraform Provider PR**: <https://github.com/robinmordasiewicz/terraform-provider-f5xc/pull/907>
- **MCP Server PR**: <https://github.com/robinmordasiewicz/f5xc-api-mcp/pull/242>

## Conclusion

✅ **Issues #494 and #496 have been successfully implemented** in upstream repository via PR #497.

✅ **Version v2.0.41 contains the new feature** and is available for download.

✅ **Implementation is production-ready** with comprehensive tests (20+ test cases, 761 lines of test code).

✅ **Benefits are significant** for all downstream consumers including Terraform, MCP, CLI, and IDE tools.

**Recommendation**: Proceed with Phase 2 to download v2.0.41 specs and integrate the new
`x-f5xc-conflicts-with` extension into f5xc-api-mcp.
