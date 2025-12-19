---
page_title: f5xc_managed_tenants_by_user - f5xc-api-mcp
subcategory: Organization
description: Get List of Managed Tenant By User
---

# Managed Tenants By User

Get list of managed tenants that user have access to based on assigned membership.
This is an
optimized list generated based on the requesting user's current group assignments
that will allow
access to managed tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-managed-tenants-by-user-list` | Get List of Managed Tenant By User |

## Parameters

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `page_limit` | The page_limit parameter |
| `page_start` | The page_start parameter |
| `search_keyword` | The search_keyword parameter |

## Example Usage

Ask Claude to help you work with Managed Tenants By User resources:

### List Managed Tenants By Users

> "List all managed-tenants-by-users in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create managed_tenants_by_user -n <namespace> -i managed_tenants_by_user.yaml

# Get
f5xcctl configuration get managed_tenants_by_user -n <namespace> <name>

# List
f5xcctl configuration list managed_tenants_by_user -n <namespace>

# Delete
f5xcctl configuration delete managed_tenants_by_user -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_managed_tenants_by_user" "example" {
  name      = "example-managed-tenants-by-user"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
