---
page_title: f5xc_suggest_value - f5xc-api-mcp
subcategory: Identity
description: Suggest Values.
---

# Suggest Value

Returns suggested values for the specified field in the given Create/Replace/Custom request.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-suggest-value-create` | Suggest Values. |

## Example Usage

Ask Claude to help you work with Suggest Value resources:

### Create Suggest Value

> "Create a suggest-value named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create suggest_value -n <namespace> -i suggest_value.yaml

# Get
f5xcctl configuration get suggest_value -n <namespace> <name>

# List
f5xcctl configuration list suggest_value -n <namespace>

# Delete
f5xcctl configuration delete suggest_value -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_suggest_value" "example" {
  name      = "example-suggest-value"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
