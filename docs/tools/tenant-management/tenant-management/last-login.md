---
page_title: f5xc_last_login - f5xc-api-mcp
subcategory: Tenant & Organization Management
description: GetLastLoginMap.
---

# Last Login

GetLastLoginMap returns last login timestamp for each user within a tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantmanagement-last-login-list` | GetLastLoginMap. |

## Example Usage

Ask Claude to help you work with Last Login resources:

### List Last Logins

> "List all last-logins in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_management create last_login -n <namespace> -i last_login.yaml

# Get
f5xcctl tenant_management get last_login <name> -n <namespace>

# List
f5xcctl tenant_management list last_login -n <namespace>

# Delete
f5xcctl tenant_management delete last_login <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_last_login" "example" {
  name      = "example-last-login"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
