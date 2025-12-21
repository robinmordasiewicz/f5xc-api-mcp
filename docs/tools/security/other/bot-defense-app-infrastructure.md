---
page_title: f5xc_bot_defense_app_infrastructure - f5xc-api-mcp
subcategory: Security
description: Create Bot Defense App Infrastructure.
---

# Bot Defense App Infrastructure

Replace a given Bot Defense App Infrastructure in a given namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-bot-defense-app-infrastructure-create` | Create Bot Defense App Infrastructure. |
| `f5xc-api-security-bot-defense-app-infrastructure-get` | Bot Defense App Infrastructure. |
| `f5xc-api-security-bot-defense-app-infrastructure-list` | List Bot Defense App Infrastructure. |
| `f5xc-api-security-bot-defense-app-infrastructure-update` | Replace Bot Defense App Infrastructure. |
| `f5xc-api-security-bot-defense-app-infrastructure-delete` | DELETE Bot Defense App Infrastructure. |

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

Ask Claude to help you work with Bot Defense App Infrastructure resources:

### Create Bot Defense App Infrastructure

> "Create a bot-defense-app-infrastructure named 'example' in the 'production' namespace"

### List Bot Defense App Infrastructures

> "List all bot-defense-app-infrastructures in the 'production' namespace"

### Get Bot Defense App Infrastructure Details

> "Get details of the bot-defense-app-infrastructure named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create bot_defense_app_infrastructure -n <namespace> -i bot_defense_app_infrastructure.yaml

# Get
f5xcctl security get bot_defense_app_infrastructure <name> -n <namespace>

# List
f5xcctl security list bot_defense_app_infrastructure -n <namespace>

# Delete
f5xcctl security delete bot_defense_app_infrastructure <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_bot_defense_app_infrastructure" "example" {
  name      = "example-bot-defense-app-infrastructure"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
