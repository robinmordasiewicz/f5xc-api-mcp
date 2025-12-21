---
page_title: f5xc_reset - f5xc-api-mcp
subcategory: Identity
description: Reset password.
---

# Reset

Reset password resets password for user who is making this request.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-reset-create` | Reset password. |

## Example Usage

Ask Claude to help you work with Reset resources:

### Create Reset

> "Create a reset named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl identity create reset -n <namespace> -i reset.yaml

# Get
f5xcctl identity get reset <name> -n <namespace>

# List
f5xcctl identity list reset -n <namespace>

# Delete
f5xcctl identity delete reset <name> -n <namespace>
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
