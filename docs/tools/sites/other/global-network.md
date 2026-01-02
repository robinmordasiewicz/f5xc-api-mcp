---
page_title: f5xc_global_network - f5xc-api-mcp
subcategory: Sites
description: Global Network List.
---

# Global Network

!!! info "Low Risk"
    Operations on this resource are generally safe.

API to GET list of Global Network in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-global-network-list` | Global Network List. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |
| `site` | Site | `Ce398` |

## Example Usage

Ask Claude to help you work with Global Network resources:

### List Global Networks

> "List all global-networks in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh sites create global_network -n <namespace> -i global_network.yaml

# Get
xcsh sites get global_network <name> -n <namespace>

# List
xcsh sites list global_network -n <namespace>

# Delete
xcsh sites delete global_network <name> -n <namespace>
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
