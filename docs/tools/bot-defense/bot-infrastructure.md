---
page_title: f5xc_bot_infrastructure - f5xc-api-mcp
subcategory: Bot Defense
description: Create Bot Infrastructure
---

# Bot Infrastructure

List the set of bot_infrastructure in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-bot-infrastructure-create` | Create Bot Infrastructure |
| `f5xc-api-core-bot-infrastructure-get` | Get Bot Infrastructure |
| `f5xc-api-core-bot-infrastructure-list` | List Bot Infrastructure |
| `f5xc-api-core-bot-infrastructure-update` | Replace Bot Infrastructure |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | namespace |
| `name` | name |
| `namespace` | namespace |
| `metadata.name` | name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
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
f5xcctl apply -f bot_infrastructure.yaml

# Get
f5xcctl get bot_infrastructure {name} -n {namespace}

# List
f5xcctl get bot_infrastructures -n {namespace}

# Delete
f5xcctl delete bot_infrastructure {name} -n {namespace}
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
