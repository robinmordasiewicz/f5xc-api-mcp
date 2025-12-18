---
page_title: f5xc_conversion - f5xc-api-mcp
subcategory: Organization
description: Conversion Dashboard
---

# Conversion

Get conversion chart data from shape recognize api

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-conversion-create` | Conversion Dashboard |

## Example Usage

Ask Claude to help you work with Conversion resources:

### Create Conversion

> "Create a conversion named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f conversion.yaml

# Get
f5xcctl get conversion {name} -n {namespace}

# List
f5xcctl get conversions -n {namespace}

# Delete
f5xcctl delete conversion {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_conversion" "example" {
  name      = "example-conversion"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
