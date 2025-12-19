---
page_title: f5xc_combined_notification - f5xc-api-mcp
subcategory: Organization
description: Get combined ntfn preferences
---

# Combined Notification

Get combined ntfn preferences gets user-ntfn-preferences and admin-ntfn-preferences and returns
combined result.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-combined-notification-list` | Get combined ntfn preferences |
| `f5xc-api-core-combined-notification-update` | Update combined ntfn preferences |

## Example Usage

Ask Claude to help you work with Combined Notification resources:

### List Combined Notifications

> "List all combined-notifications in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create combined_notification -n <namespace> -i combined_notification.yaml

# Get
f5xcctl configuration get combined_notification -n <namespace> <name>

# List
f5xcctl configuration list combined_notification -n <namespace>

# Delete
f5xcctl configuration delete combined_notification -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_combined_notification" "example" {
  name      = "example-combined-notification"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
