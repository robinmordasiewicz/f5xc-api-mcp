---
page_title: f5xc_bot_endpoint_policie - f5xc-api-mcp
subcategory: Shape
description: List All Bot Endpoint Policies And Versions.
---

# Bot Endpoint Policie

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET all bot endpoint policies and versions.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-bot-endpoint-policie-list` | List All Bot Endpoint Policies And Versions. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Example Usage

Ask Claude to help you work with Bot Endpoint Policie resources:

### List Bot Endpoint Policies

> "List all bot-endpoint-policies in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create bot_endpoint_policie -n <namespace> -i bot_endpoint_policie.yaml

# Get
xcsh shape get bot_endpoint_policie <name> -n <namespace>

# List
xcsh shape list bot_endpoint_policie -n <namespace>

# Delete
xcsh shape delete bot_endpoint_policie <name> -n <namespace>
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
