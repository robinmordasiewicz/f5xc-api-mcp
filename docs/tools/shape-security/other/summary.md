---
page_title: f5xc_summary - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: Load Executive Summary.
---

# Summary

Executive summary page for DI premium customers.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-summary-create` | Load Executive Summary. |
| `f5xc-api-shapesecurity-summary-list` | GET Summary. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Summary resources:

### Create Summary

> "Create a summary named 'example' in the 'production' namespace"

### List Summarys

> "List all summarys in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape_security create summary -n <namespace> -i summary.yaml

# Get
f5xcctl shape_security get summary <name> -n <namespace>

# List
f5xcctl shape_security list summary -n <namespace>

# Delete
f5xcctl shape_security delete summary <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_summary" "example" {
  name      = "example-summary"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
