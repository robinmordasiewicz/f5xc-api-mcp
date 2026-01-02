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
| `site_mesh_group` | Site Mesh Group | `Smg-1` |

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

## xcsh Equivalent

```bash
# Create/Update
xcsh sites create site_mesh_group -n <namespace> -i site_mesh_group.yaml

# Get
xcsh sites get site_mesh_group <name> -n <namespace>

# List
xcsh sites list site_mesh_group -n <namespace>

# Delete
xcsh sites delete site_mesh_group <name> -n <namespace>
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
