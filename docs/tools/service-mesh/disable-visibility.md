---
page_title: f5xc_disable_visibility - f5xc-api-mcp
subcategory: Service Mesh
description: Disable visibility in all workspaces.
---

# Disable Visibility

Disable Visibility of the service in all workspaces. This will remove the discovered service
from
being visible in other wokspaces like WAAP.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-disable-visibility-create` | Disable visibility in all workspaces. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Service Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Disable Visibility resources:

### Create Disable Visibility

> "Create a disable-visibility named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl service_mesh create disable_visibility -n <namespace> -i disable_visibility.yaml

# Get
f5xcctl service_mesh get disable_visibility <name> -n <namespace>

# List
f5xcctl service_mesh list disable_visibility -n <namespace>

# Delete
f5xcctl service_mesh delete disable_visibility <name> -n <namespace>
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
