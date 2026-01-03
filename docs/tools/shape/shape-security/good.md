---
page_title: f5xc_good - f5xc-api-mcp
subcategory: Shape
description: Top Good Bots.
---

# Good

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET top good bots.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-good-create` | Top Good Bots. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- good

## Example Usage

Ask Claude to help you work with Good resources:

### Create Good

> "Create a good named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/goods" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/goods/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/goods" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @good.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/goods/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
