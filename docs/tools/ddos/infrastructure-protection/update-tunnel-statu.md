---
page_title: f5xc_update_tunnel_statu - f5xc-api-mcp
subcategory: Ddos
description: Update Tunnel Status.
---

# Update Tunnel Statu

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Update Tunnel Status.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-update-tunnel-statu-create` | Update Tunnel Status. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- update-tunnel-statu

## Example Usage

Ask Claude to help you work with Update Tunnel Statu resources:

### Create Update Tunnel Statu

> "Create a update-tunnel-statu named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/update_tunnel_status" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/update_tunnel_status/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/update_tunnel_status" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @update_tunnel_statu.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/update_tunnel_status/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
