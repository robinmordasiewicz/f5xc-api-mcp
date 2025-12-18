---
page_title: f5xc_enable_visibility - f5xc-api-mcp
subcategory: Organization
description: Enable visibility in all workspaces
---

# Enable Visibility

Enable Visibility of the service in all workspaces. This action will make the
discovered service
visible within WAAP, App Connect where the user can perform
the workspace specific actions.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-enable-visibility-create` | Enable visibility in all workspaces |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Service Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Enable Visibility resources:

### Create Enable Visibility

> "Create a enable-visibility named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f enable_visibility.yaml

# Get
f5xcctl get enable_visibility {name} -n {namespace}

# List
f5xcctl get enable_visibilitys -n {namespace}

# Delete
f5xcctl delete enable_visibility {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_enable_visibility" "example" {
  name      = "example-enable-visibility"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
