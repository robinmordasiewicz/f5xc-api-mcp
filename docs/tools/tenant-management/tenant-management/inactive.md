---
page_title: f5xc_inactive - f5xc-api-mcp
subcategory: Tenant & Organization Management
description: ListInactiveUsers.
---

# Inactive

Returns list of users for which no login events was found for last 90 days of time.
It consider all
users within current tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantmanagement-inactive-list` | ListInactiveUsers. |

## Example Usage

Ask Claude to help you work with Inactive resources:

### List Inactives

> "List all inactives in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create inactive -n <namespace> -i inactive.yaml

# Get
f5xcctl configuration get inactive -n <namespace> <name>

# List
f5xcctl configuration list inactive -n <namespace>

# Delete
f5xcctl configuration delete inactive -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_inactive" "example" {
  name      = "example-inactive"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
