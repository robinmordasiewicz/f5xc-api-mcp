---
page_title: f5xc_set_vpc_ip_prefixe - f5xc-api-mcp
subcategory: Sites
description: Configure VPC IP prefixes.
---

# Set VPC IP Prefixe

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Configure VPC IP prefix set.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-set-vpc-ip-prefixe-create` | Configure VPC IP prefixes. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `AWS-tgw-site-1.` |
| `namespace` | Namespace | `Default` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- set-vpc-ip-prefixe

## Example Usage

Ask Claude to help you work with Set VPC IP Prefixe resources:

### Create Set VPC IP Prefixe

> "Create a set-vpc-ip-prefixe named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh sites create set_vpc_ip_prefixe -n <namespace> -i set_vpc_ip_prefixe.yaml

# Get
xcsh sites get set_vpc_ip_prefixe <name> -n <namespace>

# List
xcsh sites list set_vpc_ip_prefixe -n <namespace>

# Delete
xcsh sites delete set_vpc_ip_prefixe <name> -n <namespace>
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
