---
page_title: f5xc_network - f5xc-api-mcp
subcategory: Infrastructure Protection
description: List networks.
---

# Network

Returns a list available reports to be downloaded. Reports summarise an event or a mitigation in a
single PDF document.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructureprotection-network-list` | List networks. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Network resources:

### List Networks

> "List all networks in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl infrastructure_protection create network -n <namespace> -i network.yaml

# Get
f5xcctl infrastructure_protection get network <name> -n <namespace>

# List
f5xcctl infrastructure_protection list network -n <namespace>

# Delete
f5xcctl infrastructure_protection delete network <name> -n <namespace>
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
