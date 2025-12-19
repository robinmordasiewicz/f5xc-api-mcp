---
page_title: f5xc_notification - f5xc-api-mcp
subcategory: Organization
description: Get ntfn preferences
---

# Notification

Get ntfn preferences gets current notification preferences for user.
It combines information from
two sources:

- explicitly set notification preferences in user settings object
- default values from
uam config (for those notifications which not explicitly set)

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-notification-list` | Get ntfn preferences |
| `f5xc-api-core-notification-update` | Update ntfn preferences |

## Example Usage

Ask Claude to help you work with Notification resources:

### List Notifications

> "List all notifications in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create notification -n <namespace> -i notification.yaml

# Get
f5xcctl configuration get notification -n <namespace> <name>

# List
f5xcctl configuration list notification -n <namespace>

# Delete
f5xcctl configuration delete notification -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_notification" "example" {
  name      = "example-notification"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
