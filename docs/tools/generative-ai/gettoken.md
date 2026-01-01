---
page_title: f5xc_gettoken - f5xc-api-mcp
subcategory: Generative AI
description: Subscribe to BFDP pipeline.
---

# Gettoken

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Subscribe to BFDP pipeline.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-generativeai-gettoken-create` | Subscribe to BFDP pipeline. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- gettoken

## Example Usage

Ask Claude to help you work with Gettoken resources:

### Create Gettoken

> "Create a gettoken named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh generative_ai create gettoken -n <namespace> -i gettoken.yaml

# Get
xcsh generative_ai get gettoken <name> -n <namespace>

# List
xcsh generative_ai list gettoken -n <namespace>

# Delete
xcsh generative_ai delete gettoken <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_gettoken" "example" {
  name      = "example-gettoken"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
