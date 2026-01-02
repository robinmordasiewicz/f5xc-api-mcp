---
page_title: f5xc_segment_connection - f5xc-api-mcp
subcategory: Network Security
description: GET segment connector.
---

# Segment Connection

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List the set of segment_connection in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networksecurity-segment-connection-get` | GET segment connector. |
| `f5xc-api-networksecurity-segment-connection-list` | List Segment Connector. |
| `f5xc-api-networksecurity-segment-connection-update` | Replace segment connector. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |
| `metadata.namespace` | Namespace | `Staging` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- segment-connection

## Example Usage

Ask Claude to help you work with Segment Connection resources:

### List Segment Connections

> "List all segment-connections in the 'production' namespace"

### Get Segment Connection Details

> "Get details of the segment-connection named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh network_security create segment_connection -n <namespace> -i segment_connection.yaml

# Get
xcsh network_security get segment_connection <name> -n <namespace>

# List
xcsh network_security list segment_connection -n <namespace>

# Delete
xcsh network_security delete segment_connection <name> -n <namespace>
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
