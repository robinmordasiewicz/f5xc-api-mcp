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
f5xcctl apply -f bot_endpoint_policie.yaml

# Get
f5xcctl get bot_endpoint_policie {name} -n {namespace}

# List
f5xcctl get bot_endpoint_policies -n {namespace}

# Delete
f5xcctl delete bot_endpoint_policie {name} -n {namespace}
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
