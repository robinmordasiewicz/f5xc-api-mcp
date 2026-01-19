---
page_title: f5xc_cloud_link - f5xc-api-mcp
subcategory: Cloud Infrastructure
description: Create CloudLink.
---

# Cloud Link

Replaces configured CloudLink with new set of parameters.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cloudinfrastructure-cloud-link-create` | Create CloudLink. |
| `f5xc-api-cloudinfrastructure-cloud-link-get` | GET CloudLink. |
| `f5xc-api-cloudinfrastructure-cloud-link-list` | List CloudLink. |
| `f5xc-api-cloudinfrastructure-cloud-link-update` | Replace CloudLink. |
| `f5xc-api-cloudinfrastructure-cloud-link-delete` | DELETE CloudLink. |

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

## Example Usage

Ask Claude to help you work with Cloud Link resources:

### Create Cloud Link

> "Create a cloud-link named 'example' in the 'production' namespace"

### List Cloud Links

> "List all cloud-links in the 'production' namespace"

### Get Cloud Link Details

> "Get details of the cloud-link named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cloud_links" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cloud_links/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cloud_links" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @cloud_link.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cloud_links/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
