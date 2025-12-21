---
page_title: f5xc_by_network - f5xc-api-mcp
subcategory: Observability
description: L3l4 Network Traffic Query.
---

# By Network

Request to GET l3l4 Network Traffic data.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-by-network-create` | L3l4 Network Traffic Query. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `network_id` | NetworkId |

## Example Usage

Ask Claude to help you work with By Network resources:

### Create By Network

> "Create a by-network named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create by_network -n <namespace> -i by_network.yaml

# Get
f5xcctl configuration get by_network -n <namespace> <name>

# List
f5xcctl configuration list by_network -n <namespace>

# Delete
f5xcctl configuration delete by_network -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_by_network" "example" {
  name      = "example-by-network"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
