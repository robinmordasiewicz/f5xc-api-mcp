---
page_title: f5xc_bot_allowlist_policy - f5xc-api-mcp
subcategory: Organization
description: Get Bot allowlist Policy
---

# Bot Allowlist Policy

List the set of bot_allowlist_policy in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-bot-allowlist-policy-get` | Get Bot allowlist Policy |
| `f5xc-api-core-bot-allowlist-policy-list` | List Bot allowlist Policy |
| `f5xc-api-core-bot-allowlist-policy-update` | Custom Replace Bot allowlist Policy |

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

Ask Claude to help you work with Bot Allowlist Policy resources:

### List Bot Allowlist Policys

> "List all bot-allowlist-policys in the 'production' namespace"

### Get Bot Allowlist Policy Details

> "Get details of the bot-allowlist-policy named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f bot_allowlist_policy.yaml

# Get
f5xcctl get bot_allowlist_policy {name} -n {namespace}

# List
f5xcctl get bot_allowlist_policys -n {namespace}

# Delete
f5xcctl delete bot_allowlist_policy {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_bot_allowlist_policy" "example" {
  name      = "example-bot-allowlist-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
