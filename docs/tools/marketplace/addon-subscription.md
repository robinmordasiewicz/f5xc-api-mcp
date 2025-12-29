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

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl web addon-subscription create {name} --namespace {namespace}
```

Create addon-subscription

### file_based

```bash
f5xcctl web addon-subscription create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl web addon-subscription delete {name} --namespace {namespace}
```

Delete addon-subscription

### get_specific

```bash
f5xcctl web addon-subscription get {name} --namespace {namespace}
```

Get specific addon-subscription

### list_all

```bash
f5xcctl web addon-subscription list --namespace {namespace}
```

List all addon-subscriptions

### update

```bash
f5xcctl web addon-subscription update {name} --namespace {namespace} -f {file}.yaml
```

Update addon-subscription

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl marketplace create addon_subscription -n <namespace> -i addon_subscription.yaml

# Get
f5xcctl marketplace get addon_subscription <name> -n <namespace>

# List
f5xcctl marketplace list addon_subscription -n <namespace>

# Delete
f5xcctl marketplace delete addon_subscription <name> -n <namespace>
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
