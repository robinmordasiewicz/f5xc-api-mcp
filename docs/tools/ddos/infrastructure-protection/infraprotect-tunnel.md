---
page_title: f5xc_infraprotect_tunnel - f5xc-api-mcp
subcategory: Ddos
description: Create DDoS Transit Tunnel.
---

# Infraprotect Tunnel

List the set of infraprotect_tunnel in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-infraprotect-tunnel-create` | Create DDoS Transit Tunnel. |
| `f5xc-api-ddos-infraprotect-tunnel-get` | GET Tunnel. |
| `f5xc-api-ddos-infraprotect-tunnel-list` | List Tunnel. |
| `f5xc-api-ddos-infraprotect-tunnel-update` | Replace DDoS Transit Tunnel. |
| `f5xc-api-ddos-infraprotect-tunnel-delete` | DELETE Tunnel. |

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

Ask Claude to help you work with Infraprotect Tunnel resources:

### Create Infraprotect Tunnel

> "Create a infraprotect-tunnel named 'example' in the 'production' namespace"

### List Infraprotect Tunnels

> "List all infraprotect-tunnels in the 'production' namespace"

### Get Infraprotect Tunnel Details

> "Get details of the infraprotect-tunnel named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/infraprotect_tunnels" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/infraprotect_tunnels/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/infraprotect_tunnels" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @infraprotect_tunnel.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/infraprotect_tunnels/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
