---
page_title: f5xc_site_mesh_group - f5xc-api-mcp
subcategory: Sites
description: Create Site Mesh Group
---

# Site Mesh Group

Create a Site Mesh Group in system namespace of user

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-site-mesh-group-create` | Create Site Mesh Group |
| `f5xc-api-core-site-mesh-group-get` | Get Site Mesh Group |
| `f5xc-api-core-site-mesh-group-list` | List Site Mesh Group |
| `f5xc-api-core-site-mesh-group-update` | Replace Site Mesh Group |
| `f5xc-api-core-site-mesh-group-delete` | Delete Site Mesh Group |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | namespace |
| `name` | name |
| `namespace` | namespace |
| `metadata.name` | name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Site Mesh Group resources:

### Create Site Mesh Group

> "Create a site-mesh-group named 'example' in the 'production' namespace"

### List Site Mesh Groups

> "List all site-mesh-groups in the 'production' namespace"

### Get Site Mesh Group Details

> "Get details of the site-mesh-group named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create site_mesh_group -n <namespace> -i site_mesh_group.yaml

# Get
f5xcctl configuration get site_mesh_group -n <namespace> <name>

# List
f5xcctl configuration list site_mesh_group -n <namespace>

# Delete
f5xcctl configuration delete site_mesh_group -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_site_mesh_group" "example" {
  name      = "example-site-mesh-group"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
