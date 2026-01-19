---
page_title: f5xc_init_request - f5xc-api-mcp
subcategory: Data Intelligence
description: Enable Data Intelligence.
---

# Init Request

Request to enable Data Intelligence for the tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dataintelligence-init-request-create` | Enable Data Intelligence. |

## Example Usage

Ask Claude to help you work with Init Request resources:

### Create Init Request

> "Create a init-request named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/init_requests" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/init_requests/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/init_requests" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @init_request.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/init_requests/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
