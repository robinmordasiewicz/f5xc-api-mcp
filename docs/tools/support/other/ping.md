---
page_title: f5xc_ping - f5xc-api-mcp
subcategory: Support
description: Ping
---

# Ping

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Run ping to a destination.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-ping-create` | Ping |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |
| `site` | Site Name | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- ping

## Example Usage

Ask Claude to help you work with Ping resources:

### Create Ping

> "Create a ping named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/pings" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/pings/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/pings" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @ping.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/pings/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
