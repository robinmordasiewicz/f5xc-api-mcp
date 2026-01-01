---
page_title: f5xc_acces - f5xc-api-mcp
subcategory: Tenant And Identity
description: Update Support Tenant Access.
---

# Acces

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

This RPC can be used to manage user access for all flavors of support tenants currently
supported by
the platform. Use read-only, read-write with specific namespaces or
admin can specify custom groups
to control access by the support tenant user.
Name is well-known identifier for a specific support
related tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-acces-create` | Update Support Tenant Access. |
| `f5xc-api-tenantandidentity-acces-list` | GET Support Tenant Access. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- acces

## Example Usage

Ask Claude to help you work with Acces resources:

### Create Acces

> "Create a acces named 'example' in the 'production' namespace"

### List Access

> "List all access in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create acces -n <namespace> -i acces.yaml

# Get
xcsh tenant_and_identity get acces <name> -n <namespace>

# List
xcsh tenant_and_identity list acces -n <namespace>

# Delete
xcsh tenant_and_identity delete acces <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_acces" "example" {
  name      = "example-acces"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
