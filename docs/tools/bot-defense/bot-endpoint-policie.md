---
page_title: f5xc_bot_endpoint_policie - f5xc-api-mcp
subcategory: Bot Defense
description: List All Bot Endpoint Policies And Versions
---

# Bot Endpoint Policie

Get all bot endpoint policies and versions

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-bot-endpoint-policie-list` | List All Bot Endpoint Policies And Versions |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Bot Endpoint Policie resources:

### List Bot Endpoint Policies

> "List all bot-endpoint-policies in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create bot_endpoint_policie -n <namespace> -i bot_endpoint_policie.yaml

# Get
f5xcctl configuration get bot_endpoint_policie -n <namespace> <name>

# List
f5xcctl configuration list bot_endpoint_policie -n <namespace>

# Delete
f5xcctl configuration delete bot_endpoint_policie -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_bot_endpoint_policie" "example" {
  name      = "example-bot-endpoint-policie"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
