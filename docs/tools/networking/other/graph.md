---
page_title: f5xc_graph - f5xc-api-mcp
subcategory: Networking
description: Segment
---

# Graph

Request to GET different network segments with given metrics .
This will give metric data for all
segments including intra segment metrics.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-graph-create` | Segment |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Graph resources:

### Create Graph

> "Create a graph named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl networking create graph -n <namespace> -i graph.yaml

# Get
f5xcctl networking get graph <name> -n <namespace>

# List
f5xcctl networking list graph -n <namespace>

# Delete
f5xcctl networking delete graph <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_graph" "example" {
  name      = "example-graph"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
