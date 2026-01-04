---
page_title: f5xc_signup - f5xc-api-mcp
subcategory: Marketplace
description: Signup AWS Account.
---

# Signup

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Use this API to signup AWS account for F5XC service.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-marketplace-signup-create` | Signup AWS Account. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- signup

## Example Usage

Ask Claude to help you work with Signup resources:

### Create Signup

> "Create a signup named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/signups" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/signups/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/signups" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @signup.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/signups/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
