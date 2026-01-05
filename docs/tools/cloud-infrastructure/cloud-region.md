---
page_title: f5xc_cloud_region - f5xc-api-mcp
subcategory: Cloud Infrastructure
description: GET Cloud Region.
---

# Cloud Region

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List the set of cloud_region in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cloudinfrastructure-cloud-region-get` | GET Cloud Region. |
| `f5xc-api-cloudinfrastructure-cloud-region-list` | List Cloud Region. |
| `f5xc-api-cloudinfrastructure-cloud-region-update` | Replace Cloud Region. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `-` |
| `namespace` | Namespace | `-` |
| `metadata.name` | Name | `-` |
| `metadata.namespace` | Namespace | `-` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `-` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- cloud-region

## Example Usage

Ask Claude to help you work with Cloud Region resources:

### List Cloud Regions

> "List all cloud-regions in the 'production' namespace"

### Get Cloud Region Details

> "Get details of the cloud-region named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cloud_regions" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cloud_regions/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cloud_regions" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @cloud_region.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cloud_regions/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
