---
page_title: f5xc_set_tgw_info - f5xc-api-mcp
subcategory: Organization
description: Configure TGW Information
---

# Set Tgw Info

Configure TGW Information like tgw-id, volterra site's vpc-id

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-set-tgw-info-create` | Configure TGW Information |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Set Tgw Info resources:

### Create Set Tgw Info

> "Create a set-tgw-info named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create set_tgw_info -n <namespace> -i set_tgw_info.yaml

# Get
f5xcctl configuration get set_tgw_info -n <namespace> <name>

# List
f5xcctl configuration list set_tgw_info -n <namespace>

# Delete
f5xcctl configuration delete set_tgw_info -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_set_tgw_info" "example" {
  name      = "example-set-tgw-info"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
