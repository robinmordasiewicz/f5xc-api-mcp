---
page_title: f5xc_enable_visibility - f5xc-api-mcp
subcategory: Telemetry And Insights
description: Enable visibility in all workspaces.
---

# Enable Visibility

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Enable Visibility of the service in all workspaces. This action will make the
discovered service
visible within WAAP, App Connect where the user can perform
the workspace specific actions.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-telemetryandinsights-enable-visibility-create` | Enable visibility in all workspaces. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Service Name | `Vs1` |
| `namespace` | Namespace | `Shared` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- enable-visibility

## Example Usage

Ask Claude to help you work with Enable Visibility resources:

### Create Enable Visibility

> "Create a enable-visibility named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh telemetry_and_insights create enable_visibility -n <namespace> -i enable_visibility.yaml

# Get
xcsh telemetry_and_insights get enable_visibility <name> -n <namespace>

# List
xcsh telemetry_and_insights list enable_visibility -n <namespace>

# Delete
xcsh telemetry_and_insights delete enable_visibility <name> -n <namespace>
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
