---
page_title: f5xc_bot_infrastructure - f5xc-api-mcp
subcategory: Security
description: Create Bot Infrastructure.
---

# Bot Infrastructure

List the set of bot_infrastructure in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-bot-infrastructure-create` | Create Bot Infrastructure. |
| `f5xc-api-security-bot-infrastructure-get` | GET Bot Infrastructure. |
| `f5xc-api-security-bot-infrastructure-list` | List Bot Infrastructure. |
| `f5xc-api-security-bot-infrastructure-update` | Replace Bot Infrastructure. |

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

Ask Claude to help you work with Bot Infrastructure resources:

### Create Bot Infrastructure

> "Create a bot-infrastructure named 'example' in the 'production' namespace"

### List Bot Infrastructures

> "List all bot-infrastructures in the 'production' namespace"

### Get Bot Infrastructure Details

> "Get details of the bot-infrastructure named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create bot_infrastructure -n <namespace> -i bot_infrastructure.yaml

# Get
f5xcctl security get bot_infrastructure <name> -n <namespace>

# List
f5xcctl security list bot_infrastructure -n <namespace>

# Delete
f5xcctl security delete bot_infrastructure <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_bot_infrastructure" "example" {
  name      = "example-bot-infrastructure"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
