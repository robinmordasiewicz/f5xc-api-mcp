---
page_title: f5xc_managed_tenant - f5xc-api-mcp
subcategory: Organization
description: Create Managed Tenant
---

# Managed Tenant

Get list of managed tenants that user have access to based on assingned membership.
This is an
optimized list generated based on the requesting user's current group assignments
that will allow
access to managed tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-managed-tenant-create` | Create Managed Tenant |
| `f5xc-api-core-managed-tenant-get` | Get Managed Tenant |
| `f5xc-api-core-managed-tenant-list` | List of Managed Tenant By User For Support Operations |
| `f5xc-api-core-managed-tenant-update` | Replace Managed Tenant |
| `f5xc-api-core-managed-tenant-delete` | Delete Managed Tenant |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | namespace |
| `name` | name |
| `namespace` | namespace |
| `metadata.name` | name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `page_limit` | The page_limit parameter |
| `page_start` | The page_start parameter |
| `search_keyword` | The search_keyword parameter |

## Example Usage

Ask Claude to help you work with Managed Tenant resources:

### Create Managed Tenant

> "Create a managed-tenant named 'example' in the 'production' namespace"

### List Managed Tenants

> "List all managed-tenants in the 'production' namespace"

### Get Managed Tenant Details

> "Get details of the managed-tenant named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f managed_tenant.yaml

# Get
f5xcctl get managed_tenant {name} -n {namespace}

# List
f5xcctl get managed_tenants -n {namespace}

# Delete
f5xcctl delete managed_tenant {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_managed_tenant" "example" {
  name      = "example-managed-tenant"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
