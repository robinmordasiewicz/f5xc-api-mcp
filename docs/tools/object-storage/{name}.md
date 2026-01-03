---
page_title: f5xc_{name} - f5xc-api-mcp
subcategory: Object Storage
description: DELETE Stored Object(s)
---

# {name}

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

GetMobileAppShield is an API to download particular version of mobile app shield.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-objectstorage-name-get` | GET Mobile App Shield. |
| `f5xc-api-objectstorage-name-delete` | DELETE Stored Object(s) |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Volt-API-specs.` |
| `namespace` | Namespace | `System` |
| `version` | Version | `V1-21-01-12.` |
| `object_type` | Object_type | `Swagger` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `object_type` | X-required | `Swagger` |
| `force_delete` | Optional query parameter. If provided will DELETE all the versions of the specified object. | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Deletes:**

- stored-object
- contained_resources

## Example Usage

Ask Claude to help you work with {name} resources:

### Get {name} Details

> "Get details of the {name} named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/{name}s" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/{name}s/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/{name}s" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @{name}.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/{name}s/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
