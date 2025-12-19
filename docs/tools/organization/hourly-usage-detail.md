---
page_title: f5xc_hourly_usage_detail - f5xc-api-mcp
subcategory: Organization
description: List hourly usage details
---

# Hourly Usage Detail

List the usage divided by hour. The usage is hourly aggregated, from the start of utc hour
to the
end of utc hour. It is used to see the detailed breakdown of the usage received from
ListUsageDetails

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-hourly-usage-detail-create` | List hourly usage details |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Hourly Usage Detail resources:

### Create Hourly Usage Detail

> "Create a hourly-usage-detail named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create hourly_usage_detail -n <namespace> -i hourly_usage_detail.yaml

# Get
f5xcctl configuration get hourly_usage_detail -n <namespace> <name>

# List
f5xcctl configuration list hourly_usage_detail -n <namespace>

# Delete
f5xcctl configuration delete hourly_usage_detail -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_hourly_usage_detail" "example" {
  name      = "example-hourly-usage-detail"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
