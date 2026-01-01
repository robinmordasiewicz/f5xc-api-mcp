---
page_title: f5xc_set_vpc_k8s_hostname - f5xc-api-mcp
subcategory: Sites
description: Configure VPC K8s hostnames.
---

# Set VPC K8S Hostname

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Configure VPC K8s node hostname set.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-set-vpc-k8s-hostname-create` | Configure VPC K8s hostnames. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `AWS-VPC-site-1.` |
| `namespace` | Namespace | `Default` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- set-vpc-k8s-hostname

## Example Usage

Ask Claude to help you work with Set VPC K8S Hostname resources:

### Create Set VPC K8S Hostname

> "Create a set-vpc-k8s-hostname named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh sites create set_vpc_k8s_hostname -n <namespace> -i set_vpc_k8s_hostname.yaml

# Get
xcsh sites get set_vpc_k8s_hostname <name> -n <namespace>

# List
xcsh sites list set_vpc_k8s_hostname -n <namespace>

# Delete
xcsh sites delete set_vpc_k8s_hostname <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_set_vpc_k8s_hostname" "example" {
  name      = "example-set-vpc-k8s-hostname"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
