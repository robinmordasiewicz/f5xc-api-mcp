/**
 * Error Resolution Prompts (Phase B)
 *
 * Provides guided diagnosis and resolution workflows for common
 * F5XC API errors. These prompts help users troubleshoot issues
 * systematically with framework-specific guidance.
 */

/**
 * Error resolution prompt definition
 */
export interface ErrorPrompt {
  /** HTTP status code */
  code: number;
  /** Error type name */
  name: string;
  /** Human-readable description */
  description: string;
  /** Prompt arguments */
  arguments: ErrorPromptArgument[];
  /** Prompt template */
  template: string;
}

/**
 * Error prompt argument
 */
export interface ErrorPromptArgument {
  /** Argument name */
  name: string;
  /** Argument description */
  description: string;
  /** Whether argument is required */
  required: boolean;
}

/**
 * 401 Unauthorized - Authentication Issues
 */
export const error401Prompt: ErrorPrompt = {
  code: 401,
  name: "resolve-401-unauthorized",
  description: "Diagnose and resolve authentication failures (401 Unauthorized)",
  arguments: [
    {
      name: "operation",
      description: "The API operation that failed (e.g., 'create http-loadbalancer')",
      required: false,
    },
    {
      name: "error_message",
      description: "The specific error message received",
      required: false,
    },
  ],
  template: `# 401 Unauthorized - Authentication Resolution

## Common Causes
1. **Missing API Token**: F5XC_API_TOKEN environment variable not set
2. **Expired Token**: API token has expired and needs regeneration
3. **Invalid Token**: Token was revoked or is malformed
4. **Wrong Tenant**: Token is for a different F5XC tenant

## Diagnosis Steps

### Step 1: Verify Token Configuration
Check if the API token is properly configured:
- Environment variable: F5XC_API_TOKEN
- Tenant URL: F5XC_API_URL

### Step 2: Validate Token
Use f5xc-api-server-info to check authentication status.
If not authenticated, the token needs to be set or refreshed.

### Step 3: Token Regeneration
If the token is expired:
1. Log into F5 Distributed Cloud Console
2. Navigate to Account Settings → Credentials
3. Generate a new API Token
4. Set F5XC_API_TOKEN with the new value

## Related Tools
- f5xc-api-server-info: Check current authentication status
- f5xc-api-search-tools: Find authentication-related operations

## Resolution Checklist
- [ ] Verify F5XC_API_TOKEN is set
- [ ] Verify F5XC_API_URL points to correct tenant
- [ ] Check token expiration in Console
- [ ] Regenerate token if needed
`,
};

/**
 * 403 Forbidden - Authorization Issues
 */
export const error403Prompt: ErrorPrompt = {
  code: 403,
  name: "resolve-403-forbidden",
  description: "Diagnose and resolve authorization failures (403 Forbidden)",
  arguments: [
    {
      name: "operation",
      description: "The API operation that failed",
      required: false,
    },
    {
      name: "namespace",
      description: "The namespace where the operation was attempted",
      required: false,
    },
    {
      name: "resource",
      description: "The resource type being accessed",
      required: false,
    },
  ],
  template: `# 403 Forbidden - Authorization Resolution

## Common Causes
1. **Insufficient Permissions**: User lacks RBAC permissions for this operation
2. **Namespace Restrictions**: User cannot access resources in this namespace
3. **Resource-Level Policies**: Resource has access restrictions
4. **Subscription Required**: Operation requires an addon service subscription

## Diagnosis Steps

### Step 1: Check User Roles
Verify your user account has appropriate roles:
- Namespace Admin: Full access within namespace
- Tenant Admin: Full access across tenant
- Custom roles: Check specific permissions

### Step 2: Verify Namespace Access
Ensure you have access to the target namespace.
Use f5xc-api-search-tools with query "namespace" to find namespace operations.

### Step 3: Check Subscription Requirements
Some features require addon subscriptions:
- WAAP Advanced features
- Bot Defense
- API Security

Use f5xc-api-dependencies with action="subscriptions" to check requirements.

## Related Tools
- f5xc-api-dependencies: Check subscription requirements
- f5xc-api-search-tools: Find user/role operations

## Resolution Checklist
- [ ] Verify user role includes required permissions
- [ ] Confirm namespace access is granted
- [ ] Check if addon subscription is required
- [ ] Contact tenant admin if permissions needed
`,
};

/**
 * 404 Not Found - Resource Issues
 */
export const error404Prompt: ErrorPrompt = {
  code: 404,
  name: "resolve-404-not-found",
  description: "Diagnose and resolve resource not found errors (404 Not Found)",
  arguments: [
    {
      name: "resource_type",
      description: "The type of resource (e.g., 'http-loadbalancer')",
      required: false,
    },
    {
      name: "resource_name",
      description: "The name of the missing resource",
      required: false,
    },
    {
      name: "namespace",
      description: "The namespace being searched",
      required: false,
    },
  ],
  template: `# 404 Not Found - Resource Resolution

## Common Causes
1. **Resource Doesn't Exist**: The specified resource hasn't been created
2. **Wrong Namespace**: Resource exists in a different namespace
3. **Typo in Name**: Resource name is misspelled
4. **Deleted Resource**: Resource was previously deleted
5. **Wrong Domain**: Using incorrect API domain for this resource type

## Diagnosis Steps

### Step 1: Verify Resource Exists
Use the list operation to check if the resource exists:
- Search for list operations: f5xc-api-search-tools with query "list [resource_type]"
- Execute list in the target namespace

### Step 2: Check Other Namespaces
The resource might exist in a different namespace:
- List all namespaces
- Search for resource in each namespace

### Step 3: Verify Resource Type
Ensure you're using the correct resource type and API domain:
- Use f5xc-api-search-resources to find the correct resource
- Check domain matches (e.g., 'virtual' for load balancers)

## Related Tools
- f5xc-api-search-resources: Find resources by name
- f5xc-api-search-tools: Find list operations

## Resolution Checklist
- [ ] Verify resource name spelling
- [ ] Check correct namespace is specified
- [ ] Use list operation to find existing resources
- [ ] Create resource if it doesn't exist
`,
};

/**
 * 409 Conflict - Resource Conflict Issues
 */
export const error409Prompt: ErrorPrompt = {
  code: 409,
  name: "resolve-409-conflict",
  description: "Diagnose and resolve resource conflict errors (409 Conflict)",
  arguments: [
    {
      name: "resource_type",
      description: "The type of resource involved",
      required: false,
    },
    {
      name: "resource_name",
      description: "The name of the conflicting resource",
      required: false,
    },
    {
      name: "operation",
      description: "The operation attempted (create/update/delete)",
      required: false,
    },
  ],
  template: `# 409 Conflict - Resource Conflict Resolution

## Common Causes
1. **Duplicate Name**: Resource with same name already exists
2. **Version Conflict**: Resource was modified by another operation
3. **State Conflict**: Resource is in a transitional state
4. **Dependency Conflict**: Operation conflicts with dependent resources
5. **Concurrent Modification**: Race condition with another update

## Diagnosis Steps

### Step 1: Check for Existing Resource
Use get/list operations to check current resource state:
- If creating: resource may already exist
- If updating: resource may have been modified

### Step 2: Check Resource Dependencies
Use f5xc-api-dependencies to understand relationships:
- Check what depends on this resource
- Check what this resource depends on

### Step 3: Handle Version Conflicts
For update operations:
- Fetch latest version of resource
- Apply changes to fresh copy
- Retry update with current version

## Related Tools
- f5xc-api-dependencies: Check resource relationships
- f5xc-api-describe-tool: Get full schema for retry

## Resolution Checklist
- [ ] Check if resource already exists (for creates)
- [ ] Fetch latest resource version (for updates)
- [ ] Wait for transitional states to complete
- [ ] Resolve dependency conflicts first
- [ ] Retry operation with fresh data
`,
};

/**
 * 500 Internal Server Error - Server Issues
 */
export const error500Prompt: ErrorPrompt = {
  code: 500,
  name: "resolve-500-internal-error",
  description: "Diagnose and handle internal server errors (500 Internal Server Error)",
  arguments: [
    {
      name: "operation",
      description: "The operation that triggered the error",
      required: false,
    },
    {
      name: "error_message",
      description: "Any specific error message received",
      required: false,
    },
  ],
  template: `# 500 Internal Server Error - Resolution Guide

## Common Causes
1. **Transient Service Issue**: Temporary backend problem
2. **Invalid Request Body**: Malformed or invalid request data
3. **Backend Timeout**: Long-running operation timed out
4. **Service Maintenance**: Planned or unplanned maintenance
5. **Rate Limiting**: Too many requests in short period

## Diagnosis Steps

### Step 1: Validate Request
Check if request body is valid:
- Use f5xc-api-describe-tool to verify parameter requirements
- Check required fields and formats
- Validate JSON structure

### Step 2: Retry with Exponential Backoff
For transient issues:
- Wait 1 second, retry
- If fails, wait 2 seconds, retry
- Continue doubling wait time (max 30 seconds)

### Step 3: Simplify Operation
Try breaking complex operations into simpler steps:
- Create dependencies separately
- Reduce request complexity
- Check for optional fields causing issues

### Step 4: Check Service Status
If errors persist:
- Check F5 Distributed Cloud status page
- Review system announcements
- Contact F5 support if widespread issue

## Related Tools
- f5xc-api-describe-tool: Validate request schema
- f5xc-api-dependencies: Check prerequisites

## Resolution Checklist
- [ ] Validate request body against schema
- [ ] Retry with exponential backoff
- [ ] Simplify request if complex
- [ ] Check F5 service status
- [ ] Contact support if persistent
`,
};

/**
 * All error resolution prompts
 */
export const ERROR_PROMPTS: ErrorPrompt[] = [
  error401Prompt,
  error403Prompt,
  error404Prompt,
  error409Prompt,
  error500Prompt,
];

/**
 * Get error prompt by HTTP status code
 */
export function getErrorPrompt(code: number): ErrorPrompt | undefined {
  return ERROR_PROMPTS.find((p) => p.code === code);
}

/**
 * Get error prompt by name
 */
export function getErrorPromptByName(name: string): ErrorPrompt | undefined {
  return ERROR_PROMPTS.find((p) => p.name === name);
}

/**
 * Process error prompt template with arguments
 */
export function processErrorTemplate(prompt: ErrorPrompt, args: Record<string, string>): string {
  let processed = prompt.template;

  for (const [key, value] of Object.entries(args)) {
    const placeholder = new RegExp(`\\{\\{${key}\\}\\}`, "g");
    processed = processed.replace(placeholder, value || `[${key}]`);
  }

  return processed;
}
