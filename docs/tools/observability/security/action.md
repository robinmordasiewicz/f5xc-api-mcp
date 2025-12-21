---
page_title: f5xc_action - f5xc-api-mcp
subcategory: Observability
description: Malicious Traffic Overview in actions.
---

# Action

GET Malicious Traffic Overview in Actions.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-action-create` | Malicious Traffic Overview in actions. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Action resources:

### Create Action

> "Create a action named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create action -n <namespace> -i action.yaml

# Get
f5xcctl configuration get action -n <namespace> <name>

# List
f5xcctl configuration list action -n <namespace>

# Delete
f5xcctl configuration delete action -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_action" "example" {
  name      = "example-action"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
