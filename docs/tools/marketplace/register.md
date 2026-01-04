---
page_title: f5xc_register - f5xc-api-mcp
subcategory: Marketplace
description: Register New AWS Account.
---

# Register

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Use this API to register F5XC AWS marketplace product for F5XC service.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-marketplace-register-create` | Register New AWS Account. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- register

## Example Usage

Ask Claude to help you work with Register resources:

### Create Register

> "Create a register named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/registers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/registers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/registers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @register.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/registers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
