---
page_title: f5xc_validate_config - f5xc-api-mcp
subcategory: Sites
description: Validate AWS VPC Site Config
---

# Validate Config

Validate AWS VPC Site Config

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-site-validate-config-create` | Validate AWS VPC Site Config |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Validate Config resources:

### Create Validate Config

> "Create a validate-config named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create validate_config -n <namespace> -i validate_config.yaml

# Get
f5xcctl configuration get validate_config -n <namespace> <name>

# List
f5xcctl configuration list validate_config -n <namespace>

# Delete
f5xcctl configuration delete validate_config -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_validate_config" "example" {
  name      = "example-validate-config"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
