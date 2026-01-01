---
page_title: f5xc_remove_namespace_role - f5xc-api-mcp
subcategory: Tenant And Identity
description: Remove role from User Group.
---

# Remove Namespace Role

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

RemoveRole allows customers to remove a namespace/role from the user group.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-remove-namespace-role-update` | Remove role from User Group. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name of the user group | `738b3156-112f-1f8b-a3e5-7e2ce1a6eff3.` |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- remove-namespace-role

## Example Usage

Ask Claude to help you work with Remove Namespace Role resources:

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create remove_namespace_role -n <namespace> -i remove_namespace_role.yaml

# Get
xcsh tenant_and_identity get remove_namespace_role <name> -n <namespace>

# List
xcsh tenant_and_identity list remove_namespace_role -n <namespace>

# Delete
xcsh tenant_and_identity delete remove_namespace_role <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_remove_namespace_role" "example" {
  name      = "example-remove-namespace-role"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
