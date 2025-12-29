---
page_title: f5xc_subscription_statu - f5xc-api-mcp
subcategory: Telemetry And Insights
description: Check subscription status for Flow Collection.
---

# Subscription Statu

!!! info "Low Risk"
    Operations on this resource are generally safe.

Check subscription status flow Flow Collection.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-telemetryandinsights-subscription-statu-list` | Check subscription status for Flow Collection. |

## Example Usage

Ask Claude to help you work with Subscription Statu resources:

### List Subscription Status

> "List all subscription-status in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl config subscription-statu list --namespace {namespace}
```

List all subscription-status

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl telemetry_and_insights create subscription_statu -n <namespace> -i subscription_statu.yaml

# Get
f5xcctl telemetry_and_insights get subscription_statu <name> -n <namespace>

# List
f5xcctl telemetry_and_insights list subscription_statu -n <namespace>

# Delete
f5xcctl telemetry_and_insights delete subscription_statu <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_subscription_statu" "example" {
  name      = "example-subscription-statu"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
