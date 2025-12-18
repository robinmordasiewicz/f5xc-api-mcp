---
page_title: f5xc_upgrade_o - f5xc-api-mcp
subcategory: Organization
description: Upgrade OS
---

# Upgrade O

Upgrade Site OS version

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-upgrade-o-create` | Upgrade OS |

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
f5xcctl apply -f upgrade_o.yaml

# Get
f5xcctl get upgrade_o {name} -n {namespace}

# List
f5xcctl get upgrade_os -n {namespace}

# Delete
f5xcctl delete upgrade_o {name} -n {namespace}
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
