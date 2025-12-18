---
page_title: f5xc_swagger_spec - f5xc-api-mcp
subcategory: API Security
description: Get Swagger Spec for HTTP Load Balancer
---

# Swagger Spec

Get the corresponding Swagger spec for the given HTTP load balancer

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waap-swagger-spec-get` | Get Swagger Spec for HTTP Load Balancer |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Swagger Spec resources:

### Get Swagger Spec Details

> "Get details of the swagger-spec named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f swagger_spec.yaml

# Get
f5xcctl get swagger_spec {name} -n {namespace}

# List
f5xcctl get swagger_specs -n {namespace}

# Delete
f5xcctl delete swagger_spec {name} -n {namespace}
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
