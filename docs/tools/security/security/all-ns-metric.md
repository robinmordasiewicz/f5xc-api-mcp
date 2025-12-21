---
page_title: f5xc_all_ns_metric - f5xc-api-mcp
subcategory: Security
description: MetricsAllNamespaces.
---

# All Ns Metric

App Firewall metrics.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-all-ns-metric-create` | MetricsAllNamespaces. |

## Example Usage

Ask Claude to help you work with All Ns Metric resources:

### Create All Ns Metric

> "Create a all-ns-metric named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create all_ns_metric -n <namespace> -i all_ns_metric.yaml

# Get
f5xcctl configuration get all_ns_metric -n <namespace> <name>

# List
f5xcctl configuration list all_ns_metric -n <namespace>

# Delete
f5xcctl configuration delete all_ns_metric -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_all_ns_metric" "example" {
  name      = "example-all-ns-metric"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
