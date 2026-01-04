---
page_title: f5xc_geo_location_set - f5xc-api-mcp
subcategory: Virtual
description: Create Geolocation.
---

# Geo Location Set

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of geo_location_set in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-geo-location-set-create` | Create Geolocation. |
| `f5xc-api-virtual-geo-location-set-get` | GET Geolocation Set. |
| `f5xc-api-virtual-geo-location-set-list` | List Geolocation Set. |
| `f5xc-api-virtual-geo-location-set-update` | Replace Geolocation Set. |
| `f5xc-api-virtual-geo-location-set-delete` | DELETE Geolocation Set. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- geo-location-set

**Modifies:**

- geo-location-set

**Deletes:**

- geo-location-set
- contained_resources

## Example Usage

Ask Claude to help you work with Geo Location Set resources:

### Create Geo Location Set

> "Create a geo-location-set named 'example' in the 'production' namespace"

### List Geo Location Sets

> "List all geo-location-sets in the 'production' namespace"

### Get Geo Location Set Details

> "Get details of the geo-location-set named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/geo_location_sets" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/geo_location_sets/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/geo_location_sets" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @geo_location_set.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/geo_location_sets/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
