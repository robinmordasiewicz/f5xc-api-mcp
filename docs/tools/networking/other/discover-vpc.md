---
page_title: f5xc_discover_vpc - f5xc-api-mcp
subcategory: Networking
description: Cloud Connect VPC Discovery.
---

# Discover VPC

Returns all the vpcs for a specified cloud provider, region and cred.
For AWS it returns all the
vpcs which are not attached to any transit gateway in that region.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-discover-vpc-create` | Cloud Connect VPC Discovery. |

## Example Usage

Ask Claude to help you work with Discover VPC resources:

### Create Discover VPC

> "Create a discover-vpc named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create discover_vpc -n <namespace> -i discover_vpc.yaml

# Get
f5xcctl configuration get discover_vpc -n <namespace> <name>

# List
f5xcctl configuration list discover_vpc -n <namespace>

# Delete
f5xcctl configuration delete discover_vpc -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_discover_vpc" "example" {
  name      = "example-discover-vpc"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
