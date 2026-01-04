---
page_title: f5xc_addon_subscription - f5xc-api-mcp
subcategory: Marketplace
description: Create Addon Subscription.
---

# Addon Subscription

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

GET Addon Subsciption reads a given object from storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-marketplace-addon-subscription-create` | Create Addon Subscription. |
| `f5xc-api-marketplace-addon-subscription-get` | GET Addon Subsciption. |
| `f5xc-api-marketplace-addon-subscription-list` | List Addon Subscrption. |
| `f5xc-api-marketplace-addon-subscription-update` | Replace Addon Subscription. |
| `f5xc-api-marketplace-addon-subscription-delete` | DELETE Addon Subscrption. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- addon-subscription

**Modifies:**

- addon-subscription

**Deletes:**

- addon-subscription
- contained_resources

## Example Usage

Ask Claude to help you work with Addon Subscription resources:

### Create Addon Subscription

> "Create a addon-subscription named 'example' in the 'production' namespace"

### List Addon Subscriptions

> "List all addon-subscriptions in the 'production' namespace"

### Get Addon Subscription Details

> "Get details of the addon-subscription named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/addon_subscriptions" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/addon_subscriptions/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/addon_subscriptions" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @addon_subscription.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/addon_subscriptions/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
