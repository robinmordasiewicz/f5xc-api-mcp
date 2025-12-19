---
page_title: f5xc_shape_bot_defense_instance - f5xc-api-mcp
subcategory: Bot Defense
description: Get Virtual Host
---

# Shape Bot Defense Instance

List the set of shape_bot_defense_instance in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-shape-bot-defense-instance-get` | Get Virtual Host |
| `f5xc-api-core-shape-bot-defense-instance-list` | List Shape Bot Defense Instance |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | name |
| `namespace` | namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
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
f5xcctl configuration create shape_bot_defense_instance -n <namespace> -i shape_bot_defense_instance.yaml

# Get
f5xcctl configuration get shape_bot_defense_instance -n <namespace> <name>

# List
f5xcctl configuration list shape_bot_defense_instance -n <namespace>

# Delete
f5xcctl configuration delete shape_bot_defense_instance -n <namespace> <name>
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
