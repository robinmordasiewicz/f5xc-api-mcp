# Quota Awareness UAT Testing Findings

## Critical Discovery: Namespace Mismatch

**Date**: 2026-01-19
**Status**: Root Cause Identified

### Issue Summary

All quota API calls were returning generic errors during OpenCode testing because tests were
using namespace `"default"` instead of the correct namespace for this tenant.

### Root Cause Analysis

**Profile Configuration**: `/Users/r.mordasiewicz/.config/f5xc/profiles/f5-amer-ent.json`

```json
{
  "name": "f5-amer-ent",
  "apiUrl": "https://f5-amer-ent.console.ves.volterra.io",
  "apiToken": "+K7ZDtbx59Rf7EgKTaz7daAKSAk=",
  "defaultNamespace": "r-mordasiewicz"  ← CRITICAL: Not "default"!
}
```

**Error Pattern**:

- ❌ `f5xc-api-get-quota-status` with namespace "default" → ERROR
- ❌ `f5xc-api-list-namespace-quotas` with namespace "default" → ERROR
- ❌ All namespace API calls with "default" → ERROR

**Likely Cause**: The tenant `f5-amer-ent` does not have a namespace called "default". The actual namespace is "r-mordasiewicz".

### Resolution

**Corrected Test Parameters**:

```bash
# OLD (failing):
namespace: "default"

# NEW (correct):
namespace: "r-mordasiewicz"
```

### Next Steps

1. ✅ Update all UAT test scenarios to use namespace "r-mordasiewicz"
2. ⏳ Re-run OpenCode tests with corrected namespace
3. ⏳ Verify quota API returns valid data
4. ⏳ Complete UAT Test 2-6 with correct namespace
5. ⏳ Update UAT guide with namespace discovery step

### Test Commands with Correct Namespace

#### Test 1: Check Quota Status

```bash
opencode run "Use f5xc-api-get-quota-status tool to check healthcheck quota in namespace 'r-mordasiewicz'"
```

#### Test 2: List All Quotas

```bash
opencode run "Use f5xc-api-list-namespace-quotas tool to list all quotas in namespace 'r-mordasiewicz'"
```

#### Test 3: Direct API Call

```bash
opencode run "Execute f5xc-api-billingandusage-usage-list with pathParams namespace='r-mordasiewicz'"
```

### Lessons Learned

1. **Always check profile configuration** before testing with specific namespaces
2. **Namespace "default" is not universal** - each tenant may have different namespace names
3. **Profile's defaultNamespace field** indicates the correct namespace to use
4. **Generic API errors** often indicate resource (namespace) doesn't exist rather than permission issues

### UAT Guide Update Required

The UAT guide (`claudedocs/quota-awareness-uat-guide.md`) assumes namespace "default" exists. Need to add:

#### Pre-Test Step 0: Namespace Discovery

```bash
# Check active profile configuration
cat ~/.config/f5xc/profiles/$(cat ~/.config/f5xc/active_profile).json

# Use the defaultNamespace value for all tests
```

**Updated Test Parameters**:
All test scenarios should use the namespace from profile configuration, not hardcoded "default".
