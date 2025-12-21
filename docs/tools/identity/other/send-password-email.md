---
page_title: f5xc_send_password_email - f5xc-api-mcp
subcategory: Identity
description: Send Password Email.
---

# Send Password Email

SendPasswordEmail allows admin user to trigger send password email for a user to update user's
password.
Deprecated: use ResetPasswordByAdmin RPC instead.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-send-password-email-create` | Send Password Email. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Send Password Email resources:

### Create Send Password Email

> "Create a send-password-email named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create send_password_email -n <namespace> -i send_password_email.yaml

# Get
f5xcctl configuration get send_password_email -n <namespace> <name>

# List
f5xcctl configuration list send_password_email -n <namespace>

# Delete
f5xcctl configuration delete send_password_email -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_send_password_email" "example" {
  name      = "example-send-password-email"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
