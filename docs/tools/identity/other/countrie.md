---
page_title: f5xc_countrie - f5xc-api-mcp
subcategory: Identity
description: List countries.
---

# Countrie

Returns a list of supported countries along with with additional information such as address
validation rules.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-countrie-list` | List countries. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `prefix` | Prefix |

## Example Usage

Ask Claude to help you work with Countrie resources:

### List Countries

> "List all countries in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl identity create countrie -n <namespace> -i countrie.yaml

# Get
f5xcctl identity get countrie <name> -n <namespace>

# List
f5xcctl identity list countrie -n <namespace>

# Delete
f5xcctl identity delete countrie <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_countrie" "example" {
  name      = "example-countrie"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
