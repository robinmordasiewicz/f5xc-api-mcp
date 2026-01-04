---
page_title: f5xc_network - f5xc-api-mcp
subcategory: Sites
description: GET Site Networks.
---

# Network

!!! info "Low Risk"
    Operations on this resource are generally safe.

Gets Networks Associated to Site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-network-get` | GET Site Networks. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Site-1` |

## Example Usage

Ask Claude to help you work with Network resources:

### Get Network Details

> "Get details of the network named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/networks" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/networks/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/networks" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @network.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/networks/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
