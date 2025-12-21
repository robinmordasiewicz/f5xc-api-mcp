---
page_title: f5xc_edge_list - f5xc-api-mcp
subcategory: Networking
description: Edge List
---

# Edge List

Returns the online edge sites (Both Customer Edge and Cloud Edge)

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-edge-list-list` | Edge List |

## Example Usage

Ask Claude to help you work with Edge List resources:

### List Edge Lists

> "List all edge-lists in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create edge_list -n <namespace> -i edge_list.yaml

# Get
f5xcctl configuration get edge_list -n <namespace> <name>

# List
f5xcctl configuration list edge_list -n <namespace>

# Delete
f5xcctl configuration delete edge_list -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_edge_list" "example" {
  name      = "example-edge-list"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
