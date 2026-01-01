---
page_title: f5xc_atb - f5xc-api-mcp
subcategory: Shape
description: ATB
---

# Atb

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Enable/disable ATB.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-atb-create` | ATB |
| `f5xc-api-shape-atb-list` | ATB Status. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `virtual_host` | Name of Virtual Host to scope traffic overview query. | `Example-app-vh-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- atb

## Example Usage

Ask Claude to help you work with Atb resources:

### Create Atb

> "Create a atb named 'example' in the 'production' namespace"

### List Atbs

> "List all atbs in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create atb -n <namespace> -i atb.yaml

# Get
xcsh shape get atb <name> -n <namespace>

# List
xcsh shape list atb -n <namespace>

# Delete
xcsh shape delete atb <name> -n <namespace>
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
