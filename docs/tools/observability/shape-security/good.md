---
page_title: f5xc_good - f5xc-api-mcp
subcategory: Observability
description: Top Good Bots.
---

# Good

GET top good bots.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-good-create` | Top Good Bots. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Good resources:

### Create Good

> "Create a good named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create good -n <namespace> -i good.yaml

# Get
f5xcctl observability get good <name> -n <namespace>

# List
f5xcctl observability list good -n <namespace>

# Delete
f5xcctl observability delete good <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_good" "example" {
  name      = "example-good"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
