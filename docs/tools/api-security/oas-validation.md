---
page_title: f5xc_oas_validation - f5xc-api-mcp
subcategory: API Security
description: Suggest Open API specification validation rule
---

# Oas Validation

Suggest Open API specification validation rule for a given path

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-oas-validation-create` | Suggest Open API specification validation rule |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Oas Validation resources:

### Create Oas Validation

> "Create a oas-validation named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create oas_validation -n <namespace> -i oas_validation.yaml

# Get
f5xcctl configuration get oas_validation -n <namespace> <name>

# List
f5xcctl configuration list oas_validation -n <namespace>

# Delete
f5xcctl configuration delete oas_validation -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_oas_validation" "example" {
  name      = "example-oas-validation"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
