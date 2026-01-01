---
page_title: f5xc_bot_allowlist_policie - f5xc-api-mcp
subcategory: Shape
description: List All Bot Allowlist Policies And Versions.
---

# Bot Allowlist Policie

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET all bot allowlist policies and versions.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-bot-allowlist-policie-list` | List All Bot Allowlist Policies And Versions. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Example Usage

Ask Claude to help you work with Bot Allowlist Policie resources:

### List Bot Allowlist Policies

> "List all bot-allowlist-policies in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create bot_allowlist_policie -n <namespace> -i bot_allowlist_policie.yaml

# Get
xcsh shape get bot_allowlist_policie <name> -n <namespace>

# List
xcsh shape list bot_allowlist_policie -n <namespace>

# Delete
xcsh shape delete bot_allowlist_policie <name> -n <namespace>
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
