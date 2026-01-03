---
page_title: f5xc_third_party_application - f5xc-api-mcp
subcategory: Marketplace
description: GET Third Party Application.
---

# Third Party Application

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List the set of third_party_application in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-marketplace-third-party-application-get` | GET Third Party Application. |
| `f5xc-api-marketplace-third-party-application-list` | List Third Party Application. |
| `f5xc-api-marketplace-third-party-application-update` | Replace Third Party Applicationr. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |
| `metadata.namespace` | Namespace | `Staging` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- third-party-application

## Example Usage

Ask Claude to help you work with Third Party Application resources:

### List Third Party Applications

> "List all third-party-applications in the 'production' namespace"

### Get Third Party Application Details

> "Get details of the third-party-application named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/third_party_applications" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/third_party_applications/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/third_party_applications" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @third_party_application.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/third_party_applications/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
