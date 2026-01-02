---
page_title: f5xc_last_login - f5xc-api-mcp
subcategory: Tenant And Identity
description: GetLastLoginMap.
---

# Last Login

!!! info "Low Risk"
    Operations on this resource are generally safe.

GetLastLoginMap returns last login timestamp for each user within a tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-last-login-list` | GetLastLoginMap. |

## Example Usage

Ask Claude to help you work with Last Login resources:

### List Last Logins

> "List all last-logins in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create last_login -n <namespace> -i last_login.yaml

# Get
xcsh tenant_and_identity get last_login <name> -n <namespace>

# List
xcsh tenant_and_identity list last_login -n <namespace>

# Delete
xcsh tenant_and_identity delete last_login <name> -n <namespace>
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
