---
page_title: f5xc_node - f5xc-api-mcp
subcategory: Telemetry And Insights
description: Connectivity Node Query.
---

# Node

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET Connectivity data for a site.
This query is used to GET time-series data for a given
site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-telemetryandinsights-node-create` | Connectivity Node Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- node

## Example Usage

Ask Claude to help you work with Node resources:

### Create Node

> "Create a node named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/nodes" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/nodes/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/nodes" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @node.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/nodes/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
