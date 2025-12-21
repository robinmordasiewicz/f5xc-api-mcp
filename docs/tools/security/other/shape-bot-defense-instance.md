---
page_title: f5xc_shape_bot_defense_instance - f5xc-api-mcp
subcategory: Security
description: GET Virtual Host.
---

# Shape Bot Defense Instance

List the set of shape_bot_defense_instance in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-shape-bot-defense-instance-get` | GET Virtual Host. |
| `f5xc-api-security-shape-bot-defense-instance-list` | List Shape Bot Defense Instance. |

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

Ask Claude to help you work with Shape Bot Defense Instance resources:

### List Shape Bot Defense Instances

> "List all shape-bot-defense-instances in the 'production' namespace"

### Get Shape Bot Defense Instance Details

> "Get details of the shape-bot-defense-instance named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create shape_bot_defense_instance -n <namespace> -i shape_bot_defense_instance.yaml

# Get
f5xcctl security get shape_bot_defense_instance <name> -n <namespace>

# List
f5xcctl security list shape_bot_defense_instance -n <namespace>

# Delete
f5xcctl security delete shape_bot_defense_instance <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_shape_bot_defense_instance" "example" {
  name      = "example-shape-bot-defense-instance"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
