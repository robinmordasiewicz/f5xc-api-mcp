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

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/route_tables" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/route_tables/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/route_tables" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @route_table.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/route_tables/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
