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
f5xcctl apply -f validate_config.yaml

# Get
f5xcctl get validate_config {name} -n {namespace}

# List
f5xcctl get validate_configs -n {namespace}

# Delete
f5xcctl delete validate_config {name} -n {namespace}
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
