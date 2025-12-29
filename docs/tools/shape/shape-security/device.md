---
page_title: f5xc_device - f5xc-api-mcp
subcategory: Shape
description: Top Human Device.
---

# Device

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET top human device.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-device-create` | Top Human Device. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- device

## Example Usage

Ask Claude to help you work with Device resources:

### Create Device

> "Create a device named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl shape device create {name} --namespace {namespace}
```

Create device

### file_based

```bash
f5xcctl shape device create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create device -n <namespace> -i device.yaml

# Get
f5xcctl shape get device <name> -n <namespace>

# List
f5xcctl shape list device -n <namespace>

# Delete
f5xcctl shape delete device <name> -n <namespace>
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
