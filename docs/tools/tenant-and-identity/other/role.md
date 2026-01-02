---
page_title: f5xc_role - f5xc-api-mcp
subcategory: Tenant And Identity
description: Custom Create Role.
---

# Role

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Create a role object and the rbac_policy object which the role associated with.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-role-create` | Custom Create Role. |
| `f5xc-api-tenantandidentity-role-get` | Custom GET Role. |
| `f5xc-api-tenantandidentity-role-list` | Custom List Roles. |
| `f5xc-api-tenantandidentity-role-update` | Custom Replace Role. |
| `f5xc-api-tenantandidentity-role-delete` | DELETE Role. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `name` | Name | `Name` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- role

**Modifies:**

- role

**Deletes:**

- role
- contained_resources

## Example Usage

Ask Claude to help you work with Role resources:

### Create Role

> "Create a role named 'example' in the 'production' namespace"

### List Roles

> "List all roles in the 'production' namespace"

### Get Role Details

> "Get details of the role named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create role -n <namespace> -i role.yaml

# Get
xcsh tenant_and_identity get role <name> -n <namespace>

# List
xcsh tenant_and_identity list role -n <namespace>

# Delete
xcsh tenant_and_identity delete role <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_role" "example" {
  name      = "example-role"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
