---
page_title: f5xc_hourly_usage_detail - f5xc-api-mcp
subcategory: Billing And Usage
description: List hourly usage details.
---

# Hourly Usage Detail

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List the usage divided by hour. The usage is hourly aggregated, from the start of UTC hour
to the
end of UTC hour. It is used to see the detailed breakdown of the usage received from
ListUsageDetails.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-billingandusage-hourly-usage-detail-create` | List hourly usage details. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- hourly-usage-detail

## Example Usage

Ask Claude to help you work with Hourly Usage Detail resources:

### Create Hourly Usage Detail

> "Create a hourly-usage-detail named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl web hourly-usage-detail create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl web hourly-usage-detail create {name} --namespace {namespace}
```

Create hourly-usage-detail

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl billing_and_usage create hourly_usage_detail -n <namespace> -i hourly_usage_detail.yaml

# Get
f5xcctl billing_and_usage get hourly_usage_detail <name> -n <namespace>

# List
f5xcctl billing_and_usage list hourly_usage_detail -n <namespace>

# Delete
f5xcctl billing_and_usage delete hourly_usage_detail <name> -n <namespace>
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
