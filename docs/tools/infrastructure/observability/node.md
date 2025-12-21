---
page_title: f5xc_node - f5xc-api-mcp
subcategory: Infrastructure
description: Site Node Query.
---

# Node

Request to GET time-series data for a site returned in the site traffic graph.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-node-create` | Site Node Query. |
| `f5xc-api-infrastructure-node-list` | Namespace List. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `site` | Site |

## Example Usage

Ask Claude to help you work with Node resources:

### Create Node

> "Create a node named 'example' in the 'production' namespace"

### List Nodes

> "List all nodes in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl infrastructure create node -n <namespace> -i node.yaml

# Get
f5xcctl infrastructure get node <name> -n <namespace>

# List
f5xcctl infrastructure list node -n <namespace>

# Delete
f5xcctl infrastructure delete node <name> -n <namespace>
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
