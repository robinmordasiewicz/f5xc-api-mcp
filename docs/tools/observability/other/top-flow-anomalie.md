---
page_title: f5xc_top_flow_anomalie - f5xc-api-mcp
subcategory: Observability
description: Flow Anomaly detection.
---

# Top Flow Anomalie

Request to GET flow anomaly records.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-top-flow-anomalie-create` | Flow Anomaly detection. |

## Example Usage

Ask Claude to help you work with Top Flow Anomalie resources:

### Create Top Flow Anomalie

> "Create a top-flow-anomalie named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create top_flow_anomalie -n <namespace> -i top_flow_anomalie.yaml

# Get
f5xcctl configuration get top_flow_anomalie -n <namespace> <name>

# List
f5xcctl configuration list top_flow_anomalie -n <namespace>

# Delete
f5xcctl configuration delete top_flow_anomalie -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_top_flow_anomalie" "example" {
  name      = "example-top-flow-anomalie"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
