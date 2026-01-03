---
page_title: f5xc_enable - f5xc-api-mcp
subcategory: Tenant And Identity
description: Enable tenant level OTP.
---

# Enable

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Enable tenant level OTP enables OTP on tenant-level. It enforces each user within a tenant to enable
OTP.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-enable-update` | Enable tenant level OTP. |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- enable

## Example Usage

Ask Claude to help you work with Enable resources:

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/enables" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/enables/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/enables" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @enable.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/enables/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
