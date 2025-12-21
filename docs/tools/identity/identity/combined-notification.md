---
page_title: f5xc_combined_notification - f5xc-api-mcp
subcategory: Identity
description: GET combined ntfn preferences.
---

# Combined Notification

GET combined ntfn preferences gets user-ntfn-preferences and admin-ntfn-preferences and returns
combined result.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-combined-notification-list` | GET combined ntfn preferences. |
| `f5xc-api-identity-combined-notification-update` | Update combined ntfn preferences. |

## Example Usage

Ask Claude to help you work with Combined Notification resources:

### List Combined Notifications

> "List all combined-notifications in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl identity create combined_notification -n <namespace> -i combined_notification.yaml

# Get
f5xcctl identity get combined_notification <name> -n <namespace>

# List
f5xcctl identity list combined_notification -n <namespace>

# Delete
f5xcctl identity delete combined_notification <name> -n <namespace>
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
