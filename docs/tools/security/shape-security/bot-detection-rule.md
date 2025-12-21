---
page_title: f5xc_bot_detection_rule - f5xc-api-mcp
subcategory: Security
description: Deploy Bot Detection Rules.
---

# Bot Detection Rule

List the set of bot_detection_rule in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-bot-detection-rule-create` | Deploy Bot Detection Rules. |
| `f5xc-api-security-bot-detection-rule-get` | GET Bot Detection Rule. |
| `f5xc-api-security-bot-detection-rule-list` | List Bot Detection Rule. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `name` | Name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Bot Detection Rule resources:

### Create Bot Detection Rule

> "Create a bot-detection-rule named 'example' in the 'production' namespace"

### List Bot Detection Rules

> "List all bot-detection-rules in the 'production' namespace"

### Get Bot Detection Rule Details

> "Get details of the bot-detection-rule named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create bot_detection_rule -n <namespace> -i bot_detection_rule.yaml

# Get
f5xcctl configuration get bot_detection_rule -n <namespace> <name>

# List
f5xcctl configuration list bot_detection_rule -n <namespace>

# Delete
f5xcctl configuration delete bot_detection_rule -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_bot_detection_rule" "example" {
  name      = "example-bot-detection-rule"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
