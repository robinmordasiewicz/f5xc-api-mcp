---
page_title: f5xc_assign - f5xc-api-mcp
subcategory: Virtual
description: Assign API Definition.
---

# Assign

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Set a reference to the API Definition, with an option to create an empty one if not
exists.
DEPRECATED. Instead use virtual host public custom API - AssignAPIDefinition.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-assign-create` | Assign API Definition. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `-` |
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- assign

## Example Usage

Ask Claude to help you work with Assign resources:

### Create Assign

> "Create a assign named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/assigns" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/assigns/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/assigns" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @assign.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/assigns/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
