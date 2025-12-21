---
page_title: f5xc_global_network - f5xc-api-mcp
subcategory: Infrastructure
description: Global Network List.
---

# Global Network

API to GET list of Global Network in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-global-network-list` | Global Network List. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `site` | Site |

## Example Usage

Ask Claude to help you work with Global Network resources:

### List Global Networks

> "List all global-networks in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl infrastructure create global_network -n <namespace> -i global_network.yaml

# Get
f5xcctl infrastructure get global_network <name> -n <namespace>

# List
f5xcctl infrastructure list global_network -n <namespace>

# Delete
f5xcctl infrastructure delete global_network <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_global_network" "example" {
  name      = "example-global-network"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
