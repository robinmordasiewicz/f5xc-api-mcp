---
page_title: f5xc_custom_list - f5xc-api-mcp
subcategory: Billing And Usage
description: List Usage Plans.
---

# Custom List

!!! info "Low Risk"
    Operations on this resource are generally safe.

Endpoint to GET usage plans.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-billingandusage-custom-list-list` | List Usage Plans. |

## Example Usage

Ask Claude to help you work with Custom List resources:

### List Custom Lists

> "List all custom-lists in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/custom_lists" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/custom_lists/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/custom_lists" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @custom_list.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/custom_lists/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
