---
page_title: f5xc_import - f5xc-api-mcp
subcategory: DNS
description: Import F5 Cloud Services DNS Zone.
---

# Import

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Import F5 Cloud Services DNS Zone.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-import-create` | Import F5 Cloud Services DNS Zone. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- import

## Example Usage

Ask Claude to help you work with Import resources:

### Create Import

> "Create a import named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/imports" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/imports/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/imports" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @import.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/imports/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
