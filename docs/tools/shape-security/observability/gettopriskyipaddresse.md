---
page_title: f5xc_gettopriskyipaddresse - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: GetTopRiskyIpAddresses.
---

# Gettopriskyipaddresse

GET top risky IP addresses data request in a time range.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-gettopriskyipaddresse-create` | GetTopRiskyIpAddresses. |

## Example Usage

Ask Claude to help you work with Gettopriskyipaddresse resources:

### Create Gettopriskyipaddresse

> "Create a gettopriskyipaddresse named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create gettopriskyipaddresse -n <namespace> -i gettopriskyipaddresse.yaml

# Get
f5xcctl configuration get gettopriskyipaddresse -n <namespace> <name>

# List
f5xcctl configuration list gettopriskyipaddresse -n <namespace>

# Delete
f5xcctl configuration delete gettopriskyipaddresse -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_gettopriskyipaddresse" "example" {
  name      = "example-gettopriskyipaddresse"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
