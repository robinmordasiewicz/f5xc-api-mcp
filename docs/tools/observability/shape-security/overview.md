---
page_title: f5xc_overview - f5xc-api-mcp
subcategory: Observability
description: Top Latency Overview.
---

# Overview

GET top latency overview.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-overview-create` | Top Latency Overview. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Overview resources:

### Create Overview

> "Create a overview named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create overview -n <namespace> -i overview.yaml

# Get
f5xcctl observability get overview <name> -n <namespace>

# List
f5xcctl observability list overview -n <namespace>

# Delete
f5xcctl observability delete overview <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_overview" "example" {
  name      = "example-overview"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
