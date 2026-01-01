---
page_title: f5xc_swagger_spec - f5xc-api-mcp
subcategory: Service Mesh
description: GET Swagger Spec for App Type.
---

# Swagger Spec

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET the corresponding Swagger spec for the given app type.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-swagger-spec-list` | GET Swagger Spec for App Type. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `app_type_name` | App Type | `Blogging-app.` |
| `namespace` | Namespace | `Shared` |

## Example Usage

Ask Claude to help you work with Swagger Spec resources:

### List Swagger Specs

> "List all swagger-specs in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh service_mesh create swagger_spec -n <namespace> -i swagger_spec.yaml

# Get
xcsh service_mesh get swagger_spec <name> -n <namespace>

# List
xcsh service_mesh list swagger_spec -n <namespace>

# Delete
xcsh service_mesh delete swagger_spec <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_swagger_spec" "example" {
  name      = "example-swagger-spec"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
