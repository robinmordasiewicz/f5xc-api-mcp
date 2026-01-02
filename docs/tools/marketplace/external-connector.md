---
page_title: f5xc_external_connector - f5xc-api-mcp
subcategory: Marketplace
description: Create external_connector configuration.
---

# External Connector

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Shape of the external_connector configuration specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-marketplace-external-connector-create` | Create external_connector configuration. |
| `f5xc-api-marketplace-external-connector-get` | GET external_connector configuration. |
| `f5xc-api-marketplace-external-connector-list` | List External Connector Configuration. |
| `f5xc-api-marketplace-external-connector-update` | Replace external_connector configuration. |
| `f5xc-api-marketplace-external-connector-delete` | DELETE External Connector Configuration. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- external-connector

**Modifies:**

- external-connector

**Deletes:**

- external-connector
- contained_resources

## Example Usage

Ask Claude to help you work with External Connector resources:

### Create External Connector

> "Create a external-connector named 'example' in the 'production' namespace"

### List External Connectors

> "List all external-connectors in the 'production' namespace"

### Get External Connector Details

> "Get details of the external-connector named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh marketplace create external_connector -n <namespace> -i external_connector.yaml

# Get
xcsh marketplace get external_connector <name> -n <namespace>

# List
xcsh marketplace list external_connector -n <namespace>

# Delete
xcsh marketplace delete external_connector <name> -n <namespace>
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
