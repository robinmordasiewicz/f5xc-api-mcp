---
page_title: f5xc_admin_notification - f5xc-api-mcp
subcategory: Organization
description: Get admin ntfn preferences
---

# Admin Notification

Get admin ntfn preferences gets current admin notification preferences for user.
It combines
information from two sources:

- explicitly set admin notification preferences in user settings
object
- default values from uam config (for those notifications which not explicitly set)

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-admin-notification-list` | Get admin ntfn preferences |
| `f5xc-api-core-admin-notification-update` | Update admin ntfn preferences |

## Example Usage

Ask Claude to help you work with Admin Notification resources:

### List Admin Notifications

> "List all admin-notifications in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create admin_notification -n <namespace> -i admin_notification.yaml

# Get
f5xcctl configuration get admin_notification -n <namespace> <name>

# List
f5xcctl configuration list admin_notification -n <namespace>

# Delete
f5xcctl configuration delete admin_notification -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_admin_notification" "example" {
  name      = "example-admin-notification"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
