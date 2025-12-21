---
page_title: f5xc_draft - f5xc-api-mcp
subcategory: Security
description: Save draft.
---

# Draft

Getbotdetectionrulesdraft CustomAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-draft-create` | Save draft. |
| `f5xc-api-security-draft-list` | GET bot detection rules which are in draft state. |
| `f5xc-api-security-draft-delete` | Discard draft. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Draft resources:

### Create Draft

> "Create a draft named 'example' in the 'production' namespace"

### List Drafts

> "List all drafts in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create draft -n <namespace> -i draft.yaml

# Get
f5xcctl security get draft <name> -n <namespace>

# List
f5xcctl security list draft -n <namespace>

# Delete
f5xcctl security delete draft <name> -n <namespace>
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
