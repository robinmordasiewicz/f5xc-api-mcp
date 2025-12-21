---
page_title: f5xc_device - f5xc-api-mcp
subcategory: Observability
description: Top Human Device.
---

# Device

GET top human device.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-device-create` | Top Human Device. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Device resources:

### Create Device

> "Create a device named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create device -n <namespace> -i device.yaml

# Get
f5xcctl observability get device <name> -n <namespace>

# List
f5xcctl observability list device -n <namespace>

# Delete
f5xcctl observability delete device <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_device" "example" {
  name      = "example-device"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
