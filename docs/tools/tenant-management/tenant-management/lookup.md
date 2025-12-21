---
page_title: f5xc_lookup - f5xc-api-mcp
subcategory: Tenant & Organization Management
description: Lookup cname.
---

# Lookup

Checks if a cname is available.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantmanagement-lookup-list` | Lookup cname. |

## Parameters

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `cname` | Cname to look-uo. |
| `namespace` | Namespace to query. |

## Example Usage

Ask Claude to help you work with Lookup resources:

### List Lookups

> "List all lookups in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_management create lookup -n <namespace> -i lookup.yaml

# Get
f5xcctl tenant_management get lookup <name> -n <namespace>

# List
f5xcctl tenant_management list lookup -n <namespace>

# Delete
f5xcctl tenant_management delete lookup <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_lookup" "example" {
  name      = "example-lookup"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
