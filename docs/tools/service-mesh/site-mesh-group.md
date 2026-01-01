---
page_title: f5xc_site_mesh_group - f5xc-api-mcp
subcategory: Service Mesh
description: Create Site Mesh Group.
---

# Site Mesh Group

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

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

- site-mesh-group

**Modifies:**

- site-mesh-group

**Deletes:**

- site-mesh-group
- contained_resources

## Example Usage

Ask Claude to help you work with Site Mesh Group resources:

### Create Site Mesh Group

> "Create a site-mesh-group named 'example' in the 'production' namespace"

### List Site Mesh Groups

> "List all site-mesh-groups in the 'production' namespace"

### Get Site Mesh Group Details

> "Get details of the site-mesh-group named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh service_mesh create site_mesh_group -n <namespace> -i site_mesh_group.yaml

# Get
xcsh service_mesh get site_mesh_group <name> -n <namespace>

# List
xcsh service_mesh list site_mesh_group -n <namespace>

# Delete
xcsh service_mesh delete site_mesh_group <name> -n <namespace>
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
