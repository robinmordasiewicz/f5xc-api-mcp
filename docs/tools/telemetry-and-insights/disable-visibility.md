---
page_title: f5xc_disable_visibility - f5xc-api-mcp
subcategory: Telemetry And Insights
description: Disable visibility in all workspaces.
---

# Disable Visibility

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Disable Visibility of the service in all workspaces. This will remove the discovered service
from
being visible in other wokspaces like WAAP.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-telemetryandinsights-disable-visibility-create` | Disable visibility in all workspaces. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Service Name | `Vs1` |
| `namespace` | Namespace | `Shared` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- disable-visibility

## Example Usage

Ask Claude to help you work with Disable Visibility resources:

### Create Disable Visibility

> "Create a disable-visibility named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh telemetry_and_insights create disable_visibility -n <namespace> -i disable_visibility.yaml

# Get
xcsh telemetry_and_insights get disable_visibility <name> -n <namespace>

# List
xcsh telemetry_and_insights list disable_visibility -n <namespace>

# Delete
xcsh telemetry_and_insights delete disable_visibility <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_disable_visibility" "example" {
  name      = "example-disable-visibility"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
