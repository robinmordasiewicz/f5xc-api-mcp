---
page_title: f5xc_citie - f5xc-api-mcp
subcategory: Identity
description: List cities.
---

# Citie

Returns a list of known cities of a country/state.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-citie-list` | List cities. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `country_code` | Country code |
| `prefix` | Prefix |
| `state_code` | State code |

## Example Usage

Ask Claude to help you work with Citie resources:

### List Cities

> "List all cities in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl identity create citie -n <namespace> -i citie.yaml

# Get
f5xcctl identity get citie <name> -n <namespace>

# List
f5xcctl identity list citie -n <namespace>

# Delete
f5xcctl identity delete citie <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_citie" "example" {
  name      = "example-citie"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
