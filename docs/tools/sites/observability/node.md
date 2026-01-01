---
page_title: f5xc_node - f5xc-api-mcp
subcategory: Sites
description: Site Node Query.
---

# Node

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET time-series data for a site returned in the site traffic graph.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-node-create` | Site Node Query. |
| `f5xc-api-sites-node-list` | Namespace List. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `site` | Site | `Site-1` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- node

## Example Usage

Ask Claude to help you work with Node resources:

### Create Node

> "Create a node named 'example' in the 'production' namespace"

### List Nodes

> "List all nodes in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh sites create node -n <namespace> -i node.yaml

# Get
xcsh sites get node <name> -n <namespace>

# List
xcsh sites list node -n <namespace>

# Delete
xcsh sites delete node <name> -n <namespace>
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
