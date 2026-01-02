---
page_title: f5xc_child_tenant_manager - f5xc-api-mcp
subcategory: Tenant And Identity
description: Child Tenant Manager.
---

# Child Tenant Manager

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Creates a child_tenant_manager config instance. Name of the object is the name of the child tenant
manager to be created.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-child-tenant-manager-create` | Child Tenant Manager. |
| `f5xc-api-tenantandidentity-child-tenant-manager-get` | GET Child Tenant Manager. |
| `f5xc-api-tenantandidentity-child-tenant-manager-list` | List Child Tenant Manager. |
| `f5xc-api-tenantandidentity-child-tenant-manager-update` | Replace Child Tenant Manager. |
| `f5xc-api-tenantandidentity-child-tenant-manager-delete` | DELETE Child Tenant Manager. |

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

- child-tenant-manager

**Modifies:**

- child-tenant-manager

**Deletes:**

- child-tenant-manager
- contained_resources

## Example Usage

Ask Claude to help you work with Child Tenant Manager resources:

### Create Child Tenant Manager

> "Create a child-tenant-manager named 'example' in the 'production' namespace"

### List Child Tenant Managers

> "List all child-tenant-managers in the 'production' namespace"

### Get Child Tenant Manager Details

> "Get details of the child-tenant-manager named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create child_tenant_manager -n <namespace> -i child_tenant_manager.yaml

# Get
xcsh tenant_and_identity get child_tenant_manager <name> -n <namespace>

# List
xcsh tenant_and_identity list child_tenant_manager -n <namespace>

# Delete
xcsh tenant_and_identity delete child_tenant_manager <name> -n <namespace>
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
