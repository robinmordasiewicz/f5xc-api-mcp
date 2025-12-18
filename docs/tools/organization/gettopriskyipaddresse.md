---
page_title: f5xc_gettopriskyipaddresse - f5xc-api-mcp
subcategory: Organization
description: GetTopRiskyIpAddresses
---

# Gettopriskyipaddresse

Get top risky ip addresses data request in a time range

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-gettopriskyipaddresse-create` | GetTopRiskyIpAddresses |

## Example Usage

Ask Claude to help you work with Gettopriskyipaddresse resources:

### Create Gettopriskyipaddresse

> "Create a gettopriskyipaddresse named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f gettopriskyipaddresse.yaml

# Get
f5xcctl get gettopriskyipaddresse {name} -n {namespace}

# List
f5xcctl get gettopriskyipaddresses -n {namespace}

# Delete
f5xcctl delete gettopriskyipaddresse {name} -n {namespace}
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
