---
page_title: f5xc_upgrade_sw - f5xc-api-mcp
subcategory: Sites
description: Upgrade SW.
---

# Upgrade Sw

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Upgrade Site SW version.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-upgrade-sw-create` | Upgrade SW. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Ce398` |
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- upgrade-sw

## Example Usage

Ask Claude to help you work with Upgrade Sw resources:

### Create Upgrade Sw

> "Create a upgrade-sw named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh sites create upgrade_sw -n <namespace> -i upgrade_sw.yaml

# Get
xcsh sites get upgrade_sw <name> -n <namespace>

# List
xcsh sites list upgrade_sw -n <namespace>

# Delete
xcsh sites delete upgrade_sw <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_upgrade_sw" "example" {
  name      = "example-upgrade-sw"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
