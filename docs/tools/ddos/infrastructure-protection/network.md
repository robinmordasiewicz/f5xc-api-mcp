---
page_title: f5xc_network - f5xc-api-mcp
subcategory: Ddos
description: List networks.
---

# Network

!!! info "Low Risk"
    Operations on this resource are generally safe.

Returns a list available reports to be downloaded. Reports summarise an event or a mitigation in a
single PDF document.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-network-list` | List networks. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

## Example Usage

Ask Claude to help you work with Network resources:

### List Networks

> "List all networks in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh ddos create network -n <namespace> -i network.yaml

# Get
xcsh ddos get network <name> -n <namespace>

# List
xcsh ddos list network -n <namespace>

# Delete
xcsh ddos delete network <name> -n <namespace>
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
