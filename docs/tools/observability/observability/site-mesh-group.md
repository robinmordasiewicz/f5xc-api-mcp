---
page_title: f5xc_site_mesh_group - f5xc-api-mcp
subcategory: Observability
description: Site Mesh Topology.
---

# Site Mesh Group

GET summary of all site mesh groups.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-site-mesh-group-create` | Site Mesh Topology. |
| `f5xc-api-observability-site-mesh-group-list` | Site Mesh Groups Summary. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `site_mesh_group` | Site Mesh Group |

## Example Usage

Ask Claude to help you work with Site Mesh Group resources:

### Create Site Mesh Group

> "Create a site-mesh-group named 'example' in the 'production' namespace"

### List Site Mesh Groups

> "List all site-mesh-groups in the 'production' namespace"

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
