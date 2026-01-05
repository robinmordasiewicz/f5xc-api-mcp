---
page_title: f5xc_testj - f5xc-api-mcp
subcategory: Shape
description: Test JS
---

# Testj

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Validate JS script tag injection in the target URL.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-testj-create` | Test JS |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- testj

## Example Usage

Ask Claude to help you work with Testj resources:

### Create Testj

> "Create a testj named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/testjs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/testjs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/testjs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @testj.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/testjs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
