---
page_title: f5xc_lift - f5xc-api-mcp
subcategory: Shape
description: Lift Dashboard.
---

# Lift

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET lift chart data from shape recognize API.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-lift-create` | Lift Dashboard. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- lift

## Example Usage

Ask Claude to help you work with Lift resources:

### Create Lift

> "Create a lift named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/lifts" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/lifts/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/lifts" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @lift.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/lifts/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
