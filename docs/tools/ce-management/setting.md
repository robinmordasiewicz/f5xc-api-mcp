---
page_title: f5xc_setting - f5xc-api-mcp
subcategory: Ce Management
description: Module Management Settings.
---

# Setting

!!! info "Low Risk"
    Operations on this resource are generally safe.

Receive the module settings.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cemanagement-setting-list` | Module Management Settings. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Example Usage

Ask Claude to help you work with Setting resources:

### List Settings

> "List all settings in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/settings" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/settings/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/settings" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @setting.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/settings/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
