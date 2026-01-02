---
page_title: f5xc_scim_token - f5xc-api-mcp
subcategory: Authentication
description: Revoke SCIM API credential.
---

# Scim Token

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GetScimToken implements querying of scim token.
SCIM API token value will be visible only on create
API response.
This detail RPC will show the current token's expiry. Returns API credential object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-authentication-scim-token-create` | Revoke SCIM API credential. |
| `f5xc-api-authentication-scim-token-list` | GET Scim Token. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- scim-token

## Example Usage

Ask Claude to help you work with Scim Token resources:

### Create Scim Token

> "Create a scim-token named 'example' in the 'production' namespace"

### List Scim Tokens

> "List all scim-tokens in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh authentication create scim_token -n <namespace> -i scim_token.yaml

# Get
xcsh authentication get scim_token <name> -n <namespace>

# List
xcsh authentication list scim_token -n <namespace>

# Delete
xcsh authentication delete scim_token <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_scim_token" "example" {
  name      = "example-scim-token"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
