---
page_title: f5xc_endpointlabel - f5xc-api-mcp
subcategory: Observability
description: Top Endpoint Labels.
---

# Endpointlabel

GET top Endpoint labels.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-endpointlabel-create` | Top Endpoint Labels. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Endpointlabel resources:

### Create Endpointlabel

> "Create a endpointlabel named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create endpointlabel -n <namespace> -i endpointlabel.yaml

# Get
f5xcctl observability get endpointlabel <name> -n <namespace>

# List
f5xcctl observability list endpointlabel -n <namespace>

# Delete
f5xcctl observability delete endpointlabel <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_endpointlabel" "example" {
  name      = "example-endpointlabel"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
