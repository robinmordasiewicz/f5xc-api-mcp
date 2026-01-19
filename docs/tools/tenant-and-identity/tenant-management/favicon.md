---
page_title: f5xc_favicon - f5xc-api-mcp
subcategory: Tenant And Identity
description: Tenant favicon.
---

# Favicon

Receive current tenant favicon.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-favicon-list` | Tenant favicon. |

## Example Usage

Ask Claude to help you work with Favicon resources:

### List Favicons

> "List all favicons in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/favicons" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/favicons/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/favicons" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @favicon.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/favicons/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
