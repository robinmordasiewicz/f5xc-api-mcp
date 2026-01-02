---
page_title: f5xc_reset - f5xc-api-mcp
subcategory: Tenant And Identity
description: Reset password.
---

# Reset

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Reset password resets password for user who is making this request.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-reset-create` | Reset password. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- reset

## Example Usage

Ask Claude to help you work with Reset resources:

### Create Reset

> "Create a reset named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create reset -n <namespace> -i reset.yaml

# Get
xcsh tenant_and_identity get reset <name> -n <namespace>

# List
xcsh tenant_and_identity list reset -n <namespace>

# Delete
xcsh tenant_and_identity delete reset <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_reset" "example" {
  name      = "example-reset"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
