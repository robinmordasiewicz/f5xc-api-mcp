# Spec Comparison: v2.0.39 → v2.0.41

## Summary

Successfully upgraded from v2.0.39 to v2.0.41, incorporating the new `x-f5xc-conflicts-with`
extension across 6,375 field definitions.

## Version Changes

| Aspect | v2.0.39 | v2.0.41 | Change |
|--------|---------|---------|--------|
| **Version** | 2.0.39 | 2.0.41 | +2 patch releases |
| **Release Date** | 2026-01-19 05:55:11Z | 2026-01-19 18:47:04Z | ~13 hours later |
| **Domains** | 39 | 39 | No change |
| **Total Paths** | ~1592 | ~1592 | No change |
| **Total Schemas** | ~9370 | ~9370 | No change |

## New Extension: x-f5xc-conflicts-with

### Global Statistics

- **Total Occurrences**: 6,375
- **Domains Affected**: All 39 domains
- **Purpose**: Declares mutual exclusivity relationships for OneOf field groups

### Distribution Across Domains

| Rank | Domain | Count | % of Total |
|------|--------|-------|-----------|
| 1 | virtual | 1,161 | 18.2% |
| 2 | sites | 1,095 | 17.2% |
| 3 | cdn | 859 | 13.5% |
| 4 | shape | 407 | 6.4% |
| 5 | network | 333 | 5.2% |
| 6 | network_security | 278 | 4.4% |
| 7 | statistics | 234 | 3.7% |
| 8 | ce_management | 210 | 3.3% |
| 9 | waf | 192 | 3.0% |
| 10 | service_mesh | 185 | 2.9% |

### Example: Healthcheck HTTP Configuration

**Schema**: `healthcheckHttpHealthCheck`

#### Field 1: host_header

```json
{
  "type": "string",
  "description": "Exclusive with [use_origin_server_name]\nThe value of the host header.",
  "title": "Host_header.",
  "maxLength": 262,
  "x-displayname": "Host Header Value.",
  "x-ves-example": "One.F5 Distributed cloud.com.",
  "x-f5xc-example": "one.F5 Distributed Cloud.com",
  "x-f5xc-description-short": "Exclusive with [use_origin_server_name] The value of the host header.",
  "x-f5xc-conflicts-with": [
    "use_origin_server_name"
  ]
}
```

#### Field 2: use_origin_server_name

```json
{
  "$ref": "#/components/schemas/ioschemaEmpty",
  "default": {},
  "x-f5xc-server-default": true,
  "x-f5xc-recommended-value": {},
  "x-f5xc-conflicts-with": [
    "host_header"
  ]
}
```

### Benefits

1. **Client-Side Validation**: Tools can validate field conflicts before API calls
2. **Better Error Messages**: Users get clear conflict warnings upfront
3. **IDE Support**: Intelligent autocompletion can avoid suggesting conflicting fields
4. **Terraform Validation**: Can use `ConflictsWith` schema attribute
5. **MCP Tool Hints**: Can generate parameter descriptions with conflict warnings

## Extension Characteristics

### Array Format

The extension value is always an array of strings, even for single conflicts:

```json
"x-f5xc-conflicts-with": ["other_field_name"]
```

### Bidirectional Declaration

Conflicts are declared on BOTH sides of the relationship:

- `host_header` → conflicts with `use_origin_server_name`
- `use_origin_server_name` → conflicts with `host_header`

### Integration with Existing Extensions

Works alongside existing F5XC extensions:

- `x-f5xc-recommended-value` - Marks recommended OneOf variant
- `x-f5xc-server-default` - Indicates server will apply this if unspecified
- `x-f5xc-description-short` - Short description for UI display
- `x-f5xc-required-for` - Field requirement matrix

## Derivation Logic

The `x-f5xc-conflicts-with` extension is automatically derived from native Volterra
`x-ves-oneof-field-*` extensions during enrichment:

1. **Source**: `x-ves-oneof-field-host_header_choice: ["host_header", "use_origin_server_name"]`
2. **Enrichment**: ConflictsWithEnricher processes OneOf groups
3. **Result**: Each member gets conflicts-with pointing to other members

## Code Impact Assessment

### Current Support

Our `src/generator/openapi-parser.ts` already supports custom extensions:

```typescript
// Line 50:
"x-f5xc-recommended-value": z.unknown().optional(),
```

### Required Updates

Need to add `x-f5xc-conflicts-with` to the schema:

```typescript
"x-f5xc-conflicts-with": z.array(z.string()).optional(),
```

### No Breaking Changes

- The extension is additive - doesn't modify existing fields
- Parser will handle unknown extensions gracefully
- Regeneration will incorporate new metadata automatically

## Next Steps

### Phase 3: Code Integration

1. ✅ Specs downloaded (v2.0.41)
2. ⏳ Update OpenAPI parser to recognize `x-f5xc-conflicts-with`
3. ⏳ Add validation logic to check for conflicts
4. ⏳ Update tool descriptions to surface conflict information
5. ⏳ Regenerate tools with new schemas

### Phase 4: Testing

- Test conflicting field detection in healthcheck creation
- Verify error messages are clear and helpful
- Full CRUD lifecycle testing via OpenCode CLI

### Phase 5: Documentation

- Update tool documentation with conflict examples
- Add conflict validation to UAT scenarios
- Document best practices for OneOf usage

## Validation Commands

```bash
# Check version
jq -r '.version' specs/index.json
# Output: 2.0.41

# Count conflicts-with occurrences
grep -r "x-f5xc-conflicts-with" specs/domains/ | wc -l
# Output: 6375

# Domain distribution
for domain in specs/domains/*.json; do
  echo -n "$(basename $domain .json): "
  grep -c "x-f5xc-conflicts-with" "$domain"
done | sort -t: -k2 -rn

# Check specific healthcheck example
jq '.components.schemas["healthcheckHttpHealthCheck"].properties.host_header["x-f5xc-conflicts-with"]' specs/domains/virtual.json
# Output: ["use_origin_server_name"]
```

## Conclusion

✅ **Sync Successful**: Upgraded to v2.0.41 with new `x-f5xc-conflicts-with` extension

✅ **Comprehensive Coverage**: 6,375 field conflict declarations across all 39 domains

✅ **Zero Breaking Changes**: Extension is purely additive and backwards compatible

✅ **Ready for Integration**: Parser update is straightforward, tooling generation will incorporate automatically

**Impact**: This enhancement will significantly improve developer experience by catching field
conflicts at validation time rather than at API call time.
