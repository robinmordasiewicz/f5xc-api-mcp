---
page_title: f5xc_reboot - f5xc-api-mcp
subcategory: Operations
description: Reboot node.
---

# Reboot

Reboot specific node in site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-operations-reboot-create` | Reboot node. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `node` | Node Name |
| `site` | Site Name |

## Example Usage

Ask Claude to help you work with Reboot resources:

### Create Reboot

> "Create a reboot named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl operations create reboot -n <namespace> -i reboot.yaml

# Get
f5xcctl operations get reboot <name> -n <namespace>

# List
f5xcctl operations list reboot -n <namespace>

# Delete
f5xcctl operations delete reboot <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_reboot" "example" {
  name      = "example-reboot"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
