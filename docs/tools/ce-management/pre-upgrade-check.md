---
page_title: f5xc_pre_upgrade_check - f5xc-api-mcp
subcategory: Ce Management
description: Pre upgrade check.
---

# Pre Upgrade Check

!!! info "Low Risk"
    Operations on this resource are generally safe.

API to check if site is ready for upgrade.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cemanagement-pre-upgrade-check-get` | Pre upgrade check. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Blogging-app.` |
| `namespace` | Namespace | `Shared` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `sw_version` | Software version to upgrade to. | `Crt-20241107-1123.` |

## Example Usage

Ask Claude to help you work with Pre Upgrade Check resources:

### Get Pre Upgrade Check Details

> "Get details of the pre-upgrade-check named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh ce_management create pre_upgrade_check -n <namespace> -i pre_upgrade_check.yaml

# Get
xcsh ce_management get pre_upgrade_check <name> -n <namespace>

# List
xcsh ce_management list pre_upgrade_check -n <namespace>

# Delete
xcsh ce_management delete pre_upgrade_check <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_pre_upgrade_check" "example" {
  name      = "example-pre-upgrade-check"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
