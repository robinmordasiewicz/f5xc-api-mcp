---
page_title: f5xc_platform - f5xc-api-mcp
subcategory: Observability
description: Top Human Platform.
---

# Platform

GET top human platform.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-platform-create` | Top Human Platform. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Platform resources:

### Create Platform

> "Create a platform named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create platform -n <namespace> -i platform.yaml

# Get
f5xcctl observability get platform <name> -n <namespace>

# List
f5xcctl observability list platform -n <namespace>

# Delete
f5xcctl observability delete platform <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_platform" "example" {
  name      = "example-platform"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
