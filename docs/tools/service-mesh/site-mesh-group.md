---
page_title: f5xc_site_mesh_group - f5xc-api-mcp
subcategory: Service Mesh
description: Create Site Mesh Group.
---

# Site Mesh Group

Create a Site Mesh Group in system namespace of user.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-site-mesh-group-create` | Create Site Mesh Group. |
| `f5xc-api-servicemesh-site-mesh-group-get` | GET Site Mesh Group. |
| `f5xc-api-servicemesh-site-mesh-group-list` | List Site Mesh Group. |
| `f5xc-api-servicemesh-site-mesh-group-update` | Replace Site Mesh Group. |
| `f5xc-api-servicemesh-site-mesh-group-delete` | DELETE Site Mesh Group. |

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

Ask Claude to help you work with Site Mesh Group resources:

### Create Site Mesh Group

> "Create a site-mesh-group named 'example' in the 'production' namespace"

### List Site Mesh Groups

> "List all site-mesh-groups in the 'production' namespace"

### Get Site Mesh Group Details

> "Get details of the site-mesh-group named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/site_mesh_groups" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/site_mesh_groups/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/site_mesh_groups" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @site_mesh_group.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/site_mesh_groups/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
