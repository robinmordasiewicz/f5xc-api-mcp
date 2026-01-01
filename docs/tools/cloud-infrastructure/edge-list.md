---
page_title: f5xc_edge_list - f5xc-api-mcp
subcategory: Cloud Infrastructure
description: Edge List
---

# Edge List

!!! info "Low Risk"
    Operations on this resource are generally safe.

Returns the online edge sites (Both Customer Edge and Cloud Edge)

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cloudinfrastructure-edge-list-list` | Edge List |

## Example Usage

Ask Claude to help you work with Edge List resources:

### List Edge Lists

> "List all edge-lists in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh cloud_infrastructure create edge_list -n <namespace> -i edge_list.yaml

# Get
xcsh cloud_infrastructure get edge_list <name> -n <namespace>

# List
xcsh cloud_infrastructure list edge_list -n <namespace>

# Delete
xcsh cloud_infrastructure delete edge_list <name> -n <namespace>
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
