---
page_title: f5xc_delete - f5xc-api-mcp
subcategory: Support
description: DELETE USB Enablement Rules.
---

# Delete

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

DELETE USB Enablement Rules.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-delete-create` | DELETE USB Enablement Rules. |

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

- delete

## Example Usage

Ask Claude to help you work with Delete resources:

### Create Delete

> "Create a delete named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh support create delete -n <namespace> -i delete.yaml

# Get
xcsh support get delete <name> -n <namespace>

# List
xcsh support list delete -n <namespace>

# Delete
xcsh support delete delete <name> -n <namespace>
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
