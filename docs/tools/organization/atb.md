---
page_title: f5xc_atb - f5xc-api-mcp
subcategory: Organization
description: ATB
---

# Atb

Enable/disable ATB

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-atb-create` | ATB |
| `f5xc-api-core-atb-list` | ATB Status |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `virtual_host` | x-required |

## Example Usage

Ask Claude to help you work with Atb resources:

### Create Atb

> "Create a atb named 'example' in the 'production' namespace"

### List Atbs

> "List all atbs in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create atb -n <namespace> -i atb.yaml

# Get
f5xcctl configuration get atb -n <namespace> <name>

# List
f5xcctl configuration list atb -n <namespace>

# Delete
f5xcctl configuration delete atb -n <namespace> <name>
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
