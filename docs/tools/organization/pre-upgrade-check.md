---
page_title: f5xc_pre_upgrade_check - f5xc-api-mcp
subcategory: Organization
description: Pre upgrade check
---

# Pre Upgrade Check

API to check if site is ready for upgrade

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-pre-upgrade-check-get` | Pre upgrade check |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | name |
| `namespace` | namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `sw_version` | The sw_version parameter |

## Example Usage

Ask Claude to help you work with Pre Upgrade Check resources:

### Get Pre Upgrade Check Details

> "Get details of the pre-upgrade-check named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f pre_upgrade_check.yaml

# Get
f5xcctl get pre_upgrade_check {name} -n {namespace}

# List
f5xcctl get pre_upgrade_checks -n {namespace}

# Delete
f5xcctl delete pre_upgrade_check {name} -n {namespace}
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
