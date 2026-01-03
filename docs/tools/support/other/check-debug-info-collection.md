---
page_title: f5xc_check_debug_info_collection - f5xc-api-mcp
subcategory: Support
description: Check Debug Info Collection.
---

# Check Debug Info Collection

!!! info "Low Risk"
    Operations on this resource are generally safe.

Check if the zip file of debug info from node is available.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-check-debug-info-collection-list` | Check Debug Info Collection. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `site` | Site Name | `Value` |

## Example Usage

Ask Claude to help you work with Check Debug Info Collection resources:

### List Check Debug Info Collections

> "List all check-debug-info-collections in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/check_debug_info_collections" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/check_debug_info_collections/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/check_debug_info_collections" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @check_debug_info_collection.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/check_debug_info_collections/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
