---
page_title: f5xc_unset - f5xc-api-mcp
subcategory: Identity
description: Unset admin ntfn preference.
---

# Unset

Unset admin ntfn preference unsets specific admin notification preference for the user and store it
in user settings object.
It can be used in email newsletters to allow easy unsubscribing for users.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-unset-update` | Unset admin ntfn preference. |

## Example Usage

Ask Claude to help you work with Unset resources:

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create unset -n <namespace> -i unset.yaml

# Get
f5xcctl configuration get unset -n <namespace> <name>

# List
f5xcctl configuration list unset -n <namespace>

# Delete
f5xcctl configuration delete unset -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_unset" "example" {
  name      = "example-unset"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
