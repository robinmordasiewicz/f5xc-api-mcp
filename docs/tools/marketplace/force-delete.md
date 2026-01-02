---
page_title: f5xc_force_delete - f5xc-api-mcp
subcategory: Marketplace
description: Force DELETE view.
---

# Force Delete

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Force DELETE view object. This can result in staled objects in cloud provider.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-marketplace-force-delete-create` | Force DELETE view. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `view_kind` | Kind of View | `Value` |
| `view_name` | Name of view | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- force-delete

## Example Usage

Ask Claude to help you work with Force Delete resources:

### Create Force Delete

> "Create a force-delete named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh marketplace create force_delete -n <namespace> -i force_delete.yaml

# Get
xcsh marketplace get force_delete <name> -n <namespace>

# List
xcsh marketplace list force_delete -n <namespace>

# Delete
xcsh marketplace delete force_delete <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_force_delete" "example" {
  name      = "example-force-delete"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
