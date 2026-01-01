---
page_title: f5xc_config - f5xc-api-mcp
subcategory: Support
description: Update LTE configuration.
---

# Config

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Update LTE configuration on the node.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-config-create` | Update LTE configuration. |
| `f5xc-api-support-config-list` | GET LTE configuration. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `node` | Node Name | `Master-0` |
| `site` | Site Name | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- config

## Example Usage

Ask Claude to help you work with Config resources:

### Create Config

> "Create a config named 'example' in the 'production' namespace"

### List Configs

> "List all configs in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh support create config -n <namespace> -i config.yaml

# Get
xcsh support get config <name> -n <namespace>

# List
xcsh support list config -n <namespace>

# Delete
xcsh support delete config <name> -n <namespace>
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
