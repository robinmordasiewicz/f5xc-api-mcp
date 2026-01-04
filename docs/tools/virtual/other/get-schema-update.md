---
page_title: f5xc_get_schema_update - f5xc-api-mcp
subcategory: Virtual
description: GET API Endpoints Schema Updates.
---

# Get Schema Update

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET list of schema pairs, current and updated, for each endpoint in the request
or all pending
changes if empty list is provided.
NOTE: any API endpoint defined in user swagger files should be
ignored
DEPRECATED. USE virtual host custom API GetAPIEndpointsSchemaUpdates.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-get-schema-update-create` | GET API Endpoints Schema Updates. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Shared` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- get-schema-update

## Example Usage

Ask Claude to help you work with Get Schema Update resources:

### Create Get Schema Update

> "Create a get-schema-update named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/get_schema_updates" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/get_schema_updates/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/get_schema_updates" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @get_schema_update.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/get_schema_updates/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
