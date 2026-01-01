---
page_title: f5xc_override - f5xc-api-mcp
subcategory: Service Mesh
description: GET Override.
---

# Override

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET all override for API endpoints configured for this App type.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-override-list` | GET Override. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `app_type_name` | App Type | `Blogging-app.` |
| `namespace` | Namespace | `Shared` |

## Example Usage

Ask Claude to help you work with Override resources:

### List Overrides

> "List all overrides in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh service_mesh create override -n <namespace> -i override.yaml

# Get
xcsh service_mesh get override <name> -n <namespace>

# List
xcsh service_mesh list override -n <namespace>

# Delete
xcsh service_mesh delete override <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_override" "example" {
  name      = "example-override"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
