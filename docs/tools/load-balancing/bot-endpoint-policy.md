---
page_title: f5xc_bot_endpoint_policy - f5xc-api-mcp
subcategory: Load Balancing
description: Get Bot Endpoint Policy
---

# Bot Endpoint Policy

List the set of bot_endpoint_policy in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-bot-endpoint-policy-get` | Get Bot Endpoint Policy |
| `f5xc-api-core-bot-endpoint-policy-list` | List Bot Endpoint Policy |
| `f5xc-api-core-bot-endpoint-policy-update` | Custom Replace Bot Endpoint Policy |

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

Ask Claude to help you work with Bot Endpoint Policy resources:

### List Bot Endpoint Policys

> "List all bot-endpoint-policys in the 'production' namespace"

### Get Bot Endpoint Policy Details

> "Get details of the bot-endpoint-policy named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f bot_endpoint_policy.yaml

# Get
f5xcctl get bot_endpoint_policy {name} -n {namespace}

# List
f5xcctl get bot_endpoint_policys -n {namespace}

# Delete
f5xcctl delete bot_endpoint_policy {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_bot_endpoint_policy" "example" {
  name      = "example-bot-endpoint-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
