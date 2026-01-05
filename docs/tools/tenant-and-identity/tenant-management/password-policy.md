---
page_title: f5xc_password_policy - f5xc-api-mcp
subcategory: Tenant And Identity
description: GetPasswordPolicy.
---

# Password Policy

!!! info "Low Risk"
    Operations on this resource are generally safe.

GetPasswordPolicy returns password policy for tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-password-policy-list` | GetPasswordPolicy. |

## Parameters

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `realm_id` | User's email. | `-` |

## Example Usage

Ask Claude to help you work with Password Policy resources:

### List Password Policys

> "List all password-policys in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/password_policys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/password_policys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/password_policys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @password_policy.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/password_policys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
