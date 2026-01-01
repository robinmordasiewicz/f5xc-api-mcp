---
page_title: f5xc_network - f5xc-api-mcp
subcategory: Sites
description: GET Site Networks.
---

# Network

!!! info "Low Risk"
    Operations on this resource are generally safe.

Gets Networks Associated to Site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-network-get` | GET Site Networks. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Site-1` |

## Example Usage

Ask Claude to help you work with Network resources:

### Get Network Details

> "Get details of the network named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh sites create network -n <namespace> -i network.yaml

# Get
xcsh sites get network <name> -n <namespace>

# List
xcsh sites list network -n <namespace>

# Delete
xcsh sites delete network <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_network" "example" {
  name      = "example-network"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
