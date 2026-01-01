---
page_title: f5xc_shape_bot_defense_instance - f5xc-api-mcp
subcategory: Bot And Threat Defense
description: GET Virtual Host.
---

# Shape Bot Defense Instance

!!! info "Low Risk"
    Operations on this resource are generally safe.

List the set of shape_bot_defense_instance in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-botandthreatdefense-shape-bot-defense-instance-get` | GET Virtual Host. |
| `f5xc-api-botandthreatdefense-shape-bot-defense-instance-list` | List Shape Bot Defense Instance. |

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

Ask Claude to help you work with Shape Bot Defense Instance resources:

### List Shape Bot Defense Instances

> "List all shape-bot-defense-instances in the 'production' namespace"

### Get Shape Bot Defense Instance Details

> "Get details of the shape-bot-defense-instance named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh bot_and_threat_defense create shape_bot_defense_instance -n <namespace> -i shape_bot_defense_instance.yaml

# Get
xcsh bot_and_threat_defense get shape_bot_defense_instance <name> -n <namespace>

# List
xcsh bot_and_threat_defense list shape_bot_defense_instance -n <namespace>

# Delete
xcsh bot_and_threat_defense delete shape_bot_defense_instance <name> -n <namespace>
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
