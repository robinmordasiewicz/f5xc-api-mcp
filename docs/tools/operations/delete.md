---
page_title: f5xc_delete - f5xc-api-mcp
subcategory: Operations
description: DELETE USB Enablement Rules.
---

# Delete

DELETE USB Enablement Rules.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-operations-delete-create` | DELETE USB Enablement Rules. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `node` | Node Name |
| `site` | Site Name |

## Example Usage

Ask Claude to help you work with Delete resources:

### Create Delete

> "Create a delete named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl operations create delete -n <namespace> -i delete.yaml

# Get
f5xcctl operations get delete <name> -n <namespace>

# List
f5xcctl operations list delete -n <namespace>

# Delete
f5xcctl operations delete delete <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_delete" "example" {
  name      = "example-delete"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
