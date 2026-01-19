---
page_title: f5xc_import_axfr - f5xc-api-mcp
subcategory: DNS
description: Import DNS Zone.
---

# Import Axfr

Import DNS Zone via AXFR.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-import-axfr-create` | Import DNS Zone. |

## Example Usage

Ask Claude to help you work with Import Axfr resources:

### Create Import Axfr

> "Create a import-axfr named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/import_axfrs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/import_axfrs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/import_axfrs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @import_axfr.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/import_axfrs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
