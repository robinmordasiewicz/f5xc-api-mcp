---
page_title: f5xc_assign_namespace_role - f5xc-api-mcp
subcategory: Tenant And Identity
description: Assign role to User Group.
---

# Assign Namespace Role

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

AssignRole allows customers to assign a namespace/role pair to user group.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-assign-namespace-role-update` | Assign role to User Group. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name of the user group | `738b3156-112f-1f8b-a3e5-7e2ce1a6eff3.` |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- assign-namespace-role

## Example Usage

Ask Claude to help you work with Assign Namespace Role resources:

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create assign_namespace_role -n <namespace> -i assign_namespace_role.yaml

# Get
xcsh tenant_and_identity get assign_namespace_role <name> -n <namespace>

# List
xcsh tenant_and_identity list assign_namespace_role -n <namespace>

# Delete
xcsh tenant_and_identity delete assign_namespace_role <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_assign_namespace_role" "example" {
  name      = "example-assign-namespace-role"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
