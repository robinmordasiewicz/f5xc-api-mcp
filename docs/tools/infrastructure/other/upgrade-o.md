---
page_title: f5xc_upgrade_o - f5xc-api-mcp
subcategory: Infrastructure
description: Upgrade OS.
---

# Upgrade O

Upgrade Site OS version.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-upgrade-o-create` | Upgrade OS. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Upgrade O resources:

### Create Upgrade O

> "Create a upgrade-o named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create upgrade_o -n <namespace> -i upgrade_o.yaml

# Get
f5xcctl configuration get upgrade_o -n <namespace> <name>

# List
f5xcctl configuration list upgrade_o -n <namespace>

# Delete
f5xcctl configuration delete upgrade_o -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_upgrade_o" "example" {
  name      = "example-upgrade-o"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
