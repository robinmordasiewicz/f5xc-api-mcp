---
page_title: f5xc_oas_validation - f5xc-api-mcp
subcategory: Organization
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
f5xcctl apply -f oas_validation.yaml

# Get
f5xcctl get oas_validation {name} -n {namespace}

# List
f5xcctl get oas_validations -n {namespace}

# Delete
f5xcctl delete oas_validation {name} -n {namespace}
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
