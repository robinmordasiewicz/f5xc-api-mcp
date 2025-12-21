---
page_title: f5xc_admin_notification - f5xc-api-mcp
subcategory: Identity
description: GET admin ntfn preferences.
---

# Admin Notification

GET admin ntfn preferences gets current admin notification preferences for user.
It combines
information from two sources:

- explicitly set admin notification preferences in user settings
object
- default values from uam config (for those notifications which not explicitly set)

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-admin-notification-list` | GET admin ntfn preferences. |
| `f5xc-api-identity-admin-notification-update` | Update admin ntfn preferences. |

## Example Usage

Ask Claude to help you work with Admin Notification resources:

### List Admin Notifications

> "List all admin-notifications in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl identity create admin_notification -n <namespace> -i admin_notification.yaml

# Get
f5xcctl identity get admin_notification <name> -n <namespace>

# List
f5xcctl identity list admin_notification -n <namespace>

# Delete
f5xcctl identity delete admin_notification <name> -n <namespace>
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
