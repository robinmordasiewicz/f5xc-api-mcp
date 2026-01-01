---
page_title: f5xc_notification - f5xc-api-mcp
subcategory: Tenant And Identity
description: GET ntfn preferences.
---

# Notification

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET ntfn preferences gets current notification preferences for user.
It combines information from
two sources:

- explicitly set notification preferences in user settings object

- default values
from uam config (for those notifications which not explicitly set)

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-notification-list` | GET ntfn preferences. |
| `f5xc-api-tenantandidentity-notification-update` | Update ntfn preferences. |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- notification

## Example Usage

Ask Claude to help you work with Notification resources:

### List Notifications

> "List all notifications in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create notification -n <namespace> -i notification.yaml

# Get
xcsh tenant_and_identity get notification <name> -n <namespace>

# List
xcsh tenant_and_identity list notification -n <namespace>

# Delete
xcsh tenant_and_identity delete notification <name> -n <namespace>
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
