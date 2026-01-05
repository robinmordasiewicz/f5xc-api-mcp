---
page_title: f5xc_simplified_route - f5xc-api-mcp
subcategory: Network
description: Show Simplified Routes.
---

# Simplified Route

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Show user-friendly VER routes matching the request.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-simplified-route-create` | Show Simplified Routes. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |
| `site` | Site Name | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- simplified-route

## Example Usage

Ask Claude to help you work with Simplified Route resources:

### Create Simplified Route

> "Create a simplified-route named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/simplified_routes" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/simplified_routes/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/simplified_routes" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @simplified_route.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/simplified_routes/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
