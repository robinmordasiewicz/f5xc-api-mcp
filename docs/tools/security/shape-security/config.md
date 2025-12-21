---
page_title: f5xc_config - f5xc-api-mcp
subcategory: Security
description: Connector Configuration.
---

# Config

GET Connector config.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-config-get` | Connector Configuration. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Application Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Config resources:

### Get Config Details

> "Get details of the config named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create config -n <namespace> -i config.yaml

# Get
f5xcctl configuration get config -n <namespace> <name>

# List
f5xcctl configuration list config -n <namespace>

# Delete
f5xcctl configuration delete config -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_config" "example" {
  name      = "example-config"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
