---
page_title: f5xc_soft_restart - f5xc-api-mcp
subcategory: Operations
description: Soft restart.
---

# Soft Restart

Soft restart reloads VER instance on the node.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-operations-soft-restart-create` | Soft restart. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `node` | Node Name |
| `service` | Service Name |
| `site` | Site Name |

## Example Usage

Ask Claude to help you work with Soft Restart resources:

### Create Soft Restart

> "Create a soft-restart named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create soft_restart -n <namespace> -i soft_restart.yaml

# Get
f5xcctl configuration get soft_restart -n <namespace> <name>

# List
f5xcctl configuration list soft_restart -n <namespace>

# Delete
f5xcctl configuration delete soft_restart -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_soft_restart" "example" {
  name      = "example-soft-restart"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
