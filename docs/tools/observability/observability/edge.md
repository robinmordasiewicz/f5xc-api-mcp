---
page_title: f5xc_edge - f5xc-api-mcp
subcategory: Observability
description: Connectivity Edge Query.
---

# Edge

Request to GET Connectivity data for an edge.
This query is used to GET time-series data for a given
edge.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-edge-create` | Connectivity Edge Query. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Edge resources:

### Create Edge

> "Create a edge named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create edge -n <namespace> -i edge.yaml

# Get
f5xcctl observability get edge <name> -n <namespace>

# List
f5xcctl observability list edge -n <namespace>

# Delete
f5xcctl observability delete edge <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_edge" "example" {
  name      = "example-edge"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
