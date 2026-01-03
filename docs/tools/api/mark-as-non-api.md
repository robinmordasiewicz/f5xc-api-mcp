---
page_title: f5xc_mark_as_non_api - f5xc-api-mcp
subcategory: API
description: Mark As Non-API.
---

# Mark As Non API

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Update the API Definition's non-API list with the provided API endpoints.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-mark-as-non-api-create` | Mark As Non-API. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Shared` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- mark-as-non-api

## Example Usage

Ask Claude to help you work with Mark As Non API resources:

### Create Mark As Non API

> "Create a mark-as-non-api named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/mark_as_non_apis" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/mark_as_non_apis/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/mark_as_non_apis" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @mark_as_non_api.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/mark_as_non_apis/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
