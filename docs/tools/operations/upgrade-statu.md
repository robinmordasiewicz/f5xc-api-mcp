---
page_title: f5xc_upgrade_statu - f5xc-api-mcp
subcategory: Operations
description: Upgrade Status.
---

# Upgrade Statu

Request to GET the upgrade status.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-operations-upgrade-statu-list` | Upgrade Status. |

## Example Usage

Ask Claude to help you work with Upgrade Statu resources:

### List Upgrade Status

> "List all upgrade-status in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl operations create upgrade_statu -n <namespace> -i upgrade_statu.yaml

# Get
f5xcctl operations get upgrade_statu <name> -n <namespace>

# List
f5xcctl operations list upgrade_statu -n <namespace>

# Delete
f5xcctl operations delete upgrade_statu <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_upgrade_statu" "example" {
  name      = "example-upgrade-statu"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
