---
page_title: f5xc_flow_anomaly - f5xc-api-mcp
subcategory: Observability
description: GET Flow Anomaly.
---

# Flow Anomaly

List the set of flow_anomaly in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-flow-anomaly-get` | GET Flow Anomaly. |
| `f5xc-api-observability-flow-anomaly-list` | List Flow Anomaly. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Flow Anomaly resources:

### List Flow Anomalys

> "List all flow-anomalys in the 'production' namespace"

### Get Flow Anomaly Details

> "Get details of the flow-anomaly named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create flow_anomaly -n <namespace> -i flow_anomaly.yaml

# Get
f5xcctl observability get flow_anomaly <name> -n <namespace>

# List
f5xcctl observability list flow_anomaly -n <namespace>

# Delete
f5xcctl observability delete flow_anomaly <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_flow_anomaly" "example" {
  name      = "example-flow-anomaly"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
