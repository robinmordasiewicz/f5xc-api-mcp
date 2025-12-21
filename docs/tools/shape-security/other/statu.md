---
page_title: f5xc_statu - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: Update Status of Receiver.
---

# Statu

Update receiver object status from enable to disable and vice versa.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-statu-create` | Update Status of Receiver. |
| `f5xc-api-shapesecurity-statu-list` | GET Status. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `id` | ID |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Statu resources:

### Create Statu

> "Create a statu named 'example' in the 'production' namespace"

### List Status

> "List all status in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape_security create statu -n <namespace> -i statu.yaml

# Get
f5xcctl shape_security get statu <name> -n <namespace>

# List
f5xcctl shape_security list statu -n <namespace>

# Delete
f5xcctl shape_security delete statu <name> -n <namespace>
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
