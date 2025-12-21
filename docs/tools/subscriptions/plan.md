---
page_title: f5xc_plan - f5xc-api-mcp
subcategory: Subscriptions
description: GET Plan
---

# Plan

GET plan reads a given object from storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-subscriptions-plan-get` | GET Plan |
| `f5xc-api-subscriptions-plan-list` | List Plan |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Plan resources:

### List Plans

> "List all plans in the 'production' namespace"

### Get Plan Details

> "Get details of the plan named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl subscriptions create plan -n <namespace> -i plan.yaml

# Get
f5xcctl subscriptions get plan <name> -n <namespace>

# List
f5xcctl subscriptions list plan -n <namespace>

# Delete
f5xcctl subscriptions delete plan <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_plan" "example" {
  name      = "example-plan"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
