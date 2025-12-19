---
page_title: f5xc_bot_network_policie - f5xc-api-mcp
subcategory: Bot Defense
description: List All Bot Network Policies And Versions
---

# Bot Network Policie

Get all bot network policies and versions

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-bot-network-policie-list` | List All Bot Network Policies And Versions |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Bot Network Policie resources:

### List Bot Network Policies

> "List all bot-network-policies in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f bot_network_policie.yaml

# Get
f5xcctl get bot_network_policie {name} -n {namespace}

# List
f5xcctl get bot_network_policies -n {namespace}

# Delete
f5xcctl delete bot_network_policie {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_bot_network_policie" "example" {
  name      = "example-bot-network-policie"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
