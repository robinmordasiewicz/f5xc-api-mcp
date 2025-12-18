---
page_title: f5xc_gettopriskyaccount - f5xc-api-mcp
subcategory: Organization
description: GetTopRiskyAccounts
---

# Gettopriskyaccount

Get top risky accounts data request in a time range

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-gettopriskyaccount-create` | GetTopRiskyAccounts |

## Example Usage

Ask Claude to help you work with Gettopriskyaccount resources:

### Create Gettopriskyaccount

> "Create a gettopriskyaccount named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f gettopriskyaccount.yaml

# Get
f5xcctl get gettopriskyaccount {name} -n {namespace}

# List
f5xcctl get gettopriskyaccounts -n {namespace}

# Delete
f5xcctl delete gettopriskyaccount {name} -n {namespace}
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
