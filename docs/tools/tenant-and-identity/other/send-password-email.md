---
page_title: f5xc_send_password_email - f5xc-api-mcp
subcategory: Tenant And Identity
description: Send Password Email.
---

# Send Password Email

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

SendPasswordEmail allows admin user to trigger send password email for a user to update user's
password.
Deprecated: use ResetPasswordByAdmin RPC instead.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-send-password-email-create` | Send Password Email. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- send-password-email

## Example Usage

Ask Claude to help you work with Send Password Email resources:

### Create Send Password Email

> "Create a send-password-email named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create send_password_email -n <namespace> -i send_password_email.yaml

# Get
xcsh tenant_and_identity get send_password_email <name> -n <namespace>

# List
xcsh tenant_and_identity list send_password_email -n <namespace>

# Delete
xcsh tenant_and_identity delete send_password_email <name> -n <namespace>
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
