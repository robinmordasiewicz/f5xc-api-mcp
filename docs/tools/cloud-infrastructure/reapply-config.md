---
page_title: f5xc_reapply_config - f5xc-api-mcp
subcategory: Cloud Infrastructure
description: CloudLink
---

# Reapply Config

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Reapply CloudLink Config.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cloudinfrastructure-reapply-config-create` | CloudLink |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `AWS-cloud-link-east.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- reapply-config

## Example Usage

Ask Claude to help you work with Reapply Config resources:

### Create Reapply Config

> "Create a reapply-config named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/reapply_configs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/reapply_configs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/reapply_configs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @reapply_config.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/reapply_configs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
