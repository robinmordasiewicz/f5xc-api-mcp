---
page_title: f5xc_assign_namespace_role - f5xc-api-mcp
subcategory: Tenant And Identity
description: Assign role to User Group.
---

# Assign Namespace Role

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

AssignRole allows customers to assign a namespace/role pair to user group.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-assign-namespace-role-update` | Assign role to User Group. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name of the user group | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- assign-namespace-role

## Example Usage

Ask Claude to help you work with Assign Namespace Role resources:

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/assign_namespace_roles" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/assign_namespace_roles/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/assign_namespace_roles" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @assign_namespace_role.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/assign_namespace_roles/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
