---
page_title: f5xc_platform - f5xc-api-mcp
subcategory: Shape
description: Top Human Platform.
---

# Platform

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET top human platform.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-platform-create` | Top Human Platform. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- platform

## Example Usage

Ask Claude to help you work with Platform resources:

### Create Platform

> "Create a platform named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/platforms" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/platforms/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/platforms" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @platform.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/platforms/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
