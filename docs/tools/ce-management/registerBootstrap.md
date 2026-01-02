---
page_title: f5xc_registerBootstrap - f5xc-api-mcp
subcategory: Ce Management
description: Registration Create.
---

# RegisterBootstrap

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Registration request to create registration is sent by the node on first boot. User never creates
registration on her own.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cemanagement-registerbootstrap-create` | Registration Create. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- registerBootstrap

## Example Usage

Ask Claude to help you work with RegisterBootstrap resources:

### Create RegisterBootstrap

> "Create a registerBootstrap named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh ce_management create registerBootstrap -n <namespace> -i registerBootstrap.yaml

# Get
xcsh ce_management get registerBootstrap <name> -n <namespace>

# List
xcsh ce_management list registerBootstrap -n <namespace>

# Delete
xcsh ce_management delete registerBootstrap <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_registerBootstrap" "example" {
  name      = "example-registerBootstrap"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
