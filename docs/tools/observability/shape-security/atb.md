---
page_title: f5xc_atb - f5xc-api-mcp
subcategory: Observability
description: ATB
---

# Atb

Enable/disable ATB.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-atb-create` | ATB |
| `f5xc-api-observability-atb-list` | ATB Status. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `virtual_host` | Name of Virtual Host to scope traffic overview query. |

## Example Usage

Ask Claude to help you work with Atb resources:

### Create Atb

> "Create a atb named 'example' in the 'production' namespace"

### List Atbs

> "List all atbs in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create atb -n <namespace> -i atb.yaml

# Get
f5xcctl observability get atb <name> -n <namespace>

# List
f5xcctl observability list atb -n <namespace>

# Delete
f5xcctl observability delete atb <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_atb" "example" {
  name      = "example-atb"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
