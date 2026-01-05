---
page_title: f5xc_set_vpn_tunnel - f5xc-api-mcp
subcategory: Sites
description: Configure VPN Tunnels.
---

# Set Vpn Tunnel

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Configure VPC IP prefix set.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-set-vpn-tunnel-create` | Configure VPN Tunnels. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `-` |
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- set-vpn-tunnel

## Example Usage

Ask Claude to help you work with Set Vpn Tunnel resources:

### Create Set Vpn Tunnel

> "Create a set-vpn-tunnel named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/set_vpn_tunnels" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/set_vpn_tunnels/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/set_vpn_tunnels" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @set_vpn_tunnel.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/set_vpn_tunnels/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
