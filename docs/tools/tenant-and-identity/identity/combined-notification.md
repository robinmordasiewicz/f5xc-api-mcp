---
page_title: f5xc_combined_notification - f5xc-api-mcp
subcategory: Tenant And Identity
description: GET combined ntfn preferences.
---

# Combined Notification

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET combined ntfn preferences gets user-ntfn-preferences and admin-ntfn-preferences and returns
combined result.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-combined-notification-list` | GET combined ntfn preferences. |
| `f5xc-api-tenantandidentity-combined-notification-update` | Update combined ntfn preferences. |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- combined-notification

## Example Usage

Ask Claude to help you work with Combined Notification resources:

### List Combined Notifications

> "List all combined-notifications in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create combined_notification -n <namespace> -i combined_notification.yaml

# Get
xcsh tenant_and_identity get combined_notification <name> -n <namespace>

# List
xcsh tenant_and_identity list combined_notification -n <namespace>

# Delete
xcsh tenant_and_identity delete combined_notification <name> -n <namespace>
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
