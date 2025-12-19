---
page_title: f5xc_top_good_bot - f5xc-api-mcp
subcategory: Organization
description: Peer Group Top Good Bots
---

# Top Good Bot

Get Peer Group Top Good Bots

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-top-good-bot-create` | Peer Group Top Good Bots |

## Example Usage

Ask Claude to help you work with Top Good Bot resources:

### Create Top Good Bot

> "Create a top-good-bot named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create top_good_bot -n <namespace> -i top_good_bot.yaml

# Get
f5xcctl configuration get top_good_bot -n <namespace> <name>

# List
f5xcctl configuration list top_good_bot -n <namespace>

# Delete
f5xcctl configuration delete top_good_bot -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_top_good_bot" "example" {
  name      = "example-top-good-bot"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
