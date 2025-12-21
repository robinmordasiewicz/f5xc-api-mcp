---
page_title: f5xc_swagger_spec - f5xc-api-mcp
subcategory: Applications
description: GET Swagger Spec for App Type.
---

# Swagger Spec

GET the corresponding Swagger spec for the given app type.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-applications-swagger-spec-list` | GET Swagger Spec for App Type. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `app_type_name` | App Type |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Swagger Spec resources:

### List Swagger Specs

> "List all swagger-specs in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl applications create swagger_spec -n <namespace> -i swagger_spec.yaml

# Get
f5xcctl applications get swagger_spec <name> -n <namespace>

# List
f5xcctl applications list swagger_spec -n <namespace>

# Delete
f5xcctl applications delete swagger_spec <name> -n <namespace>
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
