---
page_title: f5xc_migrate - f5xc-api-mcp
subcategory: Tenant & Organization Management
description: Migrate CTM child tenants.
---

# Migrate

Migrate ACTIVE child tenants from existing CTM to a specified new CTM.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantmanagement-migrate-create` | Migrate CTM child tenants. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |

## Example Usage

Ask Claude to help you work with Migrate resources:

### Create Migrate

> "Create a migrate named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_management create migrate -n <namespace> -i migrate.yaml

# Get
f5xcctl tenant_management get migrate <name> -n <namespace>

# List
f5xcctl tenant_management list migrate -n <namespace>

# Delete
f5xcctl tenant_management delete migrate <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_migrate" "example" {
  name      = "example-migrate"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
