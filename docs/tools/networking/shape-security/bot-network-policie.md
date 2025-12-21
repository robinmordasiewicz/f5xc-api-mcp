---
page_title: f5xc_bot_network_policie - f5xc-api-mcp
subcategory: Networking
description: List All Bot Network Policies And Versions.
---

# Bot Network Policie

GET all bot network policies and versions.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-bot-network-policie-list` | List All Bot Network Policies And Versions. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Bot Network Policie resources:

### List Bot Network Policies

> "List all bot-network-policies in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create bot_network_policie -n <namespace> -i bot_network_policie.yaml

# Get
f5xcctl configuration get bot_network_policie -n <namespace> <name>

# List
f5xcctl configuration list bot_network_policie -n <namespace>

# Delete
f5xcctl configuration delete bot_network_policie -n <namespace> <name>
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
