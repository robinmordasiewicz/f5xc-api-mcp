---
page_title: f5xc_all_ns_metric - f5xc-api-mcp
subcategory: Monitoring
description: MetricsAllNamespaces
---

# All Ns Metric

App Firewall metrics

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waap-all-ns-metric-create` | MetricsAllNamespaces |

## Example Usage

Ask Claude to help you work with All Ns Metric resources:

### Create All Ns Metric

> "Create a all-ns-metric named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f all_ns_metric.yaml

# Get
f5xcctl get all_ns_metric {name} -n {namespace}

# List
f5xcctl get all_ns_metrics -n {namespace}

# Delete
f5xcctl delete all_ns_metric {name} -n {namespace}
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
