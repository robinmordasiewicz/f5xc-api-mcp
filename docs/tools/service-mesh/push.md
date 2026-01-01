---
page_title: f5xc_push - f5xc-api-mcp
subcategory: Service Mesh
description: Add Override.
---

# Push

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Add override for dynamic component for API endpoints discovered for this App type.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-push-create` | Add Override. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `app_type_name` | App Type | `Blogging-app.` |
| `namespace` | Namespace | `Shared` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- push

## Example Usage

Ask Claude to help you work with Push resources:

### Create Push

> "Create a push named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh service_mesh create push -n <namespace> -i push.yaml

# Get
xcsh service_mesh get push <name> -n <namespace>

# List
xcsh service_mesh list push -n <namespace>

# Delete
xcsh service_mesh delete push <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_push" "example" {
  name      = "example-push"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
