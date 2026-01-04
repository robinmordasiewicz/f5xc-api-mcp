---
page_title: f5xc_transit_usage - f5xc-api-mcp
subcategory: Ddos
description: Transit Usage.
---

# Transit Usage

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

API to GET transit usage data.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-transit-usage-create` | Transit Usage. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- transit-usage

## Example Usage

Ask Claude to help you work with Transit Usage resources:

### Create Transit Usage

> "Create a transit-usage named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/transit_usages" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/transit_usages/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/transit_usages" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @transit_usage.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/transit_usages/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
