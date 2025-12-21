---
page_title: f5xc_disconnect - f5xc-api-mcp
subcategory: Operations
description: Disconnect.
---

# Disconnect

Disconnect the node from LTE network.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-operations-disconnect-create` | Disconnect. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `node` | Node Name |
| `site` | Site Name |

## Example Usage

Ask Claude to help you work with Disconnect resources:

### Create Disconnect

> "Create a disconnect named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create disconnect -n <namespace> -i disconnect.yaml

# Get
f5xcctl configuration get disconnect -n <namespace> <name>

# List
f5xcctl configuration list disconnect -n <namespace>

# Delete
f5xcctl configuration delete disconnect -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_disconnect" "example" {
  name      = "example-disconnect"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
