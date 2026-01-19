---
page_title: f5xc_acces - f5xc-api-mcp
subcategory: Tenant And Identity
description: Update Support Tenant Access.
---

# Acces

This RPC can be used to manage user access for all flavors of support tenants currently
supported by
the platform. Use read-only, read-write with specific namespaces or
admin can specify custom groups
to control access by the support tenant user.
Name is well-known identifier for a specific support
related tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-acces-create` | Update Support Tenant Access. |
| `f5xc-api-tenantandidentity-acces-list` | GET Support Tenant Access. |

## Example Usage

Ask Claude to help you work with Acces resources:

### Create Acces

> "Create a acces named 'example' in the 'production' namespace"

### List Access

> "List all access in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/access" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/access/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/access" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @acces.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/access/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
