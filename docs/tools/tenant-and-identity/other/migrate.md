---
page_title: f5xc_migrate - f5xc-api-mcp
subcategory: Tenant And Identity
description: Migrate CTM child tenants.
---

# Migrate

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Migrate ACTIVE child tenants from existing CTM to a specified new CTM.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-migrate-create` | Migrate CTM child tenants. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- migrate

## Example Usage

Ask Claude to help you work with Migrate resources:

### Create Migrate

> "Create a migrate named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create migrate -n <namespace> -i migrate.yaml

# Get
xcsh tenant_and_identity get migrate <name> -n <namespace>

# List
xcsh tenant_and_identity list migrate -n <namespace>

# Delete
xcsh tenant_and_identity delete migrate <name> -n <namespace>
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
