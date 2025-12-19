---
page_title: f5xc_gettopriskyreason - f5xc-api-mcp
subcategory: Organization
description: GetTopRiskyReasons
---

# Gettopriskyreason

Get top risky reasons data request for a time range

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-gettopriskyreason-create` | GetTopRiskyReasons |

## Example Usage

Ask Claude to help you work with Gettopriskyreason resources:

### Create Gettopriskyreason

> "Create a gettopriskyreason named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create gettopriskyreason -n <namespace> -i gettopriskyreason.yaml

# Get
f5xcctl configuration get gettopriskyreason -n <namespace> <name>

# List
f5xcctl configuration list gettopriskyreason -n <namespace>

# Delete
f5xcctl configuration delete gettopriskyreason -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_gettopriskyreason" "example" {
  name      = "example-gettopriskyreason"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
