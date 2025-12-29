---
page_title: f5xc_swagger_spec - f5xc-api-mcp
subcategory: Virtual
description: GET Swagger Spec for HTTP Load Balancer.
---

# Swagger Spec

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET the corresponding Swagger spec for the given HTTP load balancer.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-swagger-spec-get` | GET Swagger Spec for HTTP Load Balancer. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Blogging-app.` |
| `namespace` | Namespace | `Shared` |

## Example Usage

Ask Claude to help you work with Swagger Spec resources:

### Get Swagger Spec Details

> "Get details of the swagger-spec named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl ml swagger-spec get {name} --namespace {namespace}
```

Get specific swagger-spec

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl virtual create swagger_spec -n <namespace> -i swagger_spec.yaml

# Get
f5xcctl virtual get swagger_spec <name> -n <namespace>

# List
f5xcctl virtual list swagger_spec -n <namespace>

# Delete
f5xcctl virtual delete swagger_spec <name> -n <namespace>
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
