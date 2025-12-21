---
page_title: f5xc_mapper - f5xc-api-mcp
subcategory: Identity
description: Update OIDC mappers.
---

# Mapper

Update OIDC mappers updates OIDC mappers in underlying IDM provider.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-mapper-create` | Update OIDC mappers. |
| `f5xc-api-identity-mapper-get` | GET OIDC mappers. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | OIDC provider name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Mapper resources:

### Create Mapper

> "Create a mapper named 'example' in the 'production' namespace"

### Get Mapper Details

> "Get details of the mapper named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl identity create mapper -n <namespace> -i mapper.yaml

# Get
f5xcctl identity get mapper <name> -n <namespace>

# List
f5xcctl identity list mapper -n <namespace>

# Delete
f5xcctl identity delete mapper <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_mapper" "example" {
  name      = "example-mapper"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
