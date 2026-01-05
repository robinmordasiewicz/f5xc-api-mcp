---
page_title: f5xc_api_testing - f5xc-api-mcp
subcategory: API
description: Create API Testing.
---

# API Testing

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of api_testing in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-api-testing-create` | Create API Testing. |
| `f5xc-api-api-api-testing-get` | GET API testing. |
| `f5xc-api-api-api-testing-list` | List API Testing. |
| `f5xc-api-api-api-testing-update` | Replace API testing. |
| `f5xc-api-api-api-testing-delete` | DELETE API Testing. |

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

- api-testing

**Modifies:**

- api-testing

**Deletes:**

- api-testing
- contained_resources

## Example Usage

Ask Claude to help you work with API Testing resources:

### Create API Testing

> "Create a api-testing named 'example' in the 'production' namespace"

### List API Testings

> "List all api-testings in the 'production' namespace"

### Get API Testing Details

> "Get details of the api-testing named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/api_testings" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/api_testings/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/api_testings" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @api_testing.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/api_testings/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
