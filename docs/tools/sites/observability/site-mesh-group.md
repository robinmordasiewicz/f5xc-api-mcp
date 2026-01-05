---
page_title: f5xc_site_mesh_group - f5xc-api-mcp
subcategory: Sites
description: Site Mesh Topology.
---

# Site Mesh Group

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET summary of all site mesh groups.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-site-mesh-group-create` | Site Mesh Topology. |
| `f5xc-api-sites-site-mesh-group-list` | Site Mesh Groups Summary. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `site_mesh_group` | Site Mesh Group | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- site-mesh-group

## Example Usage

Ask Claude to help you work with Site Mesh Group resources:

### Create Site Mesh Group

> "Create a site-mesh-group named 'example' in the 'production' namespace"

### List Site Mesh Groups

> "List all site-mesh-groups in the 'production' namespace"

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
