---
page_title: f5xc_expanded - f5xc-api-mcp
subcategory: Shape
description: Expanded Traffic Overview.
---

# Expanded

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET expanded traffic overview.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-expanded-create` | Expanded Traffic Overview. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- expanded

## Example Usage

Ask Claude to help you work with Expanded resources:

### Create Expanded

> "Create a expanded named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/expandeds" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/expandeds/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/expandeds" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @expanded.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/expandeds/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
