---
page_title: f5xc_expanded - f5xc-api-mcp
subcategory: Organization
description: Expanded Traffic Overview
---

# Expanded

Get expanded traffic overview

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-expanded-create` | Expanded Traffic Overview |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Expanded resources:

### Create Expanded

> "Create a expanded named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create expanded -n <namespace> -i expanded.yaml

# Get
f5xcctl configuration get expanded -n <namespace> <name>

# List
f5xcctl configuration list expanded -n <namespace>

# Delete
f5xcctl configuration delete expanded -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_expanded" "example" {
  name      = "example-expanded"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
