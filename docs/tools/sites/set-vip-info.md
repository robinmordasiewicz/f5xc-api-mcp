---
page_title: f5xc_set_vip_info - f5xc-api-mcp
subcategory: Sites
description: Configure AWS VPC Site VIP Information
---

# Set Vip Info

Configure AWS VPC Site VIP Information

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-site-set-vip-info-create` | Configure AWS VPC Site VIP Information |

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
f5xcctl apply -f set_vip_info.yaml

# Get
f5xcctl get set_vip_info {name} -n {namespace}

# List
f5xcctl get set_vip_infos -n {namespace}

# Delete
f5xcctl delete set_vip_info {name} -n {namespace}
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
