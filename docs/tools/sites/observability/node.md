---
page_title: f5xc_node - f5xc-api-mcp
subcategory: Sites
description: Site Node Query.
---

# Node

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET time-series data for a site returned in the site traffic graph.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-node-create` | Site Node Query. |
| `f5xc-api-sites-node-list` | Namespace List. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `site` | Site | `Site-1` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- node

## Example Usage

Ask Claude to help you work with Node resources:

### Create Node

> "Create a node named 'example' in the 'production' namespace"

### List Nodes

> "List all nodes in the 'production' namespace"

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
