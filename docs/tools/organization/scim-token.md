---
page_title: f5xc_scim_token - f5xc-api-mcp
subcategory: Organization
description: Revoke SCIM API credential
---

# Scim Token

GetScimToken implements querying of scim token.
SCIM API token value will be visible only on create
API response.
This detail RPC will show the current token's expiry. Returns api credential object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-scim-token-create` | Revoke SCIM API credential |
| `f5xc-api-core-scim-token-list` | Get Scim Token |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Scim Token resources:

### Create Scim Token

> "Create a scim-token named 'example' in the 'production' namespace"

### List Scim Tokens

> "List all scim-tokens in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f scim_token.yaml

# Get
f5xcctl get scim_token {name} -n {namespace}

# List
f5xcctl get scim_tokens -n {namespace}

# Delete
f5xcctl delete scim_token {name} -n {namespace}
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
