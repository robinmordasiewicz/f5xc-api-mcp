---
page_title: f5xc_rule - f5xc-api-mcp
subcategory: Support
description: List USB Enablement Rules.
---

# Rule

!!! info "Low Risk"
    Operations on this resource are generally safe.

List USB Enablement Rules.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-rule-list` | List USB Enablement Rules. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `node` | Node Name | `Master-0` |
| `site` | Site Name | `Value` |

## Example Usage

Ask Claude to help you work with Rule resources:

### List Rules

> "List all rules in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/rules" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/rules/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/rules" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @rule.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/rules/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
