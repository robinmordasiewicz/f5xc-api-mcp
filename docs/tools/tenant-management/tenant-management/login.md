---
page_title: f5xc_login - f5xc-api-mcp
subcategory: Tenant & Organization Management
description: GetLoginEvents.
---

# Login

GetLoginEvents returns login events for specified in config period of time. It consider all users
within current tenant.
Login events are extracted directly from IDM.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantmanagement-login-list` | GetLoginEvents. |

## Parameters

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `first` | Start offset. |
| `max` | Records per page. |

## Example Usage

Ask Claude to help you work with Login resources:

### List Logins

> "List all logins in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_management create login -n <namespace> -i login.yaml

# Get
f5xcctl tenant_management get login <name> -n <namespace>

# List
f5xcctl tenant_management list login -n <namespace>

# Delete
f5xcctl tenant_management delete login <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_login" "example" {
  name      = "example-login"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
