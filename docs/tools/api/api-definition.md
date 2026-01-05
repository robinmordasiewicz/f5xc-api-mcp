---
page_title: f5xc_api_definition - f5xc-api-mcp
subcategory: API
description: Create API Definition.
---

# API Definition

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of api_definition in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-api-definition-create` | Create API Definition. |
| `f5xc-api-api-api-definition-get` | GET API Definition. |
| `f5xc-api-api-api-definition-list` | List API Definition. |
| `f5xc-api-api-api-definition-update` | Replace API Definition. |
| `f5xc-api-api-api-definition-delete` | DELETE API Definition. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `-` |
| `name` | Name | `-` |
| `namespace` | Namespace | `-` |
| `metadata.name` | Name | `-` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `-` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- api-definition

**Modifies:**

- api-definition

**Deletes:**

- api-definition
- contained_resources

## Example Usage

Ask Claude to help you work with API Definition resources:

### Create API Definition

> "Create a api-definition named 'example' in the 'production' namespace"

### List API Definitions

> "List all api-definitions in the 'production' namespace"

### Get API Definition Details

> "Get details of the api-definition named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/api_definitions" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/api_definitions/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/api_definitions" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @api_definition.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/api_definitions/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
