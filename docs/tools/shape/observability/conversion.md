---
page_title: f5xc_conversion - f5xc-api-mcp
subcategory: Shape
description: Conversion Dashboard.
---

# Conversion

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET conversion chart data from shape recognize API.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-conversion-create` | Conversion Dashboard. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- conversion

## Example Usage

Ask Claude to help you work with Conversion resources:

### Create Conversion

> "Create a conversion named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/conversions" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/conversions/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/conversions" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @conversion.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/conversions/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
