---
page_title: f5xc_reboot - f5xc-api-mcp
subcategory: Support
description: Reboot node.
---

# Reboot

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Reboot specific node in site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-reboot-create` | Reboot node. |

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

- reboot

## Example Usage

Ask Claude to help you work with Reboot resources:

### Create Reboot

> "Create a reboot named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/reboots" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/reboots/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/reboots" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @reboot.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/reboots/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
