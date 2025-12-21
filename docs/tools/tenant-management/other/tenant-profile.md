---
page_title: f5xc_tenant_profile - f5xc-api-mcp
subcategory: Tenant & Organization Management
description: Create Tenant Profile.
---

# Tenant Profile

Creates a tenant_profile config instance. Name of the object is the name of the tenant profile to be
created.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantmanagement-tenant-profile-create` | Create Tenant Profile. |
| `f5xc-api-tenantmanagement-tenant-profile-get` | GET Tenant Profile. |
| `f5xc-api-tenantmanagement-tenant-profile-list` | List Tenant Profile. |
| `f5xc-api-tenantmanagement-tenant-profile-update` | Replace Tenant Profile. |
| `f5xc-api-tenantmanagement-tenant-profile-delete` | DELETE Tenant Profile. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | Namespace |
| `name` | Name |
| `namespace` | Namespace |
| `metadata.name` | Name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Tenant Profile resources:

### Create Tenant Profile

> "Create a tenant-profile named 'example' in the 'production' namespace"

### List Tenant Profiles

> "List all tenant-profiles in the 'production' namespace"

### Get Tenant Profile Details

> "Get details of the tenant-profile named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_management create tenant_profile -n <namespace> -i tenant_profile.yaml

# Get
f5xcctl tenant_management get tenant_profile <name> -n <namespace>

# List
f5xcctl tenant_management list tenant_profile -n <namespace>

# Delete
f5xcctl tenant_management delete tenant_profile <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_tenant_profile" "example" {
  name      = "example-tenant-profile"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
