---
page_title: f5xc_lookup_user_role - f5xc-api-mcp
subcategory: Organization
description: Lookup User Roles
---

# Lookup User Role

LookupUserRoles returns roles for the the given user, namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-lookup-user-role-create` | Lookup User Roles |

## Example Usage

Ask Claude to help you work with Lookup User Role resources:

### Create Lookup User Role

> "Create a lookup-user-role named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create lookup_user_role -n <namespace> -i lookup_user_role.yaml

# Get
f5xcctl configuration get lookup_user_role -n <namespace> <name>

# List
f5xcctl configuration list lookup_user_role -n <namespace>

# Delete
f5xcctl configuration delete lookup_user_role -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_lookup_user_role" "example" {
  name      = "example-lookup-user-role"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
