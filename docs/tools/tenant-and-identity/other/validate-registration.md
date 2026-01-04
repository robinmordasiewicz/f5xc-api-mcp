---
page_title: f5xc_validate_registration - f5xc-api-mcp
subcategory: Tenant And Identity
description: Validate Registration.
---

# Validate Registration

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

ValidateRegistration validates if the signup registration request is valid when a new customer
attempts to signup.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-validate-registration-create` | Validate Registration. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- validate-registration

## Example Usage

Ask Claude to help you work with Validate Registration resources:

### Create Validate Registration

> "Create a validate-registration named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/validate_registrations" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/validate_registrations/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/validate_registrations" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @validate_registration.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/validate_registrations/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
