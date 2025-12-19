---
page_title: f5xc_route_table - f5xc-api-mcp
subcategory: Load Balancing
description: Get Network Route Tables
---

# Route Table

Gets Route Tables Associated with a Network

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-route-table-get` | Get Network Route Tables |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `id` | Id |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `regions` | The regions parameter |
| `route_table_ids` | The route_table_ids parameter |
| `site` | The site parameter |
| `subnet_cidrs` | The subnet_cidrs parameter |
| `subnet_ids` | The subnet_ids parameter |

## Example Usage

Ask Claude to help you work with Route Table resources:

### Get Route Table Details

> "Get details of the route-table named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create route_table -n <namespace> -i route_table.yaml

# Get
f5xcctl configuration get route_table -n <namespace> <name>

# List
f5xcctl configuration list route_table -n <namespace>

# Delete
f5xcctl configuration delete route_table -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_route_table" "example" {
  name      = "example-route-table"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
