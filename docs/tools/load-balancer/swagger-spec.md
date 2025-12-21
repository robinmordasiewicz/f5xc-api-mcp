---
page_title: f5xc_swagger_spec - f5xc-api-mcp
subcategory: Load Balancing
description: GET Swagger Spec for HTTP Load Balancer.
---

# Swagger Spec

GET the corresponding Swagger spec for the given HTTP load balancer.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-loadbalancer-swagger-spec-get` | GET Swagger Spec for HTTP Load Balancer. |

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
f5xcctl configuration create swagger_spec -n <namespace> -i swagger_spec.yaml

# Get
f5xcctl configuration get swagger_spec -n <namespace> <name>

# List
f5xcctl configuration list swagger_spec -n <namespace>

# Delete
f5xcctl configuration delete swagger_spec -n <namespace> <name>
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
