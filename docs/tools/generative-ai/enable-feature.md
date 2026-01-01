---
page_title: f5xc_enable_feature - f5xc-api-mcp
subcategory: Generative AI
description: Enable feature.
---

# Enable Feature

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Enable service by returning service account details.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-generativeai-enable-feature-create` | Enable feature. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- enable-feature

## Example Usage

Ask Claude to help you work with Enable Feature resources:

### Create Enable Feature

> "Create a enable-feature named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh generative_ai create enable_feature -n <namespace> -i enable_feature.yaml

# Get
xcsh generative_ai get enable_feature <name> -n <namespace>

# List
xcsh generative_ai list enable_feature -n <namespace>

# Delete
xcsh generative_ai delete enable_feature <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_enable_feature" "example" {
  name      = "example-enable-feature"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
