---
page_title: f5xc_segment - f5xc-api-mcp
subcategory: Service Mesh
description: Create segment
---

# Segment

List the set of segment in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-segment-create` | Create segment |
| `f5xc-api-core-segment-get` | Get segment |
| `f5xc-api-core-segment-list` | List Segment |
| `f5xc-api-core-segment-update` | Replace segment |
| `f5xc-api-core-segment-delete` | Delete Segment |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | namespace |
| `name` | name |
| `namespace` | namespace |
| `metadata.name` | name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Segment resources:

### Create Segment

> "Create a segment named 'example' in the 'production' namespace"

### List Segments

> "List all segments in the 'production' namespace"

### Get Segment Details

> "Get details of the segment named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create segment -n <namespace> -i segment.yaml

# Get
f5xcctl configuration get segment -n <namespace> <name>

# List
f5xcctl configuration list segment -n <namespace>

# Delete
f5xcctl configuration delete segment -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_segment" "example" {
  name      = "example-segment"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
