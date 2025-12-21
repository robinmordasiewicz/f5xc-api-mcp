---
page_title: f5xc_gettopriskyaccount - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: GetTopRiskyAccounts.
---

# Gettopriskyaccount

GET top risky accounts data request in a time range.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-gettopriskyaccount-create` | GetTopRiskyAccounts. |

## Example Usage

Ask Claude to help you work with Gettopriskyaccount resources:

### Create Gettopriskyaccount

> "Create a gettopriskyaccount named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape_security create gettopriskyaccount -n <namespace> -i gettopriskyaccount.yaml

# Get
f5xcctl shape_security get gettopriskyaccount <name> -n <namespace>

# List
f5xcctl shape_security list gettopriskyaccount -n <namespace>

# Delete
f5xcctl shape_security delete gettopriskyaccount <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_gettopriskyaccount" "example" {
  name      = "example-gettopriskyaccount"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
