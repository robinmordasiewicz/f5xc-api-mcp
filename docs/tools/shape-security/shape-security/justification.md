---
page_title: f5xc_justification - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: Update Script Justification.
---

# Justification

DELETE the specified script justification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-justification-create` | Update Script Justification. |
| `f5xc-api-shapesecurity-justification-delete` | DELETE Script Justification. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `script_id` | Script_id |
| `justification_id` | Justification_id |

## Example Usage

Ask Claude to help you work with Justification resources:

### Create Justification

> "Create a justification named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape_security create justification -n <namespace> -i justification.yaml

# Get
f5xcctl shape_security get justification <name> -n <namespace>

# List
f5xcctl shape_security list justification -n <namespace>

# Delete
f5xcctl shape_security delete justification <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_justification" "example" {
  name      = "example-justification"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
