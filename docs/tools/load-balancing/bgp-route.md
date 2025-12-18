---
page_title: f5xc_bgp_route - f5xc-api-mcp
subcategory: Load Balancing
description: Show BGP Routes
---

# Bgp Route

Show routes exported / imported via BGP

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-bgp-route-list` | Show BGP Routes |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `site` | Site Name |

## Example Usage

Ask Claude to help you work with Bgp Route resources:

### List Bgp Routes

> "List all bgp-routes in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f bgp_route.yaml

# Get
f5xcctl get bgp_route {name} -n {namespace}

# List
f5xcctl get bgp_routes -n {namespace}

# Delete
f5xcctl delete bgp_route {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_bgp_route" "example" {
  name      = "example-bgp-route"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
