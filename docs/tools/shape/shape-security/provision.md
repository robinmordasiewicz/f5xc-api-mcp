---
page_title: f5xc_provision - f5xc-api-mcp
subcategory: Shape
description: PostSafeProvision.
---

# Provision

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET Recognize provision status as add-on service.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-provision-create` | PostSafeProvision. |
| `f5xc-api-shape-provision-list` | GET Recognize Provision Status Addon. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- provision

## Example Usage

Ask Claude to help you work with Provision resources:

### Create Provision

> "Create a provision named 'example' in the 'production' namespace"

### List Provisions

> "List all provisions in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create provision -n <namespace> -i provision.yaml

# Get
xcsh shape get provision <name> -n <namespace>

# List
xcsh shape list provision -n <namespace>

# Delete
xcsh shape delete provision <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_provision" "example" {
  name      = "example-provision"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
