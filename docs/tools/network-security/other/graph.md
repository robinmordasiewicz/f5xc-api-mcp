---
page_title: f5xc_graph - f5xc-api-mcp
subcategory: Network Security
description: Segment
---

# Graph

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET different network segments with given metrics .
This will give metric data for all
segments including intra segment metrics.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networksecurity-graph-create` | Segment |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- graph

## Example Usage

Ask Claude to help you work with Graph resources:

### Create Graph

> "Create a graph named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/graphs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/graphs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/graphs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @graph.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/graphs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
