---
page_title: f5xc_friction_aggregation - f5xc-api-mcp
subcategory: Shape
description: Friction Aggregation Dashboard.
---

# Friction Aggregation

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET Friction Aggregation chart data from shape recognize API.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-friction-aggregation-create` | Friction Aggregation Dashboard. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- friction-aggregation

## Example Usage

Ask Claude to help you work with Friction Aggregation resources:

### Create Friction Aggregation

> "Create a friction-aggregation named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/friction_aggregations" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/friction_aggregations/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/friction_aggregations" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @friction_aggregation.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/friction_aggregations/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
