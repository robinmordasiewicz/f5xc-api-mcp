---
page_title: f5xc_last_login - f5xc-api-mcp
subcategory: Organization
description: GetLastLoginMap
---

# Last Login

GetLastLoginMap returns last login timestamp for each user within a tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-last-login-list` | GetLastLoginMap |

## Example Usage

Ask Claude to help you work with Last Login resources:

### List Last Logins

> "List all last-logins in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create last_login -n <namespace> -i last_login.yaml

# Get
f5xcctl configuration get last_login -n <namespace> <name>

# List
f5xcctl configuration list last_login -n <namespace>

# Delete
f5xcctl configuration delete last_login -n <namespace> <name>
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
