---
page_title: f5xc_tunnel - f5xc-api-mcp
subcategory: Network
description: Create Tunnel.
---

# Tunnel

Create tunnel in a given namespace. If one already exist it will give a error.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-tunnel-create` | Create Tunnel. |
| `f5xc-api-network-tunnel-get` | GET Tunnel. |
| `f5xc-api-network-tunnel-list` | List Tunnel. |
| `f5xc-api-network-tunnel-update` | Replace Tunnel. |
| `f5xc-api-network-tunnel-delete` | DELETE Tunnel. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `-` |
| `name` | Name | `-` |
| `namespace` | Namespace | `-` |
| `metadata.name` | Name | `-` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `-` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Example Usage

Ask Claude to help you work with Tunnel resources:

### Create Tunnel

> "Create a tunnel named 'example' in the 'production' namespace"

### List Tunnels

> "List all tunnels in the 'production' namespace"

### Get Tunnel Details

> "Get details of the tunnel named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/tunnels" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/tunnels/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/tunnels" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @tunnel.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/tunnels/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
