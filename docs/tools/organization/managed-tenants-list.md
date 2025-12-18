---
page_title: f5xc_managed_tenants_list - f5xc-api-mcp
subcategory: Organization
description: Get List of Managed Tenant
---

# Managed Tenants List

Get full list of managed tenants access details.
This response will contain full list of managed
tenant based on the configuration
and is not filtered by requesting user's group membership that
enable access.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-managed-tenants-list-list` | Get List of Managed Tenant |

## Parameters

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `page_limit` | The page_limit parameter |
| `page_start` | The page_start parameter |
| `search_keyword` | The search_keyword parameter |

## Example Usage

Ask Claude to help you work with Managed Tenants List resources:

### List Managed Tenants Lists

> "List all managed-tenants-lists in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f managed_tenants_list.yaml

# Get
f5xcctl get managed_tenants_list {name} -n {namespace}

# List
f5xcctl get managed_tenants_lists -n {namespace}

# Delete
f5xcctl delete managed_tenants_list {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_managed_tenants_list" "example" {
  name      = "example-managed-tenants-list"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
