---
page_title: f5xc_draft - f5xc-api-mcp
subcategory: Shape
description: Save draft.
---

# Draft

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Getbotdetectionrulesdraft CustomAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-draft-create` | Save draft. |
| `f5xc-api-shape-draft-list` | GET bot detection rules which are in draft state. |
| `f5xc-api-shape-draft-delete` | Discard draft. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- draft

**Deletes:**

- draft
- contained_resources

## Example Usage

Ask Claude to help you work with Draft resources:

### Create Draft

> "Create a draft named 'example' in the 'production' namespace"

### List Drafts

> "List all drafts in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create draft -n <namespace> -i draft.yaml

# Get
xcsh shape get draft <name> -n <namespace>

# List
xcsh shape list draft -n <namespace>

# Delete
xcsh shape delete draft <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_draft" "example" {
  name      = "example-draft"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
