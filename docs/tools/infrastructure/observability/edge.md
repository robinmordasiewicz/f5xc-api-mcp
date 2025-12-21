---
page_title: f5xc_edge - f5xc-api-mcp
subcategory: Infrastructure
description: Site Edge Query.
---

# Edge

Request to GET time-series data for an edge returned in the site traffic graph.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-edge-create` | Site Edge Query. |

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
f5xcctl infrastructure create edge -n <namespace> -i edge.yaml

# Get
f5xcctl infrastructure get edge <name> -n <namespace>

# List
f5xcctl infrastructure list edge -n <namespace>

# Delete
f5xcctl infrastructure delete edge <name> -n <namespace>
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
