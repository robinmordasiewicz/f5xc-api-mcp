---
page_title: f5xc_add - f5xc-api-mcp
subcategory: Support
description: Add USB Enablement Rules.
---

# Add

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Add USB Enablement Rules.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-add-create` | Add USB Enablement Rules. |

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

- add

## Example Usage

Ask Claude to help you work with Add resources:

### Create Add

> "Create a add named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh support create add -n <namespace> -i add.yaml

# Get
xcsh support get add <name> -n <namespace>

# List
xcsh support list add -n <namespace>

# Delete
xcsh support delete add <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_add" "example" {
  name      = "example-add"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
