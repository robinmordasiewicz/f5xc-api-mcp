---
page_title: f5xc_force_delete - f5xc-api-mcp
subcategory: Integrations
description: Force DELETE view.
---

# Force Delete

Force DELETE view object. This can result in staled objects in cloud provider.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-integrations-force-delete-create` | Force DELETE view. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `view_kind` | Kind of View |
| `view_name` | Name of view |

## Example Usage

Ask Claude to help you work with Force Delete resources:

### Create Force Delete

> "Create a force-delete named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl integrations create force_delete -n <namespace> -i force_delete.yaml

# Get
f5xcctl integrations get force_delete <name> -n <namespace>

# List
f5xcctl integrations list force_delete -n <namespace>

# Delete
f5xcctl integrations delete force_delete <name> -n <namespace>
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
