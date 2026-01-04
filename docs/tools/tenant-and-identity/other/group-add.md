---
page_title: f5xc_group_add - f5xc-api-mcp
subcategory: Tenant And Identity
description: Add user to groups.
---

# Group Add

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Assign existing user to specific groups.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-group-add-update` | Add user to groups. |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- group-add

## Example Usage

Ask Claude to help you work with Group Add resources:

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/group_adds" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/group_adds/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/group_adds" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @group_add.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/group_adds/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
