---
page_title: f5xc_country - f5xc-api-mcp
subcategory: Organization
description: Get Devices By Country
---

# Country

Get devices country information

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-country-create` | Get Devices By Country |

## Example Usage

Ask Claude to help you work with Country resources:

### Create Country

> "Create a country named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f country.yaml

# Get
f5xcctl get country {name} -n {namespace}

# List
f5xcctl get countrys -n {namespace}

# Delete
f5xcctl delete country {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_country" "example" {
  name      = "example-country"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
