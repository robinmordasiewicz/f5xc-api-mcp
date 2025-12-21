---
page_title: f5xc_upgrade_statu - f5xc-api-mcp
subcategory: Infrastructure
description: GET Upgrade Status.
---

# Upgrade Statu

API to GET upgrade status of a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-upgrade-statu-get` | GET Upgrade Status. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Upgrade Statu resources:

### Get Upgrade Statu Details

> "Get details of the upgrade-statu named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create upgrade_statu -n <namespace> -i upgrade_statu.yaml

# Get
f5xcctl configuration get upgrade_statu -n <namespace> <name>

# List
f5xcctl configuration list upgrade_statu -n <namespace>

# Delete
f5xcctl configuration delete upgrade_statu -n <namespace> <name>
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
