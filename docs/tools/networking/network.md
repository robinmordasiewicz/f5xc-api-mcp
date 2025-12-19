---
page_title: f5xc_network - f5xc-api-mcp
subcategory: Networking
description: Get Site Networks
---

# Network

Returns a list available reports to be downloaded. Reports summarise an event or a mitigation in a
single PDF document.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-network-get` | Get Site Networks |
| `f5xc-api-core-network-list` | List networks |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Network resources:

### List Networks

> "List all networks in the 'production' namespace"

### Get Network Details

> "Get details of the network named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f network.yaml

# Get
f5xcctl get network {name} -n {namespace}

# List
f5xcctl get networks -n {namespace}

# Delete
f5xcctl delete network {name} -n {namespace}
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
