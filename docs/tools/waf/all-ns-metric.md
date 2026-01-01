---
page_title: f5xc_all_ns_metric - f5xc-api-mcp
subcategory: WAF
description: MetricsAllNamespaces.
---

# All Ns Metric

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

App Firewall metrics.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waf-all-ns-metric-create` | MetricsAllNamespaces. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- all-ns-metric

## Example Usage

Ask Claude to help you work with All Ns Metric resources:

### Create All Ns Metric

> "Create a all-ns-metric named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh waf create all_ns_metric -n <namespace> -i all_ns_metric.yaml

# Get
xcsh waf get all_ns_metric <name> -n <namespace>

# List
xcsh waf list all_ns_metric -n <namespace>

# Delete
xcsh waf delete all_ns_metric <name> -n <namespace>
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
