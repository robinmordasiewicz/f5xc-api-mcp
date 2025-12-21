---
page_title: f5xc_scim - f5xc-api-mcp
subcategory: Identity
description: Update OIDC provider SCIM Integration.
---

# Scim

Enables / Disables the SCIM integration for the OIDC provider.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-scim-update` | Update OIDC provider SCIM Integration. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Scim resources:

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create scim -n <namespace> -i scim.yaml

# Get
f5xcctl configuration get scim -n <namespace> <name>

# List
f5xcctl configuration list scim -n <namespace>

# Delete
f5xcctl configuration delete scim -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_scim" "example" {
  name      = "example-scim"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
