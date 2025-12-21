---
page_title: f5xc_external_connector - f5xc-api-mcp
subcategory: Networking
description: Create external_connector configuration.
---

# External Connector

Shape of the external_connector configuration specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-external-connector-create` | Create external_connector configuration. |
| `f5xc-api-networking-external-connector-get` | GET external_connector configuration. |
| `f5xc-api-networking-external-connector-list` | List External Connector Configuration. |
| `f5xc-api-networking-external-connector-update` | Replace external_connector configuration. |
| `f5xc-api-networking-external-connector-delete` | DELETE External Connector Configuration. |

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

Ask Claude to help you work with External Connector resources:

### Create External Connector

> "Create a external-connector named 'example' in the 'production' namespace"

### List External Connectors

> "List all external-connectors in the 'production' namespace"

### Get External Connector Details

> "Get details of the external-connector named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create external_connector -n <namespace> -i external_connector.yaml

# Get
f5xcctl configuration get external_connector -n <namespace> <name>

# List
f5xcctl configuration list external_connector -n <namespace>

# Delete
f5xcctl configuration delete external_connector -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_external_connector" "example" {
  name      = "example-external-connector"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
