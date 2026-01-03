---
page_title: f5xc_analysi - f5xc-api-mcp
subcategory: Shape
description: Update FormField Analysis.
---

# Analysi

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Mark / unmark field sensitivity by customer.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-analysi-create` | Update FormField Analysis. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Default` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- analysi

## Example Usage

Ask Claude to help you work with Analysi resources:

### Create Analysi

> "Create a analysi named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/analysis" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/analysis/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/analysis" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @analysi.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/analysis/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
