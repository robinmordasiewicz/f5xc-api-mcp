# ADR-0003: Dual-Mode Operation Design

**Status**: Accepted
**Date**: 2025-01
**Deciders**: Project maintainers

## Context and Problem Statement

The F5 XC API MCP server needs to serve two distinct use cases with different requirements:

1. **Documentation Mode**: Users exploring APIs, learning patterns, understanding capabilities without F5 XC credentials
2. **Authenticated Mode**: Users performing actual API operations against their F5 XC tenant

These modes have different authentication requirements, error handling needs, and output
expectations. A single-mode design would either require credentials for all users (blocking
documentation use) or prevent actual API operations (limiting utility).

How can we support both documentation exploration and authenticated API operations in a seamless, user-friendly manner?

## Decision Drivers

* Accessibility - Documentation mode must work without credentials
* Security - Authenticated mode must protect tenant credentials
* User Experience - Mode switching must be intuitive and clear
* Functionality - Both modes must provide complete feature sets
* Testing - Both modes must be testable independently

## Considered Options

1. **Documentation Only**: Single mode without authentication
2. **Authentication Required**: Single mode requiring credentials
3. **Dual-Mode Operation**: Automatic mode detection with graceful degradation

## Decision Outcome

Chosen option: "**Dual-Mode Operation**", because it provides maximum accessibility for learning
while enabling full functionality for authenticated users, with automatic mode detection
requiring no explicit mode switching.

### Positive Consequences

* **Zero Barrier Documentation**: Users can explore without credentials
* **Full Authenticated Capabilities**: Real API operations when authenticated
* **Seamless Experience**: Automatic mode detection, no manual switching
* **Clear Output**: Mode-specific responses appropriate to context
* **Security**: Credentials never required for documentation
* **Testing**: Independent test suites for each mode

### Negative Consequences

* **Implementation Complexity**: Must handle both modes consistently
* **Testing Overhead**: Both modes require comprehensive coverage
* **Documentation Burden**: Must explain mode differences clearly

## Pros and Cons of the Options

### Documentation Only

* **Good**: Simple implementation, no authentication complexity
* **Good**: Maximum accessibility for all users
* **Good**: No credential security concerns
* **Bad**: Cannot perform actual API operations
* **Bad**: Users must use separate tools for real work
* **Bad**: No end-to-end workflow support

### Authentication Required

* **Good**: Full API functionality
* **Good**: Simple single-mode implementation
* **Good**: No mode-switching logic needed
* **Bad**: Blocks documentation exploration
* **Bad**: Higher barrier to entry for new users
* **Bad**: Cannot be used in environments without credentials

### Dual-Mode Operation

* **Good**: Best of both worlds - documentation + operations
* **Good**: Automatic mode detection
* **Good**: Appropriate responses per mode
* **Good**: No barrier to entry, full capabilities when authenticated
* **Bad**: More complex implementation
* **Bad**: Both modes need testing
* **Bad**: Must document mode differences

## Implementation Details

### Mode Detection Logic

```typescript
function detectOperationMode(): 'documentation' | 'authenticated' {
  // Check for F5 XC authentication via external package
  const authStatus = checkAuthenticationStatus();

  if (authStatus.isAuthenticated) {
    return 'authenticated';
  }

  return 'documentation';
}
```

### Mode-Specific Behavior

**Documentation Mode**:

* Returns CLI command equivalents (f5xcctl, curl)
* Shows example request/response structures
* Explains API authentication requirements
* Provides setup instructions
* No actual API calls made

**Authenticated Mode**:

* Performs actual API calls to tenant
* Returns real API responses
* Handles rate limiting and errors
* Manages authentication tokens
* Enforces tenant permissions

### Tool Execution Flow

```text
User Request → Detect Mode
    │
    ├─ Documentation Mode
    │   ├─ Generate CLI equivalents
    │   ├─ Show example structures
    │   └─ Return educational output
    │
    └─ Authenticated Mode
        ├─ Validate credentials
        ├─ Execute actual API call
        ├─ Handle API response
        └─ Return real results
```

### Response Format Examples

**Documentation Mode Response**:

```text
Mode: Documentation (no authentication configured)

To execute this operation, use:

CLI Command:
  f5xcctl get http-loadbalancer my-lb --namespace shared

cURL Equivalent:
  curl -X GET https://tenant.console.ves.volterra.io/api/v1/...
       -H "Authorization: Bearer $API_TOKEN"

Expected Response Structure:
  {
    "name": "my-lb",
    "domains": ["example.com"],
    ...
  }

Setup Instructions:
  Configure authentication with: /configure-auth
```

**Authenticated Mode Response**:

```text
Mode: Authenticated (tenant: my-tenant)

API Call: GET /api/v1/config/namespaces/shared/http-loadbalancers/my-lb
Status: 200 OK

Response:
{
  "name": "my-lb",
  "domains": ["example.com"],
  "origin_pools": [...]
}
```

### Error Handling

**Documentation Mode**:

* No API errors (no calls made)
* Validation errors for invalid tool parameters
* Clear guidance on required authentication setup

**Authenticated Mode**:

* Standard HTTP error codes (401, 403, 404, 429, 500)
* Detailed error messages from API
* Authentication expiration handling
* Rate limit guidance

### Security Considerations

1. **Credential Protection**: Never expose credentials in documentation mode
2. **Mode Isolation**: Documentation mode cannot access authenticated operations
3. **Explicit Authentication**: Users must explicitly configure authentication
4. **Token Management**: Handled by external authentication package
5. **Audit Trail**: Authenticated operations logged appropriately

## Links

* Related: [ADR-0004: External Authentication Package](0004-external-auth-package.md)
* Implementation: `src/tools/discovery/execute.ts`, `src/server.ts`
* External Package: [@robinmordasiewicz/f5xc-auth](https://github.com/robinmordasiewicz/f5xc-auth)
* Issue: [#15 Dual-Mode Implementation](https://github.com/robinmordasiewicz/f5xc-api-mcp/issues/15)

## Notes

The dual-mode design is a key differentiator for this MCP server, enabling both educational
use and production operations. This approach maximizes accessibility while preserving full
functionality.

Mode detection happens automatically on every tool execution, requiring no manual mode
switching. Users naturally transition from documentation mode (learning) to authenticated
mode (operating) by configuring credentials when ready.

This design pattern could be applied to other API-focused MCP servers facing similar
documentation vs. operation trade-offs.
