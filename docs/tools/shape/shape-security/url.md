---
page_title: f5xc_url - f5xc-api-mcp
subcategory: Shape
description: GET Bot Assessment by Top URLs.
---

# Url

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET Bot Top URL Information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-url-create` | GET Bot Assessment by Top URLs. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- url

## Example Usage

Ask Claude to help you work with Url resources:

### Create Url

> "Create a url named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/urls" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/urls/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/urls" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @url.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/urls/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
