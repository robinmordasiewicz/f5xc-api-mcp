---
page_title: f5xc_disconnect - f5xc-api-mcp
subcategory: Support
description: Disconnect.
---

# Disconnect

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Disconnect the node from LTE network.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-disconnect-create` | Disconnect. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `node` | Node Name | `Master-0` |
| `site` | Site Name | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- disconnect

## Example Usage

Ask Claude to help you work with Disconnect resources:

### Create Disconnect

> "Create a disconnect named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/disconnects" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/disconnects/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/disconnects" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @disconnect.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/disconnects/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
