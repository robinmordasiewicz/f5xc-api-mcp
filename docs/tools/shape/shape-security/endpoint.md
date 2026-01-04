---
page_title: f5xc_endpoint - f5xc-api-mcp
subcategory: Shape
description: Report Endpoints.
---

# Endpoint

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Report Endpoints.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-endpoint-create` | Report Endpoints. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- endpoint

## Example Usage

Ask Claude to help you work with Endpoint resources:

### Create Endpoint

> "Create a endpoint named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/endpoints" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/endpoints/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/endpoints" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @endpoint.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/endpoints/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
