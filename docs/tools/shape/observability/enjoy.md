---
page_title: f5xc_enjoy - f5xc-api-mcp
subcategory: Shape
description: Enjoy Dashboard.
---

# Enjoy

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET enjoy chart data from shape recognize API.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-enjoy-create` | Enjoy Dashboard. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- enjoy

## Example Usage

Ask Claude to help you work with Enjoy resources:

### Create Enjoy

> "Create a enjoy named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/enjoys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/enjoys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/enjoys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @enjoy.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/enjoys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
