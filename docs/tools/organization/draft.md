---
page_title: f5xc_draft - f5xc-api-mcp
subcategory: Organization
description: Save draft
---

# Draft

Save draft

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-draft-create` | Save draft |
| `f5xc-api-core-draft-list` | Get bot detection rules which are in draft state |
| `f5xc-api-core-draft-delete` | Discard draft |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Draft resources:

### Create Draft

> "Create a draft named 'example' in the 'production' namespace"

### List Drafts

> "List all drafts in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create draft -n <namespace> -i draft.yaml

# Get
f5xcctl configuration get draft -n <namespace> <name>

# List
f5xcctl configuration list draft -n <namespace>

# Delete
f5xcctl configuration delete draft -n <namespace> <name>
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
