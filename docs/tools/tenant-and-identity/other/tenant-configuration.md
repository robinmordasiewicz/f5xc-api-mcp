---
page_title: f5xc_tenant_configuration - f5xc-api-mcp
subcategory: Tenant And Identity
description: Create tenant configuration.
---

# Tenant Configuration

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of tenant_configuration in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-tenant-configuration-create` | Create tenant configuration. |
| `f5xc-api-tenantandidentity-tenant-configuration-get` | GET tenant configuration. |
| `f5xc-api-tenantandidentity-tenant-configuration-list` | List Tenant Configuration. |
| `f5xc-api-tenantandidentity-tenant-configuration-update` | Replace tenant configuration. |
| `f5xc-api-tenantandidentity-tenant-configuration-delete` | DELETE Tenant Configuration. |

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

- tenant-configuration

**Modifies:**

- tenant-configuration

**Deletes:**

- tenant-configuration
- contained_resources

## Example Usage

Ask Claude to help you work with Tenant Configuration resources:

### Create Tenant Configuration

> "Create a tenant-configuration named 'example' in the 'production' namespace"

### List Tenant Configurations

> "List all tenant-configurations in the 'production' namespace"

### Get Tenant Configuration Details

> "Get details of the tenant-configuration named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create tenant_configuration -n <namespace> -i tenant_configuration.yaml

# Get
xcsh tenant_and_identity get tenant_configuration <name> -n <namespace>

# List
xcsh tenant_and_identity list tenant_configuration -n <namespace>

# Delete
xcsh tenant_and_identity delete tenant_configuration <name> -n <namespace>
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
