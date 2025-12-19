---
page_title: f5xc_tenant_configuration - f5xc-api-mcp
subcategory: Organization
description: Create tenant configuration
---

# Tenant Configuration

List the set of tenant_configuration in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-tenant-configuration-create` | Create tenant configuration |
| `f5xc-api-core-tenant-configuration-get` | Get tenant configuration |
| `f5xc-api-core-tenant-configuration-list` | List Tenant Configuration |
| `f5xc-api-core-tenant-configuration-update` | Replace tenant configuration |
| `f5xc-api-core-tenant-configuration-delete` | Delete Tenant Configuration |

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

Ask Claude to help you work with Tenant Configuration resources:

### Create Tenant Configuration

> "Create a tenant-configuration named 'example' in the 'production' namespace"

### List Tenant Configurations

> "List all tenant-configurations in the 'production' namespace"

### Get Tenant Configuration Details

> "Get details of the tenant-configuration named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create tenant_configuration -n <namespace> -i tenant_configuration.yaml

# Get
f5xcctl configuration get tenant_configuration -n <namespace> <name>

# List
f5xcctl configuration list tenant_configuration -n <namespace>

# Delete
f5xcctl configuration delete tenant_configuration -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_tenant_configuration" "example" {
  name      = "example-tenant-configuration"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
