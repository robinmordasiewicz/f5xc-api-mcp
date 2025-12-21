---
page_title: f5xc_addon_subscription - f5xc-api-mcp
subcategory: Subscriptions
description: Create Addon Subscription.
---

# Addon Subscription

GET Addon Subsciption reads a given object from storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-subscriptions-addon-subscription-create` | Create Addon Subscription. |
| `f5xc-api-subscriptions-addon-subscription-get` | GET Addon Subsciption. |
| `f5xc-api-subscriptions-addon-subscription-list` | List Addon Subscrption. |
| `f5xc-api-subscriptions-addon-subscription-update` | Replace Addon Subscription. |
| `f5xc-api-subscriptions-addon-subscription-delete` | DELETE Addon Subscrption. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | Namespace |
| `name` | Name |
| `namespace` | Namespace |
| `metadata.name` | Name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Addon Subscription resources:

### Create Addon Subscription

> "Create a addon-subscription named 'example' in the 'production' namespace"

### List Addon Subscriptions

> "List all addon-subscriptions in the 'production' namespace"

### Get Addon Subscription Details

> "Get details of the addon-subscription named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create addon_subscription -n <namespace> -i addon_subscription.yaml

# Get
f5xcctl configuration get addon_subscription -n <namespace> <name>

# List
f5xcctl configuration list addon_subscription -n <namespace>

# Delete
f5xcctl configuration delete addon_subscription -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_addon_subscription" "example" {
  name      = "example-addon-subscription"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
