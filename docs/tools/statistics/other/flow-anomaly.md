---
page_title: f5xc_flow_anomaly - f5xc-api-mcp
subcategory: Statistics
description: GET Flow Anomaly.
---

# Flow Anomaly

!!! info "Low Risk"
    Operations on this resource are generally safe.

List the set of flow_anomaly in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-flow-anomaly-get` | GET Flow Anomaly. |
| `f5xc-api-statistics-flow-anomaly-list` | List Flow Anomaly. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Example Usage

Ask Claude to help you work with Flow Anomaly resources:

### List Flow Anomalys

> "List all flow-anomalys in the 'production' namespace"

### Get Flow Anomaly Details

> "Get details of the flow-anomaly named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh statistics create flow_anomaly -n <namespace> -i flow_anomaly.yaml

# Get
xcsh statistics get flow_anomaly <name> -n <namespace>

# List
xcsh statistics list flow_anomaly -n <namespace>

# Delete
xcsh statistics delete flow_anomaly <name> -n <namespace>
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
