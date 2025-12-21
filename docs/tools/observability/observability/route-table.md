---
page_title: f5xc_route_table - f5xc-api-mcp
subcategory: Observability
description: GET Network Route Tables.
---

# Route Table

Gets Route Tables Associated with a Network.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-route-table-get` | GET Network Route Tables. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `id` | ID |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `regions` | Regions used as filters. |
| `route_table_ids` | Route Table IDs used as filters. |
| `site` | Site Name |
| `subnet_cidrs` | Subnet cidrs used as filters. |
| `subnet_ids` | Subnet IDs used as filters. |

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
