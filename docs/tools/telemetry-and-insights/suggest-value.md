---
page_title: f5xc_suggest_value - f5xc-api-mcp
subcategory: Telemetry And Insights
description: Suggest Values.
---

# Suggest Value

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

SuggestValues returns suggested values for the specified field in the given Create/Replace/Custom
request.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-telemetryandinsights-suggest-value-create` | Suggest Values. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Foobar` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- suggest-value

## Example Usage

Ask Claude to help you work with Suggest Value resources:

### Create Suggest Value

> "Create a suggest-value named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/suggest_values" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/suggest_values/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/suggest_values" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @suggest_value.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/suggest_values/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
