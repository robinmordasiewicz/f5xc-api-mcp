# Quota Awareness UAT Testing Guide

**Version**: 2.1.0
**Date**: 2026-01-19
**Status**: Ready for Testing

## Executive Summary

This guide provides step-by-step User Acceptance Testing (UAT) procedures for the quota awareness
feature implemented in the F5XC MCP server. The quota awareness system performs **pre-flight quota
validation** before create operations, preventing resource creation failures due to quota exhaustion.

## Pre-Test Environment Setup

### Prerequisites

- F5XC MCP server built and ready (`npm run build` completed successfully)
- F5XC tenant access with API credentials
- Test environment: `default` namespace with healthcheck quota at **149/150** (99%)
- OpenCode CLI installed and configured (optional but recommended)

### Environment Variables

Ensure these are set in your shell or MCP client configuration:

```bash
# Authentication
export F5XC_API_URL="https://f5-sa.console.ves.volterra.io/api"
export F5XC_API_TOKEN="your-api-token-here"

# Quota Configuration
export F5XC_QUOTA_CHECK_ENABLED=true
export F5XC_QUOTA_CACHE_TTL=300
export F5XC_QUOTA_GREEN_THRESHOLD=79
export F5XC_QUOTA_YELLOW_THRESHOLD=99
export F5XC_QUOTA_RED_THRESHOLD=100
```

## Test Scenarios

### Scenario 1: Pre-Test Baseline Verification

**Objective**: Establish baseline quota status before testing

**Steps**:

1. Check current healthcheck quota in default namespace:

   ```json
   Tool: f5xc-api-get-quota-status
   Parameters: {
     "namespace": "default",
     "resourceType": "healthcheck"
   }
   ```

2. **Expected Result**:

```text
   Quota Status for healthcheck

   Namespace: default
   Current Usage: 149/150 (99%)
   Remaining: 1
   Status: ⚠️ Approaching limit

   Recommendation:
   Consider reviewing and cleaning up unused healthcheck resources
   before reaching the quota limit.
   ```

1. **Validation**:
   - ✅ Quota shows 149/150 usage
   - ✅ Threshold is "yellow" (⚠️)
   - ✅ Warning message appears
   - ✅ Remaining capacity is 1

### Scenario 2: Yellow Zone Creation (149→150)

**Objective**: Validate quota warning behavior when creating resource in yellow zone

**Current State**: 149/150 (99%)
**Expected Outcome**: Creation succeeds with warning

**Steps**:

1. Create healthcheck resource:

   ```json
   Tool: f5xc-api-virtual-healthcheck-create
   Parameters: {
     "pathParams": {
       "metadata.namespace": "default"
     },
     "body": {
       "metadata": {
         "name": "uat-test-yellow-zone",
         "namespace": "default"
       },
       "spec": {
         "http_health_check": {
           "path": "/health",
           "use_origin_server_name": {}
         },
         "healthy_threshold": 3,
         "unhealthy_threshold": 1,
         "interval": 30,
         "timeout": 3,
         "jitter_percent": 30
       }
     }
   }
   ```

2. **Expected Result**:
   - ✅ Resource created successfully
   - ⚠️ Warning message about approaching quota limit
   - 📊 Quota now shows 150/150

3. **Verification**:

   ```json
   Tool: f5xc-api-virtual-healthcheck-get
   Parameters: {
     "pathParams": {
       "metadata.namespace": "default",
       "metadata.name": "uat-test-yellow-zone"
     }
   }
   ```

   Expected: Resource exists and is retrievable

4. **Validation Checklist**:
   - [ ] Healthcheck created successfully
   - [ ] Warning message displayed
   - [ ] Server logs show yellow zone warning
   - [ ] Quota status shows 150/150 after creation

### Scenario 3: Red Zone Blocking (150/150 → Blocked)

**Objective**: Validate quota enforcement when attempting creation at 100%

**Current State**: 150/150 (100% - Red Zone)
**Expected Outcome**: Creation blocked with error

**Steps**:

1. Attempt to create another healthcheck:

   ```json
   Tool: f5xc-api-virtual-healthcheck-create
   Parameters: {
     "pathParams": {
       "metadata.namespace": "default"
     },
     "body": {
       "metadata": {
         "name": "uat-test-should-be-blocked",
         "namespace": "default"
       },
       "spec": {
         "http_health_check": {
           "path": "/status",
           "use_origin_server_name": {}
         },
         "healthy_threshold": 3,
         "unhealthy_threshold": 1,
         "interval": 30,
         "timeout": 3,
         "jitter_percent": 30
       }
     }
   }
   ```

2. **Expected Error**:

```text
   ❌ ERROR: Resource quota limit reached

   Resource Type: healthcheck
   Namespace: default
   Current Usage: 150/150 (100%)
   Status: ❌ At limit - cannot create additional resources

   Action Required:
   1. Delete unused healthcheck resources in the 'default' namespace
   2. Request quota increase from F5 XC support
   3. Use a different namespace with available quota
   ```

1. **Verification**:

   ```json
   Tool: f5xc-api-virtual-healthcheck-get
   Parameters: {
     "pathParams": {
       "metadata.namespace": "default",
       "metadata.name": "uat-test-should-be-blocked"
     }
   }
   ```

   Expected: 404 Not Found - resource never created

2. **Validation Checklist**:
   - [ ] Creation attempt blocked before API call
   - [ ] Error message clearly states quota limit reached
   - [ ] Action Required section provides 3 remediation options
   - [ ] Quota status remains 150/150 (no change)
   - [ ] Resource does NOT exist (confirmed via GET)
   - [ ] Server logs show red zone blocking
   - [ ] Response time < 100ms (cached quota check)

### Scenario 4: Quota Cache Management

**Objective**: Validate quota cache behavior and manual cache clearing

#### Test 4A: Cache Hit Behavior

1. **First Call** (Cache Miss):

   ```json
   Tool: f5xc-api-get-quota-status
   Parameters: {
     "namespace": "default",
     "resourceType": "healthcheck"
   }
   ```

   Expected:
   - Cache MISS → Query F5XC API
   - Response time: ~500-1000ms (API latency)
   - Cache entry created with 5-minute TTL

2. **Second Call** (Cache Hit - within 5 minutes):

   ```json
   Tool: f5xc-api-get-quota-status
   Parameters: {
     "namespace": "default",
     "resourceType": "healthcheck"
   }
   ```

   Expected:
   - Cache HIT → No API call
   - Response time: <50ms (in-memory)
   - Same quota data returned

3. **Validation**:
   - [ ] First call shows API query in server logs
   - [ ] Second call shows cache hit in server logs
   - [ ] Response time significantly faster on cache hit
   - [ ] Data consistency between calls

#### Test 4B: Manual Cache Clearing

1. **Clear Namespace Cache**:

   ```json
   Tool: f5xc-api-clear-quota-cache
   Parameters: {
     "namespace": "default"
   }
   ```

   Expected: `✅ Cleared quota cache for namespace: default`

2. **Verify Cache Cleared**:

   ```json
   Tool: f5xc-api-get-quota-status
   Parameters: {
     "namespace": "default",
     "resourceType": "healthcheck"
   }
   ```

   Expected:
   - Cache MISS → Fresh API query
   - Quota data refreshed from F5XC

3. **Validation**:
   - [ ] Cache clear operation succeeds
   - [ ] Next quota query triggers API call (not cache)
   - [ ] Fresh data retrieved from F5XC

### Scenario 5: All Quota Tools Validation

**Objective**: Validate all three quota MCP tools

#### Test 5A: Get Quota Status (Specific Resource)

```json
Tool: f5xc-api-get-quota-status
Parameters: {
  "namespace": "default",
  "resourceType": "origin-pool"
}
```

**Expected**:

```text
Quota Status for origin-pool

Namespace: default
Current Usage: 45/200 (22%)
Remaining: 155
Status: ✅ Available capacity
```

**Validation**:

- [ ] Tool called correctly
- [ ] Response shows detailed quota information
- [ ] Percentage calculated correctly
- [ ] Green status (✅) for healthy quota level

#### Test 5B: List All Quotas

```json
Tool: f5xc-api-list-namespace-quotas
Parameters: {
  "namespace": "default",
  "showOnlyLimited": true
}
```

**Expected**:

```text
Quota Status for Namespace: default

Resource            | Limit | Current | Remaining | Usage | Status
--------------------|-------|---------|-----------|-------|-------
healthcheck         | 150   | 150     | 0         | 100%  | ❌
http-loadbalancer   | 50    | 12      | 38        | 24%   | ✅
origin-pool         | 200   | 45      | 155       | 22%   | ✅
api-credential      | 10    | 3       | 7         | 30%   | ✅
```

**Validation**:

- [ ] Table format is readable
- [ ] Only resources with limits shown (unlimited filtered out)
- [ ] Status icons correct (❌ for 100%, ✅ for <80%)
- [ ] All percentages calculated correctly

#### Test 5C: Clear All Cache

```json
Tool: f5xc-api-clear-quota-cache
Parameters: {}
```

**Expected**: `✅ Cleared all quota cache entries`

**Validation**:

- [ ] Global cache clear succeeds
- [ ] All namespaces affected
- [ ] Next quota query for any namespace triggers API call

### Scenario 6: Deterministic Behavior Validation

**Objective**: Verify that quota checking is predictive, not reactive

#### Test 6A: Pre-Execution Detection

**Query**: Attempt to create healthcheck when quota is 150/150

**Expected Flow**:

```text
1. MCP receives create request
2. Pre-execution quota check (< 10ms if cached)
3. Detects red zone (100% quota)
4. Returns error BEFORE F5XC API call
5. Total time: < 100ms
```

**Validation**:

- [ ] Error returned immediately (< 100ms)
- [ ] NO F5XC API call made (verify in logs: `grep "POST /api/config" server.log`)
- [ ] Quota check used cached data
- [ ] Error message is clear and actionable

#### Test 6B: Context-Aware Prevention

**Query**: "I want to create 5 new healthchecks. Current quota is 149/150. Is this possible?"

**Expected Response**:

```text
❌ This operation is NOT possible

Analysis:
- Current healthcheck quota: 149/150 (99%)
- Remaining capacity: 1 healthcheck
- Requested: 5 new healthchecks
- Gap: Need 4 additional quota slots

Recommendation:
1. Only 1 healthcheck can be created with current quota
2. To create 5 healthchecks, you need:
   - Delete 4 existing healthchecks, OR
   - Request quota increase to 154+ from F5 XC support
```

**Validation**:

- [ ] MCP demonstrates understanding of quota constraints
- [ ] Calculates capacity gaps accurately
- [ ] Provides proactive alternatives
- [ ] Prevents impossible operations before attempting

## Post-Test Cleanup

### Step 1: Delete Test Resources

```json
Tool: f5xc-api-virtual-healthcheck-delete
Parameters: {
  "pathParams": {
    "metadata.namespace": "default",
    "metadata.name": "uat-test-yellow-zone"
  }
}
```

**Expected**: `✅ Healthcheck 'uat-test-yellow-zone' deleted successfully`

### Step 2: Verify Quota Reset

```json
Tool: f5xc-api-get-quota-status
Parameters: {
  "namespace": "default",
  "resourceType": "healthcheck"
}
```

**Expected**:

```text
Quota Status for healthcheck

Namespace: default
Current Usage: 149/150 (99%)
Remaining: 1
Status: ⚠️ Approaching limit
```

**Validation**:

- [ ] Test resource deleted successfully
- [ ] Quota returns to 149/150 (pre-test state)
- [ ] Yellow zone status maintained

## Acceptance Criteria

### Functional Requirements

- ✅ Quota checks execute before create operations
- ✅ Yellow zone (99%) allows creation with warning
- ✅ Red zone (100%) blocks creation with error
- ✅ Error messages are clear and actionable
- ✅ All three quota tools function correctly
- ✅ Cache reduces API calls significantly (>80%)

### User Experience Requirements

- ✅ Error messages provide helpful recommendations
- ✅ Warning messages suggest concrete actions
- ✅ Quota status displays are human-readable
- ✅ Response times are fast (< 100ms for cached)

### Performance Requirements

- ✅ Quota checks add < 200ms latency to create operations
- ✅ Cache hit response time < 50ms
- ✅ Cache miss response time < 1000ms
- ✅ No performance degradation detected

### Reliability Requirements

- ✅ Graceful degradation if quota API unavailable
- ✅ Cache prevents quota API rate limiting
- ✅ Consistent behavior across test runs
- ✅ No memory leaks or resource exhaustion

## Test Execution Log Template

```markdown
# Quota Awareness UAT Execution

**Date**: YYYY-MM-DD
**Tester**: [Name]
**Environment**: F5XC Tenant (f5-sa.console.ves.volterra.io)
**Namespace**: default
**Initial Quota**: 149/150 healthcheck

## Scenario Results

### Scenario 1: Baseline Verification
- **Status**: ✅ Pass / ❌ Fail
- **Notes**: [Observations]

### Scenario 2: Yellow Zone Creation
- **Status**: ✅ Pass / ❌ Fail
- **Resource Created**: Yes / No
- **Warning Displayed**: Yes / No
- **Final Quota**: 150/150
- **Notes**: [Observations]

### Scenario 3: Red Zone Blocking
- **Status**: ✅ Pass / ❌ Fail
- **Blocked**: Yes / No
- **Error Message**: Clear / Unclear
- **Resource Exists**: No (expected) / Yes (failure)
- **Notes**: [Observations]

### Scenario 4: Cache Management
- **Cache Hit Test**: ✅ Pass / ❌ Fail
- **Cache Clear Test**: ✅ Pass / ❌ Fail
- **Performance**: Acceptable / Poor
- **Notes**: [Observations]

### Scenario 5: Quota Tools
- **Get Status**: ✅ Pass / ❌ Fail
- **List Quotas**: ✅ Pass / ❌ Fail
- **Clear Cache**: ✅ Pass / ❌ Fail
- **Notes**: [Observations]

### Scenario 6: Deterministic Behavior
- **Pre-Execution Detection**: ✅ Pass / ❌ Fail
- **Context-Aware**: ✅ Pass / ❌ Fail
- **Response Time**: < 100ms / > 100ms
- **Notes**: [Observations]

## Issues Discovered
- [List any bugs, errors, or unexpected behavior]

## Recommendations
- [Suggestions for improvement]

## Conclusion
- **Overall Status**: ✅ All Tests Passed / ⚠️ Partial Pass / ❌ Failed
- **Production Ready**: Yes / No / With Modifications
```

## Troubleshooting

### Issue: Quota check not triggering

**Solutions**:

1. Verify `F5XC_QUOTA_CHECK_ENABLED=true`
2. Check server logs for quota service calls
3. Verify namespace extraction from parameters
4. Test quota service directly

### Issue: Wrong quota data returned

**Solutions**:

1. Clear quota cache: `f5xc-api-clear-quota-cache`
2. Verify F5XC API credentials
3. Check namespace matches F5XC tenant
4. Verify resource type mapping in `quota-resource-mapping.ts`

### Issue: Cache not working

**Solutions**:

1. Verify `F5XC_QUOTA_CACHE_TTL` is set (default 300)
2. Check server logs for cache hit/miss events
3. Monitor memory usage
4. Clear cache and re-test

### Issue: Build failures

**Solutions**:

1. Run `npm run build` and check for TypeScript errors
2. Verify all imports use correct paths (`../../` for validate.ts)
3. Ensure quota tools use correct MCP server.tool() signature
4. Check that zod schemas are object literals, not ZodObject instances

## Next Steps

After successful UAT completion:

1. **Document Results**: Fill out test execution log
2. **Create GitHub Issue**: Report any bugs discovered
3. **Update Documentation**: Incorporate lessons learned
4. **Production Deployment**: Deploy with monitoring
5. **Monitor Performance**: Track quota API usage and cache hit rates

## Contact

For questions or issues during UAT:

- GitHub Issues: <https://github.com/robinmordasiewicz/f5xc-api-mcp/issues>
- Documentation: See README.md Quota Awareness section
