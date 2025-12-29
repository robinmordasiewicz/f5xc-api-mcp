---
page_title: f5xc_route_table - f5xc-api-mcp
subcategory: Statistics
description: GET Network Route Tables.
---

# Route Table

!!! info "Low Risk"
    Operations on this resource are generally safe.

Gets Route Tables Associated with a Network.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-route-table-get` | GET Network Route Tables. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `id` | ID | `VPC-1234567898.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `regions` | Regions used as filters. | `Us-west1, us-east1.` |
| `route_table_ids` | Route Table IDs used as filters. | `Rtb-1234567898, rtb-2345678901.` |
| `site` | Site Name | `Site-name1.` |
| `subnet_cidrs` | Subnet cidrs used as filters. | `10.10.0.0/16, 10.22.0.0/16.` |
| `subnet_ids` | Subnet IDs used as filters. | `Sub-1234567898, sub-2345678901.` |

## Example Usage

Ask Claude to help you work with Route Table resources:

### Get Route Table Details

> "Get details of the route-table named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl data route-table get {name} --namespace {namespace}
```

Get specific route-table

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl statistics create route_table -n <namespace> -i route_table.yaml

# Get
f5xcctl statistics get route_table <name> -n <namespace>

# List
f5xcctl statistics list route_table -n <namespace>

# Delete
f5xcctl statistics delete route_table <name> -n <namespace>
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
