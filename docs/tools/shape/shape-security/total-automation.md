---
page_title: f5xc_total_automation - f5xc-api-mcp
subcategory: Shape
description: "Insight Event: Total Automation."
---

# Total Automation

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET Insight Totol Automation data.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-total-automation-create` | Insight Event: Total Automation. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Default` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- total-automation

## Example Usage

Ask Claude to help you work with Total Automation resources:

### Create Total Automation

> "Create a total-automation named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/total_automations" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/total_automations/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/total_automations" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @total_automation.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/total_automations/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
