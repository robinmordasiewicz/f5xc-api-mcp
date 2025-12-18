---
page_title: f5xc_addon_subscription - f5xc-api-mcp
subcategory: Subscriptions
description: Create Addon Subscription
---

# Addon Subscription

Get Addon Subsciption reads a given object from storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-addon-subscription-create` | Create Addon Subscription |
| `f5xc-api-core-addon-subscription-get` | Get Addon Subsciption |
| `f5xc-api-core-addon-subscription-list` | List Addon Subscrption |
| `f5xc-api-core-addon-subscription-update` | Replace Addon Subscription |
| `f5xc-api-core-addon-subscription-delete` | Delete Addon Subscrption |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | namespace |
| `name` | name |
| `namespace` | namespace |
| `metadata.name` | name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
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
f5xcctl apply -f addon_subscription.yaml

# Get
f5xcctl get addon_subscription {name} -n {namespace}

# List
f5xcctl get addon_subscriptions -n {namespace}

# Delete
f5xcctl delete addon_subscription {name} -n {namespace}
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
