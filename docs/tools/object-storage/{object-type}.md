---
page_title: f5xc_{object_type} - f5xc-api-mcp
subcategory: Object Storage
description: DELETE Stored Object(s)
---

# {object Type}

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

CreateObject is an API to upload an object to generic object store. Objects are immutable, a new
version is created when the content is updated.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-objectstorage-object-type-update` | Create Stored Object. |
| `f5xc-api-objectstorage-object-type-delete` | DELETE Stored Object(s) |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `-` |
| `namespace` | Namespace | `-` |
| `object_type` | Object_type | `-` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `force_delete` | Optional query parameter. If provided will DELETE all the versions of the specified object. | `-` |
| `version` | Version of the stored_object in "v{n}-{YY}-{MM}-{DD}" formatted string, where n is version number and YY/MM/DD is year, month and date. | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- stored-object

**Deletes:**

- stored-object
- contained_resources

## Example Usage

Ask Claude to help you work with {object Type} resources:

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/{object_type}s" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/{object_type}s/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/{object_type}s" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @{object_type}.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/{object_type}s/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
