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
f5xcctl applications create usage -n <namespace> -i usage.yaml

# Get
f5xcctl applications get usage <name> -n <namespace>

# List
f5xcctl applications list usage -n <namespace>

# Delete
f5xcctl applications delete usage <name> -n <namespace>
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
