---
page_title: f5xc_lookup_user_role - f5xc-api-mcp
subcategory: Tenant And Identity
description: Lookup User Roles.
---

# Lookup User Role

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

LookupUserRoles returns roles for the the given user, namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-lookup-user-role-create` | Lookup User Roles. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- lookup-user-role

## Example Usage

Ask Claude to help you work with Lookup User Role resources:

### Create Lookup User Role

> "Create a lookup-user-role named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/lookup_user_roles" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/lookup_user_roles/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/lookup_user_roles" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @lookup_user_role.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/lookup_user_roles/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
