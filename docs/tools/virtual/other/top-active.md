---
page_title: f5xc_top_active - f5xc-api-mcp
subcategory: Virtual
description: GET Top APIs Endpoints for Virtual Host.
---

# Top Active

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Top APIs by requested activity metric. For example most-active APIs or most-attacked APIs.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-top-active-create` | GET Top APIs Endpoints for Virtual Host. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Virtual Host Name | `Blogging-app-vhost.` |
| `namespace` | Namespace | `Blogging-app.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- top-active

## Example Usage

Ask Claude to help you work with Top Active resources:

### Create Top Active

> "Create a top-active named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh virtual create top_active -n <namespace> -i top_active.yaml

# Get
xcsh virtual get top_active <name> -n <namespace>

# List
xcsh virtual list top_active -n <namespace>

# Delete
xcsh virtual delete top_active <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_top_active" "example" {
  name      = "example-top-active"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
