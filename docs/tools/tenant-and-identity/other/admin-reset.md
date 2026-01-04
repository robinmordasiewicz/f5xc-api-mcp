---
page_title: f5xc_admin_reset - f5xc-api-mcp
subcategory: Tenant And Identity
description: Reset password by admin.
---

# Admin Reset

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Reset password by admin resets password for a user specified in request payload.
This request is
meant to be executed by the tenant's admin.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-admin-reset-create` | Reset password by admin. |
| `f5xc-api-tenantandidentity-admin-reset-update` | ResetOtpDeviceByAdmin. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- admin-reset

**Modifies:**

- admin-reset

## Example Usage

Ask Claude to help you work with Admin Reset resources:

### Create Admin Reset

> "Create a admin-reset named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/admin_resets" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/admin_resets/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/admin_resets" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @admin_reset.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/admin_resets/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
