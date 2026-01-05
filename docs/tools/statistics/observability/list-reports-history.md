---
page_title: f5xc_list_reports_history - f5xc-api-mcp
subcategory: Statistics
description: List Reports History.
---

# List Reports History

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List Reports history for the list of report configurations in the given namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-list-reports-history-create` | List Reports History. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- list-reports-history

## Example Usage

Ask Claude to help you work with List Reports History resources:

### Create List Reports History

> "Create a list-reports-history named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/list_reports_historys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/list_reports_historys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/list_reports_historys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @list_reports_history.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/list_reports_historys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
