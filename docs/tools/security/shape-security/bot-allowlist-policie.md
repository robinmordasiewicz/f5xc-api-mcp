---
page_title: f5xc_bot_allowlist_policie - f5xc-api-mcp
subcategory: Security
description: List All Bot Allowlist Policies And Versions.
---

# Bot Allowlist Policie

GET all bot allowlist policies and versions.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-bot-allowlist-policie-list` | List All Bot Allowlist Policies And Versions. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Bot Allowlist Policie resources:

### List Bot Allowlist Policies

> "List all bot-allowlist-policies in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create bot_allowlist_policie -n <namespace> -i bot_allowlist_policie.yaml

# Get
f5xcctl security get bot_allowlist_policie <name> -n <namespace>

# List
f5xcctl security list bot_allowlist_policie -n <namespace>

# Delete
f5xcctl security delete bot_allowlist_policie <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_bot_allowlist_policie" "example" {
  name      = "example-bot-allowlist-policie"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
