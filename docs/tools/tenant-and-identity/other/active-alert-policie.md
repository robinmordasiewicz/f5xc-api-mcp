---
page_title: f5xc_active_alert_policie - f5xc-api-mcp
subcategory: Tenant And Identity
description: Set Active Alert Policies.
---

# Active Alert Policie

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

SetActiveAlertPolicies sets the active alert policies for the namespace
An emtpy list in the request
will clear the active alert policies for the namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-active-alert-policie-create` | Set Active Alert Policies. |
| `f5xc-api-tenantandidentity-active-alert-policie-list` | GET Active Alert Policies. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- active-alert-policie

## Example Usage

Ask Claude to help you work with Active Alert Policie resources:

### Create Active Alert Policie

> "Create a active-alert-policie named 'example' in the 'production' namespace"

### List Active Alert Policies

> "List all active-alert-policies in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/active_alert_policies" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/active_alert_policies/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/active_alert_policies" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @active_alert_policie.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/active_alert_policies/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
