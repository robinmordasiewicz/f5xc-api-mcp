---
page_title: f5xc_enable_visibility - f5xc-api-mcp
subcategory: Statistics
description: Enable visibility in all workspaces.
---

# Enable Visibility

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Enable Visibility of the service in all workspaces. This action will make the
discovered service
visible within WAAP, App Connect where the user can perform
the workspace specific actions.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-enable-visibility-create` | Enable visibility in all workspaces. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Service Name | `Vs1` |
| `namespace` | Namespace | `Shared` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- enable-visibility

## Example Usage

Ask Claude to help you work with Enable Visibility resources:

### Create Enable Visibility

> "Create a enable-visibility named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/enable_visibilitys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/enable_visibilitys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/enable_visibilitys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @enable_visibility.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/enable_visibilitys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
