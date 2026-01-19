---
page_title: f5xc_import_bind_validate - f5xc-api-mcp
subcategory: DNS
description: Validate BIND Files.
---

# Import Bind Validate

Validate BIND Files for Import.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-import-bind-validate-create` | Validate BIND Files. |

## Example Usage

Ask Claude to help you work with Import Bind Validate resources:

### Create Import Bind Validate

> "Create a import-bind-validate named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/import_bind_validates" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/import_bind_validates/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/import_bind_validates" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @import_bind_validate.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/import_bind_validates/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
