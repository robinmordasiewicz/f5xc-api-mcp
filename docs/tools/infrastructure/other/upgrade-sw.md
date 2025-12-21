---
page_title: f5xc_upgrade_sw - f5xc-api-mcp
subcategory: Infrastructure
description: Upgrade SW.
---

# Upgrade Sw

Upgrade Site SW version.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-upgrade-sw-create` | Upgrade SW. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Upgrade Sw resources:

### Create Upgrade Sw

> "Create a upgrade-sw named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl infrastructure create upgrade_sw -n <namespace> -i upgrade_sw.yaml

# Get
f5xcctl infrastructure get upgrade_sw <name> -n <namespace>

# List
f5xcctl infrastructure list upgrade_sw -n <namespace>

# Delete
f5xcctl infrastructure delete upgrade_sw <name> -n <namespace>
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
