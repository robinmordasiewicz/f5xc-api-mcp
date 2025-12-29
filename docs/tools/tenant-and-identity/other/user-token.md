---
page_title: f5xc_user_token - f5xc-api-mcp
subcategory: Tenant And Identity
description: GET Web App Scanning Service User Token.
---

# User Token

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET one time token to connect Web App Scanning Service.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-user-token-list` | GET Web App Scanning Service User Token. |

## Example Usage

Ask Claude to help you work with User Token resources:

### List User Tokens

> "List all user-tokens in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl config user-token list --namespace {namespace}
```

List all user-tokens

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create user_token -n <namespace> -i user_token.yaml

# Get
f5xcctl tenant_and_identity get user_token <name> -n <namespace>

# List
f5xcctl tenant_and_identity list user_token -n <namespace>

# Delete
f5xcctl tenant_and_identity delete user_token <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_user_token" "example" {
  name      = "example-user-token"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
