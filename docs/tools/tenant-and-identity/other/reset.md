---
page_title: f5xc_reset - f5xc-api-mcp
subcategory: Tenant And Identity
description: Reset password.
---

# Reset

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Reset password resets password for user who is making this request.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-reset-create` | Reset password. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- reset

## Example Usage

Ask Claude to help you work with Reset resources:

### Create Reset

> "Create a reset named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/resets" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/resets/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/resets" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @reset.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/resets/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
