---
page_title: f5xc_create - f5xc-api-mcp
subcategory: Users
description: Create
---

# Create

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Create creates a new label in shared namespace. Any other namespace requested will return error.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-users-create-create` | Create |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- create

## Example Usage

Ask Claude to help you work with Create resources:

### Create Create

> "Create a create named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/creates" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/creates/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/creates" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @create.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/creates/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
