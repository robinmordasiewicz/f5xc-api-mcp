---
page_title: f5xc_inactive - f5xc-api-mcp
subcategory: Organization
description: ListInactiveUsers
---

# Inactive

Returns list of users for which no login events was found for last 90 days of time.
It consider all
users within current tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-inactive-list` | ListInactiveUsers |

## Example Usage

Ask Claude to help you work with Inactive resources:

### List Inactives

> "List all inactives in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f inactive.yaml

# Get
f5xcctl get inactive {name} -n {namespace}

# List
f5xcctl get inactives -n {namespace}

# Delete
f5xcctl delete inactive {name} -n {namespace}
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
