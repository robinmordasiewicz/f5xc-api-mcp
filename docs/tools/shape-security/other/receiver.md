---
page_title: f5xc_receiver - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: Create Data Delivery.
---

# Receiver

Replaces the content of an Data Delivery object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-receiver-create` | Create Data Delivery. |
| `f5xc-api-shapesecurity-receiver-get` | GET Data Delivery. |
| `f5xc-api-shapesecurity-receiver-list` | List Data Delivery. |
| `f5xc-api-shapesecurity-receiver-update` | Replace Data Delivery. |
| `f5xc-api-shapesecurity-receiver-delete` | DELETE Data Delivery. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | Namespace |
| `name` | Name |
| `namespace` | Namespace |
| `metadata.name` | Name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Receiver resources:

### Create Receiver

> "Create a receiver named 'example' in the 'production' namespace"

### List Receivers

> "List all receivers in the 'production' namespace"

### Get Receiver Details

> "Get details of the receiver named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape_security create receiver -n <namespace> -i receiver.yaml

# Get
f5xcctl shape_security get receiver <name> -n <namespace>

# List
f5xcctl shape_security list receiver -n <namespace>

# Delete
f5xcctl shape_security delete receiver <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_receiver" "example" {
  name      = "example-receiver"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
