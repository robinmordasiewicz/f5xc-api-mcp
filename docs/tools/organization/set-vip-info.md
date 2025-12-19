---
page_title: f5xc_set_vip_info - f5xc-api-mcp
subcategory: Organization
description: Configure AWS TGW Site VIP Information
---

# Set Vip Info

Configure AWS TGW Site VIP Information

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-set-vip-info-create` | Configure AWS TGW Site VIP Information |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Set Vip Info resources:

### Create Set Vip Info

> "Create a set-vip-info named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create set_vip_info -n <namespace> -i set_vip_info.yaml

# Get
f5xcctl configuration get set_vip_info -n <namespace> <name>

# List
f5xcctl configuration list set_vip_info -n <namespace>

# Delete
f5xcctl configuration delete set_vip_info -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_set_vip_info" "example" {
  name      = "example-set-vip-info"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
