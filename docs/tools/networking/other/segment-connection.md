---
page_title: f5xc_segment_connection - f5xc-api-mcp
subcategory: Networking
description: GET segment connector.
---

# Segment Connection

List the set of segment_connection in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-segment-connection-get` | GET segment connector. |
| `f5xc-api-networking-segment-connection-list` | List Segment Connector. |
| `f5xc-api-networking-segment-connection-update` | Replace segment connector. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |
| `metadata.name` | Name |
| `metadata.namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Segment Connection resources:

### List Segment Connections

> "List all segment-connections in the 'production' namespace"

### Get Segment Connection Details

> "Get details of the segment-connection named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl networking create segment_connection -n <namespace> -i segment_connection.yaml

# Get
f5xcctl networking get segment_connection <name> -n <namespace>

# List
f5xcctl networking list segment_connection -n <namespace>

# Delete
f5xcctl networking delete segment_connection <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_segment_connection" "example" {
  name      = "example-segment-connection"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
