---
page_title: f5xc_group_remove - f5xc-api-mcp
subcategory: Tenant And Identity
description: Remove user from groups.
---

# Group Remove

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Remove existing user from specific groups.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-group-remove-update` | Remove user from groups. |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- group-remove

## Example Usage

Ask Claude to help you work with Group Remove resources:

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create group_remove -n <namespace> -i group_remove.yaml

# Get
xcsh tenant_and_identity get group_remove <name> -n <namespace>

# List
xcsh tenant_and_identity list group_remove -n <namespace>

# Delete
xcsh tenant_and_identity delete group_remove <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_group_remove" "example" {
  name      = "example-group-remove"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
