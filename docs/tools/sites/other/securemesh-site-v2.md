---
page_title: f5xc_securemesh_site_v2 - f5xc-api-mcp
subcategory: Sites
description: Create Secure Mesh site.
---

# Securemesh Site V2

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of securemesh_site_v2 in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-securemesh-site-v2-create` | Create Secure Mesh site. |
| `f5xc-api-sites-securemesh-site-v2-get` | GET Secure Mesh site. |
| `f5xc-api-sites-securemesh-site-v2-list` | List Configure Secure Mesh Site. |
| `f5xc-api-sites-securemesh-site-v2-update` | Replace Secure Mesh site. |
| `f5xc-api-sites-securemesh-site-v2-delete` | DELETE Configure Secure Mesh Site. |

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

- securemesh-site-v2

**Modifies:**

- securemesh-site-v2

**Deletes:**

- securemesh-site-v2
- contained_resources

## Example Usage

Ask Claude to help you work with Securemesh Site V2 resources:

### Create Securemesh Site V2

> "Create a securemesh-site-v2 named 'example' in the 'production' namespace"

### List Securemesh Site V2s

> "List all securemesh-site-v2s in the 'production' namespace"

### Get Securemesh Site V2 Details

> "Get details of the securemesh-site-v2 named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/securemesh_site_v2s" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/securemesh_site_v2s/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/securemesh_site_v2s" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @securemesh_site_v2.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/securemesh_site_v2s/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
