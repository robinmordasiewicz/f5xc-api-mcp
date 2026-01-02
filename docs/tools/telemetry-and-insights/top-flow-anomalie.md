---
page_title: f5xc_top_flow_anomalie - f5xc-api-mcp
subcategory: Telemetry And Insights
description: Flow Anomaly detection.
---

# Top Flow Anomalie

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET flow anomaly records.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-telemetryandinsights-top-flow-anomalie-create` | Flow Anomaly detection. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- top-flow-anomalie

## Example Usage

Ask Claude to help you work with Top Flow Anomalie resources:

### Create Top Flow Anomalie

> "Create a top-flow-anomalie named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh telemetry_and_insights create top_flow_anomalie -n <namespace> -i top_flow_anomalie.yaml

# Get
xcsh telemetry_and_insights get top_flow_anomalie <name> -n <namespace>

# List
xcsh telemetry_and_insights list top_flow_anomalie -n <namespace>

# Delete
xcsh telemetry_and_insights delete top_flow_anomalie <name> -n <namespace>
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
