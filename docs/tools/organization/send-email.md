---
page_title: f5xc_send_email - f5xc-api-mcp
subcategory: Organization
description: Send Signup Email
---

# Send Email

Use this API to send a tenant provisioning signup email when the signup URL link in the previously
sent email has expired or is no longer accessible

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-send-email-create` | Send Signup Email |

## Example Usage

Ask Claude to help you work with Send Email resources:

### Create Send Email

> "Create a send-email named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f send_email.yaml

# Get
f5xcctl get send_email {name} -n {namespace}

# List
f5xcctl get send_emails -n {namespace}

# Delete
f5xcctl delete send_email {name} -n {namespace}
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
