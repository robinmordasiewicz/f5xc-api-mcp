---
page_title: f5xc_allowed_tenant - f5xc-api-mcp
subcategory: Organization
description: Create Allowed Tenant
---

# Allowed Tenant

Creates a allowed_tenant config instance. Name of the object is name of the tenant that is allowed
to manage.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-allowed-tenant-create` | Create Allowed Tenant |
| `f5xc-api-core-allowed-tenant-get` | Get Allowed Tenant |
| `f5xc-api-core-allowed-tenant-list` | List Allowed Tenant |
| `f5xc-api-core-allowed-tenant-update` | Replace Allowed Tenant |
| `f5xc-api-core-allowed-tenant-delete` | Delete Allowed Tenant |

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
| `label_filter` | The label_filter parameter |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Allowed Tenant resources:

### Create Allowed Tenant

> "Create a allowed-tenant named 'example' in the 'production' namespace"

### List Allowed Tenants

> "List all allowed-tenants in the 'production' namespace"

### Get Allowed Tenant Details

> "Get details of the allowed-tenant named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f allowed_tenant.yaml

# Get
f5xcctl get allowed_tenant {name} -n {namespace}

# List
f5xcctl get allowed_tenants -n {namespace}

# Delete
f5xcctl delete allowed_tenant {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_allowed_tenant" "example" {
  name      = "example-allowed-tenant"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
