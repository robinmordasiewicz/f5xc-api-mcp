---
page_title: f5xc_list_service_operations_statu - f5xc-api-mcp
subcategory: CDN
description: List of CDN Operation Commands.
---

# List Service Operations Statu

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List of service operations for a given CDN LB.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cdn-list-service-operations-statu-create` | List of CDN Operation Commands. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Ns1` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- list-service-operations-statu

## Example Usage

Ask Claude to help you work with List Service Operations Statu resources:

### Create List Service Operations Statu

> "Create a list-service-operations-statu named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/list_service_operations_status" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/list_service_operations_status/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/list_service_operations_status" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @list_service_operations_statu.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/list_service_operations_status/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
