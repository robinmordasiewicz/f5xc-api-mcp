---
page_title: f5xc_rescue - f5xc-api-mcp
subcategory: Shape
description: Rescue Dashboard.
---

# Rescue

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET rescue chart data from shape recognize API.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-rescue-create` | Rescue Dashboard. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- rescue

## Example Usage

Ask Claude to help you work with Rescue resources:

### Create Rescue

> "Create a rescue named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create rescue -n <namespace> -i rescue.yaml

# Get
xcsh shape get rescue <name> -n <namespace>

# List
xcsh shape list rescue -n <namespace>

# Delete
xcsh shape delete rescue <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_rescue" "example" {
  name      = "example-rescue"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
