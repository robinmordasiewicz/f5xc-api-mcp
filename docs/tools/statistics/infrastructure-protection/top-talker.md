---
page_title: f5xc_top_talker - f5xc-api-mcp
subcategory: Statistics
description: L3l4 Top talkers Query.
---

# Top Talker

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET l3l4 Top talkers Traffic data.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-top-talker-create` | L3l4 Top talkers Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |
| `network_id` | NetworkId | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- top-talker

## Example Usage

Ask Claude to help you work with Top Talker resources:

### Create Top Talker

> "Create a top-talker named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/top_talkers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/top_talkers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/top_talkers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @top_talker.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/top_talkers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
