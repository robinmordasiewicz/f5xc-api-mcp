---
page_title: f5xc_metric - f5xc-api-mcp
subcategory: Security
description: Metrics
---

# Metric

App Firewall metrics.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-metric-create` | Metrics |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Metric resources:

### Create Metric

> "Create a metric named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create metric -n <namespace> -i metric.yaml

# Get
f5xcctl configuration get metric -n <namespace> <name>

# List
f5xcctl configuration list metric -n <namespace>

# Delete
f5xcctl configuration delete metric -n <namespace> <name>
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
