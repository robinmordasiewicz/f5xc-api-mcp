---
page_title: f5xc_metric - f5xc-api-mcp
subcategory: DNS
description: DNS Zone Metrics.
---

# Metric

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET DNS zone metrics data.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-metric-create` | DNS Zone Metrics. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- metric

## Example Usage

Ask Claude to help you work with Metric resources:

### Create Metric

> "Create a metric named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh dns create metric -n <namespace> -i metric.yaml

# Get
xcsh dns get metric <name> -n <namespace>

# List
xcsh dns list metric -n <namespace>

# Delete
xcsh dns delete metric <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_metric" "example" {
  name      = "example-metric"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
