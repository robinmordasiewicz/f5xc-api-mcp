---
page_title: f5xc_admin_notification - f5xc-api-mcp
subcategory: Tenant And Identity
description: GET admin ntfn preferences.
---

# Admin Notification

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET admin ntfn preferences gets current admin notification preferences for user.
It combines
information from two sources:

- explicitly set admin notification preferences in user settings
object

- default values from uam config (for those notifications which not explicitly set)

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-admin-notification-list` | GET admin ntfn preferences. |
| `f5xc-api-tenantandidentity-admin-notification-update` | Update admin ntfn preferences. |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- admin-notification

## Example Usage

Ask Claude to help you work with Admin Notification resources:

### List Admin Notifications

> "List all admin-notifications in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/admin_notifications" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/admin_notifications/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/admin_notifications" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @admin_notification.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/admin_notifications/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
