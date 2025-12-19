---
page_title: f5xc_device - f5xc-api-mcp
subcategory: Bot Defense
description: Top Human Device
---

# Device

Get top human device

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-device-create` | Top Human Device |

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
f5xcctl configuration create device -n <namespace> -i device.yaml

# Get
f5xcctl configuration get device -n <namespace> <name>

# List
f5xcctl configuration list device -n <namespace>

# Delete
f5xcctl configuration delete device -n <namespace> <name>
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
