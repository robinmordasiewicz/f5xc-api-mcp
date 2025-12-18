---
page_title: f5xc_bot_network_policy - f5xc-api-mcp
subcategory: Networking
description: Get Bot network Policy
---

# Bot Network Policy

List the set of bot_network_policy in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-bot-network-policy-get` | Get Bot network Policy |
| `f5xc-api-core-bot-network-policy-list` | List Bot network Policy |
| `f5xc-api-core-bot-network-policy-update` | Custom Replace Bot network Policy |

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

Ask Claude to help you work with Bot Network Policy resources:

### List Bot Network Policys

> "List all bot-network-policys in the 'production' namespace"

### Get Bot Network Policy Details

> "Get details of the bot-network-policy named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f bot_network_policy.yaml

# Get
f5xcctl get bot_network_policy {name} -n {namespace}

# List
f5xcctl get bot_network_policys -n {namespace}

# Delete
f5xcctl delete bot_network_policy {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_bot_network_policy" "example" {
  name      = "example-bot-network-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
