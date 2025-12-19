---
page_title: f5xc_migrate - f5xc-api-mcp
subcategory: Organization
description: Migrate Child Tenants
---

# Migrate

Migrate ACTIVE child tenants from existing CTM(s) to a specified new CTM

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-migrate-create` | Migrate Child Tenants |

## Example Usage

Ask Claude to help you work with Migrate resources:

### Create Migrate

> "Create a migrate named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create migrate -n <namespace> -i migrate.yaml

# Get
f5xcctl configuration get migrate -n <namespace> <name>

# List
f5xcctl configuration list migrate -n <namespace>

# Delete
f5xcctl configuration delete migrate -n <namespace> <name>
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
