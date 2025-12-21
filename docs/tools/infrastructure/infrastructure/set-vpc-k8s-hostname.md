---
page_title: f5xc_set_vpc_k8s_hostname - f5xc-api-mcp
subcategory: Infrastructure
description: Configure VPC K8s hostnames.
---

# Set VPC K8S Hostname

Configure VPC K8s node hostname set.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-set-vpc-k8s-hostname-create` | Configure VPC K8s hostnames. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Set VPC K8S Hostname resources:

### Create Set VPC K8S Hostname

> "Create a set-vpc-k8s-hostname named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create set_vpc_k8s_hostname -n <namespace> -i set_vpc_k8s_hostname.yaml

# Get
f5xcctl configuration get set_vpc_k8s_hostname -n <namespace> <name>

# List
f5xcctl configuration list set_vpc_k8s_hostname -n <namespace>

# Delete
f5xcctl configuration delete set_vpc_k8s_hostname -n <namespace> <name>
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
