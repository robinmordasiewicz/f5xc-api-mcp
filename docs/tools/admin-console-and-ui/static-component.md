---
page_title: f5xc_static_component - f5xc-api-mcp
subcategory: Admin Console And Ui
description: GET UI static component.
---

# Static Component

!!! info "Low Risk"
    Operations on this resource are generally safe.

List the set of static_component in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-adminconsoleandui-static-component-get` | GET UI static component. |
| `f5xc-api-adminconsoleandui-static-component-list` | List UI Static Component. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Example Usage

Ask Claude to help you work with Static Component resources:

### List Static Components

> "List all static-components in the 'production' namespace"

### Get Static Component Details

> "Get details of the static-component named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/static_components" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/static_components/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/static_components" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @static_component.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/static_components/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
