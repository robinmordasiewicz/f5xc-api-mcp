---
page_title: f5xc_child_tenant - f5xc-api-mcp
subcategory: Tenant & Organization Management
description: Child Tenant.
---

# Child Tenant

GET list of child tenants user has access to based on assigned membership.
This is an optimized list
generated based on the requesting user's current group assignments
that will allow access to child
tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantmanagement-child-tenant-create` | Child Tenant. |
| `f5xc-api-tenantmanagement-child-tenant-get` | List child tenants for a given child tenant manager. |
| `f5xc-api-tenantmanagement-child-tenant-list` | List of Child Tenants. |
| `f5xc-api-tenantmanagement-child-tenant-update` | Replace Child Tenant. |
| `f5xc-api-tenantmanagement-child-tenant-delete` | DELETE Child Tenant. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | Namespace |
| `name` | Name |
| `metadata.name` | Name |
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `ctm` | Name of the Child Tenant Manager. |
| `name` | Filter child tenant list using name of child tenant. |
| `page_limit` | PageLimit will hold the limit of items required per query. |
| `page_start` | PageStart will hold the UUID of the first item in the requested page. |

## Example Usage

Ask Claude to help you work with Child Tenant resources:

### Create Child Tenant

> "Create a child-tenant named 'example' in the 'production' namespace"

### List Child Tenants

> "List all child-tenants in the 'production' namespace"

### Get Child Tenant Details

> "Get details of the child-tenant named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_management create child_tenant -n <namespace> -i child_tenant.yaml

# Get
f5xcctl tenant_management get child_tenant <name> -n <namespace>

# List
f5xcctl tenant_management list child_tenant -n <namespace>

# Delete
f5xcctl tenant_management delete child_tenant <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_child_tenant" "example" {
  name      = "example-child-tenant"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
