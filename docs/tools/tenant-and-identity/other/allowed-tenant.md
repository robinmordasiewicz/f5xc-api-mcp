---
page_title: f5xc_allowed_tenant - f5xc-api-mcp
subcategory: Tenant And Identity
description: Create Allowed Tenant.
---

# Allowed Tenant

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Creates a allowed_tenant config instance. Name of the object is name of the tenant that is allowed
to manage.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-allowed-tenant-create` | Create Allowed Tenant. |
| `f5xc-api-tenantandidentity-allowed-tenant-get` | GET Allowed Tenant. |
| `f5xc-api-tenantandidentity-allowed-tenant-list` | List Allowed Tenant. |
| `f5xc-api-tenantandidentity-allowed-tenant-update` | Replace Allowed Tenant. |
| `f5xc-api-tenantandidentity-allowed-tenant-delete` | DELETE Allowed Tenant. |

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
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- allowed-tenant

**Modifies:**

- allowed-tenant

**Deletes:**

- allowed-tenant
- contained_resources

## Example Usage

Ask Claude to help you work with Allowed Tenant resources:

### Create Allowed Tenant

> "Create a allowed-tenant named 'example' in the 'production' namespace"

### List Allowed Tenants

> "List all allowed-tenants in the 'production' namespace"

### Get Allowed Tenant Details

> "Get details of the allowed-tenant named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create allowed_tenant -n <namespace> -i allowed_tenant.yaml

# Get
xcsh tenant_and_identity get allowed_tenant <name> -n <namespace>

# List
xcsh tenant_and_identity list allowed_tenant -n <namespace>

# Delete
xcsh tenant_and_identity delete allowed_tenant <name> -n <namespace>
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
