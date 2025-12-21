---
page_title: f5xc_usage - f5xc-api-mcp
subcategory: Applications
description: Usage Metrics.
---

# Usage

GET the workload usage.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-applications-usage-create` | Usage Metrics. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Usage resources:

### Create Usage

> "Create a usage named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create usage -n <namespace> -i usage.yaml

# Get
f5xcctl configuration get usage -n <namespace> <name>

# List
f5xcctl configuration list usage -n <namespace>

# Delete
f5xcctl configuration delete usage -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_usage" "example" {
  name      = "example-usage"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
