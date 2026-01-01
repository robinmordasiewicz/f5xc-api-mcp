---
page_title: f5xc_bot_network_policie - f5xc-api-mcp
subcategory: Shape
description: List All Bot Network Policies And Versions.
---

# Bot Network Policie

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET all bot network policies and versions.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-bot-network-policie-list` | List All Bot Network Policies And Versions. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Example Usage

Ask Claude to help you work with Bot Network Policie resources:

### List Bot Network Policies

> "List all bot-network-policies in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create bot_network_policie -n <namespace> -i bot_network_policie.yaml

# Get
xcsh shape get bot_network_policie <name> -n <namespace>

# List
xcsh shape list bot_network_policie -n <namespace>

# Delete
xcsh shape delete bot_network_policie <name> -n <namespace>
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
