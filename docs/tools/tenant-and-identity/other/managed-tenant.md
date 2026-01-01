---
page_title: f5xc_managed_tenant - f5xc-api-mcp
subcategory: Tenant And Identity
description: Create Managed Tenant.
---

# Managed Tenant

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

GET list of managed tenants that user have access to based on assingned membership.
This is an
optimized list generated based on the requesting user's current group assignments
that will allow
access to managed tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-managed-tenant-create` | Create Managed Tenant. |
| `f5xc-api-tenantandidentity-managed-tenant-get` | GET Managed Tenant. |
| `f5xc-api-tenantandidentity-managed-tenant-list` | List of Managed Tenant By User For Support Operations. |
| `f5xc-api-tenantandidentity-managed-tenant-update` | Replace Managed Tenant. |
| `f5xc-api-tenantandidentity-managed-tenant-delete` | DELETE Managed Tenant. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `page_limit` | PageLimit will hold the limit of items required per query. | `100` |
| `page_start` | PageStart will hold the UUID of the first item in the requested page. | `C5776a8e-bcae-4392-98d3-3556f4b9df1b.` |
| `search_keyword` | Search Keyword for filtering the Managed Tenant List. | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- managed-tenant

**Modifies:**

- managed-tenant

**Deletes:**

- managed-tenant
- contained_resources

## Example Usage

Ask Claude to help you work with Managed Tenant resources:

### Create Managed Tenant

> "Create a managed-tenant named 'example' in the 'production' namespace"

### List Managed Tenants

> "List all managed-tenants in the 'production' namespace"

### Get Managed Tenant Details

> "Get details of the managed-tenant named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create managed_tenant -n <namespace> -i managed_tenant.yaml

# Get
xcsh tenant_and_identity get managed_tenant <name> -n <namespace>

# List
xcsh tenant_and_identity list managed_tenant -n <namespace>

# Delete
xcsh tenant_and_identity delete managed_tenant <name> -n <namespace>
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
