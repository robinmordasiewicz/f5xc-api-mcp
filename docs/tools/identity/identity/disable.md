---
page_title: f5xc_disable - f5xc-api-mcp
subcategory: Identity
description: DisableUserInIDM.
---

# Disable

Disables user in Identity.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-disable-update` | DisableUserInIDM. |

## Example Usage

Ask Claude to help you work with Disable resources:

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create disable -n <namespace> -i disable.yaml

# Get
f5xcctl configuration get disable -n <namespace> <name>

# List
f5xcctl configuration list disable -n <namespace>

# Delete
f5xcctl configuration delete disable -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_disable" "example" {
  name      = "example-disable"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
