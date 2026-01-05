---
page_title: f5xc_priority - f5xc-api-mcp
subcategory: Tenant And Identity
description: Priority of a ticket in managed tenant.
---

# Priority

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Priority of a selected ticket. Not possible if ticket's already closed.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-priority-create` | Priority of a ticket in managed tenant. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `tp_id` | Third party ID | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- priority

## Example Usage

Ask Claude to help you work with Priority resources:

### Create Priority

> "Create a priority named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/prioritys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/prioritys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/prioritys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @priority.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/prioritys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
