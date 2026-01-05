---
page_title: f5xc_host_ping - f5xc-api-mcp
subcategory: Support
description: Host Ping
---

# Host Ping

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Ping intiated from host kernel.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-host-ping-create` | Host Ping |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |
| `node` | Node Name | `-` |
| `site` | Site Name | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- host-ping

## Example Usage

Ask Claude to help you work with Host Ping resources:

### Create Host Ping

> "Create a host-ping named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/host_pings" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/host_pings/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/host_pings" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @host_ping.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/host_pings/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
