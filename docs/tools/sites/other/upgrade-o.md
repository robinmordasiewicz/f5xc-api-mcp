---
page_title: f5xc_upgrade_o - f5xc-api-mcp
subcategory: Sites
description: Upgrade OS.
---

# Upgrade O

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Upgrade Site OS version.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-upgrade-o-create` | Upgrade OS. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Ce398` |
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- upgrade-o

## Example Usage

Ask Claude to help you work with Upgrade O resources:

### Create Upgrade O

> "Create a upgrade-o named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh sites create upgrade_o -n <namespace> -i upgrade_o.yaml

# Get
xcsh sites get upgrade_o <name> -n <namespace>

# List
xcsh sites list upgrade_o -n <namespace>

# Delete
xcsh sites delete upgrade_o <name> -n <namespace>
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
