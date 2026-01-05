---
page_title: f5xc_action - f5xc-api-mcp
subcategory: Shape
description: Malicious Traffic Overview in actions.
---

# Action

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET Malicious Traffic Overview in Actions.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-action-create` | Malicious Traffic Overview in actions. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- action

## Example Usage

Ask Claude to help you work with Action resources:

### Create Action

> "Create a action named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/actions" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/actions/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/actions" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @action.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/actions/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
