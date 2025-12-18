---
page_title: f5xc_top_flow_anomalie - f5xc-api-mcp
subcategory: Organization
description: Flow Anomaly detection
---

# Top Flow Anomalie

Request to get flow anomaly records

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-top-flow-anomalie-create` | Flow Anomaly detection |

## Example Usage

Ask Claude to help you work with Top Flow Anomalie resources:

### Create Top Flow Anomalie

> "Create a top-flow-anomalie named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f top_flow_anomalie.yaml

# Get
f5xcctl get top_flow_anomalie {name} -n {namespace}

# List
f5xcctl get top_flow_anomalies -n {namespace}

# Delete
f5xcctl delete top_flow_anomalie {name} -n {namespace}
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
