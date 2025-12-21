---
page_title: f5xc_network - f5xc-api-mcp
subcategory: Observability
description: GET Site Networks.
---

# Network

Gets Networks Associated to Site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-network-get` | GET Site Networks. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |

## Example Usage

Ask Claude to help you work with Network resources:

### Get Network Details

> "Get details of the network named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create network -n <namespace> -i network.yaml

# Get
f5xcctl configuration get network -n <namespace> <name>

# List
f5xcctl configuration list network -n <namespace>

# Delete
f5xcctl configuration delete network -n <namespace> <name>
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
