---
page_title: f5xc_bot_allowlist_policy - f5xc-api-mcp
subcategory: Shape
description: GET Bot allowlist Policy.
---

# Bot Allowlist Policy

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List the set of bot_allowlist_policy in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-bot-allowlist-policy-get` | GET Bot allowlist Policy. |
| `f5xc-api-shape-bot-allowlist-policy-list` | List Bot allowlist Policy. |
| `f5xc-api-shape-bot-allowlist-policy-update` | Custom Replace Bot allowlist Policy. |

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

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- bot-allowlist-policy

## Example Usage

Ask Claude to help you work with Bot Allowlist Policy resources:

### List Bot Allowlist Policys

> "List all bot-allowlist-policys in the 'production' namespace"

### Get Bot Allowlist Policy Details

> "Get details of the bot-allowlist-policy named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create bot_allowlist_policy -n <namespace> -i bot_allowlist_policy.yaml

# Get
xcsh shape get bot_allowlist_policy <name> -n <namespace>

# List
xcsh shape list bot_allowlist_policy -n <namespace>

# Delete
xcsh shape delete bot_allowlist_policy <name> -n <namespace>
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
