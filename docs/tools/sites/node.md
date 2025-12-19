---
page_title: f5xc_node - f5xc-api-mcp
subcategory: Sites
description: Connectivity Node Query
---

# Node

Request to get Connectivity data for a site.
This query is used to get time-series data for a given
site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-node-create` | Connectivity Node Query |
| `f5xc-api-core-node-list` | Namespace List |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |
| `site` | site |

## Example Usage

Ask Claude to help you work with Node resources:

### Create Node

> "Create a node named 'example' in the 'production' namespace"

### List Nodes

> "List all nodes in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f node.yaml

# Get
f5xcctl get node {name} -n {namespace}

# List
f5xcctl get nodes -n {namespace}

# Delete
f5xcctl delete node {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_node" "example" {
  name      = "example-node"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
