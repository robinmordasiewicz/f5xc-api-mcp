---
page_title: f5xc_upgrade_statu - f5xc-api-mcp
subcategory: Organization
description: Get Upgrade Status
---

# Upgrade Statu

API to get upgrade status of a site

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-upgrade-statu-get` | Get Upgrade Status |
| `f5xc-api-core-upgrade-statu-list` | Upgrade Status |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | name |
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Upgrade Statu resources:

### List Upgrade Status

> "List all upgrade-status in the 'production' namespace"

### Get Upgrade Statu Details

> "Get details of the upgrade-statu named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f upgrade_statu.yaml

# Get
f5xcctl get upgrade_statu {name} -n {namespace}

# List
f5xcctl get upgrade_status -n {namespace}

# Delete
f5xcctl delete upgrade_statu {name} -n {namespace}
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
