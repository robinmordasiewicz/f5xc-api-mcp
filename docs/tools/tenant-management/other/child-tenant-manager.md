---
page_title: f5xc_child_tenant_manager - f5xc-api-mcp
subcategory: Tenant & Organization Management
description: Child Tenant Manager.
---

# Child Tenant Manager

Creates a child_tenant_manager config instance. Name of the object is the name of the child tenant
manager to be created.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantmanagement-child-tenant-manager-create` | Child Tenant Manager. |
| `f5xc-api-tenantmanagement-child-tenant-manager-get` | GET Child Tenant Manager. |
| `f5xc-api-tenantmanagement-child-tenant-manager-list` | List Child Tenant Manager. |
| `f5xc-api-tenantmanagement-child-tenant-manager-update` | Replace Child Tenant Manager. |
| `f5xc-api-tenantmanagement-child-tenant-manager-delete` | DELETE Child Tenant Manager. |

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

Ask Claude to help you work with Child Tenant Manager resources:

### Create Child Tenant Manager

> "Create a child-tenant-manager named 'example' in the 'production' namespace"

### List Child Tenant Managers

> "List all child-tenant-managers in the 'production' namespace"

### Get Child Tenant Manager Details

> "Get details of the child-tenant-manager named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create child_tenant_manager -n <namespace> -i child_tenant_manager.yaml

# Get
f5xcctl configuration get child_tenant_manager -n <namespace> <name>

# List
f5xcctl configuration list child_tenant_manager -n <namespace>

# Delete
f5xcctl configuration delete child_tenant_manager -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_child_tenant_manager" "example" {
  name      = "example-child-tenant-manager"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
