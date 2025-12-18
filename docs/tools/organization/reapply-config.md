---
page_title: f5xc_reapply_config - f5xc-api-mcp
subcategory: Organization
description: "CloudLink "
---

# Reapply Config

Reapply CloudLink Config

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-reapply-config-create` | CloudLink  |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |

## Example Usage

Ask Claude to help you work with Reapply Config resources:

### Create Reapply Config

> "Create a reapply-config named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f reapply_config.yaml

# Get
f5xcctl get reapply_config {name} -n {namespace}

# List
f5xcctl get reapply_configs -n {namespace}

# Delete
f5xcctl delete reapply_config {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_reapply_config" "example" {
  name      = "example-reapply-config"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
