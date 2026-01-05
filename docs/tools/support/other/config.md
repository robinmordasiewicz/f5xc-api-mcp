---
page_title: f5xc_config - f5xc-api-mcp
subcategory: Support
description: Update LTE configuration.
---

# Config

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Update LTE configuration on the node.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-config-create` | Update LTE configuration. |
| `f5xc-api-support-config-list` | GET LTE configuration. |

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

- config

## Example Usage

Ask Claude to help you work with Config resources:

### Create Config

> "Create a config named 'example' in the 'production' namespace"

### List Configs

> "List all configs in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/configs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/configs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/configs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @config.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/configs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
