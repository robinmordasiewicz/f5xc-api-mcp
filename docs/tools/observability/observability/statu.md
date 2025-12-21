---
page_title: f5xc_statu - f5xc-api-mcp
subcategory: Observability
description: Global Log Receiver Status.
---

# Statu

GET status for global log receivers.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-statu-create` | Global Log Receiver Status. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Statu resources:

### Create Statu

> "Create a statu named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create statu -n <namespace> -i statu.yaml

# Get
f5xcctl observability get statu <name> -n <namespace>

# List
f5xcctl observability list statu -n <namespace>

# Delete
f5xcctl observability delete statu <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_statu" "example" {
  name      = "example-statu"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
