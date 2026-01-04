---
page_title: f5xc_o - f5xc-api-mcp
subcategory: Shape
description: Malicious Report Transactions OS.
---

# O

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Malicious Report Transactions OS.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-o-create` | Malicious Report Transactions OS. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- o

## Example Usage

Ask Claude to help you work with O resources:

### Create O

> "Create a o named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/os" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/os/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/os" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @o.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/os/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
