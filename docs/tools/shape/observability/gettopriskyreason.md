---
page_title: f5xc_gettopriskyreason - f5xc-api-mcp
subcategory: Shape
description: GetTopRiskyReasons.
---

# Gettopriskyreason

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET top risky reasons data request for a time range.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-gettopriskyreason-create` | GetTopRiskyReasons. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- gettopriskyreason

## Example Usage

Ask Claude to help you work with Gettopriskyreason resources:

### Create Gettopriskyreason

> "Create a gettopriskyreason named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/gettopriskyreasons" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/gettopriskyreasons/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/gettopriskyreasons" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @gettopriskyreason.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/gettopriskyreasons/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
