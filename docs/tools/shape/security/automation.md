---
page_title: f5xc_automation - f5xc-api-mcp
subcategory: Shape
description: Top Malicious Bot Automation Types.
---

# Automation

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET top malicious bots automation types.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-automation-create` | Top Malicious Bot Automation Types. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- automation

## Example Usage

Ask Claude to help you work with Automation resources:

### Create Automation

> "Create a automation named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/automations" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/automations/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/automations" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @automation.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/automations/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
