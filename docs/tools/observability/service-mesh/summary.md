---
page_title: f5xc_summary - f5xc-api-mcp
subcategory: Observability
description: Endpoint Summary.
---

# Summary

GET Consumption summary.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-summary-create` | Endpoint Summary. |
| `f5xc-api-observability-summary-list` | Consumption Summary. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `end` | Or "2022-09-30" |
| `start` | Or "2022-08-01" |

## Example Usage

Ask Claude to help you work with Summary resources:

### Create Summary

> "Create a summary named 'example' in the 'production' namespace"

### List Summarys

> "List all summarys in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create summary -n <namespace> -i summary.yaml

# Get
f5xcctl observability get summary <name> -n <namespace>

# List
f5xcctl observability list summary -n <namespace>

# Delete
f5xcctl observability delete summary <name> -n <namespace>
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
