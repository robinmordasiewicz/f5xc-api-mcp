---
page_title: f5xc_bfp - f5xc-api-mcp
subcategory: Shape
description: Top Attacked BFP.
---

# Bfp

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Top Attacked BFP.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-bfp-create` | Top Attacked BFP. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- bfp

## Example Usage

Ask Claude to help you work with Bfp resources:

### Create Bfp

> "Create a bfp named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bfps" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bfps/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bfps" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @bfp.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bfps/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
