---
page_title: f5xc_disable - f5xc-api-mcp
subcategory: Tenant And Identity
description: Disable tenant level OTP.
---

# Disable

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Disable tenant level OTP disables OTP on tenant-level. After it's disabled it's up to user whether
to enable OTP.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-disable-update` | Disable tenant level OTP. |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- disable

## Example Usage

Ask Claude to help you work with Disable resources:

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/disables" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/disables/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/disables" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @disable.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/disables/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
