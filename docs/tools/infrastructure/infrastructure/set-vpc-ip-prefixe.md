---
page_title: f5xc_set_vpc_ip_prefixe - f5xc-api-mcp
subcategory: Infrastructure
description: Configure VPC IP prefixes.
---

# Set VPC IP Prefixe

Configure VPC IP prefix set.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-set-vpc-ip-prefixe-create` | Configure VPC IP prefixes. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Set VPC IP Prefixe resources:

### Create Set VPC IP Prefixe

> "Create a set-vpc-ip-prefixe named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl infrastructure create set_vpc_ip_prefixe -n <namespace> -i set_vpc_ip_prefixe.yaml

# Get
f5xcctl infrastructure get set_vpc_ip_prefixe <name> -n <namespace>

# List
f5xcctl infrastructure list set_vpc_ip_prefixe -n <namespace>

# Delete
f5xcctl infrastructure delete set_vpc_ip_prefixe <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_set_vpc_ip_prefixe" "example" {
  name      = "example-set-vpc-ip-prefixe"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
