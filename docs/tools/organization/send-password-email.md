---
page_title: f5xc_send_password_email - f5xc-api-mcp
subcategory: Organization
description: Send Password Email
---

# Send Password Email

SendPasswordEmail enables resetting the password at the time of on-boarding new customer

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-send-password-email-create` | Send Password Email |

## Example Usage

Ask Claude to help you work with Send Password Email resources:

### Create Send Password Email

> "Create a send-password-email named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f send_password_email.yaml

# Get
f5xcctl get send_password_email {name} -n {namespace}

# List
f5xcctl get send_password_emails -n {namespace}

# Delete
f5xcctl delete send_password_email {name} -n {namespace}
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
