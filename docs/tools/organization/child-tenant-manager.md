---
page_title: f5xc_child_tenant_manager - f5xc-api-mcp
subcategory: Organization
description: Child Tenant Manager
---

# Child Tenant Manager

Creates a child_tenant_manager config instance. Name of the object is the name of the child tenant
manager to be created.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-child-tenant-manager-create` | Child Tenant Manager |
| `f5xc-api-core-child-tenant-manager-get` | Get Child Tenant Manager |
| `f5xc-api-core-child-tenant-manager-list` | List Child Tenant Manager |
| `f5xc-api-core-child-tenant-manager-update` | Replace Child Tenant Manager |
| `f5xc-api-core-child-tenant-manager-delete` | Delete Child Tenant Manager |

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
f5xcctl apply -f child_tenant_manager.yaml

# Get
f5xcctl get child_tenant_manager {name} -n {namespace}

# List
f5xcctl get child_tenant_managers -n {namespace}

# Delete
f5xcctl delete child_tenant_manager {name} -n {namespace}
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
