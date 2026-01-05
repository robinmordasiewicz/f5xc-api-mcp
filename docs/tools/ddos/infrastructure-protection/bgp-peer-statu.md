---
page_title: f5xc_bgp_peer_statu - f5xc-api-mcp
subcategory: Ddos
description: BGP Peer Status.
---

# Bgp Peer Statu

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

API to GET routed DDoS BGP peer status information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-bgp-peer-statu-create` | BGP Peer Status. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- bgp-peer-statu

## Example Usage

Ask Claude to help you work with Bgp Peer Statu resources:

### Create Bgp Peer Statu

> "Create a bgp-peer-statu named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bgp_peer_status" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bgp_peer_status/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bgp_peer_status" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @bgp_peer_statu.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/bgp_peer_status/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
