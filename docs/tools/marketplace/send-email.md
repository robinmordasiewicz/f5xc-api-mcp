---
page_title: f5xc_send_email - f5xc-api-mcp
subcategory: Marketplace
description: Send Signup Email.
---

# Send Email

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Use this API to send a tenant provisioning signup email when the signup URL link in the previously
sent email has expired or is no longer accessible.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-marketplace-send-email-create` | Send Signup Email. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- send-email

## Example Usage

Ask Claude to help you work with Send Email resources:

### Create Send Email

> "Create a send-email named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh marketplace create send_email -n <namespace> -i send_email.yaml

# Get
xcsh marketplace get send_email <name> -n <namespace>

# List
xcsh marketplace list send_email -n <namespace>

# Delete
xcsh marketplace delete send_email <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_send_email" "example" {
  name      = "example-send-email"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
