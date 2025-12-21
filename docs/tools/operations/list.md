---
page_title: f5xc_list - f5xc-api-mcp
subcategory: Operations
description: List USB devices.
---

# List

List connected USB devices.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-operations-list-list` | List USB devices. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `node` | Node Name |
| `site` | Site Name |

## Example Usage

Ask Claude to help you work with List resources:

### List Lists

> "List all lists in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl operations create list -n <namespace> -i list.yaml

# Get
f5xcctl operations get list <name> -n <namespace>

# List
f5xcctl operations list list -n <namespace>

# Delete
f5xcctl operations delete list <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_list" "example" {
  name      = "example-list"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
