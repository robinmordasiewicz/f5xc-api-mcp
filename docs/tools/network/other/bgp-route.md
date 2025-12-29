---
page_title: f5xc_bgp_route - f5xc-api-mcp
subcategory: Network
description: Show BGP Routes.
---

# Bgp Route

!!! info "Low Risk"
    Operations on this resource are generally safe.

Show routes exported / imported via BGP.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-bgp-route-list` | Show BGP Routes. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `site` | Site Name | `Value` |

## Example Usage

Ask Claude to help you work with Bgp Route resources:

### List Bgp Routes

> "List all bgp-routes in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl operate bgp-route list --namespace {namespace}
```

List all bgp-routes

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl network create bgp_route -n <namespace> -i bgp_route.yaml

# Get
f5xcctl network get bgp_route <name> -n <namespace>

# List
f5xcctl network list bgp_route -n <namespace>

# Delete
f5xcctl network delete bgp_route <name> -n <namespace>
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
