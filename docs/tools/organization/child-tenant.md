---
page_title: f5xc_child_tenant - f5xc-api-mcp
subcategory: Organization
description: Child Tenant
---

# Child Tenant

Get list of child tenants user has access to based on assigned membership.
This is an optimized list
generated based on the requesting user's current group assignments
that will allow access to child
tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-child-tenant-create` | Child Tenant |
| `f5xc-api-core-child-tenant-get` | Get Child Tenant |
| `f5xc-api-core-child-tenant-list` | List of Child Tenants |
| `f5xc-api-core-child-tenant-update` | Replace Child Tenant |
| `f5xc-api-core-child-tenant-delete` | Delete Child Tenant |

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
| `ctm` | The ctm parameter |
| `name` | The name parameter |
| `page_limit` | The page_limit parameter |
| `page_start` | The page_start parameter |

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
f5xcctl apply -f child_tenant.yaml

# Get
f5xcctl get child_tenant {name} -n {namespace}

# List
f5xcctl get child_tenants -n {namespace}

# Delete
f5xcctl delete child_tenant {name} -n {namespace}
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
