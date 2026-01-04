---
page_title: f5xc_endpointlabel - f5xc-api-mcp
subcategory: Shape
description: Top Endpoint Labels.
---

# Endpointlabel

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET top Endpoint labels.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-endpointlabel-create` | Top Endpoint Labels. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- endpointlabel

## Example Usage

Ask Claude to help you work with Endpointlabel resources:

### Create Endpointlabel

> "Create a endpointlabel named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/endpointlabels" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/endpointlabels/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/endpointlabels" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @endpointlabel.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/endpointlabels/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
