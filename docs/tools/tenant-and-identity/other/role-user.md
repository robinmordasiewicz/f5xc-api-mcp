---
page_title: f5xc_role_user - f5xc-api-mcp
subcategory: Tenant And Identity
description: Assign role to User.
---

# Role User

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

AssignRole allows customers to assign a namespace/role pair to multiple users.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-role-user-create` | Assign role to User. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- role-user

## Example Usage

Ask Claude to help you work with Role User resources:

### Create Role User

> "Create a role-user named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/role_users" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/role_users/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/role_users" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @role_user.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/role_users/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
