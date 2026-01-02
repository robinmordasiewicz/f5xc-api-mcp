---
page_title: f5xc_bot_infrastructure - f5xc-api-mcp
subcategory: Shape
description: Create Bot Infrastructure.
---

# Bot Infrastructure

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List the set of bot_infrastructure in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-bot-infrastructure-create` | Create Bot Infrastructure. |
| `f5xc-api-shape-bot-infrastructure-get` | GET Bot Infrastructure. |
| `f5xc-api-shape-bot-infrastructure-list` | List Bot Infrastructure. |
| `f5xc-api-shape-bot-infrastructure-update` | Replace Bot Infrastructure. |

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

- bot-infrastructure

**Modifies:**

- bot-infrastructure

## Example Usage

Ask Claude to help you work with Bot Infrastructure resources:

### Create Bot Infrastructure

> "Create a bot-infrastructure named 'example' in the 'production' namespace"

### List Bot Infrastructures

> "List all bot-infrastructures in the 'production' namespace"

### Get Bot Infrastructure Details

> "Get details of the bot-infrastructure named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create bot_infrastructure -n <namespace> -i bot_infrastructure.yaml

# Get
xcsh shape get bot_infrastructure <name> -n <namespace>

# List
xcsh shape list bot_infrastructure -n <namespace>

# Delete
xcsh shape delete bot_infrastructure <name> -n <namespace>
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
