---
page_title: f5xc_update_state - f5xc-api-mcp
subcategory: Virtual
description: Update Vulnerabilities for Virtual Host.
---

# Update State

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Update vulnerabilities for the given Virtual Host.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-update-state-create` | Update Vulnerabilities for Virtual Host. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Virtual Host Name | `Blogging-app-vhost.` |
| `namespace` | Namespace | `Blogging-app.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- update-state

## Example Usage

Ask Claude to help you work with Update State resources:

### Create Update State

> "Create a update-state named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh virtual create update_state -n <namespace> -i update_state.yaml

# Get
xcsh virtual get update_state <name> -n <namespace>

# List
xcsh virtual list update_state -n <namespace>

# Delete
xcsh virtual delete update_state <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_update_state" "example" {
  name      = "example-update-state"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
