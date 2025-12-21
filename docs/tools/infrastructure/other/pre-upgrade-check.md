---
page_title: f5xc_pre_upgrade_check - f5xc-api-mcp
subcategory: Infrastructure
description: Pre upgrade check.
---

# Pre Upgrade Check

API to check if site is ready for upgrade.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-pre-upgrade-check-get` | Pre upgrade check. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `sw_version` | Software version to upgrade to. |

## Example Usage

Ask Claude to help you work with Pre Upgrade Check resources:

### Get Pre Upgrade Check Details

> "Get details of the pre-upgrade-check named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create pre_upgrade_check -n <namespace> -i pre_upgrade_check.yaml

# Get
f5xcctl configuration get pre_upgrade_check -n <namespace> <name>

# List
f5xcctl configuration list pre_upgrade_check -n <namespace>

# Delete
f5xcctl configuration delete pre_upgrade_check -n <namespace> <name>
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
