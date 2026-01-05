---
page_title: f5xc_affectedUser - f5xc-api-mcp
subcategory: Shape
description: List Affected Users.
---

# AffectedUser

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List affected users who have loaded this particular script.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-affecteduser-create` | List Affected Users. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |
| `script_id` | Script_id | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- affectedUser

## Example Usage

Ask Claude to help you work with AffectedUser resources:

### Create AffectedUser

> "Create a affectedUser named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/affectedUsers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/affectedUsers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/affectedUsers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @affectedUser.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/affectedUsers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
